"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  "Alimentos y bebidas",
  "Comercio al por menor (Retail)",
  "Salud y bienestar",
  "Belleza y cuidado personal",
  "Servicios profesionales y consultoría",
  "Educación y capacitación",
  "Tecnología y software",
  "Construcción y mantenimiento de inmuebles",
  "Automotriz (Venta y servicios)",
  "Logística y transporte",
  "Servicios financieros",
  "Entretenimiento y recreación",
  "Turismo y hospitalidad",
  "Servicios para mascotas",
  "Inmobiliaria y bienes raíces",
  "Manufactura y producción",
  "Energía y servicios sustentables",
  "Moda y textiles",
  "Servicios de limpieza y desinfección",
  "Marketing y publicidad",
  "Otro",
];

export default function EditBusinessPage() {

  const router = useRouter();

  const params = useParams();

  const businessId = params.id;

  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState<File | null>(null);

  const [currentImage, setCurrentImage] = useState("");

  const [socials, setSocials] = useState([
    {
      type: "",
      url: "",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    hours: "",
    description: "",
  });

  // 📦 FETCH BUSINESS
  useEffect(() => {

    async function fetchBusiness() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", businessId)
        .single();

      if (error || !data) {

        console.error(error?.message);

        alert("Negocio no encontrado");

        router.push("/my-businesses");

        return;
      }

      // 🔐 VALIDAR OWNER
      if (data.owner_id !== user.id) {

        alert("No tienes permiso");

        router.push("/my-businesses");

        return;
      }

      setForm({
        name: data.name || "",
        category: data.category || "",
        address: data.address || "",
        phone: data.phone || "",
        hours: data.hours || "",
        description: data.description || "",
      });

      setSocials(
        data.socials?.length
          ? data.socials
          : [
              {
                type: "",
                url: "",
              },
            ]
      );

      setCurrentImage(data.image_url || "");

      setLoading(false);
    }

    fetchBusiness();

  }, [businessId, router]);

  // ✏️ CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🌐 REDES SOCIALES
  function handleSocialChange(
    index: number,
    field: string,
    value: string
  ) {

    const updated = [...socials];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setSocials(updated);
  }

  function addSocial() {

    setSocials([
      ...socials,
      {
        type: "",
        url: "",
      },
    ]);
  }

  // 💾 UPDATE
  const handleUpdate = async (e: React.FormEvent) => {

    e.preventDefault();

    let imageUrl = currentImage;

    // 📸 NUEVA IMAGEN
    if (image) {

      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("business-images")
        .upload(fileName, image);

      if (uploadError) {

        console.error(uploadError.message);

        alert("Error subiendo imagen");

        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("business-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    // 💾 UPDATE DB
    const { error } = await supabase
      .from("businesses")
      .update({
        name: form.name,
        category: form.category,
        address: form.address,
        phone: form.phone,
        hours: form.hours,
        description: form.description,
        socials,
        image_url: imageUrl,
      })
      .eq("id", businessId);

    if (error) {

      console.error(error.message);

      alert("Error actualizando negocio");

    } else {

      alert("Negocio actualizado ✨");

      router.push("/my-businesses");
    }
  };

  // ⏳ LOADING
  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Cargando negocio...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-orange-50 px-6 py-20">

      <div className="max-w-2xl mx-auto">

        <Card className="shadow-lg border rounded-3xl">

          <CardContent className="p-8">

            <h1 className="text-4xl font-bold mb-2">
              Editar negocio
            </h1>

            <p className="text-muted-foreground mb-8">
              Actualiza la información de tu negocio
            </p>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >

              {/* IMAGE */}
              {currentImage && (

                <img
                  src={currentImage}
                  alt="Business"
                  className="w-full h-56 object-cover rounded-2xl"
                />

              )}

              {/* NAME */}
              <Input
                name="name"
                placeholder="Nombre del negocio"
                value={form.name}
                onChange={handleChange}
              />

              {/* CATEGORY */}
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >

                <option value="">
                  Selecciona una categoría
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}

              </select>

              {/* ADDRESS */}
              <Input
                name="address"
                placeholder="Dirección"
                value={form.address}
                onChange={handleChange}
              />

              {/* PHONE */}
              <Input
                name="phone"
                placeholder="Teléfono"
                value={form.phone}
                onChange={handleChange}
              />

              {/* HOURS */}
              <Input
                name="hours"
                placeholder="Horario"
                value={form.hours}
                onChange={handleChange}
              />

              {/* DESCRIPTION */}
              <textarea
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />

              {/* 🌐 REDES SOCIALES */}
              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <h2 className="font-semibold text-lg">
                    Redes sociales
                  </h2>

                  <button
                    type="button"
                    onClick={addSocial}
                    className="text-sm text-orange-500 hover:underline"
                  >
                    + Agregar red
                  </button>

                </div>

                {socials.map((social, index) => (

                  <div
                    key={index}
                    className="grid grid-cols-2 gap-3"
                  >

                    <select
                      value={social.type}
                      onChange={(e) =>
                        handleSocialChange(
                          index,
                          "type",
                          e.target.value
                        )
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >

                      <option value="">
                        Tipo
                      </option>

                      <option value="facebook">
                        Facebook
                      </option>

                      <option value="instagram">
                        Instagram
                      </option>

                      <option value="tiktok">
                        TikTok
                      </option>

                      <option value="whatsapp">
                        WhatsApp
                      </option>

                      <option value="website">
                        Sitio web
                      </option>

                    </select>

                    <Input
                      placeholder="https://..."
                      value={social.url}
                      onChange={(e) =>
                        handleSocialChange(
                          index,
                          "url",
                          e.target.value
                        )
                      }
                    />

                  </div>

                ))}

              </div>

              {/* FILE */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                  if (e.target.files?.[0]) {

                    setImage(e.target.files[0]);
                  }
                }}
                className="w-full border rounded-xl p-3 bg-white"
              />

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                Guardar cambios
              </Button>

            </form>

          </CardContent>

        </Card>

      </div>

    </main>
  );
}