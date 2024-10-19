import {
  APIProvider,
  Map as VisMap,
  AdvancedMarker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const BlueDot: React.FC<{ position: google.maps.LatLngLiteral }> = ({
  position,
}) => {
  return (
    <AdvancedMarker position={position}>
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "#4285F4",
          border: "2px solid #FFF",
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        }}
      />
    </AdvancedMarker>
  );
};

export type Location = { lat: number; lng: number; name: string };

/**
 * A map component that allows the user to select a location by clicking on the map.
 * @param className The class name of the map container.
 * @param defaultMark The default location to mark on the map.
 * @param defaultUserLocation The default location to center the map on.
 * @param defaultCenter The default center of the map overwriting defaultUserLocation.
 * @param value The selected location.
 * @param onChange A callback function that is called when the user selects a location.
 */
export default function Map({
  className = "w-full h-full",
  defaultMark,
  defaultUserLocation,
  defaultCenter,
  value,
  onChange,
}: {
  className?: string;
  defaultMark?: Location;
  defaultUserLocation?: { lat: number; lng: number };
  defaultCenter?: { lat: number; lng: number };
  value?: Location;
  onChange?: (location: Location) => void;
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [userLocation, setUserLocation] = useState<
    | {
        lat: number;
        lng: number;
      }
    | undefined
  >(defaultUserLocation);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    defaultMark || null,
  );

  useEffect(() => {
    if (value) {
      setSelectedLocation(value);
    }
  }, [value]);

  useEffect(() => {
    if (defaultCenter || userLocation) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          alert("Error getting user location");
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMapClick = async (event: MapMouseEvent) => {
    const { latLng } = event.detail;
    const lat = latLng!.lat;
    const lng = latLng!.lng;

    // Use the Geocoding API to get the address
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`,
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const name = data.results[0].formatted_address;

      if (value && !onChange) {
        console.error(
          "You need to provide an onChange callback to update the selected location.",
        );
      } else {
        onChange?.({ lat, lng, name });
        setSelectedLocation({ lat, lng, name });
      }
    }
  };

  return (
    <APIProvider apiKey={apiKey}>
      {(defaultCenter ?? userLocation) && (
        <div className={className}>
          <VisMap
            defaultCenter={defaultCenter ?? userLocation}
            defaultZoom={18}
            mapId="YOUR_MAP_ID"
            onClick={handleMapClick}
          >
            {userLocation && <BlueDot position={userLocation} />}
            {selectedLocation && (
              <AdvancedMarker
                position={{
                  lat: selectedLocation.lat,
                  lng: selectedLocation.lng,
                }}
              />
            )}
          </VisMap>
        </div>
      )}
    </APIProvider>
  );
}
