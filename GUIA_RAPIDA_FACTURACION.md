# 🚀 Guía Rápida - Sistema de Facturación QuickMart

## 📦 Archivos Modificados/Creados

### ✅ Archivos Nuevos:
1. **`app/dashboard/buyer/components/InvoiceGenerator.tsx`**
   - Generador de facturas en PDF
   - Formato profesional con información fiscal

2. **`SISTEMA_FACTURACION.md`**
   - Documentación completa del sistema

### ✏️ Archivos Modificados:
1. **`app/dashboard/buyer/data/mockData.ts`**
   - 5 pedidos de ejemplo con datos completos
   - Direcciones detalladas con códigos postales
   - Métodos de pago específicos
   - Cálculos correctos de IVA

2. **`app/dashboard/buyer/page.tsx`**
   - Import del generador de facturas
   - Función `handleDownloadInvoice` mejorada
   - Validación de estado del pedido

3. **`app/dashboard/buyer/components/OrderHistory.tsx`**
   - Panel de información fiscal para pedidos entregados
   - Mejoras visuales en el resumen de pago
   - Etiquetas en español (IVA en lugar de Tax)

---

## 🎯 Cómo Usar el Sistema

### **1. Iniciar la Aplicación**
```bash
cd quickmart
npm run dev
# o
pnpm dev
```

### **2. Acceder al Dashboard de Comprador**
1. Navega a `http://localhost:3000/dashboard/buyer`
2. Inicia sesión como comprador

### **3. Ver Historial de Pedidos**
1. Click en "Orders" en el menú lateral
2. Verás 5 pedidos de ejemplo:
   - ORD-001 ✅ ENTREGADO
   - ORD-002 🚚 ENVIADO
   - ORD-003 ⏳ PENDIENTE
   - ORD-004 ✅ ENTREGADO
   - ORD-005 ✅ ENTREGADO

### **4. Descargar Factura**
1. Expande cualquier pedido ENTREGADO (click en "Details")
2. Observa la nueva sección "Información Fiscal"
3. Click en el botón "INVOICE"
4. Se abrirá una nueva ventana con la factura
5. Usa el diálogo de impresión para guardar como PDF

---

## 📊 Detalles de los Pedidos de Ejemplo

### **ORD-001** - Pedido Multiproducto
```
🎧 Sony WH-1000XM5          $6,999.00
🎒 Mochila The North Face   $2,299.00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal:                   $9,298.00
IVA (16%):                  $1,487.68
Envío:                          GRATIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:                     $10,795.68
```
✅ **FACTURA DISPONIBLE**

### **ORD-004** - Pedido Alto Valor
```
💻 Laptop Dell XPS 13      $24,999.00
🎧 Sony WH-1000XM5          $6,999.00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal:                  $31,998.00
IVA (16%):                  $5,119.68
Envío:                          GRATIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:                     $37,097.68
```
✅ **FACTURA DISPONIBLE**

---

## 🔍 Características de la Factura

### **Encabezado:**
- Logo QuickMart
- RFC: QMK240515K89
- Dirección fiscal completa
- Número de factura: INV-{ID_PEDIDO}
- Badge de estado: PAGADO

### **Información del Cliente:**
- Nombre
- RFC (por defecto: XAXX010101000)
- Email

### **Detalles del Pedido:**
- Número de orden
- Fecha de pedido
- Método de pago
- Dirección de envío completa

### **Productos:**
Tabla con:
- Descripción del producto
- Cantidad
- Precio unitario
- Total por producto

### **Resumen Financiero:**
- Subtotal
- IVA (16%)
- Envío (GRATIS o $99)
- **TOTAL en MXN**

### **Información Fiscal (SAT):**
- Folio Fiscal (UUID)
- Sello Digital del CFDI
- Sello del SAT
- Régimen Fiscal
- Uso CFDI: G03

---

## 🎨 Visualización en la Interfaz

### **Panel de Información Fiscal** (nuevo)

Aparece en la sección "Payment Summary" para pedidos entregados:

```
┌─────────────────────────────────────┐
│  📋 Información Fiscal              │
├─────────────────────────────────────┤
│  Folio de Factura:  INV-ORD-001     │
│  RFC Emisor:        QMK240515K89    │
│  Régimen Fiscal:    General de Ley  │
│  Uso CFDI:          G03 - Gastos    │
└─────────────────────────────────────┘
```

---

## 🧪 Probar la Funcionalidad

### **Test 1: Pedido Entregado**
1. Expandir ORD-001
2. Verificar que aparece el panel "Información Fiscal"
3. Verificar que el botón "INVOICE" es visible
4. Click en "INVOICE"
5. ✅ Debe abrir factura en nueva ventana

### **Test 2: Pedido En Tránsito**
1. Expandir ORD-002
2. ✅ NO debe aparecer panel "Información Fiscal"
3. ✅ NO debe aparecer botón "INVOICE"

### **Test 3: Pedido Pendiente**
1. Expandir ORD-003
2. ✅ NO debe aparecer panel "Información Fiscal"
3. ✅ NO debe aparecer botón "INVOICE"

---

## 📱 Responsividad

### **Desktop (> 1024px):**
- Factura en dos columnas
- Tabla amplia de productos
- Vista completa

### **Impresión:**
- Formato A4
- Sin márgenes innecesarios
- Optimizado para PDF

---

## 🔐 Validaciones Implementadas

| Validación | Implementación |
|------------|----------------|
| Solo pedidos entregados | ✅ Verificación de `status === 'entregado'` |
| Pedido existe | ✅ Búsqueda en array de orders |
| Datos completos | ✅ Todos los campos requeridos presentes |
| Cálculos correctos | ✅ Subtotal + IVA + Envío = Total |

---

## 🎯 Estados de Pedido

| Estado | Icono | Factura | Acción |
|--------|-------|---------|--------|
| pendiente | 🟡 Clock | ❌ No | Esperar entrega |
| enviado | 🔵 Truck | ❌ No | En tránsito |
| entregado | 🟢 CheckCircle | ✅ Sí | **Descargar** |
| cancelado | 🔴 XCircle | ❌ No | N/A |

---

## 🛠️ Troubleshooting

### **Problema: No aparece el botón de factura**
**Solución:**
- Verificar que el pedido esté en estado "entregado"
- Expandir los detalles del pedido (click en "Details")
- Solo ORD-001, ORD-004 y ORD-005 tienen factura disponible

### **Problema: No se abre la ventana de factura**
**Solución:**
- Verificar que el navegador permita popups
- Revisar la consola del navegador por errores
- Intentar con otro navegador

### **Problema: Los cálculos no coinciden**
**Solución:**
- Verificar que el IVA sea exactamente 16% del subtotal
- Envío gratis si subtotal > $500, sino $99
- Total = Subtotal + IVA + Envío

---

## 📞 Información de Contacto (en Factura)

**QuickMart S.A. de C.V.**
- **RFC:** QMK240515K89
- **Dirección:** Av. Insurgentes Sur 1602, Piso 9, Col. Crédito Constructor
- **Ciudad:** Benito Juárez, 03940, Ciudad de México, CDMX
- **Teléfono:** +52 (55) 5555-1234
- **Email:** facturacion@quickmart.com.mx

---

## ✅ Checklist de Verificación

Antes de entregar el proyecto, verifica:

- [ ] La aplicación inicia sin errores (`npm run dev`)
- [ ] El dashboard de comprador es accesible
- [ ] Se muestran los 5 pedidos de ejemplo
- [ ] Los pedidos entregados muestran "Información Fiscal"
- [ ] El botón "INVOICE" aparece solo en pedidos entregados
- [ ] Click en "INVOICE" abre nueva ventana con factura
- [ ] La factura muestra todos los datos correctamente
- [ ] Los cálculos son correctos (Subtotal + IVA + Envío = Total)
- [ ] La factura tiene diseño profesional
- [ ] Se puede imprimir o guardar como PDF

---

## 🎓 Próximos Pasos

### **Integración con Backend:**
```typescript
// En lugar de mock data, obtener de API
const fetchOrders = async () => {
  const response = await fetch('/api/orders');
  const data = await response.json();
  setOrders(data);
};

// Generar factura real
const generateInvoice = async (orderId: string) => {
  const response = await fetch(`/api/invoices/${orderId}`);
  const blob = await response.blob();
  // Descargar blob
};
```

### **Mejoras Futuras:**
- Envío automático de factura por email
- Almacenamiento en base de datos
- Integración con SAT real
- Facturas fiscales oficiales
- Notas de crédito
- Reportes mensuales

---

## 📚 Recursos

- **Documentación Completa:** `SISTEMA_FACTURACION.md`
- **Código de Factura:** `app/dashboard/buyer/components/InvoiceGenerator.tsx`
- **Datos de Ejemplo:** `app/dashboard/buyer/data/mockData.ts`

---

**¡Sistema listo para usar! 🎉**
