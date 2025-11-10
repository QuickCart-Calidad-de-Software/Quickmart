"use client";

import { useState, useEffect } from "react";
import { Product, ProductFromDB, ProductStatus } from "@/app/_types/product";

export default function ProductModerationView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para convertir productos de la DB al formato del componente
  const mapDBProductToProduct = (dbProduct: ProductFromDB): Product => {
    return {
      id: dbProduct.id.toString(),
      name: dbProduct.title,
      description: dbProduct.description || dbProduct.short_description || "Sin descripción",
      price: Number(dbProduct.price),
      category: `Categoría ${dbProduct.category_id || "Sin categoría"}`,
      seller: `Vendedor ${dbProduct.seller_id.substring(0, 8)}`,
      sellerRole: "Vendedor",
      image: "📦",
      status: dbProduct.active ? "Aprobada" : "Sospechosa",
      reportCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      images: ["📦", "📷", "✨"],
      stock: dbProduct.stock,
      specifications: dbProduct.description || undefined
    };
  };

  // Fetch de productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }

        const data = await response.json();
        const mappedProducts = data.products.map(mapDBProductToProduct);
        setProducts(mappedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('No se pudieron cargar los productos');
        // Mantener productos mock en caso de error para desarrollo
        setProducts([
          {
            id: "P001",
            name: "iPhone 15 Pro Max ORIGINAL!!!! Super barato!!!",
            description: "iPhone 15 Pro Max 512GB completamente nuevo, precio increíble solo por hoy!!! No te lo pierdas!!!",
            price: 89.99,
            category: "Electrónicos",
            seller: "VendedorNuevo2024",
            sellerRole: "Usuario",
            image: "📱",
            status: "Sospechosa",
            reportCount: 5,
            createdAt: "2024-11-08 10:30",
            images: ["📱", "📦", "✨"],
            stock: 50,
            specifications: "512GB, Color Titanio Natural, Nuevo en caja sellada"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleApproveProduct = (productId: string) => {
    // Actualizar el estado del producto a "Aprobada"
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, status: "Aprobada" as ProductStatus, reportCount: 0 }
          : product
      )
    );

    alert(`✅ Producto ${productId} aprobado exitosamente`);
    setShowReviewModal(false);
    setSelectedProduct(null);
    // Aquí iría la llamada a la API para aprobar el producto
  };

  const handleRejectProduct = (productId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      // Eliminar el producto del estado
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      alert(`🗑️ Producto ${productId} eliminado permanentemente`);
      setShowReviewModal(false);
      setSelectedProduct(null);
      // Aquí iría la llamada a la API para eliminar el producto
    }
  };

  const openReviewModal = (product: Product) => {
    setSelectedProduct(product);
    setShowReviewModal(true);
  };

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas
  const stats = {
    sospechosas: products.filter((p) => p.status === "Sospechosa").length,
    aprobadas: products.filter((p) => p.status === "Aprobada").length,
    rechazadas: products.filter((p) => p.status === "Rechazada").length,
    total: products.length,
  };

  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case "Sospechosa":
        return (
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-semibold">
            ⚠️ Sospechosa
          </span>
        );
      case "Aprobada":
        return (
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
            ✅ Aprobada
          </span>
        );
      case "Rechazada":
        return (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold">
            ❌ Rechazada
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Moderación de Productos
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Revisa y gestiona publicaciones sospechosas
          </p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Sospechosas
            </span>
          </div>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.sospechosas}
          </p>
        </div>

        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Aprobadas
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.aprobadas}
          </p>
        </div>

        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Rechazadas
            </span>
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {stats.rechazadas}
          </p>
        </div>

        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">�</span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.total}
          </p>
        </div>
      </div>

      {/* Búsqueda */}
      <div
        className="rounded-lg p-4 border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre de producto o vendedor..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--foreground)",
            }}
          />
        </div>
      </div>

      {/* Indicador de error */}
      {error && (
        <div className="rounded-lg p-4 border border-red-500 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-700 dark:text-red-400 text-center">
            ⚠️ {error}
          </p>
        </div>
      )}

      {/* Indicador de carga */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando productos...</span>
        </div>
      )}

      {/* Tabla de notificaciones */}
      {!loading && (
        <div 
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--foreground)" }}
                >
                  Nombre del Producto
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--foreground)" }}
                >
                  Vendedor
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--foreground)" }}
                >
                  Rol
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--foreground)" }}
                >
                  Estado
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--foreground)" }}
                >
                  Reportes
                </th>
                <th
                  className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--foreground)" }}
                >
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-400 dark:text-gray-500">
                      <div className="text-4xl mb-2">�</div>
                      <p>No se encontraron productos</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          {product.image}
                        </div>
                        <div>
                          <p
                            className="font-medium"
                            style={{ color: "var(--foreground)" }}
                          >
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p
                        className="font-medium"
                        style={{ color: "var(--foreground)" }}
                      >
                        {product.seller}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.createdAt}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.sellerRole === "Vendedor"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {product.sellerRole}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4">
                      {product.reportCount > 0 ? (
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-bold">
                          🚨 {product.reportCount}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-sm">
                          Sin reportes
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openReviewModal(product)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Revisar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Modal de revisión de producto */}
      {showReviewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div
            className="rounded-lg p-6 max-w-4xl w-full my-8"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border-color)",
            }}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between mb-6">
              <h3
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                Revisar Publicación
              </h3>
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Contenido del producto */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Columna izquierda - Imágenes y detalles principales */}
              <div className="space-y-4">
                {/* Galería de imágenes */}
                <div
                  className="rounded-lg p-6 border"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProduct.images.map((img, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-4xl"
                      >
                        {img}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información del producto */}
                <div
                  className="rounded-lg p-4 border space-y-3"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Precio:
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Categoría:
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {selectedProduct.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Stock:
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {selectedProduct.stock} unidades
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Estado:
                    </span>
                    {getStatusBadge(selectedProduct.status)}
                  </div>
                </div>
              </div>

              {/* Columna derecha - Descripción e información del vendedor */}
              <div className="space-y-4">
                {/* Información del vendedor */}
                <div
                  className={`rounded-lg p-4 border-2 ${
                    selectedProduct.reportCount > 0
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : ""
                  }`}
                  style={
                    selectedProduct.reportCount === 0
                      ? {
                          backgroundColor: "var(--card-bg)",
                          borderColor: "var(--border-color)",
                        }
                      : {}
                  }
                >
                  <h4
                    className="font-semibold mb-3"
                    style={{ color: "var(--foreground)" }}
                  >
                    Información del Vendedor
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Nombre:
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "var(--foreground)" }}
                      >
                        {selectedProduct.seller}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Rol:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedProduct.sellerRole === "Vendedor"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {selectedProduct.sellerRole}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Publicado:
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--foreground)" }}
                      >
                        {selectedProduct.createdAt}
                      </span>
                    </div>
                    {selectedProduct.reportCount > 0 && (
                      <div className="mt-3 pt-3 border-t border-red-300 dark:border-red-700">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">
                            Reportes recibidos:
                          </span>
                          <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-bold">
                            🚨 {selectedProduct.reportCount}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Descripción del producto */}
                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    Nombre del Producto
                  </h4>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "var(--foreground)" }}
                  >
                    {selectedProduct.name}
                  </p>

                  <h4
                    className="font-semibold mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    Descripción
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Especificaciones */}
                {selectedProduct.specifications && (
                  <div
                    className="rounded-lg p-4 border"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{ color: "var(--foreground)" }}
                    >
                      Especificaciones
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedProduct.specifications}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div
              className="flex gap-3 mt-6 pt-6 border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <button
                onClick={() => handleApproveProduct(selectedProduct.id)}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Aprobar Producto
              </button>
              <button
                onClick={() => handleRejectProduct(selectedProduct.id)}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Eliminar Producto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
