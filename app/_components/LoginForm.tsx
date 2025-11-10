"use client";

import { useState } from "react";
import { signInAction } from "../_lib/actions";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await signInAction(formData);

    if (!response.success) {
      setError(response.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="w-full max-w-md glass p-10 rounded-3xl shadow-2xl fade-in">
      {/* Logo - Modern Gradient */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-3 hover-lift cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-bold text-2xl">Q</span>
          </div>
          <span 
            className="text-3xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            QuickMart
          </span>
        </div>
      </div>

      {/* Título - Modern Typography */}
      <div className="mb-8 text-center">
        <h1 
          className="text-4xl font-black mb-3 tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          Bienvenido de nuevo
        </h1>
        <p 
          className="text-lg"
          style={{ color: "var(--muted-foreground)" }}
        >
          Ingresa a tu cuenta QuickMart
        </p>
      </div>

      {/* Mensaje de error - Modern Alert */}
      {error && (
        <div className="mb-6 bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 text-rose-700 dark:text-rose-400 text-center rounded-xl py-3 px-4 border border-rose-200 dark:border-rose-800 font-medium">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input Email - Modern Style */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-3 rounded-xl border-2 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--foreground)",
            }}
            placeholder="tu@email.com"
            required
          />
        </div>

        {/* Input Password - Modern Style */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-bold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-3 rounded-xl border-2 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--foreground)",
            }}
            placeholder="••••••••"
            required
          />
        </div>

        {/* Botón Sign In - Modern Gradient */}
        <button
          type="submit"
          className="w-full py-4 text-lg mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105"
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Separador - Modern Line */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-slate-200 dark:border-slate-700"></div>
        </div>
      </div>

      {/* Botón de Registro - Modern Style */}
      <a
        href="/auth/register"
        className="w-full py-4 text-center block rounded-xl border-2 hover:border-indigo-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
          color: "var(--foreground)",
        }}
      >
        <span className="flex items-center justify-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="font-bold">Crear Cuenta Nueva</span>
        </span>
      </a>
    </div>
  );
}

