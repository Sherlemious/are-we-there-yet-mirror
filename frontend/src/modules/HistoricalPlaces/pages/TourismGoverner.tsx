import { useState } from 'react';
import PlaceForm from '../components/PlaceForm';
import PlacesList from '../components/PlacesList';
import Place from '../types/place';

const TouristGoverner = () => {
  const sampleMuseums = [
    {
      id: 1,
      name: 'The Louvre',
      description: "The world's largest art museum and a historic monument in Paris, France.",
      location: 'Paris, France',
      openingHours: '9:00 AM - 6:00 PM',
      ticketPrices: '€17 for adults, free for children under 18',
    },
    {
      id: 2,
      name: 'The British Museum',
      description: 'A public institution dedicated to human history, art, and culture in London.',
      location: 'London, United Kingdom',
      openingHours: '10:00 AM - 5:00 PM',
      ticketPrices: 'Free entry',
    },
    {
      id: 3,
      name: 'The Metropolitan Museum of Art',
      description: 'One of the largest and most prestigious art museums in the world, located in New York City.',
      location: 'New York, USA',
      openingHours: '10:00 AM - 5:30 PM',
      ticketPrices: '$25 for adults, $12 for students, free for children under 12',
    },
    {
      id: 4,
      name: 'The Vatican Museums',
      description: 'The Vatican Museums are the public art and sculpture museums in Vatican City.',
      location: 'Vatican City',
      openingHours: '9:00 AM - 6:00 PM',
      ticketPrices: '€17 for adults, reduced prices for children and students',
    },
    {
      id: 5,
      name: 'The Uffizi Gallery',
      description: 'A prominent art museum located adjacent to Piazza della Signoria in Florence, Italy.',
      location: 'Florence, Italy',
      openingHours: '8:15 AM - 6:50 PM',
      ticketPrices: '€20 for adults, reduced for European citizens aged 18-25',
    },
  ];
  const [places] = useState<Place[]>(sampleMuseums);
  return (
    <div>
      <PlaceForm />
      <PlacesList places={places} />
    </div>
  );
};

export default TouristGoverner;
