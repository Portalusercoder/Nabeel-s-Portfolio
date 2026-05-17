"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/locale-provider";
import { withLocale } from "@/lib/i18n/routing";

export function LocaleLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const { locale } = useLocale();
  const localizedHref = typeof href === "string" ? withLocale(locale, href) : href;
  return <Link href={localizedHref} {...props} />;
}
