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
  created_at?: string;
  updated_at?: string;
}

// Tipos y modelos para el frontend
export type ProductStatus = "Sospechosa" | "Aprobada" | "Rechazada";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  sellerId: string;
  sellerName: string;
  location: string;
  distance?: number;
  seller?: string;
  sellerRole?: "Vendedor" | "Usuario";
  status?: ProductStatus;
  reportCount?: number;
  createdAt?: string;
  images?: string[];
  specifications?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
  paymentMethod: string;
  shippingAddress: string;
  date: string;
  estimatedDelivery?: string;
}

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  location: string;
  maxDistance: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'distance' | 'name';
}

// Seller specific types
export interface SellerProduct {
  id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  images?: string[];
  active?: boolean;
}

export interface SellerProfile {
  id: string;
  name: string;
  location: string;
  email?: string;
  phone?: string;
  businessName?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}
