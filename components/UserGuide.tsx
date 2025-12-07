import React, { useState } from 'react';
import { Card, Badge } from './ui';
import { Icons } from './Icons';

export const UserGuide: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      title: "1. Introducción y Tablero",
      icon: Icons.Dashboard,
      content: (
        <div className="space-y-6">
          <p className="font-serif leading-relaxed text-wood-900">
            Bienvenido a <strong>Scriptorium</strong>, la plataforma de inteligencia artificial para la transcripción y análisis de manuscritos históricos. Esta guía le permitirá dominar todas las funciones del sistema.
          </p>
          
          <div className="bg-wood-800/5 p-4 rounded border border-wood-800/10">
            <h4 className="font-bold font-display text-wood-900 mb-2">El Tablero de Mando</h4>
            <p className="text-sm font-serif mb-4">
              Es su punto de partida. Aquí encontrará un resumen del fondo documental y las métricas clave.
            </p>
            <ul className="list-disc list-inside text-sm space-y-2 text-wood-800">
              <li><strong>Métricas (KPIs):</strong> Visualice el total de documentos, entidades extraídas y alertas de conservación pendientes.</li>
              <li><strong>Búsqueda Inteligente:</strong> Utilice la barra superior para buscar por título, fecha o incluso contenido semántico (ej. "testamentos de 1540").</li>
              <li><strong>Filtros:</strong> Puede filtrar la lista por estado (Procesando/Indexado) o tipología documental.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "2. Carga y Transcripción",
      icon: Icons.Upload,
      content: (
        <div className="space-y-6">
          <p className="font-serif leading-relaxed text-wood-900">
            El corazón de Scriptorium es la <strong>Mesa de Trabajo</strong>. Siga estos pasos para digitalizar un documento:
          </p>

          <ol className="list-decimal list-inside space-y-4 font-serif text-wood-900">
            <li className="pl-2">
              <span className="font-bold">Cargar Facsímil:</span> Haga clic en el botón <Badge color="wood">Cargar</Badge> o en el área central para seleccionar una imagen de su ordenador.
            </li>
            <li className="pl-2">
              <span className="font-bold">Transcribir & Analizar:</span> Una vez cargada la imagen, pulse este botón. El sistema realizará dos acciones simultáneas:
              <ul className="list-disc list-inside ml-6 mt-2 text-sm text-wood-800/80">
                <li><strong>HTR (Reconocimiento de Texto Manuscrito):</strong> Convertirá la caligrafía antigua a texto digital editable.</li>
                <li><strong>Escaneo Visual:</strong> Detectará sellos, mapas y daños físicos automáticamente.</li>
              </ul>
            </li>
            <li className="pl-2">
              <span className="font-bold">Revisión Automática:</span> Al finalizar, el texto aparecerá en la pestaña "Texto". El análisis diplomático se ejecutará automáticamente.
            </li>
          </ol>
        </div>
      )
    },
    {
      title: "3. Análisis Diplomático",
      icon: Icons.Analysis,
      content: (
        <div className="space-y-6">
          <p className="font-serif leading-relaxed text-wood-900">
            Una vez procesado el texto, Scriptorium despliega su potencia analítica en el panel derecho.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border border-wood-800/10">
              <h4 className="font-bold font-display text-copper-600 mb-2 flex items-center gap-2">
                <Icons.File className="w-4 h-4" /> Tipología y Serie
              </h4>
              <p className="text-sm font-serif">
                La IA clasifica el documento (ej. "Real Cédula") y sugiere la serie archivística adecuada para su catalogación.
              </p>
            </div>
            <div className="bg-white p-4 rounded border border-wood-800/10">
              <h4 className="font-bold font-display text-copper-600 mb-2 flex items-center gap-2">
                <Icons.AI className="w-4 h-4" /> Entidades
              </h4>
              <p className="text-sm font-serif">
                Extracción automática de nombres de personas, organizaciones, fechas y lugares mencionados en el texto.
              </p>
            </div>
            <div className="bg-white p-4 rounded border border-wood-800/10">
              <h4 className="font-bold font-display text-copper-600 mb-2 flex items-center gap-2">
                <Icons.Search className="w-4 h-4" /> Geografía
              </h4>
              <p className="text-sm font-serif">
                Distingue entre el lugar de origen del documento y los lugares citados en el texto.
              </p>
            </div>
            <div className="bg-white p-4 rounded border border-wood-800/10">
              <h4 className="font-bold font-display text-copper-600 mb-2 flex items-center gap-2">
                <Icons.Analysis className="w-4 h-4" /> Alertas de Calidad
              </h4>
              <p className="text-sm font-serif">
                El sistema avisa de inconsistencias en el texto o daños físicos (manchas, roturas) que requieren atención del conservador.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "4. Visor y Herramientas Visuales",
      icon: Icons.Scan,
      content: (
        <div className="space-y-6">
          <p className="font-serif leading-relaxed text-wood-900">
            Para un trabajo de paleografía preciso, el visor de imágenes incluye herramientas avanzadas de manipulación.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-wood-800/10 rounded text-wood-900"><Icons.ZoomIn className="w-5 h-5" /></div>
              <div>
                <h5 className="font-bold text-wood-900">Zoom Interactivo</h5>
                <p className="text-sm font-serif text-wood-800/80">Use los botones flotantes (+/-) o la rueda del ratón mientras mantiene pulsada la tecla <code>Ctrl</code> para acercar o alejar el manuscrito.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-wood-800/10 rounded text-wood-900"><Icons.Move className="w-5 h-5" /></div>
              <div>
                <h5 className="font-bold text-wood-900">Paneo (Desplazamiento)</h5>
                <p className="text-sm font-serif text-wood-800/80">Haga clic y arrastre sobre la imagen para moverse por el documento cuando esté ampliado.</p>
              </div>
            </div>

             <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded text-red-800"><Icons.Scan className="w-5 h-5" /></div>
              <div>
                <h5 className="font-bold text-red-900">Alertas de Conservación</h5>
                <p className="text-sm font-serif text-wood-800/80">
                  Si el análisis visual detecta daños (humedad, roturas), aparecerá una alerta roja en la sección "Detección Visual" debajo de la imagen.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "5. Expediente Virtual",
      icon: Icons.Library,
      content: (
        <div className="space-y-6">
          <p className="font-serif leading-relaxed text-wood-900">
            Scriptorium no analiza documentos de forma aislada. La función de <strong>Expediente Virtual</strong> conecta los puntos.
          </p>
          
          <ul className="space-y-3 font-serif text-wood-900">
            <li className="bg-parchment-200 p-3 rounded border border-wood-800/10">
                <strong className="block text-copper-700 mb-1">Detección de Duplicados</strong>
                Si carga un documento que ya existe (por título o similitud de texto), el sistema le avisará inmediatamente para evitar redundancias.
            </li>
            <li className="bg-parchment-200 p-3 rounded border border-wood-800/10">
                <strong className="block text-copper-700 mb-1">Relaciones Automáticas</strong>
                En la pestaña "Relaciones" (icono Biblioteca), verá documentos sugeridos que comparten:
                <ul className="list-disc list-inside mt-1 ml-2 text-sm text-wood-800/70">
                    <li>Las mismas personas u organizaciones.</li>
                    <li>La misma serie documental.</li>
                    <li>Referencias cruzadas explícitas en el texto.</li>
                </ul>
            </li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-8 animate-fade-in p-2">
      {/* Sidebar Navigation for Manual */}
      <div className="w-full md:w-1/4 bg-parchment-100 border border-wood-800/20 rounded shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 bg-wood-900/5 border-b border-wood-800/10">
            <h2 className="font-display font-bold text-xl text-wood-900">Manual de Usuario</h2>
            <p className="text-xs font-serif text-wood-800/60 mt-1">Guía Operativa v2.4</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {chapters.map((chapter, idx) => (
                <button
                    key={idx}
                    onClick={() => setActiveChapter(idx)}
                    className={`w-full text-left px-4 py-3 rounded-sm flex items-center gap-3 transition-all font-serif text-sm
                    ${activeChapter === idx 
                        ? 'bg-copper-600 text-parchment-100 shadow-md' 
                        : 'text-wood-900 hover:bg-wood-800/5'}`}
                >
                    <chapter.icon className={`w-4 h-4 shrink-0 ${activeChapter === idx ? 'text-parchment-100' : 'text-wood-800/50'}`} />
                    <span className="font-bold truncate">{chapter.title}</span>
                </button>
            ))}
        </div>
        <div className="p-4 bg-parchment-200 text-xs font-serif text-center text-wood-800/50 border-t border-wood-800/10">
            &copy; 2024 Scriptorium Systems
        </div>
      </div>

      {/* Content Area */}
      <Card className="flex-1 overflow-y-auto bg-parchment-100 relative">
        <div className="max-w-3xl mx-auto py-4">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-copper-600/20 pb-4">
                <div className="p-3 bg-wood-900 text-copper-400 rounded shadow-lg">
                    {React.createElement(chapters[activeChapter].icon, { className: "w-8 h-8" })}
                </div>
                <h1 className="text-3xl font-display font-bold text-wood-900">{chapters[activeChapter].title}</h1>
            </div>
            
            <div className="animate-fade-in">
                {chapters[activeChapter].content}
            </div>

            {/* Navigation Footer */}
            <div className="mt-12 pt-6 border-t border-wood-800/10 flex justify-between">
                <button 
                    disabled={activeChapter === 0}
                    onClick={() => setActiveChapter(prev => prev - 1)}
                    className="flex items-center gap-2 text-wood-800 hover:text-copper-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold font-serif text-sm"
                >
                    <Icons.ArrowRight className="w-4 h-4 rotate-180" /> Anterior
                </button>
                <button 
                    disabled={activeChapter === chapters.length - 1}
                    onClick={() => setActiveChapter(prev => prev + 1)}
                    className="flex items-center gap-2 text-wood-800 hover:text-copper-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold font-serif text-sm"
                >
                    Siguiente <Icons.ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
      </Card>
    </div>
  );
};