/** Prefix static public paths with NEXT_PUBLIC_BASE_PATH (GitHub Pages subpath). */
export function publicAsset(path: string): string {
  if (!path) return path;
  if (path.startsWith("http") || path.startsWith("//")) return path;

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (!base || normalized.startsWith(`${base}/`)) return normalized;
  return `${base}${normalized}`;
}
