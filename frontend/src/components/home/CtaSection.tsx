import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CtaSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-accent px-8 py-16 text-center text-white sm:px-16 lg:py-24">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <SectionLabel className="justify-center text-gold-light [&_span]:bg-gold-light">
              Let&apos;s work together
            </SectionLabel>
            <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
              Ready to elevate your digital presence?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/60">
              Book a discovery call and we&apos;ll map a clear path from concept to launch.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/resources#contact" variant="secondary" size="lg" className="bg-white text-accent hover:bg-white/90">
                Get in touch
              </Button>
              <Button href="/resources" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Download resources
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
