import { APIProvider, Map as VisMap, AdvancedMarker, MapMouseEvent } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const BlueDot: React.FC<{ position: google.maps.LatLngLiteral }> = ({ position }) => {
  return (
    <AdvancedMarker position={position}>
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: '#4285F4',
          border: '2px solid #FFF',
          boxShadow: '0 0 5px rgba(0,0,0,0.3)',
        }}
      />
    </AdvancedMarker>
  );
};

export type Location = { lat: number; lng: number; name: string };

export default function Map({
  className = 'w-full h-full',
  markedLocationState,
  center = null,
  onChange,
}: {
  className?: string;
  markedLocationState?: [Location | null, React.Dispatch<React.SetStateAction<Location | null>>];
  center?: google.maps.LatLngLiteral | null;
  onChange?: (location: Location) => void;
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(center);
  const [selectedLocation, setSelectedLocation] = markedLocationState || useState<Location | null>(null);

  useEffect(() => {
    if (userLocation) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
          alert('Error getting user location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleMapClick = async (event: MapMouseEvent) => {
    const { latLng } = event.detail;
    const lat = latLng!.lat;
    const lng = latLng!.lng;

    // Use the Geocoding API to get the address
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const name = data.results[0].formatted_address;

      onChange?.({ lat, lng, name });
      setSelectedLocation?.({ lat, lng, name });
    }
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className={className}>
        {userLocation && (
          <VisMap defaultCenter={userLocation} defaultZoom={18} mapId="YOUR_MAP_ID" onClick={handleMapClick}>
            <BlueDot position={userLocation} />
            {selectedLocation && <AdvancedMarker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />}
          </VisMap>
        )}
      </div>
    </APIProvider>
  );
}

export function MapTest() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return <Map markedLocationState={[selectedLocation, setSelectedLocation]} className="w-full h-full" />;
}
