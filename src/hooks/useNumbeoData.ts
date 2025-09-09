import { useState, useEffect } from 'react';
import { numbeoService, NumbeoCityData } from '@/lib/numbeo';

interface UseNumbeoDataReturn {
  data: NumbeoCityData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useNumbeoData(cityId?: number): UseNumbeoDataReturn {
  const [data, setData] = useState<NumbeoCityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!cityId || !numbeoService.isConfigured()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cityData = await numbeoService.getCityData(cityId);
      setData(cityData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching data');
      console.error('Error in useNumbeoData:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [cityId]);

  return { data, loading, error, refresh };
}

// Hook for multiple cities
export function useNumbeoDataBatch(cityIds: number[]): {
  data: Record<number, NumbeoCityData>;
  loading: boolean;
  errors: Record<number, string>;
  refresh: () => void;
} {
  const [data, setData] = useState<Record<number, NumbeoCityData>>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<number, string>>({});

  const fetchBatchData = async () => {
    if (!numbeoService.isConfigured() || cityIds.length === 0) {
      return;
    }

    setLoading(true);
    setErrors({});

    const newData: Record<number, NumbeoCityData> = {};
    const newErrors: Record<number, string> = {};

    // Fetch data for all cities in parallel
    const promises = cityIds.map(async (cityId) => {
      try {
        const cityData = await numbeoService.getCityData(cityId);
        newData[cityId] = cityData;
      } catch (err) {
        newErrors[cityId] = err instanceof Error ? err.message : 'Error fetching data';
      }
    });

    await Promise.all(promises);

    setData(newData);
    setErrors(newErrors);
    setLoading(false);
  };

  const refresh = () => {
    fetchBatchData();
  };

  useEffect(() => {
    fetchBatchData();
  }, [cityIds.join(',')]);

  return { data, loading, errors, refresh };
}
