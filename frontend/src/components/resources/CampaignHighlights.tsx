"use client";

import { useLocale } from "@/lib/i18n/locale-provider";

export function CampaignHighlights() {
  const { dict } = useLocale();

  return (
    <div>
      <h2 className="mb-6 text-lg font-medium">{dict.resources.badgeLabel}</h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {dict.resources.highlights.map((item) => (
          <li key={item} className="card-surface p-5">
            <p className="text-sm leading-relaxed text-foreground">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
