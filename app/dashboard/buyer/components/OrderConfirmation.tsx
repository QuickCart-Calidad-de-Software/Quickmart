'use client';

import { CheckCircle, Package, Download, ArrowRight, Home } from 'lucide-react';

interface OrderConfirmationProps {
  orderId: string;
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

export default function OrderConfirmation({
  orderId,
  onContinueShopping,
  onViewOrders,
}: OrderConfirmationProps) {
  const handleDownloadInvoice = () => {
    // Simular descarga de factura
    alert(`Descargando factura para el pedido ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¡Pedido Confirmado!
          </h1>

          {/* Order ID */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-sm text-blue-700 mb-2 font-medium">
              Número de pedido
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {orderId}
            </p>
          </div>

          {/* Message */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Gracias por tu compra. Hemos enviado un correo de confirmación con los detalles de tu pedido.
            Puedes hacer seguimiento del estado en tu historial.
          </p>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 text-left">
              <Package className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Seguimiento
              </h3>
              <p className="text-sm text-gray-600">
                Recibirás notificaciones sobre el estado de tu envío
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-left">
              <Download className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Factura
              </h3>
              <p className="text-sm text-gray-600">
                Disponible una vez que tu pedido sea entregado
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onViewOrders}
              className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 group"
            >
              Ver mis pedidos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onContinueShopping}
              className="flex-1 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Seguir comprando
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            ¿Tienes preguntas? Contáctanos en{' '}
            <a href="mailto:soporte@quickmart.com" className="text-blue-600 hover:underline font-medium">
              soporte@quickmart.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
