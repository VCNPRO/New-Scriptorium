import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para iconos de Leaflet en Vite/React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  place: string;
  type: 'origin' | 'destination' | 'mentioned';
  coordinates?: {
    lat: number;
    lon: number;
  };
}

interface ManuscriptMapProps {
  locations: Location[];
}

// Componente para centrar el mapa automáticamente
const MapCenterController: React.FC<{ locations: Location[] }> = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const validLocations = locations.filter(loc => loc.coordinates);

      if (validLocations.length === 1) {
        // Si hay un solo lugar, centramos ahí
        const loc = validLocations[0].coordinates!;
        map.setView([loc.lat, loc.lon], 8);
      } else if (validLocations.length > 1) {
        // Si hay múltiples lugares, ajustamos para verlos todos
        const bounds = L.latLngBounds(
          validLocations.map(loc => [loc.coordinates!.lat, loc.coordinates!.lon] as [number, number])
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [locations, map]);

  return null;
};

// Iconos personalizados según el tipo de ubicación
const createCustomIcon = (type: string) => {
  const colors: Record<string, string> = {
    origin: '#8B4513', // Marrón (origen)
    destination: '#D2691E', // Cobre (destino)
    mentioned: '#CD853F', // Marrón claro (mencionado)
  };

  const color = colors[type] || colors.mentioned;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 28px;
        height: 28px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-size: 14px;
          font-weight: bold;
        ">
          ${type === 'origin' ? '⚑' : type === 'destination' ? '▶' : '●'}
        </span>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

export const ManuscriptMap: React.FC<ManuscriptMapProps> = ({ locations }) => {
  const [mounted, setMounted] = useState(false);

  // Asegurarse de que el componente se monta correctamente (necesario para SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  const validLocations = locations.filter(loc => loc.coordinates);

  if (!mounted) {
    return (
      <div className="w-full h-96 bg-wood-900/10 rounded-lg flex items-center justify-center">
        <p className="font-serif text-wood-800/60">Cargando mapa...</p>
      </div>
    );
  }

  if (validLocations.length === 0) {
    return (
      <div className="w-full h-96 bg-wood-900/10 rounded-lg flex flex-col items-center justify-center p-8 border-2 border-dashed border-wood-800/20">
        <svg className="w-16 h-16 text-wood-800/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <p className="font-serif text-wood-800/60 text-center">
          No hay ubicaciones geográficas con coordenadas disponibles
        </p>
        <p className="font-serif text-sm text-wood-800/40 text-center mt-2">
          Los lugares mencionados no pudieron ser geolocalizados automáticamente
        </p>
      </div>
    );
  }

  // Centro por defecto: España
  const defaultCenter: [number, number] = [40.4168, -3.7038]; // Madrid

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-wood-800/20 shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenterController locations={validLocations} />

        {validLocations.map((location, index) => (
          <Marker
            key={index}
            position={[location.coordinates!.lat, location.coordinates!.lon]}
            icon={createCustomIcon(location.type)}
          >
            <Popup>
              <div className="font-serif p-2">
                <h4 className="font-display font-bold text-wood-900 mb-1">
                  {location.place}
                </h4>
                <p className="text-xs text-wood-800/70 mb-2">
                  <span className="font-bold">Tipo:</span>{' '}
                  {location.type === 'origin' && '📍 Origen del documento'}
                  {location.type === 'destination' && '🎯 Destino'}
                  {location.type === 'mentioned' && '💬 Mencionado en el texto'}
                </p>
                <p className="text-xs text-wood-800/50">
                  Coordenadas: {location.coordinates!.lat.toFixed(4)}, {location.coordinates!.lon.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Leyenda */}
      <div className="absolute bottom-4 right-4 bg-parchment-100/95 backdrop-blur border border-wood-800/20 rounded-lg shadow-lg p-3 z-10">
        <h5 className="font-display font-bold text-xs text-wood-900 mb-2">Leyenda</h5>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-base">⚑</span>
            <span className="font-serif text-wood-800">Origen</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-base">▶</span>
            <span className="font-serif text-wood-800">Destino</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-base">●</span>
            <span className="font-serif text-wood-800">Mencionado</span>
          </div>
        </div>
      </div>
    </div>
  );
};
