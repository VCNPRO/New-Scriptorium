import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyToken } from '../lib/auth';
import { AuditDB } from '../lib/db';

/**
 * GET /api/audit/statistics
 * Obtiene estadísticas de auditoría
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Verify authentication
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    // Get statistics
    const stats = await AuditDB.getStatistics(
      user.role === 'admin' ? undefined : user.id
    );

    return res.status(200).json({
      success: true,
      statistics: stats,
    });
  } catch (error: any) {
    console.error('❌ Error obteniendo estadísticas:', error);
    return res.status(500).json({
      error: 'Error al obtener estadísticas de auditoría',
      message: error.message,
    });
  }
}
