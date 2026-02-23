import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Turisteando Ciudades - Guías para nómadas y viajeros",
  description: "Info accionable: dónde trabajar, cuánto gastar, eSIM, bancos y barrios. Sin humo, todo al grano.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="text-slate-100 bg-slatebg">
        <CurrencyProvider>
          <Header />
          {children}
        </CurrencyProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}