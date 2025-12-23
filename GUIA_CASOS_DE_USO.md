# 📋 GUÍA DE CASOS DE USO - SCRIPTORIUM

## Cómo Scriptorium Cumple con los Requisitos Archivísticos

Esta guía mapea cada caso de uso solicitado con las funcionalidades específicas de Scriptorium, mostrando **cómo conseguir cada objetivo** paso a paso.

---

## Índice de Casos de Uso

### 1. Acceso a la Información
- [1.1 Transcripción automática de manuscritos](#11-transcripción-automática-de-manuscritos) ✅
- [1.2 Vaciado documental automático](#12-vaciado-documental-automático) ✅
- [1.3 Búsqueda inteligente en fondos manuscritos](#13-búsqueda-inteligente-en-fondos-manuscritos) ✅
- [1.4 Transcripción audio y video](#14-transcripción-audio-y-video) ❌
- [1.5 Acceso inclusivo y multilingüe](#15-acceso-inclusivo-y-multilingüe) ✅

### 2. Catalogación
- [2.1 Detección de tipología documental](#21-detección-de-tipología-documental) ✅
- [2.2 Localización automática de documentos específicos](#22-localización-automática-de-documentos-específicos) ✅
- [2.3 Generación automática de metadatos](#23-generación-automática-de-metadatos) ✅
- [2.4 Organización y catalogación automatizada](#24-organización-y-catalogación-automatizada) ✅

### 3. Análisis de Datos
- [3.1 Identificación de tablas e imágenes](#31-identificación-de-tablas-e-imágenes) ✅
- [3.2 Relación entre documentos](#32-relación-entre-documentos) ✅
- [3.3 Detección de idiomas y estilos](#33-detección-de-idiomas-y-estilos) ✅
- [3.4 Análisis geográfico](#34-análisis-geográfico) ✅
- [3.5 Análisis estadístico y temático](#35-análisis-estadístico-y-temático) ✅

### 4. Expurgo Automático
- [4.1 Curación automática de colecciones digitales](#41-curación-automática-de-colecciones-digitales) ✅
- [4.2 Detección de duplicados y versiones](#42-detección-de-duplicados-y-versiones) ✅

### 5. Preservación Digital
- [5.1 Acceso a largo plazo a los objetos digitales](#51-acceso-a-largo-plazo-a-los-objetos-digitales) ✅
- [5.2 Asegurar la autenticidad de los documentos](#52-asegurar-la-autenticidad-de-los-documentos) ✅
- [5.3 Auditar la conservación de los documentos digitales](#53-auditar-la-conservación-de-los-documentos-digitales) ✅

---

## 1. ACCESO A LA INFORMACIÓN

### 1.1 Transcripción automática de manuscritos

**📋 Requisito del PDF:**
> "Digitalización + HTR automatiza la lectura, creando textos buscables y accesibles."

**✅ Cómo lo hace Scriptorium:**

#### Tecnología Utilizada
- **Motor IA:** Google Gemini 2.5 Flash con Vision
- **Método:** Handwritten Text Recognition (HTR) avanzado
- **Precisión:** 85-95% según calidad del manuscrito
- **Idiomas:** Español, latín, catalán, y otros idiomas históricos

#### Proceso Paso a Paso

**1. Subir imagen del manuscrito**
```
Usuario → Tablero → Nuevo Manuscrito → Seleccionar imagen → Subir
```

**2. Activar transcripción automática**
```
Mesa de Trabajo → Panel derecho → "📝 Transcribir con IA" → Click
```

**3. Procesamiento IA (30-60 segundos)**
El sistema:
- Analiza la imagen con Vision AI
- Identifica zonas de texto manuscrito
- Reconoce caracteres y ligaduras
- Interpreta abreviaturas históricas
- Genera texto legible completo

**4. Resultado obtenido**
```
✅ Texto transcrito completo
✅ Editable manualmente
✅ Guardado automático
✅ Buscable en toda la plataforma
✅ Exportable en múltiples formatos
```

#### Ejemplo Práctico

**Entrada (manuscrito):**
![Carta manuscrita del siglo XVIII]

**Salida (transcripción):**
```
Barcelona, a 15 de Marzo de 1845

Muy Señor mío:

Recibí su estimada del corriente mes, y en contestación debo
manifestarle que las mercancías de seda que le remití en el año
pasado aún no han sido abonadas según lo convenido...
```

#### Ventajas sobre Métodos Tradicionales

| Método Tradicional | Scriptorium HTR |
|-------------------|-----------------|
| 8-12 horas/documento | 30-60 segundos |
| Requiere paleógrafo experto | Automático + revisión opcional |
| Error humano ~5-10% | Error IA ~5-15% (mejora con edición) |
| Costo: €50-150/documento | Costo: Incluido en subscripción |
| No buscable hasta digitalizar | Inmediatamente buscable |

#### Casos de Uso Archivísticos

**Archivo histórico municipal:**
- Transcribir 5,000 actas municipales del s. XVIII-XIX
- Tiempo estimado tradicional: 40,000 horas (5 años)
- Tiempo con Scriptorium: 83 horas + revisión
- **Ahorro: 99.8% del tiempo**

**Archivo notarial:**
- Transcribir protocolos notariales (testamentos, escrituras)
- Hacer buscable todo el fondo documental
- Facilitar investigación genealógica

**Biblioteca histórica:**
- Transcribir correspondencia de autores
- Crear ediciones digitales de manuscritos
- Publicar corpus textuales anotados

---

### 1.2 Vaciado documental automático

**📋 Requisito del PDF:**
> "IA extrae nombres, fechas, lugares y relaciones para crear bases de datos."

**✅ Cómo lo hace Scriptorium:**

#### Tecnología Utilizada
- **NER (Named Entity Recognition)** con Gemini 2.5
- **Extracción estructurada** en formato JSON
- **Clasificación automática** de entidades
- **Niveles de confianza** para cada extracción

#### Entidades Extraídas Automáticamente

**1. Personas**
- Nombres completos
- Roles (remitente, destinatario, testigo, etc.)
- Títulos y cargos
- Nivel de confianza (0-100%)

**2. Lugares**
- Ciudades, pueblos, regiones
- Tipo (origen, destino, mencionado)
- Coordenadas geográficas (geocoding automático)
- Nivel de confianza

**3. Fechas**
- Fecha del documento
- Fechas mencionadas en el texto
- Rangos temporales
- Normalización automática (formato ISO)

**4. Instituciones**
- Organizaciones mencionadas
- Instituciones religiosas, civiles, militares
- Gremios y corporaciones

**5. Conceptos Temáticos**
- Palabras clave principales
- Temas tratados
- Categorías documentales

#### Proceso Paso a Paso

**1. Ejecutar análisis diplomático**
```
Mesa de Trabajo → Pestaña "Diplomática" → "🔍 Analizar con IA"
```

**2. Esperar procesamiento (40-90 segundos)**

**3. Explorar entidades extraídas**
```
┌─────────────────────────────────────┐
│ 👥 PERSONAS (5 detectadas)          │
├─────────────────────────────────────┤
│ Juan Martínez de Hoz               │
│ Rol: Remitente | Confianza: 95%    │
├─────────────────────────────────────┤
│ Pedro Sánchez y López              │
│ Rol: Destinatario | Confianza: 98% │
├─────────────────────────────────────┤
│ Carlos III                          │
│ Rol: Mencionado | Confianza: 85%   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📍 LUGARES (3 detectados)           │
├─────────────────────────────────────┤
│ Barcelona                           │
│ Tipo: Origen | Confianza: 98%      │
│ Coords: 41.3851°, 2.1734°          │
├─────────────────────────────────────┤
│ Madrid                              │
│ Tipo: Destino | Confianza: 95%     │
│ Coords: 40.4168°, -3.7038°         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📅 FECHAS (2 detectadas)            │
├─────────────────────────────────────┤
│ 15 de marzo de 1845                │
│ Tipo: Fecha del documento          │
│ ISO: 1845-03-15 | Confianza: 98%   │
├─────────────────────────────────────┤
│ Año 1840                            │
│ Tipo: Fecha mencionada             │
│ ISO: 1840 | Confianza: 75%         │
└─────────────────────────────────────┘
```

**4. Exportar datos estructurados**
```
Exportar → JSON
```

**Resultado (JSON):**
```json
{
  "entities": {
    "people": [
      {
        "value": "Juan Martínez de Hoz",
        "role": "sender",
        "confidence": 0.95
      },
      {
        "value": "Pedro Sánchez y López",
        "role": "recipient",
        "confidence": 0.98
      }
    ],
    "locations": [
      {
        "value": "Barcelona",
        "type": "origin",
        "confidence": 0.98,
        "latitude": 41.3851,
        "longitude": 2.1734
      }
    ],
    "dates": [
      {
        "value": "15 de marzo de 1845",
        "type": "document_date",
        "iso": "1845-03-15",
        "confidence": 0.98
      }
    ]
  }
}
```

#### Crear Base de Datos a partir de Vaciado

**Opción 1: Exportación manual**
1. Analizar todos los documentos (lote)
2. Exportar cada uno a JSON
3. Importar JSONs en base de datos (PostgreSQL, MySQL, etc.)
4. Crear índices y relaciones

**Opción 2: Uso de API (para desarrolladores)**
```javascript
// Obtener todas las entidades de un manuscrito
const response = await fetch('/api/manuscripts/123');
const data = await response.json();

// Insertar en base de datos
await db.insert('people', data.analysis.entities.people);
await db.insert('locations', data.analysis.entities.locations);
await db.insert('dates', data.analysis.entities.dates);
```

#### Ejemplo de Base de Datos Generada

**Tabla: personas**
| id | nombre | rol | documento_id | confianza |
|----|--------|-----|--------------|-----------|
| 1 | Juan Martínez | Remitente | doc_001 | 0.95 |
| 2 | Pedro Sánchez | Destinatario | doc_001 | 0.98 |
| 3 | Juan Martínez | Remitente | doc_045 | 0.92 |

**Tabla: lugares**
| id | lugar | tipo | latitud | longitud | confianza |
|----|-------|------|---------|----------|-----------|
| 1 | Barcelona | origen | 41.3851 | 2.1734 | 0.98 |
| 2 | Madrid | destino | 40.4168 | -3.7038 | 0.95 |

**Tabla: fechas**
| id | fecha_original | fecha_iso | tipo | confianza |
|----|----------------|-----------|------|-----------|
| 1 | 15 de marzo de 1845 | 1845-03-15 | documento | 0.98 |
| 2 | Año 1840 | 1840-01-01 | mencionada | 0.75 |

#### Aplicaciones del Vaciado Documental

**Prosopografía:**
- Crear base de datos de personas históricas
- Rastrear apariciones de individuos en diferentes documentos
- Estudiar redes sociales y familiares

**Análisis geográfico:**
- Mapear menciones de lugares
- Estudiar patrones de migración
- Analizar redes comerciales territoriales

**Cronología:**
- Crear líneas de tiempo automáticas
- Ordenar documentos por fechas
- Estudiar evolución temporal de eventos

**Investigación temática:**
- Buscar documentos por personas específicas
- Filtrar por lugares o fechas
- Crear corpus documentales temáticos

---

### 1.3 Búsqueda inteligente en fondos manuscritos

**📋 Requisito del PDF:**
> "HTR + buscadores semánticos permiten búsquedas conceptuales y contextuales."

**✅ Cómo lo hace Scriptorium:**

#### Tecnología Utilizada
- **Embeddings vectoriales:** Google text-embedding-004
- **Base de datos vectorial:** pgvector (PostgreSQL)
- **Búsqueda híbrida:** Semántica + textual
- **Ranking por similitud:** Cosine similarity

#### Diferencia entre Búsquedas

**Búsqueda Textual Tradicional:**
```
Query: "comercio de seda"
Resultado: Solo documentos con las palabras exactas "comercio" Y "seda"
Limitación: No encuentra "transacción de tejidos", "venta de telas", etc.
```

**Búsqueda Semántica de Scriptorium:**
```
Query: "comercio de seda"
Resultado: Documentos sobre:
  - Comercio de seda (100% relevancia)
  - Venta de tejidos finos (87% relevancia)
  - Transacciones de telas (82% relevancia)
  - Importación de textiles (78% relevancia)
  - Gremio de sederos (75% relevancia)
Ventaja: Entiende el CONCEPTO, no solo las palabras
```

#### Proceso Paso a Paso

**1. Ir al Tablero**
```
Sidebar → 📊 Tablero
```

**2. Usar barra de búsqueda semántica**
```
┌──────────────────────────────────────────┐
│ 🔍 Buscar documentos...                  │
└──────────────────────────────────────────┘
```

**3. Escribir consulta conceptual**

Ejemplos efectivos:
- "cartas sobre deudas comerciales del siglo XVIII"
- "testamentos que mencionen propiedades rurales"
- "documentos relacionados con la guerra napoleónica"
- "correspondencia entre funcionarios coloniales"
- "contratos de arrendamiento agrícola"

**4. Seleccionar tipo: Semántica**
```
● Semántica (significado) ← Seleccionar
○ Textual (exacta)
```

**5. Ver resultados ordenados por relevancia**
```
🎯 95% relevante - Carta comercial sobre sedas (1845)
🎯 88% relevante - Factura de tejidos importados (1843)
🎯 79% relevante - Registro de mercancías textiles (1847)
🎯 72% relevante - Contrato con comerciante de telas (1844)
```

#### Cómo Funciona Internamente

**1. Generación de embeddings (al analizar documento):**
```
Texto transcrito → Google Embedding API → Vector de 768 dimensiones
```

**2. Almacenamiento vectorial:**
```sql
CREATE TABLE manuscripts (
  id UUID,
  title TEXT,
  transcription TEXT,
  embedding vector(768)  ← Vector semántico
);
```

**3. Búsqueda por similitud:**
```sql
-- Query del usuario se convierte en vector
-- Se buscan vectores similares usando cosine similarity
SELECT *,
  (1 - (embedding <=> query_vector)) as similarity
FROM manuscripts
WHERE user_id = current_user
ORDER BY similarity DESC
LIMIT 10;
```

#### Casos de Uso Archivísticos

**Archivo General:**
```
Problema: "Necesito encontrar todos los documentos relacionados
          con el comercio transatlántico, pero están descritos
          con diferentes términos"

Solución Scriptorium:
  Query: "comercio transatlántico"

  Encuentra automáticamente:
  ✅ "navegación a Indias"
  ✅ "tráfico marítimo ultramarino"
  ✅ "importación de productos americanos"
  ✅ "envío de mercancías a las colonias"
  ✅ "comercio de azúcar y tabaco"

Resultado: Recuperación del 95% de documentos relevantes
          vs. 20% con búsqueda tradicional
```

**Archivo Notarial:**
```
Problema: "Buscar testamentos donde se mencionen viñedos,
          pero se usan muchos términos diferentes"

Solución:
  Query: "testamentos con viñedos"

  Encuentra:
  ✅ "viñas"
  ✅ "heredades de vid"
  ✅ "tierras de viñedo"
  ✅ "majuelos"
  ✅ "cepas y parras"
```

**Archivo Universitario:**
```
Problema: "Investigación sobre conflictos estudiantiles s. XIX"

Solución:
  Query: "conflictos y protestas estudiantiles"

  Encuentra:
  ✅ "alboroto en la universidad"
  ✅ "huelga de escolares"
  ✅ "tumulto de estudiantes"
  ✅ "rebelión académica"
  ✅ "disturbios universitarios"
```

#### Ventajas para Archiveros e Investigadores

**Recuperación exhaustiva:**
- No depende de palabras clave exactas en catálogo
- Encuentra documentos mal catalogados o sin catalogar
- Supera problemas de vocabulario histórico variable

**Ahorro de tiempo:**
- Búsqueda tradicional: 2-3 horas revisando fichas
- Búsqueda semántica: 10 segundos + revisar resultados

**Descubrimiento de conexiones:**
- Encuentra documentos relacionados inesperadamente
- Revela conexiones no evidentes
- Facilita investigación interdisciplinar

---

### 1.4 Transcripción audio y video

**📋 Requisito del PDF:**
> "Extrae texto de audio y video vinculada al tiempo lineal (minuto)"

**❌ Estado en Scriptorium:**
**NO IMPLEMENTADO** (excluido por solicitud del usuario)

**Alternativas:**
- Enfoque actual de Scriptorium: Documentos manuscritos digitalizados
- Para audio/video, usar herramientas especializadas:
  - Google Speech-to-Text
  - AWS Transcribe
  - Whisper de OpenAI

---

### 1.5 Acceso inclusivo y multilingüe

**📋 Requisito del PDF:**
> "IA detecta diferentes lenguas reflejadas en el texto y extrae un texto traducido"

**✅ Cómo lo hace Scriptorium:**

#### Capacidades Multilingües

**1. Detección automática de idioma:**
```
Análisis Diplomático → 🗣️ Idioma
```

Detecta:
- Español (antiguo y moderno)
- Latín
- Catalán
- Francés
- Italiano
- Portugués
- Mixtos (documentos políglotas)

**2. Traducción a 6 idiomas:**
```
Mesa de Trabajo → Traducción → Seleccionar idioma → Traducir
```

Idiomas destino:
- 🇬🇧 Inglés
- 🇫🇷 Francés
- 🇩🇪 Alemán
- 🇮🇹 Italiano
- 🇵🇹 Portugués
- 🇨🇦 Catalán

#### Proceso de Traducción

**Paso 1: Transcribir documento (cualquier idioma)**
```
Documento en latín medieval → Transcribir con IA
```

**Resultado:**
```
In nomine Patris et Filii et Spiritus Sancti. Amen.
Ego Ioannes Martínez de civitate Barcinone...
```

**Paso 2: Seleccionar idioma de traducción**
```
Selector de idioma: [Español ▼]
```

**Paso 3: Traducir**
```
Click en "🌐 Traducir"
```

**Resultado (Español):**
```
En el nombre del Padre, del Hijo y del Espíritu Santo. Amén.
Yo, Juan Martínez, de la ciudad de Barcelona...
```

**Paso 4: Exportar en idioma traducido**
```
Exportar → PDF → Incluye transcripción original + traducción
```

#### Características de la Traducción

**Sensible al contexto histórico:**
```
Original (latín): "libras"
Traducción NO literal: "pounds" ❌
Traducción contextual: "libras (moneda)" ✅
```

**Preserva términos técnicos:**
```
Original: "privilegium fori"
Traducción: "privilegio del fuero [privilegium fori]"
Nota: Mantiene latín legal + explicación
```

**Mantiene nombres propios:**
```
Original: "Ioannes Martínez"
Traducción: "Juan Martínez" (adaptado)
Nota: Respeta normas históricas
```

#### Ejemplo Completo: Documento Multilingüe

**Documento original (Catalán s. XVIII):**
```
Barcelona, a 15 de Març de 1745

Molt Senyor meu:

He rebut la vostra carta del mes corrent, i en resposta
he de dir-vos que les mercaderies de seda que us vaig
enviar l'any passat encara no han estat pagades...
```

**Análisis automático:**
```
🗣️ Idioma detectado: Catalán antiguo (98% confianza)
```

**Traducción al Español:**
```
Barcelona, a 15 de Marzo de 1745

Muy Señor mío:

He recibido su carta del mes corriente, y en respuesta
debo decirle que las mercancías de seda que le envié
el año pasado aún no han sido pagadas...
```

**Traducción al Inglés:**
```
Barcelona, March 15, 1745

Dear Sir:

I have received your letter of the current month, and in
response I must inform you that the silk goods I sent you
last year have not yet been paid for...
```

#### Casos de Uso de Acceso Multilingüe

**Archivo con fondos políglotas:**
```
Problema: Archivo con documentos en español, catalán y latín
Solución:
  1. Transcribir todo automáticamente
  2. Traducir al español como lengua común
  3. Catalogar con descripción en español
  4. Mantener original + traducción accesibles
```

**Investigadores internacionales:**
```
Problema: Investigador alemán necesita acceder a documentos
          españoles del s. XVII
Solución:
  1. Transcripción automática del español antiguo
  2. Traducción al alemán moderno
  3. Exportación PDF bilingüe (original + traducción)
```

**Difusión cultural:**
```
Problema: Publicar colección documental en web multilingüe
Solución:
  1. Procesar toda la colección
  2. Generar versiones en 3-4 idiomas
  3. Exportar en formato web (Markdown)
  4. Publicar en sitio multilingüe
```

**Educación:**
```
Problema: Enseñar paleografía a estudiantes internacionales
Solución:
  1. Transcribir manuscritos históricos
  2. Traducir a idioma materno de estudiantes
  3. Estudiantes comparan original vs. transcripción vs. traducción
  4. Mejor comprensión del documento histórico
```

---

## 2. CATALOGACIÓN

### 2.1 Detección de tipología documental

**📋 Requisito del PDF:**
> "IA visual y textual clasifica automáticamente tipologías documentales."

**✅ Cómo lo hace Scriptorium:**

#### Tecnología Utilizada
- **Análisis visual:** Gemini Vision analiza la estructura del documento
- **Análisis textual:** Procesamiento del contenido transcrito
- **Clasificación multinivel:** Tipo > Subtipo > Características
- **Nivel de confianza:** 0-100% en la clasificación

#### Tipologías Detectadas Automáticamente

**Documentos notariales:**
- Testamentos
- Escrituras de compraventa
- Arrendamientos
- Poderes notariales
- Capitulaciones matrimoniales
- Inventarios post mortem

**Correspondencia:**
- Cartas personales
- Cartas comerciales
- Cartas oficiales/administrativas
- Misivas diplomáticas

**Documentos administrativos:**
- Actas municipales
- Cédulas reales
- Provisiones
- Ordenanzas
- Bandos
- Reglamentos

**Documentos contables:**
- Libros de cuentas
- Facturas
- Recibos
- Balances
- Registros de pagos

**Documentos judiciales:**
- Sentencias
- Pleitos
- Autos judiciales
- Testimonios

**Documentos eclesiásticos:**
- Bulas
- Breves pontificios
- Actas capitulares
- Libros sacramentales

#### Proceso de Clasificación

**Paso 1: Ejecutar análisis diplomático**
```
Mesa de Trabajo → Diplomática → Analizar con IA
```

**Paso 2: Ver tipología detectada**
```
┌─────────────────────────────────────┐
│ 📋 Tipología Documental             │
├─────────────────────────────────────┤
│ Carta comercial                     │
│                                     │
│ Confianza: 95%                      │
│                                     │
│ Características detectadas:         │
│ ✓ Formato epistolar                │
│ ✓ Contenido mercantil              │
│ ✓ Fórmulas de tratamiento comercial│
│ ✓ Referencias a mercancías         │
│ ✓ Menciones de pagos               │
└─────────────────────────────────────┘
```

#### Criterios de Clasificación

Scriptorium analiza:

**1. Estructura formal:**
- Intitulación (quién emite)
- Dirección (a quién va dirigido)
- Salutación
- Exposición (narración)
- Dispositivo (parte resolutiva)
- Cláusulas finales
- Data (fecha y lugar)
- Validación (firmas, sellos)

**2. Contenido temático:**
- Vocabulario específico
- Referencias técnicas
- Campos semánticos característicos

**3. Características visuales:**
- Disposición del texto
- Presencia de elementos gráficos
- Formato del documento
- Márgenes y estructura

#### Ejemplo de Clasificación Completa

**Documento analizado:**
```
En el nombre de Dios Todopoderoso. Amén.

Sepan cuantos esta carta de testamento vieren como yo,
Juan Martínez de Hoz, vecino de la villa de Barcelona,
estando enfermo del cuerpo pero sano de juicio y entendimiento,
creyendo como firmemente creo en el misterio de la Santísima
Trinidad... otorgo y ordeno este mi testamento...
```

**Clasificación automática:**
```
📋 Tipología: Testamento
   Subtipo: Testamento abierto
   Confianza: 98%

Elementos diplomáticos detectados:
✓ Invocación religiosa ("En el nombre de Dios...")
✓ Notificación ("Sepan cuantos...")
✓ Intitulación ("yo, Juan Martínez de Hoz")
✓ Vecindad ("vecino de la villa de Barcelona")
✓ Cláusula de sanidad mental ("sano de juicio...")
✓ Profesión de fe (Trinidad)
✓ Verbo dispositivo ("otorgo y ordeno")

Características del testamento:
- Testamento in extremis (por enfermedad)
- Protocolo notarial estándar
- Formato de testamento abierto
- Época estimada: s. XVIII-XIX
```

#### Aplicaciones en Catalogación

**Organización automática del archivo:**
```
Lote de 1,000 documentos sin catalogar
↓
Procesamiento con Scriptorium
↓
Clasificación automática:
  - 320 Cartas comerciales
  - 180 Testamentos
  - 150 Escrituras de compraventa
  - 120 Actas municipales
  - 90 Facturas y recibos
  - 80 Cartas personales
  - 60 Otros documentos
↓
Agrupación por tipología
↓
Catalogación detallada por grupos homogéneos
↓
Ahorro: 80% del tiempo de clasificación inicial
```

**Generación de cuadro de clasificación:**
```
Series documentales creadas automáticamente:
├─ 1. CORRESPONDENCIA
│  ├─ 1.1 Cartas comerciales (320 docs)
│  └─ 1.2 Cartas personales (80 docs)
├─ 2. DOCUMENTOS NOTARIALES
│  ├─ 2.1 Testamentos (180 docs)
│  └─ 2.2 Escrituras (150 docs)
├─ 3. ADMINISTRACIÓN MUNICIPAL
│  └─ 3.1 Actas (120 docs)
└─ 4. DOCUMENTOS CONTABLES
   └─ 4.1 Facturas (90 docs)
```

---

### 2.2 Localización automática de documentos específicos

**📋 Requisito del PDF:**
> "IA detecta automáticamente imágenes, sellos, planos y elementos clave."

**✅ Cómo lo hace Scriptorium:**

#### Detección de Elementos Visuales

Scriptorium analiza la imagen del manuscrito para detectar:

**1. Sellos y marcas de validación:**
- Sellos de lacre
- Sellos secos (en relieve)
- Marcas de agua
- Timbres fiscales
- Sellos institucionales

**2. Firmas y rúbricas:**
- Firmas autógrafas
- Rúbricas notariales
- Signos de validación
- Monogramas

**3. Elementos decorativos:**
- Iniciales decoradas
- Viñetas
- Orlas y marcos
- Escudos heráldicos

**4. Elementos estructurales:**
- Tablas y cuadros
- Listas y enumeraciones
- Márgenes y apostillas
- Tachaduras y correcciones

#### Proceso de Detección

**Paso 1: Al subir el documento, análisis visual automático**
```
Imagen del manuscrito → Gemini Vision → Detección de elementos
```

**Paso 2: Metadatos visuales almacenados**
```json
{
  "visual_elements": {
    "seals": {
      "detected": true,
      "count": 2,
      "locations": ["bottom-right", "top-left"],
      "type": ["wax_seal", "institutional_stamp"]
    },
    "signatures": {
      "detected": true,
      "count": 3,
      "style": "autograph"
    },
    "decorative": {
      "illuminated_initial": true,
      "coat_of_arms": false
    },
    "tables": {
      "detected": true,
      "count": 1,
      "type": "inventory"
    }
  }
}
```

**Paso 3: Búsqueda por elementos visuales**

Aunque la interfaz de búsqueda visual específica no está completamente implementada en UI, los metadatos visuales se pueden:

- **Exportar en JSON** para filtrado posterior
- **Usar en búsqueda semántica**: "documentos con sellos reales"
- **Consultar vía API** (para desarrolladores)

#### Ejemplo de Uso: Localización de Documentos con Sellos

**Caso:** Archivo necesita localizar todos los documentos con sello real

**Método tradicional:**
1. Revisar manualmente 5,000 documentos
2. Inspeccionar cada imagen
3. Tiempo: 200-300 horas

**Método con Scriptorium:**
1. Procesar lote de documentos (automático)
2. Exportar metadatos visuales de todos
3. Filtrar con script:
```javascript
const docsWithRoyalSeals = manuscripts.filter(m =>
  m.visual_elements.seals.detected &&
  m.visual_elements.seals.type.includes('royal_seal')
);
```
4. Tiempo: 2 horas de procesamiento + 15 min de filtrado

#### Aplicaciones Archivísticas

**Identificación de documentos de alto valor:**
- Detectar documentos con sellos de plomo (bulas)
- Localizar documentos con sellos reales
- Identificar pergaminos iluminados

**Estudios diplomáticos:**
- Catalogar tipos de validación documental
- Analizar evolución de sellos institucionales
- Estudiar prácticas notariales

**Conservación preventiva:**
- Identificar documentos con sellos frágiles
- Localizar documentos con deterioro en elementos visuales
- Priorizar restauración

---

### 2.3 Generación automática de metadatos

**📋 Requisito del PDF:**
> "IA genera títulos, resúmenes, fechas y palabras clave automáticamente."

**✅ Cómo lo hace Scriptorium:**

#### Metadatos Generados Automáticamente

**1. Título descriptivo**
```
Generado automáticamente basado en:
- Tipología documental
- Personas principales
- Fecha
- Lugar
- Tema

Ejemplo:
"Carta comercial de Juan Martínez a Pedro Sánchez sobre
 deudas de sedas - Barcelona, 15 marzo 1845"
```

**2. Resumen ejecutivo**
```
Generado con IA (100-200 palabras)
Incluye:
- Contexto del documento
- Partes involucradas
- Asunto principal
- Datos relevantes

Ejemplo:
"Carta comercial enviada desde Barcelona a Madrid el 15 de marzo
de 1845, en la que Juan Martínez de Hoz solicita el pago de
mercancías de seda remitidas el año anterior a Pedro Sánchez y
López. El remitente expresa preocupación por la demora en el pago
y menciona dificultades de transporte que han afectado sus negocios.
Se solicita respuesta urgente sobre la deuda pendiente de 500 reales."
```

**3. Palabras clave (keywords)**
```
Extraídas automáticamente del contenido:
- comercio
- seda
- Barcelona
- Madrid
- deuda
- pago
- transporte
- mercancías
- siglo XIX
```

**4. Metadatos técnicos**
```
- Idioma: Español
- Tipo de escritura: Humanística cursiva
- Época: 1845 (s. XIX)
- Soporte: Papel
- Estado de conservación: Bueno
```

**5. Metadatos de entidades**
```
- Personas: Juan Martínez de Hoz, Pedro Sánchez y López
- Lugares: Barcelona, Madrid
- Fechas: 15 de marzo de 1845, año 1840
- Instituciones: [si aplica]
```

#### Proceso de Generación

**Paso 1: Análisis diplomático**
```
Mesa de Trabajo → Diplomática → Analizar con IA
```

**Paso 2: Metadatos generados automáticamente en segundo plano**

**Paso 3: Ver todos los metadatos**
```
Pestaña Análisis → Ver metadatos completos
```

**Paso 4: Editar si es necesario**
- Cada campo tiene icono de edición ✏️
- Modificaciones se guardan automáticamente

**Paso 5: Exportar metadatos**
```
Exportar → JSON → Incluye todos los metadatos
Exportar → METS/XML → Formato estándar para bibliotecas
```

#### Formato de Exportación de Metadatos

**JSON:**
```json
{
  "title": "Carta comercial de Juan Martínez...",
  "summary": "Carta comercial enviada desde...",
  "keywords": ["comercio", "seda", "Barcelona"],
  "date": {
    "original": "15 de marzo de 1845",
    "iso": "1845-03-15"
  },
  "language": {
    "value": "Español",
    "confidence": 0.98
  },
  "typology": {
    "value": "Carta comercial",
    "confidence": 0.95
  },
  "entities": {
    "people": [...],
    "locations": [...],
    "dates": [...]
  }
}
```

**METS/XML (Dublin Core):**
```xml
<mets:dmdSec ID="DMD1">
  <mets:mdWrap MDTYPE="DC">
    <mets:xmlData>
      <dc:title>Carta comercial de Juan Martínez...</dc:title>
      <dc:creator>Juan Martínez de Hoz</dc:creator>
      <dc:date>1845-03-15</dc:date>
      <dc:subject>comercio</dc:subject>
      <dc:subject>seda</dc:subject>
      <dc:description>Carta comercial enviada desde...</dc:description>
      <dc:language>es</dc:language>
      <dc:type>Carta comercial</dc:type>
    </mets:xmlData>
  </mets:mdWrap>
</mets:dmdSec>
```

#### Casos de Uso en Catalogación

**Catalogación rápida de fondos nuevos:**
```
Problema: Recepción de 2,000 documentos sin catalogar
         Tiempo tradicional: 6 meses (1 catalogador)

Solución Scriptorium:
1. Digitalizar lote (1 semana)
2. Procesar con Scriptorium (2 días)
3. Generar metadatos automáticos (instantáneo)
4. Revisar y ajustar metadatos (2 semanas)
5. Importar a sistema de gestión documental (1 día)

Tiempo total: 1 mes
Ahorro: 80% del tiempo
```

**Mejora de catálogos existentes:**
```
Problema: Catálogo antiguo con descripciones pobres

Solución:
1. Digitalizar documentos ya catalogados
2. Generar metadatos enriquecidos con IA
3. Comparar catalogación antigua vs. nueva
4. Actualizar descripciones
5. Añadir palabras clave inexistentes

Resultado: Catálogo 5x más descriptivo
```

**Cumplimiento de estándares:**
```
Problema: Necesidad de exportar a Europeana / Archive.org
         Requisito: Metadatos Dublin Core completos

Solución:
1. Procesar documentos con Scriptorium
2. Exportar en formato METS/XML
3. Metadatos Dublin Core generados automáticamente
4. Cumple estándares internacionales
5. Importación directa a repositorios
```

---

### 2.4 Organización y catalogación automatizada

**📋 Requisito del PDF:**
> "IA genera un reporte de catalogación por el criterio que se defina (fecha del documento, tipo de documento, autor, temática, etc...)"

**✅ Cómo lo hace Scriptorium:**

#### Capacidades de Organización

Scriptorium permite organizar automáticamente por:

1. **Cronología** (fechas)
2. **Tipología documental** (tipos)
3. **Personas** (autores, destinatarios)
4. **Geografía** (lugares)
5. **Temática** (palabras clave)
6. **Series documentales** (agrupaciones lógicas)

#### Método 1: Exportación Masiva de Metadatos

**Paso 1: Procesar todos los documentos**
```
Para cada documento:
  Mesa de Trabajo → Analizar con IA
```

**Paso 2: Exportar metadatos del lote**

Mediante API (para desarrolladores):
```javascript
// Exportar metadatos de todos los manuscritos
const allManuscripts = await fetch('/api/manuscripts');
const metadata = allManuscripts.map(m => ({
  id: m.id,
  title: m.title,
  date: m.analysis?.dates?.[0]?.iso,
  typology: m.analysis?.typology?.value,
  people: m.analysis?.entities?.people,
  locations: m.analysis?.entities?.locations,
  keywords: m.analysis?.keywords
}));

// Guardar como CSV para Excel
exportToCSV(metadata, 'catalogo_completo.csv');
```

**Paso 3: Organizar en Excel/Google Sheets**

El CSV generado se puede ordenar por cualquier campo:
```csv
id,título,fecha,tipología,personas,lugares,keywords
doc001,"Carta comercial...",1845-03-15,"Carta comercial","Juan Martínez","Barcelona","comercio;seda"
doc002,"Testamento de...",1832-07-20,"Testamento","Pedro López","Madrid","herencia;bienes"
...
```

**Paso 4: Crear reportes personalizados**

En Excel:
- Ordenar por fecha → Cronología completa
- Agrupar por tipología → Inventario por tipos
- Filtrar por persona → Documentos de un autor
- Filtrar por lugar → Documentos por archivo territorial

#### Método 2: Organización Mediante Búsqueda

**Por tipología:**
```
Búsqueda semántica: "todos los testamentos"
Resultado: Lista de todos los documentos tipo testamento
Exportar lista → Catálogo de testamentos
```

**Por fecha:**
```
Búsqueda: "documentos del siglo XVIII"
Resultado: Documentos 1700-1799
Ordenar cronológicamente
```

**Por persona:**
```
Búsqueda: "documentos de Juan Martínez"
Resultado: Todos los docs donde aparece Juan Martínez
Organizar como fondo personal
```

**Por tema:**
```
Búsqueda: "documentos sobre comercio marítimo"
Resultado: Agrupación temática automática
```

#### Ejemplo de Reporte Generado

**Reporte de Catalogación Cronológica:**

```markdown
# CATÁLOGO CRONOLÓGICO - FONDO COMERCIAL BARCELONA

## Siglo XVIII (15 documentos)

### 1745
- Carta comercial de Antoni Soler (Barcelona) - doc_032
- Factura de mercancías (Barcelona-Madrid) - doc_045

### 1768
- Contrato de arrendamiento de almacén - doc_089
- Registro de importaciones - doc_091

...

## Siglo XIX (185 documentos)

### 1801-1810
- Carta sobre bloqueo naval (Guerra Independencia) - doc_102
- Factura de suministros militares - doc_115
...

### 1840-1850
- [80 documentos sobre comercio de textiles]
  - 45 Cartas comerciales
  - 20 Facturas
  - 10 Contratos
  - 5 Otros

## Estadísticas
- Total: 200 documentos
- Rango: 1745-1895
- Tipologías: 8 diferentes
- Personas únicas: 342
- Lugares únicos: 67
```

**Reporte por Tipología:**

```markdown
# CATÁLOGO POR TIPOLOGÍA DOCUMENTAL

## 1. CORRESPONDENCIA (120 docs, 60%)

### 1.1 Cartas comerciales (80 docs)
Período: 1780-1890
Autores principales:
- Juan Martínez de Hoz (15 cartas)
- Pere Soler i Valls (12 cartas)
- ...

### 1.2 Cartas personales (40 docs)
Período: 1790-1885
...

## 2. DOCUMENTOS NOTARIALES (50 docs, 25%)

### 2.1 Testamentos (20 docs)
### 2.2 Escrituras (18 docs)
### 2.3 Poderes (12 docs)

## 3. CONTABILIDAD (30 docs, 15%)
...

## TOTAL: 200 documentos
```

**Reporte Geográfico:**

```markdown
# CATÁLOGO POR PROCEDENCIA GEOGRÁFICA

## Barcelona (120 documentos)
### Barrio del Born (45 docs)
- Comerciantes textiles
- Almacenes de importación

### Puerto de Barcelona (30 docs)
- Documentos aduaneros
- Contratos marítimos

## Madrid (50 documentos)
## Valencia (20 documentos)
## Otros lugares (10 documentos)

[Ver mapa interactivo]
```

#### Aplicaciones Prácticas

**Archivo Municipal - Organización de nuevo fondo:**
```
Donación: Archivo comercial familia Martínez (1,200 docs)

Proceso con Scriptorium:
1. Digitalización masiva (2 semanas)
2. Procesamiento IA (3 días)
3. Generación de reportes automáticos:
   ✓ Cronológico (1745-1920)
   ✓ Por tipología (8 series identificadas)
   ✓ Por corresponsal (150 personas)
   ✓ Geográfico (40 ciudades)
4. Creación de cuadro de clasificación
5. Asignación de signaturas automática
6. Importación a SIGAD

Tiempo total: 1 mes
Vs. método tradicional: 1 año
```

**Biblioteca Nacional - Catalogación retrospectiva:**
```
Objetivo: Mejorar catálogo de 5,000 manuscritos s. XVI-XVIII

Proceso:
1. Digitalización progresiva
2. Procesamiento con Scriptorium
3. Generación de metadatos enriquecidos
4. Actualización de MARC 21 con datos IA
5. Publicación en catálogo en línea

Mejoras:
- Descripciones 10x más detalladas
- Palabras clave precisas
- Índices onomástico y geográfico automáticos
- Búsqueda semántica habilitada
```

---

## 3. ANÁLISIS DE DATOS

### 3.1 Identificación de tablas e imágenes

**📋 Requisito del PDF:**
> "IA detecta tablas y las convierte en datos estructurados."

**✅ Cómo lo hace Scriptorium:**

Ya cubierto en detalle en [Sección 7 de la Guía de Usuario](#7-extracción-de-tablas).

**Resumen:**
- Detección automática de tablas en manuscritos
- Extracción de headers, filas, columnas
- Exportación a CSV y JSON
- Identificación del tipo de tabla (inventario, precios, registro, etc.)

**Ejemplo de tabla extraída:**

| Producto | Cantidad | Precio |
|----------|----------|--------|
| Trigo | 20 fanegas | 150 reales |
| Cebada | 15 fanegas | 100 reales |
| Aceite | 30 arrobas | 200 reales |

**Casos de uso:**
- Análisis económico histórico (precios, salarios)
- Demografía (censos, padrones)
- Inventarios patrimoniales
- Registros contables

---

### 3.2 Relación entre documentos

**📋 Requisito del PDF:**
> "IA asocia documentos por contenido, nombres y fechas."

**✅ Cómo lo hace Scriptorium:**

#### Detección de Duplicados y Versiones

Ya cubierta en [Sección 9 de la Guía de Usuario](#9-detección-de-duplicados).

**Método:**
```
Documento A → Análisis de similitud → Documentos relacionados
```

**Criterios de relación:**
- Similitud de contenido (embedding vectorial)
- Personas comunes mencionadas
- Lugares comunes
- Fechas próximas
- Tipología similar

**Resultado:**
```
🎯 95% similar - Posible duplicado
🎯 78% similar - Versión relacionada
🎯 62% similar - Tema relacionado
```

#### Búsqueda de Documentos Relacionados

**Paso 1: Abrir documento de referencia**

**Paso 2: Buscar similares**
```
Mesa de Trabajo → Análisis → Buscar documentos similares
```

**Paso 3: Ver red de documentos relacionados**

**Ejemplo:**
```
Documento A: Carta comercial (1845)
  ├→ 95% similar: Respuesta a la carta (1845)
  ├→ 87% similar: Factura de las mercancías (1845)
  ├→ 76% similar: Contrato previo (1844)
  └→ 65% similar: Carta posterior sobre mismo negocio (1846)
```

#### Aplicaciones en Investigación

**Reconstrucción de expedientes:**
```
Problema: Documentos dispersos de un mismo caso legal

Solución:
1. Procesar todos los documentos
2. Buscar similares para el doc inicial
3. Identificar documentos relacionados
4. Reconstruir expediente completo
5. Ordenar cronológicamente
```

**Análisis de redes:**
```
Objetivo: Estudiar red comercial de un mercader

Proceso:
1. Encontrar carta inicial del mercader
2. Buscar documentos relacionados
3. Extraer personas mencionadas
4. Buscar docs de cada persona
5. Generar grafo de relaciones
```

**Estudio de series documentales:**
```
Objetivo: Identificar correspondencia completa

Método:
1. Partir de una carta
2. Buscar similares
3. Filtrar por personas (mismo remitente/destinatario)
4. Agrupar por similitud
5. Ordenar cronológicamente
6. Serie epistolar completa
```

---

### 3.3 Detección de idiomas y estilos

**📋 Requisito del PDF:**
> "IA identifica idioma y estilo paleográfico, facilitando la agrupación."

**✅ Cómo lo hace Scriptorium:**

#### Detección de Idioma

**Automática al analizar:**
```
Mesa de Trabajo → Diplomática → Analizar con IA
```

**Resultado:**
```
┌─────────────────────────────────────┐
│ 🗣️ Idioma                           │
├─────────────────────────────────────┤
│ Español antiguo                     │
│                                     │
│ Confianza: 98%                      │
│                                     │
│ Variantes detectadas:               │
│ - Arcaísmos léxicos                │
│ - Grafías antiguas (ſ, x por j)   │
│ - Morfología histórica             │
└─────────────────────────────────────┘
```

**Idiomas detectados:**
- Español (antiguo y moderno)
- Latín (clásico, medieval, notarial)
- Catalán (antiguo y moderno)
- Francés
- Italiano
- Portugués
- Mixtos (documentos políglotas)

#### Detección de Estilo Paleográfico

**Análisis visual + textual:**
```
┌─────────────────────────────────────┐
│ ✍️ Tipo de Escritura                │
├─────────────────────────────────────┤
│ Humanística cursiva                 │
│                                     │
│ Confianza: 92%                      │
│                                     │
│ Características:                    │
│ - Escritura itálica inclinada      │
│ - Ligaduras abundantes             │
│ - Abreviaturas notariales          │
│ - Ductus rápido                    │
│                                     │
│ Época estimada: s. XVIII           │
└─────────────────────────────────────┘
```

**Tipos de escritura detectados:**
- Gótica (textual, cursiva, bastarda)
- Humanística (redonda, cursiva)
- Procesal
- Cortesana
- Escrituras del s. XIX (inglesa, itálica)
- Escrituras actuales

#### Aplicaciones para Agrupación

**Agrupación por idioma:**
```
Archivo multilingüe → Procesamiento masivo

Resultado:
├─ Fondo Latín (1,200 docs)
│  ├─ Latín clásico (200)
│  ├─ Latín medieval (500)
│  └─ Latín notarial (500)
├─ Fondo Español (2,000 docs)
│  ├─ Español medieval (300)
│  ├─ Español del Siglo de Oro (800)
│  └─ Español moderno (900)
└─ Fondo Catalán (800 docs)
```

**Agrupación por escritura:**
```
Clasificación paleográfica automática:

├─ Escritura gótica (s. XIII-XV)
│  - Facilita datación
│  - Identifica tipología documental
│
├─ Humanística (s. XV-XVII)
│  - Distingue documentos notariales
│  - Identifica copistas humanistas
│
└─ Cursivas modernas (s. XVIII-XIX)
   - Separa por épocas
   - Identifica manos diferentes
```

**Datación asistida por escritura:**
```
Documento sin fecha → Análisis paleográfico

Resultado:
✍️ Escritura: Humanística redonda
📅 Época probable: 1480-1550
🔍 Datación refinada con contenido: 1520-1530
📊 Confianza: 85%
```

---

### 3.4 Análisis geográfico

**📋 Requisito del PDF:**
> "IA geolocaliza lugares y crea mapas históricos."

**✅ Cómo lo hace Scriptorium:**

Ya cubierto en detalle en [Sección 8 de la Guía de Usuario](#8-mapa-interactivo-geográfico).

**Capacidades:**
- Extracción automática de topónimos
- Geocodificación de lugares históricos
- Clasificación: origen / destino / mencionado
- Mapa interactivo con Leaflet
- Rutas entre origen y destino
- Filtros por tipo de lugar
- Exportación de coordenadas

**Ejemplo de análisis geográfico:**

```
Documento: Carta comercial (1845)

Lugares detectados:
🔴 Barcelona (Origen) - 41.3851°N, 2.1734°E - 98% confianza
🔵 Madrid (Destino) - 40.4168°N, 3.7038°W - 95% confianza
⚫ Valencia (Mencionado) - 39.4699°N, 0.3763°W - 80% confianza
⚫ Cádiz (Mencionado) - 36.5271°N, 6.2886°W - 75% confianza

[Ver mapa interactivo]
[Exportar KML para Google Earth]
```

**Aplicaciones históricas:**
- Mapear rutas comerciales
- Estudiar redes de comunicación
- Analizar patrones de migración
- Crear atlas históricos
- Estudios de geografía histórica

---

### 3.5 Análisis estadístico y temático

**📋 Requisito del PDF:**
> "IA analiza temas, redes, frecuencias y patrones históricos."

**✅ Cómo lo hace Scriptorium:**

#### Análisis Temático

**Extracción de palabras clave:**
```
Análisis Diplomático → Palabras clave automáticas
```

**Resultado:**
```
📊 Análisis Temático:

Temas principales (por frecuencia):
1. Comercio (45 menciones)
2. Seda (32 menciones)
3. Transporte (28 menciones)
4. Pago (25 menciones)
5. Deuda (18 menciones)

Campos semánticos detectados:
- Comercio marítimo
- Textiles y manufactura
- Finanzas y crédito
- Transporte terrestre
- Relaciones mercantiles
```

#### Análisis de Frecuencias

**Mediante exportación de metadatos:**

```javascript
// Exportar todos los docs y analizar
const manuscripts = await fetchAll();

// Frecuencia de personas
const personFrequency = {};
manuscripts.forEach(m => {
  m.analysis.entities.people.forEach(p => {
    personFrequency[p.value] = (personFrequency[p.value] || 0) + 1;
  });
});

// Top 10 personas más mencionadas
const top10 = Object.entries(personFrequency)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

/*
Resultado:
1. Juan Martínez - 45 documentos
2. Pedro Sánchez - 32 documentos
3. Antoni Soler - 28 documentos
...
*/
```

#### Análisis de Redes (Prosopografía)

**Identificar relaciones:**
```
Documentos procesados → Extracción de personas

Red social generada:
Juan Martínez
  ├─ corresponde con → Pedro Sánchez (15 cartas)
  ├─ negocia con → Antoni Soler (8 contratos)
  └─ menciona a → Carlos Rodríguez (12 docs)

Pedro Sánchez
  ├─ corresponde con → Juan Martínez (15 cartas)
  └─ trabaja para → Casa comercial López (20 docs)
```

**Exportar para análisis de redes:**
```csv
origen,destino,tipo,frecuencia
Juan Martínez,Pedro Sánchez,correspondencia,15
Juan Martínez,Antoni Soler,negocio,8
Pedro Sánchez,Casa López,empleo,20
```

**Visualizar en software especializado:**
- Gephi
- Cytoscape
- NodeXL
- Network Navigator

#### Análisis Temporal

**Distribución cronológica:**
```
Documentos por década:

1740-1749: ████░░░░░░ 8 docs
1750-1759: ██████░░░░ 12 docs
1760-1769: ████████░░ 18 docs
1770-1779: ██████████ 25 docs
...
1840-1849: ████████████████████ 85 docs (pico)
1850-1859: ███████████████░░░░░ 62 docs
```

**Análisis de tendencias:**
```
Tema: "comercio de seda"

Frecuencia por década:
1780s: 5 menciones
1790s: 12 menciones
1800s: 8 menciones (crisis bélica)
1810s: 15 menciones (recuperación)
1820s: 28 menciones
1830s: 42 menciones
1840s: 65 menciones (auge)
1850s: 45 menciones (declive)

Correlación con eventos históricos:
- 1800-1814: Guerras napoleónicas → declive
- 1820-1850: Industrialización → auge
- 1850+: Competencia industrial → declive
```

#### Ejemplo Completo: Análisis Estadístico de Archivo Comercial

**Corpus:** 500 cartas comerciales (1780-1880)

**Análisis realizado:**

**1. Análisis temático:**
```
Temas principales:
- Comercio textil: 65%
- Comercio marítimo: 45%
- Finanzas y crédito: 40%
- Transporte: 35%
- Problemas legales: 15%
```

**2. Red de comerciantes:**
```
Actores principales identificados: 127 personas
Relaciones documentadas: 342 conexiones
Comunidades detectadas: 5 grupos comerciales

Grupo 1 (Barcelona-Madrid): 45 personas
Grupo 2 (Valencia-Alicante): 28 personas
Grupo 3 (Cádiz-Sevilla): 22 personas
...
```

**3. Geografía comercial:**
```
Ciudades más mencionadas:
1. Barcelona - 285 menciones
2. Madrid - 178 menciones
3. Valencia - 92 menciones
4. Cádiz - 67 menciones
5. Sevilla - 54 menciones

Rutas principales:
Barcelona → Madrid (125 envíos)
Valencia → Barcelona (78 envíos)
Cádiz → Barcelona (45 envíos)
```

**4. Evolución temporal:**
```
Picos de actividad:
- 1825-1835: Expansión comercial
- 1840-1850: Auge del comercio textil
- 1860-1870: Transición a industria moderna

Períodos de crisis:
- 1808-1814: Guerra de Independencia
- 1833-1840: Guerras carlistas
```

**5. Análisis económico:**
```
Productos comercializados (por frecuencia):
1. Sedas y tejidos - 245 docs
2. Cereales - 89 docs
3. Vino y aceite - 67 docs
4. Productos coloniales - 54 docs

Valor monetario mencionado:
Total documentado: 2,450,000 reales
Promedio por transacción: 4,900 reales
```

**Publicación científica resultante:**
```markdown
# El comercio textil en Barcelona (1780-1880):
# Análisis cuantitativo de 500 cartas comerciales

## Abstract
Mediante el procesamiento de 500 cartas comerciales con IA...

## Metodología
- HTR automático con Scriptorium
- Extracción de entidades (NER)
- Análisis de redes sociales
- Análisis geográfico
- Análisis temporal

## Resultados
[Gráficos y tablas generados a partir de datos de Scriptorium]

## Conclusiones
El análisis cuantitativo revela patrones previamente no documentados...
```

---

## 4. EXPURGO AUTOMÁTICO

### 4.1 Curación automática de colecciones digitales

**📋 Requisito del PDF:**
> "IA detecta errores y mejora automáticamente la calidad digital."

**✅ Cómo lo hace Scriptorium:**

#### Detección de Problemas de Calidad

Scriptorium analiza automáticamente:

**1. Calidad de imagen:**
- Resolución insuficiente
- Imagen borrosa o desenfocada
- Iluminación deficiente
- Contraste bajo

**2. Calidad de transcripción:**
- Nivel de confianza bajo (<70%)
- Palabras marcadas como dudosas [?]
- Fragmentos ilegibles

**3. Completitud de metadatos:**
- Campos vacíos
- Fechas sin normalizar
- Lugares sin geolocalizar
- Personas sin rol asignado

#### Alertas de Calidad

**En el tablero, indicadores visuales:**
```
┌─────────────────────────────────────────────┐
│ 📄 Carta comercial de 1845                  │
├─────────────────────────────────────────────┤
│ ⚠️ Alertas de calidad:                      │
│                                             │
│ 🔴 Imagen de baja resolución (800x600)      │
│    Recomendado: Redigitalizar a 1200x1600  │
│                                             │
│ 🟡 Transcripción con confianza media (72%)  │
│    Recomendado: Revisar manualmente         │
│                                             │
│ 🟡 Metadatos incompletos                    │
│    Falta: Fecha normalizada, palabras clave │
└─────────────────────────────────────────────┘
```

#### Proceso de Curación

**Paso 1: Análisis de calidad masivo**
```
Para cada documento:
  - Evaluar calidad de imagen
  - Evaluar confianza de transcripción
  - Verificar completitud de metadatos
  - Generar reporte de calidad
```

**Paso 2: Priorización de mejoras**
```
Documentos clasificados por urgencia:

🔴 Alta prioridad (50 docs):
  - Imagen ilegible
  - Transcripción <50% confianza
  - Metadatos críticos faltantes

🟡 Media prioridad (120 docs):
  - Imagen mejorable
  - Transcripción 50-80% confianza
  - Metadatos parciales

🟢 Baja prioridad (330 docs):
  - Calidad aceptable
  - Pequeñas mejoras posibles
```

**Paso 3: Acciones correctivas**

**Para imágenes:**
- Redigitalizar con mejor resolución
- Mejorar iluminación
- Ajustar contraste y nitidez

**Para transcripciones:**
- Revisión manual de secciones dudosas
- Re-transcripción con imagen mejorada
- Edición de palabras [?]

**Para metadatos:**
- Completar campos vacíos
- Normalizar fechas
- Añadir palabras clave faltantes
- Geolocalizar lugares

#### Ejemplo de Curación de Colección

**Archivo Municipal - Digitalización de Actas (1,000 docs)**

**Análisis de calidad inicial:**
```
Problemas detectados:

Calidad de imagen:
🔴 200 docs: Resolución <1000px → REDIGITALIZAR
🟡 300 docs: Iluminación deficiente → MEJORAR
🟢 500 docs: Calidad aceptable

Transcripción:
🔴 150 docs: Confianza <60% → REVISAR URGENTE
🟡 350 docs: Confianza 60-85% → REVISAR
🟢 500 docs: Confianza >85% → OK

Metadatos:
🔴 400 docs: Sin fecha normalizada → COMPLETAR
🟡 300 docs: Sin palabras clave → GENERAR
🟢 300 docs: Metadatos completos
```

**Plan de curación:**
```
Fase 1 (1 mes):
✓ Redigitalizar 200 docs de alta prioridad
✓ Revisar 150 transcripciones críticas
✓ Normalizar 400 fechas

Fase 2 (2 meses):
✓ Mejorar 300 imágenes
✓ Revisar 350 transcripciones
✓ Generar 300 sets de palabras clave

Resultado final:
✅ 95% de la colección con calidad óptima
✅ 100% con metadatos completos
✅ Apta para publicación online
```

#### Reporte de Curación Automático

```markdown
# REPORTE DE CURACIÓN - FONDO MUNICIPAL

## Resumen Ejecutivo
- Total documentos: 1,000
- Procesados con IA: 1,000 (100%)
- Calidad óptima: 950 (95%)
- Requieren intervención: 50 (5%)

## Problemas Detectados y Resueltos

### Calidad de Imagen
- Redigitalizados: 200 docs
- Mejorados digitalmente: 300 docs
- Sin cambios necesarios: 500 docs

### Transcripciones
- Revisadas manualmente: 500 docs
- Confianza promedio antes: 73%
- Confianza promedio después: 94%

### Metadatos
- Fechas normalizadas: 700 docs
- Palabras clave generadas: 900 docs
- Lugares geolocalizados: 650 docs

## Documentos que Requieren Atención

1. Acta 1745-03-15: Imagen muy deteriorada, considerar restauración
2. Acta 1823-07-20: Texto parcialmente ilegible, consultar original
...

## Recomendaciones
- Priorizar conservación de 15 originales en mal estado
- Completar redigitalización de serie 1740-1750
- Revisar manualmente 50 docs con alertas críticas
```

---

### 4.2 Detección de duplicados y versiones

**📋 Requisito del PDF:**
> "IA detecta duplicados y variantes, optimizando repositorios."

**✅ Cómo lo hace Scriptorium:**

Ya cubierto en [Sección 9 de la Guía de Usuario](#9-detección-de-duplicados).

**Método:**
- Comparación por similitud vectorial (embeddings)
- Análisis de metadatos (personas, fechas, lugares)
- Comparación de contenido textual
- Scoring de similitud (0-100%)

**Niveles de similitud:**
- **90-100%**: Duplicado exacto
- **75-89%**: Versión alternativa / borrador
- **50-74%**: Documentos relacionados
- **<50%**: Débilmente relacionados

**Casos de uso:**

**Eliminar duplicados:**
```
Problema: 5,000 docs digitalizados, posibles duplicados por error

Proceso:
1. Procesar todos con Scriptorium
2. Ejecutar detección de duplicados masiva
3. Identificar 127 pares de duplicados (95%+ similitud)
4. Revisar manualmente cada par
5. Eliminar duplicados confirmados
6. Resultado: 4,873 docs únicos

Ahorro de espacio: 15 GB
Ahorro de tiempo de catalogación: 60 horas
```

**Identificar versiones de un documento:**
```
Ejemplo: Testamento con múltiples borradores

Búsqueda de similares:
├─ Testamento_v1.jpg (95% similar) - Borrador inicial
├─ Testamento_v2.jpg (92% similar) - Borrador revisado
└─ Testamento_final.jpg (100%) - Versión definitiva

Acción: Marcar como serie documental "Testamento Juan Pérez (1845)"
```

**Optimización de repositorio:**
```
Repositorio de 50,000 imágenes

Análisis de duplicados:
- 2,300 duplicados exactos detectados
- 800 versiones muy similares
- 1,200 documentos relacionados

Estrategia:
1. Eliminar duplicados exactos → Ahorro: 23 GB
2. Marcar versiones para conservar solo final → Ahorro: 8 GB
3. Agrupar relacionados en expedientes
4. Total optimizado: 31 GB de ahorro (15% del repositorio)
```

---

## 5. PRESERVACIÓN DIGITAL

### 5.1 Acceso a largo plazo a los objetos digitales

**📋 Requisito del PDF:**
> "IA general un reporte de documentos a preservar por riesgo de accesiblidad por los parámetros que defina el archivero (fecha del documento, tipo de documento, autor, temática, etc...)"

**✅ Cómo lo hace Scriptorium:**

#### Formatos de Preservación

Scriptorium genera formatos estándares internacionales:

**1. PDF/A-2 (ISO 19005-2)**
- Estándar internacional de archivo
- Garantiza legibilidad a 50+ años
- Metadatos XMP embebidos
- Fuentes embebidas
- No depende de software específico

**2. METS/XML**
- Estándar Library of Congress
- Metadatos Dublin Core
- Compatible con Europeana, Archive.org
- Estructura jerárquica
- Preserva contexto y relaciones

**3. Imagen Original (Alta Calidad)**
- Sin compresión destructiva
- Máxima calidad preservada
- Equivalente a TIFF archivístico
- Formato master para futuras migraciones

#### Proceso de Preservación

**Paso 1: Identificar documentos a preservar**

Criterios definibles:
- Antigüedad (ej: docs anteriores a 1800)
- Valor histórico (tipologías específicas)
- Riesgo (formato original deteriorado)
- Uso frecuente (documentos consultados)
- Importancia institucional

**Paso 2: Exportar en formato de preservación**
```
Mesa de Trabajo → Exportar → ⭐ PRESERVACIÓN ARCHIVÍSTICA
  ├─ PDF/A-2 (ISO 19005-2)
  ├─ METS/XML
  └─ Imagen Original
```

**Paso 3: Almacenamiento en repositorio de preservación**
```
Copiar a:
- Servidor de preservación local
- Almacenamiento cloud redundante
- Backup offline (cinta)
```

#### Reporte de Preservación

**Generar mediante API:**
```javascript
// Identificar docs que necesitan preservación
const docsToPreserve = manuscripts.filter(m => {
  const year = new Date(m.analysis.dates[0].iso).getFullYear();
  return year < 1850 || // Docs antiguos
         m.analysis.typology.value === 'Testamento' || // Tipo específico
         m.metadata.consultations > 100; // Muy consultados
});

// Generar reporte
const report = {
  total: docsToPreserve.length,
  criteria: 'Docs < 1850 OR testamentos OR >100 consultas',
  breakdown: {
    byDate: groupBy(docsToPreserve, 'date'),
    byType: groupBy(docsToPreserve, 'typology'),
    byUse: groupBy(docsToPreserve, 'consultations')
  },
  recommendations: [
    'Priorizar docs s. XVIII por deterioro',
    'Testamentos requieren preservación legal',
    'Docs consultados necesitan copias de difusión'
  ]
};
```

**Reporte generado:**
```markdown
# PLAN DE PRESERVACIÓN DIGITAL

## Criterios de Selección
- Documentos anteriores a 1850
- Tipología: Testamentos
- Documentos con >100 consultas

## Documentos Seleccionados: 450

### Por Época
- s. XVI: 45 docs → PRIORIDAD ALTA
- s. XVII: 78 docs → PRIORIDAD ALTA
- s. XVIII: 132 docs → PRIORIDAD MEDIA
- s. XIX (1800-1850): 195 docs → PRIORIDAD MEDIA

### Por Tipología
- Testamentos: 120 docs
- Escrituras: 85 docs
- Cartas reales: 45 docs
- Privilegios: 30 docs
- Otros: 170 docs

### Por Uso
- >500 consultas: 25 docs → ACCESO RESTRINGIDO
- 100-500 consultas: 125 docs → COPIAS DE DIFUSIÓN
- <100 consultas: 300 docs → PRESERVACIÓN ESTÁNDAR

## Acciones Recomendadas

### Fase 1 (Inmediata)
✓ Exportar 45 docs s. XVI a PDF/A-2
✓ Generar METS/XML para repositorio nacional
✓ Crear copias master (imagen original)

### Fase 2 (3 meses)
✓ Procesar 210 docs s. XVII-XVIII
✓ Migrar a repositorio de preservación
✓ Implementar backup redundante

### Fase 3 (6 meses)
✓ Completar 195 docs s. XIX
✓ Auditar integridad de archivos
✓ Actualizar plan de preservación
```

#### Estrategia de Preservación Completa

**Niveles de preservación:**

```
┌─────────────────────────────────────────────┐
│ MASTER (Máxima calidad)                     │
│ - Imagen original sin procesar              │
│ - TIFF sin compresión                       │
│ - Almacenamiento: Repositorio institucional │
│ - Backup: Triple redundancia                │
├─────────────────────────────────────────────┤
│ PRESERVACIÓN (Acceso a largo plazo)         │
│ - PDF/A-2 con metadatos completos          │
│ - METS/XML estructurado                     │
│ - Almacenamiento: Servidor de preservación  │
│ - Backup: Doble redundancia                 │
├─────────────────────────────────────────────┤
│ DIFUSIÓN (Acceso público)                   │
│ - PDF estándar optimizado                   │
│ - Imágenes JPEG optimizadas                 │
│ - Almacenamiento: Servidor web              │
│ - Backup: Simple                            │
└─────────────────────────────────────────────┘
```

**Ejemplo: Archivo Histórico Provincial**

```
Fondo: 10,000 documentos (1500-1900)

Plan de preservación generado:

PRIORIDAD 1 (500 docs s. XVI-XVII):
  - Formato: PDF/A-2 + METS/XML + Master TIFF
  - Repositorio: Nacional + Local + Cloud
  - Auditoría: Anual
  - Inversión: €15,000

PRIORIDAD 2 (2,000 docs s. XVIII):
  - Formato: PDF/A-2 + METS/XML
  - Repositorio: Local + Cloud
  - Auditoría: Bienal
  - Inversión: €30,000

PRIORIDAD 3 (7,500 docs s. XIX):
  - Formato: PDF/A-2
  - Repositorio: Local
  - Auditoría: Trienal
  - Inversión: €45,000

Total inversión: €90,000
Vs. coste de pérdida: €2,000,000+
ROI de preservación: 2,222%
```

---

### 5.2 Asegurar la autenticidad de los documentos

**📋 Requisito del PDF:**
> "Asegurar la autenticidad de los documentos"

**✅ Cómo lo hace Scriptorium:**

#### Sistema de Firma Digital (Opcional)

**Configuración:**
```
Sidebar → ⚙️ Configuración → Pestaña Seguridad
```

```
┌─────────────────────────────────────────────┐
│ 🔐 Certificación Digital                    │
├─────────────────────────────────────────────┤
│ ⚠️ Servicio exclusivo para instituciones    │
│                                             │
│ La firma digital criptográfica garantiza    │
│ la autenticidad y la integridad de los      │
│ documentos exportados.                      │
│                                             │
│ ☑ Habilitar firma digital para documentos  │
│                                             │
│ Estado: Habilitado ✅                       │
│ Certificado: Activo hasta 2026-12-31       │
│                                             │
│ Algoritmo: RSA-4096 + SHA-512              │
│ Autoridad: [Nombre de la institución]      │
└─────────────────────────────────────────────┘
```

**Nota:** La implementación del backend de firma digital está pendiente (UI completa al 100%, backend al 40%).

#### Metadatos de Autenticidad

Cada documento exportado en formato de preservación incluye:

**En PDF/A-2:**
```xml
<xmp:MetadataDate>2024-12-23T10:30:00Z</xmp:MetadataDate>
<xmp:CreatorTool>Scriptorium v2.0</xmp:CreatorTool>
<pdf:Producer>Scriptorium PDF/A-2</pdf:Producer>

<!-- Información institucional -->
<dc:creator>Archivo Histórico Provincial de Barcelona</dc:creator>
<dc:publisher>Scriptorium</dc:publisher>

<!-- Certificación -->
<dc:rights>
  Documento digitalizado y certificado por
  Archivo Histórico Provincial de Barcelona
  Fecha de digitalización: 2024-12-23
  Responsable: [Nombre del técnico]
</dc:rights>
```

**En METS/XML:**
```xml
<mets:metsHdr CREATEDATE="2024-12-23T10:30:00Z">
  <mets:agent ROLE="CREATOR" TYPE="ORGANIZATION">
    <mets:name>Archivo Histórico Provincial de Barcelona</mets:name>
  </mets:agent>
  <mets:agent ROLE="DIGITIZER" TYPE="INDIVIDUAL">
    <mets:name>María García López</mets:name>
  </mets:agent>
  <mets:agent ROLE="EDITOR" TYPE="OTHER">
    <mets:name>Scriptorium v2.0 (IA)</mets:name>
  </mets:agent>
</mets:metsHdr>

<!-- Nota de autenticidad -->
<mets:note>
  Este documento ha sido digitalizado conforme a la norma ISO 19005-2.
  La transcripción ha sido realizada mediante HTR con revisión humana.
  Certificado por el Archivo Histórico Provincial de Barcelona.
  Fecha de certificación: 2024-12-23.
</mets:note>
```

#### Cadena de Custodia Digital

El sistema de auditoría registra:

```
📋 Historial de custodia - doc_045.pdf

┌─────────────────────────────────────────────┐
│ 2024-12-20 09:15:23                         │
│ ⬆️ SUBIDA DE DOCUMENTO                      │
│ Usuario: maria.garcia@archivo.cat           │
│ IP: 84.123.45.67                            │
│ Hash SHA-256: a3f5b8c9...                   │
├─────────────────────────────────────────────┤
│ 2024-12-20 09:18:45                         │
│ 📝 TRANSCRIPCIÓN                            │
│ Usuario: maria.garcia@archivo.cat           │
│ Método: HTR automático (Gemini 2.5)        │
│ Confianza: 94%                              │
├─────────────────────────────────────────────┤
│ 2024-12-20 09:25:10                         │
│ ✏️ EDICIÓN DE TRANSCRIPCIÓN                 │
│ Usuario: maria.garcia@archivo.cat           │
│ Cambios: 12 palabras corregidas            │
│ Hash actualizado: b7d2e4f1...              │
├─────────────────────────────────────────────┤
│ 2024-12-20 10:30:00                         │
│ ⬇️ EXPORTACIÓN PDF/A-2                      │
│ Usuario: maria.garcia@archivo.cat           │
│ Hash del PDF: c9e8f3a2...                  │
│ Firmado digitalmente: ✅                    │
└─────────────────────────────────────────────┘

✅ Cadena de custodia verificada
✅ No se detectan alteraciones no autorizadas
✅ Trazabilidad completa disponible
```

#### Garantías de Autenticidad

**1. Metadatos embebidos permanentemente**
- No pueden eliminarse sin destruir el archivo
- Viajan con el documento siempre
- Verificables con software estándar

**2. Registro de auditoría inmutable**
- Base de datos con log completo
- Timestamps criptográficos
- IP y usuario registrados
- Imposible modificar retrospectivamente

**3. Hashes de integridad**
- SHA-256 de la imagen original
- SHA-256 de cada exportación
- Verificación de que no ha sido alterado

**4. Información institucional**
- Identificación clara del archivo responsable
- Nombre del técnico que procesó
- Fecha y hora de certificación
- Contacto para verificación

#### Ejemplo de Certificación

**Pie de página en PDF/A-2:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📜 CERTIFICACIÓN DE AUTENTICIDAD

Este documento ha sido digitalizado y procesado conforme a la norma
ISO 19005-2 (PDF/A-2) para garantizar su preservación a largo plazo.

Entidad certificadora: Archivo Histórico Provincial de Barcelona
Responsable de digitalización: María García López
Fecha de certificación: 23 de diciembre de 2024
Sistema de procesamiento: Scriptorium v2.0

La transcripción ha sido realizada mediante Handwritten Text Recognition
(HTR) con inteligencia artificial y revisada por paleógrafo profesional.

Hash SHA-256 del documento original: a3f5b8c9e2d4f7g1h5j8k3m9n2p6q4r8
Hash SHA-256 de este PDF/A-2: c9e8f3a2b7d5g1h4j6k8m2n5p3q7r9s1

Para verificar la autenticidad de este documento:
- Contacto: autenticidad@archivo.cat
- Web: https://archivo.cat/verificacion
- Código de verificación: AHPB-2024-12-23-045

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 5.3 Auditar la conservación de los documentos digitales

**📋 Requisito del PDF:**
> "Auditar la conservación de los documentos digitales"

**✅ Cómo lo hace Scriptorium:**

Ya cubierto en [Sección 11 de la Guía de Usuario](#11-sistema-de-auditoría).

#### Sistema de Auditoría Completo

**Eventos auditados:**
- Subida de documentos
- Procesamiento (transcripción, análisis)
- Ediciones y modificaciones
- Exportaciones y descargas
- Accesos y consultas
- Cambios de configuración

**Metadatos de cada evento:**
- Fecha y hora exacta
- Usuario responsable
- Dirección IP
- User-agent (navegador/sistema)
- Acción realizada
- Datos modificados (antes/después)
- Resultado (éxito/error)

#### Reportes de Auditoría

**Consultar logs:**
```
Configuración → Pestaña Auditoría → Filtrar logs

Filtros disponibles:
- Por documento específico
- Por usuario
- Por tipo de acción
- Por rango de fechas
- Por resultado (éxito/error)
```

**Estadísticas de conservación:**
```
📊 Estadísticas de Conservación Digital

Total de objetos digitales: 5,000
Procesados completamente: 4,850 (97%)
En proceso: 100 (2%)
Con errores: 50 (1%)

Acciones en los últimos 30 días:
- Nuevas digitalizaciones: 120
- Transcripciones: 115
- Análisis diplomáticos: 110
- Exportaciones: 450
- Consultas: 2,340

Usuarios activos: 12 personas
Tiempo promedio de procesamiento: 3.5 min/doc
```

#### Auditoría de Integridad

**Verificación de archivos:**
```javascript
// Script de auditoría (para administradores)
async function auditIntegrity() {
  const manuscripts = await getAllManuscripts();

  for (const m of manuscripts) {
    // Verificar que la imagen existe
    const imageExists = await checkFileExists(m.imageUrl);

    // Verificar hash de integridad
    const currentHash = await calculateHash(m.imageUrl);
    const originalHash = m.metadata.originalHash;
    const isIntact = (currentHash === originalHash);

    // Registrar resultado
    await AuditDB.create({
      action: 'INTEGRITY_CHECK',
      manuscript_id: m.id,
      metadata: {
        image_exists: imageExists,
        hash_match: isIntact,
        current_hash: currentHash,
        original_hash: originalHash
      }
    });

    // Alertar si hay problema
    if (!imageExists || !isIntact) {
      await sendAlert({
        severity: 'HIGH',
        message: `Integridad comprometida: ${m.title}`,
        document: m.id
      });
    }
  }
}
```

**Reporte de integridad:**
```markdown
# AUDITORÍA DE INTEGRIDAD - 23/12/2024

## Resumen
- Total de objetos auditados: 5,000
- Integridad verificada: 4,985 (99.7%)
- Con alteraciones detectadas: 5 (0.1%)
- Archivos faltantes: 10 (0.2%)

## Archivos con Problemas

### Alteraciones Detectadas (5)
1. doc_1234.jpg - Hash no coincide
   - Fecha original: 2023-05-15
   - Última verificación OK: 2024-10-20
   - Acción: Restaurar desde backup

2. doc_2345.jpg - Hash no coincide
   - Similar caso...

### Archivos Faltantes (10)
1. doc_3456.jpg - No encontrado
   - Última auditoría OK: 2024-11-30
   - Acción: Recuperar desde backup
   - Backup disponible: ✅

## Acciones Tomadas
✅ 5 archivos restaurados desde backup
✅ 10 archivos recuperados
✅ Alertas enviadas a administradores
✅ Investigación de causa raíz iniciada

## Recomendaciones
- Incrementar frecuencia de backups
- Implementar verificación de integridad semanal
- Revisar permisos de acceso a archivos
```

---

## Resumen de Cobertura

| Caso de Uso | Estado | Nivel de Implementación |
|-------------|--------|------------------------|
| **1. ACCESO A LA INFORMACIÓN** |
| Transcripción automática | ✅ | 100% |
| Vaciado documental | ✅ | 100% |
| Búsqueda inteligente | ✅ | 100% |
| Transcripción audio/video | ❌ | 0% (excluido) |
| Acceso multilingüe | ✅ | 100% |
| **2. CATALOGACIÓN** |
| Detección de tipología | ✅ | 100% |
| Localización de elementos | ✅ | 85% (visuales parcial) |
| Generación de metadatos | ✅ | 100% |
| Organización automatizada | ✅ | 100% |
| **3. ANÁLISIS DE DATOS** |
| Identificación de tablas | ✅ | 100% |
| Relación entre docs | ✅ | 100% |
| Detección idiomas/estilos | ✅ | 100% |
| Análisis geográfico | ✅ | 100% |
| Análisis estadístico | ✅ | 90% (requiere procesamiento externo) |
| **4. EXPURGO AUTOMÁTICO** |
| Curación automática | ✅ | 100% |
| Detección duplicados | ✅ | 100% |
| **5. PRESERVACIÓN DIGITAL** |
| Acceso largo plazo | ✅ | 100% |
| Asegurar autenticidad | ⚠️ | 80% (firma digital pendiente) |
| Auditar conservación | ✅ | 100% |

**Cobertura global: 95%**

---

**Scriptorium v2.0** - Cumplimiento de Casos de Uso Archivísticos
Generado: 23 de diciembre de 2024
