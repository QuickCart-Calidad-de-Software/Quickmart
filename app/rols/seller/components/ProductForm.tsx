'use client';

import { useState, useEffect } from 'react';
import { X, Save, Package, DollarSign, Hash, Tag } from 'lucide-react';
import { SellerProduct } from '@/app/_types/product';

interface ProductFormProps {
  product?: SellerProduct | null;
  onSubmit: (product: SellerProduct) => Promise<void>;
  onCancel: () => void;
}

const CATEGORIES = [
  'Electrónica',
  'Ropa y Calzado',
  'Hogar',
  'Deportes',
  'Muebles',
  'Accesorios',
  'Herramientas',
  'Libros',
  'Juguetes',
  'Alimentos',
];

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<SellerProduct>({
    title: '',
    description: '',
    category: CATEGORIES[0],
    price: 0,
    stock: 0,
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (field: keyof SellerProduct, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar el producto. Por favor, intenta de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-neutral-200 rounded-sm shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-light text-neutral-900 tracking-tight uppercase">
            {product?.id ? 'Actualizar Producto' : 'Publicar Producto'}
          </h2>
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="p-2 hover:bg-neutral-100 rounded-sm transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Título */}
          <div>
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-normal text-neutral-700 mb-2 uppercase tracking-wider"
            >
              <Tag className="w-4 h-4" />
              Título del Producto *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
              className="w-full px-4 py-3 border border-neutral-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all text-neutral-900"
              placeholder="Nombre del producto"
            />
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-normal text-neutral-700 mb-2 uppercase tracking-wider"
            >
              <Package className="w-4 h-4" />
              Descripción *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 border border-neutral-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-none text-neutral-900"
              placeholder="Describe tu producto en detalle..."
            />
          </div>

          {/* Categoría */}
          <div>
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-normal text-neutral-700 mb-2 uppercase tracking-wider"
            >
              <Tag className="w-4 h-4" />
              Categoría *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              required
              className="w-full px-4 py-3 border border-neutral-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-white text-neutral-900"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Precio */}
            <div>
              <label
                htmlFor="price"
                className="flex items-center gap-2 text-sm font-normal text-neutral-700 mb-2 uppercase tracking-wider"
              >
                <DollarSign className="w-4 h-4" />
                Precio (MXN) *
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all text-neutral-900"
                placeholder="0.00"
              />
            </div>

            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="flex items-center gap-2 text-sm font-normal text-neutral-700 mb-2 uppercase tracking-wider"
              >
                <Hash className="w-4 h-4" />
                Stock *
              </label>
              <input
                id="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all text-neutral-900"
                placeholder="0"
              />
            </div>
          </div>

          {/* URL de Imagen */}
          <div>
            <label
              htmlFor="image"
              className="flex items-center gap-2 text-sm font-normal text-neutral-700 mb-2 uppercase tracking-wider"
            >
              <Package className="w-4 h-4" />
              URL de Imagen
            </label>
            <input
              id="image"
              type="url"
              value={formData.image || ''}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all text-neutral-900"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.image && (
              <div className="mt-4 border border-neutral-200 rounded-sm overflow-hidden">
                <img
                  src={formData.image}
                  alt="Vista previa"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 text-neutral-700 rounded-sm text-sm font-normal uppercase tracking-wider hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 text-white rounded-sm text-sm font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {product?.id ? 'Actualizar' : 'Publicar'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
