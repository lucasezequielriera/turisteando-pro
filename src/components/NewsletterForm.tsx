"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"ok"|"err">("idle");
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || "#";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setStatus("ok"); else throw new Error();
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return <p className="text-sm text-emerald-300">¡Listo! Revisa tu correo para confirmar.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        required
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <button className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-300">
        Unirme
      </button>
    </form>
  );
}