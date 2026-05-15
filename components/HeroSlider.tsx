"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: "hero-1",
    background:
      "linear-gradient(105deg, rgba(255, 236, 236, 0.95) 0%, rgba(255, 214, 214, 0.72) 45%, rgba(255, 255, 255, 0.2) 70%), radial-gradient(circle at 70% 30%, rgba(255, 198, 198, 0.6), transparent 52%), linear-gradient(120deg, #f7c6c6 0%, #f0b5b5 48%, #f7d7d7 100%)",
  },
  {
    id: "hero-2",
    background:
      "linear-gradient(105deg, rgba(255, 236, 236, 0.95) 0%, rgba(255, 222, 222, 0.7) 45%, rgba(255, 255, 255, 0.2) 70%), radial-gradient(circle at 68% 38%, rgba(255, 208, 208, 0.6), transparent 52%), linear-gradient(120deg, #f9d3d3 0%, #f1bcbc 52%, #f9e1e1 100%)",
  },
  {
    id: "hero-3",
    background:
      "linear-gradient(105deg, rgba(255, 240, 240, 0.95) 0%, rgba(255, 220, 220, 0.72) 45%, rgba(255, 255, 255, 0.2) 70%), radial-gradient(circle at 72% 32%, rgba(255, 195, 195, 0.55), transparent 52%), linear-gradient(120deg, #f6caca 0%, #f2b2b2 50%, #f8dede 100%)",
  },
];

const SLIDE_INTERVAL = 4800;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[280px] w-full overflow-hidden bg-white sm:h-[420px] lg:h-[520px]">
      {slides.map((slide, index) => (
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
              backgroundImage: slide.background,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-white/95 via-white/70 to-white/10" />
          <div className="absolute inset-y-0 right-0 w-[42%] bg-gradient-to-r from-transparent via-white/10 to-white/30" />
        </div>
      ))}

      <div
        className="pointer-events-none absolute left-[9%] top-1/2 h-28 w-64 -translate-y-1/2 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(160, 160, 160, 0.6) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="pointer-events-none absolute right-[18%] top-1/2 -translate-y-1/2 text-[#9B1B1B] opacity-65">
        <svg
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16v16H4z" />
          <path d="M4 4l16 16" />
          <path d="M20 4L4 20" />
        </svg>
      </div>
    </section>
  );
}
