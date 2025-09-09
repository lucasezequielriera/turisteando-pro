import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json() as { email?: string };
    if (!email) return NextResponse.json({ error: "Falta email" }, { status: 400 });

    const db = supabaseService();
    const { data, error } = await db.from("entitlements").select("*").eq("email", email).single();

    if (error || !data) {
      return NextResponse.json({ ok: false, error: "No encontrado" });
    }
    const { access_all, lifetime, cities } = data;
    return NextResponse.json({ ok: true, access_all, lifetime, cities });
  } catch {
    return NextResponse.json({ ok: false, error: "Error de servidor" }, { status: 500 });
  }
}