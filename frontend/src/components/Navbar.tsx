"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  // Leer el número total de items del carrito
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header>
      {/* Banner superior negro */}
      <div className="bg-black text-white text-center py-2 text-sm font-bold tracking-wide">
        Fast Shipping 48 - 72h
      </div>

      {/* Barra de navegación principal */}
      <nav className="flex items-center justify-between max-w-6xl mx-auto w-full px-8 py-8">
        {/* Logo a la izquierda */}
        <Link href="/">
          <img
            src="/logoGestrella.png"
            alt="GUTZDEPT"
            className="h-20 w-auto"
          />
        </Link>

        {/* Links de navegación + carrito a la derecha */}
        <div className="flex items-center gap-8">
          <ul className="flex gap-8 text-lg font-medium">
            <li>
              <Link href="/" className="hover:opacity-60 transition-opacity">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/archive" className="hover:opacity-60 transition-opacity">
                Archive
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:opacity-60 transition-opacity">
                About
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:opacity-60 transition-opacity">
                Contact
              </Link>
            </li>
          </ul>

          {/* Icono de carrito */}
          <Link href="/carrito" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.002-.935 1.856-2.048l-.93-6.672A2.25 2.25 0 0 0 16.653 3H7.106m0 0-.383-1.437A1.125 1.125 0 0 0 5.636 .5H2.25M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {/* Contador de items */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}