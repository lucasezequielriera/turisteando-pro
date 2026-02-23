"use client";

import { useCurrency } from "@/contexts/CurrencyContext";

export default function AccesoTotalButton({ size = "md", onClick }: { size?: "sm" | "md"; onClick?: () => void }) {
  const { getDisplayPrice, currency } = useCurrency();

  const handleClick = () => {
    if (onClick) onClick();
  };

  const sizeClasses = size === "sm" 
    ? "px-3 py-1.5 text-sm"
    : "px-6 py-3";

  return (
    <button
      onClick={handleClick}
      className={`rounded-xl bg-emerald-400 ${sizeClasses} font-semibold text-slate-900 hover:bg-emerald-300 transition-colors inline-flex items-center gap-2`}
    >
      <span>Acceso total ({getDisplayPrice(9)}/mes)</span>
      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900/20 text-slate-900 border border-emerald-700/40 uppercase tracking-wide">
        {currency}
      </span>
    </button>
  );
}
