export interface Product {
  id: string;
  brand: string;
  title: string;
  cat: string;
  price: number;
  original?: number;
  rating: number;
  reviews: number;
  tag?: string;
  image: string;
  desc: string;
  soldOut?: boolean;
}

export interface Catalog {
  categories: string[];
  products: Product[];
}

export interface CartLine {
  product: Product;
  qty: number;
}
