import React, { useState } from 'react';
import { Card, Button } from './ui';
import { Icons } from './Icons';

interface TableData {
  tableNumber: number;
  type: string;
  rows: number;
  columns: number;
  headers: string[];
  data: string[][];
  notes?: string;
}

interface TableExtractionProps {
  imageUrl: string;
  mimeType?: string;
  onTablesExtracted?: (tables: TableData[]) => void;
}

export const TableExtraction: React.FC<TableExtractionProps> = ({
  imageUrl,
  mimeType = 'image/jpeg',
  onTablesExtracted
}) => {
  const [loading, setLoading] = useState(false);
  const [hasTables, setHasTables] = useState<boolean | null>(null);
  const [tables, setTables] = useState<TableData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const extractTables = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/extract-tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          imageUrl,
          mimeType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al extraer tablas');
      }

      setHasTables(data.hasTables);
      setTables(data.tables || []);

      if (onTablesExtracted && data.tables) {
        onTablesExtracted(data.tables);
      }

    } catch (err: any) {
      console.error('Error extrayendo tablas:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyAsCSV = (table: TableData) => {
    const csv = [
      table.headers.join(','),
      ...table.data.map(row => row.join(','))
    ].join('\n');

    navigator.clipboard.writeText(csv);
    alert('¡Tabla copiada como CSV!');
  };

  const copyAsJSON = (table: TableData) => {
    const json = JSON.stringify(table, null, 2);
    navigator.clipboard.writeText(json);
    alert('¡Tabla copiada como JSON!');
  };

  return (
    <div className="space-y-4">
      {/* Extraction button */}
      {hasTables === null && (
        <Card>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-copper-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="font-display font-bold text-lg text-wood-900 mb-2">
              Extracción de Tablas
            </h3>
            <p className="font-serif text-sm text-wood-800/70 mb-4">
              Detecta y extrae datos estructurados de tablas en el documento
            </p>
            <Button
              variant="primary"
              onClick={extractTables}
              disabled={loading}
              className="mx-auto"
            >
              {loading ? (
                <>
                  <Icons.Spinner className="w-4 h-4 mr-2 animate-spin" />
                  Analizando documento...
                </>
              ) : (
                <>
                  📊 Extraer Tablas con IA
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Error state */}
      {error && (
        <Card>
          <div className="text-center py-6">
            <p className="text-red-600 font-serif mb-4">❌ {error}</p>
            <Button variant="secondary" onClick={extractTables}>
              Reintentar
            </Button>
          </div>
        </Card>
      )}

      {/* No tables found */}
      {hasTables === false && (
        <Card>
          <div className="text-center py-6">
            <span className="text-4xl mb-3 block">📄</span>
            <p className="font-serif text-wood-800">
              No se detectaron tablas en este documento
            </p>
            <Button variant="ghost" onClick={extractTables} className="mt-4">
              Volver a analizar
            </Button>
          </div>
        </Card>
      )}

      {/* Tables found */}
      {hasTables && tables.length > 0 && (
        <div className="space-y-6">
          {tables.map((table, index) => (
            <Card key={index} title={`📊 Tabla ${table.tableNumber}: ${table.type}`}>
              <div className="space-y-4">
                {/* Table metadata */}
                <div className="flex items-center gap-6 text-sm font-serif text-wood-800/70">
                  <span>📐 Dimensiones: {table.rows} filas × {table.columns} columnas</span>
                  <span>📋 Tipo: {table.type}</span>
                </div>

                {/* Table display */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-wood-800/20">
                    {/* Headers */}
                    {table.headers && table.headers.length > 0 && (
                      <thead>
                        <tr className="bg-copper-100">
                          {table.headers.map((header, i) => (
                            <th
                              key={i}
                              className="border border-wood-800/20 px-3 py-2 text-left font-display font-bold text-wood-900"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    {/* Data rows */}
                    <tbody>
                      {table.data.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={rowIndex % 2 === 0 ? 'bg-parchment-100' : 'bg-parchment-200/50'}
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border border-wood-800/20 px-3 py-2 font-serif text-wood-900"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Notes */}
                {table.notes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-3">
                    <p className="text-sm font-serif text-yellow-900">
                      <strong>Notas:</strong> {table.notes}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => copyAsCSV(table)}>
                    📄 Copiar como CSV
                  </Button>
                  <Button variant="secondary" onClick={() => copyAsJSON(table)}>
                    🔧 Copiar como JSON
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <div className="text-center">
            <Button variant="ghost" onClick={extractTables}>
              🔄 Volver a extraer tablas
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
