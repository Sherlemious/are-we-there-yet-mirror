import React, { useState } from 'react';
import { Itinerary as ItineraryType } from '../types/Itinerary';

interface ItineraryFormProps {
  itinerary?: ItineraryType;
  onSave: (itinerary: ItineraryType) => void;
}

const ItineraryForm = ({ itinerary, onSave }: ItineraryFormProps) => {
  const [formData, setFormData] = useState<ItineraryType>(
    itinerary || {
      _id: '',
      name: '',
      accessibility: false,
      category: '',
      tags: [],
      language: '',
      price: 0,
      drop_off_location: '',
      pick_up_location: '',
      activities: [],
    }
  );

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="itinerary-form">
      <h3>{itinerary ? 'Edit Itinerary' : 'Create New Itinerary'}</h3>
      <input
        type="text"
        placeholder="Language"
        value={formData.language}
        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
      />
      {/* Add other inputs for activities, location, etc. */}
      <button onClick={handleSubmit}>{itinerary ? 'Update' : 'Create'}</button>
    </div>
  );
};

export default ItineraryForm;
