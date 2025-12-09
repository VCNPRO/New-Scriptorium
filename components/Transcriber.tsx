import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Badge } from './ui';
import { Icons } from './Icons';
import { Manuscript, AnalysisData, VisualAnalysis, RelationMatch } from '../types';
import { aiService } from '../src/services/apiService';
import { ManuscriptMap } from './ManuscriptMap';
import { TableViewer } from './TableViewer';
import { PDFUploader } from './PDFUploader';
import { ExportManuscript } from './ExportManuscript';

interface TranscriberProps {
  initialManuscript?: Manuscript;
  existingManuscripts: Manuscript[];
  onSave: (m: Manuscript) => void;
  onBack: () => void;
}

type TabType = 'transcript' | 'diplomatics' | 'geo' | 'relations';

export const Transcriber: React.FC<TranscriberProps> = ({ initialManuscript, existingManuscripts, onSave, onBack }) => {
  const [image, setImage] = useState<string | null>(initialManuscript?.imageUrl || null);
  const [text, setText] = useState<string>(initialManuscript?.transcription || '');
  const [translatedText, setTranslatedText] = useState<string>(initialManuscript?.translation || '');

  const [analysis, setAnalysis] = useState<AnalysisData | null>(initialManuscript?.analysis || null);
  const [visualAnalysis, setVisualAnalysis] = useState<VisualAnalysis | null>(initialManuscript?.visualAnalysis || null);
  const [relations, setRelations] = useState<RelationMatch[]>(initialManuscript?.calculatedRelations || []);

  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('transcript');
  const [uploadMode, setUploadMode] = useState<'image' | 'pdf'>('image');
  
  // --- ZOOM & PAN STATE ---
  const [viewState, setViewState] = useState({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset view when image changes
  useEffect(() => {
    setViewState({ scale: 1, x: 0, y: 0 });
  }, [image]);

  // --- ZOOM & PAN HANDLERS ---
  const handleZoom = (delta: number) => {
    setViewState(prev => {
      const newScale = Math.max(0.5, Math.min(5, prev.scale + delta));
      return { ...prev, scale: newScale };
    });
  };

  const handleResetView = () => setViewState({ scale: 1, x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (!image) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - viewState.x, y: e.clientY - viewState.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    setViewState(prev => ({ ...prev, x: newX, y: newY }));
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  const onWheel = (e: React.WheelEvent) => {
    if (!image) return;
    if (e.ctrlKey || e.metaKey) {
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        handleZoom(delta);
    }
  };

  const getPhysicalDamageAlert = (va: VisualAnalysis | null): string | null => {
    if (!va || !va.physicalCondition) return null;
    const condition = va.physicalCondition.toLowerCase();
    const safeStates = ['normal', 'bueno', 'intacto', 'sin daños', 'perfecto', 'excelente'];
    const dangerWords = ['mancha', 'rotura', 'roto', 'daño', 'deterioro', 'humedad', 'moho', 'quemadura', 'rasgadura', 'polilla', 'desvanecido', 'ilegible', 'agujero'];
    const isSafe = safeStates.some(safe => condition.includes(safe));
    const isDanger = dangerWords.some(danger => condition.includes(danger));
    if (!isSafe || isDanger) {
        return `Estado físico: ${va.physicalCondition}`;
    }
    return null;
  };

  const physicalAlert = getPhysicalDamageAlert(visualAnalysis);

  const calculateRelations = (currentAnalysis: AnalysisData | null, currentText: string): RelationMatch[] => {
    if (!currentAnalysis) return [];
    const matches: RelationMatch[] = [];
    existingManuscripts.forEach(other => {
        if (other.id === initialManuscript?.id) return;
        let score = 0;
        let reasons: string[] = [];
        let type: RelationMatch['reason'] = 'same_expediente';

        if (other.title === currentAnalysis.titleSuggestion?.value) {
            score += 50;
            reasons.push("Título idéntico");
            type = 'duplicate';
        }
        if (other.transcription && currentText && other.transcription.substring(0, 100) === currentText.substring(0, 100)) {
            score += 100;
            reasons.push("Contenido de texto idéntico");
            type = 'duplicate';
        }

        if (type !== 'duplicate' && other.analysis) {
            const currentPeople = currentAnalysis.entities.people.map(p => p.value);
            const otherPeople = other.analysis.entities.people.map(p => p.value);
            const sharedPeople = otherPeople.filter(p => currentPeople.includes(p));
            
            if (sharedPeople.length > 0) {
                score += (sharedPeople.length * 10);
                reasons.push(`Personas compartidas: ${sharedPeople.slice(0, 2).join(', ')}`);
            }

            if (other.analysis.suggestedSeries?.value === currentAnalysis.suggestedSeries?.value) {
                score += 5;
                reasons.push(`Misma serie documental: ${currentAnalysis.suggestedSeries.value}`);
            }
        }

        if (score > 10) {
            matches.push({
                manuscriptId: other.id,
                score: Math.min(score, 100),
                reason: type,
                details: reasons.join('. ')
            });
        }
    });
    matches.sort((a, b) => b.score - a.score);
    setRelations(matches);
    return matches;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePDFImageExtracted = (imageBase64: string) => {
    setImage(imageBase64);
  };

  const handleTranscribe = async () => {
    if (!image) return;
    setIsProcessing(true);
    try {
      const transResult = await aiService.transcribe(image);
      setText(transResult.text);
      setVisualAnalysis(transResult.visual);

      if (transResult.text) {
          const { analysis: anaResult } = await aiService.analyze(transResult.text);
          setAnalysis(anaResult);
          const newRelations = calculateRelations(anaResult, transResult.text);
          saveManuscript(transResult.text, anaResult, transResult.visual, translatedText, newRelations);
      }
    } catch (err) {
      console.error(err);
      alert("Error procesando el manuscrito: " + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!text) return;
    setIsProcessing(true);
    try {
      const { analysis: result } = await aiService.analyze(text);
      setAnalysis(result);
      const newRelations = calculateRelations(result, text);
      setActiveTab('diplomatics');
      saveManuscript(text, result, visualAnalysis, translatedText, newRelations);
    } catch (err) {
        alert("Error analizando el texto: " + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranslate = async () => {
      if (!text) return;
      setIsProcessing(true);
      try {
        const result = await aiService.translate(text, 'es');
        setTranslatedText(result.translation);
        saveManuscript(text, analysis, visualAnalysis, result.translation, relations);
      } catch (err) {
        alert("Error traduciendo el texto: " + (err instanceof Error ? err.message : 'Error desconocido'));
      } finally {
        setIsProcessing(false);
      }
  };

  const saveManuscript = (t: string, a: AnalysisData | null, v: VisualAnalysis | null, tr: string, rel: RelationMatch[]) => {
    if (!image) return;
    const manuscript: Manuscript = {
        id: initialManuscript?.id || Date.now().toString(),
        title: a?.titleSuggestion?.value || initialManuscript?.title || "Documento Sin Título",
        imageUrl: image,
        transcription: t,
        translation: tr,
        analysis: a,
        visualAnalysis: v,
        createdAt: initialManuscript?.createdAt || new Date(),
        status: 'completed',
        calculatedRelations: rel
      };
      onSave(manuscript);
  }

  const TabButton = ({ id, icon: Icon, label, alert }: { id: TabType, icon: any, label: string, alert?: number }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`relative flex items-center gap-2 px-4 py-2 text-sm font-bold font-display tracking-wide transition-all border-b-2 
        ${activeTab === id 
            ? 'border-copper-600 text-wood-900 bg-wood-800/5' 
            : 'border-transparent text-wood-800/50 hover:text-wood-800 hover:bg-wood-800/5'}`}
    >
        <Icon className="w-4 h-4" />
        {label}
        {alert ? (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-copper-600 text-[10px] text-white shadow-sm">
                {alert}
            </span>
        ) : null}
    </button>
  );

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-copper-600/20">
        <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack} className="!px-2">
                <Icons.ArrowRight className="rotate-180 w-5 h-5" />
            </Button>
            <div>
                <h2 className="font-display font-bold text-wood-900 text-xl">Mesa de Trabajo</h2>
                <div className="text-xs font-serif text-wood-800/60 flex items-center gap-2">
                    {analysis?.typology?.value && <Badge color="wood">{analysis.typology.value}</Badge>}
                    {relations.length > 0 && <Badge color="copper">{relations.length} Relaciones Detectadas</Badge>}
                </div>
            </div>
        </div>
        <div className="flex gap-2">
            {!image && (
                <Button onClick={() => fileInputRef.current?.click()}>
                    <Icons.Upload className="w-4 h-4 mr-2" />
                    Cargar (Q1)
                </Button>
            )}
            {image && !text && (
                <Button onClick={handleTranscribe} disabled={isProcessing}>
                    {isProcessing ? <Icons.Spinner className="animate-spin w-4 h-4 mr-2" /> : <Icons.AI className="w-4 h-4 mr-2" />}
                    Transcribir & Analizar
                </Button>
            )}
            {text && !analysis && (
                <Button onClick={handleAnalyze} disabled={isProcessing} variant="secondary">
                     {isProcessing ? <Icons.Spinner className="animate-spin w-4 h-4 mr-2" /> : <Icons.Analysis className="w-4 h-4 mr-2" />}
                    Análisis Diplomático
                </Button>
            )}
            {analysis && (
                <>
                    <Button variant="primary" onClick={() => saveManuscript(text, analysis, visualAnalysis, translatedText, relations)}>
                        <Icons.Save className="w-4 h-4 mr-2" />
                        Guardar
                    </Button>
                    <ExportManuscript
                        manuscript={{
                            id: initialManuscript?.id || Date.now().toString(),
                            title: analysis?.titleSuggestion?.value || initialManuscript?.title || "Documento Sin Título",
                            imageUrl: image!,
                            transcription: text,
                            translation: translatedText,
                            analysis: analysis,
                            visualAnalysis: visualAnalysis,
                            createdAt: initialManuscript?.createdAt || new Date(),
                            status: 'completed',
                            calculatedRelations: relations
                        }}
                    />
                </>
            )}
        </div>
      </div>

      <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />

      {/* Main Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        <div className="flex flex-col gap-4 h-full min-h-0">
            <Card className="flex-1 !p-0 bg-wood-900/10 relative group overflow-hidden flex flex-col border border-wood-800/20">
                {!image ? (
                    <div className="flex-1 flex flex-col p-6">
                        {/* Selector de modo: Imagen o PDF */}
                        <div className="flex gap-2 mb-4 border-b border-wood-800/20 pb-3">
                            <button
                                onClick={() => setUploadMode('image')}
                                className={`flex-1 py-2 px-4 rounded-lg font-display font-bold text-sm transition-all ${
                                    uploadMode === 'image'
                                        ? 'bg-copper-600 text-parchment-100 shadow-md'
                                        : 'bg-wood-900/10 text-wood-800/60 hover:bg-wood-900/20'
                                }`}
                            >
                                <Icons.Upload className="w-4 h-4 inline mr-2" />
                                Imagen
                            </button>
                            <button
                                onClick={() => setUploadMode('pdf')}
                                className={`flex-1 py-2 px-4 rounded-lg font-display font-bold text-sm transition-all ${
                                    uploadMode === 'pdf'
                                        ? 'bg-copper-600 text-parchment-100 shadow-md'
                                        : 'bg-wood-900/10 text-wood-800/60 hover:bg-wood-900/20'
                                }`}
                            >
                                <Icons.File className="w-4 h-4 inline mr-2" />
                                PDF
                            </button>
                        </div>

                        {/* Contenido según el modo */}
                        {uploadMode === 'image' ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 flex flex-col items-center justify-center cursor-pointer hover:bg-wood-900/10 transition-colors rounded-lg border-2 border-dashed border-wood-800/30"
                            >
                                <Icons.Upload className="w-12 h-12 text-wood-800/30 mb-2" />
                                <p className="font-display font-bold text-wood-900 mb-1">Cargar Imagen</p>
                                <p className="font-serif text-sm text-wood-800/60">JPG, PNG • Máx. 20MB</p>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto">
                                <PDFUploader
                                    onImageExtracted={handlePDFImageExtracted}
                                    disabled={isProcessing}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="relative w-full h-full overflow-hidden bg-wood-900/80">
                        <div 
                            ref={containerRef}
                            className={`w-full h-full flex items-center justify-center overflow-hidden 
                                ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseLeave}
                            onWheel={onWheel}
                        >
                            <img 
                                src={image} 
                                className="max-w-none transition-transform duration-75 ease-linear select-none"
                                style={{ 
                                    transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`,
                                    maxHeight: '90%',
                                    maxWidth: '90%'
                                }}
                                draggable={false}
                                alt="Manuscrito" 
                            />
                        </div>

                        <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-wood-900/90 backdrop-blur border border-copper-600/30 p-1.5 rounded-lg shadow-xl z-10">
                            <button onClick={() => handleZoom(0.2)} className="p-2 text-copper-400 hover:text-parchment-100 hover:bg-white/10 rounded transition-colors" title="Zoom In">
                                <Icons.ZoomIn className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleZoom(-0.2)} className="p-2 text-copper-400 hover:text-parchment-100 hover:bg-white/10 rounded transition-colors" title="Zoom Out">
                                <Icons.ZoomOut className="w-5 h-5" />
                            </button>
                            <div className="h-px bg-white/10 w-full my-0.5"></div>
                             <button onClick={handleResetView} className="p-2 text-copper-400 hover:text-parchment-100 hover:bg-white/10 rounded transition-colors" title="Reset Vista">
                                <Icons.Reset className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="absolute top-4 left-4 pointer-events-none">
                            <div className="bg-wood-900/80 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-copper-400 border border-white/5">
                                {Math.round(viewState.scale * 100)}% | {Math.round(viewState.x)}, {Math.round(viewState.y)}
                            </div>
                        </div>
                    </div>
                )}
            </Card>
            
            {visualAnalysis && (
                <div className={`h-auto border p-4 rounded-sm ${physicalAlert ? 'bg-red-50 border-red-200' : 'bg-parchment-100 border-wood-800/20'}`}>
                    <h4 className={`font-display font-bold text-sm mb-2 flex items-center gap-2 ${physicalAlert ? 'text-red-800' : 'text-wood-900'}`}>
                        <Icons.Scan className="w-4 h-4" /> Detección Visual
                        {physicalAlert && <span className="ml-auto text-[10px] uppercase tracking-wider bg-red-100 text-red-800 px-2 rounded-full border border-red-200">Atención</span>}
                    </h4>
                    <div className="flex gap-2 flex-wrap items-center">
                        {visualAnalysis.hasSeals && <Badge color="copper">Sello Detectado</Badge>}
                        {visualAnalysis.hasMaps && <Badge color="copper">Mapa/Plano</Badge>}
                        {visualAnalysis.hasTables && <Badge color="wood">Estructura Tabular</Badge>}
                    </div>
                </div>
            )}
        </div>

        <Card className="flex flex-col h-full !p-0 overflow-hidden">
            <div className="flex border-b border-wood-800/10 bg-parchment-200">
                <TabButton id="transcript" icon={Icons.File} label="Texto" />
                <TabButton id="diplomatics" icon={Icons.Analysis} label="Diplomática" />
                <TabButton id="geo" icon={Icons.Search} label="Geografía" />
                <TabButton id="relations" icon={Icons.Library} label="Relaciones" alert={relations.length || undefined} />
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-parchment-100">
                
                {activeTab === 'transcript' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-display font-bold text-wood-900">Transcripción (HTR)</h3>
                            <Button variant="ghost" onClick={handleTranslate} className="text-xs !py-1 h-auto">
                                <Icons.AI className="w-3 h-3 mr-1" />
                                {translatedText ? "Actualizar Traducción" : "Traducir (Q14)"}
                            </Button>
                        </div>
                        <textarea 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="El texto transcrito aparecerá aquí..."
                            className="w-full min-h-[300px] p-4 bg-parchment-200/50 border-none resize-y focus:ring-0 font-script text-xl leading-relaxed text-wood-900"
                        />
                        {translatedText && (
                            <div className="mt-6 pt-6 border-t border-wood-800/10 animate-fade-in">
                                <h3 className="font-display font-bold text-wood-900 mb-2">Traducción Accesible (Q14)</h3>
                                <p className="font-serif text-wood-800 leading-relaxed bg-white/40 p-4 rounded text-sm">
                                    {translatedText}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'diplomatics' && analysis && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-wood-800/5 rounded">
                                <p className="text-xs font-bold uppercase text-wood-800/50 mb-1">Tipología (Q4)</p>
                                <p className="font-display font-bold text-wood-900">{analysis.typology?.value}</p>
                            </div>
                            <div className="p-3 bg-wood-800/5 rounded">
                                <p className="text-xs font-bold uppercase text-wood-800/50 mb-1">Serie (Q8)</p>
                                <p className="font-display font-bold text-wood-900">{analysis.suggestedSeries?.value}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase text-wood-800/60 mb-2">Metadatos (Q6)</h4>
                            <p className="font-serif font-bold text-lg text-wood-900 mb-2">{analysis.titleSuggestion?.value}</p>
                            <p className="font-serif text-sm text-wood-800 leading-relaxed mb-3">{analysis.summary?.value}</p>
                            <div className="flex flex-wrap gap-2">
                                {analysis.keywords?.map((k, i) => <Badge key={i} color="wood">#{k.value}</Badge>)}
                            </div>
                        </div>
                        
                        <section className="bg-wood-800/5 p-4 rounded border border-wood-800/10">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-wood-800/50 mb-3 border-b border-wood-800/10 pb-1">Identificación Paleográfica</h4>
                            <div className="space-y-3 font-serif text-sm text-wood-900">
                                <div className="flex justify-between items-center border-b border-wood-800/5 pb-2">
                                    <span className="text-wood-800/60">Escritura</span>
                                    <span className="font-bold">{analysis.scriptType?.value}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-wood-800/60">Idioma Detectado</span>
                                    <span className="font-bold text-copper-700 bg-copper-100 px-2 py-0.5 rounded text-xs uppercase tracking-wider border border-copper-200">
                                        {analysis.language?.value}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Tablas Extraídas */}
                        {analysis.extractedTables && analysis.extractedTables.length > 0 && (
                            <TableViewer tables={analysis.extractedTables} />
                        )}

                        {(analysis.qualityAlerts?.length > 0 || physicalAlert) && (
                            <div className="bg-red-50 border border-red-100 p-3 rounded">
                                <h4 className="text-xs font-bold uppercase text-red-800/60 mb-2 flex items-center gap-2">
                                    <Icons.Analysis className="w-3 h-3" /> Curación y Conservación
                                </h4>
                                <ul className="list-disc list-inside text-xs text-red-900/70 font-serif">
                                    {physicalAlert && (
                                        <li className="font-bold text-red-800 mb-1">{physicalAlert}</li>
                                    )}
                                    {analysis.qualityAlerts.map((alert, i) => (
                                        <li key={i}>{alert.value}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'geo' && analysis && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Mapa Interactivo */}
                        {analysis.geodata && analysis.geodata.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold uppercase text-wood-800/60 mb-3 flex items-center gap-2">
                                    🗺️ Mapa Histórico Interactivo
                                </h4>
                                <ManuscriptMap locations={analysis.geodata} />
                                <p className="text-xs text-wood-800/50 mt-2 italic text-center">
                                    Haz click en los marcadores para ver más información
                                </p>
                            </div>
                        )}

                        {/* Lista de Lugares */}
                        <div>
                            <h4 className="text-xs font-bold uppercase text-wood-800/60 mb-2 flex items-center gap-2">
                                <Icons.Search className="w-3 h-3" /> Geografía Histórica
                            </h4>
                            {analysis.geodata?.length > 0 ? (
                                <div className="space-y-2">
                                    {analysis.geodata.map((geo, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-white/50 border border-wood-800/10 rounded hover:border-copper-500 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">
                                                    {geo.type === 'origin' && '⚑'}
                                                    {geo.type === 'destination' && '▶'}
                                                    {geo.type === 'mentioned' && '●'}
                                                </span>
                                                <div>
                                                    <span className="font-serif font-bold text-wood-900 block">{geo.place}</span>
                                                    {geo.coordinates && (
                                                        <span className="text-xs text-wood-800/50">
                                                            {geo.coordinates.lat.toFixed(4)}, {geo.coordinates.lon.toFixed(4)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Badge color={geo.type === 'origin' ? 'copper' : geo.type === 'destination' ? 'wood' : 'wood'}>
                                                {geo.type === 'origin' && 'Origen'}
                                                {geo.type === 'destination' && 'Destino'}
                                                {geo.type === 'mentioned' && 'Mencionado'}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-sm italic text-wood-800/40">Sin datos geográficos detectados.</p>}
                        </div>

                        {/* Entidades */}
                        <div>
                            <h4 className="text-xs font-bold uppercase text-wood-800/60 mb-2">Entidades (Q2)</h4>
                            <div className="space-y-3">
                                {analysis.entities.people && analysis.entities.people.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold text-wood-800 mb-1">👤 Personas:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis.entities.people.map((p, i) => <Badge key={i} color="copper" item={p} />)}
                                        </div>
                                    </div>
                                )}
                                {analysis.entities.organizations && analysis.entities.organizations.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold text-wood-800 mb-1">🏛️ Organizaciones:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis.entities.organizations.map((o, i) => <Badge key={i} color="wood" item={o} />)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'relations' && analysis && (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                             <h4 className="text-xs font-bold uppercase text-wood-800/60 mb-3 flex items-center gap-2">
                                <Icons.Library className="w-3 h-3" /> Expediente Virtual (Q10)
                            </h4>
                            
                            {analysis.documentReferences && analysis.documentReferences.length > 0 && (
                                <div className="mb-6 p-4 bg-wood-800/5 rounded border-l-2 border-wood-800">
                                    <p className="text-xs font-bold text-wood-800 uppercase mb-2">Citas en el texto</p>
                                    <ul className="list-disc list-inside text-sm font-serif italic text-wood-900">
                                        {analysis.documentReferences.map((ref, i) => (
                                            <li key={i}>{ref.value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {relations.length === 0 ? (
                                <div className="text-center p-6 border border-dashed border-wood-800/20 rounded">
                                    <Icons.File className="w-8 h-8 text-wood-800/20 mx-auto mb-2" />
                                    <p className="text-sm font-serif text-wood-800/60">
                                        No se han detectado relaciones claras con otros documentos en la biblioteca actual.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid gap-3">
                                    {relations.map((rel, i) => {
                                        const relatedDoc = existingManuscripts.find(m => m.id === rel.manuscriptId);
                                        if (!relatedDoc) return null;
                                        const isDuplicate = rel.reason === 'duplicate';
                                        return (
                                            <div 
                                                key={i} 
                                                className={`flex gap-4 p-4 rounded-md shadow-sm transition-all border group cursor-pointer
                                                    ${isDuplicate 
                                                        ? 'bg-red-50/70 border-red-300 hover:border-red-500' 
                                                        : 'bg-white border-wood-800/10 hover:border-copper-500 hover:shadow-md'
                                                    }`}
                                            >
                                                <div className="shrink-0 w-20 h-20 bg-wood-900/10 rounded-sm overflow-hidden border border-wood-800/20 relative">
                                                     {relatedDoc.imageUrl ? (
                                                        <img 
                                                            src={relatedDoc.imageUrl} 
                                                            alt="thumbnail" 
                                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                                                        />
                                                     ) : (
                                                         <div className="w-full h-full flex items-center justify-center">
                                                            <Icons.File className="text-wood-800/30" />
                                                         </div>
                                                     )}
                                                     {isDuplicate && (
                                                         <div className="absolute inset-0 bg-red-500/10 mix-blend-multiply" />
                                                     )}
                                                </div>

                                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex justify-between items-start gap-2 mb-1">
                                                            <h5 className="font-bold font-display text-wood-900 truncate group-hover:text-copper-700 transition-colors">
                                                                {relatedDoc.title}
                                                            </h5>
                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0
                                                                ${isDuplicate ? 'bg-red-100 text-red-800' : 'bg-copper-100 text-copper-800'}
                                                            `}>
                                                                {isDuplicate ? 'Posible Duplicado' : 'Relacionado'}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs font-serif text-wood-800/80 mb-2 line-clamp-2">
                                                            <span className="font-bold text-wood-900">Motivo:</span> {rel.details}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-center text-[10px] font-serif uppercase tracking-wide text-wood-800/50 pt-2 border-t border-wood-800/5">
                                                         <span>Similitud: {rel.score}%</span>
                                                         <span>{new Date(relatedDoc.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {(!analysis && activeTab !== 'transcript') && (
                    <div className="flex flex-col items-center justify-center h-48 text-wood-800/40">
                        <Icons.Analysis className="w-8 h-8 mb-2 opacity-50" />
                        <p className="font-serif italic">Ejecuta "Análisis Diplomático" para ver estos datos.</p>
                    </div>
                )}
            </div>
        </Card>
      </div>
    </div>
  );
};