import ProductList from "@/components/ProductList";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="max-w-6xl mx-auto px-8 py-8">
      <ProductList products={products} />
    </main>
  );
}