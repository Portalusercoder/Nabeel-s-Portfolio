import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { getBlogPost } from "@/lib/strapi";
import { getDisplayBlogPosts } from "@/lib/blog-posts";
import { getTranslations } from "@/lib/i18n/server";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { withLocale } from "@/lib/i18n/routing";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const ar = await getDisplayBlogPosts("ar");
  const en = await getDisplayBlogPosts("en");
  const slugs = new Set([...ar, ...en].map((p) => p.slug));
  return LOCALES.flatMap((locale) => [...slugs].map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const { locale, dict } = await getTranslations(raw);
  const posts = await getDisplayBlogPosts(locale);
  const post = (await getBlogPost(slug, locale)) || posts.find((p) => p.slug === slug);
  if (!post) return { title: dict.blog.notFound };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const { locale, dict } = await getTranslations(raw);
  const validLocale = locale as Locale;
  const posts = await getDisplayBlogPosts(validLocale);
  const strapiPost = await getBlogPost(slug, validLocale);
  const mockMatch = posts.find((p) => p.slug === slug);
  const post = strapiPost
    ? {
        ...strapiPost,
        coverImage: strapiPost.coverImage?.url ? strapiPost.coverImage : (mockMatch?.coverImage ?? null),
      }
    : mockMatch;
  if (!post) notFound();

  const Arrow = validLocale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <Link
        href={withLocale(validLocale, "/blog")}
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
        {post.publishedAt && <span>{formatDate(post.publishedAt, validLocale)}</span>}
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
