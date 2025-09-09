import { useState, useEffect, useCallback } from 'react';
import { foursquareService, FoursquarePlace } from '@/lib/foursquare';

interface UseFoursquareDataReturn {
  places: FoursquarePlace[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseFoursquareSearchReturn {
  places: FoursquarePlace[];
  loading: boolean;
  error: string | null;
  search: (query: string, cityName: string, countryCode?: string) => void;
  refresh: () => void;
}

// Hook para buscar lugares en una ciudad
export function useFoursquareSearch(): UseFoursquareSearchReturn {
  const [places, setPlaces] = useState<FoursquarePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, cityName: string, countryCode?: string) => {
    if (!foursquareService.isConfigured()) {
      setError('Foursquare API no está configurada');
      return;
    }

    if (!query.trim() || !cityName.trim()) {
      setPlaces([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await foursquareService.searchPlaces({
        query: query.trim(),
        near: countryCode ? `${cityName}, ${countryCode}` : cityName,
        limit: 20,
        sort: 'RATING'
      });
      
      setPlaces(results.response.venues || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar lugares');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    setPlaces([]);
    setError(null);
  }, []);

  return { places, loading, error, search, refresh };
}

// Hook para obtener cafés de una ciudad
export function useFoursquareCafes(cityName: string, countryCode?: string): UseFoursquareDataReturn {
  const [places, setPlaces] = useState<FoursquarePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!foursquareService.isConfigured()) {
      setError('Foursquare API no está configurada');
      return;
    }

    if (!cityName.trim()) {
      setPlaces([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await foursquareService.searchCafes(cityName, countryCode);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener cafés');
      setPlaces([]);
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

  return { places, loading, error, refresh };
}

// Hook para obtener espacios de coworking
export function useFoursquareCoworking(cityName: string, countryCode?: string): UseFoursquareDataReturn {
  const [places, setPlaces] = useState<FoursquarePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!foursquareService.isConfigured()) {
      setError('Foursquare API no está configurada');
      return;
    }

    if (!cityName.trim()) {
      setPlaces([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await foursquareService.searchCoworkingSpaces(cityName, countryCode);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener espacios de coworking');
      setPlaces([]);
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

  return { places, loading, error, refresh };
}

// Hook para obtener restaurantes
export function useFoursquareRestaurants(cityName: string, countryCode?: string, cuisine?: string): UseFoursquareDataReturn {
  const [places, setPlaces] = useState<FoursquarePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!foursquareService.isConfigured()) {
      setError('Foursquare API no está configurada');
      return;
    }

    if (!cityName.trim()) {
      setPlaces([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await foursquareService.searchRestaurants(cityName, countryCode, cuisine);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener restaurantes');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, [cityName, countryCode, cuisine]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { places, loading, error, refresh };
}

// Hook para obtener lugares cercanos por coordenadas
export function useFoursquareNearby(lat: number, lng: number, radius: number = 1000): UseFoursquareDataReturn {
  const [places, setPlaces] = useState<FoursquarePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!foursquareService.isConfigured()) {
      setError('Foursquare API no está configurada');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await foursquareService.getNearbyPlaces(lat, lng, radius);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener lugares cercanos');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, [lat, lng, radius]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { places, loading, error, refresh };
}

// Hook para obtener los mejores lugares calificados
export function useFoursquareBestRated(cityName: string, category: string, limit: number = 10): UseFoursquareDataReturn {
  const [places, setPlaces] = useState<FoursquarePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!foursquareService.isConfigured()) {
      setError('Foursquare API no está configurada');
      return;
    }

    if (!cityName.trim() || !category.trim()) {
      setPlaces([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await foursquareService.getBestRatedPlaces(cityName, category, limit);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener mejores lugares');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, [cityName, category, limit]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { places, loading, error, refresh };
}
