# 🔧 New-Scriptorium - Backend Setup Guide

## ✅ Fase 1 Completada: Backend + Base de Datos

### 📁 Archivos Creados

#### Backend API
```
api/
├── lib/
│   ├── db.ts              ✅ Abstracción de base de datos
│   └── auth.ts            ✅ Utilidades JWT y autenticación
├── auth/
│   ├── register.ts        ✅ POST /api/auth/register
│   ├── login.ts           ✅ POST /api/auth/login
│   ├── verify.ts          ✅ GET /api/auth/verify
│   └── logout.ts          ✅ POST /api/auth/logout
├── ai/
│   ├── transcribe.ts      ✅ POST /api/ai/transcribe (Proxy Gemini)
│   ├── analyze.ts         ✅ POST /api/ai/analyze
│   └── translate.ts       ✅ POST /api/ai/translate
├── manuscripts/
│   ├── create.ts          ✅ POST /api/manuscripts/create
│   ├── list.ts            ✅ GET /api/manuscripts/list
│   ├── update.ts          ✅ PUT /api/manuscripts/update
│   └── delete.ts          ✅ DELETE /api/manuscripts/delete
└── init-db.ts             ✅ GET /api/init-db (Setup inicial)
```

#### Frontend
```
src/
├── contexts/
│   └── AuthContext.tsx    ✅ Context de autenticación React
├── components/
│   └── AuthModal.tsx      ✅ Modal Login/Registro
└── services/
    └── apiService.ts      ✅ Cliente API para backend

App.tsx                    ✅ Integrado con AuthContext y manuscriptService
components/Transcriber.tsx ✅ Migrado a aiService (backend seguro)
index.tsx                  ✅ Actualizado con AuthProvider
```

#### Configuración
```
.env.example               ✅ Plantilla de variables de entorno
vercel.json                ✅ Configuración Vercel Functions
README_BACKEND.md          ✅ Documentación completa
```

---

## 🚀 Setup Instructions

### 1. Configurar Variables de Entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores reales:

```bash
# Google Gemini API Key
GOOGLE_API_KEY=TU_API_KEY_AQUI

# JWT Secret (genera uno con: openssl rand -base64 32)
JWT_SECRET=tu-secret-jwt-super-seguro

# Init DB Secret
INIT_DB_SECRET=tu-secret-para-init-db

# Vercel Postgres (auto-configurado en Vercel)
POSTGRES_URL=...
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Vercel Postgres

#### Opción A: Vercel Dashboard (Recomendado)
1. Ve a tu proyecto en Vercel
2. Storage → Create Database → Postgres
3. Las variables de entorno se configuran automáticamente

#### Opción B: Local Development
```bash
# Instalar Vercel CLI
npm i -g vercel

# Vincular proyecto
vercel link

# Descargar variables de entorno
vercel env pull .env.local
```

### 4. Inicializar Base de Datos

**Una vez desplegado en Vercel**, ejecuta:

```bash
curl "https://tu-proyecto.vercel.app/api/init-db?secret=TU_INIT_DB_SECRET"
```

Esto creará las tablas:
- `users` (Usuarios con autenticación)
- `manuscripts` (Manuscritos con soporte vectorial)

---

## 📊 Esquema de Base de Datos

### Tabla `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,           -- bcrypt hash
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',          -- 'user' | 'admin' | 'researcher'
  organization VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `manuscripts`
```sql
CREATE TABLE manuscripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  transcription TEXT NOT NULL,
  translation TEXT,
  analysis JSONB,                           -- Análisis diplomático
  visual_analysis JSONB,                    -- Elementos visuales
  status VARCHAR(50) DEFAULT 'pending',     -- 'pending' | 'processing' | 'completed'
  is_duplicate_of UUID REFERENCES manuscripts(id),
  related_manuscript_ids UUID[],
  calculated_relations JSONB,
  embedding vector(768),                    -- Para búsqueda semántica
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Seguridad Implementada

### ✅ Autenticación
- JWT con expiración de 7 días
- httpOnly cookies (protección XSS)
- bcrypt con 12 salt rounds
- Verificación de sesión en cada request

### ✅ API Keys
- API Key de Gemini en BACKEND (no expuesta al cliente)
- Proxy seguro en `/api/ai/*`
- Middleware de autenticación en todos los endpoints sensibles

### ✅ Base de Datos
- Prepared statements (protección SQL injection)
- Foreign keys con ON DELETE CASCADE
- Índices optimizados para performance

---

## 🧪 Testing

### Test de Autenticación
```bash
# Registro
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Verify (con cookie)
curl http://localhost:3000/api/auth/verify -b cookies.txt
```

### Test de API
```bash
# Transcribir (requiere autenticación)
curl -X POST http://localhost:3000/api/ai/transcribe \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"imageBase64":"data:image/jpeg;base64,..."}'
```

---

## 📦 Deployment a Vercel

### 1. Configurar Variables de Entorno en Vercel

```bash
# Configurar en Vercel Dashboard
# Settings → Environment Variables

GOOGLE_API_KEY=...
JWT_SECRET=...
INIT_DB_SECRET=...
POSTGRES_URL=...  (auto-configurado con Vercel Postgres)
```

### 2. Deploy

```bash
git add .
git commit -m "feat: Backend completo con autenticación y BD"
git push origin main
```

### 3. Inicializar BD

```bash
curl "https://new-scriptorium.vercel.app/api/init-db?secret=TU_SECRET"
```

---

## ✅ Checklist de Verificación

**Backend:**
- [ ] Variables de entorno configuradas en Vercel (`GOOGLE_API_KEY`, `JWT_SECRET`, `INIT_DB_SECRET`)
- [ ] Vercel Postgres creado y vinculado
- [ ] `/api/init-db` ejecutado exitosamente (crear tablas)
- [ ] Registro de usuario funciona (`/api/auth/register`)
- [ ] Login funciona (`/api/auth/login`)
- [ ] Endpoints AI protegidos y funcionando (`/api/ai/*`)
- [ ] Manuscritos se guardan en BD (`/api/manuscripts/create`)

**Frontend:**
- [x] `App.tsx` integrado con `AuthContext` y `manuscriptService`
- [x] `Transcriber.tsx` migrado a `aiService` (backend seguro)
- [x] `index.tsx` con `<AuthProvider>`
- [x] `AuthModal` implementado para login/registro
- [ ] Build exitoso sin errores TypeScript
- [ ] Deploy a Vercel completado

**Seguridad:**
- [x] API key de Gemini movida al backend (no expuesta al cliente)
- [x] Autenticación JWT con httpOnly cookies
- [x] Endpoints protegidos con `requireAuth` middleware
- [ ] CORS configurado correctamente en `vercel.json`

---

## 🎯 Próximos Pasos

### Fase 2: Búsqueda Semántica
- Implementar generación de embeddings
- Crear índice vectorial con pgvector
- Endpoint `/api/manuscripts/search`

### Fase 3: Dashboard de Estadísticas
- Gráficos con Chart.js
- Análisis de tendencias
- Top entidades

### Fase 4: Geolocalización
- Integrar Google Maps Geocoding API
- Mapa interactivo con Leaflet

---

## 📝 Notas Importantes

### ✅ Migración de localStorage a BD - COMPLETADA
La migración del frontend ha sido completada exitosamente:

1. ✅ `App.tsx` ahora carga manuscritos desde `/api/manuscripts/list` usando `useEffect`
2. ✅ `App.tsx` usa `manuscriptService.create()` para guardar manuscritos en el backend
3. ✅ `Transcriber.tsx` migrado completamente a `aiService` (backend seguro)
4. ✅ Modal de autenticación integrado - la app requiere login antes de usar

**Cambios Realizados:**
- `App.tsx`: Integrado con `useAuth()`, `loadManuscripts()`, y `AuthModal`
- `Transcriber.tsx`: Todas las llamadas a Gemini API ahora usan `aiService.transcribe()`, `aiService.analyze()`, `aiService.translate()`
- `index.tsx`: Envuelto con `<AuthProvider>`

### ✅ API Key Migration - COMPLETADA
La API key de Google Gemini ya NO está expuesta en el cliente:

```typescript
// ❌ ANTES (INSEGURO - Ya no se usa)
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });

// ✅ AHORA (SEGURO - Implementado)
import { aiService } from './src/services/apiService';
const result = await aiService.transcribe(imageBase64);
const analysis = await aiService.analyze(text);
const translation = await aiService.translate(text, 'es');
```

**IMPORTANTE:** Asegúrate de eliminar `VITE_GOOGLE_API_KEY` de las variables de entorno de Vercel y usa solo `GOOGLE_API_KEY` (sin prefijo VITE_) en el backend.

---

## 🐛 Troubleshooting

### Error: "GOOGLE_API_KEY no está configurada"
- Verifica que la variable esté en Vercel → Settings → Environment Variables
- Redeploy después de añadir variables

### Error: "No autenticado"
- Asegúrate de que las cookies estén habilitadas
- Verifica que `credentials: 'include'` esté en fetch

### Error de CORS
- Verifica que `vercel.json` tenga los headers CORS
- Asegúrate que el frontend use el mismo dominio que el backend

---

## 📞 Soporte

Si necesitas ayuda, revisa:
- Logs de Vercel: https://vercel.com/dashboard
- Documentación de Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres

---

**Estado:** ✅ Fase 1 COMPLETADA
**Siguiente:** Fase 2 - Búsqueda Semántica
