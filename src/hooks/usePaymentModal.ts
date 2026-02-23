"use client";

import { useState } from "react";

interface PaymentModalData {
  mode: "city" | "country" | "world" | "lifetime";
  city?: string;
  country?: string;
  title: string;
  price: number;
  description: string;
}

export function usePaymentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<PaymentModalData | null>(null);

  const openModal = (data: PaymentModalData) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return {
    isOpen,
    modalData,
    openModal,
    closeModal
  };
}
