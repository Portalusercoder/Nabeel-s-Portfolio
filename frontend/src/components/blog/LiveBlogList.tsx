"use client";

import { useEffect, useState } from "react";
import { getDisplayBlogPosts } from "@/lib/blog-posts";
import type { BlogPost } from "@/lib/strapi";
import type { Locale } from "@/lib/i18n/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { BlogPostGrid } from "@/components/blog/BlogPostGrid";

/** On GitHub Pages, refresh posts from Strapi in the browser (build output is static). */
export function LiveBlogList({
  initialPosts,
  locale,
  dict,
}: {
  initialPosts: BlogPost[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getDisplayBlogPosts(locale)
      .then((live) => {
        if (cancelled) return;
        setPosts(
          [...live].sort((a, b) => {
            const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return db - da;
          })
        );
      })
      .catch(() => {
        /* keep build-time posts if Strapi unreachable */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <>
      {loading && (
        <p className="mb-6 text-center text-sm text-muted">{dict.blog.loadingFromStrapi}</p>
      )}
      <BlogPostGrid posts={posts} locale={locale} dict={dict} />
    </>
  );
}
