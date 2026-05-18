"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { SITE_EMAIL } from "@/lib/constants";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const { dict } = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const schema = z.object({
    name: z.string().min(2, dict.contact.nameRequired),
    email: z.string().email(dict.contact.emailInvalid),
    company: z.string().optional(),
    message: z.string().min(10, dict.contact.messageMin),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    const subject = encodeURIComponent(`Project inquiry from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "—"}\n\n${data.message}`
    );
    window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("success");
    reset();
  };

  const inputClass =
    "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-foreground/30 focus:ring-2 focus:ring-white/10";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs text-muted">{dict.contact.name}</label>
          <input {...register("name")} className={inputClass} placeholder={dict.contact.namePlaceholder} />
          {errors.name && <p className="mt-1 text-xs text-muted">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-muted">{dict.contact.email}</label>
          <input
            {...register("email")}
            type="email"
            dir="ltr"
            className={inputClass}
            placeholder={dict.contact.emailPlaceholder}
          />
          {errors.email && <p className="mt-1 text-xs text-muted">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-muted">{dict.contact.company}</label>
        <input {...register("company")} className={inputClass} placeholder={dict.contact.companyPlaceholder} />
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-muted">{dict.contact.message}</label>
        <textarea
          {...register("message")}
          rows={5}
          className={cn(inputClass, "resize-none")}
          placeholder={dict.contact.messagePlaceholder}
        />
        {errors.message && <p className="mt-1 text-xs text-muted">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white text-sm font-medium text-black transition hover:bg-white/90 sm:w-auto sm:px-8"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : dict.contact.send}
      </button>
      {status === "success" && <p className="text-sm text-foreground">{dict.contact.success}</p>}
      {status === "error" && <p className="text-sm text-muted">{dict.contact.error}</p>}
    </form>
  );
}
