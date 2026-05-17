import Image from "next/image";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import FooterContactForm from "@/components/FooterContactForm";

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
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-white!">
                {dict.footer.title}
              </h3>
              <div className="space-y-3 text-base leading-relaxed">
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

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {[
                  {
                    key: "mail",
                    label: "Mail",
                    href: "https://mail.google.com/mail/?view=cm&fs=1&to=info@kynpartners.co",
                    src: "/contact/Mail.png",
                  },
                  {
                    key: "facebook",
                    label: "Facebook",
                    href: "https://www.facebook.com/profile.php?id=61567969809756",
                    src: "/contact/Facebook.png",
                  },
                  {
                    key: "linkedin",
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/company/grand-sp-siam-co-ltd/",
                    src: "/contact/Linkedin.png",
                  },
                  {
                    key: "line",
                    label: "Line OA",
                    href: "https://line.me/R/ti/p/@294tvolg",
                    src: "/contact/LineOA.png",
                  },
                ].map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full shadow-sm transition hover:shadow-md"
                  >
                    <Image
                      src={item.src}
                      alt={item.label}
                      width={48}
                      height={48}
                      className="h-12 w-12"
                    />
                  </a>
                ))}
              </div>
            </div>

            <FooterContactForm labels={dict.footer.form} />
          </div>
        </div>
      </footer>
    </div>
  );
}
