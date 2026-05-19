"use client";

import { useState } from "react";

import ProductImageCarousel from "@/components/ProductImageCarousel";

type FoodProductItem = {
  brand: string;
  title: string;
  body: string;
  size: string;
  sizeValueSmall?: string;
  sizeValueBig?: string;
};

type FoodProductCardProps = {
  item: FoodProductItem;
  images: { src: string; alt: string }[];
  sizes: string;
  isReversed?: boolean;
};

export default function FoodProductCard({
  item,
  images,
  sizes,
  isReversed = false,
}: FoodProductCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const sizeValues = item.sizeValueSmall
    ? [item.sizeValueSmall, item.sizeValueBig].filter(Boolean)
    : [];
  const sizeText = sizeValues.length
    ? ` ${sizeValues[Math.min(activeIndex, sizeValues.length - 1)]}`
    : item.size;

  return (
    <article
      className={`grid items-center justify-items-center gap-8 lg:gap-24 lg:grid-cols-[480px_1fr] ${
        isReversed ? "lg:grid-cols-[1fr_480px]" : ""
      }`}
    >
      <ProductImageCarousel
        images={images}
        sizes={sizes}
        className={isReversed ? "lg:order-2 lg:justify-self-end" : ""}
        onChange={setActiveIndex}
      />
      <div className={isReversed ? "md:order-1" : ""}>
        <p className="pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {item.brand}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
          {item.title}
        </h3>
        <p className="mt-2 text-base leading-6 text-zinc-600">
          {item.body}
        </p>
        <p className="mt-2 text-base text-zinc-500">{item.size}<span className="text-(--primary)"> {sizeText}</span></p>
      </div>
    </article>
  );
}
