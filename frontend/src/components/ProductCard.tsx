import Link from "next/link"; //para hacer que toda la tarjeta sea un enlace clicable
import { Product } from "@/data/products"; //es el tipo que definimos en products.ts. Lo importamos para tipar las props

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/producto/${product.id}`} className="group">
      <div className="overflow-hidden bg-gray-100 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.price} €</p>
      </div>
    </Link>
  );
}