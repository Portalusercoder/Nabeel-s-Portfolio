"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Video, Users } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-provider";

const icons = [BookOpen, Video, Users];

export function ProductsSection() {
  const { dict, isRtl } = useLocale();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/resources" className="mb-8 inline-flex items-center gap-2 text-lg font-medium">
          {dict.products.title}
          <Arrow className="h-4 w-4 text-muted" />
        </Link>
        <div className="grid gap-4 sm:grid-cols-3">
          {dict.products.items.map((product, i) => {
            const Icon = icons[i] ?? BookOpen;
            return (
              <Link
                key={product.title}
                href="/resources"
                className="card-surface group flex flex-col p-5 transition hover:bg-card-hover"
              >
                <Icon className="h-5 w-5 text-muted" strokeWidth={1.5} />
                <div className="mt-16 flex items-end justify-between gap-2">
                  <p className="text-sm font-medium leading-snug">{product.title}</p>
                  <span className="shrink-0 text-sm font-semibold">{product.price}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
