"use client";

import { supabase } from "@/lib/supabase";

import { toast } from "sonner";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export default function RegisterBusinessPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    street: "",
    external_number: "",
    internal_number: "",
    neighborhood: "",
    postal_code: "",
    phone: "",
    description: "",
    google_maps_url: "",

     lat: null as number | null,
  lng: null as number | null,

    business_hours: {

      monday: {
        open: "",
        close: "",
        closed: false,
      },

      tuesday: {
        open: "",
        close: "",
        closed: false,
      },

      wednesday: {
        open: "",
        close: "",
        closed: false,
      },

      thursday: {
        open: "",
        close: "",
        closed: false,
      },

      friday: {
        open: "",
        close: "",
        closed: false,
      },

      saturday: {
        open: "",
        close: "",
        closed: false,
      },

      sunday: {
        open: "",
        close: "",
        closed: true,
      },
    },
  });

  const [image, setImage] = useState<File | null>(null);

 const [socials, setSocials] = useState([
  {
    type: "",
    url: "",
  },
]);


async function getCoordinates(address: string) {

  try {

const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}&countrycodes=mx&limit=1`
);

const data = await response.json();

console.log("Dirección enviada:", address);
console.log("Respuesta Nominatim:", data);

if (data.length > 0) {

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };

}

console.log(
  "Intentando búsqueda simplificada..."
);

const fallback = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    `${form.neighborhood}, Tizayuca, Hidalgo, México`
  )}&countrycodes=mx&limit=1`
);

const fallbackData =
  await fallback.json();

console.log(
  "Fallback:",
  fallbackData
);

if (fallbackData.length > 0) {

  return {
    lat: parseFloat(
      fallbackData[0].lat
    ),
    lng: parseFloat(
      fallbackData[0].lon
    ),
  };

}

return null;

  } catch (error) {

    console.error(error);

    return null;

  }
}

// 🔐 CHECK USER
useEffect(() => {

  const checkUser = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

    } else {

      setLoading(false);

    }
  };

  checkUser();

}, [router]);

  // ✏️ HANDLE INPUTS
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🌐 SOCIALS
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

  // 🚀 SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
  !form.name ||
  !form.category ||
  !form.street ||
  !form.external_number ||
  !form.neighborhood
) {

      alert("Completa los campos obligatorios");

      return;
    }

    // 🔐 USER
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      alert("Debes iniciar sesión");

      router.push("/login");

      return;
    }

    // 📸 IMAGE
    let imageUrl = "";

    if (image) {

      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } =
        await supabase.storage
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

const fullAddress = [
  `${form.street} ${form.external_number}`,
  form.neighborhood,
  "Tizayuca",
  "Hidalgo",
  "México",
]
.filter(Boolean)
.join(", ");

    // 📍 OBTENER COORDENADAS
let coordinates = null

if (fullAddress) {

coordinates = await getCoordinates(
  fullAddress
)

console.log(
  "Dirección:",
  fullAddress
)
console.log(
  "Coordenadas:",
  coordinates
)

}

    // 🧹 FILTRAR REDES
    const filteredSocials = socials.filter(
      (social) =>
        social.type.trim() !== "" &&
        social.url.trim() !== ""
    );

    // 💾 INSERT
  const { error } = await supabase
  .from("businesses")
  .insert([
    {
  owner_id: user.id,

  name: form.name,
  category: form.category,
  address: fullAddress,
  phone: form.phone,
  description: form.description,

  business_hours: form.business_hours,
  socials: filteredSocials,
  image_url: imageUrl,

  google_maps_url: form.google_maps_url,

  lat:
    form.lat ??
    coordinates?.lat ??
    null,

  lng:
    form.lng ??
    coordinates?.lng ??
    null,
},
  ]);

   if (error) {

  console.error(error.message);

  toast.error(
    "Error al registrar negocio"
  );

} else {

  toast.success(
    "Negocio registrado correctamente 🎉"
  );

  setTimeout(() => {
    router.push("/my-businesses");
  }, 1200);

}

};


// ⏳ LOADING
  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <p className="text-muted-foreground">
          Verificando sesión...
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-orange-50">

      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-28 pb-12 text-center">

        <h1 className="text-4xl font-bold text-foreground">
          Registrar negocio
        </h1>

        <p className="text-muted-foreground mt-2">
          Agrega tu negocio y hazlo visible para toda la comunidad
        </p>

      </section>

      {/* FORM */}
      <section className="max-w-2xl mx-auto px-6 pb-20">

        <Card className="border-border/50 shadow-lg">

          <CardContent className="p-6 space-y-4">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}
              <Input
                name="name"
                placeholder="Nombre del negocio *"
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
                  Selecciona una categoría *
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
  name="street"
  placeholder="Calle *"
  value={form.street}
  onChange={handleChange}
/>

<div className="grid grid-cols-2 gap-3">

  <Input
    name="external_number"
    placeholder="Número exterior *"
    value={form.external_number}
    onChange={handleChange}
  />

  <Input
    name="internal_number"
    placeholder="Número interior"
    value={form.internal_number}
    onChange={handleChange}
  />

</div>

<Input
  name="neighborhood"
  placeholder="Colonia *"
  value={form.neighborhood}
  onChange={handleChange}
/>

<Input
  name="postal_code"
  placeholder="Código Postal"
  value={form.postal_code}
  onChange={handleChange}
/>

<Input
  name="google_maps_url"
  placeholder="Link de Google Maps (opcional)"
  value={form.google_maps_url}
  onChange={handleChange}
/>

<p className="text-xs text-muted-foreground">
  Google Maps → Compartir → Copiar enlace → Pegar aquí
</p>


<Button
  type="button"
  variant="outline"
  onClick={async () => {

const fullAddress = [
  `${form.street} ${form.external_number}`,
  form.internal_number,
  form.neighborhood,
  form.postal_code,
  "Tizayuca",
  "Hidalgo",
  "México",
]
.filter(Boolean)
.join(", ");

if (
  !form.street ||
  !form.external_number ||
  !form.neighborhood
) {

  toast.error(
    "Completa calle, número y colonia"
  );

  return;
}

console.log("FULL ADDRESS:", fullAddress);

const coords =
  await getCoordinates(
    fullAddress
  );

    if (!coords) {

      toast.error(
        "No se encontró la ubicación"
      );

      return;
    }

    setForm({
      ...form,
      lat: coords.lat,
      lng: coords.lng,
    });

    toast.success(
      "Ubicación encontrada 📍"
    );

  }}
>
  📍 Buscar ubicación
</Button>

{form.lat && form.lng && (

  <div className="text-sm bg-green-50 border border-green-200 rounded-xl p-3">

    <p className="font-medium text-green-700">
      Ubicación encontrada
    </p>

    <p className="text-green-600">
      Lat: {form.lat}
    </p>

    <p className="text-green-600">
      Lng: {form.lng}
    </p>

  </div>

)}

              {/* PHONE */}
              <Input
                name="phone"
                placeholder="Teléfono"
                value={form.phone}
                onChange={handleChange}
              />

              {/* HORARIOS */}
              <div className="space-y-3">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="font-semibold text-lg">
                      Horarios
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Configura horarios por día
                    </p>

                  </div>

                  <Dialog>

                    <DialogTrigger asChild>

                      <Button
                        type="button"
                        variant="outline"
                      >
                        Configurar horarios
                      </Button>

                    </DialogTrigger>

                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">

                      <DialogHeader>

                        <DialogTitle>
                          Horarios del negocio
                        </DialogTitle>

                      </DialogHeader>

                      <div className="space-y-5 mt-4">

                        {Object.entries(
                          form.business_hours
                        ).map(
                          ([day, schedule]: any) => (

                            <div
                              key={day}
                              className="border rounded-2xl p-4 space-y-3"
                            >

                              <div className="flex items-center justify-between">

                                <h3 className="font-medium capitalize">
                                  {day}
                                </h3>

                                <label className="flex items-center gap-2 text-sm">

                                  <input
                                    type="checkbox"
                                    checked={schedule.closed}
                                    onChange={(e) => {

                                      setForm({
                                        ...form,

                                        business_hours: {
                                          ...form.business_hours,

                                          [day]: {
                                            ...schedule,
                                            closed: e.target.checked,
                                          },
                                        },
                                      });

                                    }}
                                  />

                                  Cerrado

                                </label>

                              </div>

                              {!schedule.closed && (

                                <div className="grid grid-cols-2 gap-3">

                                  <div className="space-y-1">

                                    <label className="text-sm text-muted-foreground">
                                      Apertura
                                    </label>

                                    <Input
                                      type="time"
                                      value={schedule.open}
                                      onChange={(e) => {

                                        setForm({
                                          ...form,

                                          business_hours: {
                                            ...form.business_hours,

                                            [day]: {
                                              ...schedule,
                                              open: e.target.value,
                                            },
                                          },
                                        });

                                      }}
                                    />

                                  </div>

                                  <div className="space-y-1">

                                    <label className="text-sm text-muted-foreground">
                                      Cierre
                                    </label>

                                    <Input
                                      type="time"
                                      value={schedule.close}
                                      onChange={(e) => {

                                        setForm({
                                          ...form,

                                          business_hours: {
                                            ...form.business_hours,

                                            [day]: {
                                              ...schedule,
                                              close: e.target.value,
                                            },
                                          },
                                        });

                                      }}
                                    />

                                  </div>

                                </div>

                              )}

                            </div>

                          )
                        )}

                      </div>

                    </DialogContent>

                  </Dialog>

                </div>

              </div>

              {/* DESCRIPTION */}
              <textarea
                name="description"
                placeholder="Descripción del negocio"
                value={form.description}
                onChange={handleChange}
                className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />

              {/* REDES */}
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
                    className="grid md:grid-cols-2 gap-3"
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
                      placeholder="Pega el link"
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

              {/* IMAGE */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                  if (
                    e.target.files &&
                    e.target.files[0]
                  ) {

                    setImage(
                      e.target.files[0]
                    );
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
                Registrar negocio
              </Button>

            </form>

          </CardContent>

        </Card>

      </section>

    </main>
  );
} 