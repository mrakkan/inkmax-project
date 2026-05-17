import Image from "next/image";
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
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-6 py-16">
      <section className="text-center">
        <h2 className="text-(--primary)!">
          Overall Products
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            {
              src: "/product/Product Poster_SVARIEST_KYN.png",
              alt: "Product Poster SVARIEST",
            },
            {
              src: "/product/Product Poster_KLORA_KYN.png",
              alt: "Product Poster KLORA",
            },
            {
              src: "/product/Product Poster_BIMEGA_KYN.png",
              alt: "Product Poster BIMEGA",
            },
          ].map((item) => (
            <div
              key={item.src}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={768}
                height={1024}
                className="h-auto w-full"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="text-center flex flex-col items-center gap-4">
        <h3 className="text-(--primary)!">
          Food Products
        </h3>
        <svg width="85" height="4" viewBox="0 0 85 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="85" height="4" rx="2" fill="#A11111" />
        </svg>

        <p className="mt-3 whitespace-pre-line">
          {dict.products.food.subtitle}
        </p>
      </section>

      <section className="flex flex-col gap-10">
        {dict.products.food.items.map((item, index) => (
          <article
            key={item.title}
            className={`grid items-center gap-24 lg:grid-cols-[512px_1fr] ${index % 2 === 1 ? "lg:grid-cols-[1fr_512px]" : ""
              }`}
          >
            <div
              className={`h-72 w-72 overflow-hidden rounded-2xl bg-white shadow-sm lg:h-[512px] lg:w-[512px] ${index % 2 === 1 ? "lg:order-2 lg:justify-self-end" : ""
                }`}
            >
              <Image
                src={
                  [
                    "/product/Product_SP_SVRIEST_KYN.png",
                    "/product/Product_MA_SVRIEST_KYN.png",
                    "/product/Product_LB_SVRIEST_KYN.png",
                  ][index] ?? "/product/Product_SP_SVRIEST_KYN.png"
                }
                alt={item.title}
                width={512}
                height={512}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 512px, 288px"
              />
            </div>
            <div className={index % 2 === 1 ? "md:order-1" : ""}>
              <p className="pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {item.brand}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-6 text-zinc-600">
                {item.body}
              </p>
              <p className="mt-2 text-base text-zinc-500">{item.size}</p>
              <p className="mt-3 text-base font-semibold text-[#C61B1B]">
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
