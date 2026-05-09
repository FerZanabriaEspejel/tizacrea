import { Navbar } from "@/components/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Users, 
  Store, 
  MapPin, 
  Search, 
  Star, 
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function SobreNosotrosPage() {
  const features = [
    {
      icon: Search,
      title: "Busqueda Inteligente",
      description: "Encuentra negocios por nombre, categoria o colonia. Nuestro buscador te ayuda a descubrir exactamente lo que necesitas."
    },
    {
      icon: MapPin,
      title: "Ubicacion Precisa",
      description: "Cada negocio incluye direccion detallada y colonia para que llegues facilmente a tu destino."
    },
    {
      icon: Store,
      title: "Registro Gratuito",
      description: "Los negocios locales pueden registrarse sin costo y llegar a miles de personas en Tizayuca."
    },
    {
      icon: Star,
      title: "Negocios Destacados",
      description: "Descubre los mejores lugares de la comunidad con nuestras recomendaciones destacadas."
    },
    {
      icon: TrendingUp,
      title: "Impulsa tu Negocio",
      description: "Aumenta tu visibilidad y atrae nuevos clientes con tu perfil en TizaCrea."
    },
    {
      icon: Shield,
      title: "Informacion Verificada",
      description: "Trabajamos para mantener la informacion actualizada y confiable para nuestra comunidad."
    }
  ]

  const stats = [
    { number: "100+", label: "Negocios Registrados" },
    { number: "5,000+", label: "Usuarios Mensuales" },
    { number: "15+", label: "Categorias" },
    { number: "20+", label: "Colonias" }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5">
            <Heart className="w-3.5 h-3.5 mr-1.5 text-primary" />
            Hecho con amor en Tizayuca
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Conectando a Tizayuca con sus Negocios Locales
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            TizaCrea es una plataforma digital creada para fortalecer la economia local, 
            ayudando a los habitantes de Tizayuca a descubrir y apoyar los negocios de su comunidad.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm text-center">
                <CardContent className="pt-6 pb-4">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.number}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Nuestra Mision</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Creemos que los negocios locales son el corazon de nuestra comunidad. TizaCrea nacio 
                con la vision de crear un puente digital entre los emprendedores de Tizayuca y las 
                personas que buscan productos y servicios de calidad cerca de casa.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nuestra plataforma facilita el descubrimiento de restaurantes, cafes, tiendas, 
                servicios y mucho mas, todo en un solo lugar. Queremos que cada negocio tenga 
                la oportunidad de crecer y prosperar en nuestra ciudad.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Que Ofrecemos
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Funcionalidades pensadas para conectar a la comunidad con los negocios locales de manera facil y efectiva.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-10 h-10 text-accent" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Somos Comunidad
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    TizaCrea es mas que una plataforma, es un proyecto de la comunidad para la comunidad. 
                    Cada negocio que se registra y cada persona que descubre un nuevo lugar favorito 
                    contribuye a fortalecer nuestra economia local y a crear una Tizayuca mas conectada.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Se Parte de TizaCrea
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Ya sea que tengas un negocio o busques descubrir nuevos lugares, te invitamos a ser parte de nuestra comunidad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/negocios">
              <Button size="lg" variant="outline" className="group">
                Explorar Negocios
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/registrar">
              <Button size="lg" className="group">
                <Store className="w-4 h-4 mr-2" />
                Registrar mi Negocio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
