import "server-only";

export const locales = ["th", "en"] as const;

export type Locale = (typeof locales)[number];

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  th: () => import("./dictionaries/th.json").then((module) => module.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
