import { getDisplayBlogPosts } from "@/lib/blog-posts";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/types";
import { LiveArticlesPreview } from "@/components/home/LiveArticlesPreview";

export async function ArticlesPreviewSection({ locale: raw }: { locale: string }) {
  const locale: Locale = isValidLocale(raw) ? raw : "ar";
  const dict = getDictionary(locale);
  const initial = (await getDisplayBlogPosts(locale)).slice(0, 8);

  return <LiveArticlesPreview locale={locale} dict={dict} initialPosts={initial} />;
}
