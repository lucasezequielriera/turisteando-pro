import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { mode, email, city } = await req.json() as { mode: "city"|"all"|"lifetime"; email?: string; city?: string };

    // Derive base from the request URL (handles correct dev port)
    const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Config error: STRIPE_SECRET_KEY missing" }, { status: 500 });
    }

    let price: string | undefined = process.env.STRIPE_PRICE_CITY; // one-time
    let sessionMode: "payment"|"subscription" = "payment"; // city and lifetime are one-time
    const metadata: Record<string,string> = { access: mode };

    if (mode === "all") { price = process.env.STRIPE_PRICE_ALL!; sessionMode = "subscription"; }
    if (mode === "lifetime") { price = process.env.STRIPE_PRICE_LIFE!; sessionMode = "payment"; }
    if (mode === "city") {
      if (!city) return NextResponse.json({ error: "Falta city" }, { status: 400 });
      metadata.city = city;
    }

    if (!price) {
      const missing = mode === "all" ? "STRIPE_PRICE_ALL" : mode === "lifetime" ? "STRIPE_PRICE_LIFE" : "STRIPE_PRICE_CITY";
      return NextResponse.json({ error: `Config error: ${missing} missing` }, { status: 500 });
    }

    // Validate price type: subscription requires recurring price; payment requires one-time
    try {
      const priceObj = await stripe.prices.retrieve(price);
      const isRecurring = Boolean(priceObj.recurring);
      if (sessionMode === "subscription" && !isRecurring) {
        return NextResponse.json({ error: "Price type mismatch: expected recurring for subscription mode" }, { status: 400 });
      }
      if (sessionMode === "payment" && isRecurring) {
        return NextResponse.json({ error: "Price type mismatch: expected one-time for payment mode" }, { status: 400 });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ error: `Stripe price error: ${message}` }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: sessionMode,
      customer_email: email, // opcional pero útil
      line_items: [{ price: price!, quantity: 1 }],
      success_url: `${base}/success?access=${mode}${mode==="city" ? `&city=${encodeURIComponent(city!)}` : ""}`,
      cancel_url: `${base}/pricing`,
      metadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}