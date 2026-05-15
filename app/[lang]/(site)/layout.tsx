import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";

import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export default async function SiteLayout({
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

  const dict = await getDictionary(lang);

  return (
    <div className="site-bg relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(199,55,47,0.14),rgba(199,55,47,0))] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-35 top-[30%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(17,24,39,0.18),rgba(17,24,39,0))] blur-3xl"
      />

      <Navbar lang={lang} labels={dict.nav} />

      <main className="relative z-10 flex flex-1 flex-col">{children}</main>

      <footer className="relative z-10 border-t border-black/5 py-10 text-center text-xs uppercase tracking-[0.32em] text-zinc-500">
        KYN Partners Co., Ltd.
      </footer>
    </div>
  );
}
