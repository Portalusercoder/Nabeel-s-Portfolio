import type { Metadata } from "next";
import { getDisplayBlogPosts } from "@/lib/blog-posts";
import { getTranslations } from "@/lib/i18n/server";
import { type Locale } from "@/lib/i18n/types";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const { dict } = await getTranslations(raw);
  return { title: dict.blog.badgeLabel, description: dict.blog.description };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const { locale, dict } = await getTranslations(raw);
  const validLocale = locale as Locale;
  const display = await getDisplayBlogPosts(validLocale);

  const sorted = [...display].sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return db - da;
  });

  return (
    <div className="px-5 pb-20 pt-10 lg:px-8 lg:pb-28 lg:pt-14">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex overflow-hidden rounded-full border border-border text-xs font-medium">
            <span className="bg-pill-text px-4 py-2 text-black">{dict.blog.badgeYear}</span>
            <span className="bg-card px-4 py-2 text-muted">{dict.blog.badgeLabel}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {dict.blog.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
            {dict.blog.description}
          </p>
        </header>

        <div className="mt-14 lg:mt-16">
          <BlogPostGrid posts={sorted} locale={validLocale} dict={dict} />
        </div>
      </div>
    </div>
  );
}
