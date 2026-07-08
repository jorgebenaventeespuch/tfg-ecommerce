export default function CheckoutErrorPage() {
  return (
    <main className="px-8 py-12">
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        Error en el pago
      </h1>
      <p className="text-gray-600">
        Algo ha ido mal con tu pago. Inténtalo de nuevo o contacta con nosotros.
      </p>
    </main>
  );
}