"use client";
import { useState } from "react";
import Link from "next/link";

export default function BuyLifetime() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onBuy() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ mode: "lifetime", email }),
    });
    if (!res.ok) { setLoading(false); return; }
    const data = await res.json();
    if (data?.url) window.location.href = data.url; else setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold">Comprar Lifetime</h1>
      <p className="text-slate-300 mt-2">Pago único. Acceso de por vida con todas las futuras ciudades y actualizaciones.</p>
      <div className="mt-4 space-y-3">
        <input
          type="email" required value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2"
        />
        <button
          onClick={onBuy}
          disabled={loading}
          className="w-full rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-300 disabled:opacity-60"
        >
          {loading ? "Redirigiendo a Stripe..." : "Comprar Lifetime (€59)"}
        </button>
        <Link href="/pricing" className="underline text-slate-300 text-sm">Volver</Link>
      </div>
    </div>
  );
}


