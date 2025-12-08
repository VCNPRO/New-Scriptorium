import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ManuscriptDB } from '../lib/db';
import { requireAuth } from '../lib/auth';

async function listManuscriptsHandler(req: VercelRequest, res: VercelResponse, auth: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { limit = '100', offset = '0' } = req.query;

    const manuscripts = await ManuscriptDB.findByUserId(
      auth.userId,
      parseInt(limit as string, 10),
      parseInt(offset as string, 10)
    );

    return res.status(200).json({
      success: true,
      manuscripts,
      count: manuscripts.length
    });
  } catch (error: any) {
    console.error('Error listando manuscritos:', error);
    return res.status(500).json({
      error: 'Error al listar manuscritos',
      message: error.message
    });
  }
}

export default requireAuth(listManuscriptsHandler);
