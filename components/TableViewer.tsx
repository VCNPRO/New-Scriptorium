import React, { useState } from 'react';
import { Icons } from './Icons';

interface ExtractedTable {
  title: string;
  headers: string[];
  rows: string[][];
  confidence: number;
}

interface TableViewerProps {
  tables: ExtractedTable[];
}

export const TableViewer: React.FC<TableViewerProps> = ({ tables }) => {
  const [expandedTable, setExpandedTable] = useState<number | null>(null);

  if (!tables || tables.length === 0) {
    return null;
  }

  const exportTableToCSV = (table: ExtractedTable) => {
    const csvRows = [];

    // Añadir encabezados
    csvRows.push(table.headers.map(h => `"${h}"`).join(','));

    // Añadir filas
    table.rows.forEach(row => {
      csvRows.push(row.map(cell => `"${cell}"`).join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${table.title.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyTableToClipboard = (table: ExtractedTable) => {
    const text = [
      table.headers.join('\t'),
      ...table.rows.map(row => row.join('\t'))
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      alert('Tabla copiada al portapapeles (formato compatible con Excel)');
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold uppercase text-wood-800/60 flex items-center gap-2">
          📊 Tablas Extraídas ({tables.length})
        </h4>
      </div>

      {tables.map((table, tableIndex) => (
        <div
          key={tableIndex}
          className="bg-white border-2 border-wood-800/10 rounded-lg overflow-hidden shadow-sm"
        >
          {/* Header de la tabla */}
          <div className="bg-parchment-200/50 px-4 py-3 border-b border-wood-800/10">
            <div className="flex items-center justify-between mb-2">
              <div
                className="flex items-center gap-3 flex-1 cursor-pointer hover:text-copper-700 transition-colors"
                onClick={() => setExpandedTable(expandedTable === tableIndex ? null : tableIndex)}
              >
                <span className="text-lg text-copper-600">
                  {expandedTable === tableIndex ? '▼' : '▶'}
                </span>
                <div>
                  <h5 className="font-display font-bold text-wood-900">
                    {table.title || `Tabla ${tableIndex + 1}`}
                  </h5>
                  <p className="text-xs text-wood-800/60">
                    {table.headers.length} columnas × {table.rows.length} filas
                    {' • '}
                    Confianza: {(table.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Botones siempre visibles */}
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => copyTableToClipboard(table)}
                  className="px-3 py-1.5 bg-copper-100 hover:bg-copper-200 text-copper-800 text-xs font-bold rounded transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Copiar tabla al portapapeles (compatible con Excel)"
                >
                  <Icons.File className="w-4 h-4" />
                  Copiar
                </button>
                <button
                  onClick={() => exportTableToCSV(table)}
                  className="px-3 py-1.5 bg-wood-800 hover:bg-wood-700 text-parchment-100 text-xs font-bold rounded transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Descargar tabla como archivo CSV"
                >
                  <Icons.Save className="w-4 h-4" />
                  CSV
                </button>
              </div>
            </div>

            {/* Indicador para expandir/colapsar */}
            {!expandedTable || expandedTable !== tableIndex ? (
              <div className="text-xs text-wood-800/40 italic flex items-center gap-1 ml-8">
                <span>👉</span>
                Haz clic en el título para ver la tabla completa
              </div>
            ) : null}
          </div>

          {/* Contenido de la tabla */}
          {expandedTable === tableIndex && (
            <div className="p-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-wood-800/5">
                    {table.headers.map((header, i) => (
                      <th
                        key={i}
                        className="border border-wood-800/20 px-3 py-2 text-left font-display font-bold text-wood-900 text-xs uppercase tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? 'bg-parchment-100/30' : 'bg-white'}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-wood-800/10 px-3 py-2 font-serif text-wood-800"
                        >
                          {cell || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Info adicional */}
              <div className="mt-3 pt-3 border-t border-wood-800/10">
                <p className="text-xs text-wood-800/50 italic">
                  💡 Haz clic en "Copiar" para pegar en Excel o "CSV" para descargar archivo
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
