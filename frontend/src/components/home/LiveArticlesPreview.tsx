"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getDisplayBlogPosts } from "@/lib/blog-posts";
import { getStrapiURL } from "@/lib/strapi";
import type { BlogPost } from "@/lib/strapi";
import type { Locale } from "@/lib/i18n/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { withLocale } from "@/lib/i18n/routing";
import { ArticlesPreviewSkeleton } from "@/components/home/ArticlesPreviewSkeleton";

export function LiveArticlesPreview({
  locale,
  dict,
  initialPosts,
}: {
  locale: Locale;
  dict: Dictionary;
  initialPosts: BlogPost[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(true);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const skeletonCount = Math.min(Math.max(initialPosts.length, 4), 8);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getDisplayBlogPosts(locale)
      .then((live) => {
        if (!cancelled) setPosts(live.slice(0, 8));
      })
      .catch(() => {
        /* keep build-time preview */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

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
          {loading ? (
            <ArticlesPreviewSkeleton count={skeletonCount} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => {
                const coverUrl = post.coverImage?.url;
                const strapiOrigin = getStrapiURL();
                const isStrapiMedia = Boolean(
                  coverUrl?.startsWith(strapiOrigin) || coverUrl?.startsWith("/uploads/")
                );
                return (
                  <Link
                    key={`${post.slug}-${post.id}`}
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
          )}
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
