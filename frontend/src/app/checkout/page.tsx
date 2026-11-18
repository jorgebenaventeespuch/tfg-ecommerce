"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import WindowFrame from "@/components/WindowFrame";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    pais: "España",
    telefono: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const orderData = {
      customer_name: `${formData.nombre} ${formData.apellidos}`,
      customer_email: formData.email,
      customer_phone: formData.telefono,
      address: `${formData.direccion}, ${formData.codigoPostal} ${formData.ciudad}`,
      city: formData.ciudad,
      postal_code: formData.codigoPostal,
      country: formData.pais,
      items: items.map((item) => ({
        product_id: item.product.id,
        size: item.size,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/crear-sesion-pago`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const data = await res.json();
        clearCart();
        window.location.href = data.url;
      } else {
        router.push("/checkout/error");
      }
    } catch {
      router.push("/checkout/error");
    }

    setSending(false);
  };

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-8 py-8">
        <WindowFrame title="Checkout - GUTZDEPT">
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <p className="text-gray-600">
              Your cart is empty. Add products before checkout.
            </p>
          </div>
        </WindowFrame>
      </main>
    );
  }

  const inputStyle = "w-full bg-white border border-[#ACA899] px-3 py-2 text-sm focus:border-[#316AC5] outline-none";

  return (
    <main className="max-w-6xl mx-auto px-8 py-8">
      <WindowFrame title="Checkout - GUTZDEPT">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-bold text-sm bg-[#ECE9D8] px-3 py-2 border-b border-[#ACA899]">
                Shipping Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">First Name</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Last Name</label>
                  <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required className={inputStyle} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Address</label>
                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required className={inputStyle} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">City</label>
                  <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required className={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Postal Code</label>
                  <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} required className={inputStyle} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Country</label>
                <select name="pais" value={formData.pais} onChange={handleChange} required className={inputStyle}>
                  <option value="España">Spain</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Francia">France</option>
                  <option value="Italia">Italy</option>
                  <option value="Alemania">Germany</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Phone</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className={inputStyle} />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 text-white font-bold text-sm mt-4 disabled:opacity-50"
                style={{
                  background: "linear-gradient(180deg, #3B8F3B 0%, #2D7E2D 50%, #1E6B1E 100%)",
                }}
              >
                {sending ? "Processing..." : `Pay ${getTotalPrice().toFixed(2)} €`}
              </button>
            </form>

            {/* Resumen del pedido */}
            <div>
              <h2 className="font-bold text-sm bg-[#ECE9D8] px-3 py-2 border-b border-[#ACA899]">
                Order Summary
              </h2>

              <div className="space-y-4 mt-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-3 text-sm"
                  >
                    <div className="w-16 h-20 bg-gray-50 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{item.product.name}</p>
                      <p className="text-gray-500 text-xs">
                        Size {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4 space-y-2 bg-[#ECE9D8] -mx-0 px-3 py-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{getTotalPrice().toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-300">
                    <span>Total</span>
                    <span>{getTotalPrice().toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WindowFrame>
    </main>
  );
}