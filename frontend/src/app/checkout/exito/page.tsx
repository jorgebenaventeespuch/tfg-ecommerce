import Link from "next/link";
import WindowFrame from "@/components/WindowFrame";

export default function ExitoPage() {
  return (
    <main className="max-w-2xl mx-auto px-8 py-8">
      <WindowFrame title="Order Confirmed - GUTZDEPT">
        <div className="p-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-[#2D7E2D] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-700 mb-6">
            Your payment has been processed successfully. You will receive a confirmation email shortly.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-2 text-white font-bold text-sm"
            style={{
              background: "linear-gradient(180deg, #3B8F3B 0%, #2D7E2D 50%, #1E6B1E 100%)",
            }}
          >
            Back to Shop
          </Link>
        </div>
      </WindowFrame>
    </main>
  );
}