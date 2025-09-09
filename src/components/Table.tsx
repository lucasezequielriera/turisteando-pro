"use client";
import React from "react";

export default function Table({
  headers,
  rows,
  locked,
  onUnlock,
}: {
  headers: string[];
  rows: (string | number)[][];
  locked?: boolean;
  onUnlock?: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-800/60 text-slate-200 sticky top-0">
          <tr>{headers.map((h, i) => <th key={i} className="px-3 py-2 text-left font-medium">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 bg-slate-900/30">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-slate-800/30">
              {r.map((c, j) => <td key={j} className="px-3 py-2 text-slate-100/90">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {locked && (
        <div className="absolute inset-0 backdrop-blur-[2px] bg-slate-900/70 grid place-items-center">
          <div className="text-center p-4">
            <div className="text-slate-100 font-semibold">Contenido premium</div>
            <p className="text-slate-300 text-sm mt-1">Desbloquealo para ver toda la lista actualizada.</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_LINK_CITY || "#"}
                className="inline-flex items-center rounded-xl bg-cyan-400 px-3 py-2 font-semibold text-slate-900 hover:bg-cyan-300"
              >
                Desbloquear ciudad (€5.90)
              </a>
              {onUnlock && (
                <button
                  onClick={onUnlock}
                  className="inline-flex items-center rounded-xl bg-slate-700 px-3 py-2 font-semibold text-slate-100 hover:bg-slate-600"
                >
                  Ya tengo acceso
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}