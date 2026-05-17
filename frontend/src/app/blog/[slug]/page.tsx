import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/strapi";
import { getMockBlogPosts } from "@/lib/mock-data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const ar = posts.length > 0 ? posts : getMockBlogPosts("ar");
  const en = getMockBlogPosts("en");
  const slugs = new Set([...ar, ...en].map((p) => p.slug));
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const mock = getMockBlogPosts(locale);
  const post = (await getBlogPost(slug)) || mock.find((p) => p.slug === slug);
  const dict = getDictionary(locale);
  if (!post) return { title: dict.blog.notFound };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const mock = getMockBlogPosts(locale);
  const post = (await getBlogPost(slug)) || mock.find((p) => p.slug === slug);
  if (!post) notFound();

  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
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
