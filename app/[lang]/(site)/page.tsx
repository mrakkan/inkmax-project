import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, hasLocale, locales, type Locale } from "../dictionaries";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-16">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.48em] text-zinc-500">
            Architecture | Interior | Identity
          </p>
          <h1 className="text-4xl leading-[1.1] text-zinc-900 sm:text-5xl">
            {dict.home.title}
          </h1>
          <p className="max-w-xl text-lg text-zinc-600">
            {dict.home.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${lang}/products`}
              className="rounded-full bg-(--accent-500) px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-(--accent-600)"
            >
              {dict.home.ctaPrimary}
            </Link>
            <Link
              href={`/${lang}/services`}
              className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-800 transition hover:border-black/20"
            >
              {dict.home.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="glass-panel rounded-4xl p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-zinc-500">
            Studio Snapshot
          </p>
          <h2 className="mt-4 text-2xl text-zinc-900 sm:text-3xl">
            {dict.home.highlightsTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            {dict.home.highlightsBody}
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {dict.home.highlightCards.map((card) => (
              <div key={card.title} className="rounded-2xl bg-white/80 p-4">
                <h3 className="text-sm font-semibold text-zinc-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {dict.home.highlightCards.map((card) => (
          <div
            key={`${card.title}-tile`}
            className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-[0_30px_60px_-50px_rgba(17,24,39,0.45)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
              Focus
            </p>
            <h3 className="mt-4 text-xl text-zinc-900">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{card.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
