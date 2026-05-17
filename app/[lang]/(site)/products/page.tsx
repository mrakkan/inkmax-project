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

  const splitLine = (line: string) => {
    const parts = line.split(":");
    if (parts.length === 1) {
      return { label: line.trim(), value: "" };
    }
    return {
      label: parts[0].trim(),
      value: parts.slice(1).join(":").trim(),
    };
  };

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
            className={`grid items-center justify-items-center gap-8 lg:gap-24 lg:grid-cols-[480px_1fr] ${index % 2 === 1 ? "lg:grid-cols-[1fr_480px]" : ""
              }`}
          >
            <div
              className={`h-72 w-72 overflow-hidden rounded-2xl bg-white shadow-md lg:h-120 lg:w-120 ${index % 2 === 1 ? "lg:order-2 lg:justify-self-end" : ""
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
                width={480}
                height={480}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 480px, 288px"
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

      <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-8 shadow-[0_24px_60px_-50px_rgba(0,0,0,0.25)] md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <h3 className="mt-2 text-base font-semibold text-zinc-900">
              Item
            </h3>
            <dl className="mt-6 space-y-3 text-base text-zinc-600">
              {dict.products.food.itemBlock.lines.map((line) => {
                const { label, value } = splitLine(line);
                return (
                  <div
                    key={line}
                    className="grid grid-cols-[150px_1fr] gap-4"
                  >
                    <dt className="text-zinc-700">{label} :</dt>
                    <dd className="text-zinc-700">{value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 shadow-md px-6 py-6">
              <div className="h-20 w-48 sm:h-24 sm:w-56">
                <Image
                  src="/logo/LOGO_SVARIEST_KYN.png"
                  alt="Svariest logo"
                  width={420}
                  height={210}
                  className="h-full w-full object-cover object-[50%_45%] scale-125"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h3 className="font-semibold text-(--primary)!">
          Available At
        </h3>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {[
            {
              src: "/product/logo/INNOMALL.png",
              alt: "INNOMALL",
              frame: "h-24 w-36",
              fit: "object-cover",
              position: "object-center",
            },
            {
              src: "/product/logo/INNO STORE.png",
              alt: "INNO STORE",
              frame: "h-24 w-48",
              fit: "object-cover",
              position: "object-[50%_55%]",
            },
            {
              src: "/product/logo/SINGHA PARK.png",
              alt: "SINGHA PARK",
              frame: "h-12 w-76",
              fit: "object-cover",
              position: "object-center",
              scale: "scale-125"
            },
          ].map((logo) => (
            <div
              key={logo.src}
              className={`relative overflow-hidden ${logo.frame} ${logo.scale}`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className={`${logo.fit} ${logo.position ?? ""}`}
                sizes="(min-width: 1024px) 180px, 140px"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h3 className="font-semibold text-(--primary)!">
          Trusted by
        </h3>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {[
            {
              src: "/product/logo/LONGPINGYANG.png",
              alt: "LONGPINGYANG",
              frame: "h-32 w-32",
              fit: "object-cover",
            },
            {
              src: "/product/logo/CC.png",
              alt: "CC",
              frame: "h-32 w-32",
              fit: "object-cover",
            },
            {
              src: "/product/logo/HONGCHA.png",
              alt: "HONGCHA",
              frame: "h-32 w-32",
              fit: "object-cover",
            },
            {
              src: "/product/logo/ORIGIN.png",
              alt: "ORIGIN",
              frame: "h-32 w-32",
              fit: "object-cover",
            },
            {
              src: "/product/logo/MAGIN.png",
              alt: "MAGIN",
              frame: "h-32 w-32",
              fit: "object-cover",
            },
          ].map((logo) => (
            <div
              key={logo.src}
              className={`relative overflow-hidden ${logo.frame} ${logo.scale}`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className={logo.fit}
                sizes="(min-width: 1024px) 180px, 140px"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="text-center flex flex-col items-center gap-4">
        <h3 className="text-[#033D67]!">
          Agri Food (Postharvest)
        </h3>

        <svg
          width="85"
          height="4"
          viewBox="0 0 85 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="85" height="4" rx="2" fill="#033D67" />
        </svg>

        <p className="mt-3 whitespace-pre-line">
          {dict.products.postHarvest.subtitle}
        </p>
      </section>

      <section className="grid items-center justify-items-center gap-8 lg:grid-cols-[480px_1fr]">
        <div className="h-72 w-72 overflow-hidden rounded-2xl bg-white shadow-md lg:h-120 lg:w-120">
          <Image
            src="/product/Product_KLORA_KYN.png"
            alt={dict.products.postHarvest.itemTitle}
            width={480}
            height={480}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 480px, 288px"
          />
        </div>
        <div>
          <p className="pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {dict.products.postHarvest.brand}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900 whitespace-break-spaces">
            {dict.products.postHarvest.itemTitle}
          </h3>
          <p className="mt-2 text-base leading-6 text-zinc-600">
            {dict.products.postHarvest.body}
          </p>
          <p className="mt-2 text-base text-zinc-500">{dict.products.postHarvest.size}</p>
          <p className="mt-3 text-base font-semibold text-[#C61B1B]">
            {dict.products.postHarvest.price}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-8 shadow-[0_24px_60px_-50px_rgba(0,0,0,0.25)] md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <h3 className="mt-2 text-base font-semibold text-zinc-900">
              Item
            </h3>
            <dl className="mt-6 space-y-3 text-base text-zinc-600">
              {dict.products.postHarvest.itemBlock.lines.map((line) => {
                const { label, value } = splitLine(line);
                return (
                  <div
                    key={line}
                    className="grid grid-cols-[150px_1fr] gap-4"
                  >
                    <dt className="text-zinc-700">{label} :</dt>
                    <dd className="text-zinc-700">{value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 shadow-md px-6 py-6">
              <div className="h-20 w-48 sm:h-24 sm:w-56">
                <Image
                  src="/logo/LOGO_KLORA_KYN.png"
                  alt="Klora logo"
                  width={420}
                  height={210}
                  className="h-full w-full object-cover object-[50%_45%] scale-125"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center flex flex-col items-center gap-4">
        <h3 className="text-[#137C17]!">
          Agri Food (Preharvest)
        </h3>

        <svg
          width="85"
          height="4"
          viewBox="0 0 85 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="85" height="4" rx="2" fill="#137C17" />
        </svg>

        <p className="mt-3 whitespace-pre-line">
          {dict.products.agro.subtitle}
        </p>
      </section>

      <section className="grid items-center justify-items-center gap-8 lg:grid-cols-[480px_1fr]">
        <div className="h-72 w-72 overflow-hidden rounded-2xl bg-white shadow-md lg:h-120 lg:w-120">
          <Image
            src="/product/Product_BIMEGA_KYN.png"
            alt={dict.products.agro.itemTitle}
            width={480}
            height={480}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 480px, 288px"
          />
        </div>
        <div>
          <p className="pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {dict.products.agro.brand}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900 whitespace-break-spaces">
            {dict.products.agro.itemTitle}
          </h3>
          <p className="mt-2 text-base leading-6 text-zinc-600">
            {dict.products.agro.body}
          </p>
          <p className="mt-2 text-base text-zinc-500">{dict.products.agro.size}</p>
          <p className="mt-3 text-base font-semibold text-[#C61B1B]">
            {dict.products.agro.price}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-8 shadow-[0_24px_60px_-50px_rgba(0,0,0,0.25)] md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <h3 className="mt-2 text-base font-semibold text-zinc-900">
              Item
            </h3>
            <dl className="mt-6 space-y-3 text-base text-zinc-600">
              {dict.products.agro.itemBlock.lines.map((line) => {
                const { label, value } = splitLine(line);
                return (
                  <div
                    key={line}
                    className="grid grid-cols-[150px_1fr] gap-4"
                  >
                    <dt className="text-zinc-700">{label} :</dt>
                    <dd className="text-zinc-700">{value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 shadow-md px-6 py-6">
              <div className="h-20 w-48 sm:h-24 sm:w-56">
                <Image
                  src="/logo/LOGO_BIMEGA_KYN.png"
                  alt="BiMega logo"
                  width={420}
                  height={210}
                  className="h-full w-full object-cover object-[50%_45%] scale-125"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
