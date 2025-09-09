"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CITIES } from "@/data/cities";
import CityCard from "@/components/CityCard";
import PreferenceFilters from "@/components/PreferenceFilters";
import Pagination from "@/components/Pagination";

const CARDS_PER_PAGE = 6;

export default function HomePage() {
  const [q, setQ] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const results = useMemo(() => {
    // Si no hay país específico Y no hay preferencias, no mostrar nada
    if (!selectedCountry && selectedPreferences.length === 0) {
      return [];
    }

    let filtered = CITIES;

    // Paso 1: Filtrar por país seleccionado (si hay uno específico)
    if (selectedCountry) {
      filtered = filtered.filter(city => city.country === selectedCountry);
    }

    // Paso 2: Filtrar por preferencias seleccionadas (solo si hay preferencias)
    if (selectedPreferences.length > 0) {
      filtered = filtered.filter(city =>
        selectedPreferences.some(pref => city.preferences.includes(pref))
      );
    }

    // Paso 3: Filtrar por texto de búsqueda (si hay alguna)
    if (q.trim()) {
      const searchTerm = q.trim().toLowerCase();
      filtered = filtered.filter(city =>
        city.name.toLowerCase().includes(searchTerm) ||
        city.country.toLowerCase().includes(searchTerm) ||
        city.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        city.preferences.some(pref => pref.toLowerCase().includes(searchTerm))
      );
    }

    // Paso 4: Eliminar duplicados por slug (por si acaso)
    const uniqueCities = filtered.filter((city, index, self) => 
      index === self.findIndex(c => c.slug === city.slug)
    );

    return uniqueCities;
  }, [q, selectedCountry, selectedPreferences]);

  // Calculate pagination
  const totalPages = Math.ceil(results.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentResults = results.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleCountryChange = (country: string | null) => {
    setSelectedCountry(country);
    setCurrentPage(1);
  };

  const handlePreferencesChange = (preferences: string[]) => {
    setSelectedPreferences(preferences);
    setCurrentPage(1);
  };

  const handleSearchChange = (searchTerm: string) => {
    setQ(searchTerm);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Removed automatic scroll to top
  };

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-50">
              Guías para <span style={{ color: "#67E8f9" }}>nómadas</span> y viajeros
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Info accionable: dónde trabajar, cuánto gastar, eSIM, bancos y barrios. Sin humo, todo al grano.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/buy/all"
                className="rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-slate-900 hover:bg-emerald-300 transition-colors"
              >
                Acceso total (€9/mes)
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Ver todos los planes
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="rounded-2xl border border-slate-800 bg-[conic-gradient(at_top_left,#0ea5e920,#22d3ee10,#0ea5e920)] p-4">
              <div className="rounded-xl p-1 text-sm text-slate-200">
                <div className="font-semibold text-lg">Qué desbloqueás</div>
                
                <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                  <li>• Cafés con Wi-Fi y enchufes</li>
                  <li>• Comparador de eSIM y bancos</li>
                  <li>• Presupuesto real por día</li>
                  <li>• Barrios y ofertas de alojamiento</li>
                  <li>• Emergencias y enlaces útiles</li>
                </ul>
                
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                  <div className="text-sm text-slate-200 mb-2 font-semibold">Recibí alertas mensuales cada ciudad</div>
                  <div className="text-xs text-slate-400">Newsletter disponible al suscribirte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ciudades Destacadas */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-50 mb-3">
            Ciudades <span className="text-cyan-300">Destacadas</span>
          </h2>
          <p className="text-slate-300 text-lg">
            Descubre las mejores opciones del 2025 según lo que busques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mejor ciudad para vacacionar */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 text-center hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🏖️</div>
              <h3 className="text-xl font-bold text-slate-50 mb-2">Mejor para Vacacionar</h3>
              <p className="text-slate-300 text-sm mb-4">
                Playas paradisíacas, cultura vibrante y experiencias únicas
              </p>
              <div className="text-orange-400 font-semibold text-lg">Bali, Indonesia</div>
              <div className="text-slate-400 text-xs mt-1">Clima perfecto • Aventuras • Relax</div>
            </div>
          </div>

          {/* Mejor ciudad para vivir */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-6 text-center hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-slate-50 mb-2">Mejor para Vivir</h3>
              <p className="text-slate-300 text-sm mb-4">
                Calidad de vida, seguridad y oportunidades laborales
              </p>
              <div className="text-emerald-400 font-semibold text-lg">Singapur</div>
              <div className="text-slate-400 text-xs mt-1">Seguridad • Tecnología • Multicultural</div>
            </div>
          </div>

          {/* Mejor ciudad para estudiar */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 text-center hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-slate-50 mb-2">Mejor para Estudiar</h3>
              <p className="text-slate-300 text-sm mb-4">
                Universidades de prestigio y ambiente académico
              </p>
              <div className="text-blue-400 font-semibold text-lg">Berlín, Alemania</div>
              <div className="text-slate-400 text-xs mt-1">Educación • Innovación • Historia</div>
            </div>
          </div>

          {/* Mejor ciudad para emprender */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-slate-50 mb-2">Mejor para Emprender</h3>
              <p className="text-slate-300 text-sm mb-4">
                Ecosistema startup, networking y financiamiento
              </p>
              <div className="text-purple-400 font-semibold text-lg">Austin, Texas</div>
              <div className="text-slate-400 text-xs mt-1">Startups • Tech • Inversores</div>
            </div>
          </div>
        </div>

      </section>

      {/* Filtros de Búsqueda */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-50 mb-3">
            Encuentra tu <span className="text-cyan-300">Ciudad Ideal</span>
          </h2>
          <p className="text-slate-300 text-lg">
            Filtra por preferencias y busca la ciudad perfecta para ti
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <PreferenceFilters
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
            selectedPreferences={selectedPreferences}
            onPreferencesChange={handlePreferencesChange}
          />

          <div className="relative mt-6">
            <input
              value={q}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Buscar ciudad, país, etiqueta o preferencia (ej. wifi, montañas, España)"
              className="w-full rounded-xl border border-slate-800 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Results count and info */}
          {results.length > 0 && (
            <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
              <div>
                Mostrando {startIndex + 1}-{Math.min(endIndex, results.length)} de {results.length} ciudades
                {selectedCountry && (
                  <span className="ml-2">
                    • País: <span className="text-cyan-300">{selectedCountry}</span>
                  </span>
                )}
                {selectedPreferences.length > 0 && (
                  <span className="ml-2">
                    • Filtros: <span className="text-cyan-300">{selectedPreferences.join(", ")}</span>
                  </span>
                )}
              </div>
              {results.length > CARDS_PER_PAGE && (
                <div className="text-slate-500">
                  {CARDS_PER_PAGE} por página
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lista de Ciudades */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        {/* City cards grid */}
                       {currentResults.length > 0 ? (
                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                   {currentResults.map(c => <CityCard key={c.slug} city={c} />)}
                 </div>
                               ) : !selectedCountry && selectedPreferences.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🌍</div>
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">
                      ¡Comienza a explorar ciudades!
                    </h3>
                    <p className="text-slate-400 text-lg mb-4">
                      Selecciona un país específico o elige tus preferencias de viajero para descubrir destinos increíbles
                    </p>
                    <div className="text-slate-500 text-sm">
                      💡 <strong>País específico:</strong> Verás todas las ciudades de ese país<br/>
                      💡 <strong>Preferencias:</strong> Verás ciudades de todo el mundo que coincidan con tus gustos
                    </div>
                  </div>
                ) : selectedCountry && selectedPreferences.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🏙️</div>
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">
                      ¡Perfecto! Has seleccionado <span className="text-cyan-300">{selectedCountry}</span>
                    </h3>
                    <p className="text-slate-400 text-lg mb-4">
                      Ahora puedes filtrar por preferencias para encontrar las ciudades perfectas en este país
                    </p>
                    <div className="text-slate-500 text-sm">
                      💡 Las ciudades de {selectedCountry} ya están disponibles, pero puedes refinar con preferencias
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-slate-400 text-lg">No se encontraron ciudades con esos criterios</p>
                    <p className="text-slate-500 text-sm mt-2">
                      {selectedCountry 
                        ? `No hay ciudades en ${selectedCountry} que coincidan con tus preferencias. Prueba ajustando los filtros.`
                        : "Prueba ajustando los filtros o seleccionando un país específico"
                      }
                    </p>
                  </div>
                )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>

      <footer className="border-t border-slate-900 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-400 text-center">
          © 2025 Turisteando Ciudades · Info orientativa · Algunos enlaces pueden ser de afiliado.
        </div>
      </footer>
    </div>
  );
}