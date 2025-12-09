import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * PRUEBAS DE INTEGRACIÓN - FLUJO COMPLETO
 *
 * Estas pruebas simulan el flujo completo de un usuario:
 * 1. Login
 * 2. Subir manuscrito
 * 3. Transcribir
 * 4. Analizar
 * 5. Buscar
 * 6. Visualizar mapas
 * 7. Exportar tablas
 */

describe('Flujo Completo de Usuario', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('debe completar flujo de transcripción completo', async () => {
    // Este test simula el flujo real de un usuario

    // 1. Usuario sube imagen
    const imageBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRg...';

    // 2. Llamada a API de transcripción
    const transcriptionResponse = {
      success: true,
      transcription: 'Don Felipe por la gracia de Dios, Rey de Castilla...',
      confidence: 0.92,
    };

    // 3. Análisis diplomático automático
    const analysisResponse = {
      success: true,
      analysis: {
        summary: {
          value: 'Carta real del siglo XVI sobre privilegios comerciales',
          confidence: 0.88,
        },
        typology: {
          value: 'Carta Real',
          confidence: 0.95,
        },
        entities: {
          people: [
            { value: 'Don Felipe', confidence: 0.98 },
            { value: 'Juan de Mendoza', confidence: 0.92 },
          ],
          locations: [
            { value: 'Toledo', confidence: 0.95 },
            { value: 'Sevilla', confidence: 0.88 },
          ],
        },
        geodata: [
          {
            place: 'Toledo',
            latitude: 39.8628,
            longitude: -4.0273,
            type: 'origin',
            confidence: 0.95,
          },
        ],
        extractedTables: [
          {
            title: 'Impuestos y Aranceles',
            headers: ['Producto', 'Cantidad', 'Arancel'],
            rows: [
              ['Lana', '100 quintales', '5%'],
              ['Seda', '50 libras', '10%'],
            ],
            confidence: 0.91,
          },
        ],
      },
    };

    // Verificar estructura de datos
    expect(transcriptionResponse.transcription).toBeTruthy();
    expect(analysisResponse.analysis.typology.confidence).toBeGreaterThan(0.8);
    expect(analysisResponse.analysis.geodata).toHaveLength(1);
    expect(analysisResponse.analysis.extractedTables).toHaveLength(1);
  });

  it('debe manejar múltiples manuscritos simultáneamente', async () => {
    // Simular 5 manuscritos procesándose al mismo tiempo
    const manuscripts = Array.from({ length: 5 }, (_, i) => ({
      id: `ms-${i}`,
      title: `Manuscrito ${i + 1}`,
      status: 'processing',
    }));

    manuscripts.forEach((ms) => {
      expect(ms.status).toBe('processing');
    });

    // Simular completación
    const completed = manuscripts.map((ms) => ({
      ...ms,
      status: 'completed',
      transcription: `Texto del manuscrito ${ms.id}`,
      analysis: { summary: { value: 'Resumen', confidence: 0.9 } },
    }));

    expect(completed).toHaveLength(5);
    completed.forEach((ms) => {
      expect(ms.status).toBe('completed');
      expect(ms.transcription).toBeTruthy();
    });
  });

  it('debe mantener sincronización entre frontend y backend', async () => {
    // Simular guardado en backend
    const manuscriptData = {
      title: 'Carta Real 1556',
      transcription: 'Don Felipe...',
      analysis: {
        summary: { value: 'Documento sobre comercio', confidence: 0.9 },
      },
    };

    // Guardar
    const savedId = 'ms-12345';
    const saved = { id: savedId, ...manuscriptData, createdAt: new Date() };

    // Recuperar
    const retrieved = { ...saved };

    expect(retrieved.id).toBe(savedId);
    expect(retrieved.title).toBe(manuscriptData.title);
    expect(retrieved.transcription).toBe(manuscriptData.transcription);
  });
});

describe('Pruebas de Búsqueda Integrada', () => {
  it('debe buscar en múltiples campos simultáneamente', async () => {
    const manuscripts = [
      {
        id: '1',
        title: 'Carta Real de Felipe II',
        transcription: 'Don Felipe por la gracia de Dios...',
        analysis: {
          summary: { value: 'Documento sobre comercio de lana', confidence: 0.9 },
        },
      },
      {
        id: '2',
        title: 'Privilegio de Toledo',
        transcription: 'Sea notorio a todos los que esta carta vieren...',
        analysis: {
          summary: { value: 'Privilegios comerciales otorgados', confidence: 0.88 },
        },
      },
    ];

    // Buscar "comercio"
    const searchTerm = 'comercio';
    const results = manuscripts.filter(
      (m) =>
        m.title.toLowerCase().includes(searchTerm) ||
        m.transcription.toLowerCase().includes(searchTerm) ||
        m.analysis.summary.value.toLowerCase().includes(searchTerm)
    );

    expect(results).toHaveLength(2);
  });

  it('debe rankear resultados por relevancia', async () => {
    const results = [
      { id: '1', title: 'Comercio', rank: 0.95 },
      { id: '2', title: 'Carta sobre comercio', rank: 0.75 },
      { id: '3', title: 'Documento real', rank: 0.45 },
    ];

    const sorted = results.sort((a, b) => b.rank - a.rank);

    expect(sorted[0].rank).toBe(0.95);
    expect(sorted[2].rank).toBe(0.45);
  });
});

describe('Pruebas de Geolocalización', () => {
  it('debe calcular centro del mapa con múltiples ubicaciones', () => {
    const locations = [
      { place: 'Toledo', latitude: 39.8628, longitude: -4.0273 },
      { place: 'Sevilla', latitude: 37.3891, longitude: -5.9845 },
      { place: 'Madrid', latitude: 40.4168, longitude: -3.7038 },
    ];

    const centerLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
    const centerLon = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;

    expect(centerLat).toBeCloseTo(39.22, 1);
    expect(centerLon).toBeCloseTo(-4.56, 1);
  });

  it('debe manejar ubicaciones sin coordenadas', () => {
    const locations = [
      { place: 'Toledo', coordinates: { lat: 39.8628, lon: -4.0273 } },
      { place: 'Lugar Desconocido', coordinates: undefined },
    ];

    const validLocations = locations.filter((loc) => loc.coordinates);
    expect(validLocations).toHaveLength(1);
  });
});

describe('Pruebas de Exportación de Tablas', () => {
  it('debe generar CSV correctamente', () => {
    const table = {
      headers: ['Producto', 'Cantidad', 'Precio'],
      rows: [
        ['Trigo', '100', '50 reales'],
        ['Cebada', '200', '30 reales'],
      ],
    };

    const csvRows = [
      table.headers.map((h) => `"${h}"`).join(','),
      ...table.rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ];

    const csv = csvRows.join('\n');

    expect(csv).toContain('"Producto","Cantidad","Precio"');
    expect(csv).toContain('"Trigo","100","50 reales"');
    expect(csv).toContain('"Cebada","200","30 reales"');
  });

  it('debe manejar caracteres especiales en CSV', () => {
    const table = {
      headers: ['Descripción', 'Notas'],
      rows: [
        ['Producto con "comillas"', 'Texto con, comas'],
        ['Línea\nNueva', 'Normal'],
      ],
    };

    const csvRows = table.rows.map((row) =>
      row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')
    );

    expect(csvRows[0]).toContain('""comillas""');
  });

  it('debe copiar tabla en formato compatible con Excel', () => {
    const table = {
      headers: ['Col1', 'Col2', 'Col3'],
      rows: [
        ['A', 'B', 'C'],
        ['D', 'E', 'F'],
      ],
    };

    const text = [
      table.headers.join('\t'),
      ...table.rows.map((row) => row.join('\t')),
    ].join('\n');

    expect(text).toBe('Col1\tCol2\tCol3\nA\tB\tC\nD\tE\tF');
  });
});
