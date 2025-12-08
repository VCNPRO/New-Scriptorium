import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { requireAuth } from '../lib/auth';

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error('❌ GOOGLE_API_KEY no configurada');
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

async function translateHandler(req: VercelRequest, res: VercelResponse, auth: any) {
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
    const { text, targetLang = 'es' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Texto requerido' });
    }

    if (!API_KEY) {
      return res.status(500).json({
        error: 'Configuración incompleta',
        message: 'GOOGLE_API_KEY no está configurada en el servidor'
      });
    }

    const prompts: Record<string, string> = {
      es: 'Traduce el siguiente texto de archivo antiguo al español moderno legible y accesible',
      en: 'Translate the following historical text to modern, accessible English',
      fr: 'Traduisez le texte historique suivant en français moderne et accessible',
      de: 'Übersetzen Sie den folgenden historischen Text ins moderne, zugängliche Deutsch',
      it: 'Traduci il seguente testo storico in italiano moderno e accessibile',
      pt: 'Traduza o seguinte texto histórico para português moderno e acessível'
    };

    const prompt = prompts[targetLang] || prompts['es'];

    console.log(`🔍 Usuario ${auth.email} solicitando traducción a ${targetLang}`);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${prompt}: "${text.substring(0, 5000)}"`
    });

    const translation = response.text || "";

    console.log(`✅ Traducción completada para usuario ${auth.email}`);

    return res.status(200).json({
      success: true,
      translation
    });
  } catch (error: any) {
    console.error('❌ Error en traducción:', error);
    return res.status(500).json({
      error: 'Error al traducir texto',
      message: error.message,
    });
  }
}

export default requireAuth(translateHandler);
