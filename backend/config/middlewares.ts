/** Browser Origin only (scheme + host + port). Paths in FRONTEND_URL are stripped. */
function normalizeOrigin(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return url.origin;
  } catch {
    return null;
  }
}

function corsOrigins() {
  const fromEnv = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((s) => normalizeOrigin(s))
    .filter((s): s is string => Boolean(s));

  const defaults = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://portalusercoder.github.io",
  ];

  return [...new Set([...defaults, ...fromEnv])];
}

export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: (ctx: { request: { header: { origin?: string } } }) => {
        const requestOrigin = ctx.request.header.origin;
        const allowed = corsOrigins();

        if (!requestOrigin) return allowed[0];

        if (allowed.includes(requestOrigin)) return requestOrigin;

        try {
          const { hostname } = new URL(requestOrigin);
          if (hostname === "github.io" || hostname.endsWith(".github.io")) {
            return requestOrigin;
          }
        } catch {
          /* ignore */
        }

        return "";
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
