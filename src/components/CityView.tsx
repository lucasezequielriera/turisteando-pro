"use client";
import { useState } from "react";
import Table from "./Table";
import { City } from "@/data/cities";
import { hasAllAccess, hasCityAccess, grantAccess } from "@/lib/access";
import PlacesInfo from "./PlacesInfo";

type TabKey = "resumen" | "trabajo" | "alojamiento" | "datos" | "presupuesto" | "emergencia";

const TAB_LABELS: Record<TabKey, string> = {
  resumen: "Resumen",
  trabajo: "Trabajo",
  alojamiento: "Alojamiento",
  datos: "Datos / eSIM",
  presupuesto: "Presupuesto",
  emergencia: "Emergencia",
};

export default function CityView({ city }: { city: City }) {
  const [tab, setTab] = useState<TabKey>("resumen");
  const [accessAll, setAccessAll] = useState(hasAllAccess());
  const [accessCity, setAccessCity] = useState(hasCityAccess(city.slug));
  const locked = !(accessAll || accessCity);

  const markAll = () => { grantAccess("all"); setAccessAll(true); };
  const markCity = () => { grantAccess("city", city.slug); setAccessCity(true); };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,.15),transparent_40%)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
              {city.name} <span className="text-slate-400 text-base font-medium">{city.country}</span>
            </h2>
            <p className="text-slate-300 text-sm mt-1">Actualizado: {city.lastUpdated}</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={`/buy/city/${city.slug}`} className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-300">
              Desbloquear ciudad (€5.90)
            </a>
            <a href="/buy/all" className="rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-slate-900 hover:bg-emerald-300">
              Acceso total (€9/mes)
            </a>
            {/* Botones utilitarios para marcar acceso post-checkout */}
            <button onClick={markCity} className="rounded-xl border border-slate-700 px-3 py-2 text-slate-200">Ya compré esta</button>
            <button onClick={markAll} className="rounded-xl border border-emerald-600 px-3 py-2 text-emerald-300">Tengo suscripción</button>
          </div>
        </div>
        <p className="mt-3 text-slate-200/90 max-w-3xl">{city.summary}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["resumen","trabajo","alojamiento","datos","presupuesto","emergencia"] as TabKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-xl px-3 py-1.5 text-sm font-medium border ${
              tab === key ? "bg-slate-800 text-slate-50 border-slate-700" : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800/60"
            }`}
          >
            {TAB_LABELS[key]}
          </button>
        ))}
      </div>

      {tab === "resumen" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Section title="Qué esperar">
            <ul className="space-y-2 text-slate-200/90 text-sm">
              <li>• Day-pass desde €{city.metrics.dayPassFrom} y muchos cafés con enchufes.</li>
              <li>• eSIM con planes desde €{city.essentials.esim[0].price.toFixed(2)} (hotspot OK).</li>
              <li>• Zonas recomendadas: {city.stay.areas.map(a => a.name).join(", ")}</li>
            </ul>
          </Section>
          <Section title="Top 3 rápidos">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Coworks" value={String(city.metrics.coworkCount)} />
              <Stat label="Mejor Wi-Fi" value={city.metrics.bestWifi} />
              <Stat label="Café desde" value={`€${city.metrics.coffeeFrom}`} />
            </div>
          </Section>
          <Section title="Mapa (demo)">
            <div className="aspect-[4/3] w-full rounded-xl bg-[linear-gradient(135deg,#0ea5e922,#22d3ee11)] grid place-items-center border border-slate-800">
              <p className="text-slate-300 text-sm">Acá va tu mapa embebido (Google/MyMaps/Mapbox)</p>
            </div>
          </Section>
        </div>
      )}

      {tab === "trabajo" && (
        <div className="space-y-6">
          {/* Información en tiempo real de lugares */}
          <Section title="Lugares en tiempo real">
            <PlacesInfo
              cityName={city.name}
              countryCode={city.essentials.foursquareCountryCode}
            />
          </Section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section title="Cowork — Day-pass">
              <Table
                headers={["Espacio","Zona","Day-pass","Horario","Wi-Fi"]}
                rows={city.work.coworks.map(c => [c.name, c.area, `€${c.price}`, c.hours, c.wifi])}
                locked={locked}
                onUnlock={() => { grantAccess("city", city.slug); setAccessCity(true); }}
              />
            </Section>
            <Section title="Cafés para trabajar">
              <Table
                headers={["Café","Barrio","Enchufes","Wi-Fi"]}
                rows={city.work.cafes.map(c => [c.name, c.area, c.plugs ? "Sí" : "No", c.wifi])}
                locked={locked}
                onUnlock={() => { grantAccess("city", city.slug); setAccessCity(true); }}
              />
            </Section>
          </div>
        </div>
      )}

      {tab === "alojamiento" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Section title="Barrios recomendados">
            <div className="grid sm:grid-cols-3 gap-3">
              {city.stay.areas.map(a => (
                <div key={a.name} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                  <div className="font-semibold text-slate-50">{a.name}</div>
                  <div className="text-slate-300 text-sm">{a.vibe}</div>
                  <div className="mt-1 text-xs text-slate-400">Precio: {a.priceIndex}</div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Ofertas (estimadas)">
            <Table
              headers={["Alojamiento","Noches","€/noche","Fees","Coste total (calc)"]}
              rows={city.stay.deals.map(d => [d.name, d.nights, `€${d.pricePerNight}`, `€${d.fees}`, `€${d.pricePerNight*d.nights + d.fees}`])}
              locked={locked}
              onUnlock={() => { grantAccess("city", city.slug); setAccessCity(true); }}
            />
          </Section>
        </div>
      )}

      {tab === "datos" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Section title="eSIM (planes de referencia)">
            <Table
              headers={["Plan","Precio","Proveedor","Hotspot"]}
              rows={city.essentials.esim.map(e => [e.plan, `€${e.price.toFixed(2)}`, e.provider, e.hotspot ? "Sí":"No"])}
              locked={false}
            />
            <p className="mt-2 text-xs text-slate-400">Precios orientativos: confirmá siempre en la web del proveedor.</p>
          </Section>
          <Section title="Bancos / Cuentas (UE)">
            <Table
              headers={["Banco","Fee","Divisas","Alta online"]}
              rows={city.essentials.banks.map(b => [b.name, b.fee, b.fx, b.online ? "Sí":"No"])}
              locked={locked}
              onUnlock={() => { grantAccess("city", city.slug); setAccessCity(true); }}
            />
          </Section>
        </div>
      )}

      {tab === "presupuesto" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Section title="Rangos diarios">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Low" value={`€${city.budget.dailyLow}`} />
              <Stat label="Mid" value={`€${city.budget.dailyMid}`} />
              <Stat label="Nomad+" value={`€${Math.round(city.budget.dailyMid * 1.4)}`} />
            </div>
          </Section>
          <Section title="Cesta básica">
            <ul className="text-sm text-slate-200 space-y-2">
              {city.budget.sampleBasket.map(b => (
                <li key={b.item} className="flex items-center justify-between border-b border-slate-800/70 pb-1">
                  <span>{b.item}</span><span className="text-slate-50 font-semibold">€{b.price}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Consejos de ahorro">
            <ul className="text-sm text-slate-200 space-y-2">
              <li>• Menú del día en calles laterales (mejor precio/calidad).</li>
              <li>• Bonos de transporte (10 viajes) bajan el coste por trayecto.</li>
              <li>• Preguntá por medio día de cowork si solo necesitás 3–4h.</li>
            </ul>
          </Section>
        </div>
      )}

      {tab === "emergencia" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Section title="Teléfonos y direcciones">
            <div className="space-y-2 text-sm text-slate-200">
              <div className="font-semibold">{city.emergency.embassy}</div>
              <ul className="list-disc pl-5">
                {city.emergency.emergencyNumbers.map(n => <li key={n}>{n}</li>)}
              </ul>
            </div>
          </Section>
          <Section title="Hospitales (referencia)">
            <ul className="text-sm text-slate-200 space-y-2">
              {city.emergency.hospitals.map(h => (
                <li key={h.name} className="flex items-center justify-between">
                  <span>{h.name}</span><span className="text-slate-300">{h.phone}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-50">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-800/60 p-3 text-center">
      <div className="text-slate-300 text-xs">{label}</div>
      <div className="text-slate-50 text-xl font-bold">{value}</div>
    </div>
  );
}