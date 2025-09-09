// no need for Link here

export default function PricingPage() {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <h1 className="text-3xl font-extrabold">Precios simples</h1>
        <p className="text-slate-300 mt-1">Compra una ciudad o desbloqueá todo por suscripción. Cancelás cuando quieras.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Pack ciudad" price="€5.90" cta="Comprar" href={process.env.NEXT_PUBLIC_STRIPE_LINK_CITY} features={[
            "Acceso a 1 ciudad (90 días de updates)",
            "Cowork/cafés/alojamiento",
            "eSIM y bancos (referencia)",
          ]} />
          <Card title="Acceso total" price="€9/mes" cta="Suscribirme" href="/buy/all" featured features={[
            "Todas las ciudades",
            "Nuevas cada mes",
            "Soporte prioritario",
          ]} />
          <Card title="Lifetime" price="€59" cta="Comprar" href="/buy/lifetime" features={[
            "Acceso de por vida",
            "Todas las ciudades y updates",
            "Ideal para equipos",
          ]} />
        </div>
      </div>
    );
  }
  
  function Card({ title, price, features, cta, href, featured }:
    { title:string; price:string; features:string[]; cta:string; href?:string; featured?:boolean }) {
    return (
      <div className={`${featured ? "border-2 border-emerald-400 bg-emerald-400/10" : "border border-slate-800 bg-slate-900/60"} rounded-2xl p-4`}>
        <div className="text-slate-300 text-sm">{title}</div>
        <div className="text-3xl font-extrabold">{price}</div>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          {features.map(f => <li key={f}>• {f}</li>)}
        </ul>
        <a href={href || "#"} className={`mt-4 inline-flex w-full justify-center rounded-xl px-4 py-2 font-semibold ${featured ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300" : "bg-cyan-400 text-slate-900 hover:bg-cyan-300"}`}>
          {cta}
        </a>
      </div>
    );
  }