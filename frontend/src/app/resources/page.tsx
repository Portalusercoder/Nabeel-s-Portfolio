import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, FileText } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { getResources } from "@/lib/strapi";
import { getMockResources } from "@/lib/mock-data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return { title: dict.resources.title, description: dict.resources.description };
}

export default async function ResourcesPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const resources = await getResources();
  const display = resources.length > 0 ? resources : getMockResources(locale);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
          <Arrow className="h-4 w-4" />
          {dict.resources.backHome}
        </Link>
        <h1 className="text-3xl font-semibold lg:text-4xl">{dict.resources.title}</h1>
        <p className="mt-3 max-w-xl text-muted">{dict.resources.description}</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {display.map((resource) => (
            <article key={resource.id} className="card-surface flex flex-col p-6">
              <FileText className="h-5 w-5 text-muted" strokeWidth={1.5} />
              <span className="mt-4 text-xs text-muted">{resource.category}</span>
              <h2 className="mt-2 font-medium">{resource.title}</h2>
              {resource.description && <p className="mt-2 flex-1 text-sm text-muted">{resource.description}</p>}
              <button type="button" className="mt-6 inline-flex items-center gap-2 text-sm text-pill-text">
                <Download className="h-4 w-4" />
                {resource.file?.url ? dict.resources.download : dict.resources.requestDownload}
              </button>
            </article>
          ))}
        </div>
        <section className="mt-20 border-t border-border pt-16">
          <h2 className="text-xl font-semibold">{dict.resources.newsletterTitle}</h2>
          <p className="mt-2 text-muted">{dict.resources.newsletterDesc}</p>
          <div className="mt-6 max-w-md"><NewsletterForm source="resources" /></div>
        </section>
        <section id="contact" className="mt-20 scroll-mt-24 border-t border-border pt-16">
          <h2 className="text-xl font-semibold">{dict.resources.contactTitle}</h2>
          <p className="mt-2 text-muted">{dict.resources.contactDesc}</p>
          <div className="mt-8 max-w-lg"><ContactForm /></div>
        </section>
      </div>
    </div>
  );
}
