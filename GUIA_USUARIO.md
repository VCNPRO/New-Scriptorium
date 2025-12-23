# 📖 GUÍA DE USUARIO DE SCRIPTORIUM

## Índice

1. [Primeros Pasos](#1-primeros-pasos)
2. [Subir y Procesar un Manuscrito](#2-subir-y-procesar-un-manuscrito)
3. [Transcripción Automática](#3-transcripción-automática)
4. [Traducción Multilingüe](#4-traducción-multilingüe)
5. [Análisis Diplomático y Vaciado Documental](#5-análisis-diplomático-y-vaciado-documental)
6. [Búsqueda Inteligente Semántica](#6-búsqueda-inteligente-semántica)
7. [Extracción de Tablas](#7-extracción-de-tablas)
8. [Mapa Interactivo Geográfico](#8-mapa-interactivo-geográfico)
9. [Detección de Duplicados](#9-detección-de-duplicados)
10. [Exportación de Documentos](#10-exportación-de-documentos)
11. [Sistema de Auditoría](#11-sistema-de-auditoría)
12. [Configuración y Seguridad](#12-configuración-y-seguridad)

---

## 1. Primeros Pasos

### Registro e Inicio de Sesión

**Paso 1: Acceder a la aplicación**
- Abrir navegador web
- Ir a: https://www.scriptoriumia.eu/
- La pantalla de bienvenida aparecerá

**Paso 2: Registrarse (primera vez)**
1. Click en el botón **"Registrarse"**
2. Completar el formulario:
   - Nombre completo
   - Email (será tu usuario)
   - Contraseña (mínimo 8 caracteres)
3. Click en **"Crear cuenta"**
4. Recibirás un mensaje de confirmación

**Paso 3: Iniciar sesión**
1. En la pantalla principal, ingresar:
   - Email
   - Contraseña
2. Click en **"Iniciar sesión"**
3. Serás redirigido al **Tablero** (Dashboard)

### Interfaz Principal

Una vez dentro, verás 3 áreas principales:

```
┌─────────────────────────────────────────────────┐
│  SIDEBAR (Izquierda)                            │
│  ├─ 📊 Tablero                                  │
│  ├─ 📄 Mis Manuscritos                          │
│  ├─ ⚙️ Configuración                            │
│  └─ 🚪 Cerrar Sesión                            │
├─────────────────────────────────────────────────┤
│  ÁREA CENTRAL                                   │
│  - Aquí se muestra el contenido activo          │
│  - Tablero, documentos, análisis, etc.          │
├─────────────────────────────────────────────────┤
│  PANEL DERECHO (cuando hay documento abierto)   │
│  - Vista previa de imagen                       │
│  - Herramientas de procesamiento                │
└─────────────────────────────────────────────────┘
```

---

## 2. Subir y Procesar un Manuscrito

### Subir un Documento Nuevo

**Paso 1: Ir a la sección de carga**
1. En el **Sidebar**, click en **"📊 Tablero"**
2. En la parte superior, verás el botón **"+ Nuevo Manuscrito"**
3. Click en **"+ Nuevo Manuscrito"**

**Paso 2: Seleccionar archivo**
1. Se abrirá un cuadro de diálogo de selección de archivos
2. Navegar a la carpeta con tu documento
3. Seleccionar la imagen del manuscrito
   - Formatos soportados: **JPG, PNG, WEBP, HEIC, HEIF**
   - Tamaño máximo: **20 MB**
4. Click en **"Abrir"**

**Paso 3: Configurar metadatos**
1. Aparecerá un formulario con:
   - **Título del manuscrito** (obligatorio)
     - Ejemplo: "Carta comercial de 1845"
   - **Descripción** (opcional)
     - Ejemplo: "Correspondencia entre comerciantes de Barcelona"
   - **Fecha aproximada** (opcional)
     - Ejemplo: "1845"
   - **Tags/Etiquetas** (opcional)
     - Ejemplo: "comercio, siglo XIX, Barcelona"
2. Completar los campos
3. Click en **"Subir Manuscrito"**

**Paso 4: Esperar procesamiento inicial**
- Verás una barra de progreso
- El sistema está:
  1. ⬆️ Subiendo la imagen (5-10 segundos)
  2. 🖼️ Optimizando la imagen
  3. 💾 Guardando en la base de datos
- Cuando termine, verás: **"✅ Manuscrito subido exitosamente"**

**Paso 5: Abrir el documento**
1. El documento aparecerá en tu lista de manuscritos
2. Click en el documento
3. Se abrirá la **Mesa de Trabajo** con el documento cargado

---

## 3. Transcripción Automática

La transcripción automática convierte el texto manuscrito en texto digital editable.

### Realizar Transcripción

**Paso 1: Abrir documento en Mesa de Trabajo**
1. Desde el **Tablero**, click en un manuscrito
2. Se abrirá la vista de **Mesa de Trabajo**
3. A la izquierda verás la imagen del manuscrito
4. A la derecha verás el panel de transcripción

**Paso 2: Iniciar transcripción automática**
1. En el panel derecho, buscar el botón **"📝 Transcribir con IA"**
2. Click en **"📝 Transcribir con IA"**
3. Aparecerá un mensaje: **"Analizando manuscrito..."**

**Paso 3: Esperar el análisis (30-60 segundos)**
El sistema está:
- 🔍 Analizando la imagen con Gemini Vision
- 📖 Reconociendo caracteres manuscritos (HTR)
- 🧠 Interpretando abreviaturas y ligaduras
- ✍️ Generando el texto transcrito

**Paso 4: Revisar la transcripción**
1. El texto transcrito aparecerá en el área de texto
2. Verás un mensaje: **"✅ Transcripción completada"**
3. La transcripción incluye:
   - Texto completo del manuscrito
   - Palabras dudosas marcadas con [?]
   - Respeto a la ortografía original

**Paso 5: Editar si es necesario**
1. El área de texto es **editable**
2. Click en cualquier parte del texto para editarlo
3. Corregir errores o aclarar palabras dudosas
4. El sistema **guarda automáticamente** cada cambio (cada 2 segundos)
5. Verás un indicador: **"💾 Guardando..."** → **"✅ Guardado"**

### Consejos para Mejor Transcripción

**Calidad de imagen óptima:**
- 📸 Resolución mínima: 1200x1600 píxeles
- 💡 Buena iluminación uniforme
- 🎯 Enfoque nítido en el texto
- 📐 Imagen sin rotación excesiva
- 🔆 Buen contraste entre tinta y papel

**Si la transcripción tiene errores:**
1. Verificar que la imagen sea clara
2. Intentar con una imagen de mayor resolución
3. Asegurarse de que el manuscrito esté completo en la imagen
4. Editar manualmente las secciones problemáticas

---

## 4. Traducción Multilingüe

Scriptorium puede traducir manuscritos a 6 idiomas diferentes.

### Traducir un Manuscrito

**Paso 1: Asegurarse de tener transcripción**
- La traducción requiere que el documento esté transcrito primero
- Si no hay transcripción, seguir los pasos de la sección anterior

**Paso 2: Seleccionar idioma de destino**
1. En la **Mesa de Trabajo**, buscar la sección **"Traducción"**
2. Verás un menú desplegable con idiomas:
   - 🇬🇧 Inglés
   - 🇫🇷 Francés
   - 🇩🇪 Alemán
   - 🇮🇹 Italiano
   - 🇵🇹 Portugués
   - 🇨🇦 Catalán
3. Click en el menú y seleccionar el idioma deseado

**Paso 3: Iniciar traducción**
1. Click en el botón **"🌐 Traducir"**
2. Aparecerá un mensaje: **"Traduciendo al [idioma]..."**
3. El proceso toma 20-40 segundos

**Paso 4: Revisar la traducción**
1. La traducción aparecerá debajo de la transcripción original
2. Características de la traducción:
   - ✅ Respeta el contexto histórico
   - ✅ Mantiene términos técnicos cuando es apropiado
   - ✅ Preserva nombres propios
   - ✅ Indica palabras ambiguas con [nota]

**Paso 5: Editar si es necesario**
1. El área de traducción también es editable
2. Puedes ajustar la traducción manualmente
3. Los cambios se guardan automáticamente

### Traducir a Múltiples Idiomas

Si necesitas el documento en varios idiomas:

1. Traducir al primer idioma → Esperar → Guardar
2. Volver a seleccionar otro idioma del menú
3. Click en **"🌐 Traducir"** nuevamente
4. Se generará una nueva traducción

**Nota:** Cada traducción sobrescribe la anterior en la interfaz, pero puedes exportar cada una antes de generar la siguiente.

---

## 5. Análisis Diplomático y Vaciado Documental

El análisis diplomático extrae automáticamente información estructurada del manuscrito.

### Realizar Análisis Diplomático

**Paso 1: Ir a la pestaña de Análisis**
1. Con el documento abierto en **Mesa de Trabajo**
2. En la parte superior, verás pestañas:
   - **Transcripción** | **Análisis** | **Diplomática**
3. Click en la pestaña **"Diplomática"**

**Paso 2: Iniciar análisis**
1. Verás un botón grande: **"🔍 Analizar con IA"**
2. Click en **"🔍 Analizar con IA"**
3. Mensaje de confirmación: **"Analizando documento..."**

**Paso 3: Esperar el análisis (40-90 segundos)**
El sistema está realizando:
- 📋 Detección de tipología documental
- 🗣️ Identificación de idioma
- ✍️ Reconocimiento de tipo de escritura
- 👥 Extracción de personas mencionadas
- 📍 Extracción de lugares
- 📅 Extracción de fechas
- 🔑 Generación de palabras clave
- 📝 Creación de resumen ejecutivo

**Paso 4: Explorar los resultados**

El análisis se organiza en secciones:

#### A) Información General
```
┌─────────────────────────────────────┐
│ 📋 Tipología Documental             │
│ Carta comercial (95% confianza)     │
│                                     │
│ 🗣️ Idioma                           │
│ Español antiguo (98% confianza)     │
│                                     │
│ ✍️ Tipo de Escritura                │
│ Humanística cursiva (92% confianza) │
└─────────────────────────────────────┘
```

#### B) Entidades Extraídas

**Personas:**
- Juan Martínez de Hoz (Remitente) - 95% confianza
- Pedro Sánchez (Destinatario) - 98% confianza
- Carlos III (Mencionado) - 85% confianza

**Lugares:**
- Barcelona (Origen) - 98% confianza
- Madrid (Destino) - 95% confianza
- Valencia (Mencionado) - 80% confianza

**Fechas:**
- 15 de marzo de 1845 (Fecha del documento) - 98% confianza
- 1840 (Fecha mencionada) - 75% confianza

#### C) Análisis de Contenido

**Palabras clave:**
- comercio, seda, transporte, pago, deuda, mercancía

**Resumen:**
```
Carta comercial enviada desde Barcelona a Madrid en marzo de 1845,
en la que Juan Martínez solicita pago de mercancías de seda enviadas
en el año anterior. Menciona dificultades de transporte y solicita
respuesta urgente sobre la deuda pendiente.
```

**Paso 5: Editar información si es necesario**
1. Cada campo tiene un icono de lápiz ✏️ al lado
2. Click en el lápiz para editar
3. Modificar el valor (ej: corregir un nombre)
4. Click fuera del campo o presionar Enter
5. El cambio se guarda automáticamente

### Casos de Uso del Análisis Diplomático

**Para catalogación:**
- Usar la tipología detectada para organizar archivos
- Exportar metadatos para sistemas de gestión documental

**Para investigación:**
- Analizar redes de personas mencionadas
- Estudiar patrones geográficos
- Crear líneas de tiempo con las fechas extraídas

**Para búsqueda:**
- Las entidades extraídas mejoran la búsqueda semántica
- Facilitan encontrar documentos relacionados

---

## 6. Búsqueda Inteligente Semántica

La búsqueda semántica encuentra documentos por significado, no solo por palabras exactas.

### Búsqueda Básica vs. Semántica

**Búsqueda Textual Tradicional:**
- Busca palabras exactas: "comercio de seda"
- Solo encuentra documentos que contengan esas palabras específicas

**Búsqueda Semántica de Scriptorium:**
- Entiende el concepto: "transacciones de tejidos"
- Encuentra documentos sobre comercio de telas, seda, lino, etc.
- Comprende sinónimos y contexto histórico

### Realizar una Búsqueda Semántica

**Paso 1: Ir al Tablero**
1. Click en **"📊 Tablero"** en el sidebar
2. Verás la pantalla principal con tus documentos

**Paso 2: Usar la barra de búsqueda**
1. En la parte superior del tablero, encontrarás:
   ```
   ┌──────────────────────────────────────────────┐
   │ 🔍 Buscar documentos...                      │
   └──────────────────────────────────────────────┘
   ```
2. Click en la barra de búsqueda

**Paso 3: Escribir consulta conceptual**

Ejemplos de búsquedas efectivas:

**Búsquedas por tema:**
- "documentos sobre comercio marítimo"
- "cartas de amor del siglo XVIII"
- "contratos de arrendamiento"
- "testamentos y herencias"

**Búsquedas por contenido:**
- "menciones a la guerra"
- "problemas económicos"
- "relaciones familiares"
- "transacciones financieras"

**Búsquedas por contexto:**
- "documentos de la época colonial"
- "correspondencia entre nobles"
- "registros de propiedades"

**Paso 4: Seleccionar tipo de búsqueda**
Debajo de la barra de búsqueda verás dos opciones:
- ○ **Semántica** (significado) - **← Recomendada**
- ○ **Textual** (exacta)

Mantén seleccionada **"Semántica"**

**Paso 5: Ejecutar búsqueda**
1. Presionar **Enter** o click en el botón **"🔍 Buscar"**
2. Aparecerá: **"Buscando..."**
3. El proceso toma 2-5 segundos

**Paso 6: Interpretar resultados**

Los resultados se muestran ordenados por relevancia:

```
┌─────────────────────────────────────────────┐
│ 🎯 92% relevante                            │
│ Carta comercial de Barcelona (1845)        │
│ "...comercio de sedas y tejidos finos..."  │
│ [Abrir documento]                           │
├─────────────────────────────────────────────┤
│ 🎯 87% relevante                            │
│ Factura de mercancías (1843)               │
│ "...venta de telas importadas de..."       │
│ [Abrir documento]                           │
├─────────────────────────────────────────────┤
│ 🎯 75% relevante                            │
│ Registro de transporte (1844)              │
│ "...envío de materiales textiles..."       │
│ [Abrir documento]                           │
└─────────────────────────────────────────────┘
```

Cada resultado muestra:
- **Porcentaje de relevancia** (0-100%)
  - Verde (>80%): Muy relevante
  - Amarillo (60-80%): Moderadamente relevante
  - Naranja (<60%): Posiblemente relevante
- **Título del documento**
- **Extracto del contenido** relevante
- **Botón para abrir** el documento completo

**Paso 7: Abrir documento relevante**
1. Click en **"Abrir documento"** en cualquier resultado
2. El documento se abrirá en la **Mesa de Trabajo**
3. Puedes leer la transcripción completa y análisis

### Consejos para Búsquedas Efectivas

**✅ Hacer:**
- Usar frases descriptivas: "cartas sobre deudas comerciales"
- Ser específico con el contexto: "documentos notariales del siglo XVII"
- Combinar conceptos: "testamentos con menciones a propiedades rurales"

**❌ Evitar:**
- Palabras sueltas sin contexto: "casa"
- Búsquedas demasiado vagas: "documento"
- Nombres propios solos (mejor usar búsqueda textual para esto)

---

## 7. Extracción de Tablas

Si tu manuscrito contiene tablas de datos, Scriptorium puede extraerlas automáticamente.

### Detectar y Extraer Tablas

**Paso 1: Abrir documento con tabla**
1. Ir a **Mesa de Trabajo** con un documento abierto
2. El documento debe contener alguna tabla visible:
   - Inventarios
   - Listas de precios
   - Registros contables
   - Censos o padrones
   - Tablas de medidas

**Paso 2: Ir a la sección de tablas**
1. En la pestaña **"Diplomática"**
2. Scroll hacia abajo hasta la sección **"📊 Extracción de Tablas"**
3. Verás un área con el icono 📊 y el texto:
   ```
   Extracción de Tablas
   Detecta y extrae datos estructurados de tablas en el documento
   ```

**Paso 3: Iniciar extracción**
1. Click en el botón **"📊 Extraer Tablas con IA"**
2. Mensaje: **"Analizando documento..."**
3. El proceso toma 30-60 segundos

**Paso 4: Ver resultados**

#### Si NO se detectan tablas:
```
┌─────────────────────────────────────┐
│ 📄                                  │
│ No se detectaron tablas en este     │
│ documento                           │
│                                     │
│ [Volver a analizar]                 │
└─────────────────────────────────────┘
```

#### Si SÍ se detectan tablas:

Se mostrarán las tablas extraídas:

```
┌─────────────────────────────────────────────────┐
│ 📊 Tabla 1: Inventario de mercancías            │
│                                                 │
│ 📐 Dimensiones: 5 filas × 3 columnas            │
│ 📋 Tipo: Inventario                             │
│                                                 │
│ ┌────────────┬──────────┬────────────┐         │
│ │ Producto   │ Cantidad │ Precio     │         │
│ ├────────────┼──────────┼────────────┤         │
│ │ Trigo      │ 20 fan.  │ 150 reales │         │
│ │ Cebada     │ 15 fan.  │ 100 reales │         │
│ │ Aceite     │ 30 arr.  │ 200 reales │         │
│ │ Vino       │ 50 arr.  │ 180 reales │         │
│ │ Sal        │ 10 fan.  │ 80 reales  │         │
│ └────────────┴──────────┴────────────┘         │
│                                                 │
│ Notas: Abreviaturas expandidas automáticamente │
│                                                 │
│ [📄 Copiar como CSV] [🔧 Copiar como JSON]     │
└─────────────────────────────────────────────────┘
```

**Paso 5: Exportar datos de la tabla**

Tienes dos opciones de exportación:

#### A) Copiar como CSV
1. Click en **"📄 Copiar como CSV"**
2. Los datos se copian al portapapeles
3. Formato:
   ```csv
   Producto,Cantidad,Precio
   Trigo,20 fan.,150 reales
   Cebada,15 fan.,100 reales
   Aceite,30 arr.,200 reales
   ```
4. Puedes pegar en Excel, Google Sheets, etc.

#### B) Copiar como JSON
1. Click en **"🔧 Copiar como JSON"**
2. Los datos se copian en formato JSON
3. Formato:
   ```json
   {
     "tableNumber": 1,
     "type": "Inventario",
     "rows": 5,
     "columns": 3,
     "headers": ["Producto", "Cantidad", "Precio"],
     "data": [
       ["Trigo", "20 fan.", "150 reales"],
       ["Cebada", "15 fan.", "100 reales"]
     ]
   }
   ```
4. Útil para programadores o análisis avanzado

**Paso 6: Trabajar con múltiples tablas**

Si el documento tiene varias tablas:
- Cada una se mostrará numerada: Tabla 1, Tabla 2, etc.
- Puedes exportar cada tabla independientemente
- Scroll hacia abajo para ver todas las tablas detectadas

### Casos de Uso de Extracción de Tablas

**Análisis económico:**
- Extraer inventarios históricos
- Analizar precios y tendencias
- Crear bases de datos de transacciones

**Demografía histórica:**
- Procesar censos y padrones
- Analizar estructura familiar
- Estudiar oficios y ocupaciones

**Investigación cuantitativa:**
- Convertir datos históricos a formato digital
- Integrar con herramientas de análisis (Excel, R, Python)
- Crear visualizaciones estadísticas

---

## 8. Mapa Interactivo Geográfico

Visualiza lugares mencionados en el manuscrito en un mapa interactivo.

### Ver el Mapa Geográfico

**Paso 1: Tener análisis diplomático**
- El mapa requiere que el documento haya sido analizado
- Si no, ir a la pestaña **"Diplomática"** → **"Analizar con IA"**

**Paso 2: Ir a la sección del mapa**
1. En la pestaña **"Diplomática"**
2. Scroll hacia abajo hasta la sección **"🗺️ Mapa Geográfico"**
3. Si hay lugares con coordenadas, el mapa se mostrará automáticamente

**Paso 3: Entender el mapa**

#### Leyenda de colores:
- 🔴 **Rojo**: Lugar de origen del documento
- 🔵 **Azul**: Lugar de destino
- ⚫ **Gris**: Lugares mencionados en el texto

#### Elementos del mapa:
```
┌─────────────────────────────────────────────┐
│ Filtrar: [Todos ▼] ☑ Mostrar ruta  (3 ubicaciones) │
├─────────────────────────────────────────────┤
│ Leyenda: 🔴 Origen  🔵 Destino  ⚫ Mencionado│
├─────────────────────────────────────────────┤
│                                             │
│           🗺️ MAPA INTERACTIVO               │
│                                             │
│     🔴 Barcelona                            │
│       ·················· (ruta)             │
│                     🔵 Madrid               │
│                                             │
│              ⚫ Valencia                    │
│                                             │
├─────────────────────────────────────────────┤
│ 📍 Barcelona (Origen) - 98%                 │
│ 📍 Madrid (Destino) - 95%                   │
│ 📍 Valencia (Mencionado) - 80%              │
└─────────────────────────────────────────────┘
```

**Paso 4: Interactuar con el mapa**

#### Navegar el mapa:
- **Zoom in/out**: Rueda del mouse o botones +/-
- **Mover vista**: Click y arrastrar
- **Centrar**: Doble click en un marcador

#### Ver información de ubicaciones:
1. Click en cualquier marcador (📍)
2. Aparecerá un popup con:
   ```
   ┌─────────────────────────┐
   │ Barcelona               │
   ├─────────────────────────┤
   │ Tipo: Lugar de origen   │
   │ Confianza: 98%          │
   │ 📍 41.3851°, 2.1734°    │
   └─────────────────────────┘
   ```

#### Filtrar ubicaciones:
1. Usar el selector desplegable **"Filtrar"**
2. Opciones:
   - **Todos los lugares** (muestra todo)
   - **Solo orígenes** (solo marcadores rojos)
   - **Solo destinos** (solo marcadores azules)
   - **Solo mencionados** (solo marcadores grises)
3. El mapa se actualiza automáticamente

#### Mostrar/Ocultar rutas:
1. Si hay origen Y destino, verás una línea punteada conectándolos
2. Usar el checkbox **"☑ Mostrar ruta"** para activar/desactivar
3. La ruta se muestra en color cobre (#B87333)

**Paso 5: Analizar patrones geográficos**

El mapa te ayuda a:
- **Visualizar rutas comerciales**: Ver origen y destino de envíos
- **Identificar redes**: Lugares frecuentemente mencionados juntos
- **Estudiar alcance geográfico**: Área de influencia del documento
- **Contextualizar**: Entender distancias y relaciones espaciales

### Casos de Uso del Mapa

**Historia del comercio:**
- Mapear rutas de mercancías
- Analizar redes comerciales
- Estudiar centros de distribución

**Historia social:**
- Rastrear movimientos de personas
- Estudiar migraciones
- Analizar redes familiares geográficas

**Investigación territorial:**
- Identificar áreas de influencia
- Estudiar límites históricos
- Analizar menciones de lugares

---

## 9. Detección de Duplicados

Scriptorium puede identificar documentos similares o duplicados en tu colección.

### Buscar Duplicados

**Paso 1: Abrir un documento**
1. Ir a **Mesa de Trabajo** con cualquier documento
2. El documento servirá como referencia para encontrar similares

**Paso 2: Ir a la sección de duplicados**
1. En la pestaña **"Análisis"**
2. Buscar la sección **"🔍 Detección de Duplicados"**
3. Verás un botón: **"Buscar documentos similares"**

**Paso 3: Ejecutar búsqueda**
1. Click en **"Buscar documentos similares"**
2. Mensaje: **"Analizando similitud..."**
3. El proceso toma 5-15 segundos

**Paso 4: Interpretar resultados**

Los resultados muestran documentos ordenados por similitud:

```
┌─────────────────────────────────────────────┐
│ 🎯 95% similar - Posible duplicado          │
│ Carta comercial de Barcelona (1845-b)      │
│ Coincidencias:                              │
│ - Mismo remitente y destinatario           │
│ - Fecha muy próxima (2 días)               │
│ - Contenido 90% idéntico                   │
│ [Ver documento] [Marcar como duplicado]    │
├─────────────────────────────────────────────┤
│ 🎯 78% similar - Versión relacionada        │
│ Respuesta a carta comercial (1845)         │
│ Coincidencias:                              │
│ - Personas mencionadas comunes             │
│ - Tema relacionado (mismo negocio)         │
│ - Misma fecha aproximada                   │
│ [Ver documento]                             │
├─────────────────────────────────────────────┤
│ 🎯 45% similar - Parcialmente relacionado   │
│ Factura de mercancías (1846)               │
│ Coincidencias:                              │
│ - Misma ciudad de origen                   │
│ - Tema similar (comercio)                  │
│ [Ver documento]                             │
└─────────────────────────────────────────────┘
```

**Niveles de similitud:**
- **90-100%**: Duplicado exacto o casi exacto
- **75-89%**: Versión alternativa o borrador
- **50-74%**: Documentos relacionados
- **<50%**: Débilmente relacionados

**Paso 5: Gestionar duplicados**

Para cada resultado puedes:

1. **Ver documento**: Abre el documento similar para comparar
2. **Marcar como duplicado**: Etiqueta el documento como duplicado
3. **Ignorar**: Descartar la sugerencia

### Casos de Uso de Detección de Duplicados

**Limpieza de colecciones:**
- Identificar documentos subidos por error varias veces
- Eliminar copias innecesarias
- Optimizar espacio de almacenamiento

**Estudio de versiones:**
- Comparar borradores con versiones finales
- Analizar evolución de documentos
- Estudiar correcciones y cambios

**Organización archivística:**
- Agrupar documentos relacionados
- Crear series documentales
- Mejorar catalogación

---

## 10. Exportación de Documentos

Exporta tus manuscritos y análisis en múltiples formatos.

### Formatos de Exportación Disponibles

Scriptorium ofrece **8 formatos** diferentes de exportación:

#### Formatos Estándar:
1. **PDF** - Documento portable universal
2. **TXT** - Texto plano simple
3. **JSON** - Datos estructurados (para programadores)
4. **Markdown** - Formato para documentación

#### Formatos de Preservación Archivística (⭐):
5. **PDF/A-2** - Estándar internacional de archivo (ISO 19005-2)
6. **METS/XML** - Metadatos para bibliotecas digitales
7. **Imagen Original** - Alta calidad sin procesar

### Exportar un Documento

**Paso 1: Abrir el documento a exportar**
1. Ir a **Mesa de Trabajo**
2. Abrir el manuscrito que deseas exportar

**Paso 2: Abrir menú de exportación**
1. En la parte superior de la Mesa de Trabajo
2. Buscar el botón **"⬇️ Exportar Manuscrito"**
3. Click en **"⬇️ Exportar Manuscrito"**
4. Se abrirá un menú con todas las opciones

**Paso 3: Seleccionar formato**

El menú se organiza en secciones:

```
┌─────────────────────────────────────────┐
│ FORMATOS ESTÁNDAR                       │
├─────────────────────────────────────────┤
│ 📄 PDF                                  │
│    Documento con imagen y transcripción │
├─────────────────────────────────────────┤
│ 📝 TXT                                  │
│    Solo texto transcrito                │
├─────────────────────────────────────────┤
│ 🔧 JSON                                 │
│    Datos completos en formato técnico   │
├─────────────────────────────────────────┤
│ 📋 Markdown                             │
│    Formato para documentación           │
├─────────────────────────────────────────┤
│ ⭐ PRESERVACIÓN ARCHIVÍSTICA            │
├─────────────────────────────────────────┤
│ 🏛️ PDF/A-2 (ISO 19005-2)               │
│    Estándar de archivo a largo plazo    │
├─────────────────────────────────────────┤
│ 📚 METS/XML                             │
│    Metadatos para bibliotecas digitales │
├─────────────────────────────────────────┤
│ 🖼️ Imagen Original (Alta Calidad)      │
│    Descarga la imagen sin procesar      │
└─────────────────────────────────────────┘
```

**Paso 4: Click en el formato deseado**
1. Elegir el formato según necesidad
2. Click en la opción
3. Mensaje: **"Generando exportación..."**

**Paso 5: Descargar archivo**
1. El archivo se descarga automáticamente
2. Ubicación: Carpeta de Descargas del navegador
3. Nombre del archivo: `[titulo-manuscrito]_[formato].ext`
   - Ejemplo: `Carta_comercial_1845_PDF.pdf`

### Descripción Detallada de Formatos

#### 1. PDF (Estándar)

**Contenido:**
- Imagen del manuscrito original
- Transcripción completa
- Traducción (si existe)
- Metadatos básicos (título, fecha)

**Cuándo usar:**
- Compartir con otras personas
- Presentaciones y publicaciones
- Lectura en cualquier dispositivo
- Archivo general

**Tamaño aproximado:** 500 KB - 3 MB

---

#### 2. TXT (Texto Plano)

**Contenido:**
- Solo la transcripción del manuscrito
- Sin formato
- Codificación UTF-8

**Cuándo usar:**
- Análisis de texto con otras herramientas
- Máxima compatibilidad
- Tamaño mínimo de archivo
- Procesamiento automático

**Tamaño aproximado:** 2-10 KB

---

#### 3. JSON (Datos Estructurados)

**Contenido:**
```json
{
  "title": "Carta comercial de 1845",
  "transcription": "...",
  "translation": "...",
  "analysis": {
    "typology": "Carta comercial",
    "language": "Español",
    "entities": {
      "people": ["Juan Martínez", "Pedro Sánchez"],
      "locations": ["Barcelona", "Madrid"],
      "dates": ["15 de marzo de 1845"]
    }
  }
}
```

**Cuándo usar:**
- Integración con otras aplicaciones
- Desarrollo de software
- Análisis automático
- Bases de datos

**Tamaño aproximado:** 5-50 KB

---

#### 4. Markdown

**Contenido:**
```markdown
# Carta comercial de 1845

## Transcripción
[Texto transcrito...]

## Traducción al Inglés
[Texto traducido...]

## Análisis Diplomático
- **Tipología:** Carta comercial
- **Personas:** Juan Martínez, Pedro Sánchez
```

**Cuándo usar:**
- Documentación técnica
- Publicación en GitHub/GitLab
- Blogs y wikis
- Escritura colaborativa

**Tamaño aproximado:** 3-20 KB

---

#### 5. PDF/A-2 (⭐ Preservación)

**Contenido:**
- Todo el contenido del manuscrito
- Metadatos XMP embebidos (ISO estándar)
- Dublin Core metadata
- Fuentes embebidas
- Certificación de preservación

**Características especiales:**
- ✅ Cumple ISO 19005-2
- ✅ Garantía de lectura a 50+ años
- ✅ Aceptado por archivos nacionales
- ✅ No requiere software específico
- ✅ Metadatos incrustados permanentemente

**Cuándo usar:**
- Archivo institucional oficial
- Cumplimiento de normativas
- Preservación a largo plazo
- Depósito legal
- Repositorios nacionales

**Tamaño aproximado:** 1-5 MB

---

#### 6. METS/XML (⭐ Preservación)

**Contenido:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<mets:mets>
  <mets:dmdSec>
    <dc:title>Carta comercial de 1845</dc:title>
    <dc:creator>Juan Martínez</dc:creator>
    <dc:date>1845-03-15</dc:date>
  </mets:dmdSec>
  <mets:fileSec>
    <!-- Referencias a archivos -->
  </mets:fileSec>
</mets:mets>
```

**Características especiales:**
- ✅ Estándar Library of Congress
- ✅ Compatible con Europeana
- ✅ Compatible con Archive.org
- ✅ Metadatos Dublin Core
- ✅ Estructura jerárquica

**Cuándo usar:**
- Integración con repositorios digitales
- Bibliotecas digitales
- Proyectos de digitalización masiva
- Cumplimiento de estándares internacionales
- Archivo a largo plazo con metadatos ricos

**Tamaño aproximado:** 10-50 KB

---

#### 7. Imagen Original (⭐ Preservación)

**Contenido:**
- Imagen del manuscrito sin procesar
- Sin compresión adicional
- Máxima calidad

**Características:**
- ✅ Calidad original preservada
- ✅ Sin pérdida de información
- ✅ Formato original (JPG/PNG)
- ✅ Equivalente a TIFF archivístico

**Cuándo usar:**
- Backup de máxima calidad
- Procesamiento posterior con otras herramientas
- Impresión de alta calidad
- Archivo maestro

**Tamaño aproximado:** 2-20 MB (según original)

---

### Exportación Masiva

Si necesitas exportar múltiples documentos:

**Opción 1: Exportar uno por uno**
1. Abrir cada documento
2. Exportar en el formato deseado
3. Repetir para cada manuscrito

**Opción 2: Usar la API (para desarrolladores)**
```javascript
// Exportar múltiples documentos
for (const manuscript of manuscripts) {
  await fetch('/api/export/pdf', {
    method: 'POST',
    body: JSON.stringify({ manuscriptId: manuscript.id })
  });
}
```

---

## 11. Sistema de Auditoría

El sistema de auditoría registra todas las acciones realizadas en Scriptorium.

### Ver el Historial de Auditoría

**Paso 1: Ir a Configuración**
1. Click en **"⚙️ Configuración"** en el sidebar
2. Se abrirá la página de configuración

**Paso 2: Ir a la pestaña de Auditoría**
1. En la parte superior verás 4 pestañas:
   - Seguridad | **Auditoría** | Institución | Perfil
2. Click en **"Auditoría"**

**Paso 3: Ver el registro de actividad**

Verás una lista cronológica de todas las acciones:

```
┌─────────────────────────────────────────────┐
│ 📈 Registro de Actividad                    │
├─────────────────────────────────────────────┤
│ ⬆️ SUBIDA DE DOCUMENTO                      │
│ 23/12/2024 10:45:23 | Usuario: tu@email.com │
│ Documento: Carta comercial de 1845          │
│ IP: 192.168.1.100                           │
├─────────────────────────────────────────────┤
│ 📝 TRANSCRIPCIÓN                            │
│ 23/12/2024 10:47:12 | Usuario: tu@email.com │
│ Documento: Carta comercial de 1845          │
│ Resultado: Éxito                            │
├─────────────────────────────────────────────┤
│ 🔍 ANÁLISIS EJECUTADO                       │
│ 23/12/2024 10:50:34 | Usuario: tu@email.com │
│ Documento: Carta comercial de 1845          │
│ Entidades extraídas: 5 personas, 3 lugares  │
├─────────────────────────────────────────────┤
│ ⬇️ EXPORTACIÓN                              │
│ 23/12/2024 11:15:20 | Usuario: tu@email.com │
│ Documento: Carta comercial de 1845          │
│ Formato: PDF/A-2                            │
└─────────────────────────────────────────────┘
```

**Paso 4: Filtrar logs**

Puedes filtrar por:
- **Período de tiempo**: Última hora, último día, última semana, personalizado
- **Tipo de acción**: Subidas, transcripciones, análisis, exportaciones, etc.
- **Documento específico**: Ver historial de un manuscrito concreto

**Paso 5: Ver estadísticas**

En la parte superior de la pestaña Auditoría verás:

```
┌─────────────────────────────────────────────┐
│ 📊 Estadísticas de Uso                      │
├─────────────────────────────────────────────┤
│ Total de acciones: 1,523                    │
│                                             │
│ Documentos subidos: 450                     │
│ Transcripciones: 380                        │
│ Análisis ejecutados: 320                    │
│ Exportaciones: 245                          │
│ Búsquedas: 128                              │
└─────────────────────────────────────────────┘
```

### Eventos Registrados

El sistema registra automáticamente:

**Gestión de documentos:**
- ⬆️ DOCUMENT_UPLOAD - Subida de manuscrito
- 🗑️ DOCUMENT_DELETE - Eliminación de documento
- ⬇️ DOCUMENT_EXPORT - Exportación de archivo

**Procesamiento:**
- 📝 TRANSCRIPTION_EDIT - Transcripción automática
- 🌐 TRANSLATION_CREATE - Generación de traducción
- 🔍 ANALYSIS_RUN - Ejecución de análisis diplomático

**Búsqueda:**
- 🔎 SEARCH_QUERY - Búsqueda semántica o textual
- 🔗 DUPLICATE_CHECK - Detección de duplicados

**Acceso:**
- 🔐 USER_LOGIN - Inicio de sesión
- 🚪 USER_LOGOUT - Cierre de sesión

**Configuración:**
- ⚙️ SETTINGS_CHANGE - Cambio en configuración

### Casos de Uso de Auditoría

**Para instituciones:**
- Cumplir normativas de trazabilidad
- Demostrar cadena de custodia
- Auditorías internas y externas
- Control de acceso a documentos

**Para investigadores:**
- Llevar registro de trabajo realizado
- Documentar proceso de investigación
- Reproducibilidad científica

**Para control de calidad:**
- Verificar procesamiento correcto
- Identificar errores o problemas
- Optimizar flujos de trabajo

---

## 12. Configuración y Seguridad

Personaliza Scriptorium según tus necesidades.

### Acceder a Configuración

**Paso 1: Abrir Configuración**
1. Click en **"⚙️ Configuración"** en el sidebar
2. Se abrirá la página con 4 pestañas

### Pestaña 1: Seguridad

**Contenido:**

#### A) Certificación Digital (Opcional)

```
┌─────────────────────────────────────────────┐
│ 🔐 Certificación Digital                    │
├─────────────────────────────────────────────┤
│ ⚠️ Servicio exclusivo para instituciones    │
│                                             │
│ La firma digital criptográfica garantiza    │
│ la autenticidad de los documentos.          │
│                                             │
│ ☐ Habilitar firma digital para documentos  │
│                                             │
│ Estado: Deshabilitado                       │
└─────────────────────────────────────────────┘
```

**Cómo habilitar:**
1. Marcar el checkbox **"☐ Habilitar firma digital"**
2. Se activa automáticamente
3. Los documentos exportados incluirán firma digital

**Nota:** Esta función está diseñada para instituciones que requieren autenticación criptográfica de documentos.

#### B) Cambiar Contraseña

```
┌─────────────────────────────────────────────┐
│ 🔑 Cambiar Contraseña                       │
├─────────────────────────────────────────────┤
│ Contraseña actual:  [_______________]       │
│ Nueva contraseña:   [_______________]       │
│ Confirmar nueva:    [_______________]       │
│                                             │
│ [Actualizar Contraseña]                     │
└─────────────────────────────────────────────┘
```

**Pasos:**
1. Escribir contraseña actual
2. Escribir nueva contraseña (mínimo 8 caracteres)
3. Confirmar nueva contraseña
4. Click en **"Actualizar Contraseña"**
5. Mensaje de confirmación

---

### Pestaña 2: Auditoría

Ya cubierta en la sección anterior (Sección 11).

---

### Pestaña 3: Institución

**Para usuarios institucionales:**

```
┌─────────────────────────────────────────────┐
│ 🏛️ Información Institucional                │
├─────────────────────────────────────────────┤
│ Nombre de institución:                      │
│ [_________________________________]          │
│                                             │
│ Tipo de institución:                        │
│ [ Archivo histórico ▼]                      │
│   - Archivo histórico                       │
│   - Biblioteca                              │
│   - Museo                                   │
│   - Universidad                             │
│   - Centro de investigación                 │
│                                             │
│ País: [España ▼]                            │
│                                             │
│ Dirección: [_______________________]        │
│                                             │
│ [Guardar información]                       │
└─────────────────────────────────────────────┘
```

**Beneficios de completar:**
- Metadatos institucionales en exportaciones
- Certificación de documentos con sello institucional
- Estadísticas por institución
- Soporte prioritario

---

### Pestaña 4: Perfil

**Información personal:**

```
┌─────────────────────────────────────────────┐
│ 👤 Perfil de Usuario                        │
├─────────────────────────────────────────────┤
│ Nombre completo:                            │
│ [_________________________________]          │
│                                             │
│ Email:                                      │
│ [_________________________________]          │
│ (No editable)                               │
│                                             │
│ Idioma de interfaz:                         │
│ [Español ▼]                                 │
│                                             │
│ Zona horaria:                               │
│ [Europe/Madrid ▼]                           │
│                                             │
│ [Guardar cambios]                           │
└─────────────────────────────────────────────┘
```

---

## Atajos de Teclado

Para mayor productividad:

| Acción | Atajo |
|--------|-------|
| Ir al Tablero | `Ctrl + D` |
| Nuevo manuscrito | `Ctrl + N` |
| Guardar cambios | `Ctrl + S` |
| Buscar | `Ctrl + F` |
| Exportar | `Ctrl + E` |
| Configuración | `Ctrl + ,` |

---

## Solución de Problemas Comunes

### La transcripción tiene muchos errores

**Causas posibles:**
- Imagen de baja calidad
- Mala iluminación en la imagen
- Escritura muy deteriorada

**Soluciones:**
1. Subir imagen de mayor resolución
2. Mejorar contraste de la imagen antes de subir
3. Editar manualmente las secciones problemáticas
4. Dividir documentos largos en secciones

---

### No aparecen resultados en búsqueda semántica

**Causa:** Los documentos no tienen embeddings generados

**Solución:**
1. Los embeddings se generan automáticamente al analizar
2. Si usaste documentos antiguos, asegúrate de haberlos analizado
3. Espera a que el análisis termine antes de buscar

---

### El mapa no muestra ubicaciones

**Causas posibles:**
- El documento no menciona lugares con coordenadas
- El análisis no detectó lugares

**Solución:**
1. Verificar que el análisis diplomático se haya ejecutado
2. Revisar la sección "Entidades > Lugares"
3. Si hay lugares pero sin mapa, el geocoding puede haber fallado
4. Esperar y reintentar el análisis

---

### Las tablas no se detectan

**Causas posibles:**
- El documento no contiene tablas estructuradas
- La tabla es muy compleja o está deteriorada

**Solución:**
1. Verificar visualmente que hay una tabla en la imagen
2. Asegurarse de que la tabla tiene estructura clara (filas/columnas)
3. Probar con imagen de mayor calidad
4. Para tablas muy complejas, considerar extracción manual

---

### Error al exportar

**Causa:** Problema temporal del servidor

**Solución:**
1. Esperar 30 segundos y reintentar
2. Verificar conexión a internet
3. Probar con otro formato de exportación
4. Recargar la página y reintentar

---

## Mejores Prácticas

### Para Obtener Mejores Resultados

**Calidad de imagen:**
✅ Resolución mínima: 1200x1600 píxeles
✅ Formato recomendado: JPG o PNG
✅ Iluminación uniforme sin sombras
✅ Enfoque nítido en todo el documento
✅ Encuadre completo del documento

**Organización:**
✅ Usar títulos descriptivos
✅ Añadir fechas aproximadas
✅ Usar tags consistentes
✅ Realizar análisis completo de cada documento
✅ Exportar copias de respaldo regularmente

**Eficiencia:**
✅ Procesar documentos en lotes
✅ Usar búsqueda semántica para encontrar rápidamente
✅ Revisar logs de auditoría periódicamente
✅ Mantener configuración institucional actualizada

---

## Soporte y Ayuda

**Documentación adicional:**
- `NUEVAS_FUNCIONALIDADES.md` - Documentación técnica completa
- `GUIA_CASOS_DE_USO.md` - Mapeo de casos de uso archivísticos

**Contacto:**
- Para soporte técnico, contactar con el administrador del sistema
- Para reportar bugs: GitHub Issues
- Para sugerencias de mejora: GitHub Discussions

---

**Scriptorium v2.0** - Sistema inteligente de análisis documental
Powered by Google Gemini AI
