"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {

    const getUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }

    getUser()

  }, [])

  const handleLogout = async () => {

    await supabase.auth.signOut()

    window.location.href = "/"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">

      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">

            <span className="text-2xl font-bold text-primary">
              TizaCrea
            </span>

          </Link>

          {/* DESKTOP */}
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
  href="/map"
  className="text-foreground hover:text-primary transition"
>
  Mapa
</Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition"
            >
              Sobre nosotros
            </Link>

            {!user ? (

              <>

                <Link
                  href="/login"
                  className="text-foreground hover:text-primary transition"
                >
                  Iniciar sesión
                </Link>

                <Link
                  href="/register"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Crear cuenta
                </Link>

              </>

            ) : (

              <>

                <Link
                  href="/dashboard"
                  className="text-foreground hover:text-primary transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  Cerrar sesión
                </button>

              </>

            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >

            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}

          </button>

        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (

          <div className="md:hidden py-4 border-t border-border">

            <div className="flex flex-col gap-4 text-sm font-medium">

              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-primary transition"
              >
                Inicio
              </Link>

              <Link
                href="/businesses"
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-primary transition"
              >
                Negocios
              </Link>

<Link
  href="/map"
  onClick={() => setIsMenuOpen(false)}
  className="text-foreground hover:text-primary transition"
>
  Mapa
</Link>

              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-primary transition"
              >
                Sobre nosotros
              </Link>

              {!user ? (

                <>

                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground hover:text-primary transition"
                  >
                    Iniciar sesión
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center"
                  >
                    Crear cuenta
                  </Link>

                </>

              ) : (

                <>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground hover:text-primary transition"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left text-red-500 hover:text-red-600 transition"
                  >
                    Cerrar sesión
                  </button>

                </>

              )}

            </div>

          </div>

        )}

      </div>

    </nav>
  )
}