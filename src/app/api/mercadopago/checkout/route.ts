import { NextResponse } from "next/server";
import { mercadoPagoService } from "@/lib/mercadopago";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { mode, city, country, currency = 'ARS' } = await req.json() as { 
      mode: "city"|"country"|"world"|"all"|"lifetime"; 
      city?: string; 
      country?: string;
      currency?: 'EUR' | 'ARS';
    };

    if (!mercadoPagoService.isConfigured()) {
      return NextResponse.json({ 
        error: "MercadoPago not configured",
        message: "Add MERCADOPAGO_ACCESS_TOKEN to your environment variables"
      }, { status: 500 });
    }

    // Derive base from the request URL
    const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;

    // Define pricing based on mode
    // Precios base en EUR
    const basePrices = {
      city: 5.90,
      country: 12,
      world: 9,
      all: 9,
      lifetime: 59
    } as const;

    // Tipo de cambio: 1 EUR = 1,400 ARS
    const EXCHANGE_RATE = 1400;
    
    let price: number;
    let title: string;
    let description: string;
    let externalReference: string;

    switch (mode) {
      case "city":
        if (!city) {
          return NextResponse.json({ error: "City is required for city mode" }, { status: 400 });
        }
        price = currency === 'ARS' ? Math.round(basePrices.city * EXCHANGE_RATE) : basePrices.city;
        title = `Pack Ciudad - ${city}`;
        description = `Acceso completo a la guía de ${city}`;
        externalReference = `city_${city}_${Date.now()}`;
        break;
      case "country":
        if (!country) {
          return NextResponse.json({ error: "Country is required for country mode" }, { status: 400 });
        }
        price = currency === 'ARS' ? Math.round(basePrices.country * EXCHANGE_RATE) : basePrices.country;
        title = `Pack País - ${country}`;
        description = `Acceso a todas las ciudades de ${country}`;
        externalReference = `country_${country}_${Date.now()}`;
        break;
      case "world":
      case "all":
        price = currency === 'ARS' ? Math.round(basePrices.world * EXCHANGE_RATE) : basePrices.world;
        title = "Pack Mundo";
        description = "Acceso a todas las ciudades";
        externalReference = `world_${Date.now()}`;
        break;
      case "lifetime":
        price = currency === 'ARS' ? Math.round(basePrices.lifetime * EXCHANGE_RATE) : basePrices.lifetime;
        title = "Pack Lifetime";
        description = "Acceso de por vida a todas las ciudades";
        externalReference = `lifetime_${Date.now()}`;
        break;
      default:
        return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    // Create preference
    const preference = await mercadoPagoService.createPreference({
      items: [{
        id: mode,
        title,
        description,
        quantity: 1,
        unit_price: price,
        currency_id: currency === 'ARS' ? 'ARS' : 'EUR'
      }],
      external_reference: externalReference,
      notification_url: `${base}/api/mercadopago/webhook`,
      back_urls: {
        success: `${base}/success?access=${mode}${mode === "city" ? `&city=${encodeURIComponent(city!)}` : mode === "country" ? `&country=${encodeURIComponent(country!)}` : ""}`,
        failure: `${base}/pricing?error=payment_failed`,
        pending: `${base}/pricing?status=pending`
      },
      auto_return: 'approved',
      metadata: {
        access: mode,
        city: city || '',
        country: country || '',
        timestamp: new Date().toISOString()
      }
    });

    return NextResponse.json({ 
      id: preference.id,
      init_point: preference.init_point 
    });

  } catch (error) {
    console.error("MercadoPago checkout error:", error);
    return NextResponse.json({ 
      error: "MercadoPago checkout failed",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
