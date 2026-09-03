"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/data/products";
import WindowFrame from "@/components/WindowFrame";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hasHoverImage = product.hover_image !== null;
  const displayImage = isHovered && hasHoverImage ? product.hover_image : product.image;

  return (
    <Link href={`/producto/${product.id}`}>
      <WindowFrame title={`${product.name}.jpg`} transparent={true}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="aspect-square flex items-center justify-center p-4 overflow-hidden">
            <img
              src={displayImage!}
              alt={product.name}
              className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
                isHovered && !hasHoverImage ? "scale-110" : "scale-100"
              }`}
            />
          </div>
          <div className="px-3 py-2 bg-[#ECE9D8] border-t border-[#ACA899]">
            <p className="text-center font-medium text-sm">{product.price.toFixed(2)} €</p>
          </div>
        </div>
      </WindowFrame>
    </Link>
  );
}