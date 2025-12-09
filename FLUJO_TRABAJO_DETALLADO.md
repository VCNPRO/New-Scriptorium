# 🔄 FLUJO DE TRABAJO DETALLADO - SCRIPTORIUM

## Guía Paso a Paso por Proceso y Funcionalidad

---

## 📑 ÍNDICE DE FLUJOS

1. [Flujo Completo: Procesar un Nuevo Manuscrito](#flujo-1-procesar-un-nuevo-manuscrito)
2. [Flujo: Transcripción Manual sin IA](#flujo-2-transcripción-manual-sin-ia)
3. [Flujo: Revisar y Editar Manuscrito Existente](#flujo-3-revisar-y-editar-manuscrito-existente)
4. [Flujo: Análisis Estadístico de Múltiples Documentos](#flujo-4-análisis-estadístico-de-múltiples-documentos)
5. [Flujo: Exportar Datos](#flujo-5-exportar-datos)
6. [Flujo: Gestión de Relaciones entre Documentos](#flujo-6-gestión-de-relaciones-entre-documentos)
7. [Flujo: Traducción de Documentos](#flujo-7-traducción-de-documentos)
8. [Flujo: Curación y Control de Calidad](#flujo-8-curación-y-control-de-calidad)

---

## FLUJO 1: Procesar un Nuevo Manuscrito

### 🎯 Objetivo
Transcribir, analizar y catalogar completamente un manuscrito histórico desde cero.

### ⏱️ Tiempo estimado
5-10 minutos por documento (dependiendo de la complejidad)

---

### PASO 1: Preparación del Documento

#### Antes de empezar:
✅ **Verifica la calidad de la imagen**:
- Resolución mínima: 300 DPI
- Formato recomendado: JPG o PNG
- Iluminación uniforme
- Sin reflejos o sombras excesivas
- Manuscrito completo visible

✅ **Organiza tu espacio de trabajo**:
- Asegúrate de tener buena conexión a internet
- Prepara cualquier información contextual del documento

---

### PASO 2: Acceso a la Mesa de Trabajo

1. **Inicia sesión** en Scriptorium
2. Desde el Tablero, haz clic en **"Nueva Transcripción"**
   - O ve al menú lateral → **"Mesa de Trabajo"**

**Resultado**: Llegarás a una vista dividida con:
- Izquierda: Visor de imagen
- Derecha: Panel de análisis con 4 pestañas

---

### PASO 3: Cargar la Imagen

#### Opción A: Botón de carga
1. Haz clic en **"Cargar (Q1)"** (botón superior derecho)
2. Selecciona el archivo de tu computadora
3. Haz clic en **"Abrir"**

#### Opción B: Área de arrastre
1. Haz clic directamente en el área central vacía
2. Selecciona el archivo

**Resultado**: La imagen aparecerá en el visor de la izquierda

---

### PASO 4: Navegación de la Imagen (Opcional)

Ahora puedes examinar la imagen antes de procesarla:

#### Controles de zoom y navegación:
| Acción | Método |
|--------|--------|
| **Zoom In** | Botón ➕ o Ctrl + Rueda del ratón (arriba) |
| **Zoom Out** | Botón ➖ o Ctrl + Rueda del ratón (abajo) |
| **Mover imagen** | Clic y arrastra |
| **Restablecer vista** | Botón 🔄 Reset |

**Indicador**: En la esquina superior izquierda verás:
```
100% | 0, 0
```
- Porcentaje de zoom
- Posición X, Y

---

### PASO 5: Transcripción Automática

1. Haz clic en el botón **"Transcribir & Analizar"**
2. Aparecerá un spinner de carga ⚙️
3. Espera entre 10-30 segundos

#### ¿Qué hace el sistema internamente?
```
1. Envía imagen al servidor
2. Preprocesa imagen (mejora contraste, elimina ruido)
3. Ejecuta modelo HTR (Handwritten Text Recognition)
4. Ejecuta análisis visual (detecta sellos, mapas, tablas)
5. Retorna transcripción + análisis visual
```

**Resultado**:
- La transcripción aparecerá en **Pestaña "Texto"**
- Si hay elementos visuales detectados, verás alertas debajo de la imagen

---

### PASO 6: Revisión de la Transcripción

1. **Lee la transcripción** en la pestaña "Texto"
2. **Edita cualquier error**:
   - Haz clic en el cuadro de texto
   - Corrige directamente
   - El texto es totalmente editable

#### Errores comunes de HTR:
| Error típico | Corrección |
|-------------|------------|
| "vna" | "una" |
| "q" | "que" |
| "xptiano" | "cristiano" |
| Números mal interpretados | Verifica fechas especialmente |

💡 **Tip**: Mantén el estilo original del documento (no modernices todavía)

---

### PASO 7: Análisis Diplomático

1. Haz clic en **"Análisis Diplomático"** (botón superior derecho)
2. Espera 5-15 segundos
3. El sistema automáticamente:
   - Cambia a la pestaña "Diplomática"
   - Muestra todos los metadatos extraídos

**Resultado**: Verás un panel completo con:

#### Sección A: Datos Básicos
```
┌─────────────────────────────────────┐
│ Tipología: Carta administrativa     │
│ Serie: Correspondencia municipal    │
└─────────────────────────────────────┘
```

#### Sección B: Metadatos
- **Título sugerido**: "Carta del cabildo sobre..."
- **Resumen**: Breve descripción del contenido
- **Palabras clave**: #cabildo #impuestos #1745

#### Sección C: Identificación Paleográfica
- **Escritura**: Humanística del S. XVIII
- **Idioma**: Español antiguo

#### Sección D: Curación (si aplica)
Alertas de calidad o condiciones físicas del documento

---

### PASO 8: Explorar Entidades (Geografía)

1. Haz clic en la pestaña **"Geografía"**
2. Revisa la información extraída:

#### Geografía Histórica:
```
📍 Madrid - Type: origin
📍 Sevilla - Type: destination
📍 Toledo - Type: mentioned
```

#### Entidades:
```
👤 Personas:
   - Don Juan de Guzmán
   - Fray Antonio López

🏛️ Organizaciones:
   - Cabildo Municipal de Sevilla
   - Real Audiencia
```

---

### PASO 9: Revisar Relaciones

1. Haz clic en la pestaña **"Relaciones"**
2. El sistema muestra documentos relacionados de tu biblioteca:

#### Tipos de relación que verás:

**🔴 Posible Duplicado** (tarjeta roja):
```
┌──────────────────────────────────────┐
│ [Imagen miniatura]                   │
│ Título del documento similar         │
│ Motivo: Contenido de texto idéntico  │
│ Similitud: 95%                       │
└──────────────────────────────────────┘
```

**🟠 Relacionado** (tarjeta blanca):
```
┌──────────────────────────────────────┐
│ [Imagen miniatura]                   │
│ Otro documento del mismo expediente  │
│ Motivo: Personas compartidas...      │
│ Similitud: 45%                       │
└──────────────────────────────────────┘
```

💡 **Acciones**:
- Haz clic en cualquier tarjeta para abrir ese documento
- Verifica si realmente son duplicados
- Si es un duplicado real, considera eliminarlo o marcarlo

---

### PASO 10: Traducción a Lenguaje Moderno (Opcional)

1. Vuelve a la pestaña **"Texto"**
2. Haz clic en **"Traducir (Q14)"**
3. Espera 5-10 segundos

**Resultado**: Debajo de la transcripción original aparecerá:

```
┌─────────────────────────────────────────┐
│ Traducción Accesible (Q14)              │
├─────────────────────────────────────────┤
│ [Texto modernizado y más legible]      │
│                                          │
│ Ejemplo:                                 │
│ "Sepan quantos..." → "Que sepan todos..."│
└─────────────────────────────────────────┘
```

---

### PASO 11: Guardar el Documento

1. Haz clic en **"Guardar"** (botón superior derecho)

**Resultado**: El sistema automáticamente:
- Genera un ID único para el documento
- Guarda la imagen
- Guarda transcripción y análisis
- Indexa para búsquedas futuras
- Calcula relaciones con otros documentos
- Vuelve al Tablero

#### Datos guardados:
```json
{
  "id": "1701234567890",
  "title": "Carta del cabildo sobre impuestos - 1745",
  "imageUrl": "[base64 de la imagen]",
  "transcription": "[texto transcrito]",
  "translation": "[traducción moderna]",
  "analysis": {
    "typology": "Carta administrativa",
    "keywords": ["cabildo", "impuestos", "1745"],
    "entities": {...},
    "summary": "..."
  },
  "visualAnalysis": {
    "hasSeals": true,
    "hasMaps": false,
    "hasTables": false,
    "physicalCondition": "Mancha de humedad en esquina superior"
  },
  "calculatedRelations": [...]
}
```

---

### PASO 12: Verificar en el Tablero

1. Ve al **Tablero**
2. Verás tu documento en la lista de "Manuscritos Recientes"

#### Desde aquí puedes:
- ✅ Ver la miniatura
- ✅ Ver título y resumen
- ✅ Haz clic para editarlo nuevamente
- ✅ Exportar datos
- ✅ Eliminarlo si es necesario

---

## FLUJO 2: Transcripción Manual sin IA

### 🎯 Objetivo
Transcribir un documento sin usar el sistema automático (útil cuando el HTR falla o para documentos muy delicados).

---

### PASO 1: Preparación

1. Ve a **"Mesa de Trabajo"**
2. Carga la imagen del manuscrito
3. **NO** hagas clic en "Transcribir & Analizar"

---

### PASO 2: Transcripción Manual

1. Ve a la pestaña **"Texto"**
2. Haz clic en el área de texto vacía
3. **Escribe manualmente** el contenido del manuscrito:
   - Mira la imagen a la izquierda
   - Transcribe con cuidado
   - Usa `[ilegible]` para partes no legibles
   - Mantén la ortografía original

💡 **Tip**: Usa los controles de zoom para ver detalles

---

### PASO 3: Análisis del Texto

Una vez completada la transcripción manual:

1. Haz clic en **"Análisis Diplomático"**
2. El sistema analizará tu texto transcrito
3. Obtendrás los mismos metadatos que con transcripción automática

---

### PASO 4: Guardar

1. Revisa el análisis
2. Haz clic en **"Guardar"**

---

## FLUJO 3: Revisar y Editar Manuscrito Existente

### 🎯 Objetivo
Modificar o completar información de un documento ya procesado.

---

### PASO 1: Localizar el Documento

#### Opción A: Desde el Tablero
1. Ve al **Tablero**
2. En "Manuscritos Recientes", haz clic en el documento que quieres editar

#### Opción B: Desde Archivos
1. Ve a **"Archivos"** (menú lateral)
2. Busca el documento en la cuadrícula
3. Haz clic en la tarjeta del documento

**Resultado**: Se abrirá la Mesa de Trabajo con todos los datos cargados

---

### PASO 2: Realizar Cambios

Puedes editar:

#### A. Transcripción:
1. Ve a pestaña **"Texto"**
2. Edita directamente
3. Si cambias el texto, haz clic en **"Análisis Diplomático"** de nuevo para actualizar metadatos

#### B. Solo guardar con nueva información:
- Si solo quieres añadir traducción o revisar relaciones
- Haz los cambios necesarios

---

### PASO 3: Guardar Cambios

1. Haz clic en **"Guardar"**
2. El sistema sobrescribirá los datos anteriores

💡 **Nota**: No hay historial de versiones (aún). Guarda con cuidado.

---

## FLUJO 4: Análisis Estadístico de Múltiples Documentos

### 🎯 Objetivo
Obtener estadísticas y tendencias de un conjunto de documentos (un fondo completo, por ejemplo).

---

### PASO 1: Preparar Datos

Asegúrate de tener varios documentos procesados (mínimo 3-5 para resultados significativos).

---

### PASO 2: Iniciar Análisis

1. Ve al **Tablero**
2. Haz clic en **"Analizar Fondo"** (botón destacado)

---

### PASO 3: Seleccionar Documentos

1. Aparecerá un modal con lista de todos tus documentos
2. **Selecciona** los que quieres analizar:
   - Checkboxes al lado de cada documento
   - O botón "Seleccionar todos"

💡 **Tip**: Selecciona documentos relacionados temáticamente para análisis más significativo

---

### PASO 4: Ver Resultados

El sistema generará:

#### A. Estadísticas Numéricas
```
📊 Total de documentos analizados: 47
📅 Rango de fechas: 1650-1750
🌍 Idiomas detectados: Español (42), Latín (5)
```

#### B. Tipologías Más Frecuentes
```
┌──────────────────────────────────┐
│ 📋 Cartas: 25 (53%)             │
│ 📜 Actas: 12 (25%)              │
│ 📄 Registros: 7 (15%)           │
│ 📑 Otros: 3 (7%)                │
└──────────────────────────────────┘
```

#### C. Palabras Clave Principales
```
☁️ Nube de palabras:
   cabildo (45), impuesto (38), rey (34),
   ordenanza (28), Real Audiencia (22)...
```

#### D. Personas Más Mencionadas
```
👥 Top 10:
   1. Don Juan de Guzmán (23 menciones)
   2. Fray Antonio López (18 menciones)
   ...
```

#### E. Lugares Más Recurrentes
```
📍 Top 10:
   1. Sevilla (31 menciones)
   2. Madrid (27 menciones)
   3. Toledo (15 menciones)
   ...
```

---

### PASO 5: Exportar Resultados (Opcional)

1. Haz clic en **"Exportar Estadísticas"** (botón en el modal)
2. Elige formato:
   - **JSON**: Para procesamiento posterior
   - **CSV**: Para análisis en Excel/Google Sheets

---

## FLUJO 5: Exportar Datos

### 🎯 Objetivo
Extraer información de uno o varios documentos para uso externo.

---

### PASO 1: Seleccionar Documentos a Exportar

1. Ve al **Tablero**
2. Haz clic en **"Exportar"** (botón en la barra superior)
3. Selecciona los documentos que quieres exportar

---

### PASO 2: Elegir Formato

#### Opción A: JSON
- **Uso**: Para desarrolladores, integración con otros sistemas
- **Contiene**: Todos los datos estructurados
- **Tamaño**: Puede ser grande (incluye imágenes en base64)

#### Opción B: CSV
- **Uso**: Para análisis en Excel, Google Sheets
- **Contiene**: Datos tabulares (sin imágenes)
- **Columnas**:
  - ID
  - Título
  - Fecha de creación
  - Tipología
  - Serie sugerida
  - Idioma
  - Resumen
  - Personas (separadas por `;`)
  - Lugares (separados por `;`)
  - Palabras clave
  - Transcripción

---

### PASO 3: Descargar

1. Haz clic en **"Descargar"**
2. El archivo se descargará con nombre:
   ```
   export_scriptorium_2024-12-09.json
   export_scriptorium_2024-12-09.csv
   ```

---

### PASO 4: Uso del CSV en Excel

Si descargaste CSV:

1. Abre Excel
2. Archivo → Abrir → Selecciona el CSV
3. Asegúrate de que la codificación sea **UTF-8**
4. Ahora puedes:
   - Filtrar por tipología
   - Ordenar por fecha
   - Hacer gráficos
   - Buscar con Ctrl+F

---

## FLUJO 6: Gestión de Relaciones entre Documentos

### 🎯 Objetivo
Identificar, verificar y gestionar relaciones entre documentos del mismo expediente o fondo.

---

### PASO 1: Ver Relaciones de un Documento

1. Abre cualquier documento en la **Mesa de Trabajo**
2. Ve a la pestaña **"Relaciones"**

**Verás**:
- Lista de documentos relacionados
- Porcentaje de similitud
- Motivo de la relación

---

### PASO 2: Verificar Duplicados

Si ves una tarjeta **roja** con "Posible Duplicado":

1. **Haz clic en la tarjeta** para abrir el documento relacionado (se abre en nueva pestaña)
2. **Compara ambos documentos**:
   - ¿Es el mismo documento escaneado dos veces?
   - ¿Es una copia oficial del original?
   - ¿Son documentos diferentes pero similares?

---

### PASO 3: Acciones según el Caso

#### Si es un duplicado real:
1. Decide cuál versión conservar (mejor calidad de imagen)
2. Ve al **Tablero**
3. Localiza el duplicado
4. Elimínalo (botón de acciones)

#### Si NO es un duplicado:
- No hagas nada
- La información sigue siendo útil para ver documentos relacionados

---

### PASO 4: Explorar Expedientes Virtuales

Si varios documentos están relacionados (mismo expediente):

1. **Desde el documento A**: Ve a "Relaciones"
2. **Haz clic en documento B relacionado**
3. **Desde B**: Ve a "Relaciones" de nuevo
4. **Verás documento C** que tal vez no estaba relacionado con A

**Resultado**: Puedes reconstruir expedientes completos siguiendo la cadena de relaciones.

---

## FLUJO 7: Traducción de Documentos

### 🎯 Objetivo
Obtener versión en lenguaje moderno de un texto histórico.

---

### PASO 1: Transcripción Previa

Asegúrate de que el documento ya tiene transcripción (manual o automática).

---

### PASO 2: Solicitar Traducción

1. Ve a la pestaña **"Texto"**
2. Haz clic en **"Traducir (Q14)"**
3. Espera 5-10 segundos

---

### PASO 3: Revisar Traducción

**Aparecerá debajo**:
```
┌────────────────────────────────────────┐
│ Traducción Accesible (Q14)             │
├────────────────────────────────────────┤
│ [Texto modernizado]                    │
└────────────────────────────────────────┘
```

#### La traducción:
- ✅ Moderniza ortografía (quantos → cuantos)
- ✅ Simplifica vocabulario arcaico
- ✅ Mantiene el significado original
- ✅ NO cambia nombres propios
- ✅ NO añade información extra

---

### PASO 4: Editar si es Necesario

Si la traducción tiene errores:

1. **NO puedes** editar directamente la traducción
2. Debes:
   - Haz clic en **"Actualizar Traducción"**
   - El sistema volverá a traducir
   - O copia la traducción a un documento externo y edítala allí

---

### PASO 5: Guardar

1. Haz clic en **"Guardar"**
2. La traducción se guardará junto con el documento

---

### PASO 6: Uso de la Traducción

**Casos de uso**:
- Publicar en catálogos en línea para público general
- Facilitar investigación a historiadores no paleógrafos
- Enseñanza: mostrar versión original vs. moderna
- Accesibilidad: lectores de pantalla pueden leer la versión moderna

---

## FLUJO 8: Curación y Control de Calidad

### 🎯 Objetivo
Identificar y corregir errores, inconsistencias o problemas de conservación en los documentos.

---

### PASO 1: Revisar Alertas Automáticas

Después del análisis diplomático:

1. Ve a la pestaña **"Diplomática"**
2. Busca la sección **"Curación y Conservación"** (cuadro rojo, si aparece)

---

### PASO 2: Tipos de Alertas

#### A. Alertas de Condición Física

```
⚠️ Estado físico: Mancha de humedad en esquina superior
⚠️ Rotura en el borde inferior del folio
⚠️ Texto parcialmente desvanecido
```

**Acciones**:
1. **Prioriza para conservación**
2. Notifica al personal de restauración
3. Registra en el sistema de gestión documental
4. Considera digitalización de emergencia si es crítico

---

#### B. Alertas de Contenido

```
⚠️ Fecha inconsistente: año 1799 mencionado en contexto de 1700
⚠️ Topónimo no reconocido: "Villafranca del Bierzo" (verificar)
⚠️ Posible texto incompleto: la frase termina abruptamente
```

**Acciones**:
1. **Verifica el original**
2. Si es error de transcripción: corrige
3. Si es error del documento original: déjalo pero anótalo
4. Si es topónimo antiguo: investiga y añade nota

---

### PASO 3: Revisión Manual de Transcripción

Incluso sin alertas, es buena práctica:

1. **Lee la transcripción completa**
2. **Compara con la imagen original** (usa zoom)
3. **Enfócate en**:
   - Números y fechas (error común)
   - Nombres propios
   - Palabras clave del documento

---

### PASO 4: Documentar Cambios

Si haces correcciones importantes:

1. **Anota en un documento externo**:
   ```
   Documento: [ID]
   Fecha de revisión: 2024-12-09
   Correcciones:
   - Línea 5: "1780" corregido a "1788"
   - Línea 12: "Juan" corregido a "Juana"
   Nota: Sello en esquina inferior derecha pertenece a...
   ```

2. **Guarda los cambios** en Scriptorium

---

### PASO 5: Marcado para Revisión Experta

Si encuentras algo que requiere conocimiento especializado:

1. **Exporta el documento**
2. **Envíalo a un paleógrafo experto** con nota:
   ```
   "Necesito verificación de la línea 8: la escritura es
   inusual para el período. ¿Podría ser una firma autógrafa?"
   ```

---

## 📊 RESUMEN DE BOTONES Y ACCIONES

| Botón | Ubicación | Acción |
|-------|-----------|--------|
| **Nueva Transcripción** | Tablero | Abre Mesa de Trabajo vacía |
| **Cargar (Q1)** | Mesa de Trabajo | Selecciona imagen para cargar |
| **Transcribir & Analizar** | Mesa de Trabajo | Inicia HTR + análisis visual |
| **Análisis Diplomático** | Mesa de Trabajo | Analiza texto transcrito |
| **Traducir (Q14)** | Pestaña Texto | Traduce a lenguaje moderno |
| **Guardar** | Mesa de Trabajo | Guarda documento completo |
| **Analizar Fondo** | Tablero | Análisis estadístico de múltiples documentos |
| **Exportar** | Tablero | Exporta datos en JSON/CSV |
| **Zoom +/-** | Visor de imagen | Ampliar/reducir imagen |
| **Reset Vista** | Visor de imagen | Restablece zoom y posición |

---

## 🎓 MEJORES PRÁCTICAS

### ✅ DO (Hacer):
1. **Revisa siempre** las transcripciones automáticas
2. **Usa zoom** para verificar detalles
3. **Guarda frecuentemente** mientras trabajas
4. **Documenta** cambios importantes
5. **Verifica** alertas de curación
6. **Explora** relaciones entre documentos
7. **Exporta** copias de seguridad periódicas

### ❌ DON'T (No hacer):
1. **No asumas** que la IA es 100% precisa
2. **No ignores** alertas rojas de curación
3. **No elimines** duplicados sin verificar
4. **No sobrescribas** datos sin revisar
5. **No dependas** solo de la traducción automática
6. **No trabajes** con imágenes de mala calidad
7. **No olvides** hacer copias de seguridad

---

## 📞 ¿NECESITAS AYUDA?

Si encuentras problemas durante cualquier flujo:

1. Consulta la **Guía de Usuario** en el menú
2. Verifica los **logs de error** (si tienes acceso)
3. Contacta al **administrador** del sistema
4. Revisa la **documentación técnica** en GitHub

---

**Scriptorium v1.0**
Flujos de Trabajo Detallados
