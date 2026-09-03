import { drops } from "@/data/drops";
import { notFound } from "next/navigation";
import Link from "next/link";
import WindowFrame from "@/components/WindowFrame";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DropPage({ params }: PageProps) {
  const { id } = await params;
  const drop = drops.find((d) => d.id === id);

  if (!drop) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-8 py-8">
      <Link
        href="/archive"
        className="text-sm text-[#316AC5] hover:underline mb-4 inline-block"
      >
        ← Back to Archive
      </Link>

      <WindowFrame title={`${drop.name} - Collection Details`}>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{drop.name}</h1>
            <p className="text-gray-600 mt-1">
              {drop.subtitle} · {drop.date}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed max-w-3xl mb-8">
            {drop.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {drop.photos.map((photo, index) => (
              <WindowFrame key={index} title={`photo_${index + 1}.jpg`}>
                <div className="flex items-center justify-center p-3">
                  <img
                    src={photo}
                    alt={`${drop.name} - ${index + 1}`}
                    className="max-h-[400px] w-auto object-contain"
                  />
                </div>
              </WindowFrame>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <a
              href={drop.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 text-white font-bold text-sm"
              style={{
                background:
                  "linear-gradient(180deg, #3B8F3B 0%, #2D7E2D 50%, #1E6B1E 100%)",
              }}
            >
              ▶ Watch the video
            </a>
          </div>
        </div>
      </WindowFrame>
    </main>
  );
}