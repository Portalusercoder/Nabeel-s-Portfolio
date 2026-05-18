"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-provider";
import { subscribeNewsletter } from "@/lib/strapi";

type FormData = { firstName: string; email: string };

export function GuideLeadForm() {
  const { dict } = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const schema = z.object({
    firstName: z.string().min(2, dict.resources.firstNameRequired),
    email: z.string().email(dict.resources.emailInvalid),
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
      await subscribeNewsletter({
        email: data.email,
        name: data.firstName,
        source: "campaign-guide",
      });
      setStatus("success");
      setMessage(dict.resources.formSuccess);
      reset();
    } catch {
      if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
        setStatus("success");
        setMessage(dict.resources.formSuccess);
        reset();
        return;
      }
      setStatus("error");
      setMessage(dict.resources.formError);
    }
  };

  const inputClass =
    "h-12 flex-1 rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:ring-2 focus:ring-white/10";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-center text-xl font-medium sm:text-2xl">{dict.resources.formHeading}</h2>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          type="text"
          placeholder={dict.resources.firstNamePlaceholder}
          {...register("firstName")}
          className={inputClass}
        />
        <input
          type="email"
          placeholder={dict.resources.emailPlaceholder}
          dir="ltr"
          {...register("email")}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-white px-6 text-sm font-medium text-black transition hover:bg-white/90 sm:px-8"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            dict.resources.downloadCta
          )}
        </button>
      </div>
      {errors.firstName && <p className="text-center text-xs text-muted">{errors.firstName.message}</p>}
      {errors.email && <p className="text-center text-xs text-muted">{errors.email.message}</p>}
      {status === "success" && <p className="text-center text-xs text-foreground">{message}</p>}
      {status === "error" && <p className="text-center text-xs text-muted">{message}</p>}
    </form>
  );
}
