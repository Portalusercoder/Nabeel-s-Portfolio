import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/strapi";
import { getMockBlogPosts } from "@/lib/mock-data";
import { getTranslations } from "@/lib/i18n/server";
import { type Locale } from "@/lib/i18n/types";
import { withLocale } from "@/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const { dict } = await getTranslations(raw);
  return { title: dict.blog.title, description: dict.blog.description };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const { locale, dict } = await getTranslations(raw);
  const validLocale = locale as Locale;
  const posts = await getBlogPosts();
  const display = posts.length > 0 ? posts : getMockBlogPosts(validLocale);
  const Arrow = validLocale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href={withLocale(validLocale, "/")}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          <Arrow className="h-4 w-4" />
          {dict.blog.backHome}
        </Link>
        <h1 className="text-3xl font-semibold lg:text-4xl">{dict.blog.title}</h1>
        <p className="mt-3 max-w-xl text-muted">{dict.blog.description}</p>
        <div className="card-surface mt-12 rounded-3xl p-6 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {display.map((post) => (
              <Link
                key={post.slug}
                href={withLocale(validLocale, `/blog/${post.slug}`)}
                className="group flex items-center gap-4 rounded-2xl p-3 transition hover:bg-card-hover"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-muted text-lg font-semibold text-pill-text">
                  {post.title.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium leading-snug group-hover:text-pill-text">
                    {post.title}
                  </p>
                  {post.excerpt && (
                    <p className="mt-1 line-clamp-2 text-xs text-muted">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {dict.articles.categories.map((tag) => (
            <span key={tag} className="pill-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
