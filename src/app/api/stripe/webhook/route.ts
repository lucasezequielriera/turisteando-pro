import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/server";
import { sendPurchaseEmail } from "@/lib/email";
import { ENV } from "@/config/env";

export const runtime = "nodejs"; // usar body raw

const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, ENV.STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const email = s.customer_details?.email || s.customer_email;
    if (email) {
      const access = s.metadata?.access;
      const city = s.metadata?.city;
      console.log("[webhook] completed: email=", email, "access=", access, "city=", city);
      const db = supabaseService();

      // upsert fila
      await db.from("entitlements").upsert({ email }).select().single();

      if (access === "all") {
        await db.from("entitlements")
          .update({ access_all: true, updated_at: new Date().toISOString() })
          .eq("email", email);
        console.log("[webhook] sending email: all →", email);
        await sendPurchaseEmail(email, "all");
      } else if (access === "lifetime") {
        await db.from("entitlements")
          .update({ lifetime: true, updated_at: new Date().toISOString() })
          .eq("email", email);
        console.log("[webhook] sending email: lifetime →", email);
        await sendPurchaseEmail(email, "lifetime");
      } else if (access === "city" && city) {
        const { data } = await db.from("entitlements").select("cities").eq("email", email).single();
        const current = Array.isArray(data?.cities) ? data!.cities : [];
        const next = Array.from(new Set([...current, city]));
        await db.from("entitlements")
          .update({ cities: next, updated_at: new Date().toISOString() })
          .eq("email", email);
        console.log("[webhook] sending email: city →", email, city);
        await sendPurchaseEmail(email, "city", city);
      }
    }
  }

  return NextResponse.json({ received: true });
}