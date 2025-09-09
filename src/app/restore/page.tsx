"use client";
import { useState } from "react";

export default function RestorePage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onRestore() {
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/restore", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      // Guarda acceso en este dispositivo
      if (data.access_all) localStorage.setItem("tp_access_all", "1");
      if (data.lifetime) localStorage.setItem("tp_access_life", "1");
      if (Array.isArray(data.cities)) {
        data.cities.forEach((slug: string) => localStorage.setItem(`tp_city_${slug}`, "1"));
      }
      setMsg("¡Acceso restaurado! Volvé a la ciudad que compraste.");
    } else {
      setMsg(data.error || "No encontramos compras para ese email.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold">Recuperar acceso</h1>
      <p className="text-slate-300 mt-2">Ingresá el email que usaste en el pago.</p>
      <div className="mt-4 space-y-3">
        <input
          type="email" required value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2"
        />
        <button
          onClick={onRestore}
          disabled={loading || !email}
          className="w-full rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-300 disabled:opacity-60"
        >
          {loading ? "Buscando..." : "Restaurar"}
        </button>
        {msg && <p className="text-sm text-slate-300">{msg}</p>}
      </div>
    </div>
  );
}