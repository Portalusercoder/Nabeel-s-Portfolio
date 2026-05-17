import { getDictionary } from "./dictionaries";
import { isValidLocale } from "./routing";
import type { Locale } from "./types";

export async function getTranslations(locale: string) {
  const validLocale: Locale = isValidLocale(locale) ? locale : "ar";
  return { locale: validLocale, dict: getDictionary(validLocale) };
}
