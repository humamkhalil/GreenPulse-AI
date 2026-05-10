import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const alerts = [
  { lng: 74.3587, lat: 31.5204, type: 'critical', desc: 'Severe Heatwave in Lahore' },
  { lng: 73.0479, lat: 33.6844, type: 'warning', desc: 'Moderate Rainfall Warning Islamabad' },
  { lng: 67.0011, lat: 24.8607, type: 'info', desc: 'Normal conditions Karachi' }
];

const LOCATIONS = [
  { name: 'Lahore', lat: 31.5204, lng: 74.3587 },
  { name: 'Islamabad', lat: 33.6844, lng: 73.0479 },
  { name: 'Karachi', lat: 24.8607, lng: 67.0011 },
  { name: 'Peshawar', lat: 34.0151, lng: 71.5249 },
  { name: 'Quetta', lat: 30.1798, lng: 66.9750 },
  { name: 'Multan', lat: 30.1968, lng: 71.4681 },
  { name: 'Faisalabad', lat: 31.4504, lng: 73.1350 },
];

const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 10, { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
};

const LeafletMap = () => {
  const [layers, setLayers] = useState({ pollution: false, flood: true, deforestation: false });
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([30.0, 70.0]);

  const filteredLocations = LOCATIONS.filter(loc => 
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectLocation = (loc: { name: string, lat: number, lng: number }) => {
    setSearch(loc.name);
    setMapCenter([loc.lat, loc.lng]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full h-full min-h-[300px]">
      <MapContainer 
        center={mapCenter} 
        zoom={5} 
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <MapController center={mapCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {alerts.map((alert, idx) => (
          <Marker key={idx} position={[alert.lat, alert.lng]}>
            <Popup>{alert.desc}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Search Bar overlay */}
      <div className="absolute top-2 left-2 z-10 w-64">
        <div className="relative">
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full px-4 py-2 pl-10 text-sm border rounded-md shadow-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        
        {/* Autocomplete Suggestions */}
        {showSuggestions && search && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg overflow-hidden max-h-48 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleSelectLocation(loc)}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-800 dark:text-gray-200"
                >
                  <MapPin className="w-4 h-4 text-green-500" />
                  {loc.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No cities found</div>
            )}
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-3 rounded-md shadow-md text-xs z-10 space-y-2 border dark:border-gray-700">
        <div className="font-bold mb-2 text-black dark:text-white">Map Layers</div>
        <label className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
          <input type="checkbox" checked={layers.flood} onChange={() => setLayers({...layers, flood: !layers.flood})} /> 
          <span className="font-medium">Flood Risk</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
          <input type="checkbox" checked={layers.pollution} onChange={() => setLayers({...layers, pollution: !layers.pollution})} /> 
          <span className="font-medium">Pollution</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
          <input type="checkbox" checked={layers.deforestation} onChange={() => setLayers({...layers, deforestation: !layers.deforestation})} /> 
          <span className="font-medium">Deforestation</span>
        </label>
      </div>
    </div>
  );
};

export default LeafletMap;
