import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { requireAuth } from '../lib/auth';

const API_KEY = process.env.GOOGLE_API_KEY; // API key SEGURA en backend

if (!API_KEY) {
  console.error('❌ GOOGLE_API_KEY no configurada');
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });
        const MODEL_NAME = 'gemini-1.5-pro-latest';
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{
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
      }],
    });

    const responseText = response.text();
    if (!responseText) {
      throw new Error('La respuesta de la IA estaba vacía.');
    }
    const json = JSON.parse(responseText);

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
    // Return a more detailed error message for debugging on the frontend
    return res.status(500).json({
      error: 'Error al transcribir manuscrito (backend)',
      message: error.message,
      stack: error.stack, // Include stack trace for more detailed debugging
    });
  }
}

export default requireAuth(transcribeHandler);
