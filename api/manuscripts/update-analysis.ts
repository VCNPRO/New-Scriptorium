import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAuth } from '../../api/lib/auth'; // Adjust path as needed
import { ManuscriptDB } from '../../api/lib/db'; // Adjust path as needed

async function updateAnalysisHandler(req: VercelRequest, res: VercelResponse, auth: any) {
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
    const { manuscriptId, field, newValue } = req.body;

    if (!manuscriptId || !field || newValue === undefined) {
      return res.status(400).json({ error: 'Faltan parámetros: manuscriptId, field, newValue' });
    }

    const manuscript = await ManuscriptDB.findById(manuscriptId);

    if (!manuscript) {
      return res.status(404).json({ error: 'Manuscrito no encontrado' });
    }

    if (manuscript.user_id !== auth.userId) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    let updatedAnalysis = manuscript.analysis || {};
    // Ensure the structure matches the new analysis schema {value: string, confidence: number}
    // For human corrections, confidence is 1.0
    const confidenceValue = 1.0;

    switch (field) {
      case 'titleSuggestion':
      case 'summary':
      case 'typology':
      case 'scriptType':
      case 'language':
      case 'suggestedSeries':
        updatedAnalysis[field] = { value: newValue, confidence: confidenceValue };
        break;
      // Add cases for other editable fields if needed in the future
      // case 'keywords':
      // case 'entities.people':
      default:
        return res.status(400).json({ error: 'Campo no editable o no soportado' });
    }
    
    const updatedManuscript = await ManuscriptDB.update(manuscriptId, { analysis: updatedAnalysis });

    return res.status(200).json({ success: true, manuscript: updatedManuscript });

  } catch (error: any) {
    console.error('❌ Error al actualizar análisis:', error);
    return res.status(500).json({
      error: 'Error interno del servidor al actualizar análisis',
      message: error.message,
    });
  }
}

export default requireAuth(updateAnalysisHandler);
