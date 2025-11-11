'use client';

import { Edit, Trash2, Package, AlertCircle } from 'lucide-react';
import { SellerProduct } from '@/app/_types/product';

interface ProductListProps {
  products: SellerProduct[];
  onEdit: (product: SellerProduct) => void;
  onDelete: (productId: string) => void;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  const handleDelete = (productId: string, productTitle: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${productTitle}"?`)) {
      onDelete(productId);
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return {
        text: 'Sin Stock',
        color: 'bg-red-100 text-red-800',
      };
    }
    if (stock <= 10) {
      return {
        text: 'Stock Bajo',
        color: 'bg-orange-100 text-orange-800',
      };
    }
    return {
      text: 'En Stock',
      color: 'bg-green-100 text-green-800',
    };
  };

  if (products.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-sm shadow-sm p-12 text-center">
        <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-xl font-light text-neutral-900 mb-2 uppercase tracking-wide">
          No tienes productos publicados
        </h3>
        <p className="text-neutral-500 font-light">
          Comienza publicando tu primer producto
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const stockStatus = getStockStatus(product.stock);

        return (
          <div
            key={product.id}
            className="group bg-white border border-neutral-200 rounded-sm shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Si la imagen falla al cargar, mostrar una imagen de respaldo
                    const target = e.currentTarget;
                    target.onerror = null; // Prevenir loop infinito
                    target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-16 h-16 text-neutral-300" />
                </div>
              )}
              
              {/* Stock Badge */}
              {product.stock <= 10 && (
                <div className="absolute top-4 right-4 bg-neutral-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-normal uppercase tracking-wider">
                    {product.stock === 0 ? 'Sin Stock' : 'Stock Bajo'}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Category Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-block bg-neutral-100 text-neutral-600 px-3 py-1 rounded-sm uppercase tracking-widest text-xs">
                  {product.category || 'Sin categoría'}
                </span>
                <span className={`px-3 py-1 rounded-sm text-xs font-normal uppercase tracking-wider ${stockStatus.color}`}>
                  {stockStatus.text}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-light text-neutral-900 text-lg line-clamp-2 min-h-14 tracking-tight">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-500 font-light line-clamp-2 min-h-10">
                {product.short_description || product.description || 'Sin descripción'}
              </p>

              {/* Price and Stock */}
              <div className="flex items-baseline justify-between pt-4 border-t border-neutral-200">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-light mb-1">
                    Precio
                  </p>
                  <p className="text-2xl font-light text-neutral-900">
                    ${Number(product.price).toLocaleString('es-MX', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-light mb-1">
                    Stock
                  </p>
                  <p className="text-2xl font-light text-neutral-900">
                    {product.stock}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => onEdit(product)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-sm text-xs font-normal uppercase tracking-wider hover:bg-neutral-100 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id, product.title)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-sm text-xs font-normal uppercase tracking-wider hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
