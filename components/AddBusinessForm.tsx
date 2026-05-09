"use client";

import { useState } from "react";

export default function AddBusinessForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    colonia: "",
    address: "",
    phone: "",
    hours: "",
    description: "",
    facebook: "",
    lat: "",
    lng: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/businesses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          lat: Number(formData.lat),
          lng: Number(formData.lng),
        }),
      }
    );

    if (response.ok) {
      alert("Negocio agregado 🚀");

      window.location.reload();
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-10"
    >
      <h2 className="text-2xl font-bold mb-6">
        Agregar negocio
      </h2>

      <div className="grid gap-4">

        <input
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="category"
          placeholder="Categoría"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="colonia"
          placeholder="Colonia"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="address"
          placeholder="Dirección"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="phone"
          placeholder="Teléfono"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="hours"
          placeholder="Horario"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="description"
          placeholder="Descripción"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="facebook"
          placeholder="Facebook"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="lat"
          placeholder="Latitud"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="lng"
          placeholder="Longitud"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium"
        >
          Guardar negocio
        </button>

      </div>
    </form>
  );
}