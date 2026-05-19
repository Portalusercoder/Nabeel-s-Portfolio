function Bone({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-accent-muted/80 ${className ?? ""}`} />;
}

/** Placeholder rows matching LiveArticlesPreview layout. */
export function ArticlesPreviewSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2"
      aria-busy="true"
      aria-label="Loading articles"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-2xl p-2">
          <Bone className="h-4 min-h-[3.5rem] flex-1" />
          <Bone className="h-14 w-14 shrink-0" />
        </div>
      ))}
    </div>
  );
}
