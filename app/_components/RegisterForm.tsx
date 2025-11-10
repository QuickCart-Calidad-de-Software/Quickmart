"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setError("Las contraseñas no coinciden");
      return;
    }

    setPasswordMatch(true);

    // Validar longitud de contraseña
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    // Aquí iría la lógica de registro
    // Por ahora simulamos un registro exitoso
    try {
      // Simulación de llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirigir al login después de registro exitoso
      router.push("/auth/login");
    } catch (err) {
      setError("Error al crear la cuenta. Intenta nuevamente.");
    }
  };

  const handlePasswordChange = () => {
    setPasswordMatch(true);
    setError(null);
  };

  return (
    <div className="w-full max-w-md glass p-10 rounded-3xl shadow-2xl fade-in">
      {/* Logo - Modern Gradient */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3 hover-lift cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
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
          Únete a QuickMart
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Crea tu cuenta y empieza a comprar
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
            onChange={handlePasswordChange}
            className="input-modern w-full"
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            required
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Debe tener al menos 8 caracteres
          </p>
        </div>

        {/* Input Confirm Password - Modern Style */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-bold mb-2 text-slate-900 dark:text-slate-50"
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={handlePasswordChange}
            className={`input-modern w-full ${
              !passwordMatch ? "!border-rose-500 !ring-rose-500/10" : ""
            }`}
            placeholder="Repite tu contraseña"
            required
          />
          {!passwordMatch && (
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-2 font-semibold">
              ⚠️ Las contraseñas no coinciden
            </p>
          )}
        </div>

        {/* Términos y condiciones - Modern Checkbox */}
        <div className="flex items-start gap-3 card p-4">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            className="mt-1 w-5 h-5 text-emerald-600 border-slate-300 rounded-lg focus:ring-emerald-500 focus:ring-4"
          />
          <label
            htmlFor="terms"
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            Acepto los{" "}
            <a href="#" className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline">
              Términos y Condiciones
            </a>{" "}
            y la{" "}
            <a href="#" className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline">
              Política de Privacidad
            </a>
          </label>
        </div>

        {/* Botón Registrar - Modern Gradient */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg shadow-emerald-500/40 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-lg"
        >
          Crear Cuenta
        </button>
      </form>

      {/* Link a login - Modern Typography */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/auth/login"
            className="font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
          >
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
}
