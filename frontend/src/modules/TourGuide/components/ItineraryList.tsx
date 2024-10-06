import React from 'react';
import { Itinerary as ItineraryType } from '../types/Itinerary';
import '../styles/ItineraryList.css';
import { Link } from 'react-router-dom';

interface ItineraryListProps {
  itineraries: ItineraryType[];
  onDelete: (id: string) => void; // Function to handle deleting an itinerary
}

const ItineraryList = ({ itineraries, onDelete }: ItineraryListProps) => {
  return (
    <div className="itinerary-list">
      {itineraries.map((itinerary) => (
        <div key={itinerary._id} className="itinerary-card">
          <h3>{itinerary.name}</h3>
          <p><strong>Language:</strong> {itinerary.language}</p>
          <p><strong>Category:</strong> {itinerary.category}</p>
          <p><strong>Tags:</strong> {itinerary.tags.join(', ')}</p>
          <p><strong>Pick-up Location:</strong> {itinerary.pick_up_location}</p>
          <p><strong>Drop-off Location:</strong> {itinerary.drop_off_location}</p>
          <p><strong>Price:</strong> {itinerary.price}</p>
          <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>

          <h4>Activities:</h4>
          <ul>
            {itinerary.activities.map((activity, index) => (
              <li key={activity._id}>
                <strong>Activity {index + 1}:</strong> {activity.category} - {activity.location}, {activity.price}
              </li>
            ))}
          </ul>

          {/* Button to delete the itinerary */}
          <button onClick={() => onDelete(itinerary._id)}>Delete Itinerary</button>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;
