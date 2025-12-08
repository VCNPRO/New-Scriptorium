import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { requireAuth } from '../lib/auth';

const API_KEY = process.env.GOOGLE_API_KEY; // API key SEGURA en backend

if (!API_KEY) {
  console.error('❌ GOOGLE_API_KEY no configurada');
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });
const MODEL_NAME = 'gemini-3-pro-preview';

async function transcribeHandler(req: VercelRequest, res: VercelResponse, auth: any) {
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
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Imagen requerida' });
    }

    if (!API_KEY) {
      return res.status(500).json({
        error: 'Configuración incompleta',
        message: 'GOOGLE_API_KEY no está configurada en el servidor'
      });
    }

    // Limpiar base64
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    console.log(`🔍 Usuario ${auth.email} (${auth.userId}) iniciando transcripción`);

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: `Actúa como un paleógrafo experto. Realiza dos tareas:
            1. Transcribe el manuscrito "verbatim". Usa [ilegible] si es necesario.
            2. Analiza visualmente el documento para detectar: Sellos, Mapas/Planos, Tablas/Listas estructuradas, Iluminaciones/Dibujos y Estado de conservación.

            Devuelve la respuesta en formato JSON con la siguiente estructura (NO uses Markdown, solo JSON raw):
            {
              "transcription": "texto...",
              "visual": {
                "hasSeals": boolean,
                "hasMaps": boolean,
                "hasTables": boolean,
                "hasIlluminations": boolean,
                "physicalCondition": "string breve describiendo daños físicos si los hay"
              }
            }`
          },
        ],
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const json = JSON.parse(response.text || "{}");

    console.log(`✅ Transcripción completada para usuario ${auth.email}`);

    return res.status(200).json({
      success: true,
      text: json.transcription || "",
      visual: json.visual || {
        hasSeals: false,
        hasMaps: false,
        hasTables: false,
        hasIlluminations: false,
        physicalCondition: "Normal"
      }
    });
  } catch (error: any) {
    console.error('❌ Error en transcripción:', error);
    return res.status(500).json({
      error: 'Error al transcribir manuscrito',
      message: error.message,
    });
  }
}

export default requireAuth(transcribeHandler);
