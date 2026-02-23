"use client";

import PaymentModal from "@/components/PaymentModal";
import { usePaymentModal } from "@/hooks/usePaymentModal";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function PricingPage() {
  const { isOpen, modalData, openModal, closeModal } = usePaymentModal();
  const { getDisplayPrice } = useCurrency();

  const handleBuyClick = (mode: "city" | "country" | "world", city?: string, country?: string) => {
    const plans: Record<typeof mode, { title: string; price: number; description: string }> = {
      city: {
        title: "Pack ciudad",
        price: 5.90,
        description: "Desbloquea 1 ciudad (90 días de updates)"
      },
      country: {
        title: "Pack país",
        price: 12,
        description: "Desbloquea todas las ciudades de un país"
      },
      world: {
        title: "Pack mundo",
        price: 9,
        description: "Desbloquea todo el contenido disponible (suscripción mensual)"
      }
    };

    openModal({
      mode,
      city,
      country,
      ...plans[mode]
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-extrabold">Precios simples</h1>
      <p className="text-slate-300 mt-1">Elegí ciudad, país o todo el mundo. Cancelás cuando quieras.</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          title="Pack ciudad" 
          price={getDisplayPrice(5.90)} 
          cta="Comprar" 
          onClick={() => handleBuyClick("city", "Madrid")}
          features={[
            "Acceso a 1 ciudad (90 días de updates)",
            "Cowork/cafés/alojamiento",
            "eSIM y bancos (referencia)",
          ]} 
        />
        <Card 
          title="Pack país" 
          price={getDisplayPrice(12)} 
          cta="Comprar" 
          onClick={() => handleBuyClick("country", undefined, "España")}
          features={[
            "Todas las ciudades de un país",
            "Incluye nuevas ciudades",
            "Ideal si vas a un único país",
          ]} 
        />
        <Card 
          title="Pack mundo" 
          price={`${getDisplayPrice(9)}/mes`} 
          cta="Suscribirme" 
          onClick={() => handleBuyClick("world")}
          featured 
          features={[
            "Todas las ciudades",
            "Nuevas cada mes",
            "Soporte prioritario",
          ]} 
        />
      </div>

      {/* Payment Modal */}
      {modalData && (
        <PaymentModal
          isOpen={isOpen}
          onClose={closeModal}
          mode={modalData.mode}
          city={modalData.city}
          country={modalData.country}
          title={modalData.title}
          price={modalData.price}
          description={modalData.description}
        />
      )}
    </div>
  );
}
  
  function Card({ title, price, features, cta, href, onClick, featured, disabled }:
    { 
      title: string; 
      price: string; 
      features: string[]; 
      cta: string; 
      href?: string; 
      onClick?: () => void;
      featured?: boolean;
      disabled?: boolean;
    }) {
    const ButtonComponent = href ? 'a' : 'button';
    const buttonProps = href ? { href } : { onClick, disabled };
    
    return (
      <div className={`${featured ? "border-2 border-emerald-400 bg-emerald-400/10" : "border border-slate-800 bg-slate-900/60"} rounded-2xl p-4`}>
        <div className="text-slate-300 text-sm">{title}</div>
        <div className="text-3xl font-extrabold">{price}</div>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          {features.map(f => <li key={f}>• {f}</li>)}
        </ul>
        <ButtonComponent 
          {...buttonProps}
          className={`mt-4 inline-flex w-full justify-center rounded-xl px-4 py-2 font-semibold transition-colors ${
            disabled 
              ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
              : featured 
                ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300" 
                : "bg-cyan-400 text-slate-900 hover:bg-cyan-300"
          }`}
        >
          {cta}
        </ButtonComponent>
      </div>
    );
  }