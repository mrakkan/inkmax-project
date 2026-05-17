import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { notFound } from "next/navigation";

import { hasLocale, locales, type Locale } from "./dictionaries";
import "../globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-body",
  display: "swap",
});

const notoSansThaiDisplay = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KYN Partners & Co Ltd.",
    template: "%s | KYN Partners",
  },
  description: "Architectural and interior design studio for modern workplaces.",
  icons: {
    icon: "/favicon.png",
  },
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
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      className={`${notoSansThai.variable} ${notoSansThaiDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full text-foreground">{children}</body>
    </html>
  );
}
