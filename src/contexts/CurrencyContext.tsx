"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Currency = 'EUR' | 'ARS';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (eurPrice: number) => { eur: string; ars: string };
  getDisplayPrice: (eurPrice: number) => string;
  getPriceForPayment: (eurPrice: number) => number;
  EXCHANGE_RATE: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Tipo de cambio: 1 EUR = 1,400 ARS
const EXCHANGE_RATE = 1400;

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('EUR');

  // Detectar ubicación por IP al cargar
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Verificar si ya hay una preferencia guardada
        const savedCurrency = localStorage.getItem('preferred-currency');
        if (savedCurrency && (savedCurrency === 'EUR' || savedCurrency === 'ARS')) {
          console.log('Usando moneda guardada:', savedCurrency);
          setCurrency(savedCurrency as Currency);
          return;
        }

        // Intentar con múltiples APIs de geolocalización
        const apis = [
          'https://ipapi.co/json/',
          'https://ipinfo.io/json',
          'https://api.country.is/',
          'https://ip-api.com/json/'
        ];

        for (const api of apis) {
          try {
            console.log(`Intentando con API: ${api}`);
            const response = await fetch(api, { 
              method: 'GET',
              headers: { 'Accept': 'application/json' },
              mode: 'cors'
            });
            
            if (response.ok) {
              const data = await response.json();
              console.log('Datos de ubicación recibidos:', data);
              
              // Detectar Argentina o América del Sur con múltiples formatos
              const isArgentina = data.country_code === 'AR' || 
                                 data.country === 'Argentina' ||
                                 data.countryCode === 'AR' ||
                                 data.country === 'AR' ||
                                 data.countryName === 'Argentina';
              
              const isSouthAmerica = data.continent_code === 'SA' || 
                                   data.continent === 'South America' ||
                                   data.region === 'South America' ||
                                   data.regionName === 'South America';
              
              // Detectar países de América Latina que prefieren ARS
              const isLatinAmerica = data.country_code === 'MX' || // México
                                   data.country_code === 'CO' || // Colombia
                                   data.country_code === 'PE' || // Perú
                                   data.country_code === 'CL' || // Chile
                                   data.country_code === 'UY' || // Uruguay
                                   data.country_code === 'PY' || // Paraguay
                                   data.country_code === 'BO' || // Bolivia
                                   data.country_code === 'VE' || // Venezuela
                                   data.country_code === 'EC' || // Ecuador
                                   data.country_code === 'BR' || // Brasil
                                   data.country === 'Mexico' ||
                                   data.country === 'Colombia' ||
                                   data.country === 'Peru' ||
                                   data.country === 'Chile' ||
                                   data.country === 'Uruguay' ||
                                   data.country === 'Paraguay' ||
                                   data.country === 'Bolivia' ||
                                   data.country === 'Venezuela' ||
                                   data.country === 'Ecuador' ||
                                   data.country === 'Brazil';
              
              if (isArgentina || isSouthAmerica || isLatinAmerica) {
                console.log('✅ Detectado: América Latina, usando ARS');
                setCurrency('ARS');
                localStorage.setItem('preferred-currency', 'ARS');
                return;
              } else {
                console.log('✅ Detectado: Fuera de América Latina, usando EUR');
                setCurrency('EUR');
                localStorage.setItem('preferred-currency', 'EUR');
                return;
              }
            } else {
              console.log(`API ${api} respondió con status: ${response.status}`);
            }
          } catch (apiError) {
            console.log(`❌ API ${api} falló:`, apiError);
            continue;
          }
        }
        
        // Si todas las APIs fallan, usar ARS por defecto (más probable para usuarios argentinos)
        console.log('⚠️ Todas las APIs fallaron, usando ARS por defecto');
        setCurrency('ARS');
        localStorage.setItem('preferred-currency', 'ARS');
        
      } catch (error) {
        console.log('❌ Error general en detección de ubicación:', error);
        setCurrency('ARS'); // Cambiar a ARS por defecto
        localStorage.setItem('preferred-currency', 'ARS');
      }
    };

    detectLocation();
  }, []);

  const convertPrice = (eurPrice: number): { eur: string; ars: string } => {
    const arsPrice = Math.round(eurPrice * EXCHANGE_RATE);
    
    return {
      eur: `€${eurPrice.toFixed(2)}`,
      ars: `$${arsPrice.toLocaleString('es-AR')}`
    };
  };

  const getDisplayPrice = (eurPrice: number): string => {
    const prices = convertPrice(eurPrice);
    return currency === 'EUR' ? prices.eur : prices.ars;
  };

  const getPriceForPayment = (eurPrice: number): number => {
    // Para pagos, siempre usar EUR (Stripe) o convertir a ARS (MercadoPago)
    return currency === 'ARS' ? Math.round(eurPrice * EXCHANGE_RATE) : eurPrice;
  };

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('preferred-currency', newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency: handleSetCurrency,
      convertPrice,
      getDisplayPrice,
      getPriceForPayment,
      EXCHANGE_RATE
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
