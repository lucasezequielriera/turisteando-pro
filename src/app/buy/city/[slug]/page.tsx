"use client";
import { use, useState } from "react";
// import { useRouter } from "next/navigation";
import { findCity } from "@/data/cities";
import Link from "next/link";

export default function BuyCity({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const city = findCity(slug);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  if (!city) return <div className="max-w-xl mx-auto p-6">Ciudad no encontrada</div>;
  const citySlug = city.slug;

  async function onBuy() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ mode: "city", email, city: citySlug }),
    });
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    if (data?.url) window.location.href = data.url; else setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold">Comprar acceso — {city.name}</h1>
      <p className="text-slate-300 mt-2">Recibirás el acceso por email y se activará automáticamente al finalizar el pago.</p>
      <div className="mt-4 space-y-3">
        <input
          type="email" required value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2"
        />
        <button
          onClick={onBuy}
          disabled={loading || !email}
          className="w-full rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-300 disabled:opacity-60"
        >
          {loading ? "Redirigiendo a Stripe..." : `Comprar ciudad (€5.90)`}
        </button>
        <Link href={`/city/${city.slug}`} className="underline text-slate-300 text-sm">Volver</Link>
      </div>
    </div>
  );
}