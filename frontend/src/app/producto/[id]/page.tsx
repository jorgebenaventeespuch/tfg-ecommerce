import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos/${id}`, {    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProductoDetallePage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="bg-gray-100 aspect-[3/4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-6">{product.price} €</p>
          <p className="text-sm text-gray-500 mb-6">Categoría: {product.category}</p>

          <AddToCart product={product} />
        </div>
      </div>
    </main>
  );
}