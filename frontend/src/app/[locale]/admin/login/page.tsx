"use client";

import { useState } from "react";
import { strapiLogin, getConfiguredStrapiUrl, isStrapiMisconfiguredOnLiveSite } from "@/lib/strapi";
import { setToken } from "@/lib/auth";
import { useLocale } from "@/lib/i18n/locale-provider";
import { navigateLocalized } from "@/lib/i18n/routing";

export default function AdminLoginPage() {
  const { locale, dict } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const misconfigured = isStrapiMisconfiguredOnLiveSite();
  const strapiUrl = getConfiguredStrapiUrl();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (misconfigured) return;

    setLoading(true);
    setError("");
    try {
      const { jwt } = await strapiLogin(email, password);
      setToken(jwt);
      navigateLocalized(locale, "/admin");
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      if (code === "UNREACHABLE") setError(dict.admin.loginUnreachable);
      else if (code === "INVALID_CREDENTIALS") setError(dict.admin.loginWrongUser);
      else setError(dict.admin.invalidLogin);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <div className="w-full max-w-sm card-surface p-8">
        <h1 className="text-xl font-semibold">{dict.admin.loginTitle}</h1>
        <p className="mt-2 text-sm text-muted">{dict.admin.loginDesc}</p>
        <p className="mt-2 text-xs text-muted">{dict.admin.loginUserHint}</p>

        {misconfigured && (
          <p className="mt-4 rounded-xl border border-border bg-accent-soft p-3 text-xs text-muted">
            {dict.admin.loginMisconfigured}
          </p>
        )}

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
              disabled={misconfigured}
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
              disabled={misconfigured}
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading || misconfigured}
            className="h-11 w-full rounded-xl bg-white text-sm font-medium text-black disabled:opacity-50"
          >
            {loading ? dict.admin.loggingIn : dict.admin.login}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted">
          {dict.admin.strapiLink}{" "}
          <a
            href={`${strapiUrl}/admin`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline"
          >
            {dict.admin.strapiAdmin}
          </a>
        </p>
      </div>
    </div>
  );
}
