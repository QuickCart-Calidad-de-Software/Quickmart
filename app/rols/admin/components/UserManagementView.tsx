"use client";

import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Usuario" | "Vendedor" | "Administrador";
  status: "Activo" | "Suspendido" | "Inactivo";
  registrationDate: string;
  lastAccess: string;
}

export default function UserManagementView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("Todos");
  const [filterStatus, setFilterStatus] = useState<string>("Todos");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<"suspend" | "activate" | null>(null);

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: "USR-001",
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      role: "Usuario",
      status: "Activo",
      registrationDate: "2024-01-15",
      lastAccess: "2024-11-08"
    },
    {
      id: "USR-002",
      name: "María González",
      email: "maria.gonzalez@example.com",
      role: "Vendedor",
      status: "Activo",
      registrationDate: "2024-02-20",
      lastAccess: "2024-11-07"
    },
    {
      id: "USR-003",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@example.com",
      role: "Usuario",
      status: "Suspendido",
      registrationDate: "2024-03-10",
      lastAccess: "2024-10-15"
    },
    {
      id: "USR-004",
      name: "Ana Martínez",
      email: "ana.martinez@example.com",
      role: "Vendedor",
      status: "Activo",
      registrationDate: "2024-04-05",
      lastAccess: "2024-11-08"
    },
    {
      id: "USR-005",
      name: "Luis Hernández",
      email: "luis.hernandez@example.com",
      role: "Usuario",
      status: "Inactivo",
      registrationDate: "2024-01-25",
      lastAccess: "2024-08-20"
    },
    {
      id: "USR-006",
      name: "Patricia López",
      email: "patricia.lopez@example.com",
      role: "Administrador",
      status: "Activo",
      registrationDate: "2023-11-10",
      lastAccess: "2024-11-08"
    },
    {
      id: "USR-007",
      name: "Roberto Sánchez",
      email: "roberto.sanchez@example.com",
      role: "Usuario",
      status: "Suspendido",
      registrationDate: "2024-05-12",
      lastAccess: "2024-09-30"
    },
    {
      id: "USR-008",
      name: "Sofía Ramírez",
      email: "sofia.ramirez@example.com",
      role: "Vendedor",
      status: "Activo",
      registrationDate: "2024-06-18",
      lastAccess: "2024-11-08"
    },
    {
      id: "USR-009",
      name: "Diego Torres",
      email: "diego.torres@example.com",
      role: "Usuario",
      status: "Activo",
      registrationDate: "2024-07-22",
      lastAccess: "2024-11-06"
    },
    {
      id: "USR-010",
      name: "Valentina Flores",
      email: "valentina.flores@example.com",
      role: "Vendedor",
      status: "Suspendido",
      registrationDate: "2024-08-30",
      lastAccess: "2024-10-20"
    }
  ]);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = filterRole === "Todos" || user.role === filterRole;
    const matchesStatus = filterStatus === "Todos" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Suspendido":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Inactivo":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getRoleColor = (role: User["role"]) => {
    switch (role) {
      case "Administrador":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Vendedor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Usuario":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const handleSuspendUser = (user: User) => {
    setSelectedUser(user);
    setActionType("suspend");
    setShowModal(true);
  };

  const handleActivateUser = (user: User) => {
    setSelectedUser(user);
    setActionType("activate");
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedUser || !actionType) return;

    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === selectedUser.id
          ? { ...user, status: actionType === "suspend" ? "Suspendido" : "Activo" }
          : user
      )
    );

    setShowModal(false);
    setSelectedUser(null);
    setActionType(null);
  };

  const cancelAction = () => {
    setShowModal(false);
    setSelectedUser(null);
    setActionType(null);
  };

  // Calculate statistics
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "Activo").length,
    suspended: users.filter(u => u.status === "Suspendido").length,
    inactive: users.filter(u => u.status === "Inactivo").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            Gestión de Usuarios
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Administra y supervisa los usuarios de la plataforma
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Usuario
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          className="rounded-lg p-4 border"
          style={{ 
            backgroundColor: "var(--card-bg)", 
            borderColor: "var(--border-color)" 
          }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Usuarios</p>
          <p className="text-2xl font-bold mt-1" style={{ color: "var(--foreground)" }}>
            {stats.total}
          </p>
        </div>
        <div 
          className="rounded-lg p-4 border"
          style={{ 
            backgroundColor: "var(--card-bg)", 
            borderColor: "var(--border-color)" 
          }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Activos</p>
          <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
            {stats.active}
          </p>
        </div>
        <div 
          className="rounded-lg p-4 border"
          style={{ 
            backgroundColor: "var(--card-bg)", 
            borderColor: "var(--border-color)" 
          }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Suspendidos</p>
          <p className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
            {stats.suspended}
          </p>
        </div>
        <div 
          className="rounded-lg p-4 border"
          style={{ 
            backgroundColor: "var(--card-bg)", 
            borderColor: "var(--border-color)" 
          }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Inactivos</p>
          <p className="text-2xl font-bold mt-1 text-gray-600 dark:text-gray-400">
            {stats.inactive}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div 
        className="rounded-lg p-6 border"
        style={{ 
          backgroundColor: "var(--card-bg)", 
          borderColor: "var(--border-color)" 
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>
              Buscar
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre, email o ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--foreground)"
                }}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter by Role */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>
              Filtrar por Rol
            </label>
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)"
              }}
            >
              <option>Todos</option>
              <option>Usuario</option>
              <option>Vendedor</option>
              <option>Administrador</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>
              Filtrar por Estado
            </label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)"
              }}
            >
              <option>Todos</option>
              <option>Activo</option>
              <option>Suspendido</option>
              <option>Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div 
        className="rounded-lg shadow-sm border overflow-hidden"
        style={{ 
          backgroundColor: "var(--card-bg)", 
          borderColor: "var(--border-color)" 
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead 
              className="border-b"
              style={{ 
                backgroundColor: "var(--input-bg)", 
                borderColor: "var(--border-color)" 
              }}
            >
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha de Ingreso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {user.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {user.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.registrationDate).toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.lastAccess).toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {user.status === "Activo" ? (
                        <button 
                          onClick={() => handleSuspendUser(user)}
                          className="px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded text-xs font-medium transition-colors"
                          title="Suspender cuenta"
                        >
                          Suspender
                        </button>
                      ) : user.status === "Suspendido" ? (
                        <button 
                          onClick={() => handleActivateUser(user)}
                          className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded text-xs font-medium transition-colors"
                          title="Habilitar cuenta"
                        >
                          Habilitar
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleActivateUser(user)}
                          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded text-xs font-medium transition-colors"
                          title="Activar cuenta"
                        >
                          Activar
                        </button>
                      )}
                      <button 
                        className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                        title="Ver detalles"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
              No se encontraron usuarios
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 border-t" style={{ borderColor: "var(--border-color)" }}>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {filteredUsers.length} de {users.length} usuarios
              </div>
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1 border rounded text-sm hover:opacity-80"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--foreground)"
                  }}
                >
                  Anterior
                </button>
                <button 
                  className="px-3 py-1 border rounded text-sm bg-blue-600 text-white"
                >
                  1
                </button>
                <button 
                  className="px-3 py-1 border rounded text-sm hover:opacity-80"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--foreground)"
                  }}
                >
                  2
                </button>
                <button 
                  className="px-3 py-1 border rounded text-sm hover:opacity-80"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--foreground)"
                  }}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
            style={{ backgroundColor: "var(--card-bg)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                actionType === "suspend" 
                  ? "bg-red-100 dark:bg-red-900/30" 
                  : "bg-green-100 dark:bg-green-900/30"
              }`}>
                {actionType === "suspend" ? (
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                  {actionType === "suspend" ? "Suspender Usuario" : "Habilitar Usuario"}
                </h3>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {actionType === "suspend" 
                ? `¿Estás seguro de que deseas suspender la cuenta de ${selectedUser.name}? El usuario no podrá acceder a la plataforma hasta que sea habilitado nuevamente.`
                : `¿Estás seguro de que deseas habilitar la cuenta de ${selectedUser.name}? El usuario podrá acceder nuevamente a la plataforma.`
              }
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelAction}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--foreground)"
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                  actionType === "suspend"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {actionType === "suspend" ? "Suspender" : "Habilitar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
