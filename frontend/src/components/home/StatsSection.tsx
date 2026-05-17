"use client";

import { useLocale } from "@/lib/i18n/locale-provider";

export function StatsSection() {
  const { dict } = useLocale();

  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="card-surface rounded-3xl p-8 lg:p-12">
          <p className="text-lg leading-[2] text-foreground/90 lg:text-xl">{dict.stats.paragraph1}</p>
          <p className="mt-6 text-base leading-[2] text-muted lg:text-lg">{dict.stats.paragraph2}</p>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
          {dict.stats.clients.map((name) => (
            <span key={name} className="text-sm font-medium tracking-wide text-muted">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
