import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import "leaflet/dist/leaflet.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";

import { GoogleAnalytics } from "@next/third-parties/google";


export const metadata: Metadata = {
  title: "TizaCrea",
  description: "Plataforma de negocios locales",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="bg-background"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">

        <Navbar />

        {children}

        <Toaster richColors position="top-center" />

        <Footer />

      </body>

      <GoogleAnalytics gaId="G-JB9CN967M8" />

    </html>
  );
}