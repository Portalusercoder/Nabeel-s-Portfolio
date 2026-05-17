import { HeroSection } from "@/components/home/HeroSection";
import { WorksSection } from "@/components/home/WorksSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { ArticlesPreviewSection } from "@/components/home/ArticlesPreviewSection";
import { ServicesCtaSection } from "@/components/home/ServicesCtaSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WorksSection />
      <StatsSection />
      <ProductsSection />
      <ArticlesPreviewSection />
      <ServicesCtaSection />
      <NewsletterSection />
    </>
  );
}
