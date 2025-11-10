"use client";

import { useEffect, useState } from "react";
import ProductModerationView from "@/app/dashboard/admin/_components/Products";
import ReportView from "@/app/dashboard/admin/_components/ReportView";
import UserManagementView from "@/app/dashboard/admin/_components/UserManagementView";
import SignOutButton from "@/app/_components/SignOutButton";

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState<
    | "Dashboard"
    | "Usuarios"
    | "Vendedores"
    | "Productos"
    | "Pedidos"
    | "Reportes"
  >("Dashboard");
  const [isDark, setIsDark] = useState(false);
  const [name, setName] = useState("");
  const role = "Admin";

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

    const userName = localStorage.getItem("userName") || "Admin";
    setName(userName);
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
    <div className="min-h-screen bg-[#1a1a1a] dark:bg-black">
      {/* Header - Estilo minimalista */}
      <header className="bg-[#1a1a1a] dark:bg-black border-b border-neutral-800 px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center gap-4">
            <button className="text-white hover:bg-neutral-800 p-2 rounded-lg transition-colors">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <h1 className="text-xl font-light text-white uppercase tracking-[0.2em]">
              QUICKMART
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-l border-neutral-800 pl-6">
              <div className="text-right">
                <p className="text-sm font-light text-white uppercase tracking-wider">
                  {role}
                </p>
                <p className="text-xs text-neutral-400 font-light">
                  {name}
                </p>
              </div>
              <button className="w-10 h-10 bg-white text-black rounded-sm flex items-center justify-center hover:bg-neutral-200 transition-colors">
                <span className="font-medium text-sm">
                  {name.charAt(0).toUpperCase()}
                </span>
              </button>
            </div>

            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Estilo minimalista */}
        <aside className="w-64 bg-[#1a1a1a] dark:bg-black border-r border-neutral-800 min-h-[calc(100vh-73px)] p-6 flex flex-col">
          <nav className="flex flex-col gap-1 flex-1">
            {/* Usuarios */}
            <button
              onClick={() => setActiveSection("Usuarios")}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all font-light text-sm uppercase tracking-wider ${
                activeSection === "Usuarios"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
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
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all font-light text-sm uppercase tracking-wider ${
                activeSection === "Productos"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
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
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-all font-light text-sm uppercase tracking-wider ${
                activeSection === "Reportes"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
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

        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white dark:bg-neutral-900">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}
