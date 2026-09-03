"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function Footer() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50">
      {/* Iconos flotando por encima de la barra */}
      <div className="flex items-end justify-center gap-6 pb-1 pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-200"
          title="Shop"
        >
          <img src="/iconoshop.png" alt="Shop" className="h-18 w-18 drop-shadow-xl translate-y-1" />
        </Link>

        <Link
          href="/archive"
          className="pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-200"
          title="Archive"
        >
          <img
            src="/iconocarpeta.png"
            alt="Archive"
            className="h-12 w-12 drop-shadow-xl"
          />
        </Link>

        <a
          href="https://www.instagram.com/gutzdept/"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-200"
          title="Instagram"
        >
          <img
            src="/iconoinstagram.png"
            alt="Instagram"
            className="h-16 w-16 drop-shadow-xl"
          />
        </a>

        <Link
          href="/contacto"
          className="pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-200"
          title="Contact"
        >
          <img
            src="/iconocorreo.png"
            alt="Contact"
            className="h-16 w-16 drop-shadow-xl"
          />
        </Link>

        <Link
          href="/carrito"
          className="pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-200 relative"
          title="Cart"
        >
          <img
            src="/iconocarrito.png"
            alt="Cart"
            className="h-16 w-16 drop-shadow-xl"
          />

          {mounted && totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Barra fina de Windows */}
      <div
        className="flex items-center justify-between px-3 py-1"
        style={{
          background:
            "linear-gradient(180deg, #3168D5 0%, #1941A5 100%)",
        }}
      >
        {/* Botón Start */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-1 rounded-r-xl font-bold text-white text-sm"
          style={{
            background:
              "linear-gradient(180deg, #3B8F3B 0%, #2D7E2D 50%, #1E6B1E 100%)",
          }}
        >
          <img
            src="/logoGestrella.png"
            alt=""
            className="h-5 w-auto brightness-0 invert"
          />
          start
        </Link>

        {/* Reloj */}
        <div className="text-white text-xs font-bold bg-[#1B5AB5] border-l border-[#1848A0] px-4 py-1">
          {time || "00:00"}
        </div>
      </div>
    </footer>
  );
}