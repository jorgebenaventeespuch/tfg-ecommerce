import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 px-8 py-8">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <p className="text-sm text-gray-500">
          © 2026 GUTZDEPT. All rights reserved.
        </p>

        <ul className="flex gap-4 text-sm">
          <li>
            <Link href="/about">About</Link>
          </li>

          <li>
            <Link href="/contacto">Contact</Link>
          </li>

          <li>
            <a
              href="https://www.instagram.com/gutzdept/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}