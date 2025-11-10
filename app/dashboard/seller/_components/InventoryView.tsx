"use client";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  stock: number;
  image: string;
}

interface InventoryViewProps {
  searchQuery: string;
}

export default function InventoryView({ searchQuery }: InventoryViewProps) {
  // Mock products data
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Taladro Inalámbrico",
      description:
        "Taladro de impacto de 20V con batería de litio de larga duración",
      category: "Herramientas Eléctricas",
      price: "$129.99",
      stock: 45,
      image: "🔧",
    },
    {
      id: 2,
      title: "Laptop Dell XPS 15",
      description:
        "Laptop profesional con procesador Intel Core i7 de 11ª generación",
      category: "Electrónica",
      price: "$1,299.99",
      stock: 12,
      image: "💻",
    },
    {
      id: 3,
      title: "iPhone 14 Pro",
      description:
        "Smartphone de última generación con cámara profesional de 48MP",
      category: "Smartphones",
      price: "$999.99",
      stock: 8,
      image: "📱",
    },
    {
      id: 4,
      title: "Audífonos Sony WH-1000XM5",
      description:
        "Audífonos inalámbricos con cancelación de ruido líder en la industria",
      category: "Audio",
      price: "$399.99",
      stock: 23,
      image: "🎧",
    },
    {
      id: 5,
      title: "Sierra Circular Profesional",
      description: "Sierra circular de 7.25 pulgadas con motor de 15 amperios",
      category: "Herramientas Eléctricas",
      price: "$189.99",
      stock: 18,
      image: "⚙️",
    },
    {
      id: 6,
      title: "MacBook Pro M3",
      description: "MacBook Pro 14 con chip M3 y 16GB de RAM",
      category: "Electrónica",
      price: "$1,999.99",
      stock: 5,
      image: "💻",
    },
    {
      id: 7,
      title: "Samsung Galaxy S24",
      description: "Smartphone Android con pantalla AMOLED de 6.2 pulgadas",
      category: "Smartphones",
      price: "$899.99",
      stock: 15,
      image: "📱",
    },
    {
      id: 8,
      title: "JBL Flip 6",
      description:
        "Altavoz Bluetooth portátil resistente al agua con sonido potente",
      category: "Audio",
      price: "$129.99",
      stock: 34,
      image: "🔊",
    },
    {
      id: 9,
      title: "Destornillador Eléctrico",
      description:
        "Kit de destornillador eléctrico con 50 puntas intercambiables",
      category: "Herramientas Eléctricas",
      price: "$79.99",
      stock: 52,
      image: "🔩",
    },
    {
      id: 10,
      title: "iPad Air 5",
      description:
        "Tablet Apple con chip M1 y pantalla Liquid Retina de 10.9 pulgadas",
      category: "Electrónica",
      price: "$599.99",
      stock: 20,
      image: "📱",
    },
    {
      id: 11,
      title: "Google Pixel 8",
      description: "Smartphone Google con IA avanzada y cámara de 50MP",
      category: "Smartphones",
      price: "$699.99",
      stock: 25,
      image: "📱",
    },
    {
      id: 12,
      title: "Bose QuietComfort 45",
      description: "Audífonos over-ear con cancelación de ruido activa",
      category: "Audio",
      price: "$329.99",
      stock: 16,
      image: "🎧",
    },
  ];

  // Filter products based on search query
  const filteredProducts = mockProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (stock: number) => {
    if (stock > 30)
      return {
        text: "Alto Stock",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      };
    if (stock > 10)
      return {
        text: "Stock Medio",
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      };
    return {
      text: "Stock Bajo",
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };
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
            Inventario de Productos
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Mostrando {filteredProducts.length} de {mockProducts.length}{" "}
            productos
          </p>
        </div>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Agregar Producto
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock);

          return (
            <div
              key={product.id}
              className="rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              {/* Product Image */}
              <div
                className="h-48 flex items-center justify-center text-6xl"
                style={{ backgroundColor: "var(--input-bg)" }}
              >
                {product.image}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {product.category}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}
                  >
                    {stockStatus.text}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold line-clamp-1"
                  style={{ color: "var(--foreground)" }}
                >
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                {/* Price and Stock */}
                <div
                  className="flex items-center justify-between pt-2 border-t"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Precio
                    </p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {product.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Stock
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {product.stock}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    className="flex-1 px-3 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--foreground)",
                    }}
                  >
                    Ver Detalles
                  </button>
                  <button className="px-3 py-2 border border-green-600 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            No se encontraron productos
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Intenta con otro término de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
