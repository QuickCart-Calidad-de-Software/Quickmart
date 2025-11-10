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
  const [actionType, setActionType] = useState<"suspend" | "activate" | null>(
    null
  );

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: "USR-001",
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      role: "Usuario",
      status: "Activo",
      registrationDate: "2024-01-15",
      lastAccess: "2024-11-08",
    },
    {
      id: "USR-002",
      name: "María González",
      email: "maria.gonzalez@example.com",
      role: "Vendedor",
      status: "Activo",
      registrationDate: "2024-02-20",
      lastAccess: "2024-11-07",
    },
    {
      id: "USR-003",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@example.com",
      role: "Usuario",
      status: "Suspendido",
      registrationDate: "2024-03-10",
      lastAccess: "2024-10-15",
    },
    {
      id: "USR-004",
      name: "Ana Martínez",
      email: "ana.martinez@example.com",
      role: "Vendedor",
      status: "Activo",
      registrationDate: "2024-04-05",
      lastAccess: "2024-11-08",
    },
    {
      id: "USR-005",
      name: "Luis Hernández",
      email: "luis.hernandez@example.com",
      role: "Usuario",
      status: "Inactivo",
      registrationDate: "2024-01-25",
      lastAccess: "2024-08-20",
    },
    {
      id: "USR-006",
      name: "Patricia López",
      email: "patricia.lopez@example.com",
      role: "Administrador",
      status: "Activo",
      registrationDate: "2023-11-10",
      lastAccess: "2024-11-08",
    },
    {
      id: "USR-007",
      name: "Roberto Sánchez",
      email: "roberto.sanchez@example.com",
      role: "Usuario",
      status: "Suspendido",
      registrationDate: "2024-05-12",
      lastAccess: "2024-09-30",
    },
    {
      id: "USR-008",
      name: "Sofía Ramírez",
      email: "sofia.ramirez@example.com",
      role: "Vendedor",
      status: "Activo",
      registrationDate: "2024-06-18",
      lastAccess: "2024-11-08",
    },
    {
      id: "USR-009",
      name: "Diego Torres",
      email: "diego.torres@example.com",
      role: "Usuario",
      status: "Activo",
      registrationDate: "2024-07-22",
      lastAccess: "2024-11-06",
    },
    {
      id: "USR-010",
      name: "Valentina Flores",
      email: "valentina.flores@example.com",
      role: "Vendedor",
      status: "Suspendido",
      registrationDate: "2024-08-30",
      lastAccess: "2024-10-20",
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === "Todos" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "Todos" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "Activo":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20";
      case "Suspendido":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";
      case "Inactivo":
        return "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20";
    }
  };

  const getRoleColor = (role: User["role"]) => {
    switch (role) {
      case "Administrador":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
      case "Vendedor":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      case "Usuario":
        return "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20";
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

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              status: actionType === "suspend" ? "Suspendido" : "Activo",
            }
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

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Activo").length,
    suspended: users.filter((u) => u.status === "Suspendido").length,
    inactive: users.filter((u) => u.status === "Inactivo").length,
  };

  return (
    <div className="space-y-6">
      {/* Header - Estilo minimalista */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-neutral-900 dark:text-white uppercase tracking-wider">
            Gestión de Usuarios
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-light">
            Administra y supervisa los usuarios de la plataforma
          </p>
        </div>
        <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-sm text-xs font-light uppercase tracking-wider hover:opacity-80 transition-all flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nuevo Usuario
        </button>
      </div>

      {/* Stats Cards - Estilo minimalista */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-sm p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-light mb-2">
            Total Usuarios
          </p>
          <p className="text-3xl font-light text-neutral-900 dark:text-white">
            {stats.total}
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-sm p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-light mb-2">
            Activos
          </p>
          <p className="text-3xl font-light text-green-600 dark:text-green-400">
            {stats.active}
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-sm p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-light mb-2">
            Suspendidos
          </p>
          <p className="text-3xl font-light text-red-600 dark:text-red-400">
            {stats.suspended}
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-sm p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-light mb-2">
            Inactivos
          </p>
          <p className="text-3xl font-light text-neutral-600 dark:text-neutral-400">
            {stats.inactive}
          </p>
        </div>
      </div>

      {/* Filters - Estilo minimalista */}
      <div className="bg-white dark:bg-neutral-800 rounded-sm p-6 border border-neutral-200 dark:border-neutral-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-light text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nombre, email o ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-neutral-900 dark:text-white font-light text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-light text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
              Filtrar por Rol
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-neutral-900 dark:text-white font-light text-sm"
            >
              <option>Todos</option>
              <option>Usuario</option>
              <option>Vendedor</option>
              <option>Administrador</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-light text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
              Filtrar por Estado
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors text-neutral-900 dark:text-white font-light text-sm"
            >
              <option>Todos</option>
              <option>Activo</option>
              <option>Suspendido</option>
              <option>Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table - Estilo minimalista */}
      <div className="bg-white dark:bg-neutral-800 rounded-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-light text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-light text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  ID Usuario
                </th>
                <th className="px-6 py-4 text-left text-xs font-light text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-4 text-left text-xs font-light text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-light text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-xs font-light text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Fecha de Ingreso
                </th>
                <th className="px-6 py-4 text-left text-xs font-light text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-4 text-left text-xs font-light text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs font-light rounded-sm uppercase tracking-wider ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-light text-neutral-900 dark:text-white">
                      {user.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-sm bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mr-3 border border-neutral-200 dark:border-neutral-700">
                        <span className="text-neutral-600 dark:text-neutral-400 font-light text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-sm font-light text-neutral-900 dark:text-white">
                        {user.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs font-light rounded-sm uppercase tracking-wider ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                      {new Date(user.registrationDate).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                      {new Date(user.lastAccess).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {user.status === "Activo" ? (
                        <button
                          onClick={() => handleSuspendUser(user)}
                          className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 rounded-sm text-xs font-light uppercase tracking-wider transition-colors"
                          title="Suspender cuenta"
                        >
                          Suspender
                        </button>
                      ) : user.status === "Suspendido" ? (
                        <button
                          onClick={() => handleActivateUser(user)}
                          className="px-3 py-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-600 dark:text-green-400 rounded-sm text-xs font-light uppercase tracking-wider transition-colors"
                          title="Habilitar cuenta"
                        >
                          Habilitar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivateUser(user)}
                          className="px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-sm text-xs font-light uppercase tracking-wider transition-colors"
                          title="Activar cuenta"
                        >
                          Activar
                        </button>
                      )}
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
            <h3 className="text-xl font-light text-neutral-900 dark:text-white mb-2 uppercase tracking-wider">
              No se encontraron usuarios
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 font-light">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal - Estilo minimalista */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-sm p-8 max-w-md w-full mx-4 shadow-2xl border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-sm flex items-center justify-center ${
                  actionType === "suspend"
                    ? "bg-red-500/10 border border-red-500/20"
                    : "bg-green-500/10 border border-green-500/20"
                }`}
              >
                {actionType === "suspend" ? (
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-lg font-light text-neutral-900 dark:text-white uppercase tracking-wider">
                  {actionType === "suspend"
                    ? "Suspender Usuario"
                    : "Habilitar Usuario"}
                </h3>
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 mb-8 font-light">
              {actionType === "suspend"
                ? `¿Estás seguro de que deseas suspender la cuenta de ${selectedUser.name}? El usuario no podrá acceder a la plataforma hasta que sea habilitado nuevamente.`
                : `¿Estás seguro de que deseas habilitar la cuenta de ${selectedUser.name}? El usuario podrá acceder nuevamente a la plataforma.`}
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelAction}
                className="px-6 py-2 border border-neutral-200 dark:border-neutral-700 rounded-sm text-xs font-light text-neutral-900 dark:text-white uppercase tracking-wider hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAction}
                className={`px-6 py-2 rounded-sm text-xs font-light text-white uppercase tracking-wider transition-colors ${
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