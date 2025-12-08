// Script to initialize database locally
const { sql } = require('@vercel/postgres');

async function initDB() {
  try {
    console.log('Iniciando base de datos...');

    // Create pgvector extension
    console.log('1. Creando extensión pgvector...');
    await sql`CREATE EXTENSION IF NOT EXISTS vector`;
    console.log('✓ Extensión pgvector creada');

    // Create users table
    console.log('2. Creando tabla users...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Tabla users creada');

    // Create manuscripts table
    console.log('3. Creando tabla manuscripts...');
    await sql`
      CREATE TABLE IF NOT EXISTS manuscripts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(500) NOT NULL,
        original_text TEXT,
        transcribed_text TEXT,
        language VARCHAR(50),
        century VARCHAR(50),
        location VARCHAR(255),
        description TEXT,
        image_url TEXT,
        ai_notes TEXT,
        embedding vector(768),
        metadata JSONB,
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Tabla manuscripts creada');

    // Create index for vector search
    console.log('4. Creando índice para búsqueda vectorial...');
    await sql`CREATE INDEX IF NOT EXISTS manuscripts_embedding_idx ON manuscripts USING ivfflat (embedding vector_cosine_ops)`;
    console.log('✓ Índice creado');

    console.log('\n✅ Base de datos inicializada correctamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  }
}

initDB();
