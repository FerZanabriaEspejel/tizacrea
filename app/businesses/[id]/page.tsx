"use client";

import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


import { supabase } from "@/lib/supabase";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaGlobe,
} from "react-icons/fa"


const BusinessMap = dynamic(
  () => import("@/components/BusinessMap"),
  {
    ssr: false,
  }
);

type Business = {
  id: number;
  name: string;
  category: string;
  address: string;
  phone: string;
  description: string;
  image_url: string;

  lat?: number;
  lng?: number;

  google_maps_url?: string;

  business_hours?: Record<
    string,
    {
      open: string;
      close: string;
      closed: boolean;
    }
  >;

  socials?: {
    type: string;
    url: string;
  }[];
};

const daysInSpanish: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

export default function BusinessDetailPage() {

  const params = useParams();

  const [business, setBusiness] = useState<Business | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchBusiness() {

      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", Number(params.id))
        .single();

      if (error) {

        console.error(error.message);

      } else {

        setBusiness(data);
      }

      setLoading(false);
    }

    fetchBusiness();

  }, [params.id]);

  // ⏳ LOADING
  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Cargando negocio...</p>
      </main>
    );
  }

  // ❌ NOT FOUND
  if (!business) {

    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Negocio no encontrado</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-orange-50">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-10">

        {/* IMAGE */}
        {business.image_url && (

          <img
            src={business.image_url}
            alt={business.name}
            className="w-full h-[350px] object-cover rounded-3xl shadow-lg mb-8"
          />

        )}

        <h1 className="text-4xl font-bold">
          {business.name}
        </h1>

        <p className="text-orange-600 font-medium mt-2">
          {business.category}
        </p>

      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">

        {/* INFO */}
        <div className="md:col-span-2 space-y-4">

          {/* DESCRIPTION */}
          <Card>

            <CardContent className="p-6">

              <h2 className="font-bold text-xl mb-3">
                Descripción
              </h2>

              <p className="text-zinc-600 leading-relaxed">
                {business.description || "Sin descripción"}
              </p>

            </CardContent>

          </Card>

          {/* DETAILS */}
          <Card>

            <CardContent className="p-6 space-y-3">

              <h2 className="font-bold text-xl mb-2">
                Información
              </h2>

              <p>
                📍 {business.address}
              </p>

              <p>
                📞 {business.phone || "Sin teléfono"}
              </p>

              <div className="pt-2">

  <h3 className="font-medium mb-2">
    🕒 Horarios
  </h3>

  {business.business_hours ? (

    <div className="space-y-1 text-sm">

      {Object.entries(
        business.business_hours
      ).map(([day, schedule]: any) => (

        <div
          key={day}
          className="flex justify-between border-b border-zinc-100 pb-1"
        >

          <span className="font-medium">
            {daysInSpanish[day]}
          </span>

          <span>
            {schedule.closed
              ? "Cerrado"
              : `${schedule.open} - ${schedule.close}`}
          </span>

        </div>

      ))}

    </div>

  ) : (

    <p>Horario no disponible</p>

  )}

</div>

            </CardContent>

          </Card>

        </div>

        {/* ACTIONS */}
        <div className="space-y-4">

          <Card>

            <CardContent className="p-6">

              <h2 className="font-bold text-xl mb-5">
                Contacto
              </h2>

              <div className="flex flex-col gap-3">

                {/* CALL */}
                {business.phone && (

                  <a href={`tel:${business.phone}`}>

                    <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white">
                      Llamar
                    </Button>

                  </a>

                )}

                {/* MAP BUTTON */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    business.address
                  )}`}
                  target="_blank"
                >

                  <Button
                    variant="outline"
                    className="w-full h-12"
                  >
                    Ver ubicación
                  </Button>

{business.google_maps_url && (

  <a
    href={business.google_maps_url}
    target="_blank"
  >

    <Button
      variant="outline"
      className="w-full h-12"
    >
      Abrir en Google Maps
    </Button>

  </a>

)}

                </a>
{/* SOCIALS */}
{business.socials &&
  business.socials.length > 0 && (

    <div className="space-y-2 pt-2">

      {business.socials.map(
        (social, index) => {

          const icon =
            social.type === "facebook" ? (
              <FaFacebook />
            ) : social.type === "instagram" ? (
              <FaInstagram />
            ) : social.type === "tiktok" ? (
              <FaTiktok />
            ) : social.type === "whatsapp" ? (
              <FaWhatsapp />
            ) : (
              <FaGlobe />
            )

          return (

            <a
              key={index}
              href={social.url}
              target="_blank"
              className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 transition"
            >

              {icon}

              <span className="capitalize">
                {social.type}
              </span>

            </a>

          )
        }
      )}

    </div>

)}
                {/* FACEBOOK */}

              </div>

            </CardContent>

          </Card>

        </div>

      </section>

      {/* MAPA */}
      <section className="max-w-5xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold mb-6">
          Ubicación
        </h2>

        <BusinessMap
          businesses={[
            {
              ...business,
              lat: business.lat || 19.837,
              lng: business.lng || -98.977,
            },
          ]}
        />

      </section>

    </main>
  );
}