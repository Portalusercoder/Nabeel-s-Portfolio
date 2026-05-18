import type { NextConfig } from "next";
import path from "path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

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
    ],
  },
};

export default nextConfig;
