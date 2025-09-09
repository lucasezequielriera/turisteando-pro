import { useState, useEffect } from 'react';
import { airaloService, AiraloPackage, AiraloCountry } from '@/lib/airalo';

interface UseAiraloDataReturn {
  packages: AiraloPackage[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

interface UseAiraloCountryReturn {
  country: AiraloCountry | null;
  packages: AiraloPackage[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

// Hook for getting packages for a specific country
export function useAiraloCountry(countryCode: string): UseAiraloCountryReturn {
  const [country, setCountry] = useState<AiraloCountry | null>(null);
  const [packages, setPackages] = useState<AiraloPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!countryCode || !airaloService.isConfigured()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const countryPackages = await airaloService.getCountryPackages(countryCode);
      setPackages(countryPackages);
      
      // Try to get country info if available
      try {
        const countries = await airaloService.getCountries();
        const countryInfo = countries.find(c => c.code === countryCode);
        if (countryInfo) {
          setCountry(countryInfo);
        }
      } catch (countryError) {
        // Country info not critical, continue with packages
        console.warn('Could not fetch country info:', countryError);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching eSIM data');
      console.error('Error in useAiraloCountry:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [countryCode]);

  return { country, packages, loading, error, refresh };
}

// Hook for searching packages across multiple countries
export function useAiraloSearch(query: string): UseAiraloDataReturn {
  const [packages, setPackages] = useState<AiraloPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!query.trim() || !airaloService.isConfigured()) {
      setPackages([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResults = await airaloService.searchPackages(query);
      setPackages(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching eSIM packages');
      console.error('Error in useAiraloSearch:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchData();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { packages, loading, error, refresh };
}

// Hook for getting the best package for a country
export function useAiraloBestPackage(countryCode: string): {
  bestPackage: AiraloPackage | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
} {
  const [bestPackage, setBestPackage] = useState<AiraloPackage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!countryCode || !airaloService.isConfigured()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const packageData = await airaloService.getBestPackage(countryCode);
      setBestPackage(packageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching best package');
      console.error('Error in useAiraloBestPackage:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [countryCode]);

  return { bestPackage, loading, error, refresh };
}

// Hook for getting all countries
export function useAiraloCountries(): {
  countries: AiraloCountry[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
} {
  const [countries, setCountries] = useState<AiraloCountry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!airaloService.isConfigured()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const countriesData = await airaloService.getCountries();
      setCountries(countriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching countries');
      console.error('Error in useAiraloCountries:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { countries, loading, error, refresh };
}
