'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Arreglo para el problema del icono por defecto en react-leaflet con Webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface GeoData {
    place: string;
    latitude?: number;
    longitude?: number;
    type: "origin" | "destination" | "mentioned";
    confidence: number;
}

interface InteractiveMapProps {
  geodata: GeoData[];
}

// Iconos personalizados según tipo
const createCustomIcon = (type: string, confidence: number) => {
  let color = '#999'; // Gris por defecto

  if (type === 'origin') {
    color = confidence > 0.8 ? '#DC2626' : '#EF4444'; // Rojo
  } else if (type === 'destination') {
    color = confidence > 0.8 ? '#2563EB' : '#3B82F6'; // Azul
  } else {
    color = confidence > 0.8 ? '#6B7280' : '#9CA3AF'; // Gris
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 12px;
          font-weight: bold;
        ">📍</div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

// Componente para ajustar vista del mapa
function MapBounds({ locations }: { locations: GeoData[] }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map(loc => [loc.latitude!, loc.longitude!] as L.LatLngTuple)
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
}

export function InteractiveMap({ geodata }: InteractiveMapProps) {
  const [showLines, setShowLines] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  const validLocations = geodata.filter(geo => geo.latitude != null && geo.longitude != null);

  if (validLocations.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed border-wood-800/10 rounded-lg">
        <p className="text-wood-800/40 font-serif">No hay datos geográficos con coordenadas para mostrar en el mapa.</p>
      </div>
    );
  }

  // Filtrar por tipo seleccionado
  const filteredLocations = selectedType === 'all'
    ? validLocations
    : validLocations.filter(loc => loc.type === selectedType);

  // Calcular el centro del mapa
  const centerLat = filteredLocations.length > 0
    ? filteredLocations.reduce((sum, geo) => sum + geo.latitude!, 0) / filteredLocations.length
    : validLocations.reduce((sum, geo) => sum + geo.latitude!, 0) / validLocations.length;

  const centerLon = filteredLocations.length > 0
    ? filteredLocations.reduce((sum, geo) => sum + geo.longitude!, 0) / filteredLocations.length
    : validLocations.reduce((sum, geo) => sum + geo.longitude!, 0) / validLocations.length;

  // Crear líneas entre origen y destino
  const origin = validLocations.find(loc => loc.type === 'origin');
  const destination = validLocations.find(loc => loc.type === 'destination');
  const routePoints: L.LatLngTuple[] = [];

  if (origin && destination) {
    routePoints.push([origin.latitude!, origin.longitude!]);
    routePoints.push([destination.latitude!, destination.longitude!]);
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      origin: 'Lugar de origen',
      destination: 'Lugar de destino',
      mentioned: 'Lugar mencionado'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-4">
      {/* Controles del mapa */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-parchment-100 rounded-lg border border-wood-800/20">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm text-wood-900">Filtrar:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 border border-wood-800/30 rounded-sm font-serif text-sm text-wood-900 bg-parchment-100"
          >
            <option value="all">Todos los lugares</option>
            <option value="origin">Solo orígenes</option>
            <option value="destination">Solo destinos</option>
            <option value="mentioned">Solo mencionados</option>
          </select>
        </div>

        {routePoints.length > 0 && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showLines}
              onChange={(e) => setShowLines(e.target.checked)}
              className="w-4 h-4 text-copper-600 border-wood-800/30 rounded focus:ring-copper-500"
            />
            <span className="font-serif text-sm text-wood-900">Mostrar ruta</span>
          </label>
        )}

        <div className="ml-auto text-sm font-serif text-wood-800/70">
          {filteredLocations.length} ubicación{filteredLocations.length !== 1 ? 'es' : ''}
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-4 p-3 bg-parchment-100 rounded-lg border border-wood-800/20">
        <span className="font-display font-bold text-sm text-wood-900">Leyenda:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-600"></div>
          <span className="font-serif text-xs text-wood-800">Origen</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span className="font-serif text-xs text-wood-800">Destino</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          <span className="font-serif text-xs text-wood-800">Mencionado</span>
        </div>
      </div>

      {/* Mapa */}
      <MapContainer
        center={[centerLat, centerLon]}
        zoom={5}
        style={{ height: '500px', width: '100%' }}
        className="rounded-md border-2 border-wood-800/20 shadow-lg z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Ajustar bounds automáticamente */}
        <MapBounds locations={filteredLocations} />

        {/* Línea de ruta */}
        {showLines && routePoints.length > 0 && (
          <Polyline
            positions={routePoints}
            color="#B87333"
            weight={3}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}

        {/* Marcadores */}
        {filteredLocations.map((geo, index) => (
          <Marker
            key={index}
            position={[geo.latitude!, geo.longitude!]}
            icon={createCustomIcon(geo.type, geo.confidence)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-display font-bold text-base text-wood-900 mb-2 border-b border-wood-800/20 pb-1">
                  {geo.place}
                </h3>
                <div className="space-y-1 font-serif text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-bold text-wood-800">Tipo:</span>
                    <span className="text-wood-900">{getTypeLabel(geo.type)}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-bold text-wood-800">Confianza:</span>
                    <span className={`font-bold ${
                      geo.confidence > 0.8 ? 'text-green-600' :
                      geo.confidence > 0.6 ? 'text-yellow-600' : 'text-orange-600'
                    }`}>
                      {(geo.confidence * 100).toFixed(0)}%
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-xs text-wood-800/70">
                    <span>📍</span>
                    <span>{geo.latitude!.toFixed(4)}°, {geo.longitude!.toFixed(4)}°</span>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Lista de ubicaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredLocations.map((geo, index) => (
          <div key={index} className="p-3 bg-parchment-100 rounded border border-wood-800/20 hover:border-copper-500 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                geo.type === 'origin' ? 'bg-red-600' :
                geo.type === 'destination' ? 'bg-blue-600' : 'bg-gray-600'
              }`}></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-sm text-wood-900 truncate">{geo.place}</h4>
                <p className="font-serif text-xs text-wood-800/70">{getTypeLabel(geo.type)}</p>
              </div>
              <div className={`text-xs font-bold ${
                geo.confidence > 0.8 ? 'text-green-600' :
                geo.confidence > 0.6 ? 'text-yellow-600' : 'text-orange-600'
              }`}>
                {(geo.confidence * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente de Carga Dinámica para evitar errores de SSR
const DynamicMap = (props: InteractiveMapProps) => {
    const [isClient, setIsClient] = React.useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="text-center p-8 border-2 border-dashed border-wood-800/10 rounded-lg">
            <p className="text-wood-800/40 font-serif">Cargando mapa...</p>
        </div>;
    }

    return <InteractiveMap {...props} />;
}

export default DynamicMap;
