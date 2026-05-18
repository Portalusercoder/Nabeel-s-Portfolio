"use client";

import { LocaleLink } from "@/components/layout/LocaleLink";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { dict, isRtl } = useLocale();

  return (
    <section className="px-5 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-14">
      <div className="mx-auto max-w-6xl">
        <h1 className="max-w-4xl text-3xl font-semibold leading-[1.35] tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {dict.site.fullName}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
          {dict.site.tagline}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {dict.hero.cards.map((card) => (
            <LocaleLink
              key={card.title}
              href={card.href.startsWith("#") ? card.href : `/${card.href}`}
              className="group relative card-surface p-5 transition hover:bg-card-hover"
            >
              {card.badge === "online" && (
                <span
                  className={cn(
                    "absolute top-4 h-2 w-2 rounded-full bg-online shadow-[0_0_10px_var(--online)]",
                    isRtl ? "left-4" : "right-4"
                  )}
                  aria-hidden
                />
              )}
              <p className="text-base font-medium text-foreground">{card.title}</p>
              <p className="mt-2 text-sm text-muted">{card.subtitle}</p>
            </LocaleLink>
          ))}
        </div>
      </div>
    </section>
  );
}
