import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
        <header className="border-b border-slate-900 bg-[linear-gradient(90deg,#0ea5e920,#22d3ee20)]">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-3">
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
            <nav className="hidden sm:flex items-center gap-4 text-sm">
              <Link href="/pricing" className="text-slate-200 hover:text-white">Precios</Link>
              <Link href="/faq" className="text-slate-200 hover:text-white">FAQ</Link>
            </nav>
            <Link
              href="/buy/all"
              className="rounded-xl bg-emerald-400 px-3 py-1.5 font-semibold text-slate-900 hover:bg-emerald-300"
            >
              Acceso total (€9/mes)
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}