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
