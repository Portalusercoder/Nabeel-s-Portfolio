"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiURL, type BlogPost } from "@/lib/strapi";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import { BLOG_CARD_TONES } from "@/lib/mock-data";
import { withLocale } from "@/lib/i18n/routing";
import { formatBlogCardDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

export function BlogPostGrid({
  posts,
  locale,
  dict,
}: {
  posts: BlogPost[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((post, index) => {
          const tone = BLOG_CARD_TONES[index % BLOG_CARD_TONES.length];
          const coverUrl = post.coverImage?.url;
          const strapiOrigin = getStrapiURL();
          const isStrapiMedia = Boolean(
            coverUrl?.startsWith(strapiOrigin) || coverUrl?.startsWith("/uploads/")
          );

          return (
            <article key={post.slug} className="group">
              <Link
                href={withLocale(locale, `/blog/${post.slug}`)}
                className="block"
              >
                <div className={cn("relative overflow-hidden rounded-3xl bg-gradient-to-br p-1", tone)}>
                  <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[1.35rem] bg-black/25 p-6 lg:min-h-[260px]">
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt={post.coverImage?.alternativeText || post.title}
                        fill
                        unoptimized={isStrapiMedia}
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex max-w-[90%] flex-col items-center justify-center text-center">
                        <span className="text-5xl font-semibold text-white/20">
                          {post.title.charAt(0)}
                        </span>
                        {post.excerpt && (
                          <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-white/50">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    )}
                    {post.publishedAt && (
                      <span
                        className="absolute start-4 top-4 text-sm text-white/70"
                        dir="ltr"
                      >
                        {formatBlogCardDate(post.publishedAt)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <span className="shrink-0 text-sm text-muted">
                    {post.category || dict.blog.badgeLabel}
                  </span>
                  <span className="shrink-0 text-muted">··</span>
                  <h2 className="line-clamp-2 flex-1 text-end text-sm font-medium leading-snug transition group-hover:text-foreground">
                    {post.title}
                  </h2>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((n) => n + PAGE_SIZE)}
            className="h-12 min-w-[200px] rounded-full border border-border bg-card px-8 text-sm font-medium text-foreground transition hover:bg-card-hover"
          >
            {dict.blog.loadMore}
          </button>
        </div>
      )}
    </>
  );
}
