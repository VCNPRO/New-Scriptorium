import React, { useState } from 'react';
import { Card, Button, Input, Badge } from './ui';
import { Icons } from './Icons';
import { Manuscript, RelationMatch } from '../types';
import { StatisticalAnalysis } from './Dashboard/StatisticalAnalysis';
import DynamicMap from './Dashboard/InteractiveMap';
import { ConfidenceDisplay, ConfidenceDot } from './Confidence';

interface DashboardProps {
  recentManuscripts: Manuscript[];
  onNewTranscription: () => void;
  onSelectManuscript: (m: Manuscript) => void;
}

type FilterType = 'all' | 'title' | 'date' | 'entity' | 'status' | 'typology';
type TabType = 'transcript' | 'diplomatics' | 'geo' | 'relations';
type SortOrder = 'desc' | 'asc';

export const Dashboard: React.FC<DashboardProps> = ({ recentManuscripts, onNewTranscription, onSelectManuscript }) => {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchValue, setSearchValue] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  
  const [editingTitle, setEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editingSummary, setEditingSummary] = useState(false);
  const [editedSummary, setEditedSummary] = useState('');

  const [editingTypology, setEditingTypology] = useState(false);
  const [editedTypology, setEditedTypology] = useState('');
  const [editingSuggestedSeries, setEditingSuggestedSeries] = useState(false);
  const [editedSuggestedSeries, setEditedSuggestedSeries] = useState('');
  const [editingScriptType, setEditingScriptType] = useState(false);
  const [editedScriptType, setEditedScriptType] = useState('');
  const [editingLanguage, setEditingLanguage] = useState(false);
  const [editedLanguage, setEditedLanguage] = useState('');

  // Placeholder function for saving edits

  // Placeholder function for saving edits
  const handleSaveEdit = async (manuscriptId: string, field: string, newValue: string) => {
    try {
      const response = await fetch('/api/manuscripts/update-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assumes token is stored in localStorage
        },
        body: JSON.stringify({ manuscriptId, field, newValue }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar la edición');
      }

      const result = await response.json();
      console.log('Edición guardada con éxito:', result.manuscript);
      
      // Update the selectedManuscript state with the new data from the backend
      if (selectedManuscript) {
        setSelectedManuscript(result.manuscript);
      }

    } catch (error: any) {
      console.error('Error al guardar edición:', error.message);
      // Optionally, show a user-friendly error message
    } finally {
      // Exit editing mode regardless of success or failure
      switch (field) {
        case 'titleSuggestion': setEditingTitle(false); break;
        case 'summary': setEditingSummary(false); break;
        case 'typology': setEditingTypology(false); break;
        case 'suggestedSeries': setEditingSuggestedSeries(false); break;
        case 'scriptType': setEditingScriptType(false); break;
        case 'language': setEditingLanguage(false); break;
      }
    }
  };
  
  // State for Detail View inside Dashboard (Modal)
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('transcript');

  // Stats Calculation
  const stats = {
      total: recentManuscripts.length,
      processed: recentManuscripts.filter(m => m.status === 'completed').length,
      entities: recentManuscripts.reduce((acc, m) => acc + (m.analysis ? (m.analysis.entities.people?.length || 0) + (m.analysis.entities.locations?.length || 0) : 0), 0),
      alerts: recentManuscripts.filter(m => m.analysis?.qualityAlerts?.length).length
  };

  const filteredManuscripts = recentManuscripts
    .filter(m => {
        if (!searchValue) return true;
        const term = searchValue.toLowerCase();

        switch (filterType) {
        case 'title': return m.title.toLowerCase().includes(term);
        case 'date': return new Date(m.createdAt).toISOString().split('T')[0] === searchValue;
        case 'entity': 
            if (!m.analysis) return false;
            return (m.analysis.entities.people?.some(p => p.value.toLowerCase().includes(term)) || 
                    m.analysis.entities.locations?.some(l => l.value.toLowerCase().includes(term)));
        case 'typology': return m.analysis?.typology?.value.toLowerCase().includes(term) || false;
        case 'status':
            if (searchValue === 'all') return true;
            return searchValue === 'completed' ? m.status === 'completed' : m.status !== 'completed';
        default: // Smart Search
            const dateStr = new Date(m.createdAt).toLocaleDateString('es-ES').toLowerCase();
            return m.title.toLowerCase().includes(term) || dateStr.includes(term) || 
                   m.analysis?.suggestedSeries?.value.toLowerCase().includes(term) || false;
        }
    })
    .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const TabButton = ({ id, icon: Icon, label, alert }: { id: TabType, icon: any, label: string, alert?: number }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`relative flex items-center gap-2 px-6 py-3 text-sm font-bold font-display tracking-wide transition-all border-b-2 
        ${activeTab === id 
            ? 'border-copper-500 text-wood-900 bg-white' 
            : 'border-transparent text-wood-800/50 hover:text-wood-800 hover:bg-wood-800/5'}`}
    >
        <Icon className={`w-4 h-4 ${activeTab === id ? 'text-copper-600' : ''}`} />
        {label}
        {alert ? (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-copper-600 text-[9px] text-white shadow-sm">
                {alert}
            </span>
        ) : null}
    </button>
  );

  // --- MODAL RENDER HELPER ---
  const renderDetailModal = () => {
    if (!selectedManuscript) return null;
    const { analysis, visualAnalysis, calculatedRelations } = selectedManuscript;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div 
          className="absolute inset-0 bg-wood-900/80 backdrop-blur-sm"
          onClick={() => setSelectedManuscript(null)}
        ></div>

        <div className="relative w-full max-w-7xl h-[90vh] bg-parchment-100 rounded shadow-2xl flex flex-col overflow-hidden border border-wood-800/50">
            {/* Professional Header: Dark Theme for contrast */}
            <div className="flex items-center justify-between px-6 py-4 bg-wood-900 text-parchment-100 shadow-md z-10">
                <div className="flex items-center gap-4 min-w-0">
                     <div className="w-10 h-10 bg-white/5 border border-white/10 rounded flex items-center justify-center shrink-0">
                        <Icons.Manuscript className="text-copper-400" />
                     </div>
                     <div className="min-w-0">
                        <h2 className="font-display font-bold text-lg leading-tight truncate pr-4" title={selectedManuscript.title}>
                            {selectedManuscript.title}
                        </h2>
                        <div className="flex items-center gap-3 text-xs font-serif text-white/50">
                            <span className="font-mono bg-white/10 px-1.5 rounded text-white/70">ID: {selectedManuscript.id.slice(-6)}</span>
                            <span>|</span>
                            <span>{new Date(selectedManuscript.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                        {analysis?.typology?.value && (
                                                            <>
                                                                <span>|</span>
                                                                <span className="text-copper-400 font-bold">{analysis.typology.value}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                 <Button 
                                                    onClick={() => onSelectManuscript(selectedManuscript)} 
                                                    variant="primary"
                                                    className="!py-1.5 !text-xs !bg-copper-600 hover:!bg-copper-500 border-none"
                                                >
                                                    <Icons.Quill className="w-3 h-3 mr-2" />
                                                    Editar / Analizar
                                                </Button>
                                                <div className="h-8 w-px bg-white/10 mx-1"></div>
                                                <button 
                                                    onClick={() => setSelectedManuscript(null)}
                                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                                                    title="Cerrar (Esc)"
                                                >
                                                     <Icons.ArrowRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                            
                                        {/* Main Content Area */}
                                        <div className="flex-1 flex overflow-hidden">
                                            
                                            {/* Left Panel: Visual Source (40%) */}
                                            <div className="w-2/5 flex flex-col border-r border-wood-800/10 bg-wood-900/5 relative">
                                                 <div className="flex-1 overflow-hidden relative flex items-center justify-center p-4 bg-wood-900/5">
                                                    <img 
                                                        src={selectedManuscript.imageUrl} 
                                                        className="max-w-full max-h-full object-contain shadow-lg rounded-sm" 
                                                        alt="Facsímil del Manuscrito" 
                                                    />
                                                 </div>
                                                 
                                                 {/* Visual Analysis Summary Strip */}
                                                 {visualAnalysis && (
                                                    <div className="bg-parchment-200 border-t border-wood-800/10 p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="text-xs font-bold uppercase text-wood-800/60 flex items-center gap-1">
                                                                <Icons.Scan className="w-3 h-3" /> Análisis Visual
                                                            </h4>
                                                            <span className="text-[10px] font-bold text-wood-900 bg-wood-800/5 px-2 py-0.5 rounded">
                                                                Estado: {visualAnalysis.physicalCondition}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {visualAnalysis.hasSeals && <Badge color="copper">Sigilografía</Badge>}
                                                            {visualAnalysis.hasMaps && <Badge color="green">Cartografía</Badge>}
                                                            {visualAnalysis.hasTables && <Badge color="wood">Tablas</Badge>}
                                                            {visualAnalysis.hasIlluminations && <Badge color="copper">Iluminaciones</Badge>}
                                                            {!visualAnalysis.hasSeals && !visualAnalysis.hasMaps && !visualAnalysis.hasTables && (
                                                                <span className="text-xs text-wood-800/40 italic">Sin elementos gráficos destacados.</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                 )}
                                            </div>
                            
                                            {/* Right Panel: Data & Intelligence (60%) */}
                                            <div className="w-3/5 flex flex-col bg-parchment-100">
                                                
                                                {/* Tabs Navigation */}
                                                <div className="flex border-b border-wood-800/10 bg-parchment-200 px-4">
                                                    <TabButton id="transcript" icon={Icons.File} label="Transcripción" />
                                                    <TabButton id="diplomatics" icon={Icons.Analysis} label="Diplomática" />
                                                    <TabButton id="geo" icon={Icons.Search} label="Geografía" />
                                                    <TabButton id="relations" icon={Icons.Library} label="Expediente" alert={calculatedRelations?.length} />
                                                </div>
                            
                                                {/* Tab Content */}
                                                <div className="flex-1 overflow-y-auto p-8">
                                                    
                                                    {activeTab === 'transcript' && (
                                                        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                                                            <div>
                                                                <div className="flex items-center justify-between mb-4">
                                                                    <h3 className="font-display font-bold text-xl text-wood-900 border-b-2 border-copper-500 inline-block pb-1">Texto Transcrito</h3>
                                                                    <div className="flex gap-2">
                                                                        {selectedManuscript.translation && <Badge color="green">Traducido</Badge>}
                                                                        <span className="text-xs text-wood-800/50 font-serif italic">Modelo: Gemini 1.5 Pro</span>
                                                                    </div>
                                                                </div>
                                                                <div className="p-8 bg-white border border-wood-800/10 shadow-sm rounded-sm font-script text-xl leading-loose text-wood-900 whitespace-pre-wrap relative">
                                                                     {/* Decorative watermark/line number simulation */}
                                                                    <div className="absolute left-4 top-8 bottom-8 w-px bg-copper-200"></div>
                                                                    <div className="pl-6">
                                                                        {selectedManuscript.transcription || <span className="italic opacity-50 text-wood-800">No hay transcripción disponible.</span>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            {selectedManuscript.translation && (
                                                                <div>
                                                                    <h3 className="font-display font-bold text-lg text-wood-900 mb-3 flex items-center gap-2">
                                                                        <Icons.AI className="w-4 h-4 text-copper-600" /> Traducción Accesible
                                                                    </h3>
                                                                    <div className="p-6 bg-wood-900/5 border border-wood-800/5 rounded-sm font-serif text-sm leading-relaxed text-wood-900">
                                                                        {selectedManuscript.translation}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                            
                                                    {activeTab === 'diplomatics' && (
                                                        <div className="animate-fade-in max-w-3xl mx-auto">
                                                            {!analysis ? (
                                                                <div className="text-center py-12 text-wood-800/40">
                                                                    <Icons.Analysis className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                                                    <p>Análisis pendiente.</p>
                                                                </div>
                                                            ) : (
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                    {/* Left Column: Metadata */}
                                                                    <div className="space-y-6">
                                                                                                                    <section>
                                                                                                                        <h4 className="text-xs font-bold uppercase tracking-widest text-wood-800/50 mb-3 border-b border-wood-800/10 pb-1">Identificación</h4>
                                                                                                                        <div className="bg-white p-4 rounded border border-wood-800/10 space-y-4">
                                                                                                                            <div>
                                                                                                                                <span className="block text-xs text-wood-800/60 uppercase">Tipología Documental</span>
                                                                                                                                <div className="flex items-center justify-between">
                                                                                                                                    {editingTypology ? (
                                                                                                                                        <Input
                                                                                                                                            value={editedTypology}
                                                                                                                                            onChange={(e) => setEditedTypology(e.target.value)}
                                                                                                                                            className="flex-grow mr-2"
                                                                                                                                        />
                                                                                                                                    ) : (
                                                                                                                                        <ConfidenceDisplay item={analysis.typology} className="font-display font-bold text-lg text-wood-900" />
                                                                                                                                    )}
                                                                                                                                    {selectedManuscript && (
                                                                                                                                      <div className="flex gap-1">
                                                                                                                                        {editingTypology ? (
                                                                                                                                          <>
                                                                                                                                            <Button variant="ghost" className="!p-1 h-auto" onClick={() => handleSaveEdit(selectedManuscript.id, 'typology', editedTypology)}>
                                                                                                                                              <Icons.Check className="w-4 h-4 text-green-600" />
                                                                                                                                            </Button>
                                                                                                                                            <Button variant="ghost" className="!p-1 h-auto" onClick={() => setEditingTypology(false)}>
                                                                                                                                              <Icons.X className="w-4 h-4 text-red-600" />
                                                                                                                                            </Button>
                                                                                                                                          </>
                                                                                                                                        ) : (
                                                                                                                                          <Button variant="ghost" className="!p-1 h-auto" onClick={() => { setEditingTypology(true); setEditedTypology(analysis.typology?.value || ''); }}>
                                                                                                                                            <Icons.Edit className="w-4 h-4" />
                                                                                                                                          </Button>
                                                                                                                                        )}
                                                                                                                                      </div>
                                                                                                                                    )}
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <span className="block text-xs text-wood-800/60 uppercase">Serie Archivística</span>
                                                                                                                                <div className="flex items-center justify-between">
                                                                                                                                    {editingSuggestedSeries ? (
                                                                                                                                        <Input
                                                                                                                                            value={editedSuggestedSeries}
                                                                                                                                            onChange={(e) => setEditedSuggestedSeries(e.target.value)}
                                                                                                                                            className="flex-grow mr-2"
                                                                                                                                        />
                                                                                                                                    ) : (
                                                                                                                                        <ConfidenceDisplay item={analysis.suggestedSeries} className="font-serif font-bold text-wood-900" />
                                                                                                                                    )}
                                                                                                                                    {selectedManuscript && (
                                                                                                                                      <div className="flex gap-1">
                                                                                                                                        {editingSuggestedSeries ? (
                                                                                                                                          <>
                                                                                                                                            <Button variant="ghost" className="!p-1 h-auto" onClick={() => handleSaveEdit(selectedManuscript.id, 'suggestedSeries', editedSuggestedSeries)}>
                                                                                                                                              <Icons.Check className="w-4 h-4 text-green-600" />
                                                                                                                                            </Button>
                                                                                                                                            <Button variant="ghost" className="!p-1 h-auto" onClick={() => setEditingSuggestedSeries(false)}>
                                                                                                                                              <Icons.X className="w-4 h-4 text-red-600" />
                                                                                                                                            </Button>
                                                                                                                                          </>
                                                                                                                                        ) : (
                                                                                                                                          <Button variant="ghost" className="!p-1 h-auto" onClick={() => { setEditingSuggestedSeries(true); setEditedSuggestedSeries(analysis.suggestedSeries?.value || ''); }}>
                                                                                                                                            <Icons.Edit className="w-4 h-4" />
                                                                                                                                          </Button>
                                                                                                                                        )}
                                                                                                                                      </div>
                                                                                                                                    )}
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </section>                            
                                                                                                                    <section>
                                                                                                                        <h4 className="text-xs font-bold uppercase tracking-widest text-wood-800/50 mb-3 border-b border-wood-800/10 pb-1">Paleografía</h4>
                                                                                                                        <div className="space-y-2 font-serif text-sm text-wood-900">
                                                                                                                            <div className="flex justify-between items-center border-b border-wood-800/5 pb-2">
                                                                                                                                <span className="text-wood-800/60">Escritura</span>
                                                                                                                                <div className="flex items-center justify-between flex-grow">
                                                                                                                                    {editingScriptType ? (
                                                                                                                                        <Input
                                                                                                                                            value={editedScriptType}
                                                                                                                                            onChange={(e) => setEditedScriptType(e.target.value)}
                                                                                                                                            className="flex-grow mr-2"
                                                                                                                                        />
                                                                                                                                    ) : (
                                                                                                                                        <ConfidenceDisplay item={analysis.scriptType} className="font-bold" />
                                                                                                                                    )}
                                                                                                                                    {selectedManuscript && (
                                                                                                                                      <div className="flex gap-1">
                                                                                                                                        {editingScriptType ? (
                                                                                                                                          <>
                                                                                                                                            <Button variant="ghost" className="!p-1 h-auto" onClick={() => handleSaveEdit(selectedManuscript.id, 'scriptType', editedScriptType)}>
                                                                                                                                              <Icons.Check className="w-4 h-4 text-green-600" />
                                                                                                                                            </Button>
                                                                                                                                            <Button variant="ghost" className="!p-1 h-auto" onClick={() => setEditingScriptType(false)}>
                                                                                                                                              <Icons.X className="w-4 h-4 text-red-600" />
                                                                                                                                            </Button>
                                                                                                                                          </>
                                                                                                                                        ) : (
                                                                                                                                          <Button variant="ghost" className="!p-1 h-auto" onClick={() => { setEditingScriptType(true); setEditedScriptType(analysis.scriptType?.value || ''); }}>
                                                                                                                                            <Icons.Edit className="w-4 h-4" />
                                                                                                                                          </Button>
                                                                                                                                        )}
                                                                                                                                      </div>
                                                                                                                                    )}
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div className="flex justify-between items-center border-b border-wood-800/5 pb-2">
                                                                                                                                <span className="text-wood-800/60">Idioma</span>
                                                                                                                                <div className="flex items-center justify-between flex-grow">
                                                                                                                                    {editingLanguage ? (
                                                                                                                                        <Input
                                                                                                                                            value={editedLanguage}
                                                                                                                                            onChange={(e) => setEditedLanguage(e.target.value)}
                                                                                                                                            className="flex-grow mr-2"
                                                                                                                                        />
                                                                                                                                    ) : (
                                                                                                                                        <ConfidenceDisplay item={analysis.language} />
                                                                                                                                    )}
                                                                                                                                    {selectedManuscript && (
                                                                                                                                      <div className="flex gap-1">
                                                                                                                                        {editingLanguage ? (
                                                                                                                                          <>
                                                                                                                                            <Button variant="ghost" className="!p-1 h-auto" onClick={() => handleSaveEdit(selectedManuscript.id, 'language', editedLanguage)}>
                                                                                                                                              <Icons.Check className="w-4 h-4 text-green-600" />
                                                                                                                                            </Button>
                                                                                                                                            <Button variant="ghost" className="!p-1 h-auto" onClick={() => setEditingLanguage(false)}>
                                                                                                                                              <Icons.X className="w-4 h-4 text-red-600" />
                                                                                                                                            </Button>
                                                                                                                                          </>
                                                                                                                                        ) : (
                                                                                                                                          <Button variant="ghost" className="!p-1 h-auto" onClick={() => { setEditingLanguage(true); setEditedLanguage(analysis.language?.value || ''); }}>
                                                                                                                                            <Icons.Edit className="w-4 h-4" />
                                                                                                                                          </Button>
                                                                                                                                        )}
                                                                                                                                      </div>
                                                                                                                                    )}
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </section>                                                                    </div>
                            
                                                                    {/* Right Column: Content */}
                                                                                                            <div className="space-y-6">
                                                                                                                <section>
                                                                                                                    <h4 className="text-xs font-bold uppercase tracking-widest text-wood-800/50 mb-3 border-b border-wood-800/10 pb-1">Contenido</h4>
                                                                                                                    <div className="bg-white p-4 rounded border border-wood-800/10">
                                                                                                                        {/* Editable Title Suggestion */}
                                                                                                                        <div className="mb-2 flex items-center justify-between">
                                                                                                                            {editingTitle ? (
                                                                                                                                <Input
                                                                                                                                    value={editedTitle}
                                                                                                                                    onChange={(e) => setEditedTitle(e.target.value)}
                                                                                                                                    className="flex-grow mr-2"
                                                                                                                                />
                                                                                                                            ) : (
                                                                                                                                <ConfidenceDisplay item={analysis.titleSuggestion} className="font-display font-bold text-wood-900" />
                                                                                                                            )}
                                                                                                                            {selectedManuscript && (
                                                                                                                              <div className="flex gap-1">
                                                                                                                                {editingTitle ? (
                                                                                                                                  <>
                                                                                                                                    <Button variant="ghost" className="!p-1 h-auto" onClick={() => handleSaveEdit(selectedManuscript.id, 'titleSuggestion', editedTitle)}>
                                                                                                                                      <Icons.Check className="w-4 h-4 text-green-600" />
                                                                                                                                    </Button>
                                                                                                                                    <Button variant="ghost" className="!p-1 h-auto" onClick={() => setEditingTitle(false)}>
                                                                                                                                      <Icons.X className="w-4 h-4 text-red-600" />
                                                                                                                                    </Button>
                                                                                                                                  </>
                                                                                                                                ) : (
                                                                                                                                  <Button variant="ghost" className="!p-1 h-auto" onClick={() => { setEditingTitle(true); setEditedTitle(analysis.titleSuggestion?.value || ''); }}>
                                                                                                                                    <Icons.Edit className="w-4 h-4" />
                                                                                                                                  </Button>
                                                                                                                                )}
                                                                                                                              </div>
                                                                                                                            )}
                                                                                                                        </div>
                                                                    
                                                                                                                        {/* Editable Summary */}
                                                                                                                                                                            <div className="mb-4 flex items-start justify-between">
                                                                                                                                                                                {editingSummary ? (
                                                                                                                                                                                    <textarea
                                                                                                                                                                                        value={editedSummary}
                                                                                                                                                                                        onChange={(e) => setEditedSummary(e.target.value)}
                                                                                                                                                                                        className="flex-grow mr-2 w-full bg-parchment-100 border border-wood-800/30 text-wood-900 placeholder-wood-800/40 px-3 py-2 rounded-sm focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition-all font-serif"
                                                                                                                                                                                        rows={4} // Added rows for better textarea display
                                                                                                                                                                                    />
                                                                                                                                                                                ) : (                                                                                                                                <ConfidenceDisplay item={analysis.summary} className="text-sm font-serif text-wood-800/80 leading-relaxed" />
                                                                                                                            )}
                                                                                                                            {selectedManuscript && (
                                                                                                                              <div className="flex gap-1">
                                                                                                                                {editingSummary ? (
                                                                                                                                  <>
                                                                                                                                    <Button variant="ghost" className="!p-1 h-auto" onClick={() => handleSaveEdit(selectedManuscript.id, 'summary', editedSummary)}>
                                                                                                                                      <Icons.Check className="w-4 h-4 text-green-600" />
                                                                                                                                    </Button>
                                                                                                                                    <Button variant="ghost" className="!p-1 h-auto" onClick={() => setEditingSummary(false)}>
                                                                                                                                      <Icons.X className="w-4 h-4 text-red-600" />
                                                                                                                                    </Button>
                                                                                                                                  </>
                                                                                                                                ) : (
                                                                                                                                  <Button variant="ghost" className="!p-1 h-auto" onClick={() => { setEditingSummary(true); setEditedSummary(analysis.summary?.value || ''); }}>
                                                                                                                                    <Icons.Edit className="w-4 h-4" />
                                                                                                                                  </Button>
                                                                                                                                )}
                                                                                                                              </div>
                                                                                                                            )}
                                                                                                                        </div>
                                                                    
                                                                                                                        <div className="flex flex-wrap gap-2">
                                                                                                                            {analysis.keywords?.map((k, i) => (
                                                                                                                                <span key={i} className="flex items-center gap-1.5 px-2 py-1 bg-wood-800/5 text-wood-900 text-xs rounded border border-wood-800/10">
                                                                                                                                    <ConfidenceDot confidence={k.confidence} />
                                                                                                                                    #{k.value}
                                                                                                                                </span>
                                                                                                                            ))}
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </section>
                                                                                                                                            {analysis.qualityAlerts?.length > 0 && (
                                                                            <section>
                                                                                <h4 className="text-xs font-bold uppercase tracking-widest text-red-800/50 mb-3 border-b border-red-800/10 pb-1">Alertas de Calidad</h4>
                                                                                <ul className="bg-red-50 p-3 rounded border border-red-100 text-xs text-red-900 space-y-1">
                                                                                    {analysis.qualityAlerts.map((alert, i) => (
                                                                                        <li key={i} className="flex gap-2 items-start">
                                                                                            <div className="pt-1"><ConfidenceDot confidence={alert.confidence} /></div>
                                                                                            <span>{alert.value}</span>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </section>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                            
                                                                            {activeTab === 'geo' && (
                                                                                 <div className="animate-fade-in max-w-3xl mx-auto">
                                                                                    {!analysis ? <p className="text-center text-wood-800/40 italic">Análisis no disponible.</p> : (
                                                                                        <div className="space-y-8">
                                                                                            <div>
                                                                                                <h4 className="font-display font-bold text-wood-900 mb-4 flex items-center gap-2">
                                                                                                    <Icons.Search className="w-5 h-5 text-copper-600" /> Mapa Geográfico
                                                                                                </h4>
                                                                                                <DynamicMap geodata={analysis.geodata || []} />
                                                                                            </div>
                                                    
                                                                                            <div>
                                                                                                <h4 className="text-xs font-bold uppercase tracking-widest text-wood-800/50 mb-3">Entidades Relacionadas</h4>
                                                                                                <div className="flex flex-wrap gap-2">
                                                                                                    {analysis.entities.people.map((p, i) => <Badge key={i} color="copper" item={p} />)}
                                                                                                    {analysis.entities.organizations.map((o, i) => <Badge key={i} color="wood" item={o} />)}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            )}                            
                                                    {activeTab === 'relations' && (
                                                         <div className="animate-fade-in max-w-3xl mx-auto space-y-8">
                                                            {/* Explicit References */}
                                                            {analysis?.documentReferences && analysis.documentReferences.length > 0 && (
                                                                <div className="bg-wood-800/5 rounded p-4 border-l-4 border-wood-800">
                                                                    <h4 className="font-bold text-wood-900 text-sm mb-2">Citas Textuales Detectadas</h4>
                                                                                                            <ul className="space-y-1">
                                                                                                                {analysis.documentReferences.map((ref, i) => (
                                                                                                                    <li key={i} className="text-sm font-serif italic text-wood-800/80 flex items-center gap-1">
                                                                                                                      <ConfidenceDot confidence={ref.confidence} />
                                                                                                                      "{ref.value}"
                                                                                                                    </li>
                                                                                                                ))}
                                                                                                            </ul>                                                                </div>
                                                            )}
                            
                                                            <div>
                                                                <h4 className="font-display font-bold text-wood-900 mb-4 flex items-center justify-between">
                                                                    <span>Documentos Relacionados en el Fondo</span>
                                                                    <span className="text-xs font-serif font-normal text-wood-800/50">{calculatedRelations?.length || 0} coincidencias</span>
                                                                </h4>
                                                                
                                                                {!calculatedRelations || calculatedRelations.length === 0 ? (
                                                                    <div className="text-center p-8 border-2 border-dashed border-wood-800/10 rounded-lg">
                                                                        <p className="text-wood-800/40 font-serif">Sin relaciones automáticas detectadas.</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="space-y-3">
                                                                        {calculatedRelations.map((rel, i) => {
                                                                            const relatedDoc = recentManuscripts.find(m => m.id === rel.manuscriptId);
                                                                            if (!relatedDoc) return null;
                                                                            const isDuplicate = rel.reason === 'duplicate';
                            
                                                                            return (
                                                                                <div key={i} className="flex gap-4 p-4 bg-white border border-wood-800/10 rounded hover:shadow-md hover:border-copper-400 transition-all cursor-pointer"
                                                                                     onClick={() => setSelectedManuscript(relatedDoc)}>
                                                                                    <div className="w-16 h-16 bg-wood-900/10 rounded overflow-hidden shrink-0 border border-wood-800/20">
                                                                                        {relatedDoc.imageUrl ? (
                                                                                            <img src={relatedDoc.imageUrl} className="w-full h-full object-cover" alt="" />
                                                                                        ) : <Icons.File className="m-4 text-wood-800/20" />}
                                                                                    </div>
                                                                                    <div className="flex-1">
                                                                                        <div className="flex justify-between items-start">
                                                                                            <h5 className="font-bold text-wood-900">{relatedDoc.title}</h5>
                                                                                            <Badge color={isDuplicate ? 'green' : 'copper'}>
                                                                                                {isDuplicate ? 'Duplicado Posible' : 'Relacionado'}
                                                                                            </Badge>
                                                                                        </div>
                                                                                        <p className="text-xs text-wood-800/60 mt-1 mb-2">{rel.details}</p>
                                                                                        <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-wood-800/40">
                                                                                            <span>Similitud: {rel.score}%</span>
                                                                                            <span>ID: {relatedDoc.id.slice(-6)}</span>
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
                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                );
                              };
                            
                              // --- DASHBOARD LAYOUT ---
                              return (
                                <div className="h-full flex flex-col animate-fade-in relative">
                                  
                                  {/* Detail Modal */}
                                  {renderDetailModal()}
                            
                                  {/* Stats Modal */}
                                  <StatisticalAnalysis
                                    isOpen={isStatsModalOpen}
                                    onClose={() => setIsStatsModalOpen(false)}
                                    documentIds={recentManuscripts.map(m => m.id)}
                                  />
                            
                                  {/* Header & Metrics */}
                                  <div className="flex flex-col lg:flex-row gap-6 items-start justify-between mb-8 pb-6 border-b border-wood-800/10">
                                    <div>
                                        <h1 className="text-3xl font-display font-bold text-wood-900 mb-1">Tablero de Mando</h1>
                                        <p className="font-serif text-sm text-wood-800/70">Sistema de Gestión Documental Scriptorium v2.4</p>
                                    </div>
                                    
                                    {/* KPI / Metrics Row */}
                                    <div className="flex gap-2 sm:gap-6 flex-wrap lg:flex-nowrap">
                                        {[
                                            { label: "Fondo Total", val: stats.total, icon: Icons.Library, color: "text-wood-900" },
                                            { label: "Procesados", val: stats.processed, icon: Icons.File, color: "text-copper-600" },
                                            { label: "Entidades", val: stats.entities, icon: Icons.AI, color: "text-wood-800" },
                                            { label: "Alertas", val: stats.alerts, icon: Icons.Analysis, color: "text-red-700" }
                                        ].map((stat, i) => (
                                            <div key={i} className="flex items-center gap-3 px-4 py-2 bg-parchment-100 border border-wood-800/20 rounded shadow-sm min-w-[140px]">
                                                <stat.icon className={`w-5 h-5 ${stat.color} opacity-80`} />
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-wood-800/50 tracking-wider">{stat.label}</p>
                                                    <p className="font-display font-bold text-xl text-wood-900">{stat.val}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                  </div>
                            
                                  {/* Control Bar (Professional Tooling) */}
                                  <div className="bg-parchment-200/50 border border-wood-800/10 p-2 rounded-sm flex flex-col md:flex-row items-center gap-2 shadow-inner mb-4">
                                        <div className="flex-1 flex items-center gap-2 w-full">
                                            <div className="relative flex-1">
                                                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wood-800/40" />
                                                <input 
                                                    placeholder="Búsqueda avanzada (ID, Título, Serie, Contenido...)" 
                                                    value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}
                                                    className="w-full pl-9 pr-3 py-2 bg-parchment-100 border border-wood-800/20 text-wood-900 text-sm font-serif rounded-sm focus:outline-none focus:border-copper-500"
                                                />
                                            </div>
                                            
                                            <select 
                                                value={filterType}
                                                onChange={(e) => setFilterType(e.target.value as FilterType)}
                                                className="bg-parchment-100 border border-wood-800/20 text-wood-900 text-sm font-bold font-serif px-3 py-2 rounded-sm focus:outline-none focus:border-copper-500"
                                            >
                                                <option value="all">Todo</option>
                                                <option value="title">Título</option>
                                                <option value="typology">Tipología</option>
                                                <option value="status">Estado</option>
                                            </select>
                            
                                            <button 
                                                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                                                className="p-2 bg-parchment-100 border border-wood-800/20 rounded-sm hover:border-copper-500 text-wood-800"
                                                title="Ordenar por fecha"
                                            >
                                                <div className="flex flex-col text-[10px] leading-none font-bold">
                                                    <span className={sortOrder === 'asc' ? 'text-copper-600' : 'opacity-30'}>▲</span>
                                                    <span className={sortOrder === 'desc' ? 'text-copper-600' : 'opacity-30'}>▼</span>
                                                </div>
                                            </button>
                                        </div>
                                        
                                        <div className="h-6 w-px bg-wood-800/10 mx-2 hidden md:block"></div>
                                        
                                        <Button 
                                            variant="secondary"
                                            onClick={() => setIsStatsModalOpen(true)}
                                            disabled={recentManuscripts.length === 0}
                                            className="w-full md:w-auto text-sm py-2"
                                        >
                                            <Icons.Analysis className="w-4 h-4 mr-2" />
                                            Analizar Fondo
                                        </Button>
                                        <Button onClick={onNewTranscription} className="w-full md:w-auto text-sm py-2">
                                            <Icons.Upload className="w-4 h-4 mr-2" />
                                            Ingresar Lote
                                        </Button>
                                  </div>
                            
                                  {/* Data Grid (High Density Table) */}
                                  <div className="flex-1 overflow-hidden flex flex-col border border-wood-800/20 rounded-sm bg-parchment-100 shadow-lg">
                                      {/* Table Header */}
                                      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-wood-900/5 border-b border-wood-800/10 text-xs font-bold font-display uppercase tracking-wider text-wood-800/60 items-center">
                                          <div className="col-span-6 md:col-span-5 flex items-center gap-2">
                                              <div className="w-4 h-4 border border-wood-800/30 rounded-sm"></div> {/* Batch Select Mock */}
                                              <span>Documento</span>
                                          </div>
                                          <div className="hidden md:block col-span-2">Serie / Tipo</div>
                                          <div className="hidden lg:block col-span-2 text-center">Datos</div>
                                          <div className="col-span-3 md:col-span-2 text-right md:text-left">Estado / Fecha</div>
                                          <div className="col-span-3 md:col-span-1 text-right">Acción</div>
                                      </div>
                            
                                      {/* Table Body */}
                                      <div className="flex-1 overflow-y-auto">
                                        {filteredManuscripts.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full text-wood-800/40 p-12">
                                                 <Icons.Search className="w-12 h-12 mb-4 opacity-30" />
                                                 <p>No se encontraron registros en el catálogo actual.</p>
                                            </div>
                                        ) : (
                                            filteredManuscripts.map((m) => (
                                                <div 
                                                    key={m.id}
                                                    className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-wood-800/5 hover:bg-wood-800/5 items-center group transition-colors cursor-pointer text-sm"
                                                    onClick={() => setSelectedManuscript(m)}
                                                >
                                                    {/* Column 1: Document */}
                                                    <div className="col-span-6 md:col-span-5 flex items-center gap-3 overflow-hidden">
                                                        <div className="w-4 h-4 border border-wood-800/30 rounded-sm shrink-0" onClick={(e) => e.stopPropagation()}></div>
                                                        <div className="w-10 h-10 bg-wood-900/10 border border-wood-800/20 rounded shrink-0 overflow-hidden relative">
                                                            {m.imageUrl ? (
                                                                <img src={m.imageUrl} className="w-full h-full object-cover" alt="" />
                                                            ) : <Icons.File className="p-2 w-full h-full text-wood-800/30" />}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-wood-900 font-display truncate">{m.title}</p>
                                                            <p className="text-[10px] font-mono text-wood-800/50 truncate">ID: {m.id}</p>
                                                        </div>
                                                    </div>
                            
                                                    {/* Column 2: Series */}
                                                    <div className="hidden md:block col-span-2 font-serif text-wood-800/80 truncate">
                                                        {m.analysis ? (
                                                            <div className="flex flex-col">
                                                                <span className="font-bold">{m.analysis.suggestedSeries.value}</span>
                                                                <span className="text-xs opacity-70">{m.analysis.typology.value}</span>
                                                            </div>
                                                        ) : <span className="italic opacity-50">Sin clasificar</span>}
                                                    </div>
                            
                                                    {/* Column 3: Data Stats */}
                                                    <div className="hidden lg:flex col-span-2 justify-center gap-2">
                                                         {m.analysis && (
                                                            <>
                                                                <span className="px-1.5 py-0.5 bg-copper-100 text-copper-800 rounded text-[10px] font-bold" title="Personas">{m.analysis.entities.people.length} P</span>
                                                                <span className="px-1.5 py-0.5 bg-wood-800/10 text-wood-900 rounded text-[10px] font-bold" title="Lugares">{m.analysis.entities.locations.length} L</span>
                                                                {m.visualAnalysis?.hasSeals && <span className="px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-[10px] font-bold" title="Sello">S</span>}
                                                            </>
                                                         )}
                                                    </div>
                            
                                                    {/* Column 4: Status/Date */}
                                                    <div className="col-span-3 md:col-span-2 flex flex-col md:items-start items-end">
                                                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1
                                                            ${m.status === 'completed' ? 'text-green-700' : 'text-copper-700'}`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${m.status === 'completed' ? 'bg-green-600' : 'bg-copper-600 animate-pulse'}`}></div>
                                                            {m.status === 'completed' ? 'Indexado' : 'Procesando'}
                                                        </div>
                                                        <span className="text-xs font-serif text-wood-800/60">{new Date(m.createdAt).toLocaleDateString()}</span>
                                                    </div>
                            
                                                    {/* Column 5: Action */}
                                                    <div className="col-span-3 md:col-span-1 text-right">
                                                         <Button variant="ghost" className="!p-1 h-8 w-8 rounded-full border border-wood-800/10 hover:border-copper-500">
                                                            <Icons.ArrowRight className="w-4 h-4" />
                                                         </Button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                      </div>
                                      
                                      {/* Footer / Pagination Mock */}
                                      <div className="bg-parchment-200 border-t border-wood-800/10 px-4 py-2 flex justify-between items-center text-xs font-serif text-wood-800/60">
                                            <span>Mostrando {filteredManuscripts.length} registros</span>
                                            <div className="flex gap-2">
                                                <button className="px-2 py-1 bg-parchment-100 border border-wood-800/20 rounded hover:border-copper-500 disabled:opacity-50" disabled>Anterior</button>
                                                <button className="px-2 py-1 bg-parchment-100 border border-wood-800/20 rounded hover:border-copper-500">Siguiente</button>
                                            </div>
                                      </div>
                                  </div>
                                </div>
                              );
                            };
                            