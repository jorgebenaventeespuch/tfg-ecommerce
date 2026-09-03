import WindowFrame from "@/components/WindowFrame";

export default function ContactoPage() {
  return (
    <main className="max-w-4xl mx-auto px-8 py-8">
      <WindowFrame title="Contact - GUTZDEPT">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Contact</h1>

          <div className="space-y-6 text-sm">
            <div>
              <h2 className="font-bold text-lg mb-2">Email</h2>
              <p className="text-gray-700">info@gutzdept.com</p>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-2">Instagram</h2>

              <a
                href="https://www.instagram.com/gutzdept/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#316AC5] hover:underline"
              >
                @gutzdept
              </a>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-2">Customer Support</h2>
              <p className="text-gray-700">
                Monday to Friday, 10:00 - 18:00 (CET)
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-2">Returns Policy</h2>
              <p className="text-gray-700">
                You have 14 days from receiving your order to request a return
                or exchange. Items must be unworn, unwashed, and in original
                packaging. Contact us via email or Instagram to start the
                process.
              </p>
            </div>
          </div>
        </div>
      </WindowFrame>
    </main>
  );
}