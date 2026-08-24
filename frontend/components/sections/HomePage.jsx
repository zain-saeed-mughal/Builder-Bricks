import { HeroSection } from "@/components/sections/HeroSection";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { AtmosphereStrip } from "@/components/sections/AtmosphereStrip";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { PropertyExploration } from "@/components/sections/PropertyExploration";
import { NumbersSection } from "@/components/sections/NumbersSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FeaturedProperty } from "@/components/sections/FeaturedProperty";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCta } from "@/components/sections/FinalCta";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <AtmosphereStrip />
      <FeaturedProjects />
      <PhilosophySection />
      <PropertyExploration />
      <NumbersSection />
      <ProcessSection />
      <FeaturedProperty />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
