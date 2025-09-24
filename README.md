# Daily Pulse 📊

Una aplicación de visualización de Metas y tareas para conseguir pequeños obgetivos personales

---

## 🎯 Objetivo

Daily Pulse tiene como objetivo ayudarte a marcarte metas alcanzables y mantener una rutina diaria o semanal hasta conseguir los objetivos marcados.

La aplicación busca proporcionarte motivación y eliminar los posibles contratiempos como "olvidar qué tenía que hacer" o la falta de seguimiento de tus progresos.

---

## ✨ Funciones Principales

### Gestión de Metas Personales
- **Crear nuevas metas** con descripción, fechas límite y categorías
- **Editar y eliminar** metas existentes de forma intuitiva
- **Seguimiento de progreso** con indicadores visuales
- **Organización por categorías** para mejor gestión

### Calendario Integrado
- **Vista mensual** de todas tus metas y tareas programadas
- **Visualización de tareas pendientes** por día/semana
- **Recordatorios visuales** de fechas importantes
- **Navegación temporal** entre diferentes periodos

### Sistema de Tareas
- **Desglose de tareas** asociadas a cada meta
- **Crear, editar y eliminar tareas** específicas
- **Marcado de completado** con seguimiento automático
- **Priorización y ordenamiento** de tareas

### Perfil de usiario
- **Estadísticas personales**: metas activas, tareas completadas, porcentaje de progreso global
- **Personalización de tema**: modo claro/oscuro, colores de la aplicación
- **Sistema de notificaciones** configurable
- **Configuración de privacidad** y preferencias

### Autenticación y Seguridad
- **Registro y login** mediante correo electrónico
- **Sincronización en la nube** de tus datos
- **Protección de información** personal
- **Sesiones seguras** con Firebase Auth

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- React con **TypeScript**
- React **Router** para navegación
- **CSS Modules** para estilos componentizados
- **Context API** para gestión de estado global

### Backend y Base de Datos
- **Firebase Firestore** como base de datos en tiempo real
- **Firebase Authentication** para gestión de usuarios
- **Firebase Storage** para archivos multimedia (si aplica)

### Librerías y Utilidades
- **Date-fns** para manipulación de fechas
- **React Hot Toast** para notificaciones
- **Lucide React** para iconografía
- **CSS Custom Properties** para temas dinámicos

### Desarrollo y Deployment
- **Vite** como tooling de desarrollo
- **ESLint y Prettier** para calidad de código
- **Git** para control de versiones
- **Servicio de hosting** (Netlify/Vercel/Firebase Hosting)

---

## 🚀 InstalacInstalación y Desarrolloión

### Prerrequisitos
- Node.js 16+ instalado
- Cuenta de Firebase configurada
- Acceso a la configuración del proyecto Firebase

### Instalación Manual
```bash
# Clonar el repositorio
git clone https://github.com/SFP95/daily-pulse.git

# Navegar al directorio del proyecto
cd daily-pulse

# Instalar dependencias del backend
cd backend && npm install

# Instalar dependencias del frontend
cd ../frontend && npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar la aplicación
npm run dev
```

### Configuración de Firebase
- Crear proyecto en Firebase Console
- Habilitar Authentication con proveedor de Email/Password
- Crear base de datos Firestore en modo de prueba
- Configurar reglas de seguridad
- Copiar configuración en el archivo .env

---

## 📱 Estructura del Proyecto
```bash
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de interfaz base
│   ├── goals/          # Componentes de metas
│   ├── tasks/          # Componentes de tareas
│   └── calendar/       # Componentes de calendario
├── pages/              # Páginas principales
├── hooks/              # Custom hooks
├── context/            # Contextos de React
├── services/           # Servicios (Firebase, API)
├── utils/              # Utilidades y helpers
├── types/              # Definiciones TypeScript
└── styles/             # Estilos globales
```

###  Scripts Disponibles
```bash
# Desarrollo
npm run dev           # Servidor de desarrollo
npm run build         # Build de producción
npm run preview       # Preview del build

# Calidad de código
npm run lint          # Análisis ESLint
npm run format        # Formateo con Prettier

# Tests (si aplica)
npm run test          # Ejecutar tests
```
---

## 📊 Características Técnicas

### Rendimiento
- Carga inicial optimizada con code splitting
- Imágenes y assets comprimidos
- Consultas eficientes a Firestore
- Estado local para mejor responsividad

### Experiencia de Usuario
- Interfaz responsive para móvil y desktop
- Navegación fluida sin recargas de página
- Feedback visual inmediato en acciones
- Tema adaptable (claro/oscuro)

### Seguridad
- Validación de datos en frontend y backend
- Reglas de seguridad en Firestore
- Autenticación segura con Firebase Auth
- Protección contra XSS y inyecciones

---

### 📄 Licencia

Distribuido bajo licencia MIT. Ver LICENSE para más información.

---

**Daily Pulse - Desarrollado por Sonia Fernández Pascual en 2025 🚀**
