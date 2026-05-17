"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

type FormData = { email: string };

export function NewsletterForm({
  source = "resources",
}: {
  source?: string;
  variant?: "light" | "dark";
}) {
  const { dict } = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const schema = z.object({
    email: z.string().email(dict.newsletter.invalidEmail),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || dict.newsletter.error);
      setStatus("success");
      setMessage(dict.newsletter.success);
      reset();
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : dict.newsletter.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          placeholder={dict.newsletter.placeholder}
          dir="ltr"
          {...register("email")}
          className="h-12 flex-1 rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:ring-2 focus:ring-white/10"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-cta-blue px-6 text-sm font-medium text-white transition hover:bg-cta-blue/90"
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : dict.newsletter.subscribe}
        </button>
      </div>
      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      {status === "success" && <p className="text-xs text-emerald-400">{message}</p>}
      {status === "error" && <p className="text-xs text-red-400">{message}</p>}
    </form>
  );
}
