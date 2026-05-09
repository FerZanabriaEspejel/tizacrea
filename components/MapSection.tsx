"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

type Business = {
  id: number;
  name: string;
  category: string;
  colonia: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  hours: string;
  description: string;
  facebook: string;
};

type MapSectionProps = {
  businesses: Business[];
};

export default function MapSection({
  businesses,
}: MapSectionProps) {
  return (
    <div className="mt-10">
      <Map businesses={businesses} />
    </div>
  );
}