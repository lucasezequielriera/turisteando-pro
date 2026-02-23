"use client";
import { useState, useCallback } from "react";

export type Currency = 'EUR' | 'ARS';

// Tipo de cambio: 1 EUR = 1,400 ARS
const EXCHANGE_RATE = 1400;

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('EUR');

  const convertPrice = useCallback((eurPrice: number): { eur: string; ars: string } => {
    const arsPrice = Math.round(eurPrice * EXCHANGE_RATE);
    
    return {
      eur: `€${eurPrice.toFixed(2)}`,
      ars: `$${arsPrice.toLocaleString('es-AR')}`
    };
  }, []);

  const getDisplayPrice = useCallback((eurPrice: number): string => {
    const prices = convertPrice(eurPrice);
    return currency === 'EUR' ? prices.eur : prices.ars;
  }, [currency, convertPrice]);

  const getPriceForPayment = useCallback((eurPrice: number): number => {
    // Para pagos, siempre usar EUR (Stripe) o convertir a ARS (MercadoPago)
    return currency === 'ARS' ? Math.round(eurPrice * EXCHANGE_RATE) : eurPrice;
  }, [currency]);

  return {
    currency,
    setCurrency,
    convertPrice,
    getDisplayPrice,
    getPriceForPayment,
    EXCHANGE_RATE
  };
}
