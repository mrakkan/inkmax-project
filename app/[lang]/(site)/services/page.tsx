import Image from "next/image";
import { notFound } from "next/navigation";

import { getDictionary, hasLocale, locales } from "../../dictionaries";
import ServiceSelection from "./ServiceSelection";


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
      <Image
        src="/icons/Flour.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
      />
    ),
    (
      <Image
        src="/icons/MortarandPestle.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
      />
    ),
    (
      <Image
        src="/icons/Sauce.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
      />
    ),
  ];

  const endToEndIcons = [
    (
      <Image
        src="/icons/Consultation.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
      />
    ),
    (
      <Image
        src="/icons/R&D.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
      />
    ),
    (
      <Image
        src="/icons/OEM.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
      />
    ),
    (
      <Image
        src="/icons/Packaging.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
      />
    ),
    (
      <Image
        src="/icons/Support.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
      />
    ),
    (
      <Image
        src="/icons/Delivery.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
      />
    ),
  ];

  const categoryAssets = [
    { image: "/service/SEASONING.png", accent: "bg-[#B91C1C]" },
    { image: "/service/CURRY.jpg", accent: "bg-[#166534]" },
    { image: "/service/SAUCE.png", accent: "bg-[#D97706]" },
  ];

  return (
    <div className="flex w-full flex-1 flex-col gap-16 bg-white">
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
        <div className="grid gap-12 md:grid-cols-3">
          {services.categories.map((item, index) => {
            const asset = categoryAssets[index] ?? categoryAssets[0];
            const icon = categoryIcons[index] ?? categoryIcons[0];

            return (
              <article className="relative">
                <div className={`relative min-h-[220px] overflow-hidden flex flex-col justify-end items-start px-9 py-6 rounded-3xl shadow-[0_20px_50px_-40px_rgba(17,24,39,0.45)] ${asset.accent}`}>
                  <div className="absolute left-15 top-0 h-full w-full scale-125">
                    <Image
                      src={asset.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-[#A31621]!">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-[#A31621]">
                      {item.subtitle}
                    </p>
                  </div>
                  <p className="relative z-10">
                    {item.body}
                  </p>

                </div>

                <div
                  className={`absolute -left-6 -top-6 z-20 flex h-16 w-16 ring-6 ring-white items-center justify-center rounded-full text-white ${asset.accent}`}
                >
                  {icon}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <div className="text-center flex flex-col items-center justify-center gap-4 my-12">
          <h2 className="text-2xl font-semibold text-[#A31621]!">
            {services.process.title}
          </h2>
          <svg width="150" height="4" viewBox="0 0 150 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="4" rx="2" fill="#A11111" />
          </svg>

        </div>


        <div className="bg-[#FFF3F2]">
          <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10">

            <div className="mt-10 grid gap-12 md:grid-cols-3">
              {services.process.steps.map((step, index) => {
                const icon = endToEndIcons[index] ?? endToEndIcons[0];
                return (
                  <article
                    key={step.title}
                    className="relative rounded-3xl border border-white/60 bg-white/80 p-12 text-center shadow-sm"
                  >
                    <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#A31621] text-xs font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white">
                      {icon}
                    </div>
                    <h4 className="font-semibold text-[#A31621]!">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-zinc-600">{step.body}</p>
                  </article>
                )
              })}

            </div>
          </div>
        </div>
      </section>

      <ServiceSelection lang={lang} services={services} />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10"><div className="bg-zinc-300 w-full h-[1px]"></div></div>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6  text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-[#A31621]!">
              {services.standards.title}
            </h2>
            <p className="mt-2 whitespace-break-spaces">
              {services.standards.body}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-22 w-22 items-center justify-center rounded-2xl">
              <Image src="/service/FDA_LOGO.png" alt="FDA logo" width={88} height={88} className="scale-75" />
            </div>
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl ">
              <Image src="/service/HALAL_LOGO.png" alt="Halal logo" width={112} height={112} className="scale-115" />
            </div>
          </div>

        </div>
      </section>

      <section className="mx-auto w-full">
        <div className="relative overflow-hidden">
          <Image
            src="/service/Close.jpg"
            alt="OEM Manufacturing Service"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="relative flex min-h-[320px] max-w-6xl flex-col justify-center gap-6 mx-auto px-6 py-12 text-white sm:min-h-[380px] lg:px-12">
            <div className="flex flex-col justify-center items-center gap-8 text-center">
              <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl font-bold! text-(--primary)! whitespace-break-spaces leading-tight sm:text-5xl">
                  {services.cta.title}
                </h1>
                <svg width="150" height="4" viewBox="0 0 150 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="150" height="4" rx="2" fill="#A11111" />
                </svg>
              </div>
              <p className="text-black/90! font-bold whitespace-break-spaces">
                {services.cta.body}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
