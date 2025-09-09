"use client";
import { TRAVELER_PREFERENCES, getAvailableCountries } from "@/data/cities";
import { useState, useEffect } from "react";
import CountriesService, { Country } from "@/lib/countries";

interface PreferenceFiltersProps {
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
  selectedPreferences: string[];
  onPreferencesChange: (preferences: string[]) => void;
}

export default function PreferenceFilters({ 
  selectedCountry, 
  onCountryChange, 
  selectedPreferences, 
  onPreferencesChange 
}: PreferenceFiltersProps) {
  
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar países al montar el componente
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setIsLoadingCountries(true);
        const countriesService = CountriesService.getInstance();
        const allCountries = await countriesService.getAllCountries();
        
        // Obtener solo los países que tienen ciudades disponibles
        const availableCountryNames = getAvailableCountries();
        
        // Filtrar los países de la API para incluir solo los disponibles
        const filteredCountries = allCountries.filter(country => 
          country.code === "ALL" || availableCountryNames.includes(country.name)
        );
        
        setCountries(filteredCountries);
      } catch (error) {
        console.error('Error loading countries:', error);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    loadCountries();
  }, []);

  const handleCountrySelect = (country: Country) => {
    if (country.code === "ALL") {
      onCountryChange(null);
    } else {
      onCountryChange(country.name);
    }
    setIsCountryDropdownOpen(false);
    setSearchQuery("");
  };

  const handlePreferenceClick = (preference: string) => {
    const newPreferences = selectedPreferences.includes(preference)
      ? selectedPreferences.filter(p => p !== preference)
      : [...selectedPreferences, preference];
    onPreferencesChange(newPreferences);
  };

  const clearAllFilters = () => {
    onCountryChange(null);
    onPreferencesChange([]);
    setSearchQuery("");
  };

  const getSelectedCountryLabel = () => {
    if (!selectedCountry) {
      return "🌍 Todos los países";
    }
    const country = countries.find(c => c.name === selectedCountry);
    if (!country) return "🌍 Todos los países";
    
    if (country.code === "ALL") {
      return "🌍 Todos los países";
    }
    
    return (
      <div className="flex items-center gap-2">
        <img 
          src={country.flag} 
          alt={`Bandera de ${country.name}`}
          className="w-5 h-4 object-cover rounded-sm"
          onError={(e) => {
            // Fallback a emoji si la imagen falla
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = document.createElement('span');
            fallback.textContent = '🏳️';
            fallback.className = 'text-base';
            target.parentNode?.insertBefore(fallback, target);
          }}
        />
        <span>{country.name}</span>
      </div>
    );
  };

  // Filtrar países por búsqueda
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Paso 1: Selección de País con Select Dropdown */}
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-3">
          🌍 País (opcional)
        </h3>
        
        {/* Select Dropdown Personalizado */}
        <div className="relative">
          <button
            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
            disabled={isLoadingCountries}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-700 bg-slate-800/60 text-slate-200 hover:border-slate-600 hover:bg-slate-700/80 transition-all duration-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center gap-2">
              {isLoadingCountries ? "⏳ Cargando países..." : getSelectedCountryLabel()}
            </span>
            <svg 
              className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isCountryDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border-2 border-slate-700 rounded-xl shadow-xl z-10 max-h-80 overflow-hidden">
              {/* Barra de búsqueda */}
              <div className="p-3 border-b border-slate-600">
                <input
                  type="text"
                  placeholder="🔍 Buscar país o región..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Lista de países */}
              <div className="max-h-60 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full px-4 py-3 text-left hover:bg-slate-700/80 transition-colors duration-150 ${
                        (country.code === "ALL" && !selectedCountry) || selectedCountry === country.name
                          ? 'bg-emerald-400/20 text-emerald-300 border-l-4 border-emerald-400'
                          : 'text-slate-200 hover:text-white'
                      } ${country.code === "ALL" ? 'border-b border-slate-600' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        {country.code === "ALL" ? (
                          <span className="text-lg">{country.flag}</span>
                        ) : (
                          <img 
                            src={country.flag} 
                            alt={`Bandera de ${country.name}`}
                            className="w-6 h-4 object-cover rounded-sm"
                            onError={(e) => {
                              // Fallback a emoji si la imagen falla
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = document.createElement('span');
                              fallback.textContent = '🏳️';
                              fallback.className = 'text-lg';
                              target.parentNode?.insertBefore(fallback, target);
                            }}
                          />
                        )}
                        <div className="flex-1 text-left">
                          <div className="font-medium">{country.name}</div>
                          {country.code !== "ALL" && (
                            <div className="text-xs text-slate-400">{country.region}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-slate-400 text-center">
                    No se encontraron países
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {selectedCountry && (
          <div className="mt-3 text-sm text-emerald-300">
            ✅ País seleccionado: <span className="font-medium">{selectedCountry}</span>
          </div>
        )}

                  {!isLoadingCountries && (
            <div className="mt-2 text-xs text-slate-500">
              🌍 {countries.length - 1} países con ciudades disponibles
            </div>
          )}
      </div>

      {/* Paso 2: Preferencias (Siempre visibles, múltiples selecciones) */}
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-3">
          ⭐ Preferencias de viajero
        </h3>
        <div className="flex flex-wrap gap-2">
          {TRAVELER_PREFERENCES.map((preference) => (
            <button
              key={preference}
              onClick={() => handlePreferenceClick(preference)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedPreferences.includes(preference)
                  ? "bg-cyan-400 text-slate-900 border-2 border-cyan-400 shadow-lg scale-105"
                  : "bg-slate-800/60 text-slate-300 border-2 border-slate-700 hover:bg-slate-700/80 hover:border-slate-600 hover:scale-105"
              }`}
            >
              {preference}
            </button>
          ))}
        </div>
        {selectedPreferences.length > 0 && (
          <div className="mt-3 text-sm text-cyan-300">
            ⭐ Preferencias seleccionadas: <span className="font-medium">{selectedPreferences.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Botón para limpiar filtros */}
      {(selectedCountry || selectedPreferences.length > 0) && (
        <div className="pt-4 border-t border-slate-700">
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors text-sm font-medium"
          >
            🗑️ Limpiar todos los filtros
          </button>
        </div>
      )}

      {/* Click outside para cerrar dropdown */}
      {isCountryDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsCountryDropdownOpen(false)}
        />
      )}
    </div>
  );
}
