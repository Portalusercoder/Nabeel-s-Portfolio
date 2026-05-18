"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, MoreHorizontal } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { LocaleLink } from "@/components/layout/LocaleLink";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/locale-provider";
import { getLocaleFromPathname } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

function isNavActive(pathname: string, href: string) {
  const path = pathname.replace(new RegExp(`^/${getLocaleFromPathname(pathname)}`), "") || "/";
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { dict } = useLocale();
  const isAdmin = /\/admin(\/|$)/.test(pathname);

  if (isAdmin) return null;

  const navLinks = [
    { href: "/", label: dict.nav.services },
    { href: "/blog", label: dict.nav.articles },
    { href: "/resources", label: dict.nav.products },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 lg:px-8">
        <div className="flex shrink-0 items-center gap-2">
          <Button href="/resources#contact" variant="outline" size="sm" className="gap-1.5">
            <span className="text-muted">··</span>
            {dict.nav.startConsultation}
          </Button>
          <LanguageSwitcher className="hidden sm:inline-flex" />
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <LocaleLink
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                isNavActive(pathname, link.href) ? "text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              {link.label}
            </LocaleLink>
          ))}
          <button type="button" className="text-muted hover:text-foreground" aria-label={dict.nav.more}>
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="sm:hidden" />
          <LocaleLink href="/" className="relative block h-9 w-[120px] shrink-0 sm:h-10 sm:w-[140px]">
            <Image
              src="/images/logo.png"
              alt="Nabil Al-Jabri — نبيل الجابري"
              fill
              className="object-contain object-start"
              priority
            />
          </LocaleLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={dict.nav.menu}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <LocaleLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-muted hover:text-foreground"
              >
                {link.label}
              </LocaleLink>
            ))}
            <Button href="/resources#contact" variant="outline" className="mt-2 w-full">
              {dict.nav.startConsultation}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
