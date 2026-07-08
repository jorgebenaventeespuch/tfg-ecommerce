export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "1",
    name: "Camiseta oversize negra",
    price: 35,
    image: "https://placehold.co/600x800/000000/FFFFFF?text=Camiseta+Negra",
    category: "camisetas",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Sudadera con capucha gris",
    price: 65,
    image: "https://placehold.co/600x800/808080/FFFFFF?text=Sudadera+Gris",
    category: "sudaderas",
    sizes: ["S", "M", "L"],
  },
  {
    id: "3",
    name: "Pantalón cargo verde",
    price: 80,
    image: "https://placehold.co/600x800/4A5D23/FFFFFF?text=Cargo+Verde",
    category: "pantalones",
    sizes: ["M", "L", "XL"],
  },
  {
    id: "4",
    name: "Camiseta gráfica blanca",
    price: 40,
    image: "https://placehold.co/600x800/FFFFFF/000000?text=Camiseta+Blanca",
    category: "camisetas",
    sizes: ["S", "M", "L"],
  },
  {
    id: "5",
    name: "Chaqueta acolchada negra",
    price: 120,
    image: "https://placehold.co/600x800/1A1A1A/FFFFFF?text=Chaqueta",
    category: "chaquetas",
    sizes: ["M", "L", "XL"],
  },
  {
    id: "6",
    name: "Gorra logo bordado",
    price: 25,
    image: "https://placehold.co/600x800/2C2C2C/FFFFFF?text=Gorra",
    category: "accesorios",
    sizes: ["Única"],
  },
];