"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock } from "lucide-react"
import { FaFacebook } from "react-icons/fa"

type Business = {
  id: number
  name: string
  category: string
  colonia: string
  lat: number
  lng: number
  address: string
  phone: string
  hours: string
  description: string
  facebook: string
}

interface BusinessListProps {
  businesses: Business[]
}

export default function BusinessList({ businesses }: BusinessListProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const categories = ["Todos", "Restaurante", "Papelería", "Cafetería", "Tienda"]

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === "Todos" || business.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Buscar negocio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6 transition-shadow"
      />

      {/* Category Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {category === "Todos" ? "Todos" : category + "s"}
          </button>
        ))}
      </div>

      {/* Business Cards Grid */}
      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No se encontraron negocios con esos criterios.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredBusinesses.map((business) => (
            <Link key={business.id} href={`/business/${business.id}`}>
              <Card className="group overflow-hidden border-none bg-card/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                          {business.category}
                        </Badge>
                        <Badge variant="outline" className="text-muted-foreground">
                          {business.colonia}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {business.name}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
                        {business.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{business.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{business.hours}</span>
                    </div>
                  </div>

                  {business.facebook && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        window.open(business.facebook, "_blank")
                      }}
                      className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <FaFacebook className="h-4 w-4" />
                      <span>Ver en Facebook</span>
                    </button>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
