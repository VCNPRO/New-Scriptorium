import { sql } from '@vercel/postgres';

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  name: string | null;
  role: 'user' | 'admin' | 'researcher';
  created_at: Date;
  updated_at: Date;
}

export interface ManuscriptDB {
  id: string;
  user_id: string;
  title: string;
  image_url: string;
  transcription: string;
  translation: string | null;
  analysis: any; // JSON
  visual_analysis: any; // JSON
  status: 'pending' | 'processing' | 'completed' | 'error';
  is_duplicate_of: string | null;
  related_manuscript_ids: string[] | null;
  calculated_relations: any | null; // JSON
  embedding: number[] | null; // Vector para búsqueda semántica
  created_at: Date;
  updated_at: Date;
}

// User Database Operations
export const UserDB = {
  async create(email: string, passwordHash: string, name: string, role: string = 'user') {
    const result = await sql<User>`
      INSERT INTO users (email, password_hash, name, role)
      VALUES (${email.toLowerCase()}, ${passwordHash}, ${name}, ${role})
      RETURNING id, email, name, role, created_at, updated_at
    `;
    return result.rows[0];
  },

  async findByEmail(email: string) {
    const result = await sql<User>`
      SELECT * FROM users WHERE email = ${email.toLowerCase()} LIMIT 1
    `;
    return result.rows[0] || null;
  },

  async findById(id: string) {
    const result = await sql<User>`
      SELECT id, email, name, role, created_at, updated_at
      FROM users WHERE id = ${id} LIMIT 1
    `;
    return result.rows[0] || null;
  },

  async findAll() {
    const result = await sql<User>`
      SELECT id, email, name, role, created_at, updated_at
      FROM users ORDER BY created_at DESC
    `;
    return result.rows;
  },

  async updateRole(id: string, role: 'user' | 'admin' | 'researcher') {
    const result = await sql<User>`
      UPDATE users
      SET role = ${role}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, email, name, role, created_at, updated_at
    `;
    return result.rows[0] || null;
  },

  async update(id: string, updates: Partial<User>) {
    const setClauses: string[] = [];
    const values: any[] = [];

    if (updates.name !== undefined) {
      setClauses.push(`name = $${values.length + 1}`);
      values.push(updates.name);
    }

    if (setClauses.length === 0) return null;

    values.push(id);
    const query = `
      UPDATE users
      SET ${setClauses.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length}
      RETURNING id, email, name, role, organization, created_at, updated_at
    `;

    const result = await sql.query(query, values);
    return result.rows[0] || null;
  }
};

// Manuscript Database Operations
export const ManuscriptDB = {
  async create(data: {
    user_id: string;
    title: string;
    image_url: string;
    transcription: string;
    analysis?: any;
    visual_analysis?: any;
  }) {
    const result = await sql<ManuscriptDB>`
      INSERT INTO manuscripts (
        user_id, title, image_url, transcription, analysis, visual_analysis, status
      )
      VALUES (
        ${data.user_id},
        ${data.title},
        ${data.image_url},
        ${data.transcription},
        ${JSON.stringify(data.analysis || null)},
        ${JSON.stringify(data.visual_analysis || null)},
        'completed'
      )
      RETURNING *
    `;
    return result.rows[0];
  },

  async findById(id: string) {
    const result = await sql<ManuscriptDB>`
      SELECT * FROM manuscripts WHERE id = ${id} LIMIT 1
    `;
    return result.rows[0] || null;
  },

  async findByUserId(userId: string, limit: number = 100, offset: number = 0) {
    const result = await sql<ManuscriptDB>`
      SELECT * FROM manuscripts
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    return result.rows;
  },

  async update(id: string, updates: Partial<ManuscriptDB>) {
    const result = await sql<ManuscriptDB>`
      UPDATE manuscripts
      SET
        title = COALESCE(${updates.title || null}, title),
        transcription = COALESCE(${updates.transcription || null}, transcription),
        translation = COALESCE(${updates.translation || null}, translation),
        analysis = COALESCE(${updates.analysis ? JSON.stringify(updates.analysis) : null}, analysis),
        visual_analysis = COALESCE(${updates.visual_analysis ? JSON.stringify(updates.visual_analysis) : null}, visual_analysis),
        status = COALESCE(${updates.status || null}, status),
        embedding = COALESCE(${updates.embedding || null}, embedding),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0] || null;
  },

  async delete(id: string) {
    await sql`DELETE FROM manuscripts WHERE id = ${id}`;
    return true;
  },

  async semanticSearch(embedding: number[], userId: string, limit: number = 10) {
    // Vector similarity search usando cosine similarity
    const result = await sql`
      SELECT
        *,
        (1 - (embedding <=> ${JSON.stringify(embedding)}::vector)) as similarity
      FROM manuscripts
      WHERE user_id = ${userId} AND embedding IS NOT NULL
      ORDER BY similarity DESC
      LIMIT ${limit}
    `;
    return result.rows;
  }
};

// Initialize database tables (run once)
export async function initDB() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        organization VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create manuscripts table with vector support
    await sql`
      CREATE TABLE IF NOT EXISTS manuscripts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        image_url TEXT NOT NULL,
        transcription TEXT NOT NULL,
        translation TEXT,
        analysis JSONB,
        visual_analysis JSONB,
        status VARCHAR(50) DEFAULT 'pending',
        is_duplicate_of UUID REFERENCES manuscripts(id),
        related_manuscript_ids UUID[],
        calculated_relations JSONB,
        embedding vector(768),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_manuscripts_user_id ON manuscripts(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_manuscripts_status ON manuscripts(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_manuscripts_created_at ON manuscripts(created_at DESC)`;

    // Vector similarity index (requires pgvector extension)
    try {
      await sql`CREATE EXTENSION IF NOT EXISTS vector`;
      await sql`CREATE INDEX IF NOT EXISTS idx_manuscripts_embedding ON manuscripts USING ivfflat (embedding vector_cosine_ops)`;
    } catch (e) {
      console.warn('pgvector extension not available, semantic search will be limited');
    }

    console.log('✅ Database initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}
