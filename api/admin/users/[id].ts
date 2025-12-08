import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAuth } from '../../lib/auth';
import { UserDB } from '../../lib/db';

async function updateUserHandler(req: VercelRequest, res: VercelResponse, auth: any) {
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

  // This endpoint is for admins only
  if (auth.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren privilegios de administrador.' });
  }

  try {
    const { id } = req.query;
    const { role } = req.body;

    if (typeof id !== 'string') {
        return res.status(400).json({ error: 'ID de usuario no válido.' });
    }

    if (!role || !['user', 'researcher', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Rol no válido.' });
    }
    
    const updatedUser = await UserDB.updateRole(id, role);

    if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    return res.status(200).json({ success: true, user: updatedUser });

  } catch (error: any) {
    console.error('❌ Error al actualizar rol de usuario:', error);
    return res.status(500).json({
      error: 'Error interno del servidor al actualizar rol',
      message: error.message,
    });
  }
}

export default requireAuth(updateUserHandler);
