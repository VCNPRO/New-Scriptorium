import type { VercelRequest, VercelResponse } from '@vercel/node';
import { UserDB } from '../lib/db';
import { verifyRequestAuth } from '../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    // Verificar token
    const auth = verifyRequestAuth(req);
    if (!auth) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    // Obtener datos frescos del usuario desde la BD
    const user = await UserDB.findById(auth.userId);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organization: user.organization,
        created_at: user.created_at,
      },
    });
  } catch (error: any) {
    console.error('Error en verify:', error);
    return res.status(500).json({
      error: 'Error al verificar sesión',
      message: error.message,
    });
  }
}
