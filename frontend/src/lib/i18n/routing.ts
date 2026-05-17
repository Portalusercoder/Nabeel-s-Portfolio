import { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function withLocale(locale: Locale, path: string): string {
  if (!path) return `/${locale}`;
  if (path.startsWith("#")) return `/${locale}${path}`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withoutLocale = normalized.replace(/^\/(ar|en)(?=\/|$)/, "") || "/";
  const suffix = withoutLocale === "/" ? "" : withoutLocale;
  return `/${locale}${suffix}`;
}

export function swapLocalePath(pathname: string, newLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isValidLocale(segments[0])) {
    segments[0] = newLocale;
  } else {
    segments.unshift(newLocale);
  }
  return `/${segments.join("/")}`;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return isValidLocale(first) ? first : DEFAULT_LOCALE;
}
