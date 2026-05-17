const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function getStrapiURL(path = "") {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null | undefined) {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return getStrapiURL(url);
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

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers,
      next: { revalidate: 60 },
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

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetchAPI<StrapiResponse<StrapiEntity<BlogPost>[]>>(
      "/blog-posts?populate=coverImage&sort=publishedAt:desc&publicationState=live"
    );
    return (res.data || []).map((item) => {
      const post = normalizeEntity(item);
      if (post.coverImage && typeof post.coverImage === "object" && "data" in post.coverImage) {
        const media = (post.coverImage as { data?: { url?: string; alternativeText?: string } }).data;
        post.coverImage = media?.url
          ? { url: getStrapiMedia(media.url)!, alternativeText: media.alternativeText }
          : null;
      } else if (post.coverImage && "url" in (post.coverImage as object)) {
        const img = post.coverImage as { url: string; alternativeText?: string };
        post.coverImage = { url: getStrapiMedia(img.url)!, alternativeText: img.alternativeText };
      }
      return post;
    });
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetchAPI<StrapiResponse<StrapiEntity<BlogPost>[]>>(
      `/blog-posts?filters[slug][$eq]=${slug}&populate=coverImage&publicationState=live`
    );
    const raw = res.data?.[0];
    if (!raw) return null;
    const post = normalizeEntity(raw);
    if (post.coverImage && typeof post.coverImage === "object" && "url" in post.coverImage) {
      const img = post.coverImage as { url: string };
      post.coverImage = { url: getStrapiMedia(img.url)! };
    }
    return post;
  } catch {
    return null;
  }
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

export async function strapiLogin(identifier: string, password: string) {
  const res = await fetch(getStrapiURL("/api/auth/local"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
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

export async function createBlogPost(
  token: string,
  data: Partial<BlogPost> & { title: string; content: string }
) {
  return fetchAPI("/blog-posts", {
    method: "POST",
    token,
    body: JSON.stringify({ data }),
  });
}

export async function updateBlogPost(
  token: string,
  documentId: string,
  data: Partial<BlogPost>
) {
  return fetchAPI(`/blog-posts/${documentId}`, {
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
