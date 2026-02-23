import Stripe from "stripe";
import { NextResponse } from "next/server";
import { ENV } from "@/config/env";

export const runtime = "nodejs";

const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const { mode, email, city, country } = await req.json() as { mode: "city"|"country"|"world"|"all"|"lifetime"; email?: string; city?: string; country?: string };

    // Derive base from the request URL (handles correct dev port)
    const base = ENV.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;

    if (!ENV.STRIPE_SECRET_KEY || ENV.STRIPE_SECRET_KEY.includes('placeholder')) {
      return NextResponse.json({ error: "Config error: STRIPE_SECRET_KEY missing" }, { status: 500 });
    }

    // Map world to all for Stripe price purposes
    const normalizedMode = mode === 'world' ? 'all' : mode;

    let price: string | undefined;
    let sessionMode: "payment"|"subscription" = "payment";
    const metadata: Record<string,string> = { access: normalizedMode };

    if (normalizedMode === "all") { price = ENV.STRIPE_PRICE_ALL; sessionMode = "subscription"; }
    else if (normalizedMode === "lifetime") { price = ENV.STRIPE_PRICE_LIFE; sessionMode = "payment"; }
    else if (normalizedMode === "country") { price = ENV.STRIPE_PRICE_COUNTRY; sessionMode = "payment"; }
    else { price = ENV.STRIPE_PRICE_CITY; sessionMode = "payment"; }

    if (normalizedMode === "city") {
      if (!city) return NextResponse.json({ error: "Falta city" }, { status: 400 });
      metadata.city = city;
    }
    if (normalizedMode === "country") {
      if (!country) return NextResponse.json({ error: "Falta country" }, { status: 400 });
      metadata.country = country;
    }

    if (!price) {
      const missing = normalizedMode === "all" ? "STRIPE_PRICE_ALL" : normalizedMode === "lifetime" ? "STRIPE_PRICE_LIFE" : normalizedMode === "country" ? "STRIPE_PRICE_COUNTRY" : "STRIPE_PRICE_CITY";
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
      customer_email: email,
      line_items: [{ price: price!, quantity: 1 }],
      success_url: `${base}/success?access=${normalizedMode}${normalizedMode==="city" ? `&city=${encodeURIComponent(city!)}` : normalizedMode==="country" ? `&country=${encodeURIComponent(country!)}` : ""}`,
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