import React, { useState, useEffect } from 'react';
import ItineraryList from '../components/ItineraryList';
import { Itinerary } from '../types/Itinerary';

const TourGuide = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  // Fetch the itineraries from the API
  const fetchItineraries = async () => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/itineraries');
      const data = await response.json();
      setItineraries(data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    }
  };

  // Delete an itinerary
  const handleDeleteItinerary = async (id: string) => {
    try {
      const response = await fetch(`https://are-we-there-yet-mirror.onrender.com/api/itineraries/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted itinerary from the state
        setItineraries(itineraries.filter((itinerary) => itinerary._id !== id));
      } else {
        console.error('Failed to delete itinerary');
      }
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <div className="tour-guide-page">
      <h1>Tour Guide Itineraries</h1>
      <ItineraryList itineraries={itineraries} onDelete={handleDeleteItinerary} />
    </div>
  );
};

export default TourGuide;
