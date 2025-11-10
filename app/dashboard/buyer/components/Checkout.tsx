'use client';

import { CartItem } from '../../../_types/product';
import { CreditCard, Building, Wallet, ArrowLeft, CheckCircle, Truck, Package, Receipt } from 'lucide-react';
import { useState } from 'react';
import { calculateSubtotal, calculateTax, calculateShipping, calculateTotal } from '../../../_utils/cartUtils';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: (orderId: string) => void;
}

export default function Checkout({ items, onBack, onComplete }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(items);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generar ID de orden
    const orderId = `ORD-${Date.now()}`;
    onComplete(orderId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al carrito
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
        <p className="text-gray-600 mt-2">Completa tu información para procesar el pedido</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Dirección de Envío</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección completa
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Calle, número, colonia"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ciudad"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="12345"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono de contacto
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="55 1234 5678"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Wallet className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Método de Pago</h2>
            </div>

            {/* Payment Options */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium text-gray-900">Tarjeta</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'transfer'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium text-gray-900">Transferencia</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Wallet className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium text-gray-900">PayPal</div>
              </button>
            </div>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre en la tarjeta
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    placeholder="JUAN PÉREZ"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de expiración
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      placeholder="MM/AA"
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Al confirmar, recibirás los datos bancarios para realizar la transferencia.
                  Tu pedido se procesará una vez confirmado el pago.
                </p>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Serás redirigido a PayPal para completar tu pago de forma segura.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Resumen</h2>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.quantity} × ${item.product.price.toLocaleString('es-MX')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 pt-4 border-t border-gray-200 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>IVA:</span>
                <span>${tax.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío:</span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                  {shipping === 0 ? 'GRATIS' : `$${shipping.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                <span>Total:</span>
                <span>${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Confirmar pedido
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Al confirmar, aceptas nuestros términos y condiciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
