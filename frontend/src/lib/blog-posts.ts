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

/** Published Strapi posts for the locale; mock data only when Strapi is empty/unreachable. */
export async function getDisplayBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const strapiPosts = await getBlogPosts(locale);
  if (strapiPosts.length > 0) {
    const mockPosts = getMockBlogPosts(locale);
    const mockBySlug = new Map(mockPosts.map((p) => [p.slug, p]));
    return sortByDate(
      strapiPosts.map((post, index) =>
        applyCoverFallback(post, mockBySlug.get(post.slug) ?? mockPosts[index])
      )
    );
  }
  return getMockBlogPosts(locale);
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
