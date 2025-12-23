import { AuditDB } from './db';
import type { VercelRequest } from '@vercel/node';

/**
 * Helper function to log audit events
 */
export async function logAudit(data: {
  action: string;
  userId?: string | null;
  manuscriptId?: string | null;
  changes?: any;
  metadata?: any;
  req?: VercelRequest;
}) {
  try {
    const ipAddress = data.req
      ? (data.req.headers['x-forwarded-for'] as string) ||
        (data.req.headers['x-real-ip'] as string) ||
        null
      : null;

    const userAgent = data.req?.headers['user-agent'] || null;

    await AuditDB.create({
      manuscript_id: data.manuscriptId,
      user_id: data.userId,
      action: data.action,
      ip_address: ipAddress,
      user_agent: userAgent,
      changes: data.changes || {},
      metadata: data.metadata || {},
    });
  } catch (error) {
    // Log error but don't fail the main operation
    console.error('❌ Error logging audit:', error);
  }
}

/**
 * Action types for audit logging
 */
export const AuditActions = {
  // Document actions
  DOCUMENT_UPLOAD: 'DOCUMENT_UPLOAD',
  DOCUMENT_DELETE: 'DOCUMENT_DELETE',
  DOCUMENT_EXPORT: 'DOCUMENT_EXPORT',
  DOCUMENT_VIEW: 'DOCUMENT_VIEW',

  // Transcription actions
  TRANSCRIPTION_CREATE: 'TRANSCRIPTION_CREATE',
  TRANSCRIPTION_EDIT: 'TRANSCRIPTION_EDIT',

  // Translation actions
  TRANSLATION_CREATE: 'TRANSLATION_CREATE',

  // Analysis actions
  ANALYSIS_RUN: 'ANALYSIS_RUN',
  ANALYSIS_EDIT: 'ANALYSIS_EDIT',

  // Metadata actions
  METADATA_EDIT: 'METADATA_EDIT',

  // User actions
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_REGISTER: 'USER_REGISTER',

  // Admin actions
  USER_ROLE_CHANGE: 'USER_ROLE_CHANGE',
  USER_DELETE: 'USER_DELETE',

  // Search actions
  SEARCH_SEMANTIC: 'SEARCH_SEMANTIC',
  SEARCH_TEXT: 'SEARCH_TEXT',
};

/**
 * Format changes object for better readability in audit logs
 */
export function formatChanges(before: any, after: any, field?: string) {
  if (field) {
    return {
      field,
      before,
      after,
    };
  }

  return {
    before,
    after,
  };
}
