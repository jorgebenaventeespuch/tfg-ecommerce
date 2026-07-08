"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
      <Link href="/" className="text-xl font-bold">
        GUTZDEPT
      </Link>

      <ul className="flex gap-6">
        <li>
          <Link href="/">Tienda</Link>
        </li>
        <li>
          <Link href="/archive">Archive</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contacto">Contacto</Link>
        </li>
      </ul>

      <Link href="/carrito">Carrito ({totalItems})</Link>
    </nav>
  );
}