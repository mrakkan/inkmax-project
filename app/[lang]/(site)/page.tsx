import { notFound } from "next/navigation";

import HeroSlider from "@/components/HeroSlider";

import { getDictionary, hasLocale, locales } from "../dictionaries";

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  if (expanded.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  const value = Number.parseInt(expanded, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const coreTechThemes = [
  {
    accent: "#4AAE4F",
    background:
      "linear-gradient(180deg, rgba(93, 191, 114, 0.2) 0%, rgba(26, 92, 47, 0.92) 100%), radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.35), transparent 45%), linear-gradient(120deg, #9fd9a4 0%, #4aa368 55%, #2b6b3d 100%)",
  },
  {
    accent: "#C55321",
    background:
      "linear-gradient(180deg, rgba(250, 192, 120, 0.2) 0%, rgba(140, 44, 20, 0.92) 100%), radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.32), transparent 45%), linear-gradient(120deg, #f6b273 0%, #d8702f 55%, #8c2c14 100%)",
  },
  {
    accent: "#1E5A9D",
    background:
      "linear-gradient(180deg, rgba(128, 176, 228, 0.2) 0%, rgba(10, 34, 72, 0.92) 100%), radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.32), transparent 45%), linear-gradient(120deg, #7fb0e6 0%, #2c6fb3 55%, #0a2647 100%)",
  },
];

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const hero = dict.home.hero;
  const pillars = dict.home.pillars.items;
  const team = dict.home.team;
  const pillarImages = [
    "/images/KYN.jpg",
    "/images/Partners.jpg",
    "/images/Co-operate.jpg",
  ];
  const coreTechImages = [
    "/images/AGRI-TECH.jpg",
    null,
    "/images/BIO-TECH.png",
  ];
  const coreTechIconImages = [
    "/home/icon/image 10.png",
    "/home/icon/image 4.png",
    "/home/icon/image 5.png",
  ];

  return (
    <div className="flex w-full flex-col bg-white">
      <HeroSlider
        slides={hero.slides}
        tagline={hero.tagline}
        navItems={hero.nav}
      />

      <section className="relative z-10 -mt-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className=" py-12">
            <div className="grid gap-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-0">
              {pillars.map(
                (
                  item: { title: string; body: string; imageLabel?: string },
                  index: number
                ) => [
                  <article
                    key={`${item.title}-item`}
                    className="flex flex-col items-center px-6 text-center"
                  >
                    <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full bg-white  md:-mt-16 sm:h-48 sm:w-48">
                      {pillarImages[index] ? (
                        <img
                          src={pillarImages[index]}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                          {item.imageLabel ?? "Image"}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-7 text-2xl font-semibold tracking-tight text-[#A31621] sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-zinc-600">
                      {item.body}
                    </p>
                  </article>,

                  index < pillars.length - 1 ? (
                    <div key={`${item.title}-sep`} className="hidden md:flex md:justify-center">
                      <div className="mt-24 h-24 w-px bg-zinc-200" />
                    </div>
                  ) : null,
                ]
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-20 lg:px-10">
        <section className="flex flex-col items-center gap-10">
          <h2 className="text-3xl font-semibold text-(--primary)! sm:text-4xl">
            {dict.home.coreTech.title}
          </h2>

          <div className="grid w-full gap-8 md:grid-cols-3 md:justify-items-center">
            {dict.home.coreTech.items.map(
              (
                item: { title: string; body: string; imageLabel?: string },
                index: number
              ) => {
                const theme = coreTechThemes[index];
                const imageSrc = coreTechImages[index];
                const iconSrc = coreTechIconImages[index];
                const backgroundImage = imageSrc
                  ? `url('${imageSrc}')`
                  : theme?.background;
                const accent = theme?.accent ?? "#A31621";

                return (
                  <div
                    key={item.title}
                    className="card-fade relative w-full max-w-[420px] overflow-visible md:max-w-[280px] lg:max-w-[320px]"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <article className="relative overflow-hidden rounded-[32px] shadow-[0_30px_60px_-40px_rgba(15,23,42,0.4)]">
                      <div className="relative h-[400px] lg:h-[420px]">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(180deg, rgba(0,0,0,0.10) 0%, ${hexToRgba(
                              accent,
                              0.28
                            )} 52%, ${hexToRgba(accent, 0.88)} 100%)`,
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(circle at 24% 18%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.10) 22%, transparent 55%)",
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(140deg, ${hexToRgba(
                              accent,
                              0.35
                            )} 0%, rgba(0,0,0,0.05) 34%, rgba(0,0,0,0.45) 100%)`,
                          }}
                        />
                        {!imageSrc ? (
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-white/70">
                            {item.imageLabel ?? "Image"}
                          </div>
                        ) : null}

                        <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="mt-3 text-xs leading-relaxed text-white/90">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </article>

                    <div className="absolute -left-5 -top-5 z-20">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full ring-8 ring-white shadow-[0_26px_50px_-40px_rgba(15,23,42,0.65)]"
                        style={{ backgroundColor: accent }}
                      >
                        <img
                          src={iconSrc}
                          alt={item.title}
                          className="h-9 w-9 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        <section className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)]">
              <img
                src="/home/icon/Innovation.png"
                alt="Innovation"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold leading-tight text-[#A31621]!">
                {dict.home.vision.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                {dict.home.vision.body}
              </p>
            </div>
          </div>

          <div className="hidden h-20 w-px bg-zinc-200 md:block" />

          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)]">
              <img
                src="/home/icon/Goal.png"
                alt="Goal"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold leading-tight text-[#A31621]!">
                {dict.home.mission.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                {dict.home.mission.body}
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-visible rounded-[32px] bg-gradient-to-b from-[#8b1419] via-[#b32025] to-[#f36b3a] text-white min-[1000px]:bg-gradient-to-r">
          <div className="flex flex-col gap-6 min-[1000px]:flex-row min-[1000px]:items-center">
            <div className="relative h-[220px] w-full overflow-visible min-[1000px]:h-[320px] min-[1000px]:w-1/2">
              <img
                src="/home/team_v2.png"
                alt="Team"
                className=" object-contain object-bottom min-[1000px]:h-[320px] min-[1000px]:w-[600px] min-[1000px]:-translate-y-0 max-[1000px]:object-center max-[1000px]:translate-y-0 max-[1000px]:w-full max-[1000px]:h-full max-[1000px]:object-contain max-[1000px]:translate-y-0"
              />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#8b1419]/70 to-[#b32025] min-[1000px]:hidden" />
            </div>
            <div className="flex flex-col gap-4 px-6 py-8 min-[1000px]:w-1/2 min-[1000px]:py-12">
              <h3 className="text-xl font-semibold sm:text-2xl">
                {team.title}
              </h3>
              {team.body.map((paragraph: string, index: number) => (
                <p key={`${index}-${paragraph}`} className="text-sm leading-relaxed text-white/90">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center gap-10 pb-6">
          <h2 className="text-2xl font-semibold text-[#A31621]! sm:text-3xl">
            {dict.home.supportedBy.title}
          </h2>
          <div className="grid w-full gap-6 text-center sm:grid-cols-2 lg:grid-cols-3">
            {dict.home.supportedBy.items.map(
              (item: { name: string; logoLabel?: string; logoSrc?: string }) => (
                <div key={item.name} className="flex flex-col items-center gap-3">
                  <div className="flex h-12 w-32 items-center justify-center px-2">
                    {item.logoSrc ? (
                      <img
                        src={item.logoSrc}
                        alt={item.name}
                        className="max-h-20 w-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                        {item.logoLabel ?? item.name}
                      </span>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
