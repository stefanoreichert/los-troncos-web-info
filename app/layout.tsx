import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://los-troncos-web-info.vercel.app"),
  title: {
    default: "Los Troncos Resto Bar | Restaurante en Puerto Rico, Misiones",
    template: "%s | Los Troncos Resto Bar",
  },
  description:
    "Los Troncos Resto Bar en Puerto Rico, Misiones. Cocina artesanal, pizzas, hamburguesas, milanesas, tragos y reservas por WhatsApp en un ambiente calido y moderno.",
  keywords: [
    "restobar en Puerto Rico Misiones",
    "pizzas",
    "hamburguesas",
    "milanesas",
    "Los Troncos Restobar",
    "restaurant Puerto Rico Misiones",
    "cena romantica Misiones",
    "tragos artesanales",
    "resto bar Misiones",
    "pizza Puerto Rico",
  ],
  openGraph: {
    title: "Los Troncos Resto Bar | Puerto Rico, Misiones",
    description:
      "Landing oficial de Los Troncos Resto Bar: cocina artesanal, tragos, reservas y ubicacion en Puerto Rico, Misiones.",
    type: "website",
    locale: "es_AR",
    siteName: "Los Troncos Resto Bar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Los Troncos Resto Bar",
    description: "Restaurante y bar en Puerto Rico, Misiones",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#090706] text-[#f5f0e8] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
