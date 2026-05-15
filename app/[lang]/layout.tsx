import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";

import { hasLocale, locales, type Locale } from "./dictionaries";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KYN Partners",
    template: "%s | KYN Partners",
  },
  description: "Architectural and interior design studio for modern workplaces.",
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full text-foreground">{children}</body>
    </html>
  );
}
