"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

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

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
      }),
    ]
  )

  useEffect(() => {

    async function loadBusinesses() {

      const { data, error } = await supabase
        .from("businesses")
        .select("id,name,category,address,image_url")
        .order("created_at", {
          ascending: false,
        })
        .limit(8)

      console.log("DATA:", data)
      console.log("ERROR:", error)

      if (data) {
        setBusinesses(data)
      }

    }

    loadBusinesses()

  }, [])

  return (

    <section className="py-20">

      <div className="container mx-auto px-4">

        <div className="mb-10">

          <h2 className="text-3xl font-bold">
            🆕 Recién llegados a TizaCrea
          </h2>

          <p className="text-muted-foreground mt-2">
            Descubre los negocios más nuevos registrados en la comunidad.
          </p>

        </div>

        <div
          className="overflow-hidden"
          ref={emblaRef}
        >

          <div className="flex gap-6">

            {businesses.map((business) => (

              <Link
                key={business.id}
                href={`/businesses/${business.id}`}
                className="min-w-[320px]"
              >

                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border">

                  <div className="relative h-52">

                    <Image
                      src={
                        business.image_url ||
                        "/placeholder.png"
                      }
                      alt={business.name}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="p-5 space-y-2">

                    <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                      🆕 Nuevo
                    </span>

                    <h3 className="text-xl font-bold line-clamp-1">
                      {business.name}
                    </h3>

                    <p className="text-sm text-primary font-medium">
                      {business.category}
                    </p>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {business.address}
                    </p>

                    <button className="mt-3 w-full bg-primary text-white py-2 rounded-xl hover:opacity-90 transition">
                      Ver negocio →
                    </button>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </div>

    </section>

  )

}