"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { TouchEvent } from "react";

type ProductImage = {
  src: string;
  alt: string;
};

type ProductImageCarouselProps = {
  images: ProductImage[];
  sizes?: string;
  className?: string;
  onChange?: (index: number) => void;
};

const SWIPE_THRESHOLD_PX = 40;

export default function ProductImageCarousel({
  images,
  sizes,
  className = "",
  onChange,
}: ProductImageCarouselProps) {
  if (!images.length) {
    return null;
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const totalImages = images.length;
  const showControls = totalImages > 1;

  const goToIndex = (nextIndex: number) => {
    const normalized = (nextIndex + totalImages) % totalImages;
    setActiveIndex(normalized);
    onChange?.(normalized);
  };

  const goNext = () => goToIndex(activeIndex + 1);
  const goPrev = () => goToIndex(activeIndex - 1);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (!showControls) {
      return;
    }
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!showControls) {
      return;
    }
    const startX = touchStartX.current;
    if (startX === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? startX;
    const deltaX = endX - startX;
    touchStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) {
      return;
    }

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrev();
  };

  return (
    <div
      className={`relative w-full max-w-[400px] aspect-square min-h-0 min-w-0 overflow-hidden rounded-2xl bg-white shadow-md sm:max-w-[480px] ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={images[activeIndex].src}
        alt={images[activeIndex].alt}
        width={400}
        height={400}
        className="h-full w-full max-h-full max-w-full select-none object-contain"
        sizes={sizes}
        draggable={false}
      />

      {showControls && (
        <>
          <button
        type="button"
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white transition hover:text-black/70 cursor-pointer"
        onClick={goPrev}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white transition hover:text-black/70 cursor-pointer"
        onClick={goNext}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition cursor-pointer ${
                  index === activeIndex
                    ? "scale-125 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                    : "bg-white/45"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
