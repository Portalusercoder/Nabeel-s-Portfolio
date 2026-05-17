"use client";

import { createContext, useContext, useMemo } from "react";
import { getDictionary, type Dictionary } from "./dictionaries";
import type { Locale } from "./types";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  isRtl: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const value = useMemo(
    () => ({
      locale,
      dict: getDictionary(locale),
      isRtl: locale === "ar",
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
