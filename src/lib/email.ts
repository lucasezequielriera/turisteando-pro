import { Resend } from "resend";
import { ENV } from "@/config/env";

const resendApiKey = ENV.RESEND_API_KEY;
const fromEmail = ENV.EMAIL_FROM;

export type PurchaseKind = "city" | "all" | "lifetime";

export async function sendPurchaseEmail(to: string, kind: PurchaseKind, city?: string) {
  console.log("[email] Starting email send process...");
  console.log("[email] RESEND_API_KEY exists:", !!resendApiKey);
  console.log("[email] fromEmail:", fromEmail);
  console.log("[email] to:", to);
  console.log("[email] kind:", kind);
  
  if (!resendApiKey) {
    console.warn("[email] RESEND_API_KEY not set. Skipping email send.");
    return;
  }
  
  try {
    const resend = new Resend(resendApiKey);
    const subject = kind === "city"
      ? `Tu acceso a la ciudad ${city}`
      : kind === "all"
        ? "Bienvenido a Acceso total"
        : "Compra Lifetime confirmada";

    const body = buildHtml(kind, city);
    
    console.log("[email] Attempting to send with Resend...");
    console.log("[email] Subject:", subject);
    
    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html: body,
    });
    
    console.log("[email] Resend response:", result);
    console.log("[email] Email sent successfully!");
    
  } catch (error) {
    console.error("[email] Error sending email:", error);
    throw error;
  }
}

function buildHtml(kind: PurchaseKind, city?: string) {
  const title = kind === "city" ? `Acceso a ${city}` : kind === "all" ? "Acceso total" : "Lifetime";
  const benefit = kind === "city"
    ? `Ya podés ver el contenido completo de ${city}.`
    : kind === "all"
      ? "Tu suscripción te da acceso a todas las ciudades y guías mensuales."
      : "Tenés acceso de por vida a el material mensual y a todas las ciudades actuales y futuras.";
  return `
  <div style="font-family:Inter,system-ui,Arial,sans-serif;background:#0b1120;padding:24px;color:#e2e8f0">
    <div style="max-width:560px;margin:0 auto;background:#0f172a;border:1px solid #1f2937;border-radius:16px;padding:20px">
      <h1 style="margin:0 0 8px 0;color:#f8fafc;font-size:20px">${title} — Confirmación</h1>
      <p style="margin:8px 0 16px 0;color:#cbd5e1">${benefit}</p>
      <p style="margin:8px 0 0 0;color:#94a3b8;font-size:12px">Si no fuiste vos, respondé a este email.</p>
    </div>
  </div>`;
}


