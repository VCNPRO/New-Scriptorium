import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisData, VisualAnalysis } from "../types";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GOOGLE_API_KEY no está configurada. Por favor, configura la variable de entorno en Vercel.');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Using gemini-3-pro-preview for best handwriting recognition (vision capabilities)
const MODEL_NAME = 'gemini-3-pro-preview';

/**
 * Q1, Q5, Q7: Transcribes text AND detects visual elements (Seals, Maps, Tables)
 */
export const transcribeManuscript = async (imageBase64: string): Promise<{ text: string; visual: VisualAnalysis }> => {
  try {
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

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
            1. (Q1) Transcribe el manuscrito "verbatim". Usa [ilegible] si es necesario.
            2. (Q5, Q7) Analiza visualmente el documento para detectar: Sellos, Mapas/Planos, Tablas/Listas estructuradas, Iluminaciones/Dibujos y Estado de conservación.
            
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
    return {
      text: json.transcription || "",
      visual: json.visual || { hasSeals: false, hasMaps: false, hasTables: false, hasIlluminations: false, physicalCondition: "Normal" }
    };
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe manuscript.");
  }
};

/**
 * Q2, Q4, Q6, Q8, Q10, Q11, Q12, Q15: Deep Archival Analysis
 */
export const analyzeTranscription = async (text: string): Promise<AnalysisData> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Realiza un vaciado documental automático y análisis diplomático del siguiente texto.
      
      Tareas:
      - (Q4) Detecta la Tipología Documental exacta.
      - (Q11) Identifica variantes paleográficas probables (según el estilo del texto) y el idioma.
      - (Q6) Genera un Título descriptivo normalizado y Palabras Clave.
      - (Q8) Propone una Serie Documental para catalogación.
      - (Q12) Extrae lugares y estima coordenadas aproximadas si son lugares históricos conocidos.
      - (Q15) Detecta posibles inconsistencias o errores en el texto (Curación).
      - (Q2) Extrae eventos históricos.
      - (Q10) Detecta referencias textuales a OTROS documentos (ej. "según consta en la carta del día X").

      Texto: "${text.substring(0, 15000)}"`, // Limit context if needed
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
                events: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de hechos o eventos principales" }
              }
            },
            typology: { type: Type.STRING, description: "Tipo documental (ej. Testamento, Real Cédula)" },
            scriptType: { type: Type.STRING, description: "Tipo de letra probable (ej. Humanística, Procesal)" },
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
            suggestedSeries: { type: Type.STRING, description: "Propuesta de serie archivística" },
            qualityAlerts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Posibles errores o dudas en el documento" },
            sentiment: { type: Type.STRING },
            historicalContext: { type: Type.STRING },
            documentReferences: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Citas o menciones explícitas a otros documentos dentro del texto" }
          }
        }
      }
    });

    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr) as AnalysisData;
  } catch (error) {
    console.error("Analysis error:", error);
    throw new Error("Failed to analyze transcription.");
  }
};

/**
 * Q14: Multilingual Access
 */
export const translateText = async (text: string, targetLang: string = 'es'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Traduce el siguiente texto de archivo antiguo al español moderno legible y accesible: "${text.substring(0, 5000)}"`
    });
    return response.text || "";
  } catch (error) {
      return "Error en traducción.";
  }
}