"use client";
import { useState } from "react";
import { WeWorkWorkspace } from "@/lib/wework";
import { useWeWorkAvailableWorkspaces, useWeWorkCityStats } from "@/hooks/useWeWorkData";

interface WorkspaceInfoProps {
  cityName: string;
  countryCode?: string;
  className?: string;
}

export default function WorkspaceInfo({ cityName, countryCode, className = "" }: WorkspaceInfoProps) {
  const [selectedWorkspaceType, setSelectedWorkspaceType] = useState<string>('all');
  
  const { workspaces, loading, error, refresh } = useWeWorkAvailableWorkspaces(cityName, selectedWorkspaceType === 'all' ? undefined : selectedWorkspaceType);
  const { stats, loading: statsLoading, error: statsError } = useWeWorkCityStats(cityName);

  const workspaceTypes = [
    { value: 'all', label: '🏢 Todos', icon: '🏢' },
    { value: 'office', label: '🏠 Oficinas', icon: '🏠' },
    { value: 'dedicated_desk', label: '🪑 Escritorio Dedicado', icon: '🪑' },
    { value: 'hot_desk', label: '💺 Hot Desk', icon: '💺' },
    { value: 'meeting_room', label: '🤝 Salas de Reunión', icon: '🤝' },
    { value: 'event_space', label: '🎉 Espacios de Eventos', icon: '🎉' },
  ];

  const getWorkspaceTypeLabel = (type: string) => {
    const found = workspaceTypes.find(t => t.value === type);
    return found ? found.label : type;
  };

  const getPriceLabel = (workspace: WeWorkWorkspace) => {
    const { amount, currency, period } = workspace.price;
    const periodMap: Record<string, string> = {
      'hourly': 'hora',
      'daily': 'día',
      'weekly': 'semana',
      'monthly': 'mes',
      'yearly': 'año'
    };
    
    return `${currency} ${amount}/${periodMap[period] || period}`;
  };

  const getFeaturesIcons = (features: WeWorkWorkspace['features']) => {
    const icons = [];
    if (features.wifi) icons.push('📶');
    if (features.printing) icons.push('🖨️');
    if (features.coffee) icons.push('☕');
    if (features.kitchen) icons.push('🍽️');
    if (features.phone_booths) icons.push('📞');
    if (features.meeting_rooms) icons.push('🤝');
    if (features.event_spaces) icons.push('🎉');
    if (features.gym) icons.push('💪');
    if (features.showers) icons.push('🚿');
    if (features.parking) icons.push('🅿️');
    if (features.bike_storage) icons.push('🚲');
    if (features.pet_friendly) icons.push('🐕');
    
    return icons.length > 0 ? icons.join(' ') : null;
  };

  const getSizeLabel = (size: WeWorkWorkspace['size']) => {
    return `${size.square_meters} m² (${size.square_feet} ft²)`;
  };

  if (!cityName) {
    return (
      <div className={`rounded-xl bg-slate-800/60 p-4 border border-slate-700 ${className}`}>
        <div className="text-slate-400 text-sm">Información de espacios de trabajo no disponible</div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-slate-800/60 p-4 border border-slate-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-cyan-400 text-sm font-medium">Espacios de Trabajo en {cityName}</div>
        <button
          onClick={refresh}
          className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
        >
          🔄 Actualizar
        </button>
      </div>

      {/* Stats Overview */}
      {stats && !statsLoading && (
        <div className="mb-4 p-3 rounded-lg bg-slate-700/50 border border-slate-600/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="text-center">
              <div className="text-slate-400">Ubicaciones</div>
              <div className="text-slate-200 font-bold">{stats.total_locations}</div>
            </div>
            <div className="text-center">
              <div className="text-slate-400">Espacios</div>
              <div className="text-slate-200 font-bold">{stats.total_workspaces}</div>
            </div>
            <div className="text-center">
              <div className="text-slate-400">Precio Promedio</div>
              <div className="text-slate-200 font-bold">${stats.average_price.toFixed(0)}</div>
            </div>
            <div className="text-center">
              <div className="text-slate-400">Tipos</div>
              <div className="text-slate-200 font-bold">{Object.keys(stats.workspace_types).length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Workspace Type Filter */}
      <div className="mb-4">
        <div className="text-xs text-slate-400 mb-2">Filtrar por tipo:</div>
        <div className="flex flex-wrap gap-1">
          {workspaceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedWorkspaceType(type.value)}
              className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedWorkspaceType === type.value
                  ? 'bg-cyan-400 text-slate-900'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-200'
              }`}
            >
              {type.icon} {type.label.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="text-center py-8">
          <div className="text-slate-400 text-sm">Cargando espacios de trabajo...</div>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <div className="text-red-400 text-sm mb-2">Error: {error}</div>
          <button
            onClick={refresh}
            className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 text-xs border border-red-500/30 hover:bg-red-500/30"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && workspaces && workspaces.length > 0 && (
        <div className="space-y-3">
          {workspaces.slice(0, 5).map((workspace) => (
            <div key={workspace.id} className="p-3 rounded-lg bg-slate-700/50 border border-slate-600/50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-slate-200 text-sm">{workspace.name}</h4>
                <span className="text-cyan-400 font-bold text-xs">
                  {getPriceLabel(workspace)}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-slate-300">
                  <span className="text-slate-400">Tipo:</span> {getWorkspaceTypeLabel(workspace.type)}
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400">Tamaño:</span> {getSizeLabel(workspace.size)}
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400">Capacidad:</span> {workspace.capacity} personas
                </div>
                {workspace.description && (
                  <div className="text-slate-400 text-xs mt-2 line-clamp-2">
                    {workspace.description}
                  </div>
                )}
              </div>

              {/* Features */}
              {getFeaturesIcons(workspace.features) && (
                <div className="text-slate-400 text-xs mt-2">
                  {getFeaturesIcons(workspace.features)}
                </div>
              )}

              {/* Availability */}
              <div className="mt-2 text-xs">
                <span className={`px-2 py-1 rounded-full ${
                  workspace.availability.available
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {workspace.availability.available ? '✅ Disponible' : '❌ No disponible'}
                </span>
              </div>
            </div>
          ))}

          {workspaces.length > 5 && (
            <div className="text-center pt-2">
              <div className="text-slate-400 text-xs">
                Mostrando 5 de {workspaces.length} espacios • 
                <button className="ml-1 text-cyan-400 hover:text-cyan-300 underline">
                  Ver todos
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && !error && workspaces && workspaces.length === 0 && (
        <div className="text-center py-8">
          <div className="text-slate-400 text-sm">No se encontraron espacios de trabajo</div>
          <div className="text-slate-500 text-xs mt-1">Prueba con otro tipo o ciudad</div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-700">
        <div className="text-xs text-slate-500">
          Datos de WeWork • Actualizado en tiempo real
        </div>
      </div>
    </div>
  );
}
