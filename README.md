# Nabeel's Portfolio — Business Website + Strapi CMS

Premium dark RTL website inspired by modern Arabic agency/portfolio design, with Strapi for blog, resources, and newsletter management.

## Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS v4
- **CMS:** Strapi 5 (SQLite for local dev)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | 6 sections: Hero, Works, Stats, Products, Articles, Services CTA + Newsletter |
| Blog | `/blog` | Article grid (Strapi + fallback mock data) |
| Article | `/blog/[slug]` | Single post |
| Resources | `/resources` | Downloads, newsletter, contact |
| Admin | `/admin` | Dashboard: posts CRUD, newsletter signups |
| Strapi Admin | `http://localhost:1337/admin` | Full CMS UI |

## Quick start

### 1. Backend (Strapi)

```bash
cd backend
cp .env.example .env
# Generate secrets: openssl rand -base64 32 (use for APP_KEYS, JWT secrets, etc.)
npm install
npm run develop
```

On first run, create an admin user at http://localhost:1337/admin, then create an **Authenticated** user for the Next.js dashboard (Settings → Users).

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

### Environment

**frontend/.env.local**

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=نبيل
```

**backend/.env** — copy from `.env.example` and set `APP_KEYS`, `JWT_SECRET`, `ADMIN_JWT_SECRET`, etc.

## Strapi content types

- **Blog Post** — title, slug, excerpt, content, cover, category, read time
- **Newsletter Subscriber** — email, name, source, subscribedAt
- **Resource** — title, description, category, file, featured

Public permissions are bootstrapped on startup for read (posts/resources) and create (newsletter).

## Deployment

- **Frontend:** Vercel — set env vars, build `frontend`
- **Strapi:** Railway, Render, or DigitalOcean — use PostgreSQL in production instead of SQLite

## Customize branding

Edit `frontend/src/lib/constants.ts` for Arabic copy, nav labels, and hero cards.
