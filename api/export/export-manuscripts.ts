import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { requireAuth } from '../lib/auth';
import { ManuscriptDB } from '../lib/db';

// Helper function to escape CSV fields
const escapeCsvField = (field: any): string => {
  if (field === null || field === undefined) {
    return '';
  }
  const str = String(field);
  // If the field contains a comma, double quote, or newline, wrap it in double quotes.
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    // Escape existing double quotes by doubling them
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// Helper to flatten the analysis object for CSV
const flattenForCsv = (doc: ManuscriptDB) => {
  const analysis = doc.analysis || {};
  const entities = analysis.entities || {};
  
  return {
    id: doc.id,
    title: doc.title,
    created_at: doc.created_at.toISOString(),
    image_url: doc.image_url,
    typology: analysis.typology?.value || '',
    suggested_series: analysis.suggestedSeries?.value || '',
    language: analysis.language?.value || '',
    summary: analysis.summary?.value || '',
    people: (entities.people || []).map((p: any) => p.value).join('; '),
    locations: (entities.locations || []).map((l: any) => l.value).join('; '),
    keywords: (analysis.keywords || []).map((k: any) => k.value).join('; '),
    transcription: doc.transcription,
  };
};

async function exportHandler(req: VercelRequest, res: VercelResponse, auth: any) {
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
    const { documentIds, format = 'json' } = req.body;

    if (!Array.isArray(documentIds) || documentIds.length === 0) {
      return res.status(400).json({ error: 'Se requiere un array de documentIds' });
    }

    const manuscripts = await sql<ManuscriptDB>`
      SELECT * FROM manuscripts
      WHERE id = ANY(${documentIds}) AND user_id = ${auth.userId}
    `;

    if (manuscripts.rows.length === 0) {
        return res.status(404).json({ error: 'No se encontraron documentos para exportar.' });
    }
    
    const now = new Date().toISOString().split('T')[0];
    let fileName = `export_scriptorium_${now}`;
    let fileContent = '';

    if (format === 'json') {
      fileName += '.json';
      res.setHeader('Content-Type', 'application/json');
      fileContent = JSON.stringify(manuscripts.rows, null, 2);
    } else if (format === 'csv') {
      fileName += '.csv';
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      
      const flatData = manuscripts.rows.map(flattenForCsv);
      const headers = Object.keys(flatData[0]);
      
      const headerRow = headers.map(escapeCsvField).join(',');
      const dataRows = flatData.map(row => 
        headers.map(header => escapeCsvField(row[header as keyof typeof row])).join(',')
      );
      
      fileContent = [headerRow, ...dataRows].join('\n');

    } else {
      return res.status(400).json({ error: 'Formato no soportado. Use "json" o "csv".' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.status(200).send(fileContent);

  } catch (error: any) {
    console.error('❌ Error durante la exportación:', error);
    return res.status(500).json({
      error: 'Error interno del servidor al exportar datos',
      message: error.message,
    });
  }
}

export default requireAuth(exportHandler);
