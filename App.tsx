import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Transcriber } from './components/Transcriber';
import { UserGuide } from './components/UserGuide';
import { Icons } from './components/Icons';
import { ViewState, Manuscript } from './types';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSaveManuscript = (m: Manuscript) => {
    setManuscripts(prev => {
      const exists = prev.find(p => p.id === m.id);
      if (exists) {
        return prev.map(p => p.id === m.id ? m : p);
      }
      return [m, ...prev];
    });
  };

  const navItemClass = (active: boolean) => `
    w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 cursor-pointer
    ${active
      ? 'bg-copper-600 text-parchment-100 shadow-md border border-copper-400'
      : 'text-parchment-300 hover:bg-wood-800 hover:text-parchment-100 border border-transparent'}
  `;

  return (
    <div className="flex h-screen bg-parchment-200 text-wood-900 font-serif overflow-hidden">
      
      {/* Sidebar - Wood Texture */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-wood-900 border-r border-wood-800 relative transition-all duration-300 flex flex-col shadow-2xl z-20`}
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }}
      >
        <div className="h-20 flex items-center px-6 border-b border-wood-800/50 bg-wood-900/50 backdrop-blur-sm">
          <Icons.Quill className="w-8 h-8 text-copper-500 mr-3 flex-shrink-0" />
          {sidebarOpen && (
            <span className="font-display font-bold text-xl text-parchment-100 tracking-wider">
              Scriptorium
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => { setView(ViewState.DASHBOARD); setSelectedManuscript(undefined); }}
            className={navItemClass(view === ViewState.DASHBOARD)}
          >
            <Icons.Dashboard className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-display text-sm tracking-wide">Tablero</span>}
          </button>

          <button 
            onClick={() => { setView(ViewState.TRANSCRIBE); setSelectedManuscript(undefined); }}
            className={navItemClass(view === ViewState.TRANSCRIBE)}
          >
            <Icons.Scan className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-display text-sm tracking-wide">Mesa de Trabajo</span>}
          </button>

          <button 
            className={navItemClass(view === ViewState.LIBRARY)}
            // Placeholder for Library view logic if expanded later
          >
            <Icons.Library className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-display text-sm tracking-wide">Archivos</span>}
          </button>

          <div className="pt-4 mt-4 border-t border-wood-800/50">
             <button 
                onClick={() => { setView(ViewState.GUIDE); setSelectedManuscript(undefined); }}
                className={navItemClass(view === ViewState.GUIDE)}
              >
                <Icons.Help className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-display text-sm tracking-wide">Manual de Usuario</span>}
              </button>
          </div>
        </nav>

        <div className="p-4 border-t border-wood-800/50 bg-wood-900/30">
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex justify-center text-wood-800/50 hover:text-copper-400 transition-colors">
                {sidebarOpen ? 'Colapsar' : 'Expandir'}
             </button>
        </div>
      </aside>

      {/* Main Content Area - Parchment Texture */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0 mix-blend-multiply" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
        </div>

        <div className="relative z-10 flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            {view === ViewState.DASHBOARD && (
              <Dashboard 
                recentManuscripts={manuscripts} 
                onNewTranscription={() => setView(ViewState.TRANSCRIBE)}
                onSelectManuscript={(m) => {
                  setSelectedManuscript(m);
                  setView(ViewState.TRANSCRIBE);
                }}
              />
            )}

            {view === ViewState.TRANSCRIBE && (
              <Transcriber 
                initialManuscript={selectedManuscript}
                existingManuscripts={manuscripts}
                onSave={handleSaveManuscript}
                onBack={() => {
                  setView(ViewState.DASHBOARD);
                  setSelectedManuscript(undefined);
                }}
              />
            )}

            {view === ViewState.GUIDE && (
              <UserGuide />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;