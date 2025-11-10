import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

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

interface ReportPDFProps {
  reportType: "sales" | "users" | "products" | "revenue";
  period: string;
  startDate: string;
  endDate: string;
  salesData?: SalesData[];
  usersData?: UsersData[];
}

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2 solid #3b82f6",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  section: {
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderRadius: 4,
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 30,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    fontWeight: "bold",
  },
  tableCol: {
    flex: 1,
    padding: 8,
    fontSize: 10,
  },
  tableColHeader: {
    flex: 1,
    padding: 8,
    fontSize: 11,
    fontWeight: "bold",
    color: "#374151",
  },
  summaryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },
  summaryCard: {
    width: "30%",
    padding: 12,
    backgroundColor: "#f0f9ff",
    borderRadius: 6,
    borderLeft: "4 solid #3b82f6",
  },
  summaryLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#9ca3af",
    borderTop: "1 solid #e5e7eb",
    paddingTop: 10,
  },
});

// Componente del documento PDF
const ReportDocument = ({
  reportType,
  period,
  startDate,
  endDate,
  salesData = [],
  usersData = [],
}: ReportPDFProps) => {
  const getReportTitle = () => {
    switch (reportType) {
      case "sales":
        return "Reporte de Ventas Totales";
      case "users":
        return "Reporte de Crecimiento de Usuarios";
      case "products":
        return "Reporte de Productos Más Vendidos";
      case "revenue":
        return "Reporte de Ingresos y Ganancias";
      default:
        return "Reporte de Métricas";
    }
  };

  const getPeriodLabel = () => {
    switch (period) {
      case "day":
        return "Diario";
      case "week":
        return "Semanal";
      case "month":
        return "Mensual";
      case "year":
        return "Anual";
      default:
        return period;
    }
  };

  // Calcular totales para ventas
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const avgSales =
    salesData.length > 0 ? Math.round(totalSales / salesData.length) : 0;

  // Calcular totales para usuarios
  const totalNewUsers = usersData.reduce(
    (sum, item) => sum + item.newUsers,
    0
  );
  const currentActiveUsers =
    usersData.length > 0 ? usersData[usersData.length - 1].activeUsers : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>QuickMart - {getReportTitle()}</Text>
          <Text style={styles.subtitle}>
            Periodo: {getPeriodLabel()} | {startDate} - {endDate}
          </Text>
          <Text style={styles.subtitle}>
            Generado: {new Date().toLocaleDateString("es-ES")} a las{" "}
            {new Date().toLocaleTimeString("es-ES")}
          </Text>
        </View>

        {/* Sales Report */}
        {(reportType === "sales" || reportType === "products" || reportType === "revenue") && salesData.length > 0 && (
          <>
            {/* Summary Cards */}
            <View style={styles.summaryBox}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total Ventas</Text>
                <Text style={styles.summaryValue}>
                  {totalSales.toLocaleString()}
                </Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total Pedidos</Text>
                <Text style={styles.summaryValue}>
                  {totalOrders.toLocaleString()}
                </Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Promedio Ventas</Text>
                <Text style={styles.summaryValue}>
                  {avgSales.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Data Table */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Detalle de Ventas</Text>
              <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableColHeader}>Periodo</Text>
                  <Text style={styles.tableColHeader}>Ventas</Text>
                  <Text style={styles.tableColHeader}>Pedidos</Text>
                  <Text style={styles.tableColHeader}>Ingresos</Text>
                </View>
                {/* Table Body */}
                {salesData.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCol}>{item.period}</Text>
                    <Text style={styles.tableCol}>
                      {item.sales.toLocaleString()}
                    </Text>
                    <Text style={styles.tableCol}>
                      {item.orders.toLocaleString()}
                    </Text>
                    <Text style={styles.tableCol}>{item.revenue}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Users Report - SIEMPRE mostrar */}
        {usersData.length > 0 && (
          <>
            {/* Summary Cards */}
            <View style={styles.summaryBox}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Nuevos Usuarios</Text>
                <Text style={styles.summaryValue}>
                  {totalNewUsers.toLocaleString()}
                </Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Usuarios Activos</Text>
                <Text style={styles.summaryValue}>
                  {currentActiveUsers.toLocaleString()}
                </Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Crecimiento</Text>
                <Text style={styles.summaryValue}>
                  {usersData[usersData.length - 1]?.growth || "0%"}
                </Text>
              </View>
            </View>

            {/* Data Table */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Detalle de Crecimiento de Usuarios
              </Text>
              <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableColHeader}>Periodo</Text>
                  <Text style={styles.tableColHeader}>Nuevos</Text>
                  <Text style={styles.tableColHeader}>Activos</Text>
                  <Text style={styles.tableColHeader}>Crecimiento</Text>
                </View>
                {/* Table Body */}
                {usersData.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCol}>{item.period}</Text>
                    <Text style={styles.tableCol}>
                      +{item.newUsers.toLocaleString()}
                    </Text>
                    <Text style={styles.tableCol}>
                      {item.activeUsers.toLocaleString()}
                    </Text>
                    <Text style={styles.tableCol}>{item.growth}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          QuickMart Dashboard - Reporte generado automáticamente © 2024
        </Text>
      </Page>
    </Document>
  );
};

// Componente para el botón de descarga
export default function ReportPDF(props: ReportPDFProps) {
  const fileName = `reporte-${props.reportType}-${new Date().getTime()}.pdf`;

  return (
    <PDFDownloadLink
      document={<ReportDocument {...props} />}
      fileName={fileName}
      className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
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
            Generando PDF...
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            Descargar PDF
          </>
        )
      }
    </PDFDownloadLink>
  );
}