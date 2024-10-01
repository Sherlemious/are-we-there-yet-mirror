import React from 'react';
import Place from '../types/place';

interface PlacesListProps {
  places: Place[];
  //   onDelete: (id: number) => void;
  //   onEdit: (place: Place) => void;
}

const PlacesList: React.FC<PlacesListProps> = ({ places }) => {
  return (
    <ul className="space-y-4">
      {places.map((place) => (
        <li key={place.id} className="p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-bold">{place.name}</h2>
          <p>{place.description}</p>
          <p>Location: {place.location}</p>
          <p>Opening Hours: {place.openingHours}</p>
          <p>Ticket Prices: {place.ticketPrices}</p>
          <div className="space-x-2">
            <button
              onClick={() => {
                /*onEdit(place) */
              }}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => {
                /* onDelete(place.id) */
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlacesList;
