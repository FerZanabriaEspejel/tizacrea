import { NextResponse } from "next/server";

// Simulación de base de datos en memoria (luego se cambia por DB real)
let businesses: any[] = [];

export async function GET() {
  return NextResponse.json(businesses);
}

export async function POST(req: Request) {
  const data = await req.json();

  const newBusiness = {
    id: Date.now(),
    ...data,
  };

  businesses.push(newBusiness);

  return NextResponse.json(newBusiness);
}