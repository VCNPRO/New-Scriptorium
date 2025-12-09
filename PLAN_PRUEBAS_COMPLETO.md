# 📋 PLAN DE PRUEBAS COMPLETO - SCRIPTORIUM

## 🎯 Objetivo

Validar el funcionamiento completo del sistema Scriptorium mediante pruebas **funcionales**, **de capacidad** y **de stress** sin coste adicional, cubriendo todas las funcionalidades implementadas.

---

## 📊 Resumen Ejecutivo

| Categoría | Tests Automáticos | Tests Manuales | Cobertura |
|-----------|-------------------|----------------|-----------|
| **Funcionales** | 25+ tests | 40+ escenarios | 100% |
| **Capacidad** | 15+ tests | 10 escenarios | 95% |
| **Stress** | 10+ tests | 5 escenarios | 90% |
| **Integración** | 8+ tests | 15 escenarios | 95% |

**Tiempo estimado de ejecución completa**: 2-3 horas

---

## 🤖 PARTE 1: PRUEBAS AUTOMATIZADAS

### 1.1. Ejecutar Suite Completa de Tests

```bash
# Navegar al proyecto
cd C:\Users\Usuario\New-Scriptorium

# Ejecutar todos los tests
npm run test

# Ejecutar con cobertura
npm run test:coverage

# Ejecutar con UI interactiva
npm run test:ui
```

### 1.2. Tests Unitarios

#### SearchBar Component
- ✅ Renderizado correcto
- ✅ No buscar con menos de 3 caracteres
- ✅ Debounce de 500ms
- ✅ Mostrar resultados
- ✅ Seleccionar manuscrito
- ✅ Mensaje sin resultados
- ✅ Manejo de errores
- ✅ Limpiar búsqueda

**Comando**: `npm run test SearchBar.test.tsx`

#### TableViewer Component
- ✅ Renderizado con tablas
- ✅ No renderizar sin tablas
- ✅ Información colapsada
- ✅ Expandir/colapsar
- ✅ Mostrar headers y filas
- ✅ Copiar al portapapeles
- ✅ Exportar a CSV
- ✅ Múltiples tablas independientes
- ✅ Celdas vacías

**Comando**: `npm run test TableViewer.test.tsx`

### 1.3. Tests de Integración

#### Flujo Completo
- ✅ Subir → Transcribir → Analizar → Guardar
- ✅ Múltiples manuscritos simultáneos
- ✅ Sincronización frontend-backend

#### Búsqueda
- ✅ Búsqueda en múltiples campos
- ✅ Ranking por relevancia

#### Geolocalización
- ✅ Cálculo de centro del mapa
- ✅ Ubicaciones sin coordenadas

#### Exportación
- ✅ Generación de CSV
- ✅ Caracteres especiales
- ✅ Formato compatible con Excel

**Comando**: `npm run test full-workflow.test.tsx`

### 1.4. Tests de Capacidad y Stress

#### Búsqueda
- ✅ 1,000 manuscritos (<1s)
- ✅ 10,000 manuscritos (<5s)
- ✅ Ranking de 1,000 resultados (<100ms)

#### Análisis de Texto
- ✅ 5,000 palabras (<500ms)
- ✅ 15,000 caracteres (límite API)
- ✅ 100 entidades extraídas

#### Tablas
- ✅ Tabla 50×100 a CSV (<1s)
- ✅ 20 tablas en un documento
- ✅ Caracteres especiales

#### Mapas
- ✅ 100 marcadores
- ✅ Ubicaciones duplicadas

#### Concurrencia
- ✅ 10 transcripciones simultáneas (<2s)
- ✅ 50 búsquedas simultáneas

#### Límites
- ✅ Imágenes >20MB rechazadas
- ✅ Resultados limitados a 50
- ✅ Texto truncado a 15,000 caracteres
- ✅ Timeout de 5 minutos

**Comando**: `npm run test performance.test.ts`

---

## 👤 PARTE 2: PRUEBAS MANUALES DETALLADAS

### 2.1. AUTENTICACIÓN Y SEGURIDAD

#### Test 1: Registro de Usuario
**Objetivo**: Verificar proceso de registro

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Acceder a la aplicación sin login | Mostrar modal de autenticación | ☐ |
| 2 | Hacer clic en "Crear cuenta" | Mostrar formulario de registro | ☐ |
| 3 | Ingresar nombre, email y contraseña | Campos aceptan texto | ☐ |
| 4 | Contraseña <8 caracteres | Mostrar error de validación | ☐ |
| 5 | Email inválido | Mostrar error de formato | ☐ |
| 6 | Datos correctos + "Registrarse" | Usuario creado, redirigir a Dashboard | ☐ |

**Datos de prueba**:
- Nombre: `Usuario Prueba`
- Email: `prueba@scriptorium.com`
- Contraseña: `Test1234!`

---

#### Test 2: Login de Usuario
**Objetivo**: Validar inicio de sesión

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Hacer clic en "Ya tengo cuenta" | Mostrar formulario de login | ☐ |
| 2 | Ingresar email y contraseña incorrecta | Mostrar error "Credenciales inválidas" | ☐ |
| 3 | Ingresar credenciales correctas | Login exitoso, mostrar Dashboard | ☐ |
| 4 | Verificar persistencia de sesión | Recargar página, sesión activa | ☐ |
| 5 | Hacer clic en "Cerrar Sesión" | Volver a modal de login | ☐ |

---

#### Test 3: Roles y Permisos (Admin)
**Objetivo**: Verificar funcionalidad de administración

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Login como admin | Ver botón "Administración" en sidebar | ☐ |
| 2 | Hacer clic en "Administración" | Mostrar panel de gestión de usuarios | ☐ |
| 3 | Ver lista de usuarios | Mostrar usuarios con roles y estados | ☐ |
| 4 | Cambiar rol de usuario | Actualizar rol exitosamente | ☐ |
| 5 | Desactivar usuario | Usuario marcado como inactivo | ☐ |
| 6 | Logout y login como usuario normal | NO ver botón "Administración" | ☐ |

---

### 2.2. TRANSCRIPCIÓN DE MANUSCRITOS (HTR)

#### Test 4: Subir y Transcribir Imagen
**Objetivo**: Validar flujo completo de transcripción

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Ir a "Mesa de Trabajo" | Mostrar área de carga de imagen | ☐ |
| 2 | Arrastrar imagen o hacer clic para subir | Previsualización de imagen | ☐ |
| 3 | Hacer clic en "Transcribir con IA" | Mostrar indicador de carga | ☐ |
| 4 | Esperar transcripción (15-30s) | Mostrar texto transcrito con confianza | ☐ |
| 5 | Editar transcripción manualmente | Cambios se guardan en tiempo real | ☐ |
| 6 | Verificar puntuación de confianza | Mostrar % de confianza (70-99%) | ☐ |

**Imágenes de prueba**: Usar archivos en `tests/data/sample-images/` (crear 3-5 imágenes de manuscritos de prueba)

---

#### Test 5: Transcripción de Múltiples Imágenes
**Objetivo**: Probar capacidad de procesar varios manuscritos

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Transcribir manuscrito #1 | Guardado exitoso | ☐ |
| 2 | Volver a "Mesa de Trabajo" | Formulario limpio para nuevo manuscrito | ☐ |
| 3 | Transcribir manuscrito #2 | Guardado exitoso, #1 sin alterar | ☐ |
| 4 | Ir a "Archivos" | Ver ambos manuscritos en la lista | ☐ |
| 5 | Abrir manuscrito #1 | Datos intactos | ☐ |

---

#### Test 6: Límites de Imágenes
**Objetivo**: Validar restricciones de tamaño y formato

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Subir imagen >20MB | Rechazar con mensaje de error | ☐ |
| 2 | Subir archivo PDF | Rechazar (pendiente soporte PDF) | ☐ |
| 3 | Subir archivo .txt | Rechazar (solo imágenes) | ☐ |
| 4 | Subir imagen JPG de 15MB | Aceptar y procesar | ☐ |
| 5 | Subir imagen PNG de 8MB | Aceptar y procesar | ☐ |

---

### 2.3. ANÁLISIS DIPLOMÁTICO

#### Test 7: Análisis Automático
**Objetivo**: Verificar extracción de metadatos

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Transcribir manuscrito histórico | Análisis se ejecuta automáticamente | ☐ |
| 2 | Ir a tab "Diplomática" | Mostrar resumen del documento | ☐ |
| 3 | Verificar "Tipología Documental" | Detectada correctamente (Carta, Testamento, etc.) | ☐ |
| 4 | Verificar "Tipo de Escritura" | Paleografía sugerida | ☐ |
| 5 | Verificar "Idioma" | Idioma detectado con confianza | ☐ |
| 6 | Ver "Serie Documental Sugerida" | Propuesta de clasificación | ☐ |

**Manuscrito de prueba**: Usar `sample-manuscripts.json` > Carta Real de Felipe II

---

#### Test 8: Extracción de Entidades
**Objetivo**: Validar NER (Named Entity Recognition)

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Analizar manuscrito con personas | Listar nombres detectados con confianza | ☐ |
| 2 | Verificar lugares | Listar ubicaciones con confianza | ☐ |
| 3 | Verificar fechas | Extraer fechas mencionadas | ☐ |
| 4 | Verificar organizaciones | Detectar instituciones | ☐ |
| 5 | Verificar eventos | Identificar eventos históricos | ☐ |
| 6 | Hacer clic en entidad | Resaltar en transcripción (opcional) | ☐ |

---

#### Test 9: Palabras Clave
**Objetivo**: Verificar generación de keywords

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Ver sección "Palabras Clave" | Mostrar 5-10 keywords relevantes | ☐ |
| 2 | Verificar relevancia | Keywords relacionadas con contenido | ☐ |
| 3 | Ver puntuación de confianza | Cada keyword con su confianza | ☐ |
| 4 | Usar keyword para búsqueda | Búsqueda encuentra el manuscrito | ☐ |

---

### 2.4. BÚSQUEDA INTELIGENTE

#### Test 10: Búsqueda Básica
**Objetivo**: Validar búsqueda de texto completo

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Ir a Dashboard o Archivos | Ver barra de búsqueda | ☐ |
| 2 | Escribir "a" (1 carácter) | No buscar, esperar más caracteres | ☐ |
| 3 | Escribir "car" (3 caracteres) | Iniciar búsqueda después de debounce (500ms) | ☐ |
| 4 | Esperar resultados | Mostrar manuscritos con "car" | ☐ |
| 5 | Ver resultados | Incluir miniatura, título, extracto | ☐ |
| 6 | Ver texto resaltado | Coincidencias en amarillo/copper | ☐ |

**Términos de búsqueda de prueba**:
- "Felipe"
- "comercio"
- "Toledo"
- "testamento"

---

#### Test 11: Búsqueda Avanzada
**Objetivo**: Validar búsqueda en múltiples campos

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Buscar término en título | Encontrar manuscrito por título | ☐ |
| 2 | Buscar término en transcripción | Encontrar por contenido | ☐ |
| 3 | Buscar término en análisis | Encontrar por resumen/keywords | ☐ |
| 4 | Buscar término inexistente | Mostrar "No se encontraron manuscritos" | ☐ |
| 5 | Ver puntuación de relevancia | Ordenados por rank descendente | ☐ |

---

#### Test 12: Búsqueda con Caracteres Especiales
**Objetivo**: Validar búsqueda en español

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Buscar "María" | Encontrar manuscritos con "María" o "Maria" | ☐ |
| 2 | Buscar "Guzmán" | Encontrar con tilde | ☐ |
| 3 | Buscar "Señor" | Encontrar con ñ | ☐ |
| 4 | Buscar "¿Qué?" | Manejar signos de interrogación | ☐ |

---

### 2.5. VISUALIZACIÓN GEOGRÁFICA

#### Test 13: Mapa con Ubicaciones
**Objetivo**: Validar mapa interactivo con Leaflet

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Abrir manuscrito con geodata | Ir a tab "Geografía" | ☐ |
| 2 | Ver mapa | Renderizar mapa de OpenStreetMap | ☐ |
| 3 | Ver marcadores | Mostrar marcadores personalizados | ☐ |
| 4 | Verificar colores de marcadores | Origen (marrón), Destino (cobre), Mencionado (claro) | ☐ |
| 5 | Hacer clic en marcador | Abrir popup con info del lugar | ☐ |
| 6 | Ver coordenadas en popup | Mostrar lat/lon con 4 decimales | ☐ |
| 7 | Zoom in/out | Mapa responde correctamente | ☐ |
| 8 | Arrastrar mapa | Pan funciona correctamente | ☐ |

---

#### Test 14: Auto-centrado del Mapa
**Objetivo**: Validar centrado automático

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Abrir manuscrito con 1 ubicación | Mapa centrado en esa ubicación, zoom 8 | ☐ |
| 2 | Abrir manuscrito con 3 ubicaciones | Mapa ajustado para ver todas (fitBounds) | ☐ |
| 3 | Abrir manuscrito con 10 ubicaciones | Todas visibles en mapa | ☐ |
| 4 | Manuscrito sin geodata | Mostrar mensaje "No hay ubicaciones" | ☐ |

---

#### Test 15: Leyenda del Mapa
**Objetivo**: Verificar interpretabilidad

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Ver esquina inferior derecha | Mostrar leyenda con fondo parchment | ☐ |
| 2 | Verificar símbolos | ⚑ Origen, ▶ Destino, ● Mencionado | ☐ |
| 3 | Verificar colores | Coinciden con marcadores en mapa | ☐ |

---

### 2.6. EXTRACCIÓN Y EXPORTACIÓN DE TABLAS

#### Test 16: Detección de Tablas
**Objetivo**: Validar extracción automática

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Transcribir manuscrito con tabla | IA detecta tabla automáticamente | ☐ |
| 2 | Ir a tab "Diplomática" | Ver sección "Tablas Extraídas" | ☐ |
| 3 | Ver contador | Mostrar número de tablas detectadas | ☐ |
| 4 | Ver título de tabla | Título sugerido por IA | ☐ |
| 5 | Ver info de tabla | "X columnas × Y filas • Confianza: Z%" | ☐ |

**Manuscrito de prueba**: Usar `sample-manuscripts.json` > Carta Real (Tabla de Impuestos)

---

#### Test 17: Visualización de Tabla
**Objetivo**: Validar renderizado de tabla

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Tabla inicialmente colapsada | Flecha ▶ apuntando a la derecha | ☐ |
| 2 | Hacer clic en header de tabla | Expandir, flecha ▼ apuntando abajo | ☐ |
| 3 | Ver headers | Primera fila con fondo wood, texto bold | ☐ |
| 4 | Ver filas | Alternancia de colores parchment/white | ☐ |
| 5 | Ver celdas vacías | Mostrar guión "-" | ☐ |
| 6 | Ver botones de acción | Mostrar "Copiar" y "CSV" | ☐ |

---

#### Test 18: Exportación de Tabla a CSV
**Objetivo**: Validar exportación de datos

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Hacer clic en botón "CSV" | Iniciar descarga automática | ☐ |
| 2 | Verificar nombre de archivo | `[Título_de_Tabla].csv` | ☐ |
| 3 | Abrir CSV en Notepad | Ver datos separados por comas | ☐ |
| 4 | Abrir CSV en Excel | Datos en columnas separadas | ☐ |
| 5 | Verificar headers | Primera fila con encabezados | ☐ |
| 6 | Verificar datos | Todas las filas presentes | ☐ |
| 7 | Verificar comillas | Celdas con comas envueltas en "" | ☐ |

---

#### Test 19: Copiar Tabla al Portapapeles
**Objetivo**: Validar copia para Excel

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Hacer clic en botón "Copiar" | Mostrar alert "Tabla copiada..." | ☐ |
| 2 | Abrir Excel en blanco | - | ☐ |
| 3 | Hacer Ctrl+V en Excel | Datos pegados en celdas separadas | ☐ |
| 4 | Verificar formato | Headers en primera fila, datos alineados | ☐ |
| 5 | Verificar separadores | Tabs, no comas | ☐ |

---

#### Test 20: Múltiples Tablas
**Objetivo**: Validar manejo de múltiples tablas

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Manuscrito con 3 tablas | Ver 3 secciones expandibles | ☐ |
| 2 | Expandir tabla 1 | Solo tabla 1 expandida | ☐ |
| 3 | Expandir tabla 2 | Tabla 1 sigue expandida, tabla 2 también | ☐ |
| 4 | Colapsar tabla 1 | Solo tabla 2 visible | ☐ |
| 5 | Exportar tabla 2 a CSV | Solo datos de tabla 2 en CSV | ☐ |

---

### 2.7. BIBLIOTECA Y GESTIÓN DE MANUSCRITOS

#### Test 21: Vista de Archivos
**Objetivo**: Validar biblioteca de manuscritos

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Hacer clic en "Archivos" | Mostrar grid de manuscritos | ☐ |
| 2 | Ver miniaturas | Imágenes de manuscritos o icono de archivo | ☐ |
| 3 | Ver títulos | Títulos truncados si son largos | ☐ |
| 4 | Ver resúmenes | Primeras 2 líneas del resumen | ☐ |
| 5 | Ver fechas | Fecha de creación formateada | ☐ |
| 6 | Ver tipología | Badge con tipología documental | ☐ |
| 7 | Hover sobre manuscrito | Cambio de sombra y borde copper | ☐ |
| 8 | Hacer clic en manuscrito | Abrir en Vista de Transcripción | ☐ |

---

#### Test 22: Dashboard con Recientes
**Objetivo**: Validar vista principal

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Ir a "Tablero" | Ver sección "Manuscritos Recientes" | ☐ |
| 2 | Ver manuscritos | 3-5 más recientes | ☐ |
| 3 | Hacer clic en "Nueva Transcripción" | Ir a "Mesa de Trabajo" | ☐ |
| 4 | Ver barra de búsqueda | Presente y funcional | ☐ |
| 5 | Buscar manuscrito | Mostrar resultados en dropdown | ☐ |
| 6 | Seleccionar resultado | Abrir manuscrito seleccionado | ☐ |

---

### 2.8. NAVEGACIÓN E INTERFAZ

#### Test 23: Sidebar y Navegación
**Objetivo**: Validar navegación entre vistas

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Ver sidebar izquierdo | Fondo wood con textura | ☐ |
| 2 | Ver logo y título | "Scriptorium" con ícono de pluma | ☐ |
| 3 | Hacer clic en "Tablero" | Mostrar Dashboard, botón resaltado | ☐ |
| 4 | Hacer clic en "Mesa de Trabajo" | Mostrar Transcriber | ☐ |
| 5 | Hacer clic en "Archivos" | Mostrar Biblioteca | ☐ |
| 6 | Hacer clic en "Manual de Usuario" | Mostrar Guía | ☐ |
| 7 | Hacer clic en "Configuración" | Mostrar alert "en desarrollo" | ☐ |
| 8 | Ver info de usuario | Nombre y email en sidebar | ☐ |

---

#### Test 24: Colapsar/Expandir Sidebar
**Objetivo**: Validar responsividad

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Sidebar expandido | Ancho 64 (16rem), mostrar textos | ☐ |
| 2 | Hacer clic en "Colapsar ◀" | Sidebar se colapsa suavemente | ☐ |
| 3 | Sidebar colapsado | Ancho 20 (5rem), solo iconos | ☐ |
| 4 | Hacer clic en "Expandir ▶" | Sidebar se expande suavemente | ☐ |
| 5 | Navegar entre vistas | Sidebar mantiene estado | ☐ |

---

#### Test 25: Tabs en Transcriber
**Objetivo**: Validar navegación por pestañas

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Abrir manuscrito | Tab "Transcripción" activo por defecto | ☐ |
| 2 | Hacer clic en "Diplomática" | Cambiar a tab Diplomática | ☐ |
| 3 | Hacer clic en "Geografía" | Cambiar a tab Geografía con mapa | ☐ |
| 4 | Hacer clic en "Relaciones" | Cambiar a tab Relaciones | ☐ |
| 5 | Tab activo | Fondo copper, texto parchment | ☐ |
| 6 | Tab inactivo | Texto wood, hover cambia color | ☐ |

---

### 2.9. PRUEBAS DE CAPACIDAD (MANUAL)

#### Test 26: Manuscrito Largo (5,000 palabras)
**Objetivo**: Validar rendimiento con textos largos

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Transcribir imagen con 5,000 palabras | Transcripción completa en <60s | ☐ |
| 2 | Ejecutar análisis diplomático | Análisis completo en <90s | ☐ |
| 3 | Editar transcripción | Sin lag al escribir | ☐ |
| 4 | Buscar palabra en transcripción | Resultados instantáneos | ☐ |
| 5 | Copiar transcripción completa | Copiado al portapapeles exitoso | ☐ |

---

#### Test 27: Biblioteca con 100 Manuscritos
**Objetivo**: Validar renderizado de lista grande

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Crear 100 manuscritos (usar script) | - | ☐ |
| 2 | Ir a "Archivos" | Cargar vista en <3s | ☐ |
| 3 | Scroll por la lista | Scroll fluido sin lag | ☐ |
| 4 | Buscar manuscrito específico | Resultados en <1s | ☐ |
| 5 | Abrir manuscrito del medio de la lista | Carga correcta | ☐ |

---

#### Test 28: Tabla Grande (30×50)
**Objetivo**: Validar renderizado de tabla grande

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Manuscrito con tabla 30 columnas × 50 filas | Detección exitosa | ☐ |
| 2 | Expandir tabla | Renderizado en <2s | ☐ |
| 3 | Scroll horizontal/vertical | Fluido | ☐ |
| 4 | Exportar a CSV | Descarga en <5s | ☐ |
| 5 | Abrir CSV en Excel | Todas las celdas presentes | ☐ |

---

### 2.10. PRUEBAS DE STRESS (MANUAL)

#### Test 29: Stress - 10 Operaciones Simultáneas
**Objetivo**: Validar estabilidad bajo carga

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Abrir 3 tabs del navegador con la app | Todas las sesiones activas | ☐ |
| 2 | Tab 1: Transcribir manuscrito | Procesando... | ☐ |
| 3 | Tab 2: Buscar manuscritos | Búsqueda funciona | ☐ |
| 4 | Tab 3: Ver mapa | Mapa se carga | ☐ |
| 5 | Esperar que todas completen | Todas exitosas, sin errores | ☐ |

---

#### Test 30: Stress - Red Lenta
**Objetivo**: Validar comportamiento con latencia

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Chrome DevTools > Network > Slow 3G | - | ☐ |
| 2 | Recargar aplicación | Carga completa (puede tardar) | ☐ |
| 3 | Transcribir manuscrito | Mostrar indicador de carga, sin crash | ☐ |
| 4 | Buscar manuscrito | Debounce funciona, no búsquedas múltiples | ☐ |
| 5 | Navegar entre vistas | Sin errores de timeout | ☐ |

---

#### Test 31: Stress - Desconexión de Internet
**Objetivo**: Validar manejo de errores de red

| Paso | Acción | Resultado Esperado | ✓ |
|------|--------|-------------------|---|
| 1 | Con app cargada, desconectar WiFi | - | ☐ |
| 2 | Intentar transcribir manuscrito | Mostrar error "No hay conexión" | ☐ |
| 3 | Intentar buscar manuscrito | Mostrar error gracefully | ☐ |
| 4 | Reconectar WiFi | - | ☐ |
| 5 | Reintentar operación | Funciona correctamente | ☐ |

---

## 📈 PRUEBAS DE RENDIMIENTO CON MÉTRICAS

### Test 32: Lighthouse Audit

```bash
# En Chrome DevTools
1. Abrir DevTools (F12)
2. Ir a tab "Lighthouse"
3. Seleccionar "Performance, Accessibility, Best Practices, SEO"
4. Hacer clic en "Analyze page load"
```

**Métricas objetivo**:
- Performance: >80
- Accessibility: >90
- Best Practices: >85
- SEO: >80

---

### Test 33: Core Web Vitals

| Métrica | Objetivo | Resultado | ✓ |
|---------|----------|-----------|---|
| **LCP** (Largest Contentful Paint) | <2.5s | _____ | ☐ |
| **FID** (First Input Delay) | <100ms | _____ | ☐ |
| **CLS** (Cumulative Layout Shift) | <0.1 | _____ | ☐ |

**Herramienta**: [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🔧 SCRIPTS DE AYUDA PARA PRUEBAS

### Script 1: Generar 100 Manuscritos de Prueba

```javascript
// scripts/generate-test-data.js
const fs = require('fs');

const templates = [
  'Carta Real', 'Testamento', 'Contrato de Arrendamiento',
  'Privilegio', 'Cédula Real', 'Escritura de Venta'
];

const locations = [
  'Toledo', 'Sevilla', 'Madrid', 'Barcelona', 'Valencia',
  'Granada', 'Córdoba', 'Salamanca', 'Segovia', 'Ávila'
];

const manuscripts = [];

for (let i = 1; i <= 100; i++) {
  manuscripts.push({
    id: `ms-test-${i}`,
    title: `${templates[i % templates.length]} ${i}`,
    transcription: `Este es un documento de prueba número ${i}. Contiene texto generado automáticamente para validar el rendimiento del sistema con grandes volúmenes de datos.`,
    analysis: {
      summary: { value: `Resumen del documento ${i}`, confidence: 0.85 },
      typology: { value: templates[i % templates.length], confidence: 0.9 },
      entities: {
        locations: [
          { value: locations[i % locations.length], confidence: 0.92 }
        ]
      }
    },
    createdAt: new Date(2024, 0, 1 + i).toISOString()
  });
}

fs.writeFileSync(
  'tests/data/test-manuscripts-100.json',
  JSON.stringify(manuscripts, null, 2)
);

console.log('✅ 100 manuscritos de prueba generados');
```

**Ejecutar**: `node scripts/generate-test-data.js`

---

### Script 2: Ejecutar Todas las Pruebas

```bash
# package.json - añadir scripts

"scripts": {
  "test": "vitest",
  "test:unit": "vitest run tests/unit",
  "test:integration": "vitest run tests/integration",
  "test:stress": "vitest run tests/stress",
  "test:coverage": "vitest run --coverage",
  "test:ui": "vitest --ui",
  "test:watch": "vitest watch",
  "test:all": "npm run test:unit && npm run test:integration && npm run test:stress"
}
```

---

## 📊 REPORTE DE RESULTADOS

### Plantilla de Reporte

```markdown
# Reporte de Pruebas - Scriptorium
**Fecha**: _______________
**Ejecutado por**: _______________
**Versión**: _______________

## Resumen Ejecutivo
- ✅ Tests pasados: ___ / ___
- ❌ Tests fallidos: ___
- ⚠️ Tests con advertencias: ___
- ⏸️ Tests omitidos: ___

## Pruebas Automatizadas
- Unitarias: ___ / ___
- Integración: ___ / ___
- Stress: ___ / ___

## Pruebas Manuales
- Funcionales: ___ / ___
- Capacidad: ___ / ___
- Stress: ___ / ___

## Bugs Encontrados
1. [Descripción del bug]
   - Severidad: Alta/Media/Baja
   - Pasos para reproducir: ...
   - Resultado esperado: ...
   - Resultado actual: ...

## Recomendaciones
- [Mejora sugerida 1]
- [Mejora sugerida 2]

## Conclusión
[Resumen general del estado del sistema]
```

---

## ✅ CHECKLIST FINAL

Antes de dar por completadas las pruebas, verificar:

- [ ] Todas las pruebas automatizadas ejecutadas
- [ ] Coverage de código >80%
- [ ] Todas las pruebas manuales completadas
- [ ] Bugs documentados en GitHub Issues
- [ ] Reporte de pruebas generado
- [ ] Lighthouse audit realizado
- [ ] Core Web Vitals medidos
- [ ] Pruebas en diferentes navegadores (Chrome, Firefox, Edge)
- [ ] Pruebas en diferentes resoluciones (1920×1080, 1366×768, móvil)
- [ ] Base de datos limpiada después de pruebas

---

## 🚀 SIGUIENTE PASO: SOPORTE PDF

Una vez completadas todas las pruebas satisfactoriamente, proceder con:

**Implementación de Soporte PDF Básico** (ver siguiente documento)

---

*Documento generado automáticamente para validación completa del sistema Scriptorium*
*Sin coste adicional - Todas las pruebas se ejecutan localmente o con herramientas gratuitas*
