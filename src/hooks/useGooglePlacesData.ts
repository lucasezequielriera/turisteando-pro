import { useState, useEffect, useCallback } from 'react';
import { googlePlacesService, GooglePlace } from '@/lib/google-places';

interface UseGooglePlacesDataReturn {
  places: GooglePlace[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseGooglePlacesSearchReturn {
  places: GooglePlace[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
  refresh: () => void;
}

export function useGooglePlacesCafes(cityName: string, countryCode?: string): UseGooglePlacesDataReturn {
  const [places, setPlaces] = useState<GooglePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await googlePlacesService.searchCafes(cityName, countryCode);
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

export function useGooglePlacesCoworking(cityName: string, countryCode?: string): UseGooglePlacesDataReturn {
  const [places, setPlaces] = useState<GooglePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await googlePlacesService.searchCoworkingSpaces(cityName, countryCode);
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

export function useGooglePlacesRestaurants(cityName: string, countryCode?: string, cuisine?: string): UseGooglePlacesDataReturn {
  const [places, setPlaces] = useState<GooglePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await googlePlacesService.searchRestaurants(cityName, countryCode, cuisine);
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

export function useGooglePlacesSearch(): UseGooglePlacesSearchReturn {
  const [places, setPlaces] = useState<GooglePlace[]>([]);
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
      const response = await googlePlacesService.searchPlaces({ query: query.trim() });
      setPlaces(response.results || []);
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

export function useGooglePlacesNearby(lat: number, lng: number, radius: number = 1000, type?: string): UseGooglePlacesDataReturn {
  const [places, setPlaces] = useState<GooglePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await googlePlacesService.searchNearbyPlaces(lat, lng, radius, type);
      setPlaces(response.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching nearby places');
    } finally {
      setLoading(false);
    }
  }, [lat, lng, radius, type]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { places, loading, error, refresh };
}

export function useGooglePlacesBestRated(cityName: string, category: string, limit: number = 10): UseGooglePlacesDataReturn {
  const [places, setPlaces] = useState<GooglePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await googlePlacesService.getBestRatedPlaces(cityName, category, limit);
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
