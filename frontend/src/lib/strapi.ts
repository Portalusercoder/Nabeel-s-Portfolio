import { publicAsset } from "./assets";
import { STRAPI_PUBLIC_URL } from "./strapi-public-url";

export function getConfiguredStrapiUrl() {
  return STRAPI_PUBLIC_URL.replace(/\/$/, "");
}

export function getStrapiURL(path = "") {
  return `${getConfiguredStrapiUrl()}${path}`;
}

export function isStrapiMisconfiguredOnLiveSite() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  const onGithubPages = host === "github.io" || host.endsWith(".github.io");
  if (!onGithubPages) return false;
  const strapi = getConfiguredStrapiUrl();
  return strapi.includes("localhost") || strapi.includes("127.0.0.1");
}

export function getStrapiMedia(url: string | null | undefined) {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  if (url.startsWith("/uploads/")) return getStrapiURL(url);
  return publicAsset(url);
}

type StrapiResponse<T> = {
  data: T;
  meta?: { pagination?: Record<string, number> };
};

type StrapiEntity<T> = {
  id: number;
  documentId?: string;
  attributes?: T;
} & T;

function normalizeEntity<T extends Record<string, unknown>>(
  item: StrapiEntity<T>
): T & { id: number; documentId?: string } {
  if (item.attributes) {
    return { id: item.id, documentId: item.documentId, ...item.attributes };
  }
  const { id, documentId, ...rest } = item;
  return { id, documentId, ...rest } as T & { id: number; documentId?: string };
}

type CoverInput =
  | BlogPost["coverImage"]
  | { data?: { url?: string; alternativeText?: string } | null }
  | { url?: string; alternativeText?: string }
  | null
  | undefined;

/** Normalize Strapi media (relative /uploads/… or nested data) to an absolute URL. */
export function resolveBlogCoverImage(
  coverImage: CoverInput
): BlogPost["coverImage"] {
  if (!coverImage || typeof coverImage !== "object") return null;

  let rawUrl: string | undefined;
  let alternativeText: string | undefined;

  if ("data" in coverImage) {
    const data = coverImage.data;
    if (data && typeof data === "object" && "url" in data && typeof data.url === "string") {
      rawUrl = data.url;
      alternativeText = data.alternativeText;
    }
  } else if ("url" in coverImage && typeof coverImage.url === "string") {
    rawUrl = coverImage.url;
    alternativeText =
      "alternativeText" in coverImage ? coverImage.alternativeText : undefined;
  }

  if (!rawUrl) return null;

  return {
    url: getStrapiMedia(rawUrl)!,
    alternativeText,
  };
}

function normalizeCoverImage(post: BlogPost): BlogPost {
  post.coverImage = resolveBlogCoverImage(post.coverImage);
  return post;
}

function languageFilter(language: string) {
  return `filters[language][$eq]=${language}`;
}

export async function fetchAPI<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const url = getStrapiURL(`/api${path}`);

  const isServer = typeof window === "undefined";
  const useStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers,
      ...(isServer && !useStaticExport ? { next: { revalidate: 60 } } : { cache: "no-store" }),
    });

    if (!res.ok) {
      throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch {
    throw new Error("STRAPI_UNAVAILABLE");
  }
}

export type BlogPost = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  language?: "ar" | "en";
  excerpt?: string;
  content: string;
  author?: string;
  category?: string;
  readTime?: number;
  publishedAt?: string;
  createdAt?: string;
  coverImage?: {
    url: string;
    alternativeText?: string;
  } | null;
};

export type Resource = {
  id: number;
  documentId?: string;
  title: string;
  description?: string;
  category?: string;
  featured?: boolean;
  downloadCount?: number;
  file?: { url: string; name?: string } | null;
};

export type NewsletterSubscriber = {
  id: number;
  email: string;
  name?: string;
  source?: string;
  subscribedAt?: string;
};

export async function isStrapiAvailable(): Promise<boolean> {
  try {
    const res = await fetch(getStrapiURL("/api/blog-posts?pagination[pageSize]=1"), {
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const res = await fetchAPI<StrapiResponse<StrapiEntity<BlogPost>[]>>(
      `/blog-posts?${languageFilter(locale)}&populate=coverImage&sort=publishedAt:desc&publicationState=live`
    );
    return (res.data || []).map((item) => normalizeCoverImage(normalizeEntity(item)));
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    const res = await fetchAPI<StrapiResponse<StrapiEntity<BlogPost>[]>>(
      `/blog-posts?filters[slug][$eq]=${slug}&${languageFilter(locale)}&populate=coverImage&publicationState=live`
    );
    const raw = res.data?.[0];
    if (!raw) return null;
    return normalizeCoverImage(normalizeEntity(raw));
  } catch {
    return null;
  }
}

export async function getAdminBlogPosts(
  token: string,
  locale: string
): Promise<BlogPost[]> {
  const res = await fetchAPI<StrapiResponse<StrapiEntity<BlogPost>[]>>(
    `/blog-posts?${languageFilter(locale)}&populate=coverImage&sort=publishedAt:desc&pagination[pageSize]=100&publicationState=preview`,
    { token }
  );
  return (res.data || []).map((item) => normalizeCoverImage(normalizeEntity(item)));
}

export async function getResources(): Promise<Resource[]> {
  try {
    const res = await fetchAPI<StrapiResponse<StrapiEntity<Resource>[]>>(
      "/resources?populate=file&sort=createdAt:desc&publicationState=live"
    );
    return (res.data || []).map((item) => {
      const resource = normalizeEntity(item);
      if (resource.file && typeof resource.file === "object" && "url" in resource.file) {
        const f = resource.file as { url: string; name?: string };
        resource.file = { url: getStrapiMedia(f.url)!, name: f.name };
      }
      return resource;
    });
  } catch {
    return [];
  }
}

export async function subscribeNewsletter(data: {
  email: string;
  name?: string;
  source?: string;
}) {
  return fetchAPI("/newsletter-subscribers", {
    method: "POST",
    body: JSON.stringify({ data }),
  });
}

export type StrapiLoginError = "INVALID_CREDENTIALS" | "UNREACHABLE" | "AUTH_FAILED";

export async function strapiLogin(identifier: string, password: string) {
  let res: Response;
  try {
    res = await fetch(getStrapiURL("/api/auth/local"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
  } catch {
    throw new Error("UNREACHABLE" satisfies StrapiLoginError);
  }

  if (!res.ok) {
    if (res.status === 400 || res.status === 401 || res.status === 403) {
      throw new Error("INVALID_CREDENTIALS" satisfies StrapiLoginError);
    }
    throw new Error("AUTH_FAILED" satisfies StrapiLoginError);
  }

  return res.json() as Promise<{ jwt: string; user: { id: number; email: string } }>;
}

export async function getAdminStats(token: string) {
  const [posts, subscribers] = await Promise.all([
    fetchAPI<StrapiResponse<unknown[]>>("/blog-posts?pagination[pageSize]=1", { token }),
    fetchAPI<StrapiResponse<unknown[]>>("/newsletter-subscribers?pagination[pageSize]=1", {
      token,
    }),
  ]);
  return {
    postCount: posts.meta?.pagination?.total ?? 0,
    subscriberCount: subscribers.meta?.pagination?.total ?? 0,
  };
}

export async function getSubscribers(token: string): Promise<NewsletterSubscriber[]> {
  const res = await fetchAPI<StrapiResponse<StrapiEntity<NewsletterSubscriber>[]>>(
    "/newsletter-subscribers?sort=subscribedAt:desc&pagination[pageSize]=100",
    { token }
  );
  return (res.data || []).map(normalizeEntity);
}

export async function syncBlogPostsFromSite(token: string) {
  return fetchAPI<{ data: { created: number; skipped: number; message: string } }>(
    "/blog-posts/sync-from-site",
    { method: "POST", token }
  );
}

export async function createBlogPost(
  token: string,
  data: Partial<BlogPost> & { title: string; content: string; language: "ar" | "en" }
) {
  const res = await fetchAPI<StrapiResponse<StrapiEntity<BlogPost>>>(
    "/blog-posts?status=published",
    {
      method: "POST",
      token,
      body: JSON.stringify({ data }),
    }
  );
  return res;
}

export async function updateBlogPost(
  token: string,
  documentId: string,
  data: Partial<BlogPost>
) {
  return fetchAPI(`/blog-posts/${documentId}?status=published`, {
    method: "PUT",
    token,
    body: JSON.stringify({ data }),
  });
}

export async function deleteBlogPost(token: string, documentId: string) {
  return fetchAPI(`/blog-posts/${documentId}`, {
    method: "DELETE",
    token,
  });
}
