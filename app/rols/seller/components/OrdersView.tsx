"use client";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: string;
  products: string;
  quantity: number;
  total: string;
  paymentStatus: "Pagado" | "Pendiente" | "Fallido" | "Reembolsado";
  orderStatus: "Pendiente" | "En preparación" | "Enviado" | "Entregado" | "Cancelado";
  shippingAddress: string;
  tracking?: string;
}

interface OrdersViewProps {
  searchQuery: string;
}

export default function OrdersView({ searchQuery }: OrdersViewProps) {
  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-11-08",
      customer: "Juan Pérez",
      products: "Taladro Inalámbrico, Destornillador Eléctrico",
      quantity: 2,
      total: "$209.98",
      paymentStatus: "Pagado",
      orderStatus: "Entregado",
      shippingAddress: "Calle Principal 123, Ciudad de México",
      tracking: "TRK-1234567890"
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-11-08",
      customer: "María González",
      products: "iPhone 14 Pro",
      quantity: 1,
      total: "$999.99",
      paymentStatus: "Pagado",
      orderStatus: "Enviado",
      shippingAddress: "Av. Reforma 456, Guadalajara",
      tracking: "TRK-0987654321"
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: "2024-11-07",
      customer: "Carlos Rodríguez",
      products: "Laptop Dell XPS 15, Audífonos Sony WH-1000XM5",
      quantity: 2,
      total: "$1,699.98",
      paymentStatus: "Pagado",
      orderStatus: "En preparación",
      shippingAddress: "Blvd. Juárez 789, Monterrey",
      tracking: undefined
    },
    {
      id: "4",
      orderNumber: "ORD-2024-004",
      date: "2024-11-07",
      customer: "Ana Martínez",
      products: "Samsung Galaxy S24",
      quantity: 1,
      total: "$899.99",
      paymentStatus: "Pendiente",
      orderStatus: "Pendiente",
      shippingAddress: "Calle Hidalgo 321, Puebla",
      tracking: undefined
    },
    {
      id: "5",
      orderNumber: "ORD-2024-005",
      date: "2024-11-06",
      customer: "Luis Hernández",
      products: "MacBook Pro M3",
      quantity: 1,
      total: "$1,999.99",
      paymentStatus: "Fallido",
      orderStatus: "Cancelado",
      shippingAddress: "Av. Universidad 654, Querétaro",
      tracking: undefined
    },
    {
      id: "6",
      orderNumber: "ORD-2024-006",
      date: "2024-11-06",
      customer: "Patricia López",
      products: "JBL Flip 6, Bose QuietComfort 45",
      quantity: 2,
      total: "$459.98",
      paymentStatus: "Reembolsado",
      orderStatus: "Cancelado",
      shippingAddress: "Calle Morelos 987, Tijuana",
      tracking: "TRK-1122334455"
    },
    {
      id: "7",
      orderNumber: "ORD-2024-007",
      date: "2024-11-05",
      customer: "Roberto Sánchez",
      products: "iPad Air 5",
      quantity: 1,
      total: "$599.99",
      paymentStatus: "Pagado",
      orderStatus: "Entregado",
      shippingAddress: "Av. Insurgentes 147, Ciudad de México",
      tracking: "TRK-5544332211"
    },
    {
      id: "8",
      orderNumber: "ORD-2024-008",
      date: "2024-11-05",
      customer: "Sofía Ramírez",
      products: "Google Pixel 8",
      quantity: 1,
      total: "$699.99",
      paymentStatus: "Pagado",
      orderStatus: "Enviado",
      shippingAddress: "Calle 5 de Mayo 258, Mérida",
      tracking: "TRK-6677889900"
    },
    {
      id: "9",
      orderNumber: "ORD-2024-009",
      date: "2024-11-04",
      customer: "Diego Torres",
      products: "Sierra Circular Profesional",
      quantity: 1,
      total: "$189.99",
      paymentStatus: "Pagado",
      orderStatus: "En preparación",
      shippingAddress: "Av. Chapultepec 369, Oaxaca",
      tracking: undefined
    },
    {
      id: "10",
      orderNumber: "ORD-2024-010",
      date: "2024-11-04",
      customer: "Valentina Flores",
      products: "Taladro Inalámbrico, Sierra Circular, Destornillador",
      quantity: 3,
      total: "$399.97",
      paymentStatus: "Pagado",
      orderStatus: "Pendiente",
      shippingAddress: "Calle Zaragoza 741, León",
      tracking: undefined
    }
  ];

  // Filter orders based on search query
  const filteredOrders = mockOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.products.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "Pagado":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Fallido":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Reembolsado":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    }
  };

  const getOrderStatusColor = (status: Order["orderStatus"]) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Enviado":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "En preparación":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Pendiente":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Cancelado":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            Gestión de Pedidos
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Mostrando {filteredOrders.length} de {mockOrders.length} pedidos
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--foreground)"
            }}
          >
            Exportar
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          className="rounded-lg p-4 border"
          style={{ 
            backgroundColor: "var(--card-bg)", 
            borderColor: "var(--border-color)" 
          }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Pedidos</p>
          <p className="text-2xl font-bold mt-1" style={{ color: "var(--foreground)" }}>
            {mockOrders.length}
          </p>
        </div>
        <div 
          className="rounded-lg p-4 border"
          style={{ 
            backgroundColor: "var(--card-bg)", 
            borderColor: "var(--border-color)" 
          }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Enviados</p>
          <p className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">
            {mockOrders.filter(o => o.orderStatus === "Enviado").length}
          </p>
        </div>
        <div 
          className="rounded-lg p-4 border"
          style={{ 
            backgroundColor: "var(--card-bg)", 
            borderColor: "var(--border-color)" 
          }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
          <p className="text-2xl font-bold mt-1 text-orange-600 dark:text-orange-400">
            {mockOrders.filter(o => o.orderStatus === "Pendiente").length}
          </p>
        </div>
        <div 
          className="rounded-lg p-4 border"
          style={{ 
            backgroundColor: "var(--card-bg)", 
            borderColor: "var(--border-color)" 
          }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Entregados</p>
          <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
            {mockOrders.filter(o => o.orderStatus === "Entregado").length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div 
        className="rounded-lg shadow-sm border overflow-hidden"
        style={{ 
          backgroundColor: "var(--card-bg)", 
          borderColor: "var(--border-color)" 
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead 
              className="border-b"
              style={{ 
                backgroundColor: "var(--input-bg)", 
                borderColor: "var(--border-color)" 
              }}
            >
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Producto(s)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado Pago
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado Pedido
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tracking
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.date).toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                      {order.customer}
                    </div>
                  </td>
                  <td className="px-4 py-4 max-w-xs">
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate" title={order.products}>
                      {order.products}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-center font-medium" style={{ color: "var(--foreground)" }}>
                      {order.quantity}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600 dark:text-green-400">
                      {order.total}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 max-w-xs">
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate" title={order.shippingAddress}>
                      {order.shippingAddress}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {order.tracking ? (
                      <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                        {order.tracking}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                        title="Ver detalles"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-900 dark:hover:text-green-400"
                        title="Actualizar estado"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        className="text-purple-600 hover:text-purple-900 dark:hover:text-purple-400"
                        title="Imprimir factura"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando {filteredOrders.length} de {mockOrders.length} pedidos
            </div>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1 border rounded text-sm hover:opacity-80"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--foreground)"
                }}
              >
                Anterior
              </button>
              <button 
                className="px-3 py-1 border rounded text-sm bg-green-600 text-white"
              >
                1
              </button>
              <button 
                className="px-3 py-1 border rounded text-sm hover:opacity-80"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--foreground)"
                }}
              >
                2
              </button>
              <button 
                className="px-3 py-1 border rounded text-sm hover:opacity-80"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--foreground)"
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
            No se encontraron pedidos
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Intenta con otro término de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
