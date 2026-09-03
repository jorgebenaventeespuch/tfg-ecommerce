"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import WindowFrame from "@/components/WindowFrame";

export default function CarritoPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-8 py-8">
        <WindowFrame title="Your Cart - GUTZDEPT">
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <p className="text-gray-600 mb-6">Your cart is empty.</p>
            <Link
              href="/"
              className="inline-block px-6 py-2 text-white text-sm font-bold"
              style={{
                background: "linear-gradient(180deg, #3B8F3B 0%, #2D7E2D 50%, #1E6B1E 100%)",
              }}
            >
              Go to Shop
            </Link>
          </div>
        </WindowFrame>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-8">
      <WindowFrame title="Your Cart - GUTZDEPT">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

          {/* Cabecera de la tabla */}
          <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-300 pb-2 mb-4 text-sm font-bold bg-[#ECE9D8] -mx-6 px-6 py-2">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Items del carrito */}
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-200 py-4"
            >
              {/* Producto */}
              <div className="col-span-6 flex items-center gap-4">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-50 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm">{item.product.name}</p>
                  <p className="text-gray-500 text-xs">Size: {item.size}</p>
                </div>
              </div>

              {/* Precio */}
              <div className="col-span-2 text-center text-sm">
                {item.product.price.toFixed(2)} €
              </div>

              {/* Cantidad */}
              <div className="col-span-2 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.size, item.quantity - 1)
                  }
                  className="w-7 h-7 bg-[#ECE9D8] border border-[#ACA899] text-sm font-bold hover:bg-[#316AC5] hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="text-sm w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.size, item.quantity + 1)
                  }
                  className="w-7 h-7 bg-[#ECE9D8] border border-[#ACA899] text-sm font-bold hover:bg-[#316AC5] hover:text-white transition-colors"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.product.id, item.size)}
                  className="ml-2 text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              </div>

              {/* Total */}
              <div className="col-span-2 text-right font-bold text-sm">
                {(item.product.price * item.quantity).toFixed(2)} €
              </div>
            </div>
          ))}

          {/* Total y botón de checkout */}
          <div className="mt-6 border-t border-gray-300 pt-4">
            <div className="flex justify-end items-center gap-8">
              <span className="text-lg font-bold">
                Subtotal: {getTotalPrice().toFixed(2)} €
              </span>
              <Link
                href="/checkout"
                className="px-8 py-2 text-white font-bold text-sm"
                style={{
                  background: "linear-gradient(180deg, #3B8F3B 0%, #2D7E2D 50%, #1E6B1E 100%)",
                }}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </WindowFrame>
    </main>
  );
}