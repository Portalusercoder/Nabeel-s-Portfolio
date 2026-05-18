"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/locale-provider";
import { publicAsset } from "@/lib/assets";
import { withLocale } from "@/lib/i18n/routing";

/**
 * Locale-aware links that work on GitHub Pages (subpath deploy).
 * Uses full paths including NEXT_PUBLIC_BASE_PATH so /admin never becomes github.io/admin.
 */
export function LocaleLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const { locale } = useLocale();

  if (typeof href !== "string") {
    return <Link href={href} {...props} />;
  }

  const resolved = publicAsset(withLocale(locale, href));

  // Static export on GitHub Pages: plain path is baked into HTML (no basePath doubling)
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
    return <a href={resolved} {...(props as React.ComponentProps<"a">)} />;
  }

  return <Link href={resolved} {...props} />;
}
