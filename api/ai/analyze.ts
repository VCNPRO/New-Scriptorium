import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";
import { requireAuth } from '../lib/auth';

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error('❌ GOOGLE_API_KEY no configurada');
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

async function analyzeHandler(req: VercelRequest, res: VercelResponse, auth: any) {
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
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Texto requerido' });
    }

    if (!API_KEY) {
      return res.status(500).json({
        error: 'Configuración incompleta',
        message: 'GOOGLE_API_KEY no está configurada en el servidor'
      });
    }

    console.log(`🔍 Usuario ${auth.email} iniciando análisis diplomático`);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Realiza un vaciado documental automático y análisis diplomático del siguiente texto.

      Tareas:
      - Detecta la Tipología Documental exacta.
      - Identifica variantes paleográficas probables y el idioma.
      - Genera un Título descriptivo normalizado y Palabras Clave.
      - Propone una Serie Documental para catalogación.
      - Extrae lugares y estima coordenadas aproximadas si son lugares históricos conocidos.
      - Detecta posibles inconsistencias o errores en el texto (Curación).
      - Extrae eventos históricos.
      - Detecta referencias textuales a OTROS documentos.

      Texto: "${text.substring(0, 15000)}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            titleSuggestion: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            entities: {
              type: Type.OBJECT,
              properties: {
                people: { type: Type.ARRAY, items: { type: Type.STRING } },
                locations: { type: Type.ARRAY, items: { type: Type.STRING } },
                dates: { type: Type.ARRAY, items: { type: Type.STRING } },
                organizations: { type: Type.ARRAY, items: { type: Type.STRING } },
                events: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            typology: { type: Type.STRING },
            scriptType: { type: Type.STRING },
            language: { type: Type.STRING },
            geodata: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  place: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["origin", "reference"] }
                }
              }
            },
            suggestedSeries: { type: Type.STRING },
            qualityAlerts: { type: Type.ARRAY, items: { type: Type.STRING } },
            sentiment: { type: Type.STRING },
            historicalContext: { type: Type.STRING },
            documentReferences: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const jsonStr = response.text || "{}";
    const analysis = JSON.parse(jsonStr);

    console.log(`✅ Análisis completado para usuario ${auth.email}`);

    return res.status(200).json({
      success: true,
      analysis
    });
  } catch (error: any) {
    console.error('❌ Error en análisis:', error);
    return res.status(500).json({
      error: 'Error al analizar transcripción',
      message: error.message,
    });
  }
}

export default requireAuth(analyzeHandler);
