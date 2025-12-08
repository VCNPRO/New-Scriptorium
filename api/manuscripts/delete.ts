import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ManuscriptDB } from '../lib/db';
import { requireAuth } from '../lib/auth';

async function deleteManuscriptHandler(req: VercelRequest, res: VercelResponse, auth: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID requerido' });
    }

    // Verificar que el manuscrito pertenece al usuario
    const existing = await ManuscriptDB.findById(id as string);
    if (!existing) {
      return res.status(404).json({ error: 'Manuscrito no encontrado' });
    }

    if (existing.user_id !== auth.userId) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este manuscrito' });
    }

    await ManuscriptDB.delete(id as string);

    return res.status(200).json({
      success: true,
      message: 'Manuscrito eliminado exitosamente'
    });
  } catch (error: any) {
    console.error('Error eliminando manuscrito:', error);
    return res.status(500).json({
      error: 'Error al eliminar manuscrito',
      message: error.message
    });
  }
}

export default requireAuth(deleteManuscriptHandler);
