import { APIProvider, Map as VisMap, Marker } from '@vis.gl/react-google-maps';
import { useMemo } from 'react';

export default function Map() {
  const center = useMemo(() => ({ lat: 50, lng: 50 }), []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
      <div className='w-full h-full'>
        <VisMap center={center} zoom={10}>
          <Marker position={center} />
        </VisMap>
      </div>
    </APIProvider>
  );
}
