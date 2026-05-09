"use client";

import { Navbar } from "@/components/Navbar"
import { useState } from "react";
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
  "Otro"
];

export default function RegisterBusinessPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    hours: "",
    description: "",
    facebook: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.address) {
      alert("Completa los campos obligatorios");
      return;
    }

    console.log("Negocio registrado:", form);

    alert("Negocio registrado correctamente");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-orange-50">
      <Navbar />

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
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NOMBRE */}
              <Input
                name="name"
                placeholder="Nombre del negocio *"
                value={form.name}
                onChange={handleChange}
                className="bg-background"
              />

              {/* CATEGORÍA */}
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Selecciona una categoría *</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* DIRECCIÓN */}
              <Input
                name="address"
                placeholder="Dirección *"
                value={form.address}
                onChange={handleChange}
                className="bg-background"
              />

              {/* TELÉFONO */}
              <Input
                name="phone"
                placeholder="Teléfono"
                value={form.phone}
                onChange={handleChange}
                className="bg-background"
              />

              {/* HORARIO */}
              <Input
                name="hours"
                placeholder="Horario (ej. 9am - 8pm)"
                value={form.hours}
                onChange={handleChange}
                className="bg-background"
              />

              {/* DESCRIPCIÓN */}
              <textarea
                name="description"
                placeholder="Descripción del negocio"
                value={form.description}
                onChange={handleChange}
                className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />

              {/* FACEBOOK */}
              <Input
                name="facebook"
                placeholder="Link de Facebook"
                value={form.facebook}
                onChange={handleChange}
                className="bg-background"
              />

              {/* BOTÓN */}
              <Button type="submit" className="w-full" size="lg">
                Registrar negocio
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
