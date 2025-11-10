import { SellerProduct } from '@/app/_types/product';

// Mock data para pruebas y desarrollo
export const MOCK_SELLER_PRODUCTS: SellerProduct[] = [
  {
    id: '1',
    title: 'Laptop Dell XPS 13',
    description: 'Laptop ultradelgada con procesador Intel i7 de 11ª gen, 16GB RAM, 512GB SSD. Perfecta para profesionales y estudiantes.',
    category: 'Electrónica',
    price: 24999,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&q=80',
    active: true,
  },
  {
    id: '2',
    title: 'iPhone 15 Pro Max',
    description: 'Smartphone de última generación con chip A17 Pro, cámara de 48MP y diseño en titanio.',
    category: 'Electrónica',
    price: 32999,
    stock: 8,
    image: 'https://think-ecuador.com/wp-content/uploads/2025/09/iphone-17-15-1-600x600.jpeg',
    active: true,
  },
  {
    id: '3',
    title: 'Sony WH-1000XM5',
    description: 'Audífonos inalámbricos con cancelación de ruido premium y hasta 30 horas de batería.',
    category: 'Electrónica',
    price: 6999,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop&q=80',
    active: true,
  },
  {
    id: '4',
    title: 'Nike Air Max 270',
    description: 'Tenis deportivos con tecnología Air Max para máximo confort durante entrenamientos intensos.',
    category: 'Ropa y Calzado',
    price: 2799,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80',
    active: false,
  },
];

export const CATEGORIES = [
  'Electrónica',
  'Ropa y Calzado',
  'Hogar',
  'Deportes',
  'Muebles',
  'Accesorios',
  'Herramientas',
  'Libros',
  'Juguetes',
  'Alimentos',
];
