"use client";
import { use } from "react";
import { findCity } from "@/data/cities";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";
import { usePaymentModal } from "@/hooks/usePaymentModal";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function BuyCity({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const city = findCity(slug);
  const { isOpen, modalData, openModal, closeModal } = usePaymentModal();
  const { getDisplayPrice } = useCurrency();

  if (!city) return <div className="max-w-xl mx-auto p-6">Ciudad no encontrada</div>;

  const handleBuyClick = () => {
    openModal({
      mode: "city",
      city: city.slug,
      title: `Pack Ciudad - ${city.name}`,
      price: 5.90,
      description: `Acceso completo a la guía de ${city.name}`
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold">Comprar acceso — {city.name}</h1>
      <p className="text-slate-300 mt-2">Recibirás el acceso por email y se activará automáticamente al finalizar el pago.</p>
      <div className="mt-4 space-y-3">
        <button
          onClick={handleBuyClick}
          className="w-full rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-300"
        >
          Comprar ciudad ({getDisplayPrice(5.90)})
        </button>
        <Link href={`/city/${city.slug}`} className="underline text-slate-300 text-sm">Volver</Link>
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