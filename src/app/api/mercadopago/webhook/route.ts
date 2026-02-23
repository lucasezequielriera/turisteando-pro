import { NextResponse } from "next/server";
import { mercadoPagoService } from "@/lib/mercadopago";
import { supabaseService } from "@/lib/supabase/server";
import { sendPurchaseEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-signature") || req.headers.get("x-mercadopago-signature") || "";
    
    // Verify webhook signature
    if (!mercadoPagoService.verifyWebhookSignature(body, signature)) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const data = JSON.parse(body);
    
    // Handle different notification types
    if (data.type === "payment") {
      const paymentId = data.data?.id;
      
      if (!paymentId) {
        return NextResponse.json({ error: "No payment ID" }, { status: 400 });
      }

      // Get payment details
      const payment = await mercadoPagoService.getPayment(paymentId);
      
      if (!payment) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }

      // Only process approved payments
      if (payment.status === "approved") {
        const email = payment.payer.email;
        const access = payment.metadata?.access;
        const city = payment.metadata?.city;
        
        console.log("[MercadoPago webhook] Payment approved:", {
          paymentId,
          email,
          access,
          city,
          amount: payment.transaction_amount,
          currency: payment.currency_id
        });

        if (email) {
          const db = supabaseService();

          // Upsert user
          await db.from("entitlements").upsert({ email }).select().single();

          // Update access based on mode
          if (access === "all") {
            await db.from("entitlements")
              .update({ access_all: true, updated_at: new Date().toISOString() })
              .eq("email", email);
            console.log("[MercadoPago webhook] Updated access_all for:", email);
            await sendPurchaseEmail(email, "all");
          } else if (access === "lifetime") {
            await db.from("entitlements")
              .update({ lifetime: true, updated_at: new Date().toISOString() })
              .eq("email", email);
            console.log("[MercadoPago webhook] Updated lifetime for:", email);
            await sendPurchaseEmail(email, "lifetime");
          } else if (access === "city" && city) {
            const { data: userData } = await db.from("entitlements")
              .select("cities")
              .eq("email", email)
              .single();
            
            const currentCities = Array.isArray(userData?.cities) ? userData.cities : [];
            const newCities = Array.from(new Set([...currentCities, city]));
            
            await db.from("entitlements")
              .update({ 
                cities: newCities, 
                updated_at: new Date().toISOString() 
              })
              .eq("email", email);
            
            console.log("[MercadoPago webhook] Updated cities for:", email, "cities:", newCities);
            await sendPurchaseEmail(email, "city", city);
          }
        }
      } else {
        console.log("[MercadoPago webhook] Payment not approved:", {
          paymentId,
          status: payment.status,
          statusDetail: payment.status_detail
        });
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("MercadoPago webhook error:", error);
    return NextResponse.json({ 
      error: "Webhook processing failed",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
