"use client";

import { useState } from "react";

export default function SizeChart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm underline underline-offset-4 text-gray-500 hover:text-black transition-colors mt-4"
      >
        Size Chart
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-black"
            >
              ×
            </button>
            <img
              src="/sizechart.jpg"
              alt="Size Chart"
              className="w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}