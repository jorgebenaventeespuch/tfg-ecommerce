"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CarritoPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  if (items.length === 0) {
    return (
      <main className="px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">Carrito</h1>
        <p className="text-gray-600 mb-6">Tu carrito está vacío.</p>
        <Link href="/" className="underline">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="px-8 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Carrito</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.size}`}
            className="flex gap-4 border-b border-gray-200 pb-4"
          >
            <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Talla: {item.size}</p>
              <p className="text-sm">{item.product.price} €</p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.size, item.quantity - 1)
                  }
                  className="border border-gray-300 px-2 py-1 hover:border-black"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.size, item.quantity + 1)
                  }
                  className="border border-gray-300 px-2 py-1 hover:border-black"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.product.id, item.size)}
                  className="ml-4 text-sm text-gray-500 underline"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-medium">
                {(item.product.price * item.quantity).toFixed(2)} €
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-xl font-bold mb-6">
          <span>Total</span>
          <span>{getTotalPrice().toFixed(2)} €</span>
        </div>

        <Link
          href="/checkout"
          className="block w-full bg-black text-white text-center py-3 hover:bg-gray-800 transition-colors"
        >
          Ir al checkout
        </Link>
      </div>
    </main>
  );
}