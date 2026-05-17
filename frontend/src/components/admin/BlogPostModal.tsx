"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { createBlogPost, updateBlogPost, type BlogPost } from "@/lib/strapi";
import { useLocale } from "@/lib/i18n/locale-provider";

type FormData = {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  author?: string;
  category?: string;
  readTime?: number;
};

export function BlogPostModal({
  open,
  onClose,
  token,
  post,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  token: string;
  post: BlogPost | null;
  onSaved: () => void;
}) {
  const { dict } = useLocale();

  const schema = useMemo(
    () =>
      z.object({
        title: z.string().min(3, dict.admin.validationTitle),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().min(10, dict.admin.validationContent),
        author: z.string().optional(),
        category: z.string().optional(),
        readTime: z.number().optional(),
      }),
    [dict]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (open) {
      reset({
        title: post?.title || "",
        slug: post?.slug || "",
        excerpt: post?.excerpt || "",
        content: post?.content?.replace(/<[^>]+>/g, "") || post?.content || "",
        author: post?.author || dict.site.name,
        category: post?.category || "Insights",
        readTime: post?.readTime || 5,
      });
    }
  }, [open, post, reset, dict.site.name]);

  if (!open) return null;

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      content: `<p>${data.content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")}</p>`,
    };
    if (post?.documentId) {
      await updateBlogPost(token, post.documentId, payload);
    } else {
      await createBlogPost(token, payload as { title: string; content: string });
    }
    onSaved();
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {post ? dict.admin.editPost : dict.admin.newPost}
          </h2>
          <button type="button" onClick={onClose} className="text-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs text-muted">{dict.admin.titleLabel}</label>
            <input {...register("title")} className={inputClass} />
            {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted">{dict.admin.slugLabel}</label>
            <input {...register("slug")} className={inputClass} dir="ltr" />
          </div>
          <div>
            <label className="text-xs text-muted">{dict.admin.excerptLabel}</label>
            <textarea {...register("excerpt")} rows={2} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted">{dict.admin.contentLabel}</label>
            <textarea {...register("content")} rows={8} className={inputClass} />
            {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-medium text-black"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : dict.admin.save}
          </button>
        </form>
      </div>
    </div>
  );
}
