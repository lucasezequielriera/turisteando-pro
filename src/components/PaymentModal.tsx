"use client";

import { useState } from "react";
import { X, CreditCard, Smartphone, Loader2 } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
import { useCurrency } from "@/contexts/CurrencyContext";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "city" | "country" | "world" | "lifetime";
  city?: string;
  country?: string;
  title: string;
  price: number; // Cambio a number para poder convertir
  description: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  mode,
  city,
  country,
  title,
  price,
  description
}: PaymentModalProps) {
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const { isProcessing, error, processPayment } = usePayment();
  const { currency, getDisplayPrice } = useCurrency();
  
  // Determinar qué métodos de pago mostrar según la ubicación
  const isInLatinAmerica = currency === 'ARS';
  const showStripe = !isInLatinAmerica; // Solo fuera de América Latina
  const showMercadoPago = isInLatinAmerica; // Solo en América Latina

  if (!isOpen) return null;

  const handleStripeClick = async () => {
    if (!email.trim()) {
      setShowEmailInput(true);
      return;
    }
    await processPayment({ mode, email, city, country }, 'stripe');
  };

  const handleMercadoPagoClick = async () => {
    await processPayment({ mode, city, country, currency }, 'mercadopago');
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      alert('Por favor ingresa tu email');
      return;
    }
    await processPayment({ mode, email, city, country }, 'stripe');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/90 border border-slate-700/50 rounded-2xl p-6 w-full max-w-md backdrop-blur-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Elegir método de pago</h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-slate-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plan Info */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/60 rounded-xl p-4 mb-6 border border-slate-600/30 backdrop-blur-sm">
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mt-1">
            {getDisplayPrice(price)}
          </p>
          <p className="text-slate-300 text-sm mt-1">{description}</p>
          <p className="text-slate-400 text-xs mt-2">Precios en {currency === 'ARS' ? 'Pesos argentinos (ARS)' : 'Euros (EUR)'}; el método de pago se ajusta a tu ubicación.</p>
        </div>

        {/* Email Input - Solo para Stripe */}
        {showEmailInput && showStripe && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email para Stripe
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                disabled={isProcessing}
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={handleEmailSubmit}
                disabled={isProcessing || !email.trim()}
                className="px-4 py-3 bg-cyan-400 text-slate-900 rounded-xl hover:bg-cyan-300 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Continuar'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Payment Method Buttons */}
        <div className="space-y-3">
          {/* Stripe Button - Solo fuera de América Latina */}
          {showStripe && (
            <button
              onClick={handleStripeClick}
              disabled={isProcessing}
              className="w-full p-4 border border-slate-600/50 hover:border-cyan-400/60 bg-gradient-to-r from-slate-800/80 to-slate-700/60 hover:from-cyan-400/10 hover:to-blue-400/10 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-3 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20"
            >
              <CreditCard className="w-6 h-6 text-cyan-400" />
              <span className="text-white font-medium">Pagar con Stripe</span>
            </button>
          )}

          {/* MercadoPago Button - Solo en América Latina */}
          {showMercadoPago && (
            <button
              onClick={handleMercadoPagoClick}
              disabled={isProcessing}
              className="w-full p-4 border border-slate-600/50 hover:border-cyan-400/60 bg-gradient-to-r from-slate-800/80 to-slate-700/60 hover:from-cyan-400/10 hover:to-blue-400/10 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-3 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20"
            >
              <Smartphone className="w-6 h-6 text-cyan-400" />
              <span className="text-white font-medium">Pagar con MercadoPago</span>
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Cancel Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-slate-700/80 to-slate-600/60 text-slate-300 rounded-xl hover:from-slate-600/80 hover:to-slate-500/60 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm border border-slate-600/30"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
