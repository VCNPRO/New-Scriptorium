import React, { useState } from 'react';
import { Icons } from './Icons';
import * as pdfjsLib from 'pdfjs-dist';

// Configurar worker de PDF.js
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

interface PDFUploaderProps {
  onImageExtracted: (imageBase64: string) => void;
  disabled?: boolean;
}

export const PDFUploader: React.FC<PDFUploaderProps> = ({ onImageExtracted, disabled }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handlePDFUpload = async (file: File) => {
    if (!file.type.includes('pdf')) {
      alert('Por favor, selecciona un archivo PDF válido');
      return;
    }

    // Límite de 10 páginas
    setIsProcessing(true);
    setPdfFile(file);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      if (pdf.numPages > 10) {
        alert('El PDF tiene más de 10 páginas. Por favor, usa un PDF con máximo 10 páginas.');
        setPdfFile(null);
        setIsProcessing(false);
        return;
      }

      setNumPages(pdf.numPages);

      // Generar miniaturas de todas las páginas
      const thumbnails: string[] = [];
      for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        thumbnails.push(canvas.toDataURL('image/jpeg', 0.8));
      }

      setPreviews(thumbnails);
      setSelectedPage(1);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error al procesar PDF:', error);
      alert('Error al procesar el PDF. Asegúrate de que el archivo no esté dañado.');
      setPdfFile(null);
      setIsProcessing(false);
    }
  };

  const handleExtractPage = async () => {
    if (!pdfFile || selectedPage < 1 || selectedPage > numPages) return;

    setIsProcessing(true);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(selectedPage);

      // Renderizar a alta resolución para OCR
      const scale = 2.0;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      const imageBase64 = canvas.toDataURL('image/jpeg', 0.95);
      onImageExtracted(imageBase64);
      setIsProcessing(false);

      // Limpiar estado
      setPdfFile(null);
      setPreviews([]);
      setNumPages(0);
      setSelectedPage(1);
    } catch (error) {
      console.error('Error al extraer página:', error);
      alert('Error al extraer la página del PDF.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Área de carga de PDF */}
      {!pdfFile && (
        <div
          className="border-2 border-dashed border-wood-800/30 rounded-lg p-8 text-center hover:border-copper-500 transition-colors cursor-pointer bg-parchment-100/30"
          onClick={() => document.getElementById('pdf-upload')?.click()}
        >
          <input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            disabled={disabled || isProcessing}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePDFUpload(file);
            }}
          />

          {isProcessing ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-copper-500 border-t-transparent rounded-full animate-spin" />
              <p className="font-serif text-wood-800">Procesando PDF...</p>
            </div>
          ) : (
            <>
              <Icons.File className="w-16 h-16 text-wood-800/30 mx-auto mb-4" />
              <p className="font-display font-bold text-wood-900 mb-2">
                Arrastra un archivo PDF aquí o haz clic para seleccionar
              </p>
              <p className="font-serif text-sm text-wood-800/60">
                Máximo 10 páginas • PDF legible
              </p>
            </>
          )}
        </div>
      )}

      {/* Selector de página */}
      {pdfFile && numPages > 0 && (
        <div className="bg-parchment-100 border border-wood-800/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-wood-900 mb-1">
                {pdfFile.name}
              </h3>
              <p className="font-serif text-sm text-wood-800/60">
                {numPages} {numPages === 1 ? 'página' : 'páginas'}
              </p>
            </div>

            <button
              onClick={() => {
                setPdfFile(null);
                setPreviews([]);
                setNumPages(0);
                setSelectedPage(1);
              }}
              className="text-wood-800/50 hover:text-red-600 transition-colors"
              title="Cancelar y seleccionar otro PDF"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <label className="font-display text-sm font-bold text-wood-900 mb-2 block">
              Selecciona la página a transcribir:
            </label>

            {/* Grid de miniaturas */}
            <div className="grid grid-cols-5 gap-3">
              {previews.map((preview, index) => {
                const pageNum = index + 1;
                const isSelected = selectedPage === pageNum;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setSelectedPage(pageNum)}
                    className={`relative border-2 rounded-lg overflow-hidden transition-all hover:scale-105 ${
                      isSelected
                        ? 'border-copper-500 shadow-lg ring-2 ring-copper-300'
                        : 'border-wood-800/20 hover:border-copper-300'
                    }`}
                    title={`Página ${pageNum}`}
                  >
                    <img
                      src={preview}
                      alt={`Página ${pageNum}`}
                      className="w-full h-auto"
                    />
                    <div
                      className={`absolute bottom-0 left-0 right-0 py-1 text-center text-xs font-bold ${
                        isSelected
                          ? 'bg-copper-500 text-parchment-100'
                          : 'bg-wood-900/80 text-parchment-200'
                      }`}
                    >
                      Pág. {pageNum}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botón de extraer */}
          <button
            onClick={handleExtractPage}
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-lg font-display font-bold text-parchment-100 transition-all flex items-center justify-center gap-2 ${
              isProcessing
                ? 'bg-wood-800/50 cursor-not-allowed'
                : 'bg-copper-600 hover:bg-copper-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-3 border-parchment-100 border-t-transparent rounded-full animate-spin" />
                Extrayendo página...
              </>
            ) : (
              <>
                <Icons.Scan className="w-5 h-5" />
                Usar página {selectedPage} para transcribir
              </>
            )}
          </button>
        </div>
      )}

      {/* Info adicional */}
      {!pdfFile && (
        <div className="bg-wood-900/5 border border-wood-800/10 rounded-lg p-4">
          <h4 className="font-display font-bold text-sm text-wood-900 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Soporte PDF - Limitaciones
          </h4>
          <ul className="font-serif text-xs text-wood-800/70 space-y-1">
            <li>• Máximo 10 páginas por PDF</li>
            <li>• Solo se transcribe una página a la vez</li>
            <li>• Mejor calidad con PDFs de alta resolución (300+ DPI)</li>
            <li>• PDFs escaneados funcionan mejor que PDFs nativos con texto</li>
            <li>• Tamaño máximo recomendado: 20MB</li>
          </ul>
        </div>
      )}
    </div>
  );
};
