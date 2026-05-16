import { notFound } from "next/navigation";

import { getDictionary, hasLocale, locales, type Locale } from "../../../dictionaries";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Products({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-zinc-500">
          Catalog
        </p>
        <h1 className="text-4xl text-zinc-900 sm:text-5xl">
          {dict.products.title}
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600">
          {dict.products.lead}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {dict.products.items.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-black/5 bg-white/80 p-6 shadow-[0_24px_50px_-40px_rgba(17,24,39,0.4)]"
          >
            <h2 className="text-xl text-zinc-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              {item.body}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
