"use client";
import { useState } from "react";
import { Globe } from "lucide-react";

interface CurrencySelectorProps {
  onCurrencyChange: (currency: 'EUR' | 'ARS') => void;
  currentCurrency: 'EUR' | 'ARS';
}

export default function CurrencySelector({ onCurrencyChange, currentCurrency }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencySelect = (currency: 'EUR' | 'ARS') => {
    onCurrencyChange(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg transition-all duration-200 backdrop-blur-sm"
      >
        <Globe className="w-4 h-4 text-cyan-400" />
        <span className="text-white font-medium">{currentCurrency}</span>
        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-slate-800/90 border border-slate-600/50 rounded-lg shadow-xl backdrop-blur-sm z-50">
          <button
            onClick={() => handleCurrencySelect('EUR')}
            className={`w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors first:rounded-t-lg ${
              currentCurrency === 'EUR' ? 'bg-cyan-400/20 text-cyan-400' : 'text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">EUR (€)</span>
              <span className="text-sm text-slate-400">Euros</span>
            </div>
          </button>
          <button
            onClick={() => handleCurrencySelect('ARS')}
            className={`w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors last:rounded-b-lg ${
              currentCurrency === 'ARS' ? 'bg-cyan-400/20 text-cyan-400' : 'text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">ARS ($)</span>
              <span className="text-sm text-slate-400">Pesos Argentinos</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
