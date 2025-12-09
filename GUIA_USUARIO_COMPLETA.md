# 📖 GUÍA COMPLETA DE USUARIO - SCRIPTORIUM

## Sistema de Inteligencia Artificial para Análisis de Manuscritos Históricos

---

## 📋 ÍNDICE

1. [Introducción](#introducción)
2. [Primeros Pasos](#primeros-pasos)
3. [Navegación de la Interfaz](#navegación-de-la-interfaz)
4. [Funcionalidades Principales](#funcionalidades-principales)
5. [Sistema de Idiomas y Traducción](#sistema-de-idiomas-y-traducción)
6. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 🎯 INTRODUCCIÓN

**Scriptorium** es una plataforma avanzada de inteligencia artificial diseñada para archiveros, historiadores y paleógrafos. El sistema automatiza el proceso de transcripción, análisis y catalogación de manuscritos históricos, ahorrando tiempo y mejorando la precisión del trabajo archivístico.

### ¿Qué hace Scriptorium?

Scriptorium combina tecnologías de visión por computadora y procesamiento de lenguaje natural para:

- **Transcribir** automáticamente manuscritos antiguos (HTR - Handwritten Text Recognition)
- **Analizar** el contenido y extraer metadatos relevantes
- **Clasificar** documentos según tipología documental
- **Detectar** relaciones entre documentos
- **Traducir** textos históricos a lenguaje moderno

---

## 🚀 PRIMEROS PASOS

### 1. Inicio de Sesión

Al acceder a Scriptorium, se te pedirá que inicies sesión:

- **Registro**: Si es tu primera vez, haz clic en "Registrarse" e ingresa:
  - Nombre completo
  - Correo electrónico
  - Contraseña segura

- **Inicio de sesión**: Si ya tienes cuenta, ingresa tu correo y contraseña

### 2. Panel Principal (Tablero)

Después de iniciar sesión, llegarás al **Tablero**, donde verás:

- **Estadísticas rápidas**: Número de documentos procesados
- **Manuscritos recientes**: Últimos documentos trabajados
- **Botón "Nueva Transcripción"**: Para comenzar a trabajar con un documento

---

## 🧭 NAVEGACIÓN DE LA INTERFAZ

La aplicación tiene una barra lateral (sidebar) con las siguientes secciones:

### 📊 **Tablero** (Dashboard)
Vista general de tu trabajo y acceso rápido a documentos recientes.

### 🔬 **Mesa de Trabajo** (Transcriber)
Espacio principal donde:
- Cargas imágenes de manuscritos
- Realizas transcripciones automáticas
- Analizas el contenido
- Visualizas resultados

### 📚 **Archivos** (Library)
Biblioteca de todos tus manuscritos procesados:
- Vista en cuadrícula con miniaturas
- Información resumida de cada documento
- Acceso rápido para editar o revisar

### 📘 **Manual de Usuario**
Guía interactiva con instrucciones y consejos.

### ⚙️ **Configuración**
Ajustes de la aplicación (en desarrollo).

### 👤 **Usuario**
- Ver información de tu perfil
- Cerrar sesión

---

## 🛠️ FUNCIONALIDADES PRINCIPALES

## 1️⃣ TRANSCRIPCIÓN AUTOMÁTICA DE MANUSCRITOS (HTR)

### ¿Qué es?
La transcripción automática convierte el texto escrito a mano en un manuscrito digitalizado en texto editable, usando inteligencia artificial entrenada en escrituras históricas.

### Cómo usarla:

1. **Ve a "Mesa de Trabajo"**
2. **Carga un manuscrito**:
   - Haz clic en el botón "Cargar (Q1)" o en el área central
   - Selecciona una imagen (JPG, PNG, etc.)
   - La imagen aparecerá en el visor

3. **Haz clic en "Transcribir & Analizar"**
   - El sistema procesará la imagen (esto puede tomar 10-30 segundos)
   - La transcripción aparecerá en la pestaña "Texto"

### Consejos:
- ✅ Usa imágenes de buena calidad (mínimo 300 DPI)
- ✅ Asegúrate de que el manuscrito esté bien iluminado
- ✅ Evita imágenes borrosas o con reflejos

---

## 2️⃣ VACIADO DOCUMENTAL AUTOMÁTICO

### ¿Qué es?
Extracción automática de información estructurada del texto transcrito:
- **Personas** mencionadas
- **Lugares** geográficos
- **Fechas** y eventos
- **Organizaciones**

### Cómo funciona:

Después de la transcripción automática, el sistema:
1. Lee el texto transcrito
2. Identifica entidades nombradas (NER - Named Entity Recognition)
3. Las clasifica por tipo (persona, lugar, fecha, etc.)
4. Las muestra en la pestaña **"Geografía"**

### Dónde verlo:
- **Pestaña "Geografía"**: Lista de entidades detectadas
  - **Personas**: con icono naranja
  - **Organizaciones**: con icono marrón
  - **Lugares**: con información geográfica

---

## 3️⃣ BÚSQUEDA INTELIGENTE (Búsqueda Semántica)

### ¿Qué es?
Sistema de búsqueda que entiende el **significado** de tu consulta, no solo palabras clave. Usa embeddings vectoriales para encontrar documentos relacionados semánticamente.

### Cómo usarla:

**Actualmente la búsqueda se realiza mediante:**
- Palabras clave en metadatos
- Similitud de contenido
- Análisis de relaciones entre documentos

> **Nota**: La función de búsqueda avanzada con entrada de texto está en desarrollo. Por ahora, puedes ver relaciones sugeridas automáticamente.

---

## 4️⃣ DETECCIÓN DE TIPOLOGÍA DOCUMENTAL

### ¿Qué es?
Clasificación automática del tipo de documento:
- Cartas
- Registros administrativos
- Actas notariales
- Edictos
- Certificados
- Inventarios
- etc.

### Dónde verlo:
- **Pestaña "Diplomática"** → Sección "Tipología (Q4)"
- El resultado incluye una **puntuación de confianza** (0.0 a 1.0)

### Utilidad:
Facilita la catalogación y organización de fondos documentales, agrupando automáticamente documentos similares.

---

## 5️⃣ DETECCIÓN VISUAL (Planos, Fotos, Sellos)

### ¿Qué es?
Análisis de imagen que detecta elementos no textuales:
- **Sellos** (oficiales, lacrados)
- **Mapas** o planos
- **Tablas** o estructuras tabulares
- **Iluminaciones** o decoraciones

### Dónde verlo:
En la parte inferior del visor de imagen aparecerá un cuadro con:
- ✅ "Sello Detectado"
- ✅ "Mapa/Plano"
- ✅ "Estructura Tabular"

### Utilidad:
- Identificar documentos con elementos especiales
- Facilitar la descripción archivística
- Detectar documentos que requieren tratamiento especial

---

## 6️⃣ GENERACIÓN DE METADATOS

### ¿Qué es?
Creación automática de:
- **Título sugerido**: Descriptivo y normalizado
- **Resumen**: Síntesis del contenido (2-3 líneas)
- **Palabras clave**: Términos relevantes para búsqueda

### Dónde verlo:
**Pestaña "Diplomática"** → Sección "Metadatos (Q6)"

### Cómo se usan:
- Al guardar el documento, estos metadatos se indexan
- Facilitan la búsqueda futura
- Pueden editarse manualmente si es necesario

---

## 7️⃣ IDENTIFICACIÓN DE TABLAS E IMÁGENES

### ¿Qué es?
Reconocimiento de estructuras complejas dentro del documento:
- Tablas con filas y columnas
- Listas numeradas
- Gráficos o diagramas

### Estado actual:
- ✅ **Detección**: El sistema identifica si hay tablas
- ⚠️ **Extracción de datos**: En desarrollo

---

## 8️⃣ ORGANIZACIÓN Y CATALOGACIÓN AUTOMATIZADA

### ¿Qué es?
Sugerencia automática de **Serie Documental** para facilitar la catalogación según normas archivísticas (ISAD-G, NODAC, etc.)

### Ejemplos de series:
- "Correspondencia administrativa"
- "Registros de defunciones"
- "Documentación notarial - Escrituras"
- "Expedientes judiciales - Civiles"

### Dónde verlo:
**Pestaña "Diplomática"** → Sección "Serie (Q8)"

---

## 9️⃣ DETECCIÓN DE DUPLICADOS Y VERSIONES

### ¿Qué es?
El sistema compara automáticamente cada documento nuevo con los existentes en tu biblioteca para detectar:
- **Duplicados exactos**: Copias idénticas
- **Versiones**: Borradores vs. versión final
- **Documentos relacionados**: Del mismo expediente

### Cómo funciona:
- Compara los primeros 100 caracteres del texto
- Analiza títulos similares
- Detecta personas y lugares compartidos

### Dónde verlo:
**Pestaña "Relaciones"** → Tarjetas rojas con etiqueta "Posible Duplicado"

---

## 🔟 RELACIONES ENTRE DOCUMENTOS

### ¿Qué es?
Sistema que identifica y sugiere vínculos entre documentos basándose en:
- Personas mencionadas en común
- Misma serie documental
- Lugares compartidos
- Referencias textuales explícitas

### Tipos de relaciones:
1. **Duplicados** (🔴 Rojo): Documentos idénticos o casi idénticos
2. **Mismo expediente** (🟠 Naranja): Documentos del mismo caso/asunto
3. **Relacionados** (🟤 Marrón): Comparten temática o contexto

### Dónde verlo:
**Pestaña "Relaciones"** → Lista de documentos relacionados con porcentaje de similitud

---

## 1️⃣1️⃣ DETECCIÓN DE IDIOMAS Y VARIANTES PALEOGRÁFICAS

### ¿Qué es?
Identificación automática de:
- **Idioma principal** del documento (español, latín, catalán, etc.)
- **Tipo de escritura**: Gótica, humanística, procesal, cortesana, etc.

### Dónde verlo:
**Pestaña "Diplomática"** → Sección "Identificación Paleográfica":
- **Escritura**: Tipo de letra
- **Idioma Detectado**: Con etiqueta de color

### Utilidad:
- Filtrar documentos por idioma
- Identificar documentos que requieren especialistas
- Facilitar estudios paleográficos

---

## 1️⃣2️⃣ ANÁLISIS GEOGRÁFICO AUTOMÁTICO

### ¿Qué es?
Extracción y geolocalización de topónimos (nombres de lugares) mencionados en el texto.

### Información que proporciona:
- **Lugares mencionados**: Con lista completa
- **Tipo de mención**:
  - `origin`: Lugar de origen del documento
  - `destination`: Lugar de destino
  - `mentioned`: Simplemente mencionado

### Dónde verlo:
**Pestaña "Geografía"** → Sección "Geografía Histórica"

### Potencial futuro:
- Visualización en mapa interactivo
- Análisis de rutas históricas
- Estudios de redes geográficas

---

## 1️⃣3️⃣ ANÁLISIS ESTADÍSTICO Y TEMÁTICO

### ¿Qué es?
Herramientas para analizar **conjuntos de documentos** y obtener:
- **Tipologías más frecuentes**
- **Palabras clave principales**
- **Personas más mencionadas**
- **Lugares más recurrentes**
- **Distribución por idiomas**

### Cómo usarlo:
1. Ve al **Tablero**
2. Haz clic en **"Analizar Fondo"**
3. Selecciona los documentos que quieres analizar
4. El sistema generará gráficos y estadísticas

### Utilidad:
- Obtener panorama general de un fondo documental
- Identificar patrones históricos
- Preparar informes de catalogación

---

## 1️⃣4️⃣ ACCESO INCLUSIVO Y MULTILINGÜE (Traducción)

### ¿Qué es?
Traducción automática de textos históricos a **lenguaje moderno y accesible**, facilitando la comprensión para personas sin formación paleográfica.

### Idiomas soportados:
- Español moderno (por defecto)
- Inglés
- Francés
- Alemán
- Italiano
- Portugués

### Cómo usarlo:
1. En la **pestaña "Texto"**, después de transcribir
2. Haz clic en **"Traducir (Q14)"**
3. La traducción aparecerá debajo del texto original
4. Se mantiene el significado pero con lenguaje actual

### Ejemplo:
**Texto original (S. XVII)**:
> "Sepan quantos esta carta de poder vieren como yo, Don Francisco de Quevedo, cavallero de la Orden de Santiago..."

**Traducción moderna**:
> "Que sepan todos los que vean esta carta de poder que yo, Don Francisco de Quevedo, caballero de la Orden de Santiago..."

---

## 1️⃣5️⃣ CURACIÓN AUTOMÁTICA DE COLECCIONES

### ¿Qué es?
Sistema que detecta automáticamente:
- **Errores potenciales** en la transcripción
- **Inconsistencias** en fechas o nombres
- **Daños físicos** en el documento original
- **Alertas de calidad**

### Tipos de alertas:

#### 📄 Alertas de Contenido:
- Fechas anacrónicas (ej: año 1799 en documento de 1700)
- Nombres de lugares irreconocibles
- Texto potencialmente incompleto

#### 🖼️ Alertas de Condición Física:
- Manchas de humedad
- Roturas o rasgaduras
- Texto ilegible o desvanecido
- Quemaduras o daño por insectos

### Dónde verlo:
**Pestaña "Diplomática"** → Sección "Curación y Conservación" (cuadro rojo)

### Utilidad:
- Priorizar documentos que requieren conservación
- Detectar errores antes de publicar
- Mejorar la calidad del catálogo

---

## 🌐 SISTEMA DE IDIOMAS Y TRADUCCIÓN

### Concepto de "Idioma" en Scriptorium

El sistema trabaja con **tres niveles de idioma**:

### 1. **Idioma del Manuscrito Original**
El idioma en que fue escrito el documento histórico:
- Español antiguo (S. XVI-XIX)
- Latín
- Catalán antiguo
- Gallego
- Euskera
- etc.

Este idioma es **detectado automáticamente** durante el análisis.

### 2. **Idioma de la Interfaz**
El idioma en que se muestra la aplicación Scriptorium:
- **Actualmente**: Solo español
- **Futuro**: Inglés, francés, etc.

### 3. **Idioma de Traducción**
El idioma moderno al que quieres traducir el texto histórico:
- Español moderno (predeterminado)
- Inglés moderno
- Francés moderno
- etc.

---

### Flujo del Sistema de Idiomas

```
[Manuscrito en Español S. XVII]
         ↓ (Transcripción HTR)
[Texto transcrito en español antiguo]
         ↓ (Análisis)
[Detección: Idioma = "Español antiguo"]
         ↓ (Traducción)
[Texto en español moderno / inglés / francés...]
```

---

### ¿Cómo afecta el idioma a las funcionalidades?

| Funcionalidad | Afectado por idioma | Explicación |
|---------------|---------------------|-------------|
| **Transcripción** | ✅ Sí | El modelo HTR debe reconocer la escritura del idioma original |
| **Análisis** | ✅ Sí | El análisis diplomático se adapta al idioma detectado |
| **Búsqueda** | ✅ Sí | Las búsquedas consideran sinónimos y variantes del idioma |
| **Traducción** | ✅ Sí | Es la funcionalidad principal de conversión de idioma |
| **Detección visual** | ❌ No | Independiente del idioma textual |
| **Relaciones** | ⚠️ Parcial | Nombres propios ayudan independientemente del idioma |

---

### Casos de Uso del Sistema de Idiomas

#### Caso 1: Documento en latín
1. Subes un manuscrito en latín del S. XVI
2. El sistema lo transcribe
3. **Detección**: Identifica que es latín
4. **Análisis**: Extrae entidades considerando gramática latina
5. **Traducción**: Lo traduce a español moderno
6. **Resultado**: Investigadores hispanohablantes pueden entenderlo

#### Caso 2: Documento en español antiguo
1. Subes una carta del S. XVII en español
2. El sistema la transcribe manteniendo ortografía antigua
3. **Detección**: Español antiguo
4. **Traducción**: Moderniza la ortografía y vocabulario
5. **Ejemplo**:
   - Original: "recebí vuestra carta en que me hazíades saber..."
   - Moderno: "recibí vuestra carta en que me hacíais saber..."

#### Caso 3: Documento multilingüe
1. Documento con partes en español y partes en latín
2. El sistema detecta el idioma **predominante**
3. Sugiere revisión manual en la pestaña "Curación"

---

## ❓ PREGUNTAS FRECUENTES

### ¿Cuánto tiempo tarda en procesar un documento?
- **Transcripción**: 10-30 segundos
- **Análisis**: 5-15 segundos
- **Traducción**: 5-10 segundos

### ¿Puedo editar las transcripciones?
Sí, todas las transcripciones son editables manualmente en la pestaña "Texto".

### ¿Qué formatos de imagen acepta?
JPG, JPEG, PNG, y otros formatos comunes.

### ¿Los datos son privados?
Sí, cada usuario solo ve sus propios documentos. Los administradores no tienen acceso a tus manuscritos.

### ¿Puedo exportar los datos?
Sí, desde el Tablero puedes exportar en formato JSON o CSV.

### ¿Funciona sin conexión a internet?
No, Scriptorium requiere conexión para procesar los documentos con IA.

### ¿Qué precisión tiene la transcripción?
La precisión varía según la calidad del manuscrito:
- **Escrituras claras**: 90-95%
- **Escrituras complejas**: 70-85%
- **Manuscritos dañados**: 50-70%

Se recomienda siempre revisar y editar las transcripciones.

---

## 📞 SOPORTE

Si encuentras problemas o tienes dudas:
- Consulta el **Manual de Usuario** dentro de la aplicación
- Contacta al administrador del sistema
- Revisa la documentación técnica en el repositorio

---

**Scriptorium v1.0**
Sistema de IA para Análisis de Manuscritos Históricos
