"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function AddToCart({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div>
      <p className="mb-2 font-medium">Talla</p>
      <div className="flex gap-2 mb-6">
        {product.sizes.map((size) => (
          <button
            key={size}
            onClick={() => {
              console.log("Talla clickada:", size);
              setSelectedSize(size);
            }}
            className={`border px-4 py-2 transition-colors ${
            selectedSize === size
            ? "border-black bg-black text-white"
            : "border-gray-300 hover:border-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          console.log("Click añadir, talla:", selectedSize);
          if (!selectedSize) {
            alert("Selecciona una talla");
            return;
          }
          addItem(product, selectedSize);
          alert(`Añadido: ${product.name} (${selectedSize})`);
        }}
        className="w-full bg-black text-white py-3"
      >
        Añadir al carrito
      </button>
    </div>
  );
}