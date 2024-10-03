import { APIProvider, Map as VisMap, Marker } from '@vis.gl/react-google-maps';
import { useMemo } from 'react';

export default function Map() {
  const center = useMemo(() => ({ lat: 50, lng: 50 }), []);

  console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
      <VisMap center={center} zoom={10}>
        <Marker position={center} />
      </VisMap>
    </APIProvider>
  );
}
