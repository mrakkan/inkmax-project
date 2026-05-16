import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";

import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar lang={lang} labels={dict.nav} />

      <main className="flex flex-1 flex-col">{children}</main>

      <footer className="bg-[#A31621] text-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold">{dict.footer.title}</h3>
              <div className="space-y-3 text-sm leading-relaxed">
                <p>{dict.footer.company}</p>
                <p>
                  <span className="font-semibold">
                    {dict.footer.headOfficeLabel}:
                  </span>{" "}
                  {dict.footer.headOffice}
                </p>
                <p>
                  <span className="font-semibold">
                    {dict.footer.factoryLabel}:
                  </span>{" "}
                  {dict.footer.factory}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {dict.footer.socials.map((item: string, index: number) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="h-8 w-8 rounded-full bg-white/20" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    {dict.footer.form.nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="h-10 rounded-md bg-white px-3 text-sm text-zinc-900 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    {dict.footer.form.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="h-10 rounded-md bg-white px-3 text-sm text-zinc-900 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="subject">
                  {dict.footer.form.subjectLabel}
                </label>
                <input
                  id="subject"
                  type="text"
                  className="h-10 rounded-md bg-white px-3 text-sm text-zinc-900 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" htmlFor="message">
                  {dict.footer.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="resize-none rounded-md bg-white px-3 py-2 text-sm text-zinc-900 outline-none"
                />
              </div>

              <button
                type="button"
                className="mt-2 w-fit rounded-md bg-white px-5 py-2 text-sm font-semibold text-[#A31621] transition hover:bg-white/90"
              >
                {dict.footer.form.submitLabel}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
