import Image from "next/image";
import { notFound } from "next/navigation";

import { getDictionary, hasLocale, locales } from "../../dictionaries";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Services({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const services = dict.services;

  const categoryIcons = [
    (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7 3h10l1 4h2v2H4V7h2l1-4Zm1.6 2-.5 2h7.8l-.5-2H8.6ZM5 11h14l-1.2 7.4A2 2 0 0 1 15.8 20H8.2a2 2 0 0 1-2-1.6L5 11Z"
        />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.4 3.5h9.2l2.1 2.1v2.2l-4 4.1-.2 4.8-4.9 2.3.9-5-3.9-3.9V5.6l1.8-2.1Zm1.5 2.1-.9 1v3.5l3.9 3.9-.4 2.4 2.2-1 .1-3.4 3.9-4v-.6l-1-1H8.9Z"
        />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M9 2h6v3h2a2 2 0 0 1 2 2v3c0 2.8-2.2 5-5 5v4H10v-4c-2.8 0-5-2.2-5-5V7a2 2 0 0 1 2-2h2V2Zm-1 5v3a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V7H8Zm1-3v1h6V4H9Z"
        />
      </svg>
    ),
  ];

  const categoryAssets = [
    { image: "/service/SEASONING.png", accent: "bg-[#B91C1C]" },
    { image: "/service/CURRY.jpg", accent: "bg-[#166534]" },
    { image: "/service/SAUCE.png", accent: "bg-[#D97706]" },
  ];

  return (
    <div className="flex w-full flex-1 flex-col gap-16 bg-white pb-16">
      <section className="mx-auto w-full">
        <div className="relative overflow-hidden">
          <Image
            src="/service/Banner.jpg"
            alt="OEM Manufacturing Service"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          <div className="relative flex min-h-[320px] max-w-6xl flex-col justify-center gap-6 mx-auto px-6 py-12 text-white sm:min-h-[380px] lg:px-12">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl font-semibold text-white/90! leading-tight sm:text-5xl">
                {services.title}
              </h1>
              <p className="text-base text-white/90! sm:text-lg">
                {services.lead}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-white p-2 shadow-md">
                <Image src="/service/FDA_LOGO.png" alt="FDA logo" width={56} height={56} className="scale-75" />
              </div>
              <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-white p-2 shadow-md">
                <Image src="/service/HALAL_LOGO.png" alt="Halal logo" width={72} height={72} className="scale-115" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {services.categories.map((item, index) => {
            const asset = categoryAssets[index] ?? categoryAssets[0];
            const icon = categoryIcons[index] ?? categoryIcons[0];

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-[0_20px_50px_-40px_rgba(17,24,39,0.45)]"
              >
                <div className="grid gap-4 p-6 sm:grid-rows-[auto_1fr]">
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${asset.accent}`}
                    >
                      {icon}
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-900">
                        {item.title}
                      </h2>
                      <p className="text-sm text-zinc-500">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-zinc-600">
                    {item.body}
                  </p>
                </div>
                <div className="relative h-36">
                  <Image
                    src={asset.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/55 to-transparent" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#FFF3F2]">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#A31621]">
              {services.process.title}
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-[#A31621]" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.process.steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-white/60 bg-white/80 p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#A31621] text-sm font-semibold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-semibold text-[#A31621]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#A31621]">
            {services.packages.title}
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-[#A31621]" />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.packages.items.map((item) => (
            <article
              key={item.name}
              className={`rounded-3xl border p-6 shadow-sm ${item.featured
                  ? "border-[#C61B1B] bg-white"
                  : "border-zinc-200 bg-white"
                }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  {item.tier}
                </p>
                {item.featured ? (
                  <span className="rounded-full bg-[#C61B1B] px-3 py-1 text-xs font-semibold text-white">
                    {services.packages.featuredLabel}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-zinc-900">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-500">{item.subtitle}</p>
              <p className="mt-4 text-lg font-semibold text-[#C61B1B]">
                {item.price}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                {item.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-zinc-400">{item.footnote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#A31621]">
            {services.addOns.title}
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-[#A31621]" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.addOns.items.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-2 text-lg font-semibold text-[#C61B1B]">
                {item.price}
              </p>
              <p className="mt-3 text-sm text-zinc-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#A31621]">
            {services.subscription.title}
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-[#A31621]" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.subscription.items.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-2 text-lg font-semibold text-[#C61B1B]">
                {item.price}
              </p>
              <p className="mt-3 text-sm text-zinc-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-zinc-100 bg-white px-6 py-8 text-center shadow-sm md:flex-row md:text-left">
          <div>
            <h2 className="text-xl font-semibold text-[#A31621]">
              {services.standards.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              {services.standards.body}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src="/service/FDA_LOGO.png"
              alt="FDA"
              width={72}
              height={72}
            />
            <Image
              src="/service/HALAL_LOGO.png"
              alt="Halal"
              width={72}
              height={72}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[28px]">
          <Image
            src="/service/Close.jpg"
            alt="OEM consultation"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/70" />
          <div className="relative px-6 py-12 text-center">
            <h2 className="text-2xl font-semibold text-[#A31621] sm:text-3xl">
              {services.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-zinc-700">
              {services.cta.body}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
