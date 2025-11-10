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
          <span className="text-3xl font-black text-gradient">
            QuickMart
          </span>
        </div>
      </div>

      {/* Título - Modern Typography */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
          Bienvenido de nuevo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
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
            className="block text-sm font-bold mb-2 text-slate-900 dark:text-slate-50"
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input-modern w-full"
            placeholder="tu@email.com"
            required
          />
        </div>

        {/* Input Password - Modern Style */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-bold mb-2 text-slate-900 dark:text-slate-50"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input-modern w-full"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Botón Sign In - Modern Gradient */}
        <button
          type="submit"
          className="btn-primary w-full py-4 text-lg mt-2"
        >
          Iniciar Sesión
        </button>
      </form>
<<<<<<< HEAD

      {/* Separador - Modern Line */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-slate-200 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 glass text-slate-600 dark:text-slate-400 font-semibold">
            o continúa con
          </span>
        </div>
      </div>

      {/* Botón de Registro - Modern Style */}
      <a
        href="/auth/register"
        className="btn-secondary w-full py-4 text-center block hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <span className="flex items-center justify-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="font-bold">Crear Cuenta Nueva</span>
        </span>
      </a>

      {/* Texto adicional - Modern Typography */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ¿Primera vez aquí? <span className="font-bold text-indigo-600 dark:text-indigo-400">Regístrate gratis</span>
        </p>
      </div>
=======
>>>>>>> b0c0aea04c785ae096ffde5dc072f626c1cf9c23
    </div>
  );
}

