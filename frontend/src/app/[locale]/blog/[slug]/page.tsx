import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/strapi";
import { getAllPublishedBlogPaths } from "@/lib/strapi";
import { getDisplayBlogPosts } from "@/lib/blog-posts";
import { getMockBlogPosts } from "@/lib/mock-data";
import { getTranslations } from "@/lib/i18n/server";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { LiveBlogPost } from "@/components/blog/LiveBlogPost";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const fromStrapi = await getAllPublishedBlogPaths();
  const fromMock = LOCALES.flatMap((locale) =>
    getMockBlogPosts(locale).map((p) => ({ locale, slug: p.slug }))
  );
  const seen = new Set<string>();
  const paths: { locale: string; slug: string }[] = [];

  for (const entry of [...fromMock, ...fromStrapi]) {
    const key = `${entry.locale}:${entry.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    paths.push(entry);
  }

  return paths;
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
  const { locale } = await getTranslations(raw);
  const validLocale = locale as Locale;
  const posts = await getDisplayBlogPosts(validLocale);
  const strapiPost = await getBlogPost(slug, validLocale);
  const mockMatch = posts.find((p) => p.slug === slug);
  const initialPost = strapiPost
    ? {
        ...strapiPost,
        coverImage: strapiPost.coverImage?.url ? strapiPost.coverImage : (mockMatch?.coverImage ?? null),
      }
    : mockMatch;

  if (!initialPost) notFound();

  return <LiveBlogPost slug={slug} locale={validLocale} initialPost={initialPost} />;
}
