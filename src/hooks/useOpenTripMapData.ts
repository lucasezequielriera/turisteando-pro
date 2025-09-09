import { useState, useEffect, useCallback } from 'react';
import { openTripMapService, OpenTripMapPlace } from '@/lib/opentripmap';

interface UseOpenTripMapDataReturn {
  places: OpenTripMapPlace[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseOpenTripMapSearchReturn {
  places: OpenTripMapPlace[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
  refresh: () => void;
}

export function useOpenTripMapCafes(cityName: string, countryCode?: string): UseOpenTripMapDataReturn {
  const [places, setPlaces] = useState<OpenTripMapPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await openTripMapService.searchCafes(cityName, countryCode);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching cafes');
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

export function useOpenTripMapCoworking(cityName: string, countryCode?: string): UseOpenTripMapDataReturn {
  const [places, setPlaces] = useState<OpenTripMapPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await openTripMapService.searchCoworkingSpaces(cityName, countryCode);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching coworking spaces');
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

export function useOpenTripMapRestaurants(cityName: string, countryCode?: string, cuisine?: string): UseOpenTripMapDataReturn {
  const [places, setPlaces] = useState<OpenTripMapPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await openTripMapService.searchRestaurants(cityName, countryCode, cuisine);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching restaurants');
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

export function useOpenTripMapSearch(): UseOpenTripMapSearchReturn {
  const [places, setPlaces] = useState<OpenTripMapPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setPlaces([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await openTripMapService.searchPlaces({ name: query.trim() });
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching places');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    if (places.length > 0) {
      search(places[0].name);
    }
  }, [places, search]);

  return { places, loading, error, search, refresh };
}

export function useOpenTripMapNearby(lat: number, lon: number, radius: number = 1000, kinds?: string): UseOpenTripMapDataReturn {
  const [places, setPlaces] = useState<OpenTripMapPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await openTripMapService.searchNearbyPlaces(lat, lon, radius, kinds);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching nearby places');
    } finally {
      setLoading(false);
    }
  }, [lat, lon, radius, kinds]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { places, loading, error, refresh };
}

export function useOpenTripMapBestRated(cityName: string, category: string, limit: number = 10): UseOpenTripMapDataReturn {
  const [places, setPlaces] = useState<OpenTripMapPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await openTripMapService.getBestRatedPlaces(cityName, category, limit);
      setPlaces(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching best rated places');
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
