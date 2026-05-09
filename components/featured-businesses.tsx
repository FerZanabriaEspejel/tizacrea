"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const businesses = [
  {
    name: "Café Central",
    category: "Cafetería",
    description: "El mejor café de la región con un ambiente acogedor. Disfruta de nuestras bebidas artesanales y repostería fresca.",
    image: "/images/cafe-central.jpg",
  },
  {
    name: "Taquería El Sol",
    category: "Restaurante",
    description: "Tacos auténticos con recetas tradicionales. Los mejores tacos al pastor y carnitas de Tizayuca.",
    image: "/images/taqueria-sol.jpg",
  },
  {
    name: "Papelería Lupita",
    category: "Tienda",
    description: "Todo en útiles escolares y de oficina. Servicio personalizado y los mejores precios de la zona.",
    image: "/images/papeleria-lupita.jpg",
  },
]

export function FeaturedBusinesses() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Negocios destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Conoce algunos de los negocios favoritos de nuestra comunidad
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {businesses.map((business, index) => (
            <Card 
              key={index}
              className="group overflow-hidden border-border/50 bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 rounded-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={business.image}
                  alt={business.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="pt-6 pb-6 px-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {business.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {business.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {business.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
