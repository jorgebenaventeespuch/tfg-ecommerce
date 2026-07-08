"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState(""); //lo que el usuario ha escrito en el buscador. Empieza vacío
  const [selectedCategory, setSelectedCategory] = useState<string>("todas"); //la categoría seleccionada. Empieza con "todas" que significa "no filtrar"

  const categories = ["todas", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "todas" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase() //para que la búsqueda no distinga mayúsculas/minúsculas.
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md border border-gray-300 px-4 py-2 focus:border-black outline-none"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm border transition-colors capitalize ${
                selectedCategory === category
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 py-12 text-center">
          No se han encontrado productos con esos criterios.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}