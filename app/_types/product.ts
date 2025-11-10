<<<<<<< HEAD
=======
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

>>>>>>> b0c0aea04c785ae096ffde5dc072f626c1cf9c23
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
<<<<<<< HEAD
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  sellerId: string;
  sellerName: string;
  location: string;
  distance?: number;
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
=======
  seller: string;
  sellerRole: "Vendedor" | "Usuario";
  image: string;
  status: ProductStatus;
  reportCount: number;
  createdAt: string;
  images: string[];
  stock: number;
  specifications?: string;
>>>>>>> b0c0aea04c785ae096ffde5dc072f626c1cf9c23
}
