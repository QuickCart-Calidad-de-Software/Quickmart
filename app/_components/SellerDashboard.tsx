"use client";

import { useState } from "react";

interface Order {
  id: string;
  product: string;
  date: string;
  price: string;
  status: "Pending" | "Shipped";
}

interface Message {
  id: string;
  sender: string;
  message: string;
  time: string;
}

const mockOrders: Order[] = [
  { id: "1", product: "Milwaukee 2801-80 18Volts with...", date: "10/2/2020", price: "$150.00", status: "Pending" },
  { id: "2", product: "Milwaukee 2801-80 18Volts with...", date: "10/2/2020", price: "$150.00", status: "Shipped" },
  { id: "3", product: "Milwaukee 2801-80 18Volts with...", date: "10/2/2020", price: "$150.00", status: "Shipped" },
  { id: "4", product: "Milwaukee 2801-80 18Volts with...", date: "10/2/2020", price: "$150.00", status: "Shipped" },
  { id: "5", product: "Milwaukee 2801-80 18Volts with...", date: "10/2/2020", price: "$150.00", status: "Shipped" },
];

const mockMessages: Message[] = [
  { id: "1", sender: "Charles V.", message: "Lorem ipsum dolor sit amet, consectetur...", time: "11.24am" },
  { id: "2", sender: "Charles V.", message: "Lorem ipsum dolor sit amet, consectetur...", time: "11.24am" },
  { id: "3", sender: "Charles V.", message: "Lorem ipsum dolor sit amet, consectetur...", time: "11.24am" },
];

interface SellerDashboardProps {
  userName: string;
}

export default function SellerDashboard({ userName }: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"Buyer" | "Seller">("Buyer");
  const [activeSection, setActiveSection] = useState<"Dashboard" | "Pedidos" | "Estado de Inventario" | "Estadísticas Básicas"| "Settings">("Dashboard");

  // Función para renderizar el contenido según la sección activa
  const renderMainContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <>
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("Buyer")}
                className={`px-4 py-2 ${
                  activeTab === "Buyer"
                    ? "border-b-2 border-green-500 text-green-500"
                    : ""
                }`}
              >
                Buyer
              </button>
              <button
                onClick={() => setActiveTab("Seller")}
                className={`px-4 py-2 flex items-center gap-2 ${
                  activeTab === "Seller"
                    ? "border-b-2 border-green-500 text-green-500"
                    : ""
                }`}
              >
                <span className="text-green-500">+</span> Become a seller
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Profile Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <p className="text-sm text-gray-500 mb-4">PROFILE</p>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
                  <h3 className="font-semibold text-lg">Robert Zimmerman</h3>
                  <p className="text-sm text-gray-500 mb-4">Member since 01/01/2020</p>
                  <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 dark:hover:bg-blue-900">
                    My settings
                  </button>
                </div>
              </div>

              {/* Orders Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow col-span-1">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">MY ORDERS</p>
                  <button className="text-blue-500 text-sm">See all</button>
                </div>
                <div className="space-y-3">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-10 h-10 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{order.product}</p>
                        <p className="text-xs text-gray-500">{order.date} · {order.price}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        order.status === "Pending"
                          ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                          : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      }`}>
                        ● {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Messages Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">MESSAGES</p>
                  <button className="text-blue-500 text-sm">See all</button>
                </div>
                <div className="space-y-4 mb-6">
                  {mockMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-sm">{msg.sender}</p>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Empty State */}
                <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="mb-4">
                    <svg className="w-20 h-20 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-4">Can't find what you're looking for?</p>
                  <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 dark:hover:bg-blue-900">
                    Create a Want
                  </button>
                </div>
              </div>

              {/* Most Popular Section */}
              <div className="col-span-3 bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">MOST POPULAR</p>
                  <button className="text-blue-500 text-sm">See all</button>
                </div>
                <div className="relative">
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 z-10">
                    ‹
                  </button>
                  <div className="flex items-center justify-center">
                    <div className="text-center max-w-xs">
                      <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4"></div>
                      <p className="text-sm font-medium mb-2">ASRock Phantom Gaming D Radeon RX 570 DirectX 12 RX570 4G 4GB 256-Bit...</p>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <span className="text-yellow-400">★★★★★</span>
                      </div>
                      <p className="text-lg font-bold">$190.00</p>
                    </div>
                  </div>
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 z-10">
                    ›
                  </button>
                </div>
              </div>
            </div>
          </>
        );

      case "Pedidos":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold mb-6">My Wants</h2>
            <div className="text-center py-16">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"></path>
              </svg>
              <p className="text-gray-500 text-lg mb-6">You haven't created any wants yet</p>
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                Create Your First Want
              </button>
            </div>
          </div>
        );

      case "Estado de Inventario":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold mb-6">Estado de Inventario</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div>
                    <p className="font-semibold">Milwaukee 2801-80 18Volts with...</p>
                    <p className="text-sm text-gray-500">Transaction ID: #TX123456</p>
                    <p className="text-xs text-gray-400">10/2/2020</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">$150.00</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
                    Completed
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div>
                    <p className="font-semibold">ASRock Phantom Gaming...</p>
                    <p className="text-sm text-gray-500">Transaction ID: #TX123455</p>
                    <p className="text-xs text-gray-400">09/28/2020</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">$190.00</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Estadísticas Básicas":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold mb-6">Estadísticas Básicas</h2>
            <div className="space-y-4">
              {mockMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold">{msg.sender}</p>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{msg.message}</p>
                  </div>
                  <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                </div>
              ))}
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold mb-6">Configuración de la Cuenta</h2>
            <div className="space-y-6">
              {/* Profile Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Información del Perfil</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Robert Zimmerman"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="robert@example.com"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span className="text-sm">Email notifications for new messages</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span className="text-sm">Email notifications for order updates</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">Marketing emails</span>
                  </label>
                </div>
              </div>

              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                Save Changes
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
          <h1 className="text-xl font-bold">Bienvenido {userName}</h1>
        </div>
        
        <nav className="flex items-center gap-6">
          <button className="hover:text-blue-500">Browse</button>
          <button className="hover:text-blue-500">Wants</button>
          <button className="relative hover:text-blue-500">
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            Messages
          </button>
          <button className="hover:text-blue-500">Cart</button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>{userName}</span>
          </div>
        </nav>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 dark:border-gray-700 min-h-screen p-6">
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setActiveSection("Dashboard")}
              className={`text-left px-4 py-2 rounded ${
                activeSection === "Dashboard"
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection("Wants")}
              className={`text-left px-4 py-2 rounded ${
                activeSection === "Wants"
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Wants
            </button>
            <button
              onClick={() => setActiveSection("Transactions")}
              className={`text-left px-4 py-2 rounded ${
                activeSection === "Transactions"
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveSection("Inbox")}
              className={`text-left px-4 py-2 rounded relative ${
                activeSection === "Inbox"
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Inbox
              <span className="absolute right-2 top-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setActiveSection("Settings")}
              className={`text-left px-4 py-2 rounded ${
                activeSection === "Settings"
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}