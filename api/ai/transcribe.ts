import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { requireAuth } from '../lib/auth';

const API_KEY = process.env.GOOGLE_API_KEY; // API key SEGURA en backend

if (!API_KEY) {
  console.error('❌ GOOGLE_API_KEY no configurada');
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });
        const MODEL_NAME = 'gemini-pro-vision';
    
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
            text: `Actúa como un paleógrafo experto y transcribe el manuscrito "verbatim". Usa [ilegible] si es necesario.
            Devuelve la respuesta en formato JSON con la siguiente estructura (NO uses Markdown, solo JSON raw):
            {
              "transcription": "texto..."
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

    // SIMPLIFIED RESPONSE FOR DEBUGGING
    return res.status(200).json({
      success: true,
      text: json.transcription || "",
      visual: null // Return null for visual analysis during debug
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
