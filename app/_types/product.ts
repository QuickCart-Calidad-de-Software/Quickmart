// Interfaz que representa los productos tal como vienen de la base de datos de Supabase
export interface ProductFromDB {
  id: number;
  seller_id: string;
  title: string;
  description: string | null;
  short_description: string | null;
  category_id: number | null;
  price: number;
  stock: number;
  active: boolean;
  rating: number | null;
  rating_count: number | null;
}

// Tipos y modelos para el frontend
export type ProductStatus = "Sospechosa" | "Aprobada" | "Rechazada";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  seller: string;
  sellerRole: "Vendedor" | "Usuario";
  image: string;
  status: ProductStatus;
  reportCount: number;
  createdAt: string;
  images: string[];
  stock: number;
  specifications?: string;
}
