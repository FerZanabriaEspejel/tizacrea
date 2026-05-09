import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FeaturedBusinesses } from "@/components/featured-businesses"
import { GallerySection } from "@/components/gallery-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FeaturedBusinesses />
      <GallerySection />
      <AboutSection />
      <Footer />
    </main>
  )
}

