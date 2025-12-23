import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyToken } from '../lib/auth';
import { AuditDB } from '../lib/db';

/**
 * GET /api/audit/logs
 * Obtiene los registros de auditoría
 *
 * Query params:
 * - manuscriptId: UUID del manuscrito (opcional)
 * - limit: número de registros (default: 100)
 * - offset: offset para paginación (default: 0)
 * - startDate: fecha inicio ISO 8601 (opcional)
 * - endDate: fecha fin ISO 8601 (opcional)
 * - action: tipo de acción específica (opcional)
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

    const {
      manuscriptId,
      limit = '100',
      offset = '0',
      startDate,
      endDate,
      action,
    } = req.query;

    let logs: any[] = [];

    // Get logs by manuscript ID
    if (manuscriptId && typeof manuscriptId === 'string') {
      logs = await AuditDB.findByManuscriptId(manuscriptId, parseInt(limit as string));
    }
    // Get logs by date range
    else if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      logs = await AuditDB.findByDateRange(start, end, user.role === 'admin' ? undefined : user.id);
    }
    // Get logs by action
    else if (action && typeof action === 'string') {
      logs = await AuditDB.findByAction(action, parseInt(limit as string));
    }
    // Get recent logs (default)
    else {
      logs = await AuditDB.findRecent(
        parseInt(limit as string),
        user.role === 'admin' ? undefined : user.id
      );
    }

    return res.status(200).json({
      success: true,
      logs,
      count: logs.length,
    });
  } catch (error: any) {
    console.error('❌ Error obteniendo logs:', error);
    return res.status(500).json({
      error: 'Error al obtener registros de auditoría',
      message: error.message,
    });
  }
}
