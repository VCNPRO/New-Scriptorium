import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Transcriber } from './components/Transcriber';
import { UserGuide } from './components/UserGuide';
import { Settings } from './components/Settings';
import { AuthModal } from './src/components/AuthModal';
import { Icons } from './components/Icons';
import { ViewState, Manuscript, User } from './types';
import { useAuth } from './src/contexts/AuthContext';
import { UserManagement } from './components/Admin/UserManagement';
import { SearchBar } from './components/SearchBar';

function App() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
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

  // Mostrar pantalla de carga mientras verifica autenticación
  if (isLoading) {
    return (
      <div className="flex h-screen bg-parchment-200 items-center justify-center">
        <div className="text-center">
          <Icons.Quill className="w-16 h-16 text-copper-500 mx-auto mb-4 animate-pulse" />
          <p className="font-display text-wood-900 text-lg">Cargando Scriptorium...</p>
        </div>
      </div>
    );
  }

  // Mostrar login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen bg-parchment-200 text-wood-900 font-serif overflow-hidden items-center justify-center relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-0 mix-blend-multiply"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
        />
        <AuthModal onClose={() => {}} required={true} />
      </div>
    );
  }

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
            onClick={() => { setView(ViewState.LIBRARY); setSelectedManuscript(undefined); }}
            className={navItemClass(view === ViewState.LIBRARY)}
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
             {user?.role === 'admin' && (
                <button 
                    onClick={() => { setView(ViewState.ADMIN); setSelectedManuscript(undefined); }}
                    className={navItemClass(view === ViewState.ADMIN)}
                >
                    <Icons.Admin className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="font-display text-sm tracking-wide">Administración</span>}
                </button>
             )}
          </div>
        </nav>

        <div className="p-4 border-t border-wood-800/50 bg-wood-900/30 space-y-2">
             {sidebarOpen && user && (
               <div className="text-center text-parchment-200 text-xs px-2 py-1 mb-2 border-b border-wood-800/30 pb-3">
                 <p className="font-display font-bold truncate">{user?.name}</p>
                 <p className="text-parchment-300/70 text-[10px] truncate">{user?.email}</p>
               </div>
             )}

             {/* Botón de Configuración */}
             <button
               onClick={() => { setView(ViewState.SETTINGS); setSelectedManuscript(undefined); }}
               className={`w-full flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} gap-2 px-3 py-2 rounded-sm ${view === ViewState.SETTINGS ? 'bg-copper-600 text-parchment-100' : 'text-parchment-300 hover:bg-wood-800 hover:text-parchment-100'} transition-all`}
             >
               <Icons.Settings className="w-5 h-5 flex-shrink-0" />
               {sidebarOpen && <span className="font-display text-sm">Configuración</span>}
             </button>

             {/* Botón de Logout */}
             <button
               onClick={logout}
               className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-sm bg-red-600/80 hover:bg-red-700 text-parchment-100 transition-all shadow-md font-display font-bold"
             >
               <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
               {sidebarOpen && <span className="text-sm">Cerrar Sesión</span>}
             </button>

             {/* Botón Colapsar/Expandir */}
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex justify-center text-wood-800/50 hover:text-copper-400 transition-colors text-xs pt-2 border-t border-wood-800/30">
                {sidebarOpen ? 'Colapsar ◀' : 'Expandir ▶'}
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

            {view === ViewState.LIBRARY && (
              <div className="animate-fade-in">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                  <h1 className="font-display font-bold text-3xl text-wood-900">Biblioteca de Manuscritos</h1>
                  <div className="w-full md:w-96">
                    <SearchBar onSelectManuscript={(result) => {
                      const manuscript: Manuscript = {
                        id: result.id,
                        title: result.title,
                        imageUrl: result.imageUrl,
                        transcription: result.transcription,
                        translation: '',
                        analysis: result.analysis,
                        visualAnalysis: null,
                        createdAt: new Date(result.createdAt),
                        status: 'completed',
                        calculatedRelations: []
                      };
                      setSelectedManuscript(manuscript);
                      setView(ViewState.TRANSCRIBE);
                    }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {manuscripts.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <Icons.Library className="w-16 h-16 text-wood-800/20 mx-auto mb-4" />
                      <p className="font-serif text-wood-800/60 text-lg">No hay manuscritos en la biblioteca.</p>
                      <p className="font-serif text-wood-800/40 text-sm mt-2">
                        Ve a "Mesa de Trabajo" para transcribir tu primer documento.
                      </p>
                    </div>
                  ) : (
                    manuscripts.map((manuscript) => (
                      <div
                        key={manuscript.id}
                        onClick={() => {
                          setSelectedManuscript(manuscript);
                          setView(ViewState.TRANSCRIBE);
                        }}
                        className="bg-parchment-100 border border-wood-800/20 rounded-lg p-4 cursor-pointer hover:shadow-lg hover:border-copper-500 transition-all"
                      >
                        <div className="aspect-video bg-wood-900/10 rounded mb-3 overflow-hidden">
                          {manuscript.imageUrl ? (
                            <img
                              src={manuscript.imageUrl}
                              alt={manuscript.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Icons.File className="w-12 h-12 text-wood-800/30" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-wood-900 mb-2 truncate">
                          {manuscript.title}
                        </h3>
                        <p className="font-serif text-sm text-wood-800/70 line-clamp-2 mb-2">
                          {manuscript.analysis?.summary?.value || 'Sin resumen disponible'}
                        </p>
                        <div className="flex items-center justify-between text-xs text-wood-800/50">
                          <span>{new Date(manuscript.createdAt).toLocaleDateString()}</span>
                          {manuscript.analysis?.typology?.value && (
                            <span className="bg-copper-100 text-copper-800 px-2 py-1 rounded font-bold">
                              {manuscript.analysis.typology.value}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {view === ViewState.GUIDE && (
              <UserGuide />
            )}

            {view === ViewState.SETTINGS && (
              <Settings />
            )}

            {view === ViewState.ADMIN && (
              <UserManagement />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;