import { NextResponse } from "next/server";
import { sendPurchaseEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    console.log("[test-email] Attempting to send test email to:", email);
    
    await sendPurchaseEmail(email, "all");
    
    return NextResponse.json({ success: true, message: "Test email sent" });
  } catch (error) {
    console.error("[test-email] Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
