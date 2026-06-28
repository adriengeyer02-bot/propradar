import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PropRadar | Comparateur indépendant de Prop Firms",
  description: "Le comparateur de prop firms qui dit la vérité. Données indépendantes, scoring de fiabilité basé sur les faits. Zéro affiliation cachée.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#ededed]">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-[#1f1f1f] py-8 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center text-xs text-[#71717a]">
            PropRadar © 2026 — Données collectées indépendamment. Aucune affiliation payante n'influence nos scores.<br />
            Ce site est un outil d'analyse. Le trading comporte des risques. Vérifiez toujours par vous-même.
          </div>
        </footer>
      </body>
    </html>
  );
}
