# Mi Lugar - Plataforma de Gestión Inmobiliaria con IA

**Mi Lugar** es una solución avanzada diseñada para simplificar y profesionalizar la creación de fichas de propiedades. Utilizando inteligencia artificial, permite a los agentes inmobiliarios transformar descripciones desordenadas en páginas de venta elegantes y listas para compartir.

## 🚀 Funcionalidades Principales

### 1. Importación Inteligente (Magic Button)
Nuestra herramienta estrella es un **Bookmarklet** dinámico que los agentes pueden instalar en su navegador. Con un solo clic desde portales como **Zonaprop** o **Argenprop**, la aplicación extrae automáticamente toda la información de una propiedad y la precarga en Mi Lugar.

### 2. Parseo de Texto con IA
¿Tienes una descripción larga y desordenada? Simplemente pégala. Utilizamos el modelo **Gemini 2.5 Flash** para:
- Detectar datos clave (superficie, ambientes, ubicación).
- Categorizar características y comodidades.
- Estructurar la información de contacto del agente.

### 3. Fichas Profesionales de Alta Estética
Genera páginas públicas con un diseño premium y moderno ("Rich Aesthetics"):
- Galería de fotos fluida y optimizada.
- Layout responsivo con glassmorphism y micro-animaciones.
- Accesos directos a WhatsApp y Email integrados.

### 4. Gestión de Propiedades
- Panel de control (Dashboard) para ver y editar pre-listados.
- Validación robusta de datos con Zod.
- Almacenamiento seguro de imágenes con Vercel Blob.

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Vanilla CSS / Tailwind CSS
- **IA:** Google Generative AI (Gemini SDK)
- **Base de Datos:** Prisma ORM with PostgreSQL
- **Autenticación:** NextAuth.js (Google Auth)
- **Validación:** Zod / React Hook Form

## 💻 Configuración para Desarrolladores

### Requisitos Previos
- Node.js 18+
- PostgreSQL
- API Key de Google Gemini

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone [url-del-repo]
   cd sell_my_house
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno (`.env.local`):
   ```env
   DATABASE_URL="tu-postgres-url"
   DIRECT_URL="tu-postgres-direct-url"
   GEMINI_API_KEY="tu-google-ai-key"
   NEXTAUTH_SECRET="tu-secret"
   AUTH_GOOGLE_ID="tu-google-client-id"
   AUTH_GOOGLE_SECRET="tu-google-secret"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. Preparar la Base de Datos:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 🔒 Privacidad y Seguridad
La aplicación cuenta con autenticación segura y asegura que cada agente solo pueda ver y gestionar sus propios listados, manteniendo la integridad de los datos de cada inmobiliaria.
