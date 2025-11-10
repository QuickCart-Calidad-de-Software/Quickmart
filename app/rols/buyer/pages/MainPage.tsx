'use client';

import { useState, useEffect } from 'react';
import { Product, CartItem, FilterOptions, Order } from '../../../_types/product';
import { MOCK_PRODUCTS, MOCK_ORDERS, CATEGORIES } from '../data/mockData';
import {
  ShoppingCart as CartIcon,
  Package,
  User,
  LogOut,
  Bell,
  Home,
  Star,
} from 'lucide-react';
import ProductFilters from '../components/ProductFilters';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import Checkout from '../components/Checkout';
import OrderHistory from '../components/OrderHistory';
import OrderConfirmation from '../components/OrderConfirmation';
import ProductReviews from '../components/ProductReviews';
import NotificationsPanel from '../components/NotificationsPanel';
import PromoCarousel from '../components/PromoCarousel';
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from '../../../_utils/cartUtils';

type View = 'home' | 'cart' | 'checkout' | 'orders' | 'confirmation' | 'reviews';

interface BuyerDashboardProps {
  userName: string;
}

export default function BuyerDashboard({ userName }: BuyerDashboardProps) {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notifications, setNotifications] = useState(3);

  const [filters, setFilters] = useState<FilterOptions>({
    category: 'Todas',
    minPrice: 0,
    maxPrice: 100000,
    minRating: 0,
    location: '',
    maxDistance: 50,
    sortBy: 'name',
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    setCart(savedCart);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  // Filter and sort products
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (filters.category !== 'Todas' && product.category !== filters.category) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    if (product.rating < filters.minRating) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCurrentView('checkout');
  };

  const handleOrderComplete = (orderId: string) => {
    // Crear nueva orden
    const newOrder: Order = {
      id: orderId,
      userId: 'user1',
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) * 1.16 + 99,
      subtotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      tax: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) * 0.16,
      shipping: 99,
      status: 'pendiente',
      paymentMethod: 'Tarjeta de crédito',
      shippingAddress: 'Dirección de ejemplo',
      date: new Date().toISOString().split('T')[0],
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setConfirmedOrderId(orderId);
    setCurrentView('confirmation');
    setNotifications(notifications + 1);
  };

  const handleDownloadInvoice = (orderId: string) => {
    alert(`Descargando factura para pedido ${orderId}`);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    alert(`Calificación: ${rating} estrellas\nComentario: ${comment}`);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="space-y-12 fade-in">
            {/* PromoCarousel - Estilo Maguire */}
            <div className="mb-12">
              <PromoCarousel />
            </div>

            {/* Welcome Section - Minimal */}
            <div className="pt-12">
              <h1 className="text-5xl font-light text-neutral-900 dark:text-white tracking-tight uppercase mb-4">
                Welcome, {userName}
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-lg font-light tracking-wide">
                Discover our collection
              </p>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              categories={CATEGORIES}
            />

            {/* Products Grid - Minimal Layout */}
            <div>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-light text-neutral-900 dark:text-white tracking-wider uppercase">
                  Products
                </h2>
                <span className="badge bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 uppercase tracking-widest text-xs">
                  {filteredProducts.length} Items
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="card p-16 text-center fade-in">
                  <Package className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-6" />
                  <h3 className="text-lg font-light text-neutral-900 dark:text-white mb-3 uppercase tracking-wide">
                    No products found
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 font-light">
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'checkout':
        return (
          <Checkout
            items={cart}
            onBack={() => {
              setCurrentView('home');
              setCartOpen(true);
            }}
            onComplete={handleOrderComplete}
          />
        );

      case 'orders':
        return (
          <OrderHistory
            orders={orders}
            onDownloadInvoice={handleDownloadInvoice}
          />
        );

      case 'confirmation':
        return (
          <OrderConfirmation
            orderId={confirmedOrderId}
            onContinueShopping={() => setCurrentView('home')}
            onViewOrders={() => setCurrentView('orders')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Top Navigation - MINIMAL ELEGANTE */}
      <nav className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Minimal */}
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-8 h-8 bg-neutral-900 dark:bg-white rounded-sm flex items-center justify-center">
                <span className="text-white dark:text-neutral-900 font-light text-lg">Q</span>
              </div>
              <span className="text-xl font-light tracking-wider text-neutral-900 dark:text-white uppercase">QuickMart</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              {/* Notifications */}
              <NotificationsPanel />

              {/* Cart - Minimal Style */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-sm transition-all duration-300 group"
              >
                <CartIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-normal rounded-sm flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* User Menu - Minimal Profile */}
              <div className="flex items-center gap-4 pl-6 ml-6 border-l border-neutral-200 dark:border-neutral-800">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-normal text-neutral-900 dark:text-white uppercase tracking-wide">{userName}</div>
                  <div className="text-xs font-light text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Buyer</div>
                </div>
                <div className="w-9 h-9 bg-neutral-900 dark:bg-white rounded-sm flex items-center justify-center hover-lift">
                  <User className="w-4 h-4 text-white dark:text-neutral-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Navigation - Minimal Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 min-h-[calc(100vh-5rem)] sticky top-20 hidden lg:block">
          <nav className="p-6 space-y-2">
            <button
              onClick={() => setCurrentView('home')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 font-normal uppercase tracking-wider text-sm ${
                currentView === 'home'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => setCurrentView('orders')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 font-normal uppercase tracking-wider text-sm ${
                currentView === 'orders'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              Orders
              {orders.some((o) => o.status === 'enviado') && (
                <span className="ml-auto w-1.5 h-1.5 bg-neutral-900 dark:bg-white rounded-full" />
              )}
            </button>

            <button
              onClick={() => alert('Función de valoraciones próximamente')}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 font-normal uppercase tracking-wider text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
            >
              <Star className="w-4 h-4" />
              Reviews
            </button>

            <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => window.location.href = '/'}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 font-normal uppercase tracking-wider text-sm text-neutral-500 dark:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content - Spacious */}
        <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
      </div>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}
