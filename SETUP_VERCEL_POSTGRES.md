# 🗄️ Configuración de Vercel Postgres - PASO A PASO

## ✅ Estado Actual

**Variables de Entorno Configuradas:**
- ✅ `GOOGLE_API_KEY` - API key de Google Gemini (backend)
- ✅ `JWT_SECRET` - Secret para tokens JWT: `L0xTjQcCZlu4CtnqYLQh3VO8jrgDUO5l7t2xk3Ye6KI=`
- ✅ `INIT_DB_SECRET` - Secret para init-db: `2kCsvCEAyuoRDiSrTWLS+qlcUOLvyxym`

**Pendiente:**
- ⏳ Crear Vercel Postgres Database
- ⏳ Ejecutar `/api/init-db` para crear tablas

---

## 📋 Paso 1: Crear Vercel Postgres Database

### Opción A: Desde Vercel Dashboard (RECOMENDADO)

1. **Ir al Dashboard de Vercel:**
   - Ve a: https://vercel.com/solammedia-9886s-projects/new-scriptorium

2. **Navegar a Storage:**
   - Click en la pestaña "Storage" en el menú superior
   - O usa el link directo: https://vercel.com/solammedia-9886s-projects/new-scriptorium/stores

3. **Crear Nueva Database:**
   - Click en el botón "Create Database"
   - Selecciona "Postgres"
   - Nombre sugerido: `new-scriptorium-db`
   - Región: Selecciona la más cercana a tus usuarios (ej: `us-east-1` o `eu-west-1`)

4. **Conectar al Proyecto:**
   - Marca la opción "Connect to Project"
   - Selecciona el proyecto `new-scriptorium`
   - Vercel automáticamente agregará las siguientes variables:
     - `POSTGRES_URL`
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`
     - `POSTGRES_USER`
     - `POSTGRES_HOST`
     - `POSTGRES_PASSWORD`
     - `POSTGRES_DATABASE`

5. **Confirmar:**
   - Click en "Create & Continue"
   - Espera unos segundos mientras se provisiona la base de datos

### Verificación

Después de crear la base de datos, verifica que las variables estén configuradas:

```bash
cd New-Scriptorium
vercel env ls --scope solammedia-9886s-projects
```

Deberías ver las variables `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, etc.

---

## 📋 Paso 2: Redeploy de la Aplicación

Una vez creada la base de datos, Vercel debe hacer redeploy automáticamente. Si no, ejecuta:

```bash
cd New-Scriptorium
vercel --prod --scope solammedia-9886s-projects
```

Espera a que el deployment termine y verifique que esté "Ready" (no "Error").

---

## 📋 Paso 3: Inicializar Base de Datos

Ejecuta el endpoint de inicialización para crear las tablas:

```bash
curl "https://new-scriptorium.vercel.app/api/init-db?secret=2kCsvCEAyuoRDiSrTWLS+qlcUOLvyxym"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "tables": ["users", "manuscripts"]
}
```

Si recibes un error, verifica:
1. Que las variables `POSTGRES_URL` estén configuradas
2. Que el secret sea correcto
3. Los logs de Vercel: `vercel logs --scope solammedia-9886s-projects`

---

## 📋 Paso 4: Probar la Aplicación

1. **Abrir la app:**
   ```
   https://new-scriptorium.vercel.app
   ```

2. **Registrar un usuario:**
   - Se mostrará el `AuthModal`
   - Click en "Registrarse"
   - Email: tu@ejemplo.com
   - Password: (mínimo 8 caracteres)
   - Nombre: Tu Nombre

3. **Verificar funcionalidad:**
   - Login debería funcionar
   - Cargar una imagen de manuscrito
   - Transcribir (esto llamará al backend seguro)
   - Ver que el manuscrito se guarda en la base de datos
   - Logout y login nuevamente - deberías ver el manuscrito guardado

---

## 🐛 Troubleshooting

### Error: "POSTGRES_URL no está configurada"
- **Solución:** Crea la base de datos desde el dashboard de Vercel siguiendo el Paso 1

### Error: "Invalid secret" en /api/init-db
- **Solución:** Usa el secret correcto: `2kCsvCEAyuoRDiSrTWLS+qlcUOLvyxym`

### Error: "No autenticado" al usar la app
- **Solución:**
  - Verifica que JWT_SECRET esté configurado en Vercel
  - Borra cookies del navegador
  - Intenta registrarte de nuevo

### Error 500 en endpoints de API
- **Solución:**
  - Revisa los logs: `vercel logs new-scriptorium.vercel.app --scope solammedia-9886s-projects`
  - Verifica que GOOGLE_API_KEY esté configurada
  - Verifica que la base de datos esté inicializada

---

## 📊 Verificación Final

Una vez completados todos los pasos, verifica:

```bash
# 1. Variables de entorno
vercel env ls --scope solammedia-9886s-projects

# Deberías ver:
# - GOOGLE_API_KEY
# - JWT_SECRET
# - INIT_DB_SECRET
# - POSTGRES_URL (y variantes)

# 2. Deployment status
vercel ls --scope solammedia-9886s-projects

# El último deployment debe estar "Ready"

# 3. Probar endpoint de health check (si existe)
curl https://new-scriptorium.vercel.app/api/auth/verify

# Debería devolver error de autenticación (es correcto, significa que el endpoint funciona)
```

---

## 🎯 Próximos Pasos Después de Setup

Una vez que la base de datos esté funcionando:

1. **Fase 2: Búsqueda Semántica**
   - Implementar generación de embeddings con text-embedding-004
   - Crear índice vectorial con pgvector
   - Endpoint `/api/manuscripts/search`

2. **Fase 3: Dashboard de Estadísticas**
   - Gráficos con Chart.js
   - Análisis de tendencias

3. **Fase 4: Geolocalización**
   - Integrar Google Maps Geocoding API

---

## 📞 Soporte

Si encuentras algún problema:
1. Revisa los logs de Vercel
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que la base de datos Postgres esté creada y conectada al proyecto

**Links Útiles:**
- Dashboard Vercel: https://vercel.com/solammedia-9886s-projects/new-scriptorium
- Storage: https://vercel.com/solammedia-9886s-projects/new-scriptorium/stores
- Logs: https://vercel.com/solammedia-9886s-projects/new-scriptorium/logs
- Documentación Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
