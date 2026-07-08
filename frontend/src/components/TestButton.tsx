"use client";

import { useState } from "react";

export default function TestButton() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => {
        console.log("HOLA, click funciona");
        setCount(count + 1);
      }}
      style={{ padding: "20px", background: "red", color: "white", fontSize: "20px" }}
    >
      Has clicado {count} veces
    </button>
  );
}