'use client';

import { useState, useEffect } from 'react';
import { SellerProduct } from '@/app/_types/product';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { Package, Plus, TrendingUp, DollarSign, ShoppingBag, User, LogOut, Home } from 'lucide-react';

interface SellerDashboardProps {
  userName: string;
  userId: string;
}

// PRODUCTOS MOCKUP CON IMÁGENES DE UNSPLASH
const MOCK_PRODUCTS: SellerProduct[] = [
  {
    id: '1',
    sellerId: 'seller1',
    title: 'iPhone 15 Pro Max',
    short_description: 'El smartphone más avanzado de Apple',
    description: 'iPhone 15 Pro Max con chip A17 Pro, cámara de 48MP y titanio aeroespacial. Diseño premium y rendimiento excepcional.',
    price: 29999,
    stock: 15,
    category: 'Electrónicos',
    image: 'https://images.unsplash.com/photo-1678652197950-164bc550d830?w=800&h=800&fit=crop',
  },
  {
    id: '2',
    sellerId: 'seller1',
    title: 'MacBook Pro 16"',
    short_description: 'Potencia profesional para creativos',
    description: 'MacBook Pro 16 pulgadas con chip M3 Pro, 36GB RAM y 1TB SSD. Perfecto para edición de video y diseño.',
    price: 54999,
    stock: 8,
    category: 'Electrónicos',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
  },
  {
    id: '3',
    sellerId: 'seller1',
    title: 'Nike Air Max 2024',
    short_description: 'Comodidad y estilo en cada paso',
    description: 'Zapatillas Nike Air Max 2024 con tecnología Air visible y diseño moderno. Perfectas para running y uso diario.',
    price: 3499,
    stock: 45,
    category: 'Deportes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
  },
  {
    id: '4',
    sellerId: 'seller1',
    title: 'Sony WH-1000XM5',
    short_description: 'Cancelación de ruido líder en la industria',
    description: 'Audífonos premium Sony con cancelación de ruido activa, audio de alta resolución y 30 horas de batería.',
    price: 8999,
    stock: 22,
    category: 'Electrónicos',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop',
  },
  {
    id: '5',
    sellerId: 'seller1',
    title: 'Cámara Canon EOS R5',
    short_description: 'Captura momentos en 8K',
    description: 'Cámara profesional Canon EOS R5 con sensor full-frame de 45MP, video 8K y estabilización de 5 ejes.',
    price: 89999,
    stock: 5,
    category: 'Electrónicos',
    image: 'https://images.unsplash.com/photo-1606980624922-40f6814c9f98?w=800&h=800&fit=crop',
  },
  {
    id: '6',
    sellerId: 'seller1',
    title: 'Mochila Peak Design',
    short_description: 'Diseño inteligente para fotógrafos',
    description: 'Mochila versátil de 30L con sistema de organización modular, resistente al agua y acceso rápido a tu equipo.',
    price: 4999,
    stock: 0,
    category: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
  },
  {
    id: '7',
    sellerId: 'seller1',
    title: 'Reloj Garmin Fenix 7',
    short_description: 'Smartwatch deportivo avanzado',
    description: 'Reloj GPS multideporte con mapas, métricas de entrenamiento avanzadas y batería de hasta 18 días.',
    price: 15999,
    stock: 12,
    category: 'Deportes',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
  },
  {
    id: '8',
    sellerId: 'seller1',
    title: 'Lámpara Escritorio LED',
    short_description: 'Iluminación ajustable para trabajo',
    description: 'Lámpara LED de escritorio con temperatura de color ajustable, control táctil y puerto USB para carga.',
    price: 899,
    stock: 35,
    category: 'Hogar',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
  },
];

export default function SellerDashboard({ userName, userId }: SellerDashboardProps) {
  const [products, setProducts] = useState<SellerProduct[]>(MOCK_PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SellerProduct | undefined>();
  const [loading, setLoading] = useState(false);

  // Comentar el useEffect que hace fetch a la API
  // useEffect(() => {
  //   fetchProducts();
  // }, [userId]);

  const handleCreateProduct = async (productData: Omit<SellerProduct, 'id'>) => {
    try {
      // Simular creación de producto
      const newProduct: SellerProduct = {
        ...productData,
        id: `temp-${Date.now()}`,
        sellerId: userId,
      };

      setProducts([newProduct, ...products]);
      setShowForm(false);
      alert('✅ Producto creado exitosamente (Modo Demo)');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('❌ Error al crear el producto');
    }
  };

  const handleUpdateProduct = async (productData: Omit<SellerProduct, 'id'>) => {
    if (!editingProduct?.id) return;

    try {
      const updatedProduct: SellerProduct = {
        ...productData,
        id: editingProduct.id,
        sellerId: userId,
      };

      setProducts(
        products.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
      );
      setShowForm(false);
      setEditingProduct(undefined);
      alert('✅ Producto actualizado exitosamente (Modo Demo)');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('❌ Error al actualizar el producto');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      setProducts(products.filter((p) => p.id !== productId));
      alert('✅ Producto eliminado exitosamente (Modo Demo)');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('❌ Error al eliminar el producto');
    }
  };

  const handleEdit = (product: SellerProduct) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.stock > 0).length,
    totalRevenue: products.reduce((sum, p) => sum + (p.price * Math.min(p.stock, 10)), 0),
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation */}
      <nav className="bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="w-48"></div>

            {/* Logo Centered */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 cursor-pointer group">
              <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-neutral-900 font-light text-base">Q</span>
              </div>
              <span className="text-lg font-light tracking-[0.3em] text-white uppercase">
                QuickMart
              </span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-5 border-l border-neutral-700">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-normal text-white uppercase tracking-widest">{userName}</div>
                <div className="text-[10px] font-light text-neutral-400 uppercase tracking-[0.2em]">Vendedor</div>
              </div>
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center hover:bg-neutral-200 transition-all duration-300 cursor-pointer">
                <User className="w-4 h-4 text-neutral-900" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner Demo Mode */}
      <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
        🎭 MODO DEMOSTRACIÓN - Productos de prueba con imágenes reales
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-4rem)] sticky top-16 hidden lg:block">
          <nav className="p-6 space-y-2">
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-sm bg-neutral-900 text-white transition-all duration-300 font-normal uppercase tracking-wider text-sm">
              <Package className="w-4 h-4" />
              Productos
            </button>

            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-300 font-normal uppercase tracking-wider text-sm">
              <Home className="w-4 h-4" />
              Perfil
            </button>

            <div className="pt-6 mt-6 border-t border-neutral-200">
              <button
                onClick={() => window.location.href = '/login'}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-300 font-normal uppercase tracking-wider text-sm"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
          <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-light text-neutral-900 tracking-tight uppercase mb-2">
                  Mis Productos
                </h1>
                <p className="text-neutral-500 font-light tracking-wide">
                  Gestiona tu inventario
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(undefined);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-sm text-sm font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nuevo Producto
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-sm p-6 border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-10 h-10 text-neutral-400" />
                </div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-light mb-2">
                  Total Productos
                </p>
                <p className="text-3xl font-light text-neutral-900">
                  {stats.totalProducts}
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <ShoppingBag className="w-10 h-10 text-green-500" />
                </div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-light mb-2">
                  Activos
                </p>
                <p className="text-3xl font-light text-neutral-900">
                  {stats.activeProducts}
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-10 h-10 text-blue-500" />
                </div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-light mb-2">
                  Stock Bajo
                </p>
                <p className="text-3xl font-light text-neutral-900">
                  {stats.lowStock}
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-10 h-10 text-purple-500" />
                </div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider font-light mb-2">
                  Ingresos Est.
                </p>
                <p className="text-3xl font-light text-neutral-900">
                  ${stats.totalRevenue.toLocaleString('es-MX')}
                </p>
              </div>
            </div>

            {/* Products List */}
            {loading ? (
              <div className="flex flex-col justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mb-4"></div>
                <p className="text-neutral-500 font-light">Cargando productos...</p>
              </div>
            ) : (
              <ProductList
                products={products}
                onEdit={handleEdit}
                onDelete={handleDeleteProduct}
              />
            )}
          </div>
        </main>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(undefined);
          }}
          initialProduct={editingProduct}
        />
      )}
    </div>
  );
}
