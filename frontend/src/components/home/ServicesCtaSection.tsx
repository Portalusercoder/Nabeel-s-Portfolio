"use client";

import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/locale-provider";

export function ServicesCtaSection() {
  const { dict } = useLocale();

  return (
    <section id="services" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="card-surface rounded-3xl p-8 lg:p-12">
          <h2 className="text-2xl font-semibold lg:text-3xl">{dict.servicesCta.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
            {dict.servicesCta.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/resources" size="lg">
              {dict.servicesCta.packages}
            </Button>
            <Button href="/resources#contact" variant="outline" size="lg" className="gap-1.5">
              <span className="text-muted">··</span>
              {dict.servicesCta.contact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
