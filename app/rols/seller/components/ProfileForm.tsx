'use client';

import { useState } from 'react';
import { User, MapPin, Save, X } from 'lucide-react';
import { SellerProfile } from '@/app/_types/product';

interface ProfileFormProps {
  profile: SellerProfile;
  onUpdate: (updatedProfile: Partial<SellerProfile>) => Promise<void>;
}

export default function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || '',
    location: profile.location || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil. Por favor, intenta de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name || '',
      location: profile.location || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-sm shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-neutral-900 tracking-tight uppercase">
          Perfil del Vendedor
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-neutral-900 text-white rounded-sm text-sm font-normal uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Editar Perfil
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label
            htmlFor="name"
            className="flex items-center gap-2 text-sm font-normal text-neutral-700 mb-2 uppercase tracking-wider"
          >
            <User className="w-4 h-4" />
            Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={!isEditing}
            required
            className={`w-full px-4 py-3 border border-neutral-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all text-neutral-900 ${
              !isEditing ? 'bg-neutral-50 text-neutral-600 cursor-not-allowed' : 'bg-white text-neutral-900'
            }`}
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Ubicación */}
        <div>
          <label
            htmlFor="location"
            className="flex items-center gap-2 text-sm font-normal text-neutral-700 mb-2 uppercase tracking-wider"
          >
            <MapPin className="w-4 h-4" />
            Ubicación
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            disabled={!isEditing}
            required
            className={`w-full px-4 py-3 border border-neutral-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all text-neutral-900 ${
              !isEditing ? 'bg-neutral-50 text-neutral-600 cursor-not-allowed' : 'bg-white text-neutral-900'
            }`}
            placeholder="Ciudad, País"
          />
        </div>

        {/* Botones de acción */}
        {isEditing && (
          <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={handleCancel}
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
                  Actualizando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Actualizar
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
