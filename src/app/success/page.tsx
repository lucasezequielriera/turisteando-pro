"use client";
import { useEffect, use } from "react";
import { grantAccess } from "@/lib/access";
import Link from "next/link";

export default function SuccessPage({ searchParams }: { searchParams: Promise<{ access?: string; city?: string }> }) {
  const sp = use(searchParams);

  useEffect(() => {
    const a = sp?.access;
    if (a === "all") grantAccess("all");
    if (a === "lifetime") grantAccess("lifetime");
    if (a === "city" && sp?.city) grantAccess("city", sp.city);
  }, [sp?.access, sp?.city]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-extrabold">¡Pago confirmado!</h1>
      <p className="text-slate-300 mt-2">Tu acceso fue activado, ya puedes ver el contenido y recibirás alertas a tu email con las novedades mensuales!</p>
      <div className="mt-4 flex gap-3 justify-center">
        <Link href="/" className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900">Volver al inicio</Link>
      </div>
    </div>
  );
}