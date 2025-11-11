'use client';

import { useState } from 'react';
import { X, Upload, Package } from 'lucide-react';
import { SellerProduct } from '@/app/_types/product';

interface ProductFormProps {
  onSubmit: (product: Omit<SellerProduct, 'id'>) => void;
  onCancel: () => void;
  initialProduct?: SellerProduct;
}

export default function ProductForm({ onSubmit, onCancel, initialProduct }: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: initialProduct?.title || '',
    short_description: initialProduct?.short_description || '',
    description: initialProduct?.description || '',
    price: initialProduct?.price || '',
    stock: initialProduct?.stock || '',
    category: initialProduct?.category || 'Electrónicos',
    image: initialProduct?.image || '',
  });

  const categories = [
    'Electrónicos',
    'Ropa',
    'Hogar',
    'Deportes',
    'Juguetes',
    'Libros',
    'Belleza',
    'Alimentos',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.title || !formData.price || !formData.stock) {
      alert('Por favor completa todos los campos requeridos: Título, Precio y Stock');
      return;
    }

    // Crear el objeto del producto con los nombres correctos para la API
    const productData = {
      title: formData.title,
      short_description: formData.short_description || formData.title,
      description: formData.description || formData.short_description || formData.title,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      image: formData.image,
    };

    onSubmit(productData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-light text-neutral-900 uppercase tracking-wider">
            {initialProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-neutral-100 rounded-sm transition-all"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-xs font-light text-neutral-900 uppercase tracking-wider mb-2">
              Título del Producto *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-light"
              placeholder="Ej: Nike Air Max 2024"
            />
          </div>

          {/* Descripción Corta */}
          <div>
            <label className="block text-xs font-light text-neutral-900 uppercase tracking-wider mb-2">
              Descripción Corta
            </label>
            <input
              type="text"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-light"
              placeholder="Breve descripción del producto"
            />
          </div>

          {/* Descripción Completa */}
          <div>
            <label className="block text-xs font-light text-neutral-900 uppercase tracking-wider mb-2">
              Descripción Completa
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-light resize-none"
              placeholder="Descripción detallada del producto"
            />
          </div>

          {/* Precio y Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-light text-neutral-900 uppercase tracking-wider mb-2">
                Precio (MXN) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-light"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-xs font-light text-neutral-900 uppercase tracking-wider mb-2">
                Stock *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-light"
                placeholder="0"
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-xs font-light text-neutral-900 uppercase tracking-wider mb-2">
              Categoría
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-light"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-xs font-light text-neutral-900 uppercase tracking-wider mb-2">
              Imagen del Producto (URL)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-light"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.image && (
              <div className="mt-4 relative aspect-square max-w-xs overflow-hidden rounded-sm border border-neutral-200">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80';
                  }}
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-neutral-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-sm text-sm font-normal uppercase tracking-wider hover:bg-neutral-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-sm text-sm font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              {initialProduct ? 'Actualizar' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
