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
          Log in
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Continue to QuickMart
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
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--foreground)",
            }}
            placeholder="********"
            required
          />
        </div>

        {/* Botón Continue */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
          style={{ background: "var(--button-bg)" }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

