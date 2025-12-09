import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { manuscriptService } from '../src/services/apiService';
import { Manuscript } from '../types';

interface SearchBarProps {
  onSelectManuscript: (manuscript: any) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectManuscript }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cerrar resultados cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Búsqueda con debounce
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    if (query.trim().length < 3) {
      return; // Mínimo 3 caracteres para buscar
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await manuscriptService.search(query, 10);
        setResults(response.results || []);
        setShowResults(true);
      } catch (error) {
        console.error('Error en búsqueda:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500); // Espera 500ms después de que el usuario deja de escribir

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelectResult = (result: any) => {
    onSelectManuscript(result);
    setQuery('');
    setShowResults(false);
    setResults([]);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-copper-200 text-copper-900 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      {/* Barra de búsqueda */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowResults(true);
          }}
          placeholder="Buscar manuscritos por título, contenido, personas, lugares..."
          className="w-full px-5 py-3 pl-12 pr-12 bg-parchment-100 border-2 border-wood-800/20 rounded-lg
                     focus:border-copper-500 focus:ring-2 focus:ring-copper-200 focus:outline-none
                     font-serif text-wood-900 placeholder-wood-800/40 transition-all"
        />

        {/* Ícono de búsqueda */}
        <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-wood-800/40" />

        {/* Spinner o botón limpiar */}
        {isSearching ? (
          <Icons.Spinner className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-copper-600 animate-spin" />
        ) : query.length > 0 ? (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setShowResults(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-wood-800/40 hover:text-wood-900 transition-colors"
          >
            ✕
          </button>
        ) : null}
      </div>

      {/* Resultados de búsqueda */}
      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-parchment-100 border-2 border-wood-800/20 rounded-lg shadow-2xl max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleSelectResult(result)}
              className={`w-full text-left px-4 py-3 hover:bg-copper-100 transition-colors border-b border-wood-800/10 last:border-b-0
                         ${index === 0 ? 'rounded-t-lg' : ''} ${index === results.length - 1 ? 'rounded-b-lg' : ''}`}
            >
              <div className="flex items-start gap-3">
                {/* Miniatura */}
                <div className="shrink-0 w-16 h-16 bg-wood-900/10 rounded overflow-hidden border border-wood-800/20">
                  {result.imageUrl ? (
                    <img
                      src={result.imageUrl}
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icons.File className="w-6 h-6 text-wood-800/30" />
                    </div>
                  )}
                </div>

                {/* Información */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-wood-900 truncate mb-1">
                    {highlightMatch(result.title, query)}
                  </h4>

                  {result.analysis?.summary?.value && (
                    <p className="font-serif text-sm text-wood-800/70 line-clamp-2 mb-1">
                      {highlightMatch(result.analysis.summary.value.substring(0, 100), query)}...
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-wood-800/50">
                    <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                    {result.analysis?.typology?.value && (
                      <>
                        <span>•</span>
                        <span className="bg-copper-100 text-copper-800 px-2 py-0.5 rounded font-bold">
                          {result.analysis.typology.value}
                        </span>
                      </>
                    )}
                    {result.relevance > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-copper-600">
                          Relevancia: {(result.relevance * 100).toFixed(0)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {showResults && query.length >= 3 && results.length === 0 && !isSearching && (
        <div className="absolute z-50 w-full mt-2 bg-parchment-100 border-2 border-wood-800/20 rounded-lg shadow-2xl p-6 text-center">
          <Icons.Search className="w-12 h-12 text-wood-800/20 mx-auto mb-2" />
          <p className="font-serif text-wood-800/60">
            No se encontraron resultados para "<span className="font-bold">{query}</span>"
          </p>
          <p className="font-serif text-sm text-wood-800/40 mt-1">
            Intenta con otros términos o verifica la ortografía
          </p>
        </div>
      )}

      {/* Mensaje de ayuda */}
      {query.length > 0 && query.length < 3 && (
        <div className="absolute z-50 w-full mt-2 bg-parchment-100 border-2 border-copper-200 rounded-lg shadow-lg p-3">
          <p className="font-serif text-sm text-wood-800/60 text-center">
            Escribe al menos 3 caracteres para buscar
          </p>
        </div>
      )}
    </div>
  );
};
