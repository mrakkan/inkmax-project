"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type PackageItem = {
  tier: string;
  name: string;
  subtitle: string;
  minAmount: string;
  price: string;
  features?: string[];
  suitableFor?: string[];
  included?: string[];
  highlights?: string[];
  footnote?: string;
  featured?: boolean;
  includedAddOns?: string[];
};

type AddOnItem = {
  title: string;
  price: string;
  body: string;
};

type SubscriptionItem = {
  title: string;
  price: string;
  body: string;
};

type SelectionLabels = {
  summaryTitle: string;
  totalLabel: string;
  totalNote: string;
  totalUnavailable: string;
  includedLabel: string;
  selectedLabel: string;
  emptyLabel: string;
};

type ServicesSelectionData = {
  packages: {
    title: string;
    featuredLabel: string;
    sectionLabels?: {
      suitableFor: string;
      included: string;
      highlights: string;
    };
    items: PackageItem[];
  };
  addOns: {
    title: string;
    items: AddOnItem[];
  };
  subscription: {
    title: string;
    items: SubscriptionItem[];
  };
  selection: SelectionLabels;
};

type ServiceSelectionProps = {
  lang: string;
  services: ServicesSelectionData;
};

type PriceRange = {
  min: number;
  max: number;
};

type ParsedPrice =
  | { kind: "range"; range: PriceRange }
  | { kind: "percent"; percent: number }
  | { kind: "unknown" };

const parsePrice = (price: string): ParsedPrice => {
  const percentMatch = price.match(/(\d+(?:\.\d+)?)\s*%/);
  if (percentMatch) {
    return { kind: "percent", percent: Number(percentMatch[1]) };
  }

  const numbers = price.match(/\d[\d,]*/g);
  if (!numbers) {
    return { kind: "unknown" };
  }

  const values = numbers
    .map((value) => Number(value.replace(/,/g, "")))
    .filter((value) => Number.isFinite(value));

  if (!values.length) {
    return { kind: "unknown" };
  }

  const min = values[0];
  const max = values.length > 1 ? values[values.length - 1] : values[0];
  return { kind: "range", range: { min, max } };
};

const formatRange = (
  range: PriceRange,
  formatter: Intl.NumberFormat,
  currencyLabel: string
) => {
  const min = Math.round(range.min);
  const max = Math.round(range.max);
  if (min === max) {
    return `${formatter.format(min)} ${currencyLabel}`;
  }
  return `${formatter.format(min)} - ${formatter.format(max)} ${currencyLabel}`;
};

type SelectableCardProps = {
  header?: ReactNode;
  title: string;
  subtitle?: string;
  minAmount?: string;
  price: string;
  body?: string;
  features?: string[];
  sections?: Array<{
    label: string;
    items: string[];
    tone?: "dot" | "check" | "blackdot";
  }>;
  footnote?: string;
  badge?: string;
  selected?: boolean;
  selectedLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
};

type SimpleSelectableCardProps = {
  title: string;
  price: string;
  body?: string;
  badge?: string;
  selected?: boolean;
  selectedLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const SelectableCard = ({
  header,
  title,
  subtitle,
  minAmount,
  price,
  body,
  features,
  sections,
  footnote,
  badge,
  selected,
  selectedLabel,
  disabled,
  onClick,
}: SelectableCardProps) => {
  return (
    <button
      type="button"
      className={`cursor-pointer group relative flex h-full flex-col rounded-[28px] border bg-white p-6 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C61B1B]/40 ${selected
          ? "border-[#C61B1B] ring-1 ring-[#C61B1B]/20"
          : "border-zinc-200"
        } ${disabled ? "cursor-not-allowed opacity-60" : "hover:-translate-y-0.5"}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-3">
        <div>{header}</div>
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-[5px] border ${selected
              ? "border-[#C61B1B] bg-[#C61B1B]"
              : "border-zinc-300 bg-white"
            }`}
          aria-hidden="true"
        >
          {selected ? (
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5L4.5 8.5L11 1.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
      </div>
      <h3 className="mt-4! leading-tight text-zinc-900 whitespace-break-spaces">
        {title}
      </h3>
      {subtitle ? (
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      ) : null}
      {minAmount ? (
        <p className="mt-6 text-base!">{minAmount}</p>
      ) : null}
      <h3 className="mt-1 font-bold!">{price}</h3>
      {sections?.length ? (
        <div className="mt-6 space-y-5 border-t pt-2 border-zinc-300">
          {sections.map((section, index) => (
            <div key={`${section.label}-${index}`}>
              <p className="mt-4 text-xs font-semibold ">
                {section.label}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2 w-fit">
                    {section.tone === "check" ? (
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full">
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4L3.75 6.5L9 1.5"
                            stroke="#C61B1B"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : section.tone === "blackdot" ? (
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
                      </span>
                    ) : (
                      <span className="inline-flex h-4 w-4 min-w-4 rounded-full">
                        <Image
                          src="/icons/CheckMark.svg"
                          alt="Check"
                          width={16}
                          height={16}
                        />
                      </span>
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : features ? (
        <div className="mt-6">
          <ul className="space-y-2 text-sm text-zinc-600">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#C61B1B]/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C61B1B]" />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {body ? <p className="mt-3 text-sm text-zinc-600">{body}</p> : null}
      {footnote ? (
        <p className="mt-auto inline-flex items-center gap-2 text-xs text-zinc-400 border-t pt-4 border-zinc-300">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="4.8" stroke="#A1A1AA" strokeWidth="1" />
            <path
              d="M6 3.5V6.2L7.7 7.3"
              stroke="#A1A1AA"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          {footnote}
        </p>
      ) : null}
    </button>
  );
};

const SimpleSelectableCard = ({
  title,
  price,
  body,
  badge,
  selected,
  selectedLabel,
  disabled,
  onClick,
}: SimpleSelectableCardProps) => {
  return (
    <button
      type="button"
      className={`cursor-pointer group flex h-full min-h-[178px] flex-col gap-4 rounded-3xl border bg-white p-5 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C61B1B]/40 ${
        selected ? "border-[#C61B1B]" : "border-zinc-200"
      } ${disabled ? "cursor-not-allowed opacity-60" : "hover:-translate-y-0.5"}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-[5px] border ${selected
              ? "border-[#C61B1B] bg-[#C61B1B]"
              : "border-zinc-300 bg-white"
            }`}
          aria-hidden="true"
        >
          {selected ? (
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5L4.5 8.5L11 1.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
        {badge ? (
          <span className="rounded-full bg-[#C61B1B]/10 px-3 py-1 text-xs font-semibold text-[#C61B1B]">
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-2 text-[#C61B1B]!">{price}</h3>
      {body ? <p className=" text-sm text-zinc-600 whitespace-break-spaces">{body}</p> : null}
    </button>
  );
};

export default function ServiceSelection({ lang, services }: ServiceSelectionProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(
    () => new Set()
  );
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(
    null
  );

  const currentPackage = useMemo(
    () => services.packages.items.find((item) => item.name === selectedPackage),
    [selectedPackage, services.packages.items]
  );

  const includedAddOns = useMemo(
    () => new Set(currentPackage?.includedAddOns ?? []),
    [currentPackage]
  );

  useEffect(() => {
    if (!includedAddOns.size) {
      return;
    }
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      includedAddOns.forEach((title) => next.delete(title));
      return next;
    });
  }, [includedAddOns]);

  useEffect(() => {
    if (selectedPackage) {
      return;
    }
    setSelectedAddOns(new Set());
    setSelectedSubscription(null);
  }, [selectedPackage]);

  const toggleAddOn = (title: string) => {
    if (includedAddOns.has(title)) {
      return;
    }
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const summaryItems = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      price: string;
      included?: boolean;
    }> = [];

    if (currentPackage) {
      items.push({
        id: `package:${currentPackage.name}`,
        title: currentPackage.name,
        price: currentPackage.price,
      });
    }

    services.addOns.items.forEach((item) => {
      if (includedAddOns.has(item.title)) {
        items.push({
          id: `addon-included:${item.title}`,
          title: item.title,
          price: item.price,
          included: true,
        });
        return;
      }
      if (selectedAddOns.has(item.title)) {
        items.push({
          id: `addon:${item.title}`,
          title: item.title,
          price: item.price,
        });
      }
    });

    const subscription = services.subscription.items.find(
      (item) => item.title === selectedSubscription
    );
    if (subscription) {
      items.push({
        id: `subscription:${subscription.title}`,
        title: subscription.title,
        price: subscription.price,
      });
    }

    return items;
  }, [
    currentPackage,
    includedAddOns,
    selectedAddOns,
    selectedSubscription,
    services.addOns.items,
    services.subscription.items,
  ]);

  const total = useMemo(() => {
    const formatter = new Intl.NumberFormat(lang === "th" ? "th-TH" : "en-US");
    const currencyLabel = lang === "th" ? "บาท" : "THB";
    let minTotal = 0;
    let maxTotal = 0;
    let hasUnknown = false;

    const packagePrice = currentPackage ? parsePrice(currentPackage.price) : null;

    const addRange = (range: PriceRange) => {
      minTotal += range.min;
      maxTotal += range.max;
    };

    const addParsed = (parsed: ParsedPrice) => {
      if (parsed.kind === "range") {
        addRange(parsed.range);
      } else if (parsed.kind === "unknown") {
        hasUnknown = true;
      }
    };

    if (packagePrice) {
      addParsed(packagePrice);
    }

    summaryItems.forEach((item) => {
      if (item.included || item.id.startsWith("package:")) {
        return;
      }
      const parsed = parsePrice(item.price);
      if (parsed.kind === "percent") {
        if (packagePrice?.kind === "range") {
          const factor = parsed.percent / 100;
          addRange({
            min: packagePrice.range.min * factor,
            max: packagePrice.range.max * factor,
          });
        } else {
          hasUnknown = true;
        }
        return;
      }
      addParsed(parsed);
    });

    if (!summaryItems.length) {
      return { label: "", note: "", formatter, currencyLabel };
    }

    const label =
      minTotal === 0 && maxTotal === 0 && hasUnknown
        ? services.selection.totalUnavailable
        : formatRange(
          { min: minTotal, max: maxTotal },
          formatter,
          currencyLabel
        );

    return {
      label,
      note:
        hasUnknown && (minTotal > 0 || maxTotal > 0)
          ? services.selection.totalNote
          : "",
      formatter,
      currencyLabel,
    };
  }, [
    currentPackage,
    lang,
    services.selection.totalNote,
    services.selection.totalUnavailable,
    summaryItems,
  ]);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="text-center flex flex-col items-center justify-center gap-4 my-12">
          <h2 className="text-2xl font-semibold text-[#A31621]!">
            {services.packages.title}
          </h2>
          <svg width="150" height="4" viewBox="0 0 150 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="4" rx="2" fill="#A11111" />
          </svg>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {services.packages.items.map((item) => (
            <SelectableCard
              key={item.name}
              header={
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  {item.tier}
                </p>
              }
              title={item.name}
              subtitle={item.subtitle}
              minAmount={item.minAmount}
              price={item.price}
              sections={
                [
                  {
                    label:
                      services.packages.sectionLabels?.suitableFor ??
                      "Suitable for",
                    items: item.suitableFor ?? [],
                    tone: "blackdot",
                  },
                  {
                    label:
                      services.packages.sectionLabels?.included ??
                      "What you get",
                    items: item.included ?? item.features ?? [],
                    tone: "dot",
                  },
                  {
                    label:
                      services.packages.sectionLabels?.highlights ??
                      "Highlights",
                    items: item.highlights ?? [],
                    tone: "check",
                  },
                ].filter((section) => section.items.length > 0)
              }
              footnote={item.footnote}
              badge={item.featured ? services.packages.featuredLabel : undefined}
              selected={item.name === selectedPackage}
              selectedLabel={services.selection.selectedLabel}
              onClick={() =>
                setSelectedPackage((prev) =>
                  prev === item.name ? null : item.name
                )
              }
            />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="text-center flex flex-col items-center justify-center gap-4 my-4">
          <h2 className="text-2xl font-semibold text-[#A31621]!">
            {services.addOns.title}
          </h2>
          <svg width="150" height="4" viewBox="0 0 150 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="4" rx="2" fill="#A11111" />
          </svg>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.addOns.items.map((item) => {
            const included = includedAddOns.has(item.title);
            return (
              <SimpleSelectableCard
                key={item.title}
                title={item.title}
                price={item.price}
                body={item.body}
                badge={included ? services.selection.includedLabel : undefined}
                selected={selectedAddOns.has(item.title)}
                selectedLabel={services.selection.selectedLabel}
                disabled={included}
                onClick={() => toggleAddOn(item.title)}
              />
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="text-center flex flex-col items-center justify-center gap-4 my-4">
          <h2 className="text-2xl font-semibold text-[#A31621]!">
            {services.subscription.title}
          </h2>
          <svg width="150" height="4" viewBox="0 0 150 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="4" rx="2" fill="#A11111" />
          </svg>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.subscription.items.map((item) => (
            <SimpleSelectableCard
              key={item.title}
              title={item.title}
              price={item.price}
              body={item.body}
              selected={item.title === selectedSubscription}
              selectedLabel={services.selection.selectedLabel}
              onClick={() =>
                setSelectedSubscription((prev) =>
                  prev === item.title ? null : item.title
                )
              }
            />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                {services.selection.summaryTitle}
              </h3>
              {summaryItems.length ? null : (
                <p className="mt-1 text-sm text-zinc-500">
                  {services.selection.emptyLabel}
                </p>
              )}
            </div>
            {summaryItems.length ? (
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  {services.selection.totalLabel}
                </p>
                <p className="mt-1 text-xl font-semibold text-[#C61B1B]">
                  {total.label}
                </p>
                {total.note ? (
                  <p className="mt-1 text-xs text-zinc-400">{total.note}</p>
                ) : null}
              </div>
            ) : null}
          </div>
          {summaryItems.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {summaryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-500">{item.price}</p>
                  </div>
                  {item.included ? (
                    <span className="rounded-full bg-[#C61B1B]/10 px-3 py-1 text-xs font-semibold text-[#C61B1B]">
                      {services.selection.includedLabel}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
