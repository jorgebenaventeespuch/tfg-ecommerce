import Link from "next/link";
import WindowFrame from "@/components/WindowFrame";

export default function ErrorPage() {
  return (
    <main className="max-w-2xl mx-auto px-8 py-8">
      <WindowFrame title="Payment Error - GUTZDEPT">
        <div className="p-8 text-center">
          <div className="text-5xl mb-4">✕</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Payment Error
          </h1>
          <p className="text-gray-700 mb-6">
            Something went wrong with your payment. Please try again or contact us.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/carrito"
              className="inline-block px-6 py-2 bg-[#ECE9D8] border border-[#ACA899] font-bold text-sm hover:bg-[#316AC5] hover:text-white transition-colors"
            >
              Back to Cart
            </Link>
            <Link
              href="/contacto"
              className="inline-block px-6 py-2 text-white font-bold text-sm"
              style={{
                background: "linear-gradient(180deg, #0A75FF 0%, #0054E3 40%, #0043B8 100%)",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </WindowFrame>
    </main>
  );
}