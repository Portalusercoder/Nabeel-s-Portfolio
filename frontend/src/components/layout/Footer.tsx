"use client";

import { SITE_EMAIL } from "@/lib/constants";
import { LocaleLink } from "@/components/layout/LocaleLink";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Footer() {
  const { dict } = useLocale();

  return (
    <footer className="border-t border-border px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>{dict.site.location}</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href={`mailto:${SITE_EMAIL}`} className="hover:text-foreground">
            {SITE_EMAIL}
          </a>
          <LocaleLink href="/resources" className="hover:text-foreground">
            {dict.footer.newsletter}
          </LocaleLink>
          <LocaleLink href="/resources#contact" className="hover:text-foreground">
            {dict.footer.bookConsultation}
          </LocaleLink>
          <LocaleLink href="/admin" className="hover:text-foreground">
            {dict.footer.admin}
          </LocaleLink>
        </div>
      </div>
    </footer>
  );
}
