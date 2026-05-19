"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogPost, type BlogPost } from "@/lib/strapi";
import { getMockBlogPosts } from "@/lib/mock-data";
import { useLocale } from "@/lib/i18n/locale-provider";
import { withLocale } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/types";
import { BlogPostArticle } from "@/components/blog/BlogPostArticle";
import { BlogPostPageSkeleton } from "@/components/blog/BlogPostPageSkeleton";

export function LiveBlogPost({
  slug,
  locale,
  initialPost,
}: {
  slug: string;
  locale: Locale;
  initialPost?: BlogPost | null;
}) {
  const { dict } = useLocale();
  const [post, setPost] = useState<BlogPost | null>(initialPost ?? null);
  const [loading, setLoading] = useState(!initialPost);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
      setLoading(false);
      setMissing(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setMissing(false);

    getBlogPost(slug, locale)
      .then((fromStrapi) => {
        if (cancelled) return;
        if (fromStrapi) {
          const mock = getMockBlogPosts(locale).find((p) => p.slug === slug);
          setPost({
            ...fromStrapi,
            coverImage: fromStrapi.coverImage?.url ? fromStrapi.coverImage : (mock?.coverImage ?? null),
          });
          setMissing(false);
          return;
        }
        const mock = getMockBlogPosts(locale).find((p) => p.slug === slug);
        if (mock) {
          setPost(mock);
          setMissing(false);
        } else {
          setPost(null);
          setMissing(true);
        }
      })
      .catch(() => {
        if (cancelled) return;
        const mock = getMockBlogPosts(locale).find((p) => p.slug === slug);
        if (mock) {
          setPost(mock);
          setMissing(false);
        } else {
          setMissing(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, locale, initialPost]);

  if (loading) return <BlogPostPageSkeleton />;

  if (missing || !post) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-2xl font-semibold">{dict.blog.notFound}</h1>
        <Link href={withLocale(locale, "/blog")} className="mt-6 inline-block text-sm text-muted underline">
          {dict.blog.backToBlog}
        </Link>
      </div>
    );
  }

  return <BlogPostArticle post={post} locale={locale} dict={dict} />;
}
