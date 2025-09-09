"use client";
import { useState } from "react";
import { useAiraloCountries, useAiraloCountry } from "@/hooks/useAiraloData";

export default function TestAiraloPage() {
  const [selectedCountry, setSelectedCountry] = useState("ES");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { countries, loading: countriesLoading, error: countriesError } = useAiraloCountries();
  const { country, packages, loading: packagesLoading, error: packagesError } = useAiraloCountry(selectedCountry);

  return (
    <div className="min-h-screen bg-slatebg p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-50 mb-8">🧪 Prueba de Airalo API</h1>
        
        {/* API Status */}
        <div className="mb-8 p-4 rounded-xl bg-slate-800 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Estado de la API</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-slate-700">
              <div className="text-slate-400 text-sm">Países Disponibles</div>
              <div className="text-slate-50 font-bold text-2xl">
                {countriesLoading ? "..." : countries?.length || 0}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-700">
              <div className="text-slate-400 text-sm">País Seleccionado</div>
              <div className="text-slate-50 font-bold">{selectedCountry}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-700">
              <div className="text-slate-400 text-sm">Paquetes eSIM</div>
              <div className="text-slate-50 font-bold text-2xl">
                {packagesLoading ? "..." : packages?.length || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Country Selection */}
        <div className="mb-8 p-4 rounded-xl bg-slate-800 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Seleccionar País</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {countries?.slice(0, 20).map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCountry === c.code
                    ? "bg-cyan-400 text-slate-900"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {c.flag} {c.name}
              </button>
            ))}
          </div>
          <div className="text-sm text-slate-400">
            Mostrando primeros 20 países de {countries?.length || 0} disponibles
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 p-4 rounded-xl bg-slate-800 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Buscar País</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o código de país..."
            className="w-full p-3 rounded-lg bg-slate-700 text-slate-50 border border-slate-600 focus:border-cyan-400 focus:outline-none"
          />
                      <div className="mt-2 text-sm text-slate-400">
              Ejemplos: &quot;Spain&quot;, &quot;ES&quot;, &quot;United States&quot;, &quot;US&quot;
            </div>
        </div>

        {/* Selected Country Info */}
        {selectedCountry && (
          <div className="mb-8 p-4 rounded-xl bg-slate-800 border border-slate-700">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">
              Información de {country?.name || selectedCountry}
            </h2>
            
            {packagesLoading && (
              <div className="text-slate-400">Cargando paquetes...</div>
            )}
            
            {packagesError && (
              <div className="text-red-400 p-3 rounded-lg bg-red-900/20 border border-red-500/30">
                Error: {packagesError}
              </div>
            )}
            
            {packages && packages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.slice(0, 6).map((pkg) => (
                  <div key={pkg.id} className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-50">{pkg.name}</h3>
                      <span className="text-cyan-400 font-bold">
                        ${pkg.price} {pkg.currency}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="text-slate-300">
                        <span className="text-slate-400">Datos:</span> {pkg.data}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-400">Validez:</span> {pkg.validity}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-400">Tipo:</span> {pkg.type}
                      </div>
                      {pkg.description && (
                        <div className="text-slate-400 text-xs mt-2">{pkg.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {packages && packages.length === 0 && !packagesLoading && (
              <div className="text-slate-400">No se encontraron paquetes para este país</div>
            )}
          </div>
        )}

        {/* API Test Endpoint */}
        <div className="mb-8 p-4 rounded-xl bg-slate-800 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Endpoint de Prueba</h2>
          <div className="space-y-2 text-sm">
            <div className="text-slate-400">
              <strong>GET:</strong> <code className="bg-slate-700 px-2 py-1 rounded">/api/test-airalo</code>
            </div>
            <div className="text-slate-400">
              <strong>POST:</strong> <code className="bg-slate-700 px-2 py-1 rounded">/api/test-airalo</code>
              <span className="ml-2">Body: {"{"} &quot;countryCode&quot;: &quot;ES&quot; {"}"}</span>
            </div>
            <div className="text-slate-500 text-xs mt-2">
              Usa estos endpoints para probar la API desde Postman o curl
            </div>
          </div>
        </div>

        {/* Errors Display */}
        {countriesError && (
          <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30">
            <h3 className="text-red-400 font-semibold mb-2">Error al cargar países:</h3>
            <div className="text-red-300 text-sm">{countriesError}</div>
          </div>
        )}
      </div>
    </div>
  );
}
