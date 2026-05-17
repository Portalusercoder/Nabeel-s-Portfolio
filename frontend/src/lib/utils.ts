import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, locale: "ar" | "en" = "ar") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ar-SA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
