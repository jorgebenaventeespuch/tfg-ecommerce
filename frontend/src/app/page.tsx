import ProductList from "@/components/ProductList";

async function getProducts() {
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos`, {    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Catálogo</h1>

      <ProductList products={products} />
    </main>
  );
}