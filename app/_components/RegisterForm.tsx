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
    <div
      className="w-full max-w-md p-8 rounded-2xl shadow-2xl transition-colors"
      style={{ background: "var(--card-bg)" }}
    >
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <span
            className="text-2xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            QuickMart
          </span>
        </div>
      </div>

      {/* Título */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Crear Cuenta
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Únete a QuickMart hoy
        </p>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-center rounded-md py-2 border border-red-300 dark:border-red-700">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--foreground)",
            }}
            placeholder="tu@email.com"
            required
          />
        </div>

        {/* Input Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--foreground)",
            }}
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Debe tener al menos 8 caracteres
          </p>
        </div>

        {/* Input Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={handlePasswordChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
              passwordMatch ? "focus:ring-green-500" : "focus:ring-red-500 border-red-500"
            }`}
            style={{
              background: "var(--input-bg)",
              borderColor: passwordMatch ? "var(--input-border)" : "#ef4444",
              color: "var(--foreground)",
            }}
            placeholder="Repite tu contraseña"
            required
          />
          {!passwordMatch && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Las contraseñas no coinciden
            </p>
          )}
        </div>

        {/* Términos y condiciones */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Acepto los{" "}
            <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
              Términos y Condiciones
            </a>{" "}
            y la{" "}
            <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
              Política de Privacidad
            </a>
          </label>
        </div>

        {/* Botón Registrar */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
          style={{ background: "var(--button-bg)" }}
        >
          Crear Cuenta
        </button>
      </form>

      {/* Link a login */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/auth/login"
            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
          >
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
}
