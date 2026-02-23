"use client";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";
import { usePaymentModal } from "@/hooks/usePaymentModal";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function BuyLifetime() {
  const { isOpen, modalData, openModal, closeModal } = usePaymentModal();
  const { getDisplayPrice } = useCurrency();

  const handleBuyClick = () => {
    openModal({
      mode: "lifetime",
      title: "Lifetime",
      price: 59,
      description: "Acceso de por vida a todas las ciudades"
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold">Comprar Lifetime</h1>
      <p className="text-slate-300 mt-2">Pago único. Acceso de por vida con todas las futuras ciudades y actualizaciones.</p>
      <div className="mt-4 space-y-3">
        <button
          onClick={handleBuyClick}
          className="w-full rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-300"
        >
          Comprar Lifetime ({getDisplayPrice(59)})
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
          title={modalData.title}
          price={modalData.price}
          description={modalData.description}
        />
      )}
    </div>
  );
}


