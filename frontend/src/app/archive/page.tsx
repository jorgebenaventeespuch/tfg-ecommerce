import Link from "next/link";
import { drops } from "@/data/drops";
import WindowFrame from "@/components/WindowFrame";

export default function ArchivePage() {
  return (
    <main className="max-w-6xl mx-auto px-8 py-8">
      <WindowFrame title="Archive - GUTZDEPT Collections">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {drops.map((drop) => (
              <Link
                key={drop.id}
                href={`/archive/${drop.id}`}
                className="block group"
              >
                <WindowFrame title={`${drop.name}.folder`}>
                  <div className="p-4">
                    <div className="flex items-center justify-center mb-4">
                      <img
                        src={drop.image}
                        alt={drop.name}
                        loading="lazy"
                        className="max-h-[280px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="border-t border-gray-200 pt-3 bg-[#ECE9D8] -mx-4 -mb-4 px-4 py-2">
                      <h2 className="font-bold text-sm">{drop.name}</h2>
                      <p className="text-xs text-gray-600">{drop.date}</p>
                    </div>
                  </div>
                </WindowFrame>
              </Link>
            ))}
          </div>
        </div>
      </WindowFrame>
    </main>
  );
} 