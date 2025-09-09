import { use } from "react";
import { findCity } from "@/data/cities";
import CityView from "@/components/CityView";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const city = findCity(slug);
  if (!city) return { title: "Ciudad no encontrada" };
  const title = `${city.name} — Guía para nómadas (cowork, eSIM, presupuesto)`;
  const description = city.summary;
  const base = new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
  const url = new URL(`/city/${city.slug}`, base).toString();
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, type: "article",
      locale: "es_ES", siteName: "Turisteando Ciudades",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const city = findCity(slug);
  if (!city) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Ciudad no encontrada</h1>
        <Link className="underline text-cyan-300" href="/">Volver</Link>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <CityView city={city} />
    </div>
  );
}