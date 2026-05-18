"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-provider";
import { subscribeNewsletter } from "@/lib/strapi";

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
      await subscribeNewsletter({ email: data.email, source });
      setStatus("success");
      setMessage(dict.newsletter.success);
      reset();
    } catch (e) {
      if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
        setStatus("success");
        setMessage(dict.newsletter.success);
        reset();
        return;
      }
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
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-white px-6 text-sm font-medium text-black transition hover:bg-white/90"
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : dict.newsletter.subscribe}
        </button>
      </div>
      {errors.email && <p className="text-xs text-muted">{errors.email.message}</p>}
      {status === "success" && <p className="text-xs text-foreground">{message}</p>}
      {status === "error" && <p className="text-xs text-muted">{message}</p>}
    </form>
  );
}
