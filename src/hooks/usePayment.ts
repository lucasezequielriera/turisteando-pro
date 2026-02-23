"use client";

import { useState } from "react";

interface PaymentData {
  mode: "city" | "country" | "world" | "all" | "lifetime";
  email?: string;
  city?: string;
  country?: string;
  currency?: 'EUR' | 'ARS';
}

interface UsePaymentReturn {
  isProcessing: boolean;
  error: string | null;
  processPayment: (data: PaymentData, method: 'stripe' | 'mercadopago') => Promise<void>;
}

export function usePayment(): UsePaymentReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (data: PaymentData, method: 'stripe' | 'mercadopago'): Promise<void> => {
    setIsProcessing(true);
    setError(null);

    try {
      let response: Response;
      let result: { url?: string; init_point?: string; error?: string };

      if (method === 'stripe') {
        response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Stripe checkout failed');
        if (result.url) window.location.href = result.url; else throw new Error('No checkout URL received from Stripe');
      } else if (method === 'mercadopago') {
        response = await fetch('/api/mercadopago/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        result = await response.json();
        if (!response.ok) throw new Error(result.error || 'MercadoPago checkout failed');
        if (result.init_point) window.location.href = result.init_point; else throw new Error('No checkout URL received from MercadoPago');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment processing failed';
      setError(errorMessage);
      console.error('Payment error:', errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, error, processPayment };
}
