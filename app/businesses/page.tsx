import { Navbar } from "@/components/Navbar"
import BusinessList from "@/components/BusinessList"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic";

export default async function BusinessesPage() {

  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
  }

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

        <BusinessList businesses={businesses || []} />

      </section>

    </main>
  )
}