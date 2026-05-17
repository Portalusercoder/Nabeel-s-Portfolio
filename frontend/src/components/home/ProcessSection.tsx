import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  { num: "01", title: "Discover", desc: "Deep-dive workshops to understand your brand, audience, and goals." },
  { num: "02", title: "Define", desc: "Strategy, sitemap, and wireframes aligned to business outcomes." },
  { num: "03", title: "Design", desc: "High-fidelity visuals with meticulous attention to craft and detail." },
  { num: "04", title: "Deliver", desc: "Development, QA, launch, and ongoing optimization support." },
];

export function ProcessSection() {
  return (
    <section className="border-b border-border bg-accent-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionLabel>Our process</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              A proven framework for exceptional outcomes
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            We move with intention—no bloated timelines, no surprise scope. Every phase has clear
            deliverables and measurable milestones.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="border-t border-border pt-8">
              <span className="font-serif text-3xl text-gold">{step.num}</span>
              <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
