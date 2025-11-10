"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cargar preferencia guardada o detectar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validaciones
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
      }

      setSuccess("¡Registro exitoso! Redirigiendo al login...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen transition-colors" style={{ background: 'var(--background)' }}>
      {/* Botón de toggle tema - esquina superior derecha */}
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-lg transition-all duration-200 border border-gray-300 dark:border-gray-600"
        aria-label="Toggle theme"
      >
        {isDark ? (
          // Icono de sol (para cambiar a modo claro)
          <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          // Icono de luna (para cambiar a modo oscuro)
          <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

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
            Crear Cuenta
          </h1>
          <p 
            className="text-lg"
            style={{ color: "var(--muted-foreground)" }}
          >
            Únete a la comunidad QuickMart
          </p>
        </div>

        {/* Mensaje de error - Modern Alert */}
        {error && (
          <div className="mb-6 bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 text-rose-700 dark:text-rose-400 text-center rounded-xl py-3 px-4 border border-rose-200 dark:border-rose-800 font-medium">
            {error}
          </div>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-400 text-center rounded-xl py-3 px-4 border border-green-200 dark:border-green-800 font-medium">
            {success}
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

          {/* Input Confirm Password - Modern Style */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-bold mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
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

          {/* Botón Registrar - Modern Gradient */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-lg mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
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
                Creando cuenta...
              </span>
            ) : (
              "Crear Cuenta"
            )}
          </button>
        </form>

        {/* Separador - Modern Line */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div 
              className="w-full border-t-2"
              style={{ borderColor: "var(--border-color)" }}
            ></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span 
              className="px-4 glass font-semibold"
              style={{ 
                backgroundColor: "var(--card-bg)",
                color: "var(--muted-foreground)" 
              }}
            >
              o
            </span>
          </div>
        </div>

        {/* Botón de Login - Modern Style */}
        <a
          href="/auth/login"
          className="w-full py-4 mt-4 text-center block rounded-xl border-2 hover:border-indigo-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            color: "var(--foreground)",
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-2xl">🔑</span>
            <span className="font-bold">Ya tengo cuenta</span>
          </span>
        </a>

        {/* Texto adicional - Modern Typography */}
        <div className="mt-6 text-center">
          <p 
            className="text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            ¿Ya tienes cuenta?{" "}
            <a 
              href="/auth/login"
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}