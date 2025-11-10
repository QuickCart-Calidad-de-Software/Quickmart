import { CartItem } from '../_types/product';

export const getCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('quickmart-cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCartToLocalStorage = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('quickmart-cart', JSON.stringify(cart));
};

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.16; // 16% IVA
};

export const calculateShipping = (subtotal: number): number => {
  return subtotal > 500 ? 0 : 99; // Envío gratis para compras mayores a $500
};

export const calculateTotal = (items: CartItem[]): number => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  return subtotal + tax + shipping;
};
