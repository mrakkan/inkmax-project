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

type NavChild = {
  key: string;
  href: string;
  label: string;
};

type NavLink = {
  key: string;
  href: string;
  label: string;
  children?: NavChild[];
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

  const navLinks = useMemo<NavLink[]>(
    () => [
      { key: "home", href: "/", label: labels.home },
      {
        key: "products",
        href: "/products",
        label: labels.products,
        children: [
          { key: "product-1", href: "/products/a", label: "Product A" },
          { key: "product-2", href: "/products/b", label: "Product B" },
          { key: "product-3", href: "/products/c", label: "Product C" },
        ],
      },
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
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-2 lg:px-10">
        <Link href={withLocale(lang, "/")} className="flex items-center">
          <Image
            src="/logo.png"
            alt="KYN Partners & Co Ltd."
            width={136}
            height={34}
            priority
          />
        </Link>

        <div className="flex items-center gap-12">
          <nav className="hidden md:flex w-">
            <div ref={navRef} className="relative flex items-center gap-8">
              {navLinks.map((link, index) => {
                const isActive = index === activeIndex;
                if (link.children) {
                  return (
                    <div key={link.key} className="group relative">
                      <Link
                        href={withLocale(lang, link.href)}
                        className={`nav-link text-sm text-center font-medium w-15 ${
                          isActive
                            ? "active"
                            : "text-zinc-500 hover:text-[#C61B1B]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        ref={(el) => {
                          linkRefs.current[index] = el;
                        }}
                      >
                        {link.label}
                      </Link>
                      <div className="absolute left-1/2 top-full z-20 hidden w-44 -translate-x-1/2 pt-4 group-hover:block">
                        <div className="rounded-lg border border-zinc-100 bg-white py-2 shadow-lg">
                          {link.children.map((child) => (
                            <Link
                              key={child.key}
                              href={withLocale(lang, child.href)}
                              className={`block px-4 py-2 text-sm transition ${
                                basePath === child.href
                                  ? "text-[#C61B1B]"
                                  : "text-zinc-600 hover:text-[#C61B1B]"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.key}
                    href={withLocale(lang, link.href)}
                    className={`nav-link text-sm text-center font-medium w-15 ${
                      isActive
                        ? "active"
                        : "text-zinc-500 hover:text-[#C61B1B]"
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
            className="inline-flex items-center justify-center rounded-md border border-zinc-100 shadow-sm px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${
          menuOpen ? "block" : "hidden"
        } border-t border-zinc-100 bg-white`}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6">
          {navLinks.map((link) => {
            const isActive =
              (link.href === "/" && basePath === "/") ||
              (link.href !== "/" && basePath.startsWith(link.href));
            return (
              <div key={link.key} className="flex flex-col gap-2">
                <Link
                  href={withLocale(lang, link.href)}
                  className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                    isActive ? "text-[#C61B1B]" : "text-zinc-600"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children ? (
                  <div className="flex flex-col gap-2 pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.key}
                        href={withLocale(lang, child.href)}
                        className={`text-sm ${
                          basePath === child.href
                            ? "text-[#C61B1B]"
                            : "text-zinc-500"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className="flex items-center text-xs font-semibold">
            <div className="flex overflow-hidden rounded-lg border border-zinc-100 shadow-sm">
              <Link
                href={withLocale("en", basePath)}
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
        </div>
      </div>
    </header>
  );
}
