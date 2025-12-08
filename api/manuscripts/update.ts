import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ManuscriptDB } from '../lib/db';
import { requireAuth } from '../lib/auth';

async function updateManuscriptHandler(req: VercelRequest, res: VercelResponse, auth: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { id } = req.query;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID requerido' });
    }

    // Verificar que el manuscrito pertenece al usuario
    const existing = await ManuscriptDB.findById(id as string);
    if (!existing) {
      return res.status(404).json({ error: 'Manuscrito no encontrado' });
    }

    if (existing.user_id !== auth.userId) {
      return res.status(403).json({ error: 'No tienes permiso para editar este manuscrito' });
    }

    const manuscript = await ManuscriptDB.update(id as string, updates);

    return res.status(200).json({
      success: true,
      manuscript
    });
  } catch (error: any) {
    console.error('Error actualizando manuscrito:', error);
    return res.status(500).json({
      error: 'Error al actualizar manuscrito',
      message: error.message
    });
  }
}

export default requireAuth(updateManuscriptHandler);
