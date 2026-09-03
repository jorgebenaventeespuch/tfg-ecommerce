"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header>
      {/* Banner superior como barra de título de Windows */}
      <div
        className="text-white text-center py-2 text-sm font-bold tracking-wide"
        style={{
          background: "linear-gradient(180deg, #0A75FF 0%, #0054E3 40%, #0043B8 100%)",
        }}
      >
        Fast Shipping 48 - 72h
      </div>

      {/* Barra de navegación como menú de Windows */}
      <nav className="bg-[#ECE9D8] border-b border-[#ACA899] px-4 py-2">
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logoGestrella.png"
              alt="GUTZDEPT"
              className="h-12 w-auto"
            />
            <span className="font-bold text-lg hidden md:block">GUTZDEPT</span>
          </Link>

          {/* Links estilo menú Windows */}
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-1 hover:bg-[#316AC5] hover:text-white transition-colors rounded-sm text-sm"
            >
              Shop
            </Link>
            <Link
              href="/archive"
              className="px-4 py-1 hover:bg-[#316AC5] hover:text-white transition-colors rounded-sm text-sm"
            >
              Archive
            </Link>
            <Link
              href="/about"
              className="px-4 py-1 hover:bg-[#316AC5] hover:text-white transition-colors rounded-sm text-sm"
            >
              About
            </Link>
            <Link
              href="/contacto"
              className="px-4 py-1 hover:bg-[#316AC5] hover:text-white transition-colors rounded-sm text-sm"
            >
              Contact
            </Link>

            {/* Carrito */}
            <Link href="/carrito" className="relative ml-4 px-3 py-1 bg-[#D4D0C8] border border-[#ACA899] rounded-sm hover:bg-[#316AC5] hover:text-white transition-colors">
              <span className="text-sm">🛒 Cart</span>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}