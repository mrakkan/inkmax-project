import { notFound } from "next/navigation";

import HeroSlider from "@/components/HeroSlider";

import { getDictionary, hasLocale, locales } from "../dictionaries";

type IconProps = {
  className?: string;
};

function LeafIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 14c6 0 9-5 13-6-1 6-4 11-10 11-2 0-3-1-3-3z" />
      <path d="M12 7c-1 3-2 7-2 11" />
    </svg>
  );
}

function UtensilsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 3v8" />
      <path d="M9 3v8" />
      <path d="M5 7h4" />
      <path d="M14 3v18" />
      <path d="M18 3a3 3 0 0 1 0 6v12" />
    </svg>
  );
}

function DnaIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 3c4 4 6 6 10 10" />
      <path d="M17 3c-4 4-6 6-10 10" />
      <path d="M7 21c4-4 6-6 10-10" />
      <path d="M17 21c-4-4-6-6-10-10" />
    </svg>
  );
}

function VisionIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a7 7 0 0 0-4 12" />
      <path d="M12 3a7 7 0 0 1 4 12" />
      <path d="M9 15h6" />
      <path d="M10 19h4" />
    </svg>
  );
}

function MissionIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
    </svg>
  );
}

const coreTechThemes = [
  {
    accent: "#4AAE4F",
    background:
      "linear-gradient(180deg, rgba(93, 191, 114, 0.2) 0%, rgba(26, 92, 47, 0.92) 100%), radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.35), transparent 45%), linear-gradient(120deg, #9fd9a4 0%, #4aa368 55%, #2b6b3d 100%)",
    icon: LeafIcon,
  },
  {
    accent: "#C55321",
    background:
      "linear-gradient(180deg, rgba(250, 192, 120, 0.2) 0%, rgba(140, 44, 20, 0.92) 100%), radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.32), transparent 45%), linear-gradient(120deg, #f6b273 0%, #d8702f 55%, #8c2c14 100%)",
    icon: UtensilsIcon,
  },
  {
    accent: "#1E5A9D",
    background:
      "linear-gradient(180deg, rgba(128, 176, 228, 0.2) 0%, rgba(10, 34, 72, 0.92) 100%), radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.32), transparent 45%), linear-gradient(120deg, #7fb0e6 0%, #2c6fb3 55%, #0a2647 100%)",
    icon: DnaIcon,
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

  return (
    <div className="flex w-full flex-col bg-white">
      <HeroSlider />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-20 lg:px-10">
        <section className="flex flex-col items-center gap-10">
          <h2 className="text-3xl font-semibold text-[#A31621] sm:text-4xl">
            {dict.home.coreTech.title}
          </h2>

          <div className="grid w-full gap-8 md:grid-cols-3">
            {dict.home.coreTech.items.map((item: { title: string; body: string }, index: number) => {
              const theme = coreTechThemes[index];
              const Icon = theme?.icon ?? LeafIcon;

              return (
                <article
                  key={item.title}
                  className="relative min-h-[360px] overflow-hidden rounded-[32px] shadow-[0_30px_60px_-40px_rgba(15,23,42,0.4)]"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: theme?.background,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40" />

                  <div className="absolute left-6 top-6">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80"
                      style={{ backgroundColor: theme?.accent ?? "#A31621" }}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-white/90">
                      {item.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-12 md:grid-cols-2">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)]">
              <VisionIcon className="h-9 w-9 text-[#A31621]" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold leading-tight text-[#A31621]">
                {dict.home.vision.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                {dict.home.vision.body}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)]">
              <MissionIcon className="h-9 w-9 text-[#A31621]" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold leading-tight text-[#A31621]">
                {dict.home.mission.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                {dict.home.mission.body}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] bg-[#FFF1F1] px-8 py-12 sm:px-12 sm:py-14">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 text-sm leading-loose text-zinc-700">
            {dict.home.about.paragraphs.map(
              (paragraph: string, index: number) => (
                <p key={`${index}-${paragraph}`}>{paragraph}</p>
              )
            )}
          </div>
        </section>

        <section className="flex flex-col items-center gap-10 pb-6">
          <h2 className="text-2xl font-semibold text-[#A31621] sm:text-3xl">
            {dict.home.supportedBy.title}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-10 text-center">
            {dict.home.supportedBy.items.map(
              (item: { name: string; subtitle?: string }) => (
                <div key={item.name} className="flex flex-col items-center gap-2">
                  <span className="text-base font-semibold text-[#8F151A]">
                    {item.name}
                  </span>
                  {item.subtitle ? (
                    <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                      {item.subtitle}
                    </span>
                  ) : null}
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
