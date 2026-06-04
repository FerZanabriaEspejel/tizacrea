"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const businesses = [
  {
    name: "Plaza comercial Tizara",
    category: "Entretenimiento y recreación",
    description: "Espacio público emblemático del municipio que funciona como punto de encuentro para familias, visitantes y eventos comunitarios.",
    image: "/images/tizara.jpg",
  },
  {
    name: "Supermercado Aurrerá",
    category: "Comercio",
    description: "Uno de los principales supermercados de Tizayuca, ofreciendo una amplia variedad de productos para las familias de la región.",
    image: "/images/aurrera.png",
  },
  {
    name: "Plaza comercial Alameda",
    category: "Entretenimiento y recreación",
    description: "Centro comercial de Tizayuca, que reúne tiendas, restaurantes, servicios y espacios de entretenimiento en un solo lugar.",
    image: "/images/alameda.jpg",
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
