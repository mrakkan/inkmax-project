import { notFound } from "next/navigation";

import { getDictionary, hasLocale, locales, type Locale } from "../../dictionaries";

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
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-14 px-6 py-16">
      <section className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-zinc-400">
          {dict.products.overall.title}
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {dict.products.overall.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white px-6 py-8 shadow-sm"
            >
              <div className="mx-auto h-24 w-24 rounded-2xl bg-zinc-200" />
              <p className="mt-4 text-sm font-semibold text-zinc-800">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-lg font-semibold text-[#C61B1B]">
          {dict.products.food.title}
        </h2>
        <p className="mt-3 text-sm text-zinc-500">
          {dict.products.food.subtitle}
        </p>
      </section>

      <section className="flex flex-col gap-10">
        {dict.products.food.items.map((item, index) => (
          <article
            key={item.title}
            className={`grid items-center gap-6 md:grid-cols-[150px_1fr] ${
              index % 2 === 1 ? "md:grid-cols-[1fr_150px]" : ""
            }`}
          >
            <div
              className={`h-28 w-28 rounded-2xl bg-[#C61B1B] shadow-inner ${
                index % 2 === 1 ? "md:order-2 md:justify-self-end" : ""
              }`}
            />
            <div className={index % 2 === 1 ? "md:order-1" : ""}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {item.brand}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {item.body}
              </p>
              <p className="mt-2 text-xs text-zinc-500">{item.size}</p>
              <p className="mt-3 text-sm font-semibold text-[#C61B1B]">
                {item.price}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-zinc-900">
            {dict.products.itemBlock.title}
          </h3>
          <div className="mt-4 space-y-2 text-sm text-zinc-600">
            {dict.products.itemBlock.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-zinc-900">
            {dict.products.detailsBlock.title}
          </h3>
          <div className="mt-4 space-y-2 text-sm text-zinc-600">
            {dict.products.detailsBlock.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900">
          {dict.products.storage.title}
        </h3>
        <ul className="mt-4 space-y-2 text-sm text-zinc-600">
          {dict.products.storage.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="text-center">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C61B1B]">
          {dict.products.availableAt.title}
        </h3>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {dict.products.availableAt.items.map((item) => (
            <div
              key={item}
              className="flex h-10 items-center rounded-full border border-zinc-200 px-4 text-xs text-zinc-500"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C61B1B]">
          {dict.products.trustedBy.title}
        </h3>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {dict.products.trustedBy.items.map((item) => (
            <div
              key={item}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-200 text-xs text-zinc-500"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-lg font-semibold text-[#C61B1B]">
          {dict.products.pet.title}
        </h2>
        <p className="mt-3 text-sm text-zinc-500">{dict.products.pet.subtitle}</p>
      </section>

      <section className="grid items-center gap-6 md:grid-cols-[150px_1fr]">
        <div className="h-28 w-28 rounded-2xl bg-pink-200" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {dict.products.pet.brand}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900">
            {dict.products.pet.itemTitle}
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {dict.products.pet.body}
          </p>
          <p className="mt-2 text-xs text-zinc-500">{dict.products.pet.size}</p>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-lg font-semibold text-[#C61B1B]">
          {dict.products.agro.title}
        </h2>
        <p className="mt-3 text-sm text-zinc-500">
          {dict.products.agro.subtitle}
        </p>
      </section>

      <section className="grid items-center gap-6 md:grid-cols-[150px_1fr]">
        <div className="h-28 w-28 rounded-2xl bg-green-200" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {dict.products.agro.brand}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900">
            {dict.products.agro.itemTitle}
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {dict.products.agro.body}
          </p>
          <p className="mt-2 text-xs text-zinc-500">{dict.products.agro.size}</p>
        </div>
      </section>
    </div>
  );
}
