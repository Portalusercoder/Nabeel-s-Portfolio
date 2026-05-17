"use client";

import { useLocale } from "@/lib/i18n/locale-provider";
import type { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, dict } = useLocale();

  const toggle = () => setLocale(locale === "ar" ? "en" : "ar");

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition hover:border-foreground/30 hover:text-foreground",
        className
      )}
      aria-label={`Switch language to ${locale === "ar" ? "English" : "Arabic"}`}
    >
      {dict.lang.switchTo}
    </button>
  );
}

export function LanguageTabs({ className }: { className?: string }) {
  const { locale, setLocale, dict } = useLocale();
  const options: { id: Locale; label: string }[] = [
    { id: "ar", label: dict.lang.ar },
    { id: "en", label: dict.lang.en },
  ];

  return (
    <div className={cn("flex rounded-full border border-border p-0.5", className)}>
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setLocale(opt.id)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition",
            locale === opt.id
              ? "bg-white text-black"
              : "text-muted hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
