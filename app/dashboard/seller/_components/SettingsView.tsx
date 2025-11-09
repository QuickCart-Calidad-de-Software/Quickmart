"use client";

import { useState } from "react";

interface SellerProfile {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  location: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  description: string;
}

export default function SettingsView() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock profile data
  const [profile, setProfile] = useState<SellerProfile>({
    name: "Juan Pérez",
    email: "juan.perez@quickmart.com",
    phone: "+52 55 1234 5678",
    businessName: "Tienda Juan - Electrónicos y Más",
    location: "Ciudad de México, México",
    address: "Av. Insurgentes Sur 1234",
    city: "Ciudad de México",
    state: "CDMX",
    zipCode: "03100",
    country: "México",
    description:
      "Vendedor especializado en productos electrónicos, herramientas y accesorios de alta calidad con más de 10 años de experiencia en el mercado.",
  });

  const [tempProfile, setTempProfile] = useState<SellerProfile>(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile(profile);
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setProfile(tempProfile);
    setIsEditing(false);
    setIsSaving(false);
    setShowSuccessMessage(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleInputChange = (field: keyof SellerProfile, value: string) => {
    setTempProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
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
            Configuración de Perfil
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestiona tu información personal y datos de negocio
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Editar Perfil
          </button>
        )}
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div
          className="rounded-lg p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-semibold text-green-800 dark:text-green-400">
                Perfil actualizado exitosamente
              </p>
              <p className="text-sm text-green-700 dark:text-green-500">
                Tus cambios han sido guardados correctamente.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Picture Section */}
      <div
        className="rounded-lg p-6 shadow-sm border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Foto de Perfil
        </h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white bg-gradient-to-br from-green-400 to-green-600">
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              JPG, GIF o PNG. Tamaño máximo de 2MB
            </p>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--foreground)",
                }}
                disabled={isEditing}
              >
                Subir nueva foto
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                disabled={isEditing}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div
        className="rounded-lg p-6 shadow-sm border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Información Personal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Nombre Completo *
            </label>
            <input
              type="text"
              value={isEditing ? tempProfile.name : profile.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
              style={{
                backgroundColor: isEditing
                  ? "var(--input-bg)"
                  : "var(--card-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
              placeholder="Ingresa tu nombre completo"
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Correo Electrónico *
            </label>
            <input
              type="email"
              value={isEditing ? tempProfile.email : profile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
              style={{
                backgroundColor: isEditing
                  ? "var(--input-bg)"
                  : "var(--card-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
              placeholder="tu@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Teléfono
            </label>
            <input
              type="tel"
              value={isEditing ? tempProfile.phone : profile.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
              style={{
                backgroundColor: isEditing
                  ? "var(--input-bg)"
                  : "var(--card-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
              placeholder="+52 55 1234 5678"
            />
          </div>

          {/* Business Name */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Nombre del Negocio *
            </label>
            <input
              type="text"
              value={
                isEditing ? tempProfile.businessName : profile.businessName
              }
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
              style={{
                backgroundColor: isEditing
                  ? "var(--input-bg)"
                  : "var(--card-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
              placeholder="Nombre de tu tienda"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Descripción del Negocio
          </label>
          <textarea
            value={isEditing ? tempProfile.description : profile.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            disabled={!isEditing}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
            style={{
              backgroundColor: isEditing ? "var(--input-bg)" : "var(--card-bg)",
              borderColor: "var(--input-border)",
              color: "var(--foreground)",
            }}
            placeholder="Describe tu negocio y los productos que ofreces..."
          />
        </div>
      </div>

      {/* Location Information */}
      <div
        className="rounded-lg p-6 shadow-sm border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Ubicación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address */}
          <div className="md:col-span-2">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Dirección *
            </label>
            <input
              type="text"
              value={isEditing ? tempProfile.address : profile.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
              style={{
                backgroundColor: isEditing
                  ? "var(--input-bg)"
                  : "var(--card-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
              placeholder="Calle y número"
            />
          </div>

          {/* City */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Ciudad *
            </label>
            <input
              type="text"
              value={isEditing ? tempProfile.city : profile.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
              style={{
                backgroundColor: isEditing
                  ? "var(--input-bg)"
                  : "var(--card-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
              placeholder="Ciudad"
            />
          </div>

          {/* State */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Estado/Provincia *
            </label>
            <input
              type="text"
              value={isEditing ? tempProfile.state : profile.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
              style={{
                backgroundColor: isEditing
                  ? "var(--input-bg)"
                  : "var(--card-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
              placeholder="Estado"
            />
          </div>

          {/* Zip Code */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Código Postal *
            </label>
            <input
              type="text"
              value={isEditing ? tempProfile.zipCode : profile.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
              style={{
                backgroundColor: isEditing
                  ? "var(--input-bg)"
                  : "var(--card-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
              placeholder="00000"
            />
          </div>

          {/* Country */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              País *
            </label>
            <input
              type="text"
              value={isEditing ? tempProfile.country : profile.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-60"
              style={{
                backgroundColor: isEditing
                  ? "var(--input-bg)"
                  : "var(--card-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
              placeholder="País"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons (shown when editing) */}
      {isEditing && (
        <div
          className="rounded-lg p-6 shadow-sm border flex items-center justify-between"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            * Campos obligatorios
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-6 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors disabled:opacity-50"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--foreground)",
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
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
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Account Security (read-only for now) */}
      {!isEditing && (
        <div
          className="rounded-lg p-6 shadow-sm border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Seguridad de la Cuenta
          </h3>
          <div className="space-y-4">
            <div
              className="flex items-center justify-between py-3 border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div>
                <p
                  className="font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Contraseña
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Última actualización hace 30 días
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                Cambiar contraseña
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p
                  className="font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Autenticación de dos factores
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Agrega una capa extra de seguridad a tu cuenta
                </p>
              </div>
              <button
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--foreground)",
                }}
              >
                Activar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
