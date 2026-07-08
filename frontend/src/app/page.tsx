import ProductList from "@/components/ProductList";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className="px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Catálogo</h1>

      <ProductList products={products} />
    </main>
  );
}