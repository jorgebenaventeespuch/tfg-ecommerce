export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  hover_image: string | null;
  images: string[];
  category: string;
  sizes: string[];
  description: string | null;
};