import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getDisplayBlogPosts } from "@/lib/blog-posts";
import { getStrapiURL } from "@/lib/strapi";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/types";
import { withLocale } from "@/lib/i18n/routing";

export async function ArticlesPreviewSection({ locale: raw }: { locale: string }) {
  const locale: Locale = isValidLocale(raw) ? raw : "ar";
  const dict = getDictionary(locale);
  const display = (await getDisplayBlogPosts(locale)).slice(0, 8);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href={withLocale(locale, "/blog")}
          className="mb-8 inline-flex items-center gap-2 text-lg font-medium"
        >
          {dict.articles.title}
          <Arrow className="h-4 w-4 text-muted" />
        </Link>
        <div className="card-surface rounded-3xl p-6 lg:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {display.map((post) => {
              const coverUrl = post.coverImage?.url;
              const strapiOrigin = getStrapiURL();
              const isStrapiMedia = Boolean(
                coverUrl?.startsWith(strapiOrigin) || coverUrl?.startsWith("/uploads/")
              );
              return (
                <Link
                  key={post.slug}
                  href={withLocale(locale, `/blog/${post.slug}`)}
                  className="group flex items-center gap-4 rounded-2xl p-2 transition hover:bg-card-hover"
                >
                  <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-start line-clamp-3 group-hover:text-foreground">
                    {post.title}
                  </p>
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-accent-muted">
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt={post.coverImage?.alternativeText || post.title}
                        fill
                        unoptimized={isStrapiMedia}
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-lg font-semibold text-muted">
                        {post.title.charAt(0)}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {dict.articles.categories.map((tag) => (
            <span key={tag} className="pill-tag shrink-0">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
