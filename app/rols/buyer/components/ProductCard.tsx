'use client';

import { Product } from '../../../_types/product';
import { Star, MapPin, ShoppingCart, Package } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  // Calcular descuento persuasivo (15-25%)
  const discountPercent = product.id === '1' || product.id === '4' ? 20 : 
                         product.id === '2' || product.id === '5' ? 15 : 
                         product.id === '3' || product.id === '6' ? 25 : 0;
  
  const originalPrice = discountPercent > 0 ? Math.round(product.price / (1 - discountPercent / 100)) : product.price;
  const hasDiscount = discountPercent > 0;
  
  // Mensajes persuasivos según stock
  const getUrgencyMessage = () => {
    if (product.stock <= 3) return 'ALMOST GONE';
    if (product.stock <= 10) return 'LIMITED STOCK';
    return null;
  };

  const urgencyMessage = getUrgencyMessage();

  return (
    <div className="group card overflow-hidden hover-lift hover:shadow-xl transition-all duration-500">
      {/* Image - Minimal con badges persuasivos */}
      <div className="relative aspect-square overflow-hidden bg-neutral-50 dark:bg-neutral-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Badge de descuento - Top Left */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-sm">
            <span className="text-lg font-light tracking-tight">-{discountPercent}%</span>
          </div>
        )}
        
        {/* Badge de urgencia - Top Right */}
        {urgencyMessage && (
          <div className="absolute top-4 right-4 border border-neutral-900 dark:border-white bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-neutral-900 dark:text-white text-xs font-normal px-3 py-1.5 rounded-sm uppercase tracking-wider">
            {urgencyMessage}
          </div>
        )}
        
        {/* Badge "NEW" para productos nuevos */}
        {(product.id === '2' || product.id === '7') && (
          <div className="absolute bottom-4 left-4 border border-neutral-900 dark:border-white bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-neutral-900 dark:text-white text-xs font-normal px-3 py-1.5 rounded-sm uppercase tracking-widest">
            NEW ARRIVAL
          </div>
        )}
      </div>

      {/* Content - Generous Spacing */}
      <div className="p-8 space-y-6">
        {/* Category Badge */}
        <div className="badge bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 uppercase tracking-widest text-xs">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-light text-neutral-900 dark:text-white text-xl mb-3 line-clamp-2 min-h-[3.5rem] tracking-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-sm">
            <Star className="w-3.5 h-3.5 fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white" />
            <span className="text-sm font-light text-neutral-900 dark:text-white">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400 font-light">
            {product.reviews} reviews
          </span>
        </div>

        {/* Seller & Location */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate font-light">{product.location}</span>
          </div>
          <div className="text-neutral-500 dark:text-neutral-400 truncate font-light">
            By <span className="text-neutral-700 dark:text-neutral-300 font-normal">{product.sellerName}</span>
          </div>
        </div>

        {/* Price con descuento */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-light text-neutral-900 dark:text-white tracking-tight">
                ${product.price.toLocaleString('es-MX')}
              </div>
              {hasDiscount && (
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-neutral-400 dark:text-neutral-600 line-through font-light">
                    ${originalPrice.toLocaleString('es-MX')}
                  </span>
                  <span className="text-xs text-neutral-900 dark:text-white uppercase tracking-widest font-normal">
                    Save ${(originalPrice - product.price).toLocaleString('es-MX')}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <Package className="w-3.5 h-3.5" />
              <span className="font-light">{product.stock}</span>
            </div>
          </div>
          
          {/* Mensaje persuasivo de envío gratis */}
          {product.price >= 5000 && (
            <div className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-widest font-light">
              Free Shipping Included
            </div>
          )}
        </div>

        {/* Add to Cart Button - Persuasivo */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className={`w-full py-4 rounded-sm font-normal uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group/btn
            ${
              product.stock === 0
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                : isAdding
                ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900'
                : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 border border-neutral-900 dark:border-white'
            }`}
        >
          {!isAdding && hasDiscount && product.stock > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
          )}
          <ShoppingCart className="w-4 h-4" />
          {product.stock === 0
            ? 'Sold Out'
            : isAdding
            ? 'Added to Cart'
            : hasDiscount
            ? 'Get This Offer'
            : 'Add to Cart'}
        </button>
        
        {/* Mensaje persuasivo final */}
        {urgencyMessage && product.stock <= 5 && (
          <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 font-light italic">
            {product.stock} {product.stock === 1 ? 'person is' : 'people are'} viewing this
          </p>
        )}
      </div>
    </div>
  );
}
