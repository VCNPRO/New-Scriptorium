import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { ManuscriptDB } from '../lib/db';
import { requireAuth, AuthPayload } from '../lib/auth';

async function searchManuscriptsHandler(req: VercelRequest, res: VercelResponse, auth: AuthPayload) {
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
    const { query, limit = 10, type = 'text' } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query de búsqueda requerido' });
    }

    console.log(`🔍 Usuario ${auth.email} buscando: "${query}" (tipo: ${type})`);

    // BÚSQUEDA SEMÁNTICA usando embeddings
    if (type === 'semantic') {
      try {
        // Generar embedding para la query usando Google AI
        const embeddingResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${process.env.GOOGLE_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'models/text-embedding-004',
              content: {
                parts: [{ text: query }]
              }
            })
          }
        );

        const embeddingData = await embeddingResponse.json();

        if (!embeddingData.embedding?.values) {
          throw new Error('No se pudo generar embedding');
        }

        const queryEmbedding = embeddingData.embedding.values;

        // Búsqueda por similitud vectorial
        const semanticResults = await sql`
          SELECT
            id,
            title,
            image_url,
            transcription,
            analysis,
            visual_analysis,
            created_at,
            status,
            (1 - (embedding <=> ${JSON.stringify(queryEmbedding)}::vector)) as similarity
          FROM manuscripts
          WHERE
            user_id = ${auth.userId}
            AND embedding IS NOT NULL
          ORDER BY similarity DESC
          LIMIT ${Math.min(parseInt(limit as string, 10), 50)}
        `;

        const results = semanticResults.rows.map(row => ({
          manuscript: {
            id: row.id,
            title: row.title,
            imageUrl: row.image_url,
            transcription: row.transcription,
            translation: '',
            analysis: row.analysis,
            visualAnalysis: row.visual_analysis,
            createdAt: row.created_at,
            status: row.status,
            calculatedRelations: []
          },
          similarity: row.similarity || 0
        }));

        console.log(`✅ Búsqueda semántica: ${results.length} resultados para usuario ${auth.email}`);

        return res.status(200).json({
          success: true,
          results,
          count: results.length,
          query,
          type: 'semantic'
        });

      } catch (embedError) {
        console.error('❌ Error en búsqueda semántica, usando textual:', embedError);
        // Fallback a búsqueda textual si falla la semántica
      }
    }

    // BÚSQUEDA TEXTUAL (tradicional)
    // Busca en: título, transcripción, resumen, palabras clave, entidades
    const textSearchResults = await sql`
      SELECT
        id,
        title,
        image_url,
        transcription,
        analysis,
        created_at,
        ts_rank(
          to_tsvector('spanish',
            COALESCE(title, '') || ' ' ||
            COALESCE(transcription, '') || ' ' ||
            COALESCE(analysis->>'summary'->>'value', '')
          ),
          plainto_tsquery('spanish', ${query})
        ) as rank
      FROM manuscripts
      WHERE
        user_id = ${auth.userId}
        AND (
          to_tsvector('spanish',
            COALESCE(title, '') || ' ' ||
            COALESCE(transcription, '') || ' ' ||
            COALESCE(analysis->>'summary'->>'value', '')
          ) @@ plainto_tsquery('spanish', ${query})
          OR title ILIKE ${`%${query}%`}
          OR transcription ILIKE ${`%${query}%`}
        )
      ORDER BY rank DESC, created_at DESC
      LIMIT ${Math.min(parseInt(limit as string, 10), 50)}
    `;

    const results = textSearchResults.rows.map(row => ({
      id: row.id,
      title: row.title,
      imageUrl: row.image_url,
      transcription: row.transcription?.substring(0, 200) + '...',
      analysis: row.analysis,
      createdAt: row.created_at,
      relevance: row.rank || 0
    }));

    console.log(`✅ Encontrados ${results.length} resultados para usuario ${auth.email}`);

    return res.status(200).json({
      success: true,
      results,
      count: results.length,
      query
    });

  } catch (error: any) {
    console.error('❌ Error en búsqueda:', error);
    return res.status(500).json({
      error: 'Error al realizar búsqueda',
      message: error.message
    });
  }
}

export default requireAuth(searchManuscriptsHandler);
