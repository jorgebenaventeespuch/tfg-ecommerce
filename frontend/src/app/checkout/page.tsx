"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del pedido:", formData);
    console.log("Productos:", items);
    console.log("Total:", getTotalPrice());

    clearCart();
    router.push("/checkout/exito");
  };

  if (items.length === 0) {
    return (
      <main className="px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600">
          Tu carrito está vacío. Añade productos antes de hacer el checkout.
        </p>
      </main>
    );
  }

  return (
    <main className="px-8 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-medium mb-4">Datos de envío</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 focus:border-black outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 focus:border-black outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:border-black outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:border-black outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ciudad</label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 focus:border-black outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Código postal</label>
              <input
                type="text"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 focus:border-black outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">País</label>
            <select
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:border-black outline-none"
            >
              <option value="España">España</option>
              <option value="Portugal">Portugal</option>
              <option value="Francia">Francia</option>
              <option value="Italia">Italia</option>
              <option value="Alemania">Alemania</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:border-black outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors mt-6"
          >
            Pagar {getTotalPrice().toFixed(2)} €
          </button>
        </form>

        <div>
          <h2 className="text-xl font-medium mb-4">Resumen del pedido</h2>

          <div className="border border-gray-200 p-6 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-3 text-sm"
              >
                <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-500">
                    Talla {item.size} · Cantidad {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  {(item.product.price * item.quantity).toFixed(2)} €
                </p>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{getTotalPrice().toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{getTotalPrice().toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}