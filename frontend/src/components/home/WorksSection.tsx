"use client";

import { LocaleLink } from "@/components/layout/LocaleLink";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function WorksSection() {
  const { dict, isRtl } = useLocale();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="works" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <LocaleLink href="/#works" className="flex items-center gap-2 text-lg font-medium">
            {dict.works.title}
            <Arrow className="h-4 w-4 text-muted" />
          </LocaleLink>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {dict.works.items.map((work) => (
            <article
              key={work.title}
              className={cn("group overflow-hidden rounded-3xl bg-gradient-to-br p-1", work.gradient)}
            >
              <div className="flex min-h-[280px] flex-col justify-between rounded-[1.35rem] bg-black/20 p-6 backdrop-blur-sm lg:min-h-[340px]">
                <div>
                  <p className="text-2xl text-white/95 lg:text-3xl">{work.label}</p>
                  <p className="mt-1 text-sm text-muted">{work.sub}</p>
                </div>
                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <span className="text-sm text-foreground/90">{work.title}</span>
                  <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
                    {work.tag}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
