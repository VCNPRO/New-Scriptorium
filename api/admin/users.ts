import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAuth } from '../lib/auth';
import { UserDB } from '../lib/db';

async function getUsersHandler(req: VercelRequest, res: VercelResponse, auth: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // This endpoint is for admins only
  if (auth.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren privilegios de administrador.' });
  }

  try {
    const users = await UserDB.findAll();
    return res.status(200).json({ success: true, users });
  } catch (error: any) {
    console.error('❌ Error al obtener usuarios:', error);
    return res.status(500).json({
      error: 'Error interno del servidor al obtener usuarios',
      message: error.message,
    });
  }
}

export default requireAuth(getUsersHandler);
