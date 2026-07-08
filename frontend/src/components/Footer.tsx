import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 px-8 py-8">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          © 2026 GUTZDEPT. Todos los derechos reservados.
        </p>

        <ul className="flex gap-4 text-sm">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contacto">Contacto</Link>
          </li>
          <li>
            <Link href="#">Instagram</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}