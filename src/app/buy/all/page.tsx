"use client";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";
import { usePaymentModal } from "@/hooks/usePaymentModal";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function BuyAll() {
  const { isOpen, modalData, openModal, closeModal } = usePaymentModal();
  const { getDisplayPrice } = useCurrency();

  const handleBuyClick = () => {
    openModal({
      mode: "world",
      title: "Pack Mundo",
      price: 9,
      description: "Desbloquea todo el contenido disponible (suscripción mensual)"
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold">Suscribite — Pack mundo</h1>
      <p className="text-slate-300 mt-2">Acceso a todas las guías. Se renueva mensualmente, podés cancelar cuando quieras.</p>
      <div className="mt-4 space-y-3">
        <button
          onClick={handleBuyClick}
          className="w-full rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-slate-900 hover:bg-emerald-300"
        >
          Pack mundo ({getDisplayPrice(9)}/mes)
        </button>
        <Link href="/pricing" className="underline text-slate-300 text-sm">Volver</Link>
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


