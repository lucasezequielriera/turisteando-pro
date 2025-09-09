"use client";
import Badge from "./Badge";
import { City } from "@/data/cities";
import { useRouter } from "next/navigation";

export default function CityCard({ city }: { city: City }) {
  const router = useRouter();

  // Helper function to format cost of living index
  const getCostOfLivingLabel = (index?: number) => {
    if (!index) return "N/A";
    if (index < 50) return "Muy económico";
    if (index < 70) return "Económico";
    if (index < 90) return "Moderado";
    if (index < 110) return "Promedio";
    if (index < 130) return "Costoso";
    return "Muy costoso";
  };

  // Helper function to format population
  const formatPopulation = (pop?: number) => {
    if (!pop) return "N/A";
    if (pop >= 1000000) return `${(pop / 1000000).toFixed(1)}M`;
    if (pop >= 1000) return `${(pop / 1000).toFixed(1)}K`;
    return pop.toString();
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-4 text-left shadow hover:shadow-cyan-400/10 focus:outline-none w-full cursor-pointer"
      onClick={() => router.push(`/city/${city.slug}`)}
    >
      <div className="absolute inset-x-0 -top-10 h-24 bg-cyan-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-50">{city.name}</h3>
        <Badge>{city.country}</Badge>
      </div>

      <p className="mt-1 text-sm text-slate-300 line-clamp-2">{city.summary}</p>

      {/* Enhanced Metrics Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-800/60 p-3">
          <div className="text-slate-300">Day-pass desde</div>
          <div className="text-slate-50 font-semibold">€{city.metrics.dayPassFrom}</div>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-3">
          <div className="text-slate-300">Café</div>
          <div className="text-slate-50 font-semibold">€{city.metrics.coffeeFrom}</div>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-3">
          <div className="text-slate-300">Coworks</div>
          <div className="text-slate-50 font-semibold">{city.metrics.coworkCount}</div>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-3">
          <div className="text-slate-300">Mejor Wi-Fi</div>
          <div className="text-slate-50 font-semibold">{city.metrics.bestWifi}</div>
        </div>
      </div>

      {/* New Numbeo Data Section */}
      {(city.metrics.population || city.metrics.costOfLivingIndex) && (
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {city.metrics.population && (
            <div className="rounded-xl bg-slate-800/40 p-3 border border-slate-700/50">
              <div className="text-slate-400 text-xs">Población</div>
              <div className="text-slate-200 font-medium">{formatPopulation(city.metrics.population)}</div>
            </div>
          )}
          {city.metrics.costOfLivingIndex && (
            <div className="rounded-xl bg-slate-800/40 p-3 border border-slate-700/50">
              <div className="text-slate-400 text-xs">Costo de vida</div>
              <div className="text-slate-50 font-medium">{getCostOfLivingLabel(city.metrics.costOfLivingIndex)}</div>
              <div className="text-slate-500 text-xs">Índice: {city.metrics.costOfLivingIndex}</div>
            </div>
          )}
          {city.metrics.rentIndex && (
            <div className="rounded-xl bg-slate-800/40 p-3 border border-slate-700/50">
              <div className="text-slate-400 text-xs">Alquiler</div>
              <div className="text-slate-50 font-medium">Índice: {city.metrics.rentIndex}</div>
            </div>
          )}
          {city.metrics.restaurantPriceIndex && (
            <div className="rounded-xl bg-slate-800/40 p-3 border border-slate-700/50">
              <div className="text-slate-400 text-xs">Restaurantes</div>
              <div className="text-slate-50 font-medium">Índice: {city.metrics.restaurantPriceIndex}</div>
            </div>
          )}
        </div>
      )}

      {/* Preferencias de viajeros */}
      <div className="mt-4">
        <div className="text-xs text-slate-400 mb-2">Preferencias:</div>
        <div className="flex flex-wrap gap-1">
          {city.preferences.length > 3 && (
            <span className="rounded-full bg-slate-700 text-slate-300 px-2 py-1 text-xs">
              +{city.preferences.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {city.tags.map((t) => (
          <span key={t} className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">#{t}</span>
        ))}
      </div>
    </div>
  );
}