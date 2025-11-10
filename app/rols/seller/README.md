# Rol Vendedor - QuickMart

## Descripción

Implementación completa del rol de vendedor en QuickMart, siguiendo las mejores prácticas de Next.js y el patrón de arquitectura establecido en el rol de comprador.

## Estructura de Archivos

```
seller/
├── components/
│   ├── ProfileForm.tsx       # Formulario de edición de perfil
│   ├── ProductForm.tsx        # Formulario para crear/editar productos
│   └── ProductList.tsx        # Lista de productos del vendedor
├── data/
│   └── mockData.ts           # Datos de prueba para desarrollo
└── pages/
    └── MainPage.tsx          # Página principal del vendedor
```

## Funcionalidades Implementadas

### 1. Perfil del Vendedor

**Ubicación:** `components/ProfileForm.tsx`

- ✅ Vista de información personal (nombre y ubicación)
- ✅ Modo de edición in-place
- ✅ Botón de actualizar perfil
- ✅ Validación de campos requeridos
- ✅ Feedback visual durante el guardado

**Campos editables:**
- Nombre completo (requerido)
- Ubicación (requerido)

### 2. Gestión de Productos

**Ubicación:** `components/ProductForm.tsx` y `components/ProductList.tsx`

#### Publicar Producto
- ✅ Modal con formulario completo
- ✅ Campos de entrada:
  - Título (requerido)
  - Descripción (requerido)
  - Categoría (selector con opciones predefinidas)
  - Precio en MXN (requerido, solo números positivos)
  - Stock (requerido, números enteros no negativos)
  - URL de imagen (opcional, con vista previa)
- ✅ Validación en tiempo real
- ✅ Vista previa de imagen

#### Actualizar Producto
- ✅ Mismo formulario que crear, pre-llenado con datos existentes
- ✅ Actualización de stock en tiempo real
- ✅ Modificación de detalles del producto
- ✅ Control de disponibilidad

#### Eliminar Producto
- ✅ Confirmación antes de eliminar
- ✅ Eliminación permanente de la base de datos
- ✅ Actualización inmediata de la lista

## API Routes

### Productos del Vendedor

**Endpoint:** `/api/seller/products`

#### GET - Obtener productos
```typescript
GET /api/seller/products?sellerId={id}
Response: { products: Product[] }
```

#### POST - Crear producto
```typescript
POST /api/seller/products
Body: {
  sellerId: string,
  title: string,
  description: string,
  category: number,
  price: number,
  stock: number,
  image?: string
}
Response: { product: Product }
```

#### PUT - Actualizar producto
```typescript
PUT /api/seller/products
Body: {
  id: string,
  sellerId: string,
  title?: string,
  description?: string,
  category?: number,
  price?: number,
  stock?: number,
  active?: boolean
}
Response: { product: Product }
```

#### DELETE - Eliminar producto
```typescript
DELETE /api/seller/products?id={productId}&sellerId={sellerId}
Response: { message: string }
```

### Perfil del Vendedor

**Endpoint:** `/api/seller/profile`

#### GET - Obtener perfil
```typescript
GET /api/seller/profile?userId={id}
Response: { profile: SellerProfile }
```

#### PUT - Actualizar perfil
```typescript
PUT /api/seller/profile
Body: {
  userId: string,
  name?: string,
  location?: string,
  email?: string
}
Response: { profile: SellerProfile }
```

## Tipos de Datos

### SellerProduct
```typescript
interface SellerProduct {
  id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  images?: string[];
  active?: boolean;
}
```

### SellerProfile
```typescript
interface SellerProfile {
  id: string;
  name: string;
  location: string;
  email?: string;
  phone?: string;
  businessName?: string;
  description?: string;
}
```

## Diseño y UX

### Estilo Visual
- Sigue el mismo sistema de diseño minimalista del rol comprador
- Paleta de colores neutral (blanco, negro, grises)
- Tipografía sans-serif con tracking amplio
- Animaciones suaves y transiciones fluidas

### Componentes UI
- Formularios con validación en tiempo real
- Modales overlay para crear/editar
- Tarjetas de producto con hover effects
- Badges de estado (stock bajo, agotado, disponible)
- Loading states durante operaciones asíncronas

### Navegación
- Sidebar sticky con navegación clara
- Vistas separadas: Productos y Perfil
- Breadcrumbs implícitos mediante títulos
- Botón flotante para crear nuevo producto

## Validaciones

### Productos
- Título: requerido, mínimo 3 caracteres
- Descripción: requerida
- Precio: número positivo mayor a 0
- Stock: número entero no negativo (≥ 0)
- Categoría: selección de lista predefinida
- Imagen: URL válida (opcional)

### Perfil
- Nombre: requerido
- Ubicación: requerida
- Email: formato válido (cuando se proporciona)

## Manejo de Errores

- Validación de permisos (productos solo del vendedor)
- Mensajes de error descriptivos
- Alerts para feedback inmediato al usuario
- Manejo de errores de red con try-catch
- Rollback en caso de fallo

## Estados de Producto

- **En Stock**: Stock > 10 (verde)
- **Stock Bajo**: Stock ≤ 10 (naranja)
- **Agotado**: Stock = 0 (rojo)

## Mejoras Futuras

- [ ] Upload de imágenes directo (no solo URLs)
- [ ] Múltiples imágenes por producto
- [ ] Estadísticas de ventas
- [ ] Gestión de pedidos recibidos
- [ ] Notificaciones en tiempo real
- [ ] Sistema de valoraciones de clientes
- [ ] Exportar catálogo a CSV/PDF
- [ ] Búsqueda y filtrado de productos propios
- [ ] Modo oscuro

## Uso

```tsx
import SellerDashboard from '@/app/rols/seller/pages/MainPage';

// En tu página o componente
<SellerDashboard 
  userName="Juan Pérez" 
  userId="seller-123" 
/>
```

## Dependencias

- Next.js 15+
- React 19+
- Lucide React (iconos)
- Supabase (base de datos)
- Tailwind CSS (estilos)

## Variables de Entorno

Asegúrate de configurar las siguientes variables en `.env.local`:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_clave_anon_de_supabase
```

Consulta `.env.local.example` para más detalles.
