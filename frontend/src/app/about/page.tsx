import WindowFrame from "@/components/WindowFrame";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-8 py-8">
      <WindowFrame title="About - GUTZDEPT">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">About</h1>

          <div className="space-y-6 max-w-3xl">
            <p className="text-gray-700 leading-relaxed">
              GUTZDEPT is an independent clothing brand born with one purpose: to motivate
              people to chase what they truly want. The name comes from &quot;guts&quot; — the
              courage to go after your goals — and &quot;dept&quot; — a department, a crew, a
              collective of people who share that same drive.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Our Philosophy</h2>

            <p className="text-gray-700 leading-relaxed">
              Every drop tells a story. From &quot;Grind and Pray&quot; — work hard and have
              faith — to &quot;Minding Our Business&quot; — stay focused on your own path —
              each collection carries a message. We don&apos;t just make clothes, we build
              narratives that resonate with a generation that refuses to settle.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Based in Alicante, Spain. Inspired by American streetwear culture, Y2K
              aesthetics, and the hustle mentality. Every piece is designed in-house and
              released in limited drops — once it&apos;s gone, it&apos;s gone.
            </p>

            <p className="text-gray-700 leading-relaxed">
              No guts, no story.
            </p>
          </div>
        </div>
      </WindowFrame>
    </main>
  );
}