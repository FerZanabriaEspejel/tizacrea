"use client"

import { MapPin } from "lucide-react"

const footerLinks = [
  { label: "Explorar", href: "#" },
  { label: "Negocios", href: "#" },
  { label: "Contacto", href: "#" },
  { label: "Términos", href: "#" },
]

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-card border-t border-border/50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">TizaCrea</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Conectando comunidades, fortaleciendo negocios
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TizaCrea. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
