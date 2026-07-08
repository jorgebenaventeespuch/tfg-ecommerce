export type Drop = {
  id: string;
  name: string;
  date: string;
  description: string;
  image: string;
};

export const drops: Drop[] = [
  {
    id: "drop-01",
    name: "Origins",
    date: "Enero 2024",
    description:
      "Primera colección de la marca. Piezas básicas con identidad propia, diseñadas para asentar el lenguaje visual de GUTZDEPT.",
    image: "https://placehold.co/1200x600/1A1A1A/FFFFFF?text=DROP+01+-+Origins",
  },
  {
    id: "drop-02",
    name: "Reset",
    date: "Junio 2024",
    description:
      "Reinterpretación de los básicos con paletas más neutras y cortes oversized. Enfoque en la comodidad sin perder actitud.",
    image: "https://placehold.co/1200x600/808080/FFFFFF?text=DROP+02+-+Reset",
  },
  {
    id: "drop-03",
    name: "Underground",
    date: "Noviembre 2024",
    description:
      "Colección invernal con inspiración en la escena underground de los 2000. Chaquetas acolchadas, gráficos y utility wear.",
    image: "https://placehold.co/1200x600/2C2C2C/FFFFFF?text=DROP+03+-+Underground",
  },
];