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

### GitHub Pages (static frontend)

GitHub Pages only serves static files. It cannot run Next.js servers or Strapi. The repo includes a workflow that builds the site and deploys the `frontend/out` folder.

1. Push to `main`
2. On GitHub: **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**
3. Wait for the **Deploy to GitHub Pages** workflow to finish
4. Open `https://<username>.github.io/<repo-name>/` (e.g. `https://portalusercoder.github.io/Nabeel-s-Portfolio/`)

The site uses mock blog/resources data on Pages unless you host Strapi elsewhere and set `NEXT_PUBLIC_STRAPI_URL` in the workflow env. Contact form opens your email client; newsletter posts to Strapi when it is reachable.

### Free Strapi hosting: Render + Neon

Host Strapi for **$0** (with Render free-tier sleep after ~15 min idle).

#### 1. Neon (PostgreSQL database)

1. Sign up at [neon.tech](https://neon.tech)
2. **New project** → copy the **connection string** (`postgresql://...?sslmode=require`)

#### 2. Render (Strapi server)

1. Sign up at [render.com](https://render.com)
2. **New → Blueprint** → connect this GitHub repo (uses root `render.yaml`), **or** **New → Web Service**:
   - **Root directory:** `backend`
   - **Build:** `npm ci && npm run build`
   - **Start:** `npm run start`
   - **Plan:** Free
3. **Environment variables** (Render dashboard):

| Variable | Value |
|----------|--------|
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_URL` | paste from Neon |
| `DATABASE_SSL` | `true` |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | `false` |
| `PUBLIC_URL` | `https://YOUR-SERVICE.onrender.com` |
| `FRONTEND_URL` | `http://localhost:3000,https://YOUR-USER.github.io/Nabeel-s-Portfolio` |
| `APP_KEYS` | four random strings (`openssl rand -base64 32`) |
| `API_TOKEN_SALT`, `JWT_SECRET`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` | random each |

4. Deploy → open `https://YOUR-SERVICE.onrender.com/admin` and create the admin user (first visit may be slow while the free instance wakes up).

5. In Strapi: **Settings → Users** → create an **Authenticated** user for the portfolio dashboard at `/ar/admin`.

**Note:** Uploads on Render free use local disk and can reset on redeploy. For production media, add S3 or Cloudinary later.

#### 3. Connect GitHub Pages to Strapi

1. GitHub repo → **Settings → Secrets and variables → Actions → Repository secrets** (not only *Environment* secrets)
2. Name **exactly** `NEXT_PUBLIC_STRAPI_URL` = `https://YOUR-SERVICE.onrender.com` (no trailing slash)
3. Push to `main` or **Actions → Deploy to GitHub Pages → Run workflow**

If the workflow fails on “Verify Strapi URL”, the secret name or location is wrong. The live site bakes this URL at build time — adding the secret without re-running the workflow leaves `localhost` in the bundle.

Blog pages are still **pre-built** on each deploy; new Strapi posts appear after the workflow runs again. The **portfolio admin** (`/ar/admin`) loads live data in the browser.

### Other hosting

- **Frontend (live blog without rebuild):** Vercel — `npm run build` without `NEXT_PUBLIC_STATIC_EXPORT`

## Customize branding

Edit `frontend/src/lib/i18n/dictionaries.ts` for Arabic and English copy.
