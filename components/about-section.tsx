"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Zap } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg">
          <CardContent className="py-12 px-8 md:px-12">
            <div className="text-center">
              <div className="flex justify-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                ¿Qué es TizaCrea?
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-pretty">
                TizaCrea es una plataforma digital diseñada para conectar a las personas 
                con los negocios locales de Tizayuca, Hidalgo. Nuestro objetivo es fortalecer 
                la economía local y crear una comunidad más unida a través de la tecnología. 
                Creemos en el poder de los negocios pequeños y en el impacto positivo que 
                tienen en nuestras vidas diarias.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
