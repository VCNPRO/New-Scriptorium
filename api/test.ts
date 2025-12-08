import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    success: true,
    message: 'API funciona correctamente',
    timestamp: new Date().toISOString(),
    env: {
      hasPostgres: !!process.env.POSTGRES_URL,
      hasGoogleKey: !!process.env.GOOGLE_API_KEY,
      hasJWT: !!process.env.JWT_SECRET
    }
  });
}
