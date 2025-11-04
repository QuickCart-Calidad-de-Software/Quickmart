"use client";

import { signInAction } from "@/app/_lib/actions";
import { useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-200 dark:border-slate-700"
    >
      <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-6">
        Login
      </h1>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-center rounded-md py-2 mb-4 border border-red-300 dark:border-red-700">
          {error}
        </div>
      )}

      <label htmlFor="email" className="text-slate-900 dark:text-white mb-1 font-medium">
        Email
      </label>
      <input
        type="text"
        name="email"
        id="email"
        className="mb-4 p-2 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        placeholder="you@example.com"
      />

      <label htmlFor="password" className="text-slate-900 dark:text-white mb-1 font-medium">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="mb-6 p-2 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        placeholder="Your password"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors"
      >
        Login
      </button>
    </form>
  );
}
