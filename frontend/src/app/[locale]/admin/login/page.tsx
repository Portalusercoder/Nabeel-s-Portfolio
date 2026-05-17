"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { strapiLogin } from "@/lib/strapi";
import { setToken } from "@/lib/auth";
import { useLocale } from "@/lib/i18n/locale-provider";
import { withLocale } from "@/lib/i18n/routing";

export default function AdminLoginPage() {
  const router = useRouter();
  const { locale, dict } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { jwt } = await strapiLogin(email, password);
      setToken(jwt);
      router.push(withLocale(locale, "/admin"));
    } catch {
      setError(dict.admin.invalidLogin);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <div className="w-full max-w-sm card-surface p-8">
        <h1 className="text-xl font-semibold">{dict.admin.loginTitle}</h1>
        <p className="mt-2 text-sm text-muted">{dict.admin.loginDesc}</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs text-muted">{dict.admin.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              dir="ltr"
              required
            />
          </div>
          <div>
            <label className="text-xs text-muted">{dict.admin.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              dir="ltr"
              required
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-white text-sm font-medium text-black"
          >
            {loading ? dict.admin.loggingIn : dict.admin.login}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted">
          {dict.admin.strapiLink}{" "}
          <a
            href={process.env.NEXT_PUBLIC_STRAPI_URL + "/admin"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pill-text underline"
          >
            {dict.admin.strapiAdmin}
          </a>
        </p>
      </div>
    </div>
  );
}
