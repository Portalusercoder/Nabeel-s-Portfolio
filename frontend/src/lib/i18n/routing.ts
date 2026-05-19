import { publicAsset } from "@/lib/assets";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Locale path with GitHub Pages base path (e.g. /Nabeel-s-Portfolio/ar/admin). */
export function localizedPath(locale: Locale, path: string): string {
  return publicAsset(withLocale(locale, path));
}

/** Client navigation that works with static export + basePath. */
export function navigateLocalized(locale: Locale, path: string) {
  const target = localizedPath(locale, path);
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
    window.location.assign(target);
    return;
  }
  window.location.assign(target);
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

/** Parse /{locale}/blog/{slug} from a pathname (supports GitHub Pages base path). */
export function parseBlogPostPath(pathname: string): { locale: Locale; slug: string } | null {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  let path = pathname;

  if (base) {
    if (path === base || path === `${base}/`) path = "/";
    else if (path.startsWith(`${base}/`)) path = path.slice(base.length);
  }

  if (!path.startsWith("/")) path = `/${path}`;

  const match = path.match(/^\/(ar|en)\/blog\/([^/]+)\/?$/);
  if (!match || !isValidLocale(match[1])) return null;

  return { locale: match[1], slug: decodeURIComponent(match[2]) };
}
