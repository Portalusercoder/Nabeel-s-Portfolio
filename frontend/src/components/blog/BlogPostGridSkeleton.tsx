function Bone({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-accent-muted/80 ${className ?? ""}`} />;
}

/** Placeholder grid matching BlogPostGrid card layout. */
export function BlogPostGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading blog posts"
    >
      {Array.from({ length: count }).map((_, i) => (
        <article key={i} className="space-y-4">
          <Bone className="min-h-[220px] w-full rounded-3xl lg:min-h-[260px]" />
          <div className="flex items-start justify-between gap-3">
            <Bone className="h-4 w-16" />
            <Bone className="h-4 w-4 shrink-0" />
            <Bone className="h-4 flex-1" />
          </div>
        </article>
      ))}
    </div>
  );
}
