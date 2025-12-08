# Informe de Análisis y Hoja de Ruta: New Scriptorium

## 1. Conclusión General

El análisis del código fuente de **New Scriptorium** revela una aplicación extraordinariamente avanzada y bien arquitecturada, que implementa de forma robusta **14 de las 15 funcionalidades solicitadas**. La aplicación utiliza una arquitectura moderna (React, Vercel Serverless Functions) y se apoya de manera intensiva en la **API de Google Gemini** para la mayoría de sus capacidades de inteligencia artificial, y en una base de datos **PostgreSQL con la extensión `pgvector`** para la búsqueda semántica.

En comparación con las funcionalidades descritas, que representan el estándar de oro del sector (similar a lo que se esperaría de `verbadocpro.eu`), **New Scriptorium ya es una herramienta de nivel profesional y altamente competente**.

A continuación se detalla el análisis punto por punto.

---

## 2. Informe Detallado de Funcionalidades

**PREGUNTA 1: ¿Transcripción automática de manuscritos (HTR)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El fichero `api/ai/transcribe.ts` contiene la lógica para enviar una imagen de un documento al modelo `gemini-pro-vision`. El prompt instruye explícitamente al modelo para que realice una "transcripción literal del texto manuscrito".

**PREGUNTA 2: ¿Vaciado documental automático (Extracción de nombres, fechas, lugares y eventos)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El endpoint `api/ai/analyze.ts` toma el texto transcrito y lo envía al modelo Gemini con un prompt que solicita la extracción de "entidades nombradas (personas, organizaciones, lugares), fechas clave y eventos significativos". El modelo debe devolver estos datos en un formato JSON estructurado.

**PREGUNTA 3: ¿Búsqueda inteligente en fondos manuscritos (Búsqueda semántica)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El fichero `api/lib/db.ts` implementa una función `semanticSearch`. Esta función utiliza la extensión `pgvector` de PostgreSQL para calcular la similitud de coseno entre los vectores de una consulta y los vectores de los documentos almacenados en la base de datos, permitiendo una búsqueda por significado en lugar de por palabras clave exactas.

**PREGUNTA 4: ¿Detección automática de tipología documental (Clasificación por tipo)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El endpoint `api/ai/analyze.ts` instruye al modelo para que determine la "tipología del documento (ej: carta, informe notarial, registro parroquial, etc.)" como parte de su análisis y lo devuelva en el JSON de respuesta.

**PREGUNTA 5: ¿Localización automática de documentos (Detección de planos, fotos, sellos)?**

*   **Respuesta: Sí.**
*   **Evidencia:** La función de transcripción en `api/ai/transcribe.ts` no solo transcribe texto, sino que también le pide al modelo `gemini-pro-vision` que identifique y localice (con coordenadas) "elementos no textuales como sellos, escudos, mapas o firmas".

**PREGUNTA 6: ¿Generación automática de metadatos (Títulos, resúmenes, palabras clave)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El endpoint `api/ai/analyze.ts` tiene instrucciones claras para que el modelo genere un "título conciso", un "resumen breve (2-3 frases)" y una lista de "palabras clave" basadas en el contenido del documento.

**PREGUNTA 7: ¿Identificación de tablas e imágenes (Reconocimiento de estructuras)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El endpoint `api/ai/transcribe.ts` pide al modelo de visión que identifique la presencia de "tablas o imágenes" y extraiga su contenido o descripción si es posible.

**PREGUNTA 8: ¿Organización y catalogación automatizada (Propuesta automática de series)?**

*   **Respuesta: Sí.**
*   **Evidencia:** La llamada a la API en `api/ai/analyze.ts` solicita al modelo una "propuesta de serie documental" a la que el documento podría pertenecer, ayudando al usuario en la catalogación.

**PREGUNTA 9: ¿Detección de duplicados y versiones (Identifica copias)?**

*   **Respuesta: Sí.**
*   **Evidencia:** La investigación del esquema de la base de datos en `api/lib/db.ts` y la lógica de la aplicación muestran un campo `is_duplicate_of`. El sistema genera un hash para cada documento y, si el hash ya existe, lo marca como duplicado, permitiendo al usuario gestionar diferentes versiones o copias.

**PREGUNTA 10: ¿Relaciones entre documentos (Asocia documentos de mismo expediente)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El prompt en `api/ai/analyze.ts` pide al modelo que identifique "posibles relaciones con otros documentos (ej: 'respuesta a la carta X', 'parte del expediente Y')".

**PREGUNTA 11: ¿Detección de idiomas y variantes paleográficas (Identifica lengua y escritura)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El análisis en `api/ai/analyze.ts` incluye la tarea de identificar el "idioma principal" y "características paleográficas notables (ej: escritura gótica, humanística)".

**PREGUNTA 12: ¿Análisis geográfico automático (Geolocaliza topónimos)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El endpoint `api/ai/analyze.ts` solicita la extracción de topónimos y pide explícitamente "coordenadas geográficas (latitud, longitud) para los lugares mencionados" cuando sea posible.

**PREGUNTA 13: ¿Análisis estadístico y temático (Estudia tendencias)?**

*   **Respuesta: No.**
*   **Evidencia:** Aunque hay menciones a análisis en la documentación, no se encontró ninguna implementación de código para generar gráficos, estadísticas o realizar análisis de tendencias (como *topic modeling*). Las dependencias en `package.json` tampoco incluyen librerías para la visualización de datos (como Chart.js, D3.js) o para análisis estadístico.

**PREGUNTA 14: ¿Acceso inclusivo y multilingüe (Traducciones automáticas)?**

*   **Respuesta: Sí.**
*   **Evidencia:** Existe un endpoint dedicado `api/ai/translate.ts` que utiliza el modelo Gemini para traducir el texto de un documento a un idioma de destino solicitado por el usuario.

**PREGUNTA 15: ¿Curación automática de colecciones digitales (Detección de errores)?**

*   **Respuesta: Sí.**
*   **Evidencia:** El prompt de `api/ai/analyze.ts` contiene una sección de "control de calidad" donde se le pide al modelo que detecte "posibles errores de transcripción o inconsistencias en los datos" y los reporte.

---

## 3. Hoja de Ruta para Futuro Desarrollo

La única funcionalidad no implementada es el **Análisis estadístico y temático**. Esta capacidad añadiría un gran valor al permitir a los usuarios visualizar tendencias y patrones en sus colecciones.

### Fase 1: Backend - Agregación de Datos

1.  **Crear un nuevo Endpoint `api/ai/statistics.ts`:**
    *   Este endpoint recibirá un conjunto de IDs de documentos o un ID de colección como entrada.
    *   Consultará la base de datos para obtener los metadatos (fechas, entidades, temas, etc.) de los documentos solicitados.
    *   Agregará los datos para crear estadísticas: frecuencia de nombres, distribución de fechas, temas más comunes, etc.
    *   **Tecnología:** Node.js en un Vercel Serverless Function.

### Fase 2: Frontend - Visualización de Datos

1.  **Integrar una Librería de Gráficos:**
    *   Añadir una librería como `Chart.js` o `Recharts` al proyecto React.
    *   **Comando:** `npm install chart.js react-chartjs-2`
2.  **Crear un Componente de Dashboard:**
    *   Desarrollar un nuevo componente `components/Dashboard/StatisticalAnalysis.tsx`.
    *   Este componente llamará al nuevo endpoint `api/ai/statistics`.
    .   Utilizará los datos recibidos para renderizar varios tipos de gráficos:
        *   **Línea de tiempo:** Distribución de documentos por año/década.
        *   **Gráfico de barras:** Frecuencia de las 5 entidades (personas/lugares) más mencionadas.
        *   **Gráfico de tarta o nube de tags:** Temas o palabras clave más frecuentes.
3.  **Añadir la Vista en la Interfaz:**
    *   Integrar el nuevo componente en una nueva página o en una vista modal accesible desde la vista de la colección de documentos.

### (Opcional) Fase 3: Análisis Temático Avanzado (Topic Modeling)

*   Para un análisis más profundo, se podría utilizar el endpoint de análisis (`analyze.ts`) de forma agrupada. Se enviarían los textos de múltiples documentos a Gemini con un prompt diseñado para identificar "temas o clústeres temáticos recurrentes en este corpus de textos", proporcionando una visión más abstracta de los contenidos de la colección.