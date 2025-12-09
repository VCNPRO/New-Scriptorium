import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { requireAuth, AuthPayload } from '../lib/auth';

const API_KEY = process.env.GOOGLE_API_KEY;

const transcribeHandler = async (req: VercelRequest, res: VercelResponse, auth: AuthPayload) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // CORS headers for direct frontend-to-API calls if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (!API_KEY) {
    console.error('GOOGLE_API_KEY is not configured.');
    return res.status(500).json({ error: 'Configuration error: Missing API key.' });
  }
  const ai = new GoogleGenAI(API_KEY);

  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'No image data provided.' });
    }

    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, '');
    const model = ai.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = `Actúa como un paleógrafo experto y transcribe el manuscrito "verbatim". Usa [ilegible] si es necesario.
    Devuelve la respuesta en formato JSON con la siguiente estructura (NO uses Markdown, solo JSON raw):
    {
      "transcription": "texto..."
    }`;

    const imagePart = {
      inlineData: {
        data: cleanBase64,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();

    if (!responseText) {
      throw new Error('AI response was empty.');
    }

    let json;
    try {
      const cleanedResponse = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      json = JSON.parse(cleanedResponse);
    } catch (e) {
      console.error("Failed to parse AI JSON response. Raw text:", responseText);
      throw new Error("AI returned an invalid JSON format.");
    }

    console.log(`Transcription completed for user ${auth.email}`);
    return res.status(200).json({
      success: true,
      text: json.transcription || "",
    });

  } catch (error: any) {
    console.error('Error during transcription:', error);
    return res.status(500).json({
      error: 'Error transcribing manuscript (backend)',
      message: error.message,
    });
  }
};

export default requireAuth(transcribeHandler);
