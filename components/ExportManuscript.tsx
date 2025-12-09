import React, { useState } from 'react';
import { Icons } from './Icons';
import { Manuscript } from '../types';

interface ExportManuscriptProps {
  manuscript: Manuscript;
}

export const ExportManuscript: React.FC<ExportManuscriptProps> = ({ manuscript }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const exportToJSON = () => {
    setIsExporting(true);
    try {
      const data = {
        title: manuscript.title,
        transcription: manuscript.transcription,
        translation: manuscript.translation,
        analysis: manuscript.analysis,
        visualAnalysis: manuscript.visualAnalysis,
        createdAt: manuscript.createdAt,
        metadata: {
          exportedAt: new Date().toISOString(),
          version: '1.0',
          source: 'Scriptorium',
        },
      };

      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${manuscript.title.replace(/[^a-z0-9]/gi, '_')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowMenu(false);
    } catch (error) {
      console.error('Error exportando a JSON:', error);
      alert('Error al exportar el manuscrito a JSON');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToTXT = () => {
    setIsExporting(true);
    try {
      let content = `${manuscript.title}\n`;
      content += '='.repeat(manuscript.title.length) + '\n\n';

      if (manuscript.analysis?.typology?.value) {
        content += `Tipo de Documento: ${manuscript.analysis.typology.value}\n`;
      }
      if (manuscript.analysis?.language?.value) {
        content += `Idioma: ${manuscript.analysis.language.value}\n`;
      }
      if (manuscript.createdAt) {
        content += `Fecha de Procesamiento: ${new Date(manuscript.createdAt).toLocaleString('es-ES')}\n`;
      }

      content += '\n' + '-'.repeat(80) + '\n';
      content += 'TRANSCRIPCIÓN\n';
      content += '-'.repeat(80) + '\n\n';
      content += manuscript.transcription + '\n\n';

      if (manuscript.translation) {
        content += '-'.repeat(80) + '\n';
        content += 'TRADUCCIÓN\n';
        content += '-'.repeat(80) + '\n\n';
        content += manuscript.translation + '\n\n';
      }

      if (manuscript.analysis?.summary?.value) {
        content += '-'.repeat(80) + '\n';
        content += 'RESUMEN\n';
        content += '-'.repeat(80) + '\n\n';
        content += manuscript.analysis.summary.value + '\n\n';
      }

      if (manuscript.analysis?.entities) {
        content += '-'.repeat(80) + '\n';
        content += 'ENTIDADES DETECTADAS\n';
        content += '-'.repeat(80) + '\n\n';

        if (manuscript.analysis.entities.people?.length > 0) {
          content += 'Personas:\n';
          manuscript.analysis.entities.people.forEach((p) => {
            content += `  • ${p.value}\n`;
          });
          content += '\n';
        }

        if (manuscript.analysis.entities.locations?.length > 0) {
          content += 'Lugares:\n';
          manuscript.analysis.entities.locations.forEach((l) => {
            content += `  • ${l.value}\n`;
          });
          content += '\n';
        }

        if (manuscript.analysis.entities.dates?.length > 0) {
          content += 'Fechas:\n';
          manuscript.analysis.entities.dates.forEach((d) => {
            content += `  • ${d.value}\n`;
          });
          content += '\n';
        }
      }

      if (manuscript.analysis?.extractedTables && manuscript.analysis.extractedTables.length > 0) {
        content += '-'.repeat(80) + '\n';
        content += 'TABLAS EXTRAÍDAS\n';
        content += '-'.repeat(80) + '\n\n';

        manuscript.analysis.extractedTables.forEach((table, idx) => {
          content += `Tabla ${idx + 1}: ${table.title}\n`;
          content += table.headers.join(' | ') + '\n';
          content += '-'.repeat(table.headers.join(' | ').length) + '\n';
          table.rows.forEach((row) => {
            content += row.join(' | ') + '\n';
          });
          content += '\n';
        });
      }

      content += '\n' + '-'.repeat(80) + '\n';
      content += `Exportado desde Scriptorium el ${new Date().toLocaleString('es-ES')}\n`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${manuscript.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowMenu(false);
    } catch (error) {
      console.error('Error exportando a TXT:', error);
      alert('Error al exportar el manuscrito a TXT');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToMarkdown = () => {
    setIsExporting(true);
    try {
      let content = `# ${manuscript.title}\n\n`;

      if (manuscript.analysis?.typology?.value || manuscript.analysis?.language?.value) {
        content += '## Metadatos\n\n';
        if (manuscript.analysis?.typology?.value) {
          content += `- **Tipo de Documento:** ${manuscript.analysis.typology.value}\n`;
        }
        if (manuscript.analysis?.language?.value) {
          content += `- **Idioma:** ${manuscript.analysis.language.value}\n`;
        }
        if (manuscript.analysis?.scriptType?.value) {
          content += `- **Tipo de Escritura:** ${manuscript.analysis.scriptType.value}\n`;
        }
        if (manuscript.createdAt) {
          content += `- **Fecha de Procesamiento:** ${new Date(manuscript.createdAt).toLocaleString('es-ES')}\n`;
        }
        content += '\n';
      }

      content += '## Transcripción\n\n';
      content += manuscript.transcription + '\n\n';

      if (manuscript.translation) {
        content += '## Traducción\n\n';
        content += manuscript.translation + '\n\n';
      }

      if (manuscript.analysis?.summary?.value) {
        content += '## Resumen\n\n';
        content += manuscript.analysis.summary.value + '\n\n';
      }

      if (manuscript.analysis?.keywords && manuscript.analysis.keywords.length > 0) {
        content += '## Palabras Clave\n\n';
        manuscript.analysis.keywords.forEach((kw) => {
          content += `- ${kw.value}\n`;
        });
        content += '\n';
      }

      if (manuscript.analysis?.entities) {
        content += '## Entidades Detectadas\n\n';

        if (manuscript.analysis.entities.people?.length > 0) {
          content += '### Personas\n\n';
          manuscript.analysis.entities.people.forEach((p) => {
            content += `- ${p.value} (${(p.confidence * 100).toFixed(0)}%)\n`;
          });
          content += '\n';
        }

        if (manuscript.analysis.entities.locations?.length > 0) {
          content += '### Lugares\n\n';
          manuscript.analysis.entities.locations.forEach((l) => {
            content += `- ${l.value} (${(l.confidence * 100).toFixed(0)}%)\n`;
          });
          content += '\n';
        }

        if (manuscript.analysis.entities.dates?.length > 0) {
          content += '### Fechas\n\n';
          manuscript.analysis.entities.dates.forEach((d) => {
            content += `- ${d.value} (${(d.confidence * 100).toFixed(0)}%)\n`;
          });
          content += '\n';
        }
      }

      if (manuscript.analysis?.extractedTables && manuscript.analysis.extractedTables.length > 0) {
        content += '## Tablas Extraídas\n\n';

        manuscript.analysis.extractedTables.forEach((table, idx) => {
          content += `### ${table.title}\n\n`;
          content += '| ' + table.headers.join(' | ') + ' |\n';
          content += '|' + table.headers.map(() => ' --- ').join('|') + '|\n';
          table.rows.forEach((row) => {
            content += '| ' + row.join(' | ') + ' |\n';
          });
          content += '\n';
        });
      }

      content += '\n---\n\n';
      content += `*Exportado desde Scriptorium el ${new Date().toLocaleString('es-ES')}*\n`;

      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${manuscript.title.replace(/[^a-z0-9]/gi, '_')}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowMenu(false);
    } catch (error) {
      console.error('Error exportando a Markdown:', error);
      alert('Error al exportar el manuscrito a Markdown');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={isExporting}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-display font-bold text-sm transition-all shadow-md ${
          isExporting
            ? 'bg-wood-800/50 text-parchment-100/50 cursor-not-allowed'
            : 'bg-copper-600 hover:bg-copper-700 text-parchment-100'
        }`}
      >
        {isExporting ? (
          <>
            <div className="w-4 h-4 border-2 border-parchment-100 border-t-transparent rounded-full animate-spin" />
            Exportando...
          </>
        ) : (
          <>
            <Icons.Save className="w-4 h-4" />
            Exportar Manuscrito
          </>
        )}
      </button>

      {showMenu && !isExporting && (
        <div className="absolute right-0 mt-2 w-64 bg-parchment-100 border-2 border-wood-800/20 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="bg-wood-900/5 px-4 py-2 border-b border-wood-800/10">
            <p className="font-display font-bold text-xs uppercase text-wood-800">Selecciona formato</p>
          </div>

          <div className="p-2">
            <button
              onClick={exportToJSON}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-copper-100 transition-colors text-left"
            >
              <Icons.File className="w-4 h-4 text-copper-700" />
              <div>
                <p className="font-display font-bold text-sm text-wood-900">JSON</p>
                <p className="text-xs text-wood-800/60">Datos completos + metadatos</p>
              </div>
            </button>

            <button
              onClick={exportToTXT}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-copper-100 transition-colors text-left"
            >
              <Icons.File className="w-4 h-4 text-copper-700" />
              <div>
                <p className="font-display font-bold text-sm text-wood-900">TXT</p>
                <p className="text-xs text-wood-800/60">Texto plano sin formato</p>
              </div>
            </button>

            <button
              onClick={exportToMarkdown}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-copper-100 transition-colors text-left"
            >
              <Icons.File className="w-4 h-4 text-copper-700" />
              <div>
                <p className="font-display font-bold text-sm text-wood-900">Markdown</p>
                <p className="text-xs text-wood-800/60">Formato con tablas y estilos</p>
              </div>
            </button>
          </div>

          <div className="bg-wood-900/5 px-4 py-2 border-t border-wood-800/10">
            <p className="text-xs text-wood-800/50 italic">
              💡 Las tablas también se pueden exportar individualmente como CSV
            </p>
          </div>
        </div>
      )}

      {/* Overlay para cerrar el menú */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};
