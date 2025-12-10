import React, { useState } from 'react';
import { Icons } from './Icons';
import { Manuscript } from '../types';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface PDFPreviewProps {
  manuscript: Manuscript;
  onClose: () => void;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ manuscript, onClose }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePreview = async () => {
    setIsGenerating(true);
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

      const addText = (text: string, fontSize: number, font: any, color = rgb(0, 0, 0)) => {
        const lines = wrapText(text, maxWidth, fontSize, font);

        for (const line of lines) {
          if (yPosition < margin + 50) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            yPosition = pageHeight - margin;
          }

          currentPage.drawText(line, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font: font,
            color: color,
          });

          yPosition -= fontSize + 4;
        }
      };

      const wrapText = (text: string, maxWidth: number, fontSize: number, font: any): string[] => {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (testWidth > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          lines.push(currentLine);
        }

        return lines;
      };

      const addSection = (title: string) => {
        yPosition -= 10;
        addText(title, 16, timesRomanBold, rgb(0.4, 0.2, 0));
        yPosition -= 8;
      };

      // Título principal
      addText(manuscript.title, 20, timesRomanBold, rgb(0.3, 0.1, 0));
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
      addSection('Transcripción');
      addText(manuscript.transcription, 11, timesRomanFont);

      // Traducción
      if (manuscript.translation) {
        addSection('Traducción');
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
            addText(`• ${p.value} (${(p.confidence * 100).toFixed(0)}%)`, 11, timesRomanFont);
          });
        }

        if (manuscript.analysis.entities.locations?.length > 0) {
          addSection('Lugares');
          manuscript.analysis.entities.locations.forEach((l) => {
            addText(`• ${l.value} (${(l.confidence * 100).toFixed(0)}%)`, 11, timesRomanFont);
          });
        }

        if (manuscript.analysis.entities.dates?.length > 0) {
          addSection('Fechas');
          manuscript.analysis.entities.dates.forEach((d) => {
            addText(`• ${d.value} (${(d.confidence * 100).toFixed(0)}%)`, 11, timesRomanFont);
          });
        }
      }

      // Footer
      yPosition = margin;
      addText(`Exportado desde Scriptorium el ${new Date().toLocaleString('es-ES')}`, 9, timesRomanFont, rgb(0.5, 0.5, 0.5));

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error generando vista previa:', error);
      alert('Error al generar la vista previa del PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    generatePreview();
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, []);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${manuscript.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-parchment-100 rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-wood-800/20 bg-wood-900/5">
          <div className="flex items-center gap-3">
            <Icons.File className="w-6 h-6 text-red-700" />
            <div>
              <h2 className="font-display font-bold text-lg text-wood-900">Vista Previa PDF</h2>
              <p className="text-sm text-wood-800/60">{manuscript.title}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={!pdfUrl}
              className="flex items-center gap-2 px-4 py-2 bg-copper-600 hover:bg-copper-700 text-parchment-100 rounded font-display font-bold text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icons.Save className="w-4 h-4" />
              Descargar PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-wood-800/10 rounded transition-colors"
            >
              <svg className="w-6 h-6 text-wood-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-wood-900/10">
          {isGenerating ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-copper-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-display text-wood-900">Generando vista previa...</p>
              </div>
            </div>
          ) : pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full border-none"
              title="Vista previa del PDF"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-wood-800/60 font-serif">No se pudo generar la vista previa</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
