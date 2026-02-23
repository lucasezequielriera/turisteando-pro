"use client";

import Link from "next/link";
import Image from "next/image";
import { useCurrency } from "@/contexts/CurrencyContext";
import CurrencySelector from "@/components/CurrencySelector";
import { usePaymentModal } from "@/hooks/usePaymentModal";
import PaymentModal from "@/components/PaymentModal";
import AccesoTotalButton from "@/components/AccesoTotalButton";

export default function Header() {
  const { currency, setCurrency, getDisplayPrice } = useCurrency();
  const { isOpen, modalData, openModal, closeModal } = usePaymentModal();

  const handleAccesoTotalClick = () => {
    openModal({
      mode: "world",
      title: "Pack Mundo",
      price: 9,
      description: "Desbloquea todo el contenido disponible (suscripción mensual)"
    });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Turisteando Ciudades" 
              width={40} 
              height={40} 
              className="rounded-xl"
            />
            <div className="font-extrabold tracking-tight text-slate-50">Turisteando Ciudades</div>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/pricing" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              {/* Precios */}
            </Link>
            
            {/* <CurrencySelector 
              currentCurrency={currency} 
              onCurrencyChange={setCurrency} 
            /> */}
            
            <AccesoTotalButton size="sm" onClick={handleAccesoTotalClick} />
          </nav>
        </div>
      </header>

      {/* Payment Modal */}
      {modalData && (
        <PaymentModal
          isOpen={isOpen}
          onClose={closeModal}
          mode={modalData.mode}
          city={modalData.city}
          title={modalData.title}
          price={modalData.price}
          description={modalData.description}
        />
      )}
    </>
  );
}
