import { getBlogPosts, resolveBlogCoverImage, type BlogPost } from "./strapi";
import { getMockBlogPosts } from "./mock-data";
import type { Locale } from "./i18n/types";

function applyCoverFallback(post: BlogPost, mock?: BlogPost): BlogPost {
  const resolved = resolveBlogCoverImage(post.coverImage);
  const mockResolved = mock?.coverImage ?? null;
  return {
    ...post,
    coverImage: resolved?.url ? resolved : mockResolved,
  };
}

function sortByDate(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
  );
}

/** Strapi posts for the locale, merged with mock fallbacks for missing slugs and covers. */
export async function getDisplayBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const strapiPosts = await getBlogPosts(locale);
  const mockPosts = getMockBlogPosts(locale);
  const mockBySlug = new Map(mockPosts.map((p) => [p.slug, p]));

  const strapiSlugs = new Set(strapiPosts.map((p) => p.slug));
  const fromStrapi = strapiPosts.map((post, index) =>
    applyCoverFallback(post, mockBySlug.get(post.slug) ?? mockPosts[index])
  );

  if (fromStrapi.length === 0) return mockPosts;

  const fromMock = mockPosts
    .filter((p) => !strapiSlugs.has(p.slug))
    .map((p) => ({ ...p }));

  return sortByDate([...fromStrapi, ...fromMock]);
}

/** Merge Strapi admin posts with local-only mock entries (not yet in CMS). */
export function mergeAdminBlogPosts(strapiPosts: BlogPost[], locale: Locale): BlogPost[] {
  const mockPosts = getMockBlogPosts(locale);
  const bySlug = new Map(strapiPosts.map((p) => [p.slug, p]));

  for (const mock of mockPosts) {
    if (!bySlug.has(mock.slug)) {
      bySlug.set(mock.slug, { ...mock, documentId: undefined });
    }
  }

  return sortByDate([...bySlug.values()]);
}
