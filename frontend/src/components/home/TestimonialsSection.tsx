import { SectionLabel } from "@/components/ui/SectionLabel";

const testimonials = [
  {
    quote:
      "Meridian transformed our brand presence. The new site feels premium, loads instantly, and our inbound leads doubled in 90 days.",
    author: "Elena Vasquez",
    role: "CEO, Northline Ventures",
  },
  {
    quote:
      "Their process is disciplined and creative. We finally have a digital experience that matches the quality of our work.",
    author: "Marcus Webb",
    role: "Founder, Webb & Co.",
  },
  {
    quote:
      "From strategy to launch, the team was exceptional. The admin dashboard and blog system made content management effortless.",
    author: "Priya Sharma",
    role: "Marketing Director, Atlas Health",
  },
];

export function TestimonialsSection() {
  return (
    <section className="border-b border-border bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel>Client stories</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
          Results that speak for themselves
        </h2>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="flex flex-col justify-between rounded-2xl border border-border bg-background p-8"
            >
              <p className="text-base leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-8 border-t border-border pt-6">
                <p className="font-medium">{t.author}</p>
                <p className="mt-1 text-sm text-muted">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
