"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Business = {
  id: number
  name: string
  category: string
  address: string
  image_url: string
}

export function NewBusinessesCarousel() {
  const [businesses, setBusinesses] = useState<Business[]>([])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: true,
      }),
    ]
  )

  const scrollPrev = () => {
    emblaApi?.scrollPrev()
  }

  const scrollNext = () => {
    emblaApi?.scrollNext()
  }

  useEffect(() => {
    async function loadBusinesses() {
      const { data, error } = await supabase
        .from("businesses")
        .select("id,name,category,address,image_url")
        .order("created_at", {
          ascending: false,
        })
        .limit(10)

      if (error) {
        console.log(error)
        return
      }

      if (data) {
        setBusinesses(data)
      }
    }

    loadBusinesses()
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Recién llegados a TizaCrea
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Descubre los negocios más nuevos registrados en la comunidad.
          </p>
        </div>

        {/* CARRUSEL */}
        <div className="relative">
          {/* Flecha izquierda */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-30 h-12 w-12 -translate-y-1/2 rounded-full border bg-white/90 shadow-xl backdrop-blur transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Flecha derecha */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-30 h-12 w-12 -translate-y-1/2 rounded-full border bg-white/90 shadow-xl backdrop-blur transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            <ChevronRight size={24} />
          </button>

          <div className="overflow-hidden px-8" ref={emblaRef}>
            <div className="flex">
              {businesses.map((business) => (
                <div
                  key={business.id}
                  className="w-[330px] shrink-0 px-3 md:w-[340px] lg:w-[31%]"
                >
                  <Link href={`/businesses/${business.id}`}>
                    <div className="group h-full rounded-3xl border bg-card shadow-md transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl overflow-hidden">
                      {/* Imagen */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={
                            business.image_url ||
                            "/placeholder.png"
                          }
                          alt={business.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                        {/* Badge */}
                        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                          Nuevo
                        </span>
                      </div>

                      {/* Información */}
                      <div className="p-6">
                        <h3 className="line-clamp-1 text-xl font-bold">
                          {business.name}
                        </h3>

                        <p className="mt-2 font-medium text-orange-500">
                          {business.category}
                        </p>

                        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                          {business.address}
                        </p>

                        <button className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">
                          Ver negocio
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}