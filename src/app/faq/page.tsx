export default function FAQ() {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <h1 className="text-3xl font-extrabold">Preguntas frecuentes</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4" open>
            <summary className="cursor-pointer font-semibold">¿Cómo funciona el acceso?</summary>
            <p className="mt-2 text-slate-300 text-sm">Pagás con Stripe. Recibís email de acceso. En el MVP se marca el acceso en tu navegador; pronto agregamos login + base de datos para sincronizar.</p>
          </details>
          <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <summary className="cursor-pointer font-semibold">¿Qué hay gratis?</summary>
            <p className="mt-2 text-slate-300 text-sm">Vista previa de eSIM y resumen. Listas completas en la zona premium.</p>
          </details>
          <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <summary className="cursor-pointer font-semibold">¿Actualizaciones?</summary>
            <p className="mt-2 text-slate-300 text-sm">Revisión mensual y nuevas ciudades.</p>
          </details>
          <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <summary className="cursor-pointer font-semibold">¿Reembolsos?</summary>
            <p className="mt-2 text-slate-300 text-sm">Sí, 7 días si el contenido no te resulta útil.</p>
          </details>
        </div>
      </div>
    );
}