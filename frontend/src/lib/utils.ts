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

/** Card date format used on the blog grid (e.g. 2025/02/17). */
export function formatBlogCardDate(date: string) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}
