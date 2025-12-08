'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
    type: "origin" | "reference";
    confidence: number;
}

interface InteractiveMapProps {
  geodata: GeoData[];
}

export function InteractiveMap({ geodata }: InteractiveMapProps) {
  
  const validLocations = geodata.filter(geo => geo.latitude != null && geo.longitude != null);

  if (validLocations.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed border-wood-800/10 rounded-lg">
        <p className="text-wood-800/40 font-serif">No hay datos geográficos con coordenadas para mostrar en el mapa.</p>
      </div>
    );
  }

  // Calcular el centro del mapa
  const centerLat = validLocations.reduce((sum, geo) => sum + geo.latitude!, 0) / validLocations.length;
  const centerLon = validLocations.reduce((sum, geo) => sum + geo.longitude!, 0) / validLocations.length;

  return (
    <MapContainer center={[centerLat, centerLon]} zoom={5} style={{ height: '400px', width: '100%' }} className="rounded-md border border-wood-800/20 shadow-inner">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {validLocations.map((geo, index) => (
        <Marker key={index} position={[geo.latitude!, geo.longitude!]}>
          <Popup>
            <div>
              <p className="font-bold">{geo.place}</p>
              <p>Tipo: {geo.type === 'origin' ? 'Origen' : 'Referencia'}</p>
              <p>Confianza: {(geo.confidence * 100).toFixed(0)}%</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
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
