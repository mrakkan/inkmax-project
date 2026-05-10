"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/app/[lang]/dictionaries";

type NavLabels = {
  home: string;
  products: string;
  services: string;
};

type NavbarProps = {
  lang: Locale;
  labels: NavLabels;
};

type IndicatorStyle = {
  left: number;
  width: number;
  opacity: number;
};

const supportedLocales = ["en", "th"] as const;

const stripLocale = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const hasBasePath =
    segments.length > 1 &&
    !supportedLocales.includes(segments[0] as (typeof supportedLocales)[number]) &&
    supportedLocales.includes(segments[1] as (typeof supportedLocales)[number]);

  const withoutBasePath = hasBasePath ? segments.slice(1) : segments;

  if (supportedLocales.includes(withoutBasePath[0] as Locale)) {
    withoutBasePath.shift();
  }

  const rebuilt = `/${withoutBasePath.join("/")}`;
  return rebuilt === "/" ? "/" : rebuilt.replace(/\/$/, "");
};

const withLocale = (lang: Locale, pathname: string) =>
  pathname === "/" ? `/${lang}` : `/${lang}${pathname}`;

export default function Navbar({ lang, labels }: NavbarProps) {
  const pathname = usePathname();
  const basePath = stripLocale(pathname);
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navLinks = useMemo(
    () => [
      { key: "home", href: "/", label: labels.home },
      { key: "products", href: "/products", label: labels.products },
      { key: "services", href: "/services", label: labels.services },
    ],
    [labels]
  );

  const activeIndex = navLinks.findIndex((link) => {
    if (link.href === "/") {
      return basePath === "/";
    }
    return basePath.startsWith(link.href);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = linkRefs.current[activeIndex];
      const container = navRef.current;
      if (!activeEl || !container) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const linkRect = activeEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeIndex, navLinks.length]);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={withLocale(lang, "/")} className="flex items-center gap-3">
          <span className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/10">
            <Image
              src="/Orange-colored-cat-yawns-displaying-teeth.webp"
              alt="KYN Partners logo"
              fill
              className="object-cover"
              priority
            />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-700">
            KYN Partners
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <div ref={navRef} className="relative flex items-center gap-8 pb-2">
            {navLinks.map((link, index) => {
              const isActive = index === activeIndex;
              return (
                <Link
                  key={link.key}
                  href={withLocale(lang, link.href)}
                  className={`nav-link text-sm font-medium uppercase tracking-[0.22em] text-zinc-700 ${
                    isActive ? "active" : "hover:text-zinc-900"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <span
              className="nav-indicator"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: `${indicator.width}px`,
                opacity: indicator.opacity,
              }}
            />
          </div>
        </nav>

        <div className="hidden items-center gap-2 text-xs font-semibold md:flex">
          <Link
            href={withLocale("th", basePath)}
            className={`rounded-full px-3 py-1 transition ${
              lang === "th"
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            TH
          </Link>
          <Link
            href={withLocale("en", basePath)}
            className={`rounded-full px-3 py-1 transition ${
              lang === "en"
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            EN
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-black/20 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      <div
        className={`md:hidden ${
          menuOpen ? "block" : "hidden"
        } border-t border-black/5 bg-white/95`}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6">
          {navLinks.map((link) => {
            const isActive =
              (link.href === "/" && basePath === "/") ||
              (link.href !== "/" && basePath.startsWith(link.href));
            return (
              <Link
                key={link.key}
                href={withLocale(lang, link.href)}
                className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                  isActive ? "text-(--accent-600)" : "text-zinc-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Link
              href={withLocale("th", basePath)}
              className={`rounded-full px-3 py-1 transition ${
                lang === "th"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              TH
            </Link>
            <Link
              href={withLocale("en", basePath)}
              className={`rounded-full px-3 py-1 transition ${
                lang === "en"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
