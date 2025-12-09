import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { requireAuth, AuthPayload } from '../lib/auth';

const API_KEY = process.env.GOOGLE_API_KEY; // API key SEGURA en backend

if (!API_KEY) {
  console.error('❌ GOOGLE_API_KEY no configurada');
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

const transcribeHandler = async (req: VercelRequest, res: VercelResponse, auth: AuthPayload) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    // Limpiar el prefijo de la URI de datos si está presente
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, '');

    const MODEL_NAME = 'gemini-pro-vision';

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg', // Asumimos jpeg, podría necesitar ser dinámico
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
    
    // Vercel se queja de response.text()
    // const responseText = response.text();
    const responseText = response.response.candidates[0].content.parts[0].text;
    
    if (!responseText) {
      throw new Error('La respuesta de la IA estaba vacía.');
    }
    const json = JSON.parse(responseText);

    console.log(`✅ Transcripción completada para usuario ${auth.email}`);

    return res.status(200).json({
      success: true,
      text: json.transcription || "",
      visual: null // Mantener nulo como en el original
    });

  } catch (error: any) {
    console.error('❌ Error en transcripción:', error);
    return res.status(500).json({
      error: 'Error al transcribir manuscrito (backend)',
      message: error.message,
      stack: error.stack,
    });
  }
};

export default requireAuth(transcribeHandler);