"use client"

import { useEffect, useState } from "react"

import { useRouter, useParams } from "next/navigation"

import { toast } from "sonner"

import { supabase } from "@/lib/supabase"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"

import LocationPicker from "@/components/LocationPicker"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
]

// 🇲🇽 DIAS EN ESPAÑOL
const daysInSpanish: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
}

export default function EditBusinessPage() {

  const router = useRouter()

  const params = useParams()

  const businessId = params.id

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [image, setImage] =
    useState<File | null>(null)

  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    description: "",
    image_url: "",
    street: "",
    external_number: "",
    internal_number: "",
    neighborhood: "",
    postal_code: "",
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
  })

  const [socials, setSocials] =
    useState([
      {
        type: "",
        url: "",
      },
    ])

  // 📦 FETCH BUSINESS
  useEffect(() => {

    async function fetchBusiness() {

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {

        router.push("/login")

        return
      }

      const { data, error } =
        await supabase
          .from("businesses")
          .select("*")
          .eq("id", businessId)
          .single()

      if (error || !data) {

        toast.error(
          "Negocio no encontrado"
        )

        router.push("/my-businesses")

        return
      }

      // 🔐 VALIDAR OWNER
      if (data.owner_id !== user.id) {

        toast.error(
          "No autorizado"
        )

        router.push("/my-businesses")

        return
      }

      setForm({
  name: data.name || "",
  category: data.category || "",
  address: data.address || "",
  phone: data.phone || "",
  description: data.description || "",
  image_url: data.image_url || "",

  street: data.street || "",
  external_number: data.external_number || "",
  internal_number: data.internal_number || "",
  neighborhood: data.neighborhood || "",
  postal_code: data.postal_code || "",
  google_maps_url: data.google_maps_url || "",

  lat: data.lat,
  lng: data.lng,

  business_hours: data.business_hours || form.business_hours,
})

      setSocials(
        data.socials?.length > 0
          ? data.socials
          : [
              {
                type: "",
                url: "",
              },
            ]
      )

      setLoading(false)
    }

    fetchBusiness()

  }, [businessId, router])

  // ✏️ HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    })
  }

  // 🌐 SOCIALS
  function handleSocialChange(
    index: number,
    field: string,
    value: string
  ) {

    const updated = [...socials]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setSocials(updated)
  }

  function addSocial() {

    setSocials([
      ...socials,
      {
        type: "",
        url: "",
      },
    ])
  }

  // 💾 UPDATE
  async function handleUpdate(
    e: React.FormEvent
  ) {

    e.preventDefault()

    setSaving(true)

    let imageUrl = form.image_url

    // 📸 NEW IMAGE
    if (image) {

      const fileName =
        `${Date.now()}-${image.name}`

      const { error: uploadError } =
        await supabase.storage
          .from("business-images")
          .upload(
            fileName,
            image
          )

      if (uploadError) {

        toast.error(
          "Error subiendo imagen"
        )

        setSaving(false)

        return
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("business-images")
        .getPublicUrl(fileName)

      imageUrl = publicUrl
    }

    // 🧹 FILTER SOCIALS
    const filteredSocials =
      socials.filter(
        (social) =>
          social.type.trim() !==
            "" &&
          social.url.trim() !== ""
      )

    // 💾 UPDATE DB
    const { error } =
      await supabase
        .from("businesses")
        .update({
          name: form.name,
          category:
            form.category,
          address:
            form.address,
          phone: form.phone,
          description:
            form.description,
            street: form.street,
external_number: form.external_number,
internal_number: form.internal_number,
neighborhood: form.neighborhood,
postal_code: form.postal_code,

google_maps_url: form.google_maps_url,

lat: form.lat,
lng: form.lng,

          image_url:
            imageUrl,

          socials:
            filteredSocials,

          business_hours:
            form.business_hours,
        })
        .eq("id", businessId)

    if (error) {

      console.error(
        error.message
      )

      toast.error(
        "Error actualizando negocio"
      )

    } else {

      toast.success(
        "Negocio actualizado ✨"
      )

      router.push(
        "/my-businesses"
      )
    }

    setSaving(false)
  }

  // ⏳ LOADING
  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <p className="text-muted-foreground">
          Cargando negocio...
        </p>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-orange-50 px-6 py-20">

      <div className="max-w-3xl mx-auto">

        <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">

          <CardContent className="p-8">

            <div className="mb-8">

              <h1 className="text-4xl font-bold">
                Editar negocio
              </h1>

              <p className="text-muted-foreground mt-2">
                Actualiza la información de tu negocio
              </p>

            </div>

            <form
              onSubmit={
                handleUpdate
              }
              className="space-y-6"
            >

              {/* NOMBRE */}
              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Nombre del negocio
                </label>

                <Input
                  name="name"
                  placeholder="Ej. Cafetería Central"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* CATEGORÍA */}
              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Categoría
                </label>

                <select
                  name="category"
                  value={
                    form.category
                  }
                  onChange={
                    handleChange
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >

                  <option value="">
                    Selecciona una categoría
                  </option>

                  {categories.map(
                    (cat) => (

                      <option
                        key={cat}
                        value={cat}
                      >
                        {cat}
                      </option>

                    )
                  )}

                </select>

              </div>

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

{form.google_maps_url && (

  <a
    href={form.google_maps_url}
    target="_blank"
    rel="noopener noreferrer"
  >

    <Button
      type="button"
      className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white"
    >
      📍 Abrir Google Maps
    </Button>

  </a>

)}



<Button
  type="button"
  className="w-full bg-orange-500 hover:bg-orange-600"
  onClick={() => {

    if (!navigator.geolocation) {

      toast.error(
        "Tu navegador no soporta geolocalización"
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setForm({
          ...form,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        toast.success(
          "Ubicación obtenida 📍"
        );

      },

      () => {

        toast.error(
          "No pudimos obtener tu ubicación"
        );

      }

    );

  }}
>
  📍 Usar mi ubicación actual
</Button>

{form.lat && form.lng && (

  <div className="space-y-3">

    <div className="bg-green-50 border border-green-200 rounded-xl p-3">

      <p className="text-green-700 font-medium">
        ✅ Ubicación obtenida correctamente
      </p>

      <p className="text-sm text-green-600 mt-1">
        Arrastra el marcador si deseas ajustar la ubicación exacta.
      </p>

    </div>

    <LocationPicker
      lat={form.lat}
      lng={form.lng}
      onChange={(lat, lng) => {

        setForm({
          ...form,
          lat,
          lng,
        });

      }}
    />

  </div>

)}

              {/* DIRECCIÓN */}
              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Dirección
                </label>

                <Input
                  name="address"
                  placeholder="Ej. Calle Hidalgo #45"
                  value={
                    form.address
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* TELÉFONO */}
              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Teléfono
                </label>

                <Input
                  name="phone"
                  placeholder="Ej. 7711234567"
                  value={form.phone}
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* DESCRIPCIÓN */}
              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Descripción
                </label>

                <textarea
                  name="description"
                  placeholder="Describe tu negocio..."
                  value={
                    form.description
                  }
                  onChange={
                    handleChange
                  }
                  className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />

              </div>

              {/* HORARIOS */}
              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-semibold">
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
                        Editar horarios
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
                          (
                            [
                              day,
                              schedule,
                            ]: any
                          ) => (

                            <div
                              key={day}
                              className="border rounded-2xl p-4 space-y-3"
                            >

                              <div className="flex items-center justify-between">

                                <h3 className="font-medium">
                                  {daysInSpanish[day]}
                                </h3>

                                <label className="flex items-center gap-2 text-sm">

                                  <input
                                    type="checkbox"
                                    checked={
                                      schedule.closed
                                    }
                                    onChange={(
                                      e
                                    ) => {

                                      setForm(
                                        {
                                          ...form,

                                          business_hours:
                                            {
                                              ...form.business_hours,

                                              [day]:
                                                {
                                                  ...schedule,

                                                  closed:
                                                    e.target.checked,
                                                },
                                            },
                                        }
                                      )
                                    }}
                                  />

                                  Cerrado

                                </label>

                              </div>

                              {!schedule.closed && (

                                <div className="grid grid-cols-2 gap-3">

                                  <div>

                                    <label className="text-sm text-muted-foreground">
                                      Apertura
                                    </label>

                                    <Input
                                      type="time"
                                      value={
                                        schedule.open
                                      }
                                      onChange={(
                                        e
                                      ) => {

                                        setForm(
                                          {
                                            ...form,

                                            business_hours:
                                              {
                                                ...form.business_hours,

                                                [day]:
                                                  {
                                                    ...schedule,

                                                    open:
                                                      e.target.value,
                                                  },
                                              },
                                          }
                                        )
                                      }}
                                    />

                                  </div>

                                  <div>

                                    <label className="text-sm text-muted-foreground">
                                      Cierre
                                    </label>

                                    <Input
                                      type="time"
                                      value={
                                        schedule.close
                                      }
                                      onChange={(
                                        e
                                      ) => {

                                        setForm(
                                          {
                                            ...form,

                                            business_hours:
                                              {
                                                ...form.business_hours,

                                                [day]:
                                                  {
                                                    ...schedule,

                                                    close:
                                                      e.target.value,
                                                  },
                                              },
                                          }
                                        )
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

                {/* PREVIEW */}
                <div className="bg-muted rounded-2xl p-4 space-y-2">

                  {Object.entries(
                    form.business_hours
                  ).map(
                    (
                      [
                        day,
                        schedule,
                      ]: any
                    ) => (

                      <div
                        key={day}
                        className="flex justify-between text-sm"
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

                    )
                  )}

                </div>

              </div>

              {/* SOCIALS */}
              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <h2 className="text-xl font-semibold">
                    Redes sociales
                  </h2>

                  <button
                    type="button"
                    onClick={
                      addSocial
                    }
                    className="text-sm text-orange-500 hover:underline"
                  >
                    + Agregar red
                  </button>

                </div>

                {socials.map(
                  (
                    social,
                    index
                  ) => (

                    <div
                      key={index}
                      className="grid md:grid-cols-2 gap-3"
                    >

                      <select
                        value={
                          social.type
                        }
                        onChange={(
                          e
                        ) =>
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
                        value={
                          social.url
                        }
                        onChange={(
                          e
                        ) =>
                          handleSocialChange(
                            index,
                            "url",
                            e.target.value
                          )
                        }
                      />

                    </div>

                  )
                )}

              </div>

              {/* IMAGE */}
              <div className="space-y-3">

                <label className="text-sm font-medium">
                  Imagen del negocio
                </label>

                {form.image_url && (

                  <img
                    src={
                      form.image_url
                    }
                    alt="Business"
                    className="w-full h-60 object-cover rounded-2xl"
                  />

                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(
                    e
                  ) => {

                    if (
                      e.target.files &&
                      e.target.files[0]
                    ) {

                      setImage(
                        e.target.files[0]
                      )
                    }
                  }}
                  className="w-full border rounded-xl p-3 bg-white"
                />

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 pt-4">

                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1"
                >
                  {saving
                    ? "Guardando..."
                    : "Guardar cambios"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    router.push(
                      "/my-businesses"
                    )
                  }
                >
                  Cancelar
                </Button>

              </div>

            </form>

          </CardContent>

        </Card>

      </div>

    </main>
  )
}