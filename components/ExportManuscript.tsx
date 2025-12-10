import React, { useState } from 'react';
import { Icons } from './Icons';
import { Manuscript } from '../types';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { PDFPreview } from './PDFPreview';

interface ExportManuscriptProps {
  manuscript: Manuscript;
}

export const ExportManuscript: React.FC<ExportManuscriptProps> = ({ manuscript }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);

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

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

      const pageWidth = 595;
      const pageHeight = 842;
      const margin = 50;
      const maxWidth = pageWidth - 2 * margin;
      let yPosition = pageHeight - margin;
      let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);

      // Función para sanitizar texto y remover caracteres problemáticos
      const sanitizeText = (text: string): string => {
        if (!text) return '';
        // Remover caracteres que pdf-lib no puede manejar
        return text
          .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '')
          .replace(/[\u2018\u2019]/g, "'") // Comillas curvas simples
          .replace(/[\u201C\u201D]/g, '"') // Comillas curvas dobles
          .replace(/\u2026/g, '...') // Elipsis
          .replace(/[\u2013\u2014]/g, '-') // Guiones largos
          .trim();
      };

      const addText = (text: string, fontSize: number, font: any, color = rgb(0, 0, 0)) => {
        if (!text || text.trim() === '') return;

        const sanitized = sanitizeText(text);
        if (!sanitized) return;

        const lines = wrapText(sanitized, maxWidth, fontSize, font);

        for (const line of lines) {
          if (!line || line.trim() === '') continue;

          if (yPosition < margin + 50) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            yPosition = pageHeight - margin;
          }

          try {
            currentPage.drawText(line, {
              x: margin,
              y: yPosition,
              size: fontSize,
              font: font,
              color: color,
            });
          } catch (err) {
            console.warn('Error dibujando línea, omitiendo:', err);
          }

          yPosition -= fontSize + 4;
        }
      };

      const wrapText = (text: string, maxWidth: number, fontSize: number, font: any): string[] => {
        if (!text) return [];

        const allLines: string[] = [];
        // Primero dividir por saltos de línea
        const paragraphs = text.split(/\r?\n/);

        for (const paragraph of paragraphs) {
          if (!paragraph || paragraph.trim() === '') {
            allLines.push('');
            continue;
          }

          const words = paragraph.split(' ');
          let currentLine = '';

          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;

            try {
              const testWidth = font.widthOfTextAtSize(testLine, fontSize);

              if (testWidth > maxWidth && currentLine) {
                allLines.push(currentLine);
                currentLine = word;
              } else {
                currentLine = testLine;
              }
            } catch (err) {
              // Si hay error calculando ancho, agregar la palabra de todos modos
              currentLine = testLine;
            }
          }

          if (currentLine) {
            allLines.push(currentLine);
          }
        }

        return allLines;
      };

      const addSection = (title: string) => {
        yPosition -= 10;
        addText(title, 16, timesRomanBold, rgb(0.4, 0.2, 0));
        yPosition -= 8;
      };

      // Título principal
      addText(manuscript.title || 'Documento Sin Título', 20, timesRomanBold, rgb(0.3, 0.1, 0));
      yPosition -= 15;

      // Metadatos
      if (manuscript.analysis?.typology?.value || manuscript.analysis?.language?.value) {
        addSection('Metadatos');

        if (manuscript.analysis?.typology?.value) {
          addText(`Tipo de Documento: ${manuscript.analysis.typology.value}`, 11, timesRomanFont);
        }
        if (manuscript.analysis?.language?.value) {
          addText(`Idioma: ${manuscript.analysis.language.value}`, 11, timesRomanFont);
        }
        if (manuscript.analysis?.scriptType?.value) {
          addText(`Tipo de Escritura: ${manuscript.analysis.scriptType.value}`, 11, timesRomanFont);
        }
        if (manuscript.createdAt) {
          addText(`Fecha de Procesamiento: ${new Date(manuscript.createdAt).toLocaleString('es-ES')}`, 11, timesRomanFont);
        }
      }

      // Transcripción
      if (manuscript.transcription && manuscript.transcription.trim()) {
        addSection('Transcripcion');
        addText(manuscript.transcription, 11, timesRomanFont);
      }

      // Traducción
      if (manuscript.translation && manuscript.translation.trim()) {
        addSection('Traduccion');
        addText(manuscript.translation, 11, timesRomanFont);
      }

      // Resumen
      if (manuscript.analysis?.summary?.value) {
        addSection('Resumen');
        addText(manuscript.analysis.summary.value, 11, timesRomanFont);
      }

      // Palabras clave
      if (manuscript.analysis?.keywords && manuscript.analysis.keywords.length > 0) {
        addSection('Palabras Clave');
        const keywords = manuscript.analysis.keywords.map(kw => kw.value).join(', ');
        addText(keywords, 11, timesRomanFont);
      }

      // Entidades
      if (manuscript.analysis?.entities) {
        if (manuscript.analysis.entities.people?.length > 0) {
          addSection('Personas');
          manuscript.analysis.entities.people.forEach((p) => {
            if (p.value) {
              addText(`${p.value} (${(p.confidence * 100).toFixed(0)}%)`, 11, timesRomanFont);
            }
          });
        }

        if (manuscript.analysis.entities.locations?.length > 0) {
          addSection('Lugares');
          manuscript.analysis.entities.locations.forEach((l) => {
            if (l.value) {
              addText(`${l.value} (${(l.confidence * 100).toFixed(0)}%)`, 11, timesRomanFont);
            }
          });
        }

        if (manuscript.analysis.entities.dates?.length > 0) {
          addSection('Fechas');
          manuscript.analysis.entities.dates.forEach((d) => {
            if (d.value) {
              addText(`${d.value} (${(d.confidence * 100).toFixed(0)}%)`, 11, timesRomanFont);
            }
          });
        }
      }

      // Footer
      yPosition = margin;
      addText(`Exportado desde Scriptorium el ${new Date().toLocaleString('es-ES')}`, 9, timesRomanFont, rgb(0.5, 0.5, 0.5));

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${manuscript.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowMenu(false);
    } catch (error) {
      console.error('Error exportando a PDF:', error);
      alert('Error al exportar el manuscrito a PDF');
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
            <div className="border-b-2 border-copper-600/20 mb-2 pb-2">
              <button
                onClick={() => {
                  setShowPDFPreview(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-copper-100 transition-colors text-left mb-1"
              >
                <Icons.File className="w-4 h-4 text-red-700" />
                <div className="flex-1">
                  <p className="font-display font-bold text-sm text-wood-900">PDF - Vista Previa</p>
                  <p className="text-xs text-wood-800/60">Ver antes de descargar</p>
                </div>
              </button>
              <button
                onClick={exportToPDF}
                className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-copper-100 transition-colors text-left"
              >
                <Icons.Save className="w-4 h-4 text-red-700" />
                <div className="flex-1">
                  <p className="font-display font-bold text-sm text-wood-900">PDF - Descargar Directo</p>
                  <p className="text-xs text-wood-800/60">Sin vista previa</p>
                </div>
              </button>
            </div>

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

      {/* Vista Previa PDF */}
      {showPDFPreview && (
        <PDFPreview
          manuscript={manuscript}
          onClose={() => setShowPDFPreview(false)}
        />
      )}
    </div>
  );
};
