"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "@/app/globals.css";
import { parseBlogPostPath } from "@/lib/i18n/routing";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LiveBlogPost } from "@/components/blog/LiveBlogPost";
import { publicAsset } from "@/lib/assets";
import type { Locale } from "@/lib/i18n/types";

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * GitHub Pages serves 404.html for URLs with no pre-built HTML (new Strapi slugs).
 * Detect /{locale}/blog/{slug} and load the post from Strapi in the browser.
 */
export function BlogPostCatchAll() {
  const [target, setTarget] = useState<{ locale: Locale; slug: string } | null | "pending">(
    "pending"
  );

  useEffect(() => {
    setTarget(parseBlogPostPath(window.location.pathname));
  }, []);

  if (target === "pending") {
    return (
      <div className={`${arabic.variable} flex min-h-screen items-center justify-center bg-background`}>
        <div className="h-8 w-8 animate-pulse rounded-full bg-accent-muted" />
      </div>
    );
  }

  if (!target) {
    const locale: Locale = "en";
    return (
      <div className={`${arabic.variable} min-h-screen bg-background text-foreground`}>
        <div className="mx-auto max-w-md px-5 py-24 text-center">
          <h1 className="text-2xl font-semibold">404</h1>
          <p className="mt-4 text-muted">Page not found</p>
          <Link href={publicAsset(`/${locale}`)} className="mt-8 inline-block text-sm underline">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const { locale, slug } = target;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${arabic.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <LocaleProvider locale={locale}>
          <Header />
          <main className="flex-1">
            <LiveBlogPost slug={slug} locale={locale} />
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
