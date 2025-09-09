import { useState, useEffect, useCallback } from 'react';
import { weworkService, WeWorkLocation, WeWorkWorkspace } from '@/lib/wework';

interface UseWeWorkDataReturn {
  data: WeWorkLocation[] | WeWorkWorkspace[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseWeWorkLocationsReturn {
  locations: WeWorkLocation[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseWeWorkWorkspacesReturn {
  workspaces: WeWorkWorkspace[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseWeWorkStatsReturn {
  stats: {
    total_locations: number;
    total_workspaces: number;
    average_price: number;
    workspace_types: Record<string, number>;
    amenities_breakdown: Record<string, number>;
  } | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

// Hook para obtener ubicaciones de WeWork en una ciudad
export function useWeWorkLocations(cityName: string, countryCode?: string): UseWeWorkLocationsReturn {
  const [locations, setLocations] = useState<WeWorkLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!weworkService.isConfigured()) {
      setError('WeWork API no está configurada');
      return;
    }

    if (!cityName.trim()) {
      setLocations([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await weworkService.getLocationsByCity(cityName, countryCode);
      setLocations(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener ubicaciones de WeWork');
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }, [cityName, countryCode]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { locations, loading, error, refresh };
}

// Hook para obtener espacios de trabajo de una ubicación
export function useWeWorkWorkspaces(locationId: string): UseWeWorkWorkspacesReturn {
  const [workspaces, setWorkspaces] = useState<WeWorkWorkspace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!weworkService.isConfigured()) {
      setError('WeWork API no está configurada');
      return;
    }

    if (!locationId) {
      setWorkspaces([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await weworkService.getWorkspacesByLocation(locationId);
      setWorkspaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener espacios de trabajo');
      setWorkspaces([]);
    } finally {
      setLoading(false);
    }
  }, [locationId]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { workspaces, loading, error, refresh };
}

// Hook para obtener espacios de trabajo disponibles en una ciudad
export function useWeWorkAvailableWorkspaces(cityName: string, workspaceType?: string): UseWeWorkWorkspacesReturn {
  const [workspaces, setWorkspaces] = useState<WeWorkWorkspace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!weworkService.isConfigured()) {
      setError('WeWork API no está configurada');
      return;
    }

    if (!cityName.trim()) {
      setWorkspaces([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await weworkService.getAvailableWorkspaces(cityName, workspaceType);
      setWorkspaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener espacios disponibles');
      setWorkspaces([]);
    } finally {
      setLoading(false);
    }
  }, [cityName, workspaceType]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { workspaces, loading, error, refresh };
}

// Hook para obtener los mejores espacios por valor
export function useWeWorkBestValueWorkspaces(cityName: string, maxPrice?: number): UseWeWorkWorkspacesReturn {
  const [workspaces, setWorkspaces] = useState<WeWorkWorkspace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!weworkService.isConfigured()) {
      setError('WeWork API no está configurada');
      return;
    }

    if (!cityName.trim()) {
      setWorkspaces([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await weworkService.getBestValueWorkspaces(cityName, maxPrice);
      setWorkspaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener mejores espacios');
      setWorkspaces([]);
    } finally {
      setLoading(false);
    }
  }, [cityName, maxPrice]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { workspaces, loading, error, refresh };
}

// Hook para obtener estadísticas de espacios de trabajo en una ciudad
export function useWeWorkCityStats(cityName: string): UseWeWorkStatsReturn {
  const [stats, setStats] = useState<{
    total_locations: number;
    total_workspaces: number;
    average_price: number;
    workspace_types: Record<string, number>;
    amenities_breakdown: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!weworkService.isConfigured()) {
      setError('WeWork API no está configurada');
      return;
    }

    if (!cityName.trim()) {
      setStats(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await weworkService.getCityWorkspaceStats(cityName);
      setStats(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener estadísticas');
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [cityName]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { stats, loading, error, refresh };
}

// Hook para búsqueda personalizada
export function useWeWorkSearch(): {
  search: (params: {
    city?: string;
    country?: string;
    workspaceType?: string;
    amenities?: string[];
    maxPrice?: number;
  }) => Promise<void>;
  results: WeWorkWorkspace[];
  loading: boolean;
  error: string | null;
  clearResults: () => void;
} {
  const [results, setResults] = useState<WeWorkWorkspace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (params: {
    city?: string;
    country?: string;
    workspaceType?: string;
    amenities?: string[];
    maxPrice?: number;
  }) => {
    if (!weworkService.isConfigured()) {
      setError('WeWork API no está configurada');
      return;
    }

    if (!params.city?.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResponse = await weworkService.searchLocations({
        city: params.city,
        country: params.country,
        workspace_type: params.workspaceType,
        amenities: params.amenities,
        max_price: params.maxPrice,
      });
      
      setResults(searchResponse.workspaces);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la búsqueda');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { search, results, loading, error, clearResults };
}
