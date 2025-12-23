import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { requireAuth } from '../lib/auth';

/**
 * POST /api/ai/extract-tables
 * Extrae datos estructurados de tablas detectadas en manuscritos
 */
async function extractTablesHandler(req: VercelRequest, res: VercelResponse, auth: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { imageUrl, mimeType = 'image/jpeg' } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'La imagen es requerida' });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ error: 'API key no configurada' });
    }

    console.log(`📊 Extrayendo tablas para usuario ${auth.email}`);

    const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // Limpiar base64 si viene con prefijo
    const cleanBase64 = imageUrl.replace(/^data:image\/[a-z]+;base64,/, '');

    const prompt = `Eres un experto en análisis documental y extracción de datos estructurados.

Analiza esta imagen de manuscrito histórico y DETECTA si contiene TABLAS.

Si encuentras tablas:
1. Identifica cuántas tablas hay
2. Para cada tabla, extrae:
   - Número de filas y columnas
   - Encabezados (si los hay)
   - Datos de cada celda
   - Tipo de tabla (inventario, lista de precios, registro, contabilidad, etc.)

FORMATO DE SALIDA (JSON):
{
  "hasTables": true o false,
  "tables": [
    {
      "tableNumber": 1,
      "type": "Inventario" | "Lista de precios" | "Registro" | "Contabilidad" | "Otro",
      "rows": 5,
      "columns": 3,
      "headers": ["Producto", "Cantidad", "Precio"],
      "data": [
        ["Trigo", "20 fanegas", "150 reales"],
        ["Cebada", "15 fanegas", "80 reales"]
      ],
      "notes": "Observaciones adicionales sobre la tabla"
    }
  ]
}

IMPORTANTE:
- Si NO hay tablas, devuelve {"hasTables": false, "tables": []}
- Extrae el texto tal como aparece, incluso si está en español antiguo
- Si una celda es ilegible, usa "[ilegible]"
- Mantén la estructura original de la tabla

DEVUELVE SOLO EL JSON, sin texto adicional.`;

    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType
            }
          }
        ]
      }]
    });

    const responseText = result.response.text();
    console.log('🤖 Respuesta de Gemini:', responseText.substring(0, 200) + '...');

    // Limpiar markdown si existe
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    const tablesData = JSON.parse(jsonText);

    console.log(`✅ Tablas extraídas: ${tablesData.tables?.length || 0}`);

    return res.status(200).json({
      success: true,
      ...tablesData
    });

  } catch (error: any) {
    console.error('❌ Error extrayendo tablas:', error);
    return res.status(500).json({
      error: 'Error al extraer tablas',
      message: error.message
    });
  }
}

export default requireAuth(extractTablesHandler);
