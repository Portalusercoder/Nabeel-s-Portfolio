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
} from "lucide-react";
import {
  getAdminStats,
  getBlogPosts,
  getSubscribers,
  deleteBlogPost,
  type BlogPost,
  type NewsletterSubscriber,
} from "@/lib/strapi";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";
import { getToken, clearToken } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { BlogPostModal } from "@/components/admin/BlogPostModal";
import { formatDate } from "@/lib/utils";

export function AdminDashboard() {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(null);
  const [stats, setStats] = useState({ postCount: 0, subscriberCount: 0 });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [tab, setTab] = useState<"posts" | "subscribers">("posts");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.replace("/admin/login");
      return;
    }
    setTokenState(t);
    loadData(t);
  }, [router]);

  async function loadData(jwt: string) {
    setLoading(true);
    try {
      const [s, p, subs] = await Promise.all([
        getAdminStats(jwt),
        getBlogPosts(),
        getSubscribers(jwt),
      ]);
      setStats(s);
      setPosts(p.length > 0 ? p : MOCK_BLOG_POSTS);
      setSubscribers(subs);
    } catch {
      setPosts(MOCK_BLOG_POSTS);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearToken();
    router.replace("/admin/login");
  }

  async function handleDelete(post: BlogPost) {
    if (!token || !post.documentId) return;
    if (!confirm("Delete this post?")) return;
    try {
      await deleteBlogPost(token, post.documentId);
      await loadData(token);
    } catch {
      alert("Delete failed. Ensure Strapi is running and you have permissions.");
    }
  }

  if (!token) return null;

  return (
    <div className="min-h-screen bg-accent-soft">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gold">Admin</p>
            <h1 className="font-serif text-xl">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
            >
              Strapi CMS
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:bg-accent-soft"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={FileText} label="Blog posts" value={stats.postCount || posts.length} />
          <StatCard icon={Mail} label="Newsletter signups" value={stats.subscriberCount} />
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted">Strapi backend</p>
            <p className="mt-2 text-sm font-medium">Manage media &amp; advanced content in Strapi Admin</p>
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
              {t}
            </button>
          ))}
        </div>

        {tab === "posts" && (
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Blog posts</h2>
              <Button
                size="sm"
                onClick={() => {
                  setEditingPost(null);
                  setModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                New post
              </Button>
            </div>
            {loading ? (
              <p className="mt-8 text-muted">Loading...</p>
            ) : (
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-accent-soft">
                    <tr>
                      <th className="px-6 py-4 font-medium">Title</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b border-border last:border-0">
                        <td className="px-6 py-4">{post.title}</td>
                        <td className="px-6 py-4 text-muted">{post.category}</td>
                        <td className="px-6 py-4 text-muted">
                          {post.publishedAt ? formatDate(post.publishedAt) : "—"}
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
                              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
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
            <h2 className="text-lg font-medium">Newsletter signups</h2>
            {subscribers.length === 0 ? (
              <p className="mt-6 rounded-2xl border border-border bg-card p-8 text-muted">
                No signups yet. Subscribers appear here when Strapi is connected.
              </p>
            ) : (
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-accent-soft">
                    <tr>
                      <th className="px-6 py-4 font-medium">Email</th>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Source</th>
                      <th className="px-6 py-4 font-medium">Subscribed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-border last:border-0">
                        <td className="px-6 py-4">{sub.email}</td>
                        <td className="px-6 py-4 text-muted">{sub.name || "—"}</td>
                        <td className="px-6 py-4 text-muted capitalize">{sub.source}</td>
                        <td className="px-6 py-4 text-muted">
                          {sub.subscribedAt ? formatDate(sub.subscribedAt) : "—"}
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
