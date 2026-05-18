import fs from "node:fs";
import path from "node:path";
import type { Core } from "@strapi/strapi";

type SeedEntry = {
  language: "ar" | "en";
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  author?: string;
  category?: string;
  readTime?: number;
  publishedAt?: string;
  coverIndex?: number;
};

const COVER_FILES = [
  "cover-1.png",
  "cover-2.png",
  "cover-3.png",
  "cover-4.png",
  "cover-5.png",
] as const;

const UID = "api::blog-post.blog-post";

function detectLanguage(title: string): "ar" | "en" {
  return /[\u0600-\u06FF]/.test(title) ? "ar" : "en";
}

/** Backfill `language` on posts created before the field existed (or when `locale` conflicted). */
export async function migrateBlogPostLanguages(strapi: Core.Strapi) {
  const posts = await strapi.documents(UID).findMany({
    status: "draft",
    limit: 200,
  });

  let updated = 0;
  for (const post of posts) {
    if (post.language) continue;
    const language = detectLanguage(String(post.title || ""));
    await strapi.documents(UID).update({
      documentId: post.documentId,
      data: { language },
      status: post.publishedAt ? "published" : "draft",
    });
    updated += 1;
  }
  return updated;
}

function coverPath(index: number): string | null {
  const file = COVER_FILES[index];
  if (!file) return null;
  const candidates = [
    path.join(process.cwd(), "..", "frontend", "public", "images", "blog", file),
    path.join(process.cwd(), "frontend", "public", "images", "blog", file),
  ];
  return candidates.find((p) => fs.existsSync(p)) ?? null;
}

async function uploadCover(strapi: Core.Strapi, index: number) {
  const filepath = coverPath(index);
  if (!filepath) return null;

  const stat = fs.statSync(filepath);
  const uploadService = strapi.plugin("upload").service("upload");
  const [uploaded] = await uploadService.upload({
    files: {
      filepath,
      originalFilename: path.basename(filepath),
      mimetype: "image/png",
      size: stat.size,
    },
    data: {
      fileInfo: {
        name: path.basename(filepath),
        alternativeText: `Blog cover ${index + 1}`,
      },
    },
  });
  return uploaded?.id ?? null;
}

async function findPost(strapi: Core.Strapi, slug: string, language: "ar" | "en") {
  const existing = await strapi.documents(UID).findMany({
    filters: { slug, language },
    status: "draft",
    limit: 1,
  });
  return existing[0] ?? null;
}

export async function seedBlogPosts(strapi: Core.Strapi) {
  const seedPath = path.join(process.cwd(), "data", "blog-seed.json");
  if (!fs.existsSync(seedPath)) {
    strapi.log.warn(`Blog seed file not found: ${seedPath}`);
    return { created: 0, skipped: 0 };
  }

  const entries = JSON.parse(fs.readFileSync(seedPath, "utf8")) as SeedEntry[];
  const coverCache = new Map<number, number | null>();
  let created = 0;
  let skipped = 0;

  for (const entry of entries) {
    const existing = await findPost(strapi, entry.slug, entry.language);
    if (existing) {
      skipped += 1;
      continue;
    }

    let coverImageId: number | null = null;
    if (typeof entry.coverIndex === "number") {
      if (!coverCache.has(entry.coverIndex)) {
        try {
          coverCache.set(entry.coverIndex, await uploadCover(strapi, entry.coverIndex));
        } catch (err) {
          strapi.log.warn(`Cover upload failed for index ${entry.coverIndex}: ${err}`);
          coverCache.set(entry.coverIndex, null);
        }
      }
      coverImageId = coverCache.get(entry.coverIndex) ?? null;
    }

    const { coverIndex: _coverIndex, publishedAt, ...data } = entry;

    await strapi.documents(UID).create({
      data: {
        ...data,
        ...(coverImageId ? { coverImage: coverImageId } : {}),
        ...(publishedAt ? { publishedAt: new Date(publishedAt) } : {}),
      },
      status: "published",
    });

    created += 1;
  }

  return { created, skipped };
}
