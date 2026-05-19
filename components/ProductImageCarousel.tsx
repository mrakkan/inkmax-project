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
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 text-zinc-700 shadow-md ring-1 ring-zinc-100 transition hover:bg-white cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M12.5 4.5L7 10L12.5 15.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 text-zinc-700 shadow-md ring-1 ring-zinc-100 transition hover:bg-white cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M7.5 4.5L13 10L7.5 15.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex
                    ? "bg-[#A11111]"
                    : "bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
