import { Navbar } from "@/components/Navbar"
import BusinessList from "@/components/BusinessList"

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

// Datos temporales (después vendrán del backend)
const businesses: Business[] = [
  {
    id: 1,
    name: "Taquería El Sol",
    category: "Restaurante",
    colonia: "Centro",
    lat: 19.837,
    lng: -98.977,
    address: "Av. Juárez #12",
    phone: "7791234567",
    hours: "9:00 AM - 10:00 PM",
    description: "Tacos al pastor y comida mexicana tradicional.",
    facebook: "https://facebook.com"
  },
  {
    id: 2,
    name: "Papelería Lupita",
    category: "Papelería",
    colonia: "La Cruz",
    lat: 19.84,
    lng: -98.98,
    address: "Calle Hidalgo #45",
    phone: "7715558899",
    hours: "8:00 AM - 8:00 PM",
    description: "Todo para escuela y oficina.",
    facebook: "https://facebook.com"
  }
]

export default function BusinessesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-orange-50">
      <Navbar />

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <h1 className="text-4xl font-bold text-foreground">
          Negocios locales
        </h1>
        <p className="text-muted-foreground mt-2">
          Descubre restaurantes, tiendas y servicios cerca de ti en Tizayuca.
        </p>
      </section>

      {/* LISTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <BusinessList businesses={businesses} />
      </section>
    </main>
  )
}
