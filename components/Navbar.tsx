"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">TizaCrea</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition"
            >
              Inicio
            </Link>

            <Link
              href="/businesses"
              className="text-foreground hover:text-primary transition"
            >
              Negocios
            </Link>

            <Link
              href="/register-business"
              className="text-foreground hover:text-primary transition"
            >
              Registrar negocio
            </Link>

            <Link
              href="/about"
              className="text-foreground hover:text-primary transition"
            >
              Sobre nosotros
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* MOBILE LINKS */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4 text-sm font-medium">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>

              <Link
                href="/businesses"
                className="text-foreground hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Negocios
              </Link>

              <Link
                href="/register-business"
                className="text-foreground hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Registrar negocio
              </Link>

              <Link
                href="/about"
                className="text-foreground hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre nosotros
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
