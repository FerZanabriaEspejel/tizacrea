import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  params: {
    id: string;
  };
};

// Simulación (después vendrá del backend)
const businesses = [
  {
    id: 1,
    name: "Taquería El Sol",
    category: "Restaurante",
    address: "Av. Juárez #12",
    phone: "7791234567",
    hours: "9:00 AM - 10:00 PM",
    description:
      "Tacos al pastor, gringas y comida mexicana tradicional en un ambiente familiar.",
    facebook: "https://facebook.com",
  },
  {
    id: 2,
    name: "Papelería Lupita",
    category: "Papelería",
    address: "Calle Hidalgo #45",
    phone: "7715558899",
    hours: "8:00 AM - 8:00 PM",
    description:
      "Todo tipo de artículos escolares, impresiones y copias.",
    facebook: "https://facebook.com",
  },
];

export default function BusinessDetailPage({ params }: Props) {
  const business = businesses.find(
    (b) => b.id === Number(params.id)
  );

  if (!business) {
    return (
      <div className="p-10 text-center">
        Negocio no encontrado
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-orange-50">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold">
          {business.name}
        </h1>

        <p className="text-zinc-600 mt-2">
          {business.category}
        </p>

      </section>

      {/* CONTENIDO */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">

        {/* INFO */}
        <div className="md:col-span-2 space-y-4">

          <Card>
            <CardContent className="p-6">
              <h2 className="font-bold mb-2">Descripción</h2>
              <p className="text-zinc-600">
                {business.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">

              <p>📍 {business.address}</p>
              <p>📞 {business.phone}</p>
              <p>🕒 {business.hours}</p>

            </CardContent>
          </Card>

        </div>

        {/* ACCIONES */}
        <div className="space-y-4">

          <Card>
            <CardContent className="p-6 space-y-3">

              <h2 className="font-bold">
                Contacto
              </h2>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Llamar
              </Button>

              <Button variant="outline" className="w-full">
                Ver ubicación
              </Button>

              <a
                href={business.facebook}
                target="_blank"
                className="text-sm text-orange-500 block text-center"
              >
                Ir a Facebook
              </a>

            </CardContent>
          </Card>

        </div>

      </section>

    </main>
  );
}