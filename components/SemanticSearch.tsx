import React, { useState } from 'react';
import { Card, Button, Input } from './ui';
import { Icons } from './Icons';
import { Manuscript } from '../types';

interface SearchResult {
  manuscript: Manuscript;
  similarity: number;
}

interface SemanticSearchProps {
  onSelectManuscript: (manuscript: Manuscript) => void;
}

export const SemanticSearch: React.FC<SemanticSearchProps> = ({ onSelectManuscript }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'semantic' | 'text'>('semantic');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      let response;

      if (searchType === 'semantic') {
        // Búsqueda semántica usando embeddings
        response = await fetch('/api/manuscripts/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            query,
            type: 'semantic',
            limit: 10
          })
        });
      } else {
        // Búsqueda textual tradicional
        response = await fetch('/api/manuscripts/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            query,
            type: 'text',
            limit: 10
          })
        });
      }

      const data = await response.json();

      if (data.success && data.results) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.9) return 'text-green-600';
    if (similarity >= 0.7) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getSimilarityLabel = (similarity: number) => {
    const percentage = Math.round(similarity * 100);
    return `${percentage}% relevante`;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <Card title="🔍 Búsqueda Inteligente">
        <div className="space-y-4">
          <div className="bg-copper-50 border border-copper-200 rounded-sm p-3">
            <p className="text-sm font-serif text-copper-900">
              🔮 <strong>Búsqueda semántica:</strong> Encuentra documentos por concepto o significado, no solo palabras exactas.
            </p>
          </div>

          {/* Search input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Icons.Search className="w-5 h-5 text-wood-800/40" />
            </div>
            <Input
              type="text"
              placeholder='Ej: "Documentos sobre comercio de especias"'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 text-base"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-copper-600 text-parchment-100 px-4 py-1.5 rounded-sm font-display text-sm hover:bg-copper-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <Icons.Spinner className="w-4 h-4 animate-spin" />
              ) : (
                <Icons.Search className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Search type selector */}
          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-wood-900 text-sm">Tipo de búsqueda:</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="semantic"
                checked={searchType === 'semantic'}
                onChange={() => setSearchType('semantic')}
                className="w-4 h-4 text-copper-600 border-wood-800/30 focus:ring-copper-500"
              />
              <span className="font-serif text-wood-900">Semántica (significado)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="text"
                checked={searchType === 'text'}
                onChange={() => setSearchType('text')}
                className="w-4 h-4 text-copper-600 border-wood-800/30 focus:ring-copper-500"
              />
              <span className="font-serif text-wood-900">Textual (exacta)</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Results */}
      {searched && (
        <div className="mt-6">
          <h2 className="font-display font-bold text-xl text-wood-900 mb-4">
            Resultados {results.length > 0 && `(${results.length})`}
          </h2>

          {loading ? (
            <Card>
              <div className="flex items-center justify-center py-8">
                <Icons.Spinner className="w-8 h-8 text-copper-500 animate-spin mr-3" />
                <span className="font-serif text-wood-800">Buscando...</span>
              </div>
            </Card>
          ) : results.length === 0 ? (
            <Card>
              <div className="text-center py-8">
                <Icons.Search className="w-12 h-12 text-wood-800/20 mx-auto mb-3" />
                <p className="font-serif text-wood-800/70">
                  No se encontraron resultados para "{query}"
                </p>
                <p className="font-serif text-sm text-wood-800/50 mt-2">
                  Intenta con otros términos o cambia el tipo de búsqueda
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Card key={result.manuscript.id || index}>
                  <div className="flex items-start gap-4">
                    {/* Image thumbnail */}
                    <div className="flex-shrink-0 w-24 h-32 bg-wood-900/10 rounded overflow-hidden">
                      {result.manuscript.imageUrl ? (
                        <img
                          src={result.manuscript.imageUrl}
                          alt={result.manuscript.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icons.File className="w-8 h-8 text-wood-800/30" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Similarity score */}
                      <div className={`inline-flex items-center gap-1 mb-2 font-display text-sm font-bold ${getSimilarityColor(result.similarity)}`}>
                        🎯 {getSimilarityLabel(result.similarity)}
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-lg text-wood-900 mb-2">
                        {result.manuscript.title || 'Sin título'}
                      </h3>

                      {/* Date and type */}
                      <div className="flex items-center gap-4 text-sm text-wood-800/70 font-serif mb-3">
                        {result.manuscript.createdAt && (
                          <span>📅 {new Date(result.manuscript.createdAt).toLocaleDateString('es-ES')}</span>
                        )}
                        {result.manuscript.analysis?.typology?.value && (
                          <span className="bg-copper-100 text-copper-800 px-2 py-0.5 rounded-full font-bold">
                            {result.manuscript.analysis.typology.value}
                          </span>
                        )}
                      </div>

                      {/* Excerpt */}
                      {result.manuscript.transcription && (
                        <p className="font-serif text-sm text-wood-800 line-clamp-3 mb-3">
                          "{result.manuscript.transcription.substring(0, 200)}..."
                        </p>
                      )}

                      {/* Summary */}
                      {result.manuscript.analysis?.summary?.value && (
                        <p className="font-serif text-sm text-wood-800/80 italic mb-3">
                          {result.manuscript.analysis.summary.value}
                        </p>
                      )}

                      {/* Action button */}
                      <Button
                        variant="primary"
                        onClick={() => onSelectManuscript(result.manuscript)}
                        className="mt-2"
                      >
                        Abrir documento
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search tips */}
      {!searched && (
        <div className="mt-6">
          <Card title="💡 Consejos de búsqueda">
            <ul className="space-y-2 font-serif text-sm text-wood-800">
              <li>🔮 <strong>Búsqueda semántica:</strong> Encuentra documentos similares por concepto, aunque usen palabras diferentes</li>
              <li>📝 <strong>Búsqueda textual:</strong> Encuentra coincidencias exactas de palabras en títulos y transcripciones</li>
              <li>🎯 <strong>Ejemplos de consultas semánticas:</strong>
                <ul className="ml-6 mt-1 space-y-1 text-wood-800/70">
                  <li>• "Documentos sobre comercio marítimo"</li>
                  <li>• "Cartas relacionadas con la Inquisición"</li>
                  <li>• "Registros de compraventa de tierras"</li>
                  <li>• "Documentos del siglo XVII en Sevilla"</li>
                </ul>
              </li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};
