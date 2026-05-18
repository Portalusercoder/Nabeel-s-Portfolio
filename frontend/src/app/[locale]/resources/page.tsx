import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "@/lib/i18n/server";
import { Button } from "@/components/ui/Button";
import { CampaignHighlights } from "@/components/resources/CampaignHighlights";
import { GuideLeadForm } from "@/components/forms/GuideLeadForm";
import { ContactForm } from "@/components/forms/ContactForm";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const { dict } = await getTranslations(raw);
  return { title: dict.resources.title, description: dict.resources.description };
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const { dict } = await getTranslations(raw);

  return (
    <div className="px-5 pb-20 pt-10 lg:px-8 lg:pb-28 lg:pt-14">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <div className="mb-6 inline-flex overflow-hidden rounded-full border border-border text-xs font-medium">
            <span className="bg-pill-text px-4 py-2 text-black">{dict.resources.badgeYear}</span>
            <span className="bg-card px-4 py-2 text-muted">{dict.resources.badgeLabel}</span>
          </div>
          <h1 className="text-3xl font-semibold leading-[1.35] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {dict.resources.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
            {dict.resources.heroSubtitle}
          </p>
          <div className="mt-8">
            <Button href="#getfile" size="lg">
              {dict.resources.getFileCta}
            </Button>
          </div>
        </header>

        <div className="mt-14 lg:mt-16">
          <div className="card-surface overflow-hidden p-4 sm:p-6">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src="/images/campaign-guide-preview.png"
                alt={dict.resources.badgeLabel}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {dict.resources.previewTopics.map((topic) => (
            <article key={topic.title} className="card-surface flex flex-col p-5">
              <h2 className="text-sm font-medium leading-snug text-foreground">{topic.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{topic.excerpt}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 lg:mt-16">
          <CampaignHighlights />
        </div>

        <section id="getfile" className="scroll-mt-24 mt-16 border-t border-border pt-16 lg:mt-20">
          <div className="mx-auto max-w-2xl">
            <GuideLeadForm />
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 mt-16 border-t border-border pt-16 lg:mt-20">
          <div className="card-surface rounded-3xl p-8 lg:p-10">
            <h2 className="text-xl font-semibold sm:text-2xl">{dict.footer.bookConsultation}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted lg:text-base">
              {dict.resources.description}
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
