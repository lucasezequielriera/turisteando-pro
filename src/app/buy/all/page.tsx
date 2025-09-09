"use client";
import { useState } from "react";
import Link from "next/link";

export default function BuyAll() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onBuy() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ mode: "all", email }),
    });
    if (!res.ok) { setLoading(false); return; }
    const data = await res.json();
    if (data?.url) window.location.href = data.url; else setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold">Suscribite — Acceso total</h1>
      <p className="text-slate-300 mt-2">Acceso a todas las guías. Se renueva mensualmente, podés cancelar cuando quieras.</p>
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
          className="w-full rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-slate-900 hover:bg-emerald-300 disabled:opacity-60"
        >
          {loading ? "Redirigiendo a Stripe..." : "Acceso total (€9/mes)"}
        </button>
        <Link href="/pricing" className="underline text-slate-300 text-sm">Volver</Link>
      </div>
    </div>
  );
}


