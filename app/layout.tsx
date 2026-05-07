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
  metadataBase: new URL("https://lostroncosrestobar.com"),
  title: {
    default: "Los Troncos Resto Bar | Rodizio de Pizzas en Puerto Rico, Misiones",
    template: "%s | Los Troncos Resto Bar",
  },
  description:
    "Descubrí el mejor rodizio de pizzas en Puerto Rico, Misiones. Los Troncos Resto Bar te ofrece una experiencia gastronómica única con pizzas ilimitadas, tragos artesanales y el mejor ambiente nocturno.",
  keywords: [
    "rodizio de pizzas",
    "restobar en Puerto Rico Misiones",
    "pizzas",
    "Los Troncos Restobar",
    "restaurant Puerto Rico Misiones",
    "cena romántica Misiones",
    "tragos artesanales",
    "resto bar Misiones",
    "pizza Puerto Rico",
  ],
  openGraph: {
    title: "Los Troncos Resto Bar | Rodizio de Pizzas",
    description:
      "El mejor rodizio de pizzas en Puerto Rico, Misiones. Una experiencia gastronómica premium con ambiente nocturno.",
    type: "website",
    locale: "es_AR",
    siteName: "Los Troncos Resto Bar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Los Troncos Resto Bar",
    description: "Rodizio de Pizzas en Puerto Rico, Misiones",
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
      <body className="bg-[#0d0d0d] text-[#f5f0e8] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
