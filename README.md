# 📚 Biblioteca Inteligente - App

Una aplicación web moderna para la gestión de usuarios en una biblioteca inteligente, construida con **Angular 18** y **PrimeNG**.

## 🎯 Características

- ✅ **Registro de usuarios**: Formulario para registrar nuevos usuarios con validación
- ✅ **Listado de usuarios**: Visualización de todos los usuarios registrados
- ✅ **Interfaz moderna**: Diseño responsivo con PrimeNG
- ✅ **Progressive Web App**: Soporte offline y caching
- ✅ **Docker ready**: Incluye configuración para contenedorización
- ✅ **Azure compatible**: Optimizado para despliegue en Azure

## 🚀 Tecnologías

- **Frontend**: Angular 18
- **UI Components**: PrimeNG 18
- **Estilos**: SCSS
- **HTTP Client**: RxJS
- **Build Tool**: Angular CLI
- **Containerización**: Docker
- **Web Server**: Nginx

## 📋 Requisitos

- Node.js 18+ 
- npm 9+
- Git

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/jipson4210/app_bibliotecainteligente.git
cd app_bibliotecainteligente
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## 📦 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── app.component.ts           # Componente principal
│   │   ├── header.component.*         # Encabezado
│   │   ├── registration-form/         # Formulario de registro
│   │   └── user-list/                 # Listado de usuarios
│   ├── models/
│   │   └── user.model.ts              # Modelo de usuario
│   ├── services/
│   │   └── registration.service.ts    # Servicio de registro
│   └── app.routes.ts                  # Rutas de la app
├── assets/                            # Imágenes y recursos
├── styles.scss                        # Estilos globales
└── index.html                         # HTML principal
```

## 🔨 Scripts Disponibles

```bash
# Desarrollo
npm start                  # Ejecutar en desarrollo (ng serve)

# Build
npm run build             # Compilación para producción

# Watch mode
npm run watch             # Observar cambios (ng build --watch)

# Testing
npm test                  # Ejecutar pruebas unitarias
```

## 🌐 Componentes Principales

### 1. **App Component**
Componente raíz que gestiona la estructura general de la aplicación.

### 2. **Header Component**
Encabezado con navegación y branding de la biblioteca.

### 3. **Registration Form Component**
Formulario para el registro de nuevos usuarios con validación de campos:
- Nombre
- Email
- Teléfono
- Dirección

### 4. **User List Component**
Tabla/lista de usuarios registrados con:
- Vista de todos los usuarios
- Avatar con iniciales
- Información de contacto
- Acciones (editar/eliminar si se implementa)

## 📡 Servicios

### RegistrationService
Maneja la comunicación con el backend API:
- `getUsers()`: Obtener lista de usuarios
- `createUser(user)`: Crear nuevo usuario
- `updateUser(id, user)`: Actualizar usuario
- `deleteUser(id)`: Eliminar usuario

**Configurar URL del API:**
Edita `src/environments/environment.ts` y `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'  // Reemplaza con tu API
};
```

## 🐳 Docker

### Build de imagen
```bash
docker build -t biblioteca-inteligente:latest .
```

### Ejecutar contenedor
```bash
docker run -p 80:80 biblioteca-inteligente:latest
```

Accede a `http://localhost`

## ☁️ Despliegue en Azure

### Opción 1: Azure Static Web Apps (Recomendado - Gratis)

1. **Conectar repositorio**
   - Ve a Azure Portal → Static Web Apps → Create
   - Selecciona tu repositorio GitHub
   - Rama: `main`

2. **Configuración automática**
   - Build preset: `Angular`
   - App location: `dist/app_bibiotecainteligente`

3. **Despliegue automático**
   - Cada push a `main` se desplegará automáticamente

### Opción 2: Azure App Service

1. Crear App Service (Plan Free F1)
2. Conectar con GitHub Actions
3. Configurar variables de entorno

### Variable de entorno para API
En Azure, crea una variable:
```
API_URL = https://tu-api.azurewebsites.net
```

## 🔌 Conexión con API Backend

La aplicación espera un API REST en la URL configurada en `environment.ts`.

### Endpoints esperados

```
GET  /api/users              # Obtener todos los usuarios
POST /api/users              # Crear usuario
GET  /api/users/:id          # Obtener usuario por ID
PUT  /api/users/:id          # Actualizar usuario
DELETE /api/users/:id        # Eliminar usuario
```

### Ejemplo de formato de usuario
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+34 612 345 678",
  "direccion": "Calle Principal 123"
}
```

## 🌐 CORS

Si el API está en otro dominio, asegúrate de configurar CORS:

**Node.js/Express:**
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://tu-frontend.azurestaticapps.net',
  credentials: true
}));
```

**.NET Core:**
```csharp
services.AddCors(options => {
    options.AddPolicy("AllowFrontend", builder => {
        builder.WithOrigins("https://tu-frontend.azurestaticapps.net")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

## 📱 Progressive Web App (PWA)

La aplicación incluye soporte para PWA:
- Service worker (`src/service-worker-cache.ts`)
- Manifest (`ngsw-config.json`)
- Offline support
- Caching inteligente

## 🧪 Testing

```bash
# Ejecutar pruebas
npm test

# Con cobertura
npm test -- --code-coverage
```

## 🎨 Personalización

### Temas
Puedes cambiar el tema de PrimeNG en `angular.json`:
```json
"styles": [
  "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
  "src/styles.scss"
]
```

Temas disponibles:
- `lara-light-blue` (actual)
- `lara-light-green`
- `lara-light-purple`
- `lara-dark-blue`
- Y más...

### Colores y estilos
Edita `src/styles.scss` para personalizar colores y fuentes globales.

## 📖 Documentación Adicional

- [Angular Documentation](https://angular.io)
- [PrimeNG Components](https://primeng.org)
- [RxJS Documentation](https://rxjs.dev)
- [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)

## 🐛 Problemas Comunes

### El servidor no compila
```bash
# Limpiar caché
rm -rf node_modules package-lock.json
npm install
npm start
```

### Error de conexión al API
- Verificar URL en `environment.ts`
- Asegurar que CORS está configurado
- Verificar que el API está ejecutándose

### Archivos CSS de PrimeNG no cargan
- Asegurar que las rutas en `angular.json` son correctas
- Ejecutar `npm install primeng --save`

## 📝 Licencia

MIT License - Libre para usar y modificar

## 👤 Autor

Desarrollado para Biblioteca Inteligente

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en GitHub:
https://github.com/jipson4210/app_bibliotecainteligente/issues

---

**Última actualización:** Diciembre 2025
