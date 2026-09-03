import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import SizeChart from "@/components/SizeChart";
import ImageGallery from "@/components/ImageGallery";
import WindowFrame from "@/components/WindowFrame";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos/${id}`, {
    cache: "no-store",
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
    <main className="max-w-6xl mx-auto px-8 py-8">
      <WindowFrame title={`${product.name} - Product Details`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Imagen con fondo blanco */}
          <div className="bg-white flex items-center justify-center p-6 border-r border-gray-200">
            <ImageGallery images={product.images} alt={product.name} />
          </div>

          {/* Info del producto con fondo blanco */}
          <div className="bg-white p-8">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl text-black mb-6">{product.price.toFixed(2)} €</p>

            <AddToCart product={product} />

            {product.description && (
              <p className="text-sm text-gray-700 mt-8 leading-relaxed">
                {product.description}
              </p>
            )}

            <SizeChart />
          </div>
        </div>
      </WindowFrame>
    </main>
  );
}