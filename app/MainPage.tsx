"use client";

import { useState, useEffect } from "react";
import SignOutButton from "./_components/SignOutButton";
import DashboardView from "./dashboard/seller/_components/DashboardView";
import InventoryView from "./dashboard/seller/_components/InventoryView";
import OrdersView from "./dashboard/seller/_components/OrdersView";
import SettingsView from "./dashboard/seller/_components/SettingsView";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdate: string;
  image?: string;
}

interface Order {
  id: string;
  product: string;
  date: string;
  price: string;
  status: "Pending" | "Shipped" | "Delivered";
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Milwaukee 2801-80 18Volts Drill",
    category: "Power Tools",
    price: "$150.00",
    stock: 25,
    status: "In Stock",
    lastUpdate: "2 hours ago",
  },
  {
    id: "2",
    name: "ASRock Phantom Gaming RX 570",
    category: "Electronics",
    price: "$190.00",
    stock: 3,
    status: "Low Stock",
    lastUpdate: "5 hours ago",
  },
  {
    id: "3",
    name: "Samsung Galaxy S21 Ultra",
    category: "Smartphones",
    price: "$899.00",
    stock: 15,
    status: "In Stock",
    lastUpdate: "1 day ago",
  },
  {
    id: "4",
    name: "Apple iPhone 13 Pro Max",
    category: "Smartphones",
    price: "$1,099.00",
    stock: 0,
    status: "Out of Stock",
    lastUpdate: "3 days ago",
  },
  {
    id: "5",
    name: "Sony WH-1000XM4 Headphones",
    category: "Audio",
    price: "$348.00",
    stock: 12,
    status: "In Stock",
    lastUpdate: "6 hours ago",
  },
];

interface SellerDashboardProps {
  userName: string;
}

export default function SellerDashboard({ userName }: SellerDashboardProps) {
  const [activeSection, setActiveSection] = useState<
    "Dashboard" | "Pedidos" | "Estado de Inventario" | "Estadísticas Básicas" | "Settings"
  >("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Low Stock":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Out of Stock":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div className="space-y-6">
            <DashboardView 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              mockProducts={mockProducts} 
              getStatusColor={getStatusColor} 
            />
          </div>
        );

      case "Pedidos":
        return (
          <div className="space-y-6">
            <OrdersView searchQuery={searchQuery} />
          </div>
        );

      case "Estado de Inventario":
        return (
          <div className="space-y-6">
            <InventoryView searchQuery={searchQuery} />
          </div>
        );

      case "Settings":
        return (
          <div 
            className="rounded-lg p-8 shadow"
            style={{ backgroundColor: "var(--card-bg)" }}
          >
            <SettingsView />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <header style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }} className="border-b px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>QuickMart Seller</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-lg hover:opacity-80">
              <svg className="w-6 h-6" style={{ color: "var(--foreground)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Seller</p>
              </div>
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
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
            borderColor: "var(--border-color)" 
          }} 
          className="w-64 border-r min-h-[calc(100vh-73px)] p-6 flex flex-col"
        >
          <nav className="flex flex-col gap-2 flex-1">
            <button
              onClick={() => setActiveSection("Dashboard")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "Dashboard"
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={activeSection !== "Dashboard" ? { color: "var(--foreground)" } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection("Pedidos")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "Pedidos"
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={activeSection !== "Pedidos" ? { color: "var(--foreground)" } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Pedidos
            </button>
            <button
              onClick={() => setActiveSection("Estado de Inventario")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "Estado de Inventario"
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={activeSection !== "Estado de Inventario" ? { color: "var(--foreground)" } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Inventario
            </button>
            <button
              onClick={() => setActiveSection("Settings")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === "Settings"
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={activeSection !== "Settings" ? { color: "var(--foreground)" } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
          </nav>

          {/* Botón de tema en la parte inferior */}
          <div className="mt-auto pt-6" style={{ borderColor: "var(--border-color)", borderTopWidth: "1px" }}>
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:opacity-80 transition-all"
              style={{ backgroundColor: "var(--input-bg)" }}
              aria-label="Toggle theme"
            >
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {isDark ? "Modo Claro" : "Modo Oscuro"}
              </span>
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" style={{ color: "var(--foreground)" }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8" style={{ backgroundColor: "var(--background)" }}>{renderMainContent()}</main>
      </div>
    </div>
  );
}