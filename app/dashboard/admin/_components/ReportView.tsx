"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ReportType = "sales" | "users" | "products" | "revenue";
type Period = "day" | "week" | "month" | "year";
type OutputFormat = "table" | "chart" | "export";

interface SalesData {
  period: string;
  sales: number;
  orders: number;
  revenue: string;
}

interface UsersData {
  period: string;
  newUsers: number;
  activeUsers: number;
  growth: string;
}

export default function ReportView() {
  const [reportType, setReportType] = useState<ReportType>("sales");
  const [period, setPeriod] = useState<Period>("month");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("chart");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-11-08");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true); // Default to true to show preview

  // Mock data for sales
  const salesDataByPeriod: Record<Period, SalesData[]> = {
    day: [
      { period: "Lun 04 Nov", sales: 45, orders: 23, revenue: "$6,750.00" },
      { period: "Mar 05 Nov", sales: 52, orders: 28, revenue: "$7,800.00" },
      { period: "Mié 06 Nov", sales: 38, orders: 19, revenue: "$5,700.00" },
      { period: "Jue 07 Nov", sales: 61, orders: 32, revenue: "$9,150.00" },
      { period: "Vie 08 Nov", sales: 73, orders: 41, revenue: "$10,950.00" },
    ],
    week: [
      { period: "Semana 40", sales: 234, orders: 125, revenue: "$35,100.00" },
      { period: "Semana 41", sales: 267, orders: 143, revenue: "$40,050.00" },
      { period: "Semana 42", sales: 289, orders: 156, revenue: "$43,350.00" },
      { period: "Semana 43", sales: 312, orders: 168, revenue: "$46,800.00" },
      { period: "Semana 44", sales: 345, orders: 187, revenue: "$51,750.00" },
    ],
    month: [
      { period: "Enero", sales: 987, orders: 523, revenue: "$148,050.00" },
      { period: "Febrero", sales: 1123, orders: 598, revenue: "$168,450.00" },
      { period: "Marzo", sales: 1245, orders: 661, revenue: "$186,750.00" },
      { period: "Abril", sales: 1367, orders: 724, revenue: "$205,050.00" },
      { period: "Mayo", sales: 1489, orders: 789, revenue: "$223,350.00" },
      { period: "Junio", sales: 1612, orders: 856, revenue: "$241,800.00" },
    ],
    year: [
      { period: "2020", sales: 8456, orders: 4523, revenue: "$1,268,400.00" },
      { period: "2021", sales: 12789, orders: 6845, revenue: "$1,918,350.00" },
      { period: "2022", sales: 15234, orders: 8156, revenue: "$2,285,100.00" },
      { period: "2023", sales: 18967, orders: 10123, revenue: "$2,845,050.00" },
      { period: "2024", sales: 22456, orders: 11987, revenue: "$3,368,400.00" },
    ],
  };

  // Mock data for users
  const usersDataByPeriod: Record<Period, UsersData[]> = {
    day: [
      { period: "Lun 04 Nov", newUsers: 12, activeUsers: 234, growth: "+5.4%" },
      { period: "Mar 05 Nov", newUsers: 15, activeUsers: 249, growth: "+6.4%" },
      { period: "Mié 06 Nov", newUsers: 9, activeUsers: 258, growth: "+3.6%" },
      { period: "Jue 07 Nov", newUsers: 18, activeUsers: 276, growth: "+7.0%" },
      { period: "Vie 08 Nov", newUsers: 22, activeUsers: 298, growth: "+8.0%" },
    ],
    week: [
      { period: "Semana 40", newUsers: 67, activeUsers: 1234, growth: "+5.7%" },
      { period: "Semana 41", newUsers: 78, activeUsers: 1312, growth: "+6.3%" },
      { period: "Semana 42", newUsers: 84, activeUsers: 1396, growth: "+6.4%" },
      { period: "Semana 43", newUsers: 92, activeUsers: 1488, growth: "+6.6%" },
      {
        period: "Semana 44",
        newUsers: 103,
        activeUsers: 1591,
        growth: "+6.9%",
      },
    ],
    month: [
      { period: "Enero", newUsers: 234, activeUsers: 4523, growth: "+5.5%" },
      { period: "Febrero", newUsers: 267, activeUsers: 4790, growth: "+5.9%" },
      { period: "Marzo", newUsers: 289, activeUsers: 5079, growth: "+6.0%" },
      { period: "Abril", newUsers: 312, activeUsers: 5391, growth: "+6.1%" },
      { period: "Mayo", newUsers: 345, activeUsers: 5736, growth: "+6.4%" },
      { period: "Junio", newUsers: 378, activeUsers: 6114, growth: "+6.6%" },
    ],
    year: [
      { period: "2020", newUsers: 2345, activeUsers: 12456, growth: "+45.2%" },
      { period: "2021", newUsers: 3678, activeUsers: 16134, growth: "+56.8%" },
      { period: "2022", newUsers: 4567, activeUsers: 20701, growth: "+38.7%" },
      { period: "2023", newUsers: 5789, activeUsers: 26490, growth: "+27.9%" },
      { period: "2024", newUsers: 6234, activeUsers: 32724, growth: "+23.5%" },
    ],
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGenerating(false);
    setReportGenerated(true);
  };

  const handleExportReport = (format: "pdf" | "excel" | "csv") => {
    // Simulate export
    alert(`Exportando reporte en formato ${format.toUpperCase()}...`);
  };

  const currentSalesData = salesDataByPeriod[period];
  const currentUsersData = usersDataByPeriod[period];

  // Calculate totals for sales
  const totalSales = currentSalesData.reduce(
    (sum, item) => sum + item.sales,
    0
  );
  const totalOrders = currentSalesData.reduce(
    (sum, item) => sum + item.orders,
    0
  );
  const avgSales = Math.round(totalSales / currentSalesData.length);

  // Calculate totals for users
  const totalNewUsers = currentUsersData.reduce(
    (sum, item) => sum + item.newUsers,
    0
  );
  const avgNewUsers = Math.round(totalNewUsers / currentUsersData.length);

  const getPeriodLabel = () => {
    switch (period) {
      case "day":
        return "Día";
      case "week":
        return "Semana";
      case "month":
        return "Mes";
      case "year":
        return "Año";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Reportes de Métricas
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Genera y visualiza reportes detallados del sistema
          </p>
        </div>
      </div>

      {/* Configuration Panel */}
      <div
        className="rounded-lg p-6 border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Configuración del Reporte
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Report Type */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Tipo de Métrica
            </label>
            <select
              value={reportType}
              onChange={(e) => {
                setReportType(e.target.value as ReportType);
                setReportGenerated(false);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
            >
              <option value="sales">Ventas Totales</option>
              <option value="users">Crecimiento de Usuarios</option>
              <option value="products">Productos Más Vendidos</option>
              <option value="revenue">Ingresos y Ganancias</option>
            </select>
          </div>

          {/* Period */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Periodo
            </label>
            <select
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value as Period);
                setReportGenerated(false);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
            >
              <option value="day">Por Día</option>
              <option value="week">Por Semana</option>
              <option value="month">Por Mes</option>
              <option value="year">Por Año</option>
            </select>
          </div>

          {/* Output Format */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Formato de Salida
            </label>
            <select
              value={outputFormat}
              onChange={(e) => {
                setOutputFormat(e.target.value as OutputFormat);
                setReportGenerated(false);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
            >
              <option value="chart">Gráfico Visual</option>
              <option value="table">Tabla Detallada</option>
              <option value="export">Exportar Datos</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Fecha de Inicio
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setReportGenerated(false);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
            />
          </div>

          {/* End Date */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Fecha de Fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setReportGenerated(false);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--foreground)",
              }}
            />
          </div>

          {/* Generate Button */}
          <div className="flex items-end">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  Generando...
                </>
              ) : (
                <>
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
                  Generar Reporte
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Report Results */}
      {reportGenerated && (
        <>
          {/* Summary Cards - Always show both metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Summary */}
            <div className="space-y-4">
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                📊 Resumen de Ventas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Total Ventas
                    </p>
                  </div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {totalSales.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ↑ Promedio: {avgSales}
                  </p>
                </div>

                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Ingresos
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    $
                    {Math.round(
                      (totalSales * 150) / totalOrders
                    ).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ↑ +12.5% vs anterior
                  </p>
                </div>
              </div>
            </div>

            {/* Users Summary */}
            <div className="space-y-4">
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                👥 Resumen de Usuarios
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600 dark:text-green-400"
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
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Total Usuarios
                    </p>
                  </div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {currentUsersData[
                      currentUsersData.length - 1
                    ].activeUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ↑ Usuarios activos
                  </p>
                </div>

                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Crecimiento
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {currentUsersData[currentUsersData.length - 1].growth}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ↑ Tendencia positiva
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section - Both metrics side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart - Area/Line Chart */}
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    Ventas Totales
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Por {getPeriodLabel()} - {new Date(startDate).getFullYear()}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
              </div>

              {/* Area Chart with Recharts */}
              <div className="relative" style={{ height: "280px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={currentSalesData.map((item) => ({
                      name: item.period,
                      ventas: item.sales,
                      ingresos: item.revenue,
                      pedidos: item.orders,
                    }))}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorVentas"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6366f1"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6366f1"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      className="dark:stroke-gray-700"
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "var(--foreground)", fontSize: 12 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                      tick={{ fill: "var(--foreground)", fontSize: 12 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={{ stroke: "#e5e7eb" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card-bg)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                        padding: "12px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      labelStyle={{
                        color: "var(--foreground)",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                      itemStyle={{ color: "#6366f1" }}
                      formatter={(value: any, name: string) => {
                        if (name === "ventas") {
                          const dataPoint = currentSalesData.find(
                            (d) => d.sales === value
                          );
                          return [
                            <div key="tooltip" className="space-y-1">
                              <div className="font-bold text-blue-600 dark:text-blue-400">
                                {value} ventas
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {dataPoint?.revenue}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                {dataPoint?.orders} pedidos
                              </div>
                            </div>,
                            "",
                          ];
                        }
                        return [value, name];
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="ventas"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fill="url(#colorVentas)"
                      animationDuration={1000}
                      dot={{
                        fill: "#6366f1",
                        strokeWidth: 2,
                        stroke: "#fff",
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                        fill: "#6366f1",
                        stroke: "#fff",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stats below chart */}
              <div
                className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Menor valor
                  </p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {Math.min(...currentSalesData.map((d) => d.sales))}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Promedio
                  </p>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {avgSales}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mayor valor
                  </p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {Math.max(...currentSalesData.map((d) => d.sales))}
                  </p>
                </div>
              </div>
            </div>

            {/* Users Growth Chart - Improved Bar Chart */}
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    Crecimiento de Usuarios
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Por {getPeriodLabel()} - {new Date(startDate).getFullYear()}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>

              {/* Improved Bar Chart */}
              <div className="relative px-2" style={{ height: "280px" }}>
                <div className="absolute inset-0 flex items-end justify-between pb-10 px-2">
                  {currentUsersData.map((item, index) => {
                    const maxValue = Math.max(
                      ...currentUsersData.map((d) => d.activeUsers)
                    );
                    const minValue = Math.min(
                      ...currentUsersData.map((d) => d.activeUsers)
                    );
                    // Normalizar entre el mínimo y máximo para mejor visualización
                    const range = maxValue - minValue;
                    const normalizedValue = item.activeUsers - minValue;
                    // Asegurar que la barra más pequeña sea al menos 35% y la más grande 100%
                    const heightPercent =
                      range > 0 ? 35 + (normalizedValue / range) * 65 : 100;

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-end group"
                        style={{ width: `${85 / currentUsersData.length}%` }}
                      >
                        {/* Value on hover */}
                        <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-green-600 dark:bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                            {item.activeUsers.toLocaleString()} usuarios
                          </div>
                        </div>

                        {/* Bar with gradient and shadow */}
                        <div
                          className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-xl transition-all duration-700 hover:from-green-600 hover:to-green-500 cursor-pointer relative flex items-end justify-center pb-2 shadow-lg hover:shadow-xl group-hover:scale-105"
                          style={{
                            height: `${heightPercent}%`,
                            minHeight: "30px",
                            boxShadow: "0 -2px 10px rgba(34, 197, 94, 0.3)",
                          }}
                        >
                          <span className="text-white font-bold text-sm drop-shadow">
                            {item.activeUsers >= 1000
                              ? `${(item.activeUsers / 1000).toFixed(1)}k`
                              : item.activeUsers}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* X-axis labels */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex justify-between px-2 border-t pt-2"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {currentUsersData.map((item, index) => (
                    <div
                      key={index}
                      className="text-center"
                      style={{ width: `${85 / currentUsersData.length}%` }}
                    >
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {item.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats below chart */}
              <div
                className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Menor valor
                  </p>
                  <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {Math.min(
                      ...currentUsersData.map((d) => d.activeUsers)
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Promedio
                  </p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {Math.round(
                      currentUsersData.reduce(
                        (sum, d) => sum + d.activeUsers,
                        0
                      ) / currentUsersData.length
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mayor valor
                  </p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {Math.max(
                      ...currentUsersData.map((d) => d.activeUsers)
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Data Table (Optional View) */}
          {outputFormat === "table" && (
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--foreground)" }}
              >
                Datos Detallados -{" "}
                {reportType === "sales" ? "Ventas" : "Usuarios"}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    className="border-b"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Periodo
                      </th>
                      {reportType === "sales" ? (
                        <>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Ventas
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Pedidos
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Ingresos
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Nuevos Usuarios
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Usuarios Activos
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Crecimiento
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {reportType === "sales"
                      ? currentSalesData.map((item, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                          >
                            <td
                              className="px-4 py-3 text-sm font-medium"
                              style={{ color: "var(--foreground)" }}
                            >
                              {item.period}
                            </td>
                            <td className="px-4 py-3 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                              {item.sales.toLocaleString()}
                            </td>
                            <td
                              className="px-4 py-3 text-sm"
                              style={{ color: "var(--foreground)" }}
                            >
                              {item.orders.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400">
                              {item.revenue}
                            </td>
                          </tr>
                        ))
                      : currentUsersData.map((item, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                          >
                            <td
                              className="px-4 py-3 text-sm font-medium"
                              style={{ color: "var(--foreground)" }}
                            >
                              {item.period}
                            </td>
                            <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400 font-semibold">
                              +{item.newUsers.toLocaleString()}
                            </td>
                            <td
                              className="px-4 py-3 text-sm"
                              style={{ color: "var(--foreground)" }}
                            >
                              {item.activeUsers.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-bold text-purple-600 dark:text-purple-400">
                              {item.growth}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Export Options */}
          {outputFormat === "export" && (
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📊</div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "var(--foreground)" }}
                >
                  Exportar Reporte
                </h3>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleExportReport("pdf")}
                    className="px-6 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--foreground)",
                    }}
                  >
                    <div className="text-2xl mb-1">📄</div>
                    <div className="text-sm font-medium">PDF</div>
                  </button>
                  <button
                    onClick={() => handleExportReport("excel")}
                    className="px-6 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--foreground)",
                    }}
                  >
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-sm font-medium">Excel</div>
                  </button>
                  <button
                    onClick={() => handleExportReport("csv")}
                    className="px-6 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--foreground)",
                    }}
                  >
                    <div className="text-2xl mb-1">📑</div>
                    <div className="text-sm font-medium">CSV</div>
                  </button>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
                  Selecciona el formato para descargar el reporte completo
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!reportGenerated && (
        <div
          className="rounded-lg p-12 border text-center"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="text-6xl mb-4">📈</div>
          <h3
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Vista previa cargada
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Datos de ejemplo mostrados - Ajusta los filtros para regenerar el
            reporte
          </p>
        </div>
      )}
    </div>
  );
}