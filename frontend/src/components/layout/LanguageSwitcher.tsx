"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n/locale-provider";
import { swapLocalePath } from "@/lib/i18n/routing";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const { locale, dict } = useLocale();
  const otherLocale: Locale = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={swapLocalePath(pathname, otherLocale)}
      className={cn(
        "rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition hover:border-foreground/30 hover:text-foreground",
        className
      )}
      aria-label={locale === "ar" ? "Switch to English" : "Switch to Arabic"}
    >
      {dict.lang.switchTo}
    </Link>
  );
}

export function LanguageTabs({ className }: { className?: string }) {
  const pathname = usePathname();
  const { locale, dict } = useLocale();

  return (
    <div className={cn("flex rounded-full border border-border p-0.5", className)}>
      {LOCALES.map((loc) => (
        <Link
          key={loc}
          href={swapLocalePath(pathname, loc)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition",
            locale === loc ? "bg-white text-black" : "text-muted hover:text-foreground"
          )}
        >
          {loc === "ar" ? dict.lang.ar : dict.lang.en}
        </Link>
      ))}
    </div>
  );
}
