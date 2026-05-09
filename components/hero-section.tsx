"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Store } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Vista de Tizayuca"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <Badge 
          variant="secondary" 
          className="mb-6 px-4 py-2 text-sm font-medium bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg"
        >
          <MapPin className="w-4 h-4 mr-1.5 text-primary" />
          Tizayuca, Hidalgo
        </Badge>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight text-balance">
          Descubre negocios locales cerca de ti
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          Encuentra restaurantes, cafés, tiendas y servicios locales en tu comunidad. 
          Apoya a los negocios de Tizayuca y fortalece la economía local.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Explorar negocios
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-base px-8 py-6 rounded-xl bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Store className="w-5 h-5 mr-2" />
            Registrar negocio
          </Button>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
