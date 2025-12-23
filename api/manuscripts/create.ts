import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ManuscriptDB } from '../lib/db';
import { requireAuth } from '../lib/auth';
import { logAudit, AuditActions } from '../lib/audit';

async function createManuscriptHandler(req: VercelRequest, res: VercelResponse, auth: any) {
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
    const { title, imageUrl, transcription, translation, analysis, visualAnalysis } = req.body;

    if (!title || !imageUrl || !transcription) {
      return res.status(400).json({ error: 'Título, imagen y transcripción son requeridos' });
    }

    const manuscript = await ManuscriptDB.create({
      user_id: auth.userId,
      title,
      image_url: imageUrl,
      transcription,
      analysis,
      visual_analysis: visualAnalysis
    });

    // Log audit event
    await logAudit({
      action: AuditActions.DOCUMENT_UPLOAD,
      userId: auth.userId,
      manuscriptId: manuscript.id,
      metadata: {
        title: manuscript.title,
        imageSize: imageUrl.length,
        transcriptionLength: transcription.length,
        hasAnalysis: !!analysis,
        hasVisualAnalysis: !!visualAnalysis,
      },
      req,
    });

    return res.status(201).json({
      success: true,
      manuscript
    });
  } catch (error: any) {
    console.error('Error creando manuscrito:', error);
    return res.status(500).json({
      error: 'Error al crear manuscrito',
      message: error.message
    });
  }
}

export default requireAuth(createManuscriptHandler);
