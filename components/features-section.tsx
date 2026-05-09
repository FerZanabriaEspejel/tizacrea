"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Search, Map, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Descubre lugares locales",
    description: "Encuentra los mejores restaurantes, cafés, tiendas y servicios cerca de ti. Explora nuevos lugares y apoya a tu comunidad.",
  },
  {
    icon: Map,
    title: "Explora en el mapa",
    description: "Visualiza todos los negocios en un mapa interactivo. Encuentra direcciones, horarios y toda la información que necesitas.",
  },
  {
    icon: TrendingUp,
    title: "Haz crecer tu negocio",
    description: "Registra tu negocio y llega a más clientes. Aumenta tu visibilidad en la comunidad y conecta con nuevos clientes.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Descubre lo mejor de tu comunidad
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            TizaCrea te conecta con los negocios locales de Tizayuca, facilitando 
            descubrir, explorar y apoyar a tu comunidad.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 rounded-2xl"
            >
              <CardContent className="pt-8 pb-8 px-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
