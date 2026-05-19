import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/strapi";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import { withLocale } from "@/lib/i18n/routing";
import { formatDate } from "@/lib/utils";

export function BlogPostArticle({
  post,
  locale,
  dict,
}: {
  post: BlogPost;
  locale: Locale;
  dict: Dictionary;
}) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <Link
        href={withLocale(locale, "/blog")}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
      >
        <Arrow className="h-4 w-4" />
        {dict.blog.backToBlog}
      </Link>
      <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted">
        <span className="pill-tag">{post.category}</span>
        {post.readTime && (
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime} {dict.blog.minRead}
          </span>
        )}
        {post.publishedAt && <span>{formatDate(post.publishedAt, locale)}</span>}
      </div>
      <h1 className="mt-6 text-3xl font-semibold leading-tight lg:text-4xl">{post.title}</h1>
      {post.author && (
        <p className="mt-4 text-muted">
          {dict.blog.byAuthor} {post.author}
        </p>
      )}
      <div className="prose-custom mt-12" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
