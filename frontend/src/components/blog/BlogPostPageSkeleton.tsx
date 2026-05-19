function Bone({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-accent-muted/80 ${className ?? ""}`} />;
}

export function BlogPostPageSkeleton() {
  return (
    <article
      className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24"
      aria-busy="true"
      aria-label="Loading article"
    >
      <Bone className="h-4 w-28" />
      <div className="mt-8 flex gap-4">
        <Bone className="h-6 w-20 rounded-full" />
        <Bone className="h-6 w-24" />
      </div>
      <Bone className="mt-6 h-10 w-full max-w-xl" />
      <Bone className="mt-3 h-10 w-2/3 max-w-md" />
      <Bone className="mt-4 h-4 w-40" />
      <div className="mt-12 space-y-3">
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-11/12" />
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-10/12" />
      </div>
    </article>
  );
}
