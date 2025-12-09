import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { requireAuth } from '../lib/auth';
import { ManuscriptDB } from '../lib/db';

interface AnalysisStats {
  typology: Record<string, number>;
  topKeywords: [string, number][];
  topPeople: [string, number][];
  topLocations: [string, number][];
  languages: Record<string, number>;
  documentCount: number;
}

async function statisticsHandler(req: VercelRequest, res: VercelResponse, auth: AuthPayload) {
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
    const { documentIds } = req.body as { documentIds: string[] };

    if (!Array.isArray(documentIds) || documentIds.length === 0) {
      return res.status(400).json({ error: 'Se requiere un array de documentIds' });
    }

    console.log(`📊 Usuario ${auth.email} iniciando análisis estadístico para ${documentIds.length} documentos.`);

    // Consulta para obtener todos los análisis de los documentos solicitados
    const result = await sql<Pick<ManuscriptDB, 'analysis'>>`
      SELECT analysis FROM manuscripts
      WHERE id = ANY(${documentIds}) AND user_id = ${auth.userId} AND analysis IS NOT NULL
    `;

    const analyses = result.rows.map(row => row.analysis);

    if (analyses.length === 0) {
      return res.status(404).json({ error: 'No se encontraron análisis para los documentos especificados.' });
    }

    // Funciones de agregación
    const countFrequencies = (items: (string | undefined)[]) => {
      const frequencies: Record<string, number> = {};
      for (const item of items) {
        if (item) {
          frequencies[item] = (frequencies[item] || 0) + 1;
        }
      }
      return frequencies;
    };

    const getTopItems = (items: string[], limit = 10) => {
        const frequencies = countFrequencies(items);
        return Object.entries(frequencies)
          .sort((a, b) => b[1] - a[1])
          .slice(0, limit);
    };

    // Procesar datos
    const allKeywords = analyses.flatMap(a => a.keywords || []);
    const allPeople = analyses.flatMap(a => a.entities?.people || []);
    const allLocations = analyses.flatMap(a => a.entities?.locations || []);
    const allTypologies = analyses.map(a => a.typology);
    const allLanguages = analyses.map(a => a.language);

    const stats: AnalysisStats = {
      documentCount: analyses.length,
      typology: countFrequencies(allTypologies),
      topKeywords: getTopItems(allKeywords, 15),
      topPeople: getTopItems(allPeople, 10),
      topLocations: getTopItems(allLocations, 10),
      languages: countFrequencies(allLanguages),
    };

    console.log(`✅ Análisis estadístico completado para usuario ${auth.email}`);

    return res.status(200).json({
      success: true,
      statistics: stats
    });

  } catch (error: any) {
    console.error('❌ Error en análisis estadístico:', error);
    return res.status(500).json({
      error: 'Error al generar estadísticas',
      message: error.message,
    });
  }
}

export default requireAuth(statisticsHandler);
