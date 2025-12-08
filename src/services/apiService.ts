const API_BASE = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:3000/api';

// Helper para hacer requests autenticados
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || error.message || 'Error en la solicitud');
  }

  return response.json();
}

// AI Services (Proxy seguro)
export const aiService = {
  async transcribe(imageBase64: string) {
    return authenticatedFetch(`${API_BASE}/ai/transcribe`, {
      method: 'POST',
      body: JSON.stringify({ imageBase64 }),
    });
  },

  async analyze(text: string) {
    return authenticatedFetch(`${API_BASE}/ai/analyze`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },

  async translate(text: string, targetLang: string = 'es') {
    return authenticatedFetch(`${API_BASE}/ai/translate`, {
      method: 'POST',
      body: JSON.stringify({ text, targetLang }),
    });
  },
};

// Manuscript Services (CRUD)
export const manuscriptService = {
  async create(data: {
    title: string;
    imageUrl: string;
    transcription: string;
    translation?: string;
    analysis?: any;
    visualAnalysis?: any;
  }) {
    return authenticatedFetch(`${API_BASE}/manuscripts/create`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async list(limit: number = 100, offset: number = 0) {
    return authenticatedFetch(`${API_BASE}/manuscripts/list?limit=${limit}&offset=${offset}`, {
      method: 'GET',
    });
  },

  async update(id: string, updates: any) {
    return authenticatedFetch(`${API_BASE}/manuscripts/update?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async delete(id: string) {
    return authenticatedFetch(`${API_BASE}/manuscripts/delete?id=${id}`, {
      method: 'DELETE',
    });
  },
};
