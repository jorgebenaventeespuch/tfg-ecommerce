export default function ContactoPage() {
  return (
    <main className="px-8 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Contacto</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Para cualquier consulta sobre productos, pedidos o colaboraciones,
          puedes contactar con nosotros a través de los siguientes canales.
        </p>

        <div className="space-y-4 pt-4">
          <div>
            <h2 className="font-bold mb-1">Email</h2>
            <p>info@gutzdept.com</p>
          </div>

          <div>
            <h2 className="font-bold mb-1">Instagram</h2>
            <p>@gutzdept</p>
          </div>

          <div>
            <h2 className="font-bold mb-1">Horario de atención</h2>
            <p>Lunes a viernes, de 10:00 a 18:00</p>
          </div>
        </div>

        <div className="pt-6">
          <h2 className="text-xl font-bold mb-4">Devoluciones</h2>
          <p>
            Aceptamos devoluciones dentro de los 14 días posteriores a la
            recepción del pedido. La prenda debe estar en su estado original,
            sin usar y con la etiqueta puesta.
          </p>
        </div>
      </div>
    </main>
  );
}