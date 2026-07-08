import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; //Importamos los dos componentes que acabamos de crear, el arroba sirve para apuntar a carpetas
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GUTZDEPT",
  description: "Tienda online de la marca de ropa GUTZDEPT",
};

export default function RootLayout({
  children, // children sirve para que next.js escriba directamente él la pagina que quieres meter entre navbar y footage directamente, para que yo no tenga que meterlas en todas las paginas. Nav y footer siempre son los mismos, cambia el children.
}: Readonly<{
  children: React.ReactNode; //es donde Next.js coloca el contenido específico de cada página (lo que esté en page.tsx). El tipo React.ReactNode es básicamente "cualquier cosa que React puede renderizar"- Sin esa anotación de tipo, TypeScript se quejaría porque no sabría qué es children
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}