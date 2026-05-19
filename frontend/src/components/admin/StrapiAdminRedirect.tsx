"use client";

import { useEffect } from "react";
import { getConfiguredStrapiUrl } from "@/lib/strapi";
import { useLocale } from "@/lib/i18n/locale-provider";

/** Send editors to Strapi admin (no separate portfolio dashboard). */
export function StrapiAdminRedirect() {
  const { dict } = useLocale();
  const strapiAdmin = `${getConfiguredStrapiUrl()}/admin`;

  useEffect(() => {
    window.location.replace(strapiAdmin);
  }, [strapiAdmin]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="text-sm text-muted">{dict.admin.openingStrapi}</p>
      <a
        href={strapiAdmin}
        className="text-sm text-foreground underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {dict.admin.strapiAdmin}
      </a>
    </div>
  );
}
