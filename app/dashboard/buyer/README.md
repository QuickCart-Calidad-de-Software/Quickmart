# 🛒 Dashboard del Comprador - QuickMart

## Descripción General

Dashboard completo para compradores con todas las funcionalidades requeridas, diseñado con principios modernos de UX/UI siguiendo las heurísticas de Nielsen.

## ✨ Características Implementadas

### HU-006: Búsqueda por Categoría y Precio ✅
- **Filtros avanzados** para categorías, rango de precios y calificación mínima
- **Ordenamiento** por precio (menor/mayor), calificación, distancia y nombre
- **Búsqueda en tiempo real** con feedback visual inmediato
- **Conteo de resultados** para visibilidad del estado del sistema

### HU-007: Búsqueda por Ubicación ✅
- **Filtro de ubicación** con campo de texto para ciudad/código postal
- **Rango de distancia ajustable** mediante slider (5-100 km)
- **Visualización de distancia** en cada producto
- Preparado para integración con API de geolocalización

### HU-008: Gestionar Carrito ✅
- **Panel lateral deslizante** con animaciones suaves
- **Controles de cantidad** con botones +/- intuitivos
- **Límites de stock** automáticos
- **Resumen financiero completo**:
  - Subtotal de productos
  - IVA (16%)
  - Costo de envío (gratis >$500)
  - Total general
- **Notificación de envío gratis** cuando falta poco para alcanzarlo
- **Persistencia** con localStorage

### HU-009: Checkout Simulado ✅
- **Formulario de dirección de envío** completo
- **Múltiples métodos de pago**:
  - Tarjeta de crédito (con validación de campos)
  - Transferencia bancaria
  - PayPal
- **Resumen visual** del pedido con imágenes
- **Procesamiento simulado** con loading state
- **Validación de formularios** en tiempo real

### HU-010: Ver Historial ✅
- **Lista de pedidos** con información resumida
- **Estados visuales** con íconos y badges de color:
  - 🟡 Pendiente
  - 🔵 Enviado
  - 🟢 Entregado
  - 🔴 Cancelado
- **Vista expandible** para ver detalles completos
- **Preview de productos** con miniaturas
- **Fecha de entrega estimada** para pedidos en tránsito

### HU-011: Descargar Factura ✅
- **Botón de descarga** para pedidos completados
- **Integración lista** para generación de PDF
- Disponible solo para pedidos con estado "Entregado"

### HU-017: Valorar Productos ✅
- **Sistema de calificación** de 1-5 estrellas interactivo
- **Área de comentarios** con textarea responsive
- **Distribución de calificaciones** con gráfico de barras
- **Promedio visual** destacado
- **Lista de opiniones** de otros compradores
- **Validación**: Solo usuarios que han comprado pueden opinar

### HU-018: Notificaciones de Estado ✅
- **Indicador de notificaciones** en header con contador
- **Badge de estado** en menú lateral para pedidos activos
- Preparado para integración con sistema de notificaciones push

## 🎨 Diseño y UX

### Principios de Nielsen Aplicados

1. **Visibilidad del estado del sistema**
   - Contadores de productos, carrito y notificaciones
   - Estados de pedidos con íconos y colores
   - Indicadores de carga durante procesos

2. **Correspondencia entre el sistema y el mundo real**
   - Lenguaje natural y comprensible
   - Íconos universalmente reconocibles
   - Metáforas familiares (carrito de compras, paquetes)

3. **Control y libertad del usuario**
   - Botón "Volver" en todas las pantallas
   - Posibilidad de editar cantidades
   - Eliminar productos del carrito fácilmente

4. **Consistencia y estándares**
   - Paleta de colores uniforme
   - Espaciado consistente con Tailwind
   - Patrones de interacción predecibles

5. **Prevención de errores**
   - Límites de stock automáticos
   - Validación de formularios
   - Confirmaciones antes de acciones importantes

6. **Reconocimiento antes que recuerdo**
   - Información siempre visible
   - Iconografía clara
   - Estados guardados en localStorage

7. **Flexibilidad y eficiencia de uso**
   - Atajos visuales (vista rápida de productos)
   - Filtros avanzados colapsables
   - Acceso rápido al carrito desde cualquier lugar

8. **Diseño estético y minimalista**
   - Espacios en blanco generosos
   - Tipografía clara y legible
   - Jerarquía visual clara

9. **Ayuda al usuario para reconocer, diagnosticar y recuperarse de errores**
   - Mensajes de error claros
   - Estados de "sin resultados" informativos
   - Feedback inmediato en acciones

10. **Ayuda y documentación**
    - Tooltips en elementos complejos
    - Placeholders descriptivos
    - Textos de ayuda contextuales

### Paleta de Colores

- **Primario**: Azul (#3B82F6) - Confianza y profesionalismo
- **Secundario**: Verde (#10B981) - Confirmaciones y éxito
- **Advertencia**: Amarillo (#F59E0B) - Estados pendientes
- **Error**: Rojo (#EF4444) - Errores y cancelaciones
- **Fondo**: Gris claro (#F9FAFB) - Contraste suave
- **Texto**: Gris oscuro (#111827) - Legibilidad óptima

### Tipografía

- **Font principal**: Geist Sans (moderna y legible)
- **Tamaños**: Sistema escalable de 12px a 48px
- **Pesos**: Regular (400), Medium (500), Semibold (600), Bold (700)

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**:
  - sm: 640px (tablets pequeñas)
  - md: 768px (tablets)
  - lg: 1024px (laptops)
  - xl: 1280px (desktops)

## 🚀 Características Técnicas

### Performance
- **Imágenes optimizadas** con lazy loading
- **LocalStorage** para persistencia del carrito
- **Componentes client-side** solo donde es necesario

### Accesibilidad
- **Contraste WCAG AA** cumplido
- **Navegación por teclado** funcional
- **Labels descriptivos** en formularios
- **Estados de focus** visibles

### Interactividad
- **Animaciones suaves** con Tailwind transitions
- **Feedback visual** inmediato en todas las acciones
- **Estados hover** en elementos interactivos
- **Loading states** durante procesos asíncronos

## 📂 Estructura de Archivos

```
app/rols/buyer/
├── components/
│   ├── ProductFilters.tsx      # HU-006, HU-007
│   ├── ProductCard.tsx          # Visualización de productos
│   ├── ShoppingCart.tsx         # HU-008
│   ├── Checkout.tsx             # HU-009
│   ├── OrderHistory.tsx         # HU-010, HU-011
│   ├── OrderConfirmation.tsx    # Confirmación post-compra
│   └── ProductReviews.tsx       # HU-017
├── data/
│   └── mockData.ts              # Datos de prueba
├── pages/
│   └── MainPage.tsx             # Dashboard principal
```

## 🔄 Flujo de Usuario

1. **Inicio** → Ver productos con filtros
2. **Búsqueda** → Aplicar filtros y ordenamiento
3. **Agregar al carrito** → Feedback visual inmediato
4. **Ver carrito** → Panel lateral con resumen
5. **Checkout** → Formulario de pago
6. **Confirmación** → Pantalla de éxito con número de orden
7. **Seguimiento** → Ver estado en historial
8. **Factura** → Descargar cuando esté entregado
9. **Valorar** → Dejar opinión del producto

## 💡 Mejoras Futuras

- Integración con API de geolocalización real
- Sistema de notificaciones push
- Chat en vivo con vendedores
- Comparador de productos
- Lista de deseos
- Recomendaciones personalizadas con ML
- Programa de puntos/recompensas

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconografía moderna
- **LocalStorage** - Persistencia del carrito

---

**Desarrollado siguiendo las mejores prácticas de UX/UI y las heurísticas de Nielsen para una experiencia de usuario óptima.**
