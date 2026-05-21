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
      {/* ------------------- Banner ---------------------- */}
      <section className="mx-auto w-full">
        <div className="relative overflow-hidden">
          <Image
            src="/service/OEMBANNER.jpg"
            alt="OEM Manufacturing Service"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 " style={{
            background:
              "linear-gradient(81.34deg, #040000 -3.95%, rgba(53, 0, 0, 0.5) 30.51%, rgba(102, 0, 0, 0) 50.17%, rgba(90, 46, 5, 0.2) 81.5%)",
          }} />
          <div className="relative flex min-h-[320px] max-w-6xl flex-col justify-center gap-6 mx-auto px-6 py-12 text-white sm:min-h-[380px] lg:px-12">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl font-semibold text-white/90! leading-tight sm:text-5xl">
                {services.title}
              </h1>
              <p className="text-base text-white/90! sm:text-lg whitespace-break-spaces">
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

      {/* ------------------- Card ---------------------- */}
      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          {services.categories.map((item, index) => {
            const asset = categoryAssets[index] ?? categoryAssets[0];
            const icon = categoryIcons[index] ?? categoryIcons[0];

            return (
              <article className="relative">
                <div className={`relative min-h-[220px] overflow-hidden flex flex-col justify-end items-start px-9 py-6 rounded-3xl shadow-[0_20px_50px_-40px_rgba(17,24,39,0.45)] ${asset.accent}`}>
                  <div className="absolute inset-0">
                    <Image
                      src={asset.image}
                      alt={item.title}
                      fill
                      className="object-cover scale-110 origin-center"
                      style={{ objectPosition: "calc(50% + 64px) 50%" }}
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(251.53deg, rgba(255, 255, 255, 0) 30.81%, rgba(255, 255, 255, 0.8) 48.56%, #FFFFFF 65.27%)",
                        transform: "translateX(12px)",
                      }}
                    />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-(--primary)!">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-(--primary)">
                      {item.subtitle}
                    </p>
                  </div>
                  <p className="relative z-10 whitespace-break-spaces">
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

      {/* ------------------- End-to-End Process ---------------------- */}
      <section>
        <div className="text-center flex flex-col items-center justify-center gap-4 my-12">
          <h2 className="text-2xl font-semibold text-(--primary)!">
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
                    <div className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-(--primary) text-xs font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white">
                      {icon}
                    </div>
                    <h4 className="font-semibold text-(--primary)!">
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

      {/* ------------------- ServiceSelection ---------------------- */}
      <ServiceSelection lang={lang} services={services} />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10"><div className="bg-zinc-300 w-full h-[1px]"></div></div>

      {/* ------------------- Standards ---------------------- */}
      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6  text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-(--primary)!">
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

      {/* ------------------- End ---------------------- */}
      <section className="mx-auto w-full">
        <div className="relative overflow-hidden">
          <div className="relative mx-auto flex min-h-[320px] max-w-7xl px-6 flex-col gap-8 py-12 text-white sm:min-h-[380px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10">
            <div className="flex max-w-2xl flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold! text-(--primary)! whitespace-nowrap leading-tight sm:text-5xl">
                  {services.cta.title}
                </h1>
                <svg width="150" height="4" viewBox="0 0 150 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="150" height="4" rx="2" fill="#A11111" />
                </svg>
              </div>
              <p className="text-black/90! font-bold whitespace-break-spaces">
                {services.cta.body} <span className="text-(--primary)!">{services.cta.highlight}</span>
              </p>
            </div>
            <div className="w-full max-w-lg shrink-0">
              <div className="relative mx-auto aspect-[47/23] w-full">
                <Image
                  src="/service/JAR.png"
                  alt="OEM Manufacturing Service"
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
