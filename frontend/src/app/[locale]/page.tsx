import { LandingPreloader } from "@/components/home/LandingPreloader";
import { HeroSection } from "@/components/home/HeroSection";
import { WorksSection } from "@/components/home/WorksSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { ArticlesPreviewSection } from "@/components/home/ArticlesPreviewSection";
import { ServicesCtaSection } from "@/components/home/ServicesCtaSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

type PageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <LandingPreloader />
      <HeroSection />
      <WorksSection />
      <StatsSection />
      <ProductsSection />
      <ArticlesPreviewSection locale={locale} />
      <ServicesCtaSection />
      <NewsletterSection />
    </>
  );
}
