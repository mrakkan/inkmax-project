"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/app/[lang]/dictionaries";

type NavLabels = {
  home: string;
  products: string;
  services: string;
};

type NavLink = {
  key: string;
  href: string;
  label: string;
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
  const reduceMotion = useReducedMotion();
  const basePath = stripLocale(pathname);
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navLinks = useMemo<NavLink[]>(
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

  const scrollToTop = () => {
    const root = document.scrollingElement ?? document.documentElement;
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    link: NavLink,
    deferScroll = false
  ) => {
    if (link.href === "/products" && basePath.startsWith("/products")) {
      event.preventDefault();
      if (window.location.hash) {
        const cleanUrl = withLocale(lang, link.href);
        window.history.replaceState(null, "", cleanUrl);
      }
      if (deferScroll) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(scrollToTop);
        });
      } else {
        scrollToTop();
      }
    }
  };

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
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 lg:px-10">
        <Link href={withLocale(lang, "/")} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="KYN Partners & Co Ltd."
            width={144}
            height={36}
            priority
          />
        </Link>

        <div className="flex items-center gap-12">
          <nav className="hidden md:flex">
            <div ref={navRef} className="relative flex items-center gap-8">
              {navLinks.map((link, index) => {
                const isActive = index === activeIndex;
                return (
                  <Link
                    key={link.key}
                    href={withLocale(lang, link.href)}
                    className={`nav-link text-sm text-center font-medium ${
                      isActive
                        ? "active"
                        : "text-zinc-500 hover:text-[#C61B1B]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    ref={(el) => {
                      linkRefs.current[index] = el;
                    }}
                    onClick={(event) => handleNavClick(event, link)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <span
                className="nav-indicator"
                style={{
                  transform: `translateX(${indicator.left}px) translateY(6px)`,
                  width: `${indicator.width}px`,
                  opacity: indicator.opacity,
                }}
              />
            </div>
          </nav>

          <div className="hidden items-center text-xs font-semibold md:flex">
            <div className="flex overflow-hidden rounded-lg border border-zinc-100 shadow-sm ">
              <Link
                href={withLocale("en", basePath)}
                scroll={false}
                className={`border-r border-zinc-100 px-3 py-2 transition ${
                  lang === "en"
                    ? "bg-[#C61B1B] text-white"
                    : "text-zinc-500 hover:text-[#C61B1B]"
                }`}
              >
                EN
              </Link>
              <Link
                href={withLocale("th", basePath)}
                scroll={false}
                className={`px-3 py-2 transition ${
                  lang === "th"
                    ? "bg-[#C61B1B] text-white"
                    : "text-zinc-500 hover:text-[#C61B1B]"
                }`}
              >
                TH
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-100 bg-white shadow-sm transition hover:bg-zinc-50 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full rounded bg-zinc-700 transition-transform duration-200 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded bg-zinc-700 transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full rounded bg-zinc-700 transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            className="md:hidden overflow-hidden border-t border-zinc-100 bg-white"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
            }
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
                      isActive ? "text-[#C61B1B]" : "text-zinc-600"
                    }`}
                    onClick={(event) => {
                      handleNavClick(event, link, true);
                      setMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center text-xs font-semibold">
                <div className="flex overflow-hidden rounded-lg border border-zinc-100 shadow-sm">
                  <Link
                    href={withLocale("en", basePath)}
                    scroll={false}
                    className={`border-r border-zinc-100 px-3 py-2 transition ${
                      lang === "en"
                        ? "bg-[#C61B1B] text-white"
                        : "text-zinc-500 hover:text-[#C61B1B]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    EN
                  </Link>
                  <Link
                    href={withLocale("th", basePath)}
                    scroll={false}
                    className={`px-3 py-2 transition ${
                      lang === "th"
                        ? "bg-[#C61B1B] text-white"
                        : "text-zinc-500 hover:text-[#C61B1B]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    TH
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
