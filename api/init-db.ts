import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initDB } from './lib/db';

/**
 * Endpoint para inicializar la base de datos
 * Solo debe ejecutarse una vez durante el setup inicial
 *
 * Uso: GET /api/init-db?secret=YOUR_SECRET
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Proteger con secret
  const { secret } = req.query;

  if (secret !== process.env.INIT_DB_SECRET) {
    return res.status(403).json({
      error: 'No autorizado',
      message: 'INIT_DB_SECRET incorrecto o no proporcionado'
    });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    console.log('🔄 Inicializando base de datos...');
    await initDB();

    return res.status(200).json({
      success: true,
      message: '✅ Base de datos inicializada correctamente',
      tables: ['users', 'manuscripts'],
      indexes: [
        'idx_manuscripts_user_id',
        'idx_manuscripts_status',
        'idx_manuscripts_created_at',
        'idx_manuscripts_embedding'
      ]
    });
  } catch (error: any) {
    console.error('❌ Error inicializando BD:', error);
    return res.status(500).json({
      error: 'Error al inicializar base de datos',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
