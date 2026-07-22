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
  colonia?: string
  lat?: number
  lng?: number
  address: string
  phone: string
  business_hours?: Record<
  string,
  {
    open: string
    close: string
    closed: boolean
  }
      >
  description: string
  facebook: string
  image_url?: string
}

const orderedDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]

const daysInSpanish: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
}

function getOpenDays(
  businessHours?: Record<
    string,
    {
      open: string
      close: string
      closed: boolean
    }
  >
) {

  if (!businessHours)
    return "Horario no disponible"

  const openDays = orderedDays.filter(
    (day) =>
      businessHours[day] &&
      !businessHours[day].closed
  )

  if (openDays.length === 0)
    return "Horario no disponible"

  if (openDays.length === 7)
    return "Todos los días"

  return `${daysInSpanish[openDays[0]]} a ${
    daysInSpanish[
      openDays[openDays.length - 1]
    ]
  }`

}

function isOpenNow(
  businessHours?: Record<
    string,
    {
      open: string
      close: string
      closed: boolean
    }
  >
) {

  if (!businessHours) return false

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]

  const now = new Date()

  const today = days[now.getDay()]

  const schedule = businessHours[today]

  if (!schedule) return false

  if (schedule.closed) return false

  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes()

  const [openHour, openMinute] =
    schedule.open.split(":").map(Number)

  const [closeHour, closeMinute] =
    schedule.close.split(":").map(Number)

  const openMinutes =
    openHour * 60 + openMinute

  const closeMinutes =
    closeHour * 60 + closeMinute

  return (
    currentMinutes >= openMinutes &&
    currentMinutes <= closeMinutes
  )

}

function getTodayHours(
  businessHours?: Record<
    string,
    {
      open: string
      close: string
      closed: boolean
    }
  >
) {

  if (!businessHours)
    return "Sin horario"

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]

  const today = days[new Date().getDay()]

  const schedule = businessHours[today]

  if (!schedule || schedule.closed)
    return "Cerrado"

  return `${schedule.open} - ${schedule.close}`

}

interface BusinessListProps {
  businesses: Business[]
}

export default function BusinessList({
  businesses,
}: BusinessListProps) {

  const [search, setSearch] = useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("Todos")

  // 📦 categorías dinámicas
  const uniqueCategories = [
    "Todos",
    ...new Set(
      businesses.map((b) => b.category)
    ),
  ]

  // 🔍 filtros
  const filteredBusinesses = businesses.filter(
    (business) => {

      const matchesSearch =
        business.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesCategory =
        selectedCategory === "Todos" ||
        business.category === selectedCategory

      return (
        matchesSearch &&
        matchesCategory
      )
    }
  )

  return (
    <div>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar negocio..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6 transition-shadow"
      />

      {/* FILTRO */}
      <div className="mb-8">

        <label className="block text-sm font-semibold mb-2">
          Categoría
        </label>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="w-full md:w-96 p-3 rounded-xl border border-border bg-card text-foreground"
        >

          {uniqueCategories.map(
            (category) => (

              <option
                key={category}
                value={category}
              >
                {category}
              </option>

            )
          )}

        </select>

      </div>

      {/* SIN RESULTADOS */}
      {filteredBusinesses.length === 0 ? (

        <div className="text-center py-12 text-muted-foreground">

          No se encontraron negocios.

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2">

          {filteredBusinesses.map(
            (business) => (

              <Link
                key={business.id}
                href={`/businesses/${business.id}`}
              >

                <Card className="group overflow-hidden border-none bg-card/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full">

                  {/* IMAGE */}
                  {business.image_url && (

                    <div className="h-52 overflow-hidden">

                      <img
                        src={
                          business.image_url
                        }
                        alt={
                          business.name
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />

                    </div>

                  )}

                  <CardContent className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex-1">

                        <div className="flex items-center gap-2 mb-2">

                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">

                            {
                              business.category
                            }

                          </Badge>

                          <Badge
                            variant="outline"
                            className="text-muted-foreground"
                          >
                            {business.colonia ||
                              "Tizayuca"}
                          </Badge>

                        </div>

                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">

                          {business.name}

                        </h3>

                        <p className="text-muted-foreground mt-2 text-sm line-clamp-2">

                          {business.description ||
                            "Sin descripción"}

                        </p>

                      </div>

                    </div>

                    {/* INFO */}
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">

                      <div className="flex items-center gap-2">

                        <MapPin className="h-4 w-4 text-primary" />

                        <span>
                          {
                            business.address
                          }
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

  <Phone className="h-4 w-4 text-primary" />

  <span>
    {business.phone || "Sin teléfono"}
  </span>

</div>

<div className="grid grid-cols-3 items-center mt-3 text-sm gap-2">

  {/* Estado */}
  <span
    className={`font-semibold ${
      isOpenNow(business.business_hours)
        ? "text-green-600"
        : "text-red-500"
    }`}
  >
    {isOpenNow(business.business_hours)
      ? "🟢 Abierto ahora"
      : "🔴 Cerrado ahora"}
  </span>

  {/* Horario */}
  <span className="text-center text-muted-foreground">
    🕒 {getTodayHours(business.business_hours)}
  </span>

  {/* Días */}
  <span className="text-right text-muted-foreground">
    📅 {getOpenDays(business.business_hours)}
  </span>

</div>

                    </div>

                    {/* FACEBOOK */}
                    {business.facebook && (

                      <button
                        onClick={(e) => {

                          e.stopPropagation()
                          e.preventDefault()

                          window.open(
                            business.facebook,
                            "_blank"
                          )

                        }}
                        className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
                      >

                        <FaFacebook className="h-4 w-4" />

                        <span>
                          Ver en Facebook
                        </span>

                      </button>

                    )}

                  </CardContent>

                </Card>

              </Link>

            )
          )}

        </div>

      )}

    </div>
  )
}