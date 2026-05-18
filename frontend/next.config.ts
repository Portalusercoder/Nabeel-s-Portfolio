import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

/** Fallback when GitHub Actions secret is missing — public URL, safe to commit. */
function strapiUrlFromFile(): string | undefined {
  const file = path.join(__dirname, "strapi.url");
  if (!fs.existsSync(file)) return undefined;
  const line = fs.readFileSync(file, "utf8").trim();
  return line || undefined;
}

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  strapiUrlFromFile()?.replace(/\/$/, "") ||
  "http://localhost:1337";

const strapiHost = (() => {
  try {
    return new URL(strapiUrl).hostname;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: isStaticExport,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // GitHub Pages export + local Strapi (Next image optimizer blocks localhost in dev)
    unoptimized: isStaticExport || process.env.NODE_ENV === "development",
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "1337", pathname: "/uploads/**" },
      ...(strapiHost && strapiHost !== "localhost"
        ? [{ protocol: "https" as const, hostname: strapiHost, pathname: "/uploads/**" }]
        : []),
    ],
  },
};

export default nextConfig;
