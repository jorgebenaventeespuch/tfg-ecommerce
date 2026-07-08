import { drops } from "@/data/drops";

export default function ArchivePage() {
  return (
    <main className="px-8 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Archive</h1>
      <p className="text-gray-600 mb-12">
        Cronología de todos los drops de la marca.
      </p>

      <div className="space-y-16">
        {drops.map((drop) => (
          <article key={drop.id} className="border-b border-gray-200 pb-16 last:border-b-0">
            <div className="aspect-[2/1] bg-gray-100 mb-6">
              <img
                src={drop.image}
                alt={drop.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-bold">{drop.name}</h2>
              <span className="text-sm text-gray-500">{drop.date}</span>
            </div>

            <p className="text-gray-700 leading-relaxed">{drop.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}