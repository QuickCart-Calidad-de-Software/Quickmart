'use client';

import { Order } from '../../../_types/product';
import { Package, Truck, CheckCircle, XCircle, Clock, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface OrderHistoryProps {
  orders: Order[];
  onDownloadInvoice: (orderId: string) => void;
}

export default function OrderHistory({ orders, onDownloadInvoice }: OrderHistoryProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pendiente':
        return <Clock className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />;
      case 'enviado':
        return <Truck className="w-4 h-4 text-neutral-900 dark:text-white" />;
      case 'entregado':
        return <CheckCircle className="w-4 h-4 text-neutral-900 dark:text-white" />;
      case 'cancelado':
        return <XCircle className="w-4 h-4 text-neutral-400 dark:text-neutral-600" />;
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      pendiente: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
      enviado: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900',
      entregado: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900',
      cancelado: 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400',
    };

    const labels = {
      pendiente: 'PENDING',
      enviado: 'SHIPPED',
      entregado: 'DELIVERED',
      cancelado: 'CANCELLED',
    };

    return (
      <span className={`px-3 py-1 rounded-sm text-xs font-normal uppercase tracking-widest ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <div className="mb-12">
        <h2 className="text-4xl font-light text-neutral-900 dark:text-white tracking-tight uppercase mb-3">
          Order History
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 font-light tracking-wide">
          Track your purchases
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="card p-16 text-center">
          <Package className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-8" />
          <h3 className="text-xl font-light text-neutral-900 dark:text-white mb-3 uppercase tracking-wide">
            No orders yet
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 font-light">
            Your orders will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="card overflow-hidden hover-lift"
            >
              {/* Order Header */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-normal text-neutral-900 dark:text-white uppercase tracking-wider">
                          Order #{order.id}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      {order.estimatedDelivery && order.status === 'enviado' && (
                        <p className="text-sm text-neutral-900 dark:text-white font-normal mt-2">
                          Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-light text-neutral-900 dark:text-white tracking-tight">
                      ${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 font-light uppercase tracking-wider mt-1">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                </div>

                {/* Quick Item Preview */}
                <div className="flex gap-3 mb-6">
                  {order.items.slice(0, 4).map((item, idx) => (
                    <img
                      key={idx}
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-sm border border-neutral-200 dark:border-neutral-800"
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-20 h-20 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-sm font-light text-neutral-600 dark:text-neutral-400">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="flex-1 py-3 px-6 border border-neutral-200 dark:border-neutral-800 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 font-normal text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-3 uppercase tracking-wider text-sm"
                  >
                    {expandedOrder === order.id ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Details
                      </>
                    )}
                  </button>

                  {order.status === 'entregado' && (
                    <button
                      onClick={() => onDownloadInvoice(order.id)}
                      className="py-3 px-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-300 font-normal flex items-center gap-3 uppercase tracking-wider text-sm border border-neutral-900 dark:border-white"
                    >
                      <Download className="w-4 h-4" />
                      Invoice
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-8 space-y-8">
                  {/* Items */}
                  <div>
                    <h4 className="font-normal text-neutral-900 dark:text-white uppercase tracking-wider mb-6 text-sm">
                      Products
                    </h4>
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-6 bg-white dark:bg-neutral-950 rounded-sm p-6 border border-neutral-200 dark:border-neutral-800">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-sm"
                          />
                          <div className="flex-1">
                            <h5 className="font-normal text-neutral-900 dark:text-white mb-2">
                              {item.product.name}
                            </h5>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 font-light uppercase tracking-wider">
                              Quantity: {item.quantity}
                            </p>
                            <p className="font-light text-neutral-900 dark:text-white">
                              ${(item.product.price * item.quantity).toLocaleString('es-MX')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="font-normal text-neutral-900 dark:text-white uppercase tracking-wider mb-6 text-sm">
                      Payment Summary
                    </h4>
                    <div className="bg-white dark:bg-neutral-950 rounded-sm p-6 space-y-4 border border-neutral-200 dark:border-neutral-800">
                      <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                        <span className="font-light uppercase tracking-wider text-xs">Subtotal:</span>
                        <span className="font-light">${order.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                        <span className="font-light uppercase tracking-wider text-xs">Tax:</span>
                        <span className="font-light">${order.tax.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                        <span className="font-light uppercase tracking-wider text-xs">Shipping:</span>
                        <span className={order.shipping === 0 ? 'font-normal text-neutral-900 dark:text-white' : 'font-light'}>
                          {order.shipping === 0
                            ? 'FREE'
                            : `$${order.shipping.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-light text-neutral-900 dark:text-white pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <span className="uppercase tracking-wider">Total:</span>
                        <span>${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <h4 className="font-normal text-neutral-900 dark:text-white uppercase tracking-wider mb-6 text-sm">
                      Shipping Information
                    </h4>
                    <div className="bg-white dark:bg-neutral-950 rounded-sm p-6 border border-neutral-200 dark:border-neutral-800">
                      <p className="text-neutral-700 dark:text-neutral-300 mb-3 font-light">
                        <span className="font-normal uppercase tracking-wider text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Address:</span>
                        {order.shippingAddress}
                      </p>
                      <p className="text-neutral-700 dark:text-neutral-300 font-light">
                        <span className="font-normal uppercase tracking-wider text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Payment method:</span>
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
