"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  LogOut,
  Mail,
  Plus,
  Trash2,
  Pencil,
  ExternalLink,
  RefreshCw,
  CloudOff,
  Cloud,
} from "lucide-react";
import {
  getAdminStats,
  getAdminBlogPosts,
  getSubscribers,
  deleteBlogPost,
  syncBlogPostsFromSite,
  isStrapiAvailable,
  type BlogPost,
  type NewsletterSubscriber,
} from "@/lib/strapi";
import { mergeAdminBlogPosts } from "@/lib/blog-posts";
import { getToken, clearToken } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { BlogPostModal } from "@/components/admin/BlogPostModal";
import { formatDate } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";
import { withLocale } from "@/lib/i18n/routing";

export function AdminDashboard() {
  const router = useRouter();
  const { locale, dict } = useLocale();
  const [token, setTokenState] = useState<string | null>(null);
  const [stats, setStats] = useState({ postCount: 0, subscriberCount: 0 });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [tab, setTab] = useState<"posts" | "subscribers">("posts");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [strapiOnline, setStrapiOnline] = useState<boolean | null>(null);
  const [strapiPostCount, setStrapiPostCount] = useState(0);

  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.replace(withLocale(locale, "/admin/login"));
      return;
    }
    setTokenState(t);
    loadData(t);
  }, [router, locale]);

  async function loadData(jwt: string) {
    setLoading(true);
    try {
      const online = await isStrapiAvailable();
      setStrapiOnline(online);

      const [s, p, subs] = await Promise.all([
        getAdminStats(jwt),
        online ? getAdminBlogPosts(jwt, locale) : Promise.resolve([]),
        getSubscribers(jwt),
      ]);
      setStats(s);
      setStrapiPostCount(p.length);
      setPosts(mergeAdminBlogPosts(p, locale));
      setSubscribers(subs);
    } catch {
      setStrapiOnline(false);
      setPosts(mergeAdminBlogPosts([], locale));
    } finally {
      setLoading(false);
    }
  }

  async function handleSync() {
    if (!token) return;
    setSyncing(true);
    try {
      await syncBlogPostsFromSite(token);
      await loadData(token);
    } catch {
      alert(dict.admin.syncFailed);
    } finally {
      setSyncing(false);
    }
  }

  function handleLogout() {
    clearToken();
    router.replace(withLocale(locale, "/admin/login"));
  }

  async function handleDelete(post: BlogPost) {
    if (!token || !post.documentId) return;
    if (!confirm(dict.admin.deleteConfirm)) return;
    try {
      await deleteBlogPost(token, post.documentId);
      await loadData(token);
    } catch {
      alert(dict.admin.deleteFailed);
    }
  }

  if (!token) return null;

  const localOnlyCount = posts.filter((p) => !p.documentId).length;

  return (
    <div className="min-h-screen bg-accent-soft">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gold">{dict.admin.title}</p>
            <h1 className="font-serif text-xl">{dict.admin.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
            >
              {dict.admin.strapiAdmin}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:bg-accent-soft"
            >
              <LogOut className="h-4 w-4" />
              {dict.admin.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {strapiOnline === false && (
          <p className="mb-6 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted">
            <CloudOff className="h-4 w-4 shrink-0" />
            {dict.admin.strapiOffline}
          </p>
        )}

        {strapiOnline && localOnlyCount > 0 && (
          <p className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm">
            <span className="text-muted">{dict.admin.localOnlyHint.replace("{count}", String(localOnlyCount))}</span>
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent-soft disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? dict.admin.syncing : dict.admin.syncFromSite}
            </button>
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={FileText} label={dict.admin.blogPostsStat} value={stats.postCount || strapiPostCount} />
          <StatCard icon={Mail} label={dict.admin.newsletterStat} value={stats.subscriberCount} />
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="flex items-center gap-2 text-sm text-muted">
              {strapiOnline ? <Cloud className="h-4 w-4 text-[var(--online)]" /> : <CloudOff className="h-4 w-4" />}
              {dict.admin.strapiBackend}
            </p>
            <p className="mt-2 text-sm font-medium">
              {strapiOnline ? dict.admin.strapiConnected : dict.admin.strapiOfflineShort}
            </p>
            {strapiOnline && (
              <button
                type="button"
                onClick={handleSync}
                disabled={syncing}
                className="mt-4 inline-flex items-center gap-2 text-sm text-gold hover:underline disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? dict.admin.syncing : dict.admin.syncFromSite}
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 flex gap-2 border-b border-border">
          {(["posts", "subscribers"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`border-b-2 px-4 py-3 text-sm font-medium capitalize transition ${
                tab === t
                  ? "border-gold text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t === "posts" ? dict.admin.posts : dict.admin.subscribers}
            </button>
          ))}
        </div>

        {tab === "posts" && (
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">
                {dict.admin.posts}
                <span className="ms-2 text-sm font-normal text-muted">({locale.toUpperCase()})</span>
              </h2>
              <Button
                size="sm"
                onClick={() => {
                  setEditingPost(null);
                  setModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                {dict.admin.newPost}
              </Button>
            </div>
            {loading ? (
              <p className="mt-8 text-muted">{dict.admin.loading}</p>
            ) : (
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-accent-soft">
                    <tr>
                      <th className="px-6 py-4 font-medium">{dict.admin.titleLabel}</th>
                      <th className="px-6 py-4 font-medium">{dict.admin.category}</th>
                      <th className="px-6 py-4 font-medium">{dict.admin.statusCol}</th>
                      <th className="px-6 py-4 font-medium">{dict.admin.date}</th>
                      <th className="px-6 py-4 font-medium">{dict.admin.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={`${post.slug}-${post.id}`} className="border-b border-border last:border-0">
                        <td className="px-6 py-4">{post.title}</td>
                        <td className="px-6 py-4 text-muted">{post.category}</td>
                        <td className="px-6 py-4">
                          {post.documentId ? (
                            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-muted">
                              {dict.admin.inStrapi}
                            </span>
                          ) : (
                            <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-xs text-muted">
                              {dict.admin.localOnly}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-muted">
                          {post.publishedAt ? formatDate(post.publishedAt, locale) : "—"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingPost(post);
                                setModalOpen(true);
                              }}
                              className="rounded-lg p-2 hover:bg-accent-soft"
                              aria-label="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(post)}
                              disabled={!post.documentId}
                              className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {tab === "subscribers" && (
          <section className="mt-8">
            <h2 className="text-lg font-medium">{dict.admin.subscribers}</h2>
            {subscribers.length === 0 ? (
              <p className="mt-6 rounded-2xl border border-border bg-card p-8 text-muted">
                {dict.admin.noSubscribers}
              </p>
            ) : (
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-accent-soft">
                    <tr>
                      <th className="px-6 py-4 font-medium">{dict.admin.emailCol}</th>
                      <th className="px-6 py-4 font-medium">{dict.admin.nameCol}</th>
                      <th className="px-6 py-4 font-medium">{dict.admin.sourceCol}</th>
                      <th className="px-6 py-4 font-medium">{dict.admin.subscribedCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-border last:border-0">
                        <td className="px-6 py-4">{sub.email}</td>
                        <td className="px-6 py-4 text-muted">{sub.name || "—"}</td>
                        <td className="px-6 py-4 text-muted capitalize">{sub.source}</td>
                        <td className="px-6 py-4 text-muted">
                          {sub.subscribedAt ? formatDate(sub.subscribedAt, locale) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>

      {token && (
        <BlogPostModal
          open={modalOpen}
          token={token}
          locale={locale}
          post={editingPost}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            setModalOpen(false);
            loadData(token);
          }}
        />
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Icon className="h-5 w-5 text-gold" />
      <p className="mt-4 text-3xl font-serif tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
