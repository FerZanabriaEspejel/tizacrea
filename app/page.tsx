import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { NewBusinessesCarousel } from "@/components/new-businesses-carousel"
import { FeaturedBusinesses } from "@/components/featured-businesses"
import { GallerySection } from "@/components/gallery-section"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <main className="min-h-screen">

      <HeroSection />

      <FeaturesSection />

      <NewBusinessesCarousel />

      <FeaturedBusinesses />

      <GallerySection />

      <AboutSection />

    </main>
  )
}
