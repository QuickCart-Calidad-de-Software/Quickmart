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

export default function SellerDashboard({ userName, userId }: SellerDashboardProps) {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SellerProduct | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [userId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?sellerId=${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      
      if (!text) {
        console.warn('Empty response from server');
        setProducts([]);
        return;
      }

      try {
        const data = JSON.parse(text);
        
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.warn('Invalid data format:', data);
          setProducts([]);
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.log('Response text:', text);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData: Omit<SellerProduct, 'id'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productData,
          sellerId: userId,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = 'Error al crear el producto';
        
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const text = await response.text();
      
      if (!text) {
        throw new Error('Respuesta vacía del servidor');
      }

      const data = JSON.parse(text);
      
      if (data.product) {
        setProducts([data.product, ...products]);
        setShowForm(false);
        alert('✅ Producto creado exitosamente');
        await fetchProducts(); // Refrescar la lista
      } else {
        throw new Error('Formato de respuesta inválido');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear el producto';
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleUpdateProduct = async (productData: Omit<SellerProduct, 'id'>) => {
    if (!editingProduct?.id) return;

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productData,
          sellerId: userId,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = 'Error al actualizar el producto';
        
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const text = await response.text();
      
      if (!text) {
        throw new Error('Respuesta vacía del servidor');
      }

      const data = JSON.parse(text);
      
      if (data.product) {
        setProducts(
          products.map((p) => (p.id === editingProduct.id ? data.product : p))
        );
        setShowForm(false);
        setEditingProduct(undefined);
        alert('✅ Producto actualizado exitosamente');
        await fetchProducts(); // Refrescar la lista
      } else {
        throw new Error('Formato de respuesta inválido');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al actualizar el producto';
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = 'Error al eliminar el producto';
        
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      setProducts(products.filter((p) => p.id !== productId));
      alert('✅ Producto eliminado exitosamente');
      await fetchProducts(); // Refrescar la lista
    } catch (error) {
      console.error('Error deleting product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al eliminar el producto';
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleEdit = (product: SellerProduct) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.stock > 0).length,
    totalRevenue: products.reduce((sum, p) => sum + p.price * (100 - p.stock), 0),
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
