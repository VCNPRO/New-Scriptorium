import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearAuthCookie } from '../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    // Limpiar cookie
    const cookie = clearAuthCookie();
    res.setHeader('Set-Cookie', cookie);

    return res.status(200).json({
      success: true,
      message: 'Sesión cerrada exitosamente',
    });
  } catch (error: any) {
    console.error('Error en logout:', error);
    return res.status(500).json({
      error: 'Error al cerrar sesión',
      message: error.message,
    });
  }
}
