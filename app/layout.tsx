import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}