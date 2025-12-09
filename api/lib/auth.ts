import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { serialize, parse } from 'cookie';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const SALT_ROUNDS = 12;

export interface AuthPayload {
  userId: string;
  email: string;
  role: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate JWT token
export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    return null;
  }
}

// Get token from request (cookie or Authorization header)
export function getTokenFromRequest(req: VercelRequest | Request): string | null {
  // Try to get from cookie first (more secure)
  let cookieHeader: string | null = null;
  let authHeader: string | null = null;

  if ('headers' in req && typeof req.headers.get === 'function') {
    // Standard Request object
    cookieHeader = req.headers.get('cookie');
    authHeader = req.headers.get('Authorization');
  } else if ('headers' in req && typeof req.headers === 'object') {
    // VercelRequest object
    cookieHeader = (req.headers as any)['cookie'] || (req.headers as any)['Cookie'];
    authHeader = (req.headers as any)['authorization'] || (req.headers as any)['Authorization'];
  }

  if (cookieHeader) {
    const cookies = parse(cookieHeader);
    if (cookies['auth-token']) {
      return cookies['auth-token'];
    }
  }

  // Fallback to Authorization header
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '');
    return token || null;
  }

  return null;
}

// Verify request authentication
export function verifyRequestAuth(req: VercelRequest | Request): AuthPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

// Create auth cookie
export function createAuthCookie(token: string): string {
  return serialize('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

// Clear auth cookie
export function clearAuthCookie(): string {
  return serialize('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// Middleware to require authentication
export function requireAuth(handler: (req: VercelRequest, res: VercelResponse, auth: AuthPayload) => Promise<VercelResponse | void>) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const auth = verifyRequestAuth(req);
    if (!auth) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    return handler(req, res, auth);
  };
}

// Middleware to require specific role
export function requireRole(role: string | string[], handler: (req: VercelRequest, res: VercelResponse, auth: AuthPayload) => Promise<VercelResponse | void>) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const auth = verifyRequestAuth(req);
    if (!auth) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(auth.role)) {
      return res.status(403).json({ error: 'Permisos insuficientes' });
    }

    return handler(req, res, auth);
  };
}
