"use client";

import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { useLocale } from "@/lib/i18n/locale-provider";

export function NewsletterSection() {
  const { dict } = useLocale();

  return (
    <section className="border-t border-border px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-xl font-medium sm:text-2xl">{dict.newsletter.title}</h2>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterForm source="homepage" />
        </div>
      </div>
    </section>
  );
}
