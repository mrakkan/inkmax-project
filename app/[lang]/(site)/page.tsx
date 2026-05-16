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
  const hero = dict.home.hero;
  const pillars = dict.home.pillars.items;
  const team = dict.home.team;

  return (
    <div className="flex w-full flex-col bg-white">
      <HeroSlider
        slides={hero.slides}
        tagline={hero.tagline}
        navItems={hero.nav}
      />

      <section className="relative z-10 -mt-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3 md:gap-0">
            {pillars.map(
              (item: { title: string; body: string; imageLabel?: string }, index: number) => (
                <article
                  key={item.title}
                  className={`flex flex-col items-center px-6 text-center ${
                    index > 0 ? "md:border-l md:border-zinc-200" : ""
                  }`}
                >
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-zinc-100 text-[10px] uppercase tracking-[0.2em] text-zinc-400 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.4)]">
                    {item.imageLabel ?? "Image"}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-[#A31621]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {item.body}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-20 lg:px-10">
        <section className="flex flex-col items-center gap-10">
          <h2 className="text-3xl font-semibold text-(--primary)! sm:text-4xl">
            {dict.home.coreTech.title}
          </h2>

          <div className="grid w-full gap-8 md:grid-cols-3">
            {dict.home.coreTech.items.map(
              (
                item: { title: string; body: string; imageLabel?: string },
                index: number
              ) => {
                const theme = coreTechThemes[index];
                const Icon = theme?.icon ?? LeafIcon;

                return (
                  <article
                    key={item.title}
                    className="relative overflow-hidden rounded-[32px] shadow-[0_30px_60px_-40px_rgba(15,23,42,0.4)]"
                  >
                    <div className="relative h-[320px]">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: theme?.background,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/50" />
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-white/70">
                        {item.imageLabel ?? "Image"}
                      </div>

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
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>

        <section className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)]">
              <VisionIcon className="h-9 w-9 text-[#A31621]" />
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
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)]">
              <MissionIcon className="h-9 w-9 text-[#A31621]" />
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

        <section className="rounded-[32px] bg-gradient-to-r from-[#7a0f14] via-[#b32025] to-[#f36b3a] px-8 py-10 text-white sm:px-12 sm:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/15 md:h-36 md:w-[220px]">
              <img
                src="/images/Team.png"
                alt="Team"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
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
              (item: { name: string; logoLabel?: string }) => (
                <div key={item.name} className="flex flex-col items-center gap-3">
                  <div className="flex h-12 w-32 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                    {item.logoLabel ?? item.name}
                  </div>
                  <span className="text-xs font-semibold text-zinc-600">
                    {item.name}
                  </span>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
