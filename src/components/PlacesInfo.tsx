"use client";
import { useState, useEffect } from "react";
import { MockPlace } from "@/lib/mock-places";
import { mockPlacesService } from "@/lib/mock-places";

interface PlacesInfoProps {
  cityName: string;
  countryCode?: string;
  className?: string;
}

export default function PlacesInfo({ cityName, countryCode, className = "" }: PlacesInfoProps) {
  const [activeTab, setActiveTab] = useState<'cafes' | 'coworking' | 'restaurants'>('cafes');
  const [places, setPlaces] = useState<MockPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data when component mounts or tab changes
  const loadData = async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let results: MockPlace[] = [];
      
      switch (activeTab) {
        case 'cafes':
          results = await mockPlacesService.searchCafes(cityName, countryCode);
          break;
        case 'coworking':
          results = await mockPlacesService.searchCoworkingSpaces(cityName, countryCode);
          break;
        case 'restaurants':
          results = await mockPlacesService.searchRestaurants(cityName, countryCode);
          break;
      }
      
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading places');
    } finally {
      setLoading(false);
    }
  };

  // Load data when tab changes
  const handleTabChange = (tab: 'cafes' | 'coworking' | 'restaurants') => {
    setActiveTab(tab);
    setPlaces([]); // Clear current places
    loadData(); // Load new data
  };

  // Load initial data
  useEffect(() => {
    loadData();
  }, [activeTab, cityName]);

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'cafes': return '☕ Cafés';
      case 'coworking': return '💼 Coworking';
      case 'restaurants': return '🍽️ Restaurantes';
      default: return tab;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-400';
    if (rating >= 4.0) return 'text-yellow-400';
    if (rating >= 3.5) return 'text-orange-400';
    return 'text-red-400';
  };

  if (!cityName) {
    return (
      <div className={`rounded-xl bg-slate-800/60 p-4 border border-slate-700 ${className}`}>
        <div className="text-slate-400 text-sm">Ciudad no especificada</div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-slate-800/60 p-4 border border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-cyan-400 text-sm font-medium">Lugares en {cityName}</div>
        <div className="flex gap-1">
          {(['cafes', 'coworking', 'restaurants'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "bg-cyan-400 text-slate-900"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="text-slate-400 text-sm">Buscando lugares...</div>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <div className="text-red-400 text-sm mb-2">Error: {error}</div>
          <button
            onClick={loadData}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && places.length === 0 && (
        <div className="text-center py-8">
          <div className="text-slate-400 text-sm">No se encontraron lugares</div>
        </div>
      )}

      {!loading && !error && places.length > 0 && (
        <div className="space-y-3">
          {places.map((place) => (
            <div key={place.id} className="border border-slate-700 rounded-lg p-3 bg-slate-800/40">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-slate-200 font-medium text-sm">{place.name}</h4>
                  <div className="text-slate-400 text-xs mt-1">{place.address}</div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-medium ${getRatingColor(place.rating)}`}>
                        {place.rating.toFixed(1)}
                      </span>
                      <span className="text-slate-500 text-xs">★</span>
                    </div>
                    
                    <div className="text-slate-400 text-xs">
                      {mockPlacesService.getPriceLabel(place.price)}
                    </div>
                    
                    <div className="text-slate-500 text-xs">
                      {mockPlacesService.getFeaturesIcons(place.features)}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="text-slate-300 text-xs">{place.description}</div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {place.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-slate-700">
        <div className="text-xs text-slate-500">
          Datos de ejemplo • Funcionalidad inmediata • Configura APIs reales cuando estén listas
        </div>
      </div>
    </div>
  );
}

