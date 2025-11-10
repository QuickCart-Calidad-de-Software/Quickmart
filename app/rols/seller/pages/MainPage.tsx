'use client';

import { useState, useEffect } from 'react';
import { SellerProduct, SellerProfile } from '@/app/_types/product';
import {
  Package,
  User as UserIcon,
  LogOut,
  Plus,
  Home,
  Store,
} from 'lucide-react';
import ProfileForm from '../components/ProfileForm';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { MOCK_SELLER_PRODUCTS } from '../data/mockData';
import { signOut } from 'next-auth/react';

type View = 'profile' | 'products';

interface SellerDashboardProps {
  userName: string;
  userId: string;
}

export default function SellerDashboard({ userName, userId }: SellerDashboardProps) {
  const [currentView, setCurrentView] = useState<View>('products');
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [profile, setProfile] = useState<SellerProfile>({
    id: userId,
    name: userName,
    location: 'Ciudad de México, México',
  });
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SellerProduct | null>(null);

  // Cargar productos del vendedor
  useEffect(() => {
    loadProducts();
  }, [userId]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/seller/products?sellerId=${userId}`);
      const data = await response.json();

      if (response.ok && data.products && data.products.length > 0) {
        // Transformar productos de la DB al formato del frontend
        const transformedProducts = data.products.map((p: any) => ({
          id: p.id.toString(),
          title: p.title,
          description: p.description || '',
          category: getCategoryName(p.category_id),
          price: p.price,
          stock: p.stock,
          image: p.image || '',
          active: p.active,
        }));
        setProducts(transformedProducts);
      } else {
        // Si no hay productos en la base, usar mock data
        setProducts(MOCK_SELLER_PRODUCTS);
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setProducts(MOCK_SELLER_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: number | null): string => {
    const categories: { [key: number]: string } = {
      1: 'Electrónica',
      2: 'Ropa y Calzado',
      3: 'Hogar',
      4: 'Deportes',
      5: 'Muebles',
      6: 'Accesorios',
      7: 'Herramientas',
    };
    return categories[categoryId || 1] || 'Electrónica';
  };

  const getCategoryId = (categoryName: string): number => {
    const categoryMap: { [key: string]: number } = {
      'Electrónica': 1,
      'Ropa y Calzado': 2,
      'Hogar': 3,
      'Deportes': 4,
      'Muebles': 5,
      'Accesorios': 6,
      'Herramientas': 7,
    };
    return categoryMap[categoryName] || 1;
  };

  const handleCreateProduct = async (productData: SellerProduct) => {
    try {
      const response = await fetch('/api/seller/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sellerId: userId,
          title: productData.title,
          description: productData.description,
          category: getCategoryId(productData.category),
          price: productData.price,
          stock: productData.stock,
          image: productData.image,
        }),
      });

      if (response.ok) {
        await loadProducts();
        setShowProductForm(false);
        alert('Producto publicado exitosamente');
      } else {
        const data = await response.json();
        alert(data.error || 'Error al publicar el producto');
      }
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('Error al publicar el producto');
    }
  };

  const handleUpdateProduct = async (productData: SellerProduct) => {
    try {
      const response = await fetch('/api/seller/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productData.id,
          sellerId: userId,
          title: productData.title,
          description: productData.description,
          category: getCategoryId(productData.category),
          price: productData.price,
          stock: productData.stock,
          active: productData.active,
        }),
      });

      if (response.ok) {
        await loadProducts();
        setShowProductForm(false);
        setEditingProduct(null);
        alert('Producto actualizado exitosamente');
      } else {
        const data = await response.json();
        alert(data.error || 'Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      alert('Error al actualizar el producto');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `/api/seller/products?id=${productId}&sellerId=${userId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        await loadProducts();
        alert('Producto eliminado exitosamente');
      } else {
        const data = await response.json();
        alert(data.error || 'Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handleUpdateProfile = async (updatedProfile: Partial<SellerProfile>) => {
    try {
      const response = await fetch('/api/seller/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          ...updatedProfile,
        }),
      });

      if (response.ok) {
        setProfile((prev) => ({ ...prev, ...updatedProfile }));
        alert('Perfil actualizado exitosamente');
      } else {
        const data = await response.json();
        alert(data.error || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  };

  const handleEditProduct = (product: SellerProduct) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return (
          <div className="space-y-8 fade-in">
            <div>
              <h1 className="text-4xl font-light text-neutral-900 tracking-tight uppercase mb-2">
                Mi Perfil
              </h1>
              <p className="text-neutral-500 text-lg font-light">
                Gestiona tu información personal
              </p>
            </div>
            <ProfileForm profile={profile} onUpdate={handleUpdateProfile} />
          </div>
        );

      case 'products':
        return (
          <div className="space-y-8 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-light text-neutral-900 tracking-tight uppercase mb-2">
                  Mis Productos
                </h1>
                <p className="text-neutral-500 text-lg font-light">
                  {products.length} {products.length === 1 ? 'producto publicado' : 'productos publicados'}
                </p>
              </div>
              <button
                onClick={handleNewProduct}
                className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-sm text-sm font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Publicar Producto
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
              </div>
            ) : (
              <ProductList
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation */}
      <nav className="bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Spacer */}
            <div className="w-48"></div>

            {/* Logo - Centered */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 cursor-pointer group">
              <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-neutral-900 font-light text-base">Q</span>
              </div>
              <span className="text-lg font-light tracking-[0.3em] text-white uppercase">
                QuickMart
              </span>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-5 ml-5 border-l border-neutral-700">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-normal text-white uppercase tracking-widest">
                  {userName}
                </div>
                <div className="text-[10px] font-light text-neutral-400 uppercase tracking-[0.2em]">
                  Vendedor
                </div>
              </div>
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center hover:bg-neutral-200 transition-all duration-300 cursor-pointer">
                <UserIcon className="w-4 h-4 text-neutral-900" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-4rem)] sticky top-16 hidden lg:block">
          <nav className="p-6 space-y-2">
            <button
              onClick={() => setCurrentView('products')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 font-normal uppercase tracking-wider text-sm ${
                currentView === 'products'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <Store className="w-4 h-4" />
              Productos
              {products.length > 0 && (
                <span className="ml-auto bg-neutral-200 text-neutral-900 px-2 py-0.5 rounded-sm text-xs">
                  {products.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('profile')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 font-normal uppercase tracking-wider text-sm ${
                currentView === 'profile'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              Perfil
            </button>

            <div className="pt-6 mt-6 border-t border-neutral-200">
              <button
                onClick={async () => {
                  await signOut({ callbackUrl: '/auth/login' });
                }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 font-normal uppercase tracking-wider text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
