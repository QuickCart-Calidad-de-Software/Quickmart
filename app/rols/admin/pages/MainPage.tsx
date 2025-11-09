"use client";

import { useState, useEffect } from "react";
import SignOutButton from "../../../_components/SignOutButton";
import UserManagementView from "../components/UserManagementView";
import ReportView from "../components/ReportView";
import ProductModerationView from "../components/Products";

interface AdminDashboardProps {
  userName: string;
}

export default function AdminDashboard({ userName }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<
    | "Dashboard"
    | "Usuarios"
    | "Vendedores"
    | "Productos"
    | "Pedidos"
    | "Reportes"
  >("Dashboard");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📊</div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Dashboard Principal
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Selecciona una sección del menú lateral
            </p>
          </div>
        );

      case "Usuarios":
        return (
          <div className="space-y-6">
            <UserManagementView />
          </div>
        );

      case "Productos":
        return (
          <div className="space-y-6">
            <ProductModerationView />
          </div>
        );

      case "Pedidos":
        return (
          <div className="space-y-6">
            <ReportView />
          </div>
        );

      case "Reportes":
        return (
          <div className="space-y-6">
            <ReportView />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
        className="border-b px-8 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              QuickMart Admin
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-lg hover:opacity-80">
              <svg
                className="w-6 h-6"
                style={{ color: "var(--foreground)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  {userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Administrador
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
          className="w-64 border-r min-h-[calc(100vh-73px)] p-6 flex flex-col"
        >
          <nav className="flex flex-col gap-2 flex-1">
            {/* Dashboard */}
            <button
              onClick={() => setActiveSection("Dashboard")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "Dashboard"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={
                activeSection !== "Dashboard"
                  ? { color: "var(--foreground)" }
                  : {}
              }
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </button>

            {/* Usuarios */}
            <button
              onClick={() => setActiveSection("Usuarios")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "Usuarios"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={
                activeSection !== "Usuarios"
                  ? { color: "var(--foreground)" }
                  : {}
              }
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Usuarios
            </button>

            {/* Productos */}
            <button
              onClick={() => setActiveSection("Productos")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "Productos"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={
                activeSection !== "Productos"
                  ? { color: "var(--foreground)" }
                  : {}
              }
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Productos
            </button>

            {/* Reportes */}
            <button
              onClick={() => setActiveSection("Reportes")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "Reportes"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={
                activeSection !== "Reportes"
                  ? { color: "var(--foreground)" }
                  : {}
              }
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Reportes
            </button>
          </nav>

          {/* Botón de tema en la parte inferior */}
          <div
            className="mt-auto pt-6"
            style={{
              borderColor: "var(--border-color)",
              borderTopWidth: "1px",
            }}
          >
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:opacity-80 transition-all"
              style={{ backgroundColor: "var(--input-bg)" }}
              aria-label="Toggle theme"
            >
              <span
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                {isDark ? "Modo Claro" : "Modo Oscuro"}
              </span>
              {isDark ? (
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  style={{ color: "var(--foreground)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 p-8"
          style={{ backgroundColor: "var(--background)" }}
        >
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}
