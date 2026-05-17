import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-medium uppercase tracking-wider text-gold">
          {post.category || "Insights"}
        </span>
        {post.readTime && (
          <span className="flex items-center gap-1 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime} min read
          </span>
        )}
      </div>
      <h2 className="mt-4 font-serif text-2xl tracking-tight transition group-hover:text-gold">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.excerpt && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      )}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
        <div className="text-xs text-muted">
          {post.author && <span>{post.author}</span>}
          {post.publishedAt && (
            <span className="before:mx-2 before:content-['·']">{formatDate(post.publishedAt)}</span>
          )}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium transition group-hover:gap-2"
        >
          Read
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
