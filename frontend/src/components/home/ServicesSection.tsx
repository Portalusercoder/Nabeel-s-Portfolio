import { Layers, Palette, Code2, TrendingUp } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const services = [
  {
    icon: Layers,
    title: "Brand Strategy",
    description:
      "Positioning, messaging, and go-to-market clarity that helps you charge premium and attract ideal clients.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Minimal, conversion-focused interfaces with refined typography, spacing, and visual hierarchy.",
  },
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, scalable sites built with modern stacks—Next.js, headless CMS, and performance-first architecture.",
  },
  {
    icon: TrendingUp,
    title: "SEO & Growth",
    description:
      "Technical SEO, content strategy, and analytics setup to turn your website into a lead engine.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>What we do</SectionLabel>
          <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            Full-service digital, built for growth
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            From first impression to final conversion—we partner with you at every stage of the
            digital journey.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-border bg-card p-8 transition hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
            >
              <service.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <h3 className="mt-6 text-lg font-medium">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
