import { Product, Order } from '../../../_types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    description: 'Laptop ultradelgada con procesador Intel i7 de 11ª gen, 16GB RAM, 512GB SSD',
    price: 24999,
    category: 'Electrónica',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&q=80',
    stock: 15,
    rating: 4.8,
    reviews: 247,
    sellerId: 'seller1',
    sellerName: 'Tech Store MX',
    location: 'Ciudad de México',
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    description: 'Smartphone de última generación con chip A17 Pro, cámara de 48MP',
    price: 32999,
    category: 'Electrónica',
    image: 'https://think-ecuador.com/wp-content/uploads/2025/09/iphone-17-15-1-600x600.jpeg',
    stock: 8,
    rating: 4.9,
    reviews: 532,
    sellerId: 'seller2',
    sellerName: 'iShop',
    location: 'Monterrey',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    description: 'Audífonos inalámbricos con cancelación de ruido premium',
    price: 6999,
    category: 'Electrónica',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop&q=80',
    stock: 32,
    rating: 4.7,
    reviews: 189,
    sellerId: 'seller1',
    sellerName: 'Tech Store MX',
    location: 'Ciudad de México',
  },
  {
    id: '4',
    name: 'Nike Air Max 270',
    description: 'Tenis deportivos con tecnología Air Max para máximo confort',
    price: 2799,
    category: 'Ropa y Calzado',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80',
    stock: 45,
    rating: 4.6,
    reviews: 312,
    sellerId: 'seller3',
    sellerName: 'Sport Zone',
    location: 'Guadalajara',
  },
  {
    id: '5',
    name: 'Licuadora Ninja Professional',
    description: 'Licuadora de alta potencia 1200W con 3 velocidades',
    price: 1499,
    category: 'Hogar',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop&q=80',
    stock: 23,
    rating: 4.5,
    reviews: 156,
    sellerId: 'seller4',
    sellerName: 'Casa & Hogar',
    location: 'Puebla',
  },
  {
    id: '6',
    name: 'Smart TV Samsung 55"',
    description: 'Televisor 4K UHD con tecnología QLED y Smart Hub',
    price: 12999,
    category: 'Electrónica',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop&q=80',
    stock: 12,
    rating: 4.7,
    reviews: 284,
    sellerId: 'seller1',
    sellerName: 'Tech Store MX',
    location: 'Ciudad de México',
  },
  {
    id: '7',
    name: 'Cafetera Nespresso',
    description: 'Cafetera de cápsulas automática con espumador de leche',
    price: 3499,
    category: 'Hogar',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=600&fit=crop&q=80',
    stock: 18,
    rating: 4.8,
    reviews: 423,
    sellerId: 'seller4',
    sellerName: 'Casa & Hogar',
    location: 'Puebla',
  },
  {
    id: '8',
    name: 'Bicicleta de Montaña Trek',
    description: 'Bicicleta MTB rodada 29" con suspensión completa',
    price: 18999,
    category: 'Deportes',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=600&fit=crop&q=80',
    stock: 7,
    rating: 4.9,
    reviews: 98,
    sellerId: 'seller3',
    sellerName: 'Sport Zone',
    location: 'Guadalajara',
  },
  {
    id: '9',
    name: 'Cámara Canon EOS R6',
    description: 'Cámara mirrorless full frame con video 4K',
    price: 45999,
    category: 'Electrónica',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop&q=80',
    stock: 5,
    rating: 4.9,
    reviews: 134,
    sellerId: 'seller2',
    sellerName: 'iShop',
    location: 'Monterrey',
  },
  {
    id: '10',
    name: 'Mesa de Comedor Modern',
    description: 'Mesa de madera para 6 personas con acabado minimalista',
    price: 8999,
    category: 'Muebles',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=600&fit=crop&q=80',
    stock: 6,
    rating: 4.6,
    reviews: 67,
    sellerId: 'seller5',
    sellerName: 'Muebles Design',
    location: 'Querétaro',
  },
  {
    id: '11',
    name: 'PlayStation 5',
    description: 'Consola de videojuegos de última generación con 1TB SSD',
    price: 14999,
    category: 'Electrónica',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=600&fit=crop&q=80',
    stock: 3,
    rating: 5.0,
    reviews: 876,
    sellerId: 'seller1',
    sellerName: 'Tech Store MX',
    location: 'Ciudad de México',
  },
  {
    id: '12',
    name: 'Mochila The North Face',
    description: 'Mochila outdoor 40L resistente al agua',
    price: 2299,
    category: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&q=80',
    stock: 28,
    rating: 4.7,
    reviews: 201,
    sellerId: 'seller3',
    sellerName: 'Sport Zone',
    location: 'Guadalajara',
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user1',
    items: [
      {
        product: MOCK_PRODUCTS[2], // Sony WH-1000XM5
        quantity: 1,
      },
      {
        product: MOCK_PRODUCTS[11], // Mochila The North Face
        quantity: 1,
      },
    ],
    total: 10795.68,
    subtotal: 9298, // 6999 + 2299
    tax: 1487.68, // 16% IVA
    shipping: 0, // Envío gratis por monto mayor a $500
    status: 'entregado',
    paymentMethod: 'Tarjeta de Crédito Visa **** 4532',
    shippingAddress: 'Av. Paseo de la Reforma 222, Piso 8, Col. Juárez, Cuauhtémoc, 06600, Ciudad de México, CDMX',
    date: '2025-10-15',
  },
  {
    id: 'ORD-002',
    userId: 'user1',
    items: [
      {
        product: MOCK_PRODUCTS[3], // Nike Air Max 270
        quantity: 2,
      },
      {
        product: MOCK_PRODUCTS[4], // Licuadora Ninja
        quantity: 1,
      },
    ],
    total: 8044.84,
    subtotal: 6097, // (2799*2) + 1499
    tax: 855.52, // 16% IVA
    shipping: 99,
    status: 'enviado',
    paymentMethod: 'PayPal - correo@ejemplo.com',
    shippingAddress: 'Av. Universidad 1200, Col. Xoco, Benito Juárez, 03339, Ciudad de México, CDMX',
    date: '2025-11-01',
    estimatedDelivery: '2025-11-27',
  },
  {
    id: 'ORD-003',
    userId: 'user1',
    items: [
      {
        product: MOCK_PRODUCTS[6], // Cafetera Nespresso
        quantity: 1,
      },
    ],
    total: 4058.84,
    subtotal: 3499,
    tax: 559.84, // 16% IVA
    shipping: 0, // Envío gratis
    status: 'pendiente',
    paymentMethod: 'Transferencia Bancaria BBVA',
    shippingAddress: 'Calle Insurgentes Sur 1605, Col. San José Insurgentes, Benito Juárez, 03900, Ciudad de México, CDMX',
    date: '2025-11-08',
  },
  {
    id: 'ORD-004',
    userId: 'user1',
    items: [
      {
        product: MOCK_PRODUCTS[0], // Laptop Dell XPS 13
        quantity: 1,
      },
      {
        product: MOCK_PRODUCTS[2], // Sony WH-1000XM5
        quantity: 1,
      },
    ],
    total: 37097.68,
    subtotal: 31998, // 24999 + 6999
    tax: 5119.68, // 16% IVA
    shipping: 0, // Envío gratis
    status: 'entregado',
    paymentMethod: 'Tarjeta de Débito Mastercard **** 8821',
    shippingAddress: 'Av. Constituyentes 956, Col. Lomas Altas, Miguel Hidalgo, 11950, Ciudad de México, CDMX',
    date: '2025-09-22',
  },
  {
    id: 'ORD-005',
    userId: 'user1',
    items: [
      {
        product: MOCK_PRODUCTS[5], // Smart TV Samsung 55"
        quantity: 1,
      },
    ],
    total: 15098.84,
    subtotal: 12999,
    tax: 2079.84, // 16% IVA
    shipping: 0, // Envío gratis
    status: 'entregado',
    paymentMethod: 'Tarjeta de Crédito American Express **** 1005',
    shippingAddress: 'Av. Revolución 1877, Col. San Ángel, Álvaro Obregón, 01000, Ciudad de México, CDMX',
    date: '2025-08-10',
  },
];

export const CATEGORIES = [
  'Todas',
  'Electrónica',
  'Ropa y Calzado',
  'Hogar',
  'Deportes',
  'Muebles',
  'Accesorios',
];
