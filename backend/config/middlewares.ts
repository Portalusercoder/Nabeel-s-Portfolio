function corsOrigins() {
  const fromEnv = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    ...fromEnv,
  ];
}

export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: corsOrigins(),
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
