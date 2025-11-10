'use client';

import { CartItem } from '../../../_types/product';
import { X, Plus, Minus, ShoppingBag, Truck, ArrowRight } from 'lucide-react';
import { calculateSubtotal, calculateTax, calculateShipping, calculateTotal } from '../../../_utils/cartUtils';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  isOpen,
  onClose,
}: ShoppingCartProps) {
  if (!isOpen) return null;

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(items);

  return (
    <>
      {/* Backdrop - Minimal Blur */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-500"
        onClick={onClose}
      />

      {/* Cart Panel - Clean White */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-neutral-950 shadow-2xl z-50 flex flex-col animate-slide-in-right border-l border-neutral-200 dark:border-neutral-800">
        {/* Header - Minimal */}
        <div className="flex items-center justify-between p-8 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-4">
            <ShoppingBag className="w-5 h-5 text-neutral-900 dark:text-white" />
            <h2 className="text-xl font-light text-neutral-900 dark:text-white uppercase tracking-wider">
              Cart
            </h2>
            <span className="badge bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs">
              {items.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-sm transition-all duration-300"
          >
            <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Items - Minimal Cards */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-900 rounded-sm flex items-center justify-center mb-8">
                <ShoppingBag className="w-10 h-10 text-neutral-400 dark:text-neutral-600" />
              </div>
              <h3 className="text-xl font-light text-neutral-900 dark:text-white mb-3 uppercase tracking-wide">
                Your cart is empty
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-10 font-light">
                Add products to get started
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Explore Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="card p-4 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex gap-4">
                  {/* Image - Modern Style */}
                  <div className="relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-1 line-clamp-2 text-sm">
                      {item.product.name}
                    </h3>
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3">
                      ${item.product.price.toLocaleString('es-MX')} c/u
                    </p>

                    {/* Quantity Controls - Modern */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 card p-1">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                          }
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
                        >
                          <Minus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </button>
                        <span className="font-bold text-slate-900 dark:text-slate-50 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.min(item.product.stock, item.quantity + 1)
                            )
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </button>
                      </div>

                      <div className="font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                        ${(item.product.price * item.quantity).toLocaleString('es-MX')}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button - Modern */}
                  <button
                    onClick={() => onRemove(item.product.id)}
                    className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all duration-200 self-start h-fit"
                  >
                    <X className="w-5 h-5 text-rose-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary - Minimal Pricing */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-8 space-y-6 bg-neutral-50 dark:bg-neutral-900/50">
            {/* Free Shipping Notice */}
            {shipping > 0 && subtotal < 500 && (
              <div className="flex items-center gap-3 text-sm bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 p-4 rounded-sm border border-neutral-200 dark:border-neutral-800">
                <Truck className="w-4 h-4 flex-shrink-0" />
                <span className="font-light">
                  Add <span className="font-normal">${(500 - subtotal).toLocaleString('es-MX')}</span> more for free shipping
                </span>
              </div>
            )}
            {shipping === 0 && (
              <div className="flex items-center gap-3 text-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 p-4 rounded-sm font-light uppercase tracking-wider">
                <Truck className="w-4 h-4 flex-shrink-0" />
                <span>Free Shipping</span>
              </div>
            )}

            {/* Totals - Minimal Layout */}
            <div className="space-y-4 py-4">
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span className="font-light uppercase tracking-wider text-xs">Subtotal:</span>
                <span className="font-light">${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span className="font-light uppercase tracking-wider text-xs">Tax (16%):</span>
                <span className="font-light">${tax.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span className="font-light uppercase tracking-wider text-xs">Shipping:</span>
                <span className={shipping === 0 ? 'font-normal text-neutral-900 dark:text-white' : 'font-light'}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}
                </span>
              </div>
              <div className="flex justify-between text-xl font-light pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-900 dark:text-white uppercase tracking-wider">Total:</span>
                <span className="text-neutral-900 dark:text-white">
                  ${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Checkout Button - Minimal */}
            <button
              onClick={onCheckout}
              className="w-full py-4 text-sm font-normal bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 group uppercase tracking-widest border border-neutral-900 dark:border-white"
            >
              Checkout
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
