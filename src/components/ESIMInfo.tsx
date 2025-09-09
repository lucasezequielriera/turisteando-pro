"use client";
import { useAiraloBestPackage } from "@/hooks/useAiraloData";
import { useState } from "react";

interface ESIMInfoProps {
  countryCode: string;
  cityName: string;
  className?: string;
}

export default function ESIMInfo({ countryCode, cityName, className = "" }: ESIMInfoProps) {
  const { bestPackage, loading, error, refresh } = useAiraloBestPackage(countryCode);
  const [showAllPackages, setShowAllPackages] = useState(false);

  if (!countryCode) {
    return (
      <div className={`rounded-xl bg-slate-800/60 p-3 ${className}`}>
        <div className="text-slate-400 text-xs">eSIM</div>
        <div className="text-slate-300 text-sm">Información no disponible</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`rounded-xl bg-slate-800/60 p-3 ${className}`}>
        <div className="text-slate-400 text-xs">eSIM</div>
        <div className="text-slate-300 text-sm">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-xl bg-slate-800/60 p-3 border border-red-500/30 ${className}`}>
        <div className="text-slate-400 text-xs">eSIM</div>
        <div className="text-red-400 text-sm">Error al cargar</div>
        <button 
          onClick={refresh}
          className="text-xs text-cyan-400 hover:text-cyan-300 underline mt-1"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!bestPackage) {
    return (
      <div className={`rounded-xl bg-slate-800/60 p-3 ${className}`}>
        <div className="text-slate-400 text-xs">eSIM</div>
        <div className="text-slate-300 text-sm">No disponible</div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-slate-800/60 p-3 border border-cyan-500/30 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-cyan-400 text-xs font-medium">eSIM Recomendado</div>
        <button
          onClick={() => setShowAllPackages(!showAllPackages)}
          className="text-xs text-slate-400 hover:text-slate-300"
        >
          {showAllPackages ? "Ver menos" : "Ver más"}
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-300 text-sm">{bestPackage.data}</span>
          <span className="text-slate-50 font-semibold">
            ${bestPackage.price} {bestPackage.currency}
          </span>
        </div>
        
        <div className="text-slate-400 text-xs">
          Válido por {bestPackage.validity}
        </div>
        
        {bestPackage.description && (
          <div className="text-slate-400 text-xs">
            {bestPackage.description}
          </div>
        )}
      </div>

      {showAllPackages && (
        <div className="mt-3 pt-3 border-t border-slate-700">
          <div className="text-slate-400 text-xs mb-2">Otros planes disponibles:</div>
          <div className="text-xs text-slate-500">
            Usa el filtro de preferencias para ver más opciones de eSIM
          </div>
        </div>
      )}
      
      <div className="mt-2 text-xs text-slate-500">
        Datos de Airalo • Actualizado en tiempo real
      </div>
    </div>
  );
}
