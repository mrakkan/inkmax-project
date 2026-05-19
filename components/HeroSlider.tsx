"use client";

import { rgba } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type HeroSlide = {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string[];
  align?: "center" | "left" | string;
  image?: string;
  background?: string;
  tagline?: string[];
};

type HeroSliderProps = {
  slides: HeroSlide[];
  tagline?: string[];
  navItems?: string[];
};

const DEFAULT_GRADIENT =
  "linear-gradient(120deg, rgba(224, 128, 128, 0.35) 0%, rgba(230, 142, 142, 0.45) 52%, rgba(255, 184, 150, 0.55) 100%), radial-gradient(circle at 70% 35%, rgba(255, 255, 255, 0.35), transparent 55%)";

const SLIDE_INTERVAL = 4800;

export default function HeroSlider({
  slides,
  tagline = [],
  navItems = [],
}: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = slides.length;

  const normalizedSlides = useMemo(() => {
    if (totalSlides > 0) {
      return slides;
    }
    return [
      {
        id: "hero-fallback",
        title: "KYN PARTNERS & CO",
        subtitle: "ARCHITECTURE OF INNOVATION",
        description: [],
        align: "center",
        background: DEFAULT_GRADIENT,
      },
    ];
  }, [slides, totalSlides]);

  useEffect(() => {
    if (totalSlides < 2) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [activeIndex, totalSlides]);

  useEffect(() => {
    if (totalSlides < 2) {
      return;
    }

    const nextIndex = (activeIndex + 1) % totalSlides;
    const nextImage = normalizedSlides[nextIndex]?.image;

    if (!nextImage) {
      return;
    }

    const img = new window.Image();
    img.src = nextImage;
  }, [activeIndex, normalizedSlides, totalSlides]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const renderLines = (value?: string) => {
    if (!value) {
      return null;
    }

    return value.split("\n").map((line, index) => (
      <span key={`${line}-${index}`} className="block">
        {line}
      </span>
    ));
  };

  return (
    <section className="relative min-h-screen min-h-[100svh] w-full overflow-hidden bg-white">
      {normalizedSlides.map((slide, index) => {
        const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
        const nextIndex = (activeIndex + 1) % totalSlides;
        const shouldLoadImage =
          index === activeIndex || index === prevIndex || index === nextIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== activeIndex}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: slide.background ?? DEFAULT_GRADIENT,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {slide.image && shouldLoadImage ? (
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                decoding="async"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            ) : null}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(163,22,33,0.26) 62%, rgba(127,15,20,0.92) 100%)",
              }}
            />
          </div>
        );
      })}

      {normalizedSlides.map((slide, index) => {
        if (index !== activeIndex) {
          return null;
        }

        const isLeft = slide.align === "left";
        const slideTagline = slide.tagline ?? tagline;
        const showLogo = index === 0;
        const isFirstSlide = index === 0;
        const isThirdSlide = index === 2;
        const isFourthSlide = index === 3;
        const titleColor = isFirstSlide ? "#8b1419" : "#ffffff";
        const subtitleColor = isFirstSlide
          ? "rgba(139, 20, 25, 0.80)"
          : "rgba(255, 255, 255, 0.90)";
        const descriptionColor = isFirstSlide
          ? "rgba(139, 20, 25, 0.80)"
          : "rgba(255, 255, 255, 0.90)";
        const taglineColor = isFirstSlide
          ? "rgba(139, 20, 25, 0.70)"
          : "rgba(255, 255, 255, 0.80)";
        const dotColor = isFirstSlide
          ? "rgba(139, 20, 25, 0.40)"
          : "rgba(255, 255, 255, 0.70)";
        const titleFontSize = isThirdSlide
          ? "clamp(2rem, 5vw, 4.2rem)"
          : "clamp(1.6rem, 4vw, 3.4rem)";
        const subtitleFontSize = isThirdSlide
          ? "clamp(0.65rem, 1.4vw, 1rem)"
          : isFirstSlide || isFourthSlide
            ? "clamp(1.1rem, 3vw, 2.1rem)"
            : "clamp(0.9rem, 1.8vw, 1.2rem)";
        const descriptionFontSize = isThirdSlide
          ? "clamp(1.8rem, 2vw, 1.8rem)"
          : "clamp(1.9rem, 3vw, 2rem)";

        return (
          <div key={`${slide.id}-content`} className="absolute inset-0 flex items-center px-6">
            <div
              className={`flex w-full flex-col ${
                isLeft ? "items-center" : "items-center text-center"
              }`}
            >
              <div
                className={`mx-auto flex w-full max-w-3xl flex-col ${
                  isLeft ? "items-start text-left" : "items-center"
                }`}
                style={{ transform: "translateY(clamp(-72px, -8vh, -40px))" }}
              >
                {showLogo ? (
                  <div className="mb-4 flex h-32 w-32 items-center justify-center sm:h-50 sm:w-50 lg:h-70 lg:w-70">
                    <img
                      src="/logo/LOGO_COMPANY_KYN.png"
                      alt="KYN logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : null}
                {slide.title ? (
                  <h1
                    className="font-semibold uppercase leading-tight tracking-[0.16em]"
                    style={{
                      color: titleColor,
                      fontSize: titleFontSize,
                      textShadow: "0 12px 28px rgba(0,0,0,0.38)",
                    }}
                  >
                    {renderLines(slide.title)}
                  </h1>
                ) : null}
                {slide.subtitle ? (
                  <p
                    className="mt-3 uppercase tracking-[0.3em]"
                    style={{
                      color: '#ffffff',
                      fontSize: subtitleFontSize,
                      textShadow: "0 10px 24px rgba(0,0,0,0.34)",
                    }}
                  >
                    {renderLines(slide.subtitle)}
                  </p>
                ) : null}

                {slide.description && slide.description.length > 0 ? (
                  <div
                    className="mt-4 leading-relaxed"
                    style={{
                      color: '#ffffff',
                      fontSize: descriptionFontSize,
                      textShadow: "0 10px 24px rgba(0,0,0,0.30)",
                    }}
                  >
                    {slide.description.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}

                {slideTagline && slideTagline.length > 0 ? (
                  <div
                    className="mt-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] sm:text-[11px]"
                    style={{
                      color: '#ffffff',
                      textShadow: "0 10px 22px rgba(0,0,0,0.28)",
                    }}
                  >
                    {slideTagline.map((item, itemIndex) => (
                      <span key={item} className="flex items-center gap-3">
                        {item}
                        {itemIndex < slideTagline.length - 1 ? (
                          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: dotColor }} />
                        ) : null}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 text-black/45 transition hover:text-black/70"
        onClick={handlePrev}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 text-black/45 transition hover:text-black/70"
        onClick={handleNext}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {navItems.length > 0 && navItems.length === normalizedSlides.length ? (
        <div className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2">
          <div className="grid grid-flow-col auto-cols-fr items-end gap-x-8">
            {navItems.map((item, index) => (
              <button
                key={`${item}-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                className="group flex flex-col items-center gap-3 whitespace-nowrap"
                onClick={() => setActiveIndex(index)}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === activeIndex
                      ? "scale-125 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                      : "bg-white/45"
                  }`}
                />
                <span
                  className={`text-[10px] uppercase tracking-[0.26em] ${
                    index === activeIndex ? "text-white" : "text-white/80"
                  }`}
                  style={{ textShadow: "0 10px 22px rgba(0,0,0,0.28)" }}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            {normalizedSlides.map((slide, index) => (
              <button
                key={`${slide.id}-dot`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex
                    ? "scale-125 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                    : "bg-white/45"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          {navItems.length > 0 ? (
            <div
              className="flex items-center justify-center gap-6 whitespace-nowrap text-[10px] uppercase tracking-[0.26em] text-white/80"
              style={{ textShadow: "0 10px 22px rgba(0,0,0,0.28)" }}
            >
              {navItems.map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
