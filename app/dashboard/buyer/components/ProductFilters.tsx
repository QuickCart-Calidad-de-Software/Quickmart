'use client';

import { Product, FilterOptions } from '../../../_types/product';
import { Search, SlidersHorizontal, MapPin, Star } from 'lucide-react';
import { useState } from 'react';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  categories: string[];
}

export default function ProductFilters({ filters, onFilterChange, categories }: ProductFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
      >
        <SlidersHorizontal className="w-5 h-5" />
        {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-6 pt-4 border-t border-gray-100">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Categoría
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Rango de precio
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Mín"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  onFilterChange({ ...filters, minPrice: Number(e.target.value) })
                }
                className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <input
                type="number"
                placeholder="Máx"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  onFilterChange({ ...filters, maxPrice: Number(e.target.value) })
                }
                className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Calificación mínima
            </label>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => onFilterChange({ ...filters, minRating: rating })}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gray-300" />
                    ))}
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 ml-1">
                      y más
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <MapPin className="w-4 h-4 inline mr-1" />
              Ubicación
            </label>
            <input
              type="text"
              placeholder="Ciudad o código postal"
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mb-3"
            />
            <label className="block text-xs text-gray-600 mb-2">
              Distancia máxima (km)
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={filters.maxDistance}
              onChange={(e) =>
                onFilterChange({ ...filters, maxDistance: Number(e.target.value) })
              }
              className="w-full accent-blue-600"
            />
            <div className="text-right text-sm text-gray-600 mt-1">
              {filters.maxDistance} km
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Ordenar por
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })
              }
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="name">Nombre</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificación</option>
              <option value="distance">Más Cercano</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
