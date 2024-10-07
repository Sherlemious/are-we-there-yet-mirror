import React, { useState } from 'react';
import { Activity } from '../types/Activity';

interface ActivityFormProps {
  onAddActivity: (newActivity: Activity) => void; // This function adds the new profile to the state
}

const ActivityForm = ({ onAddActivity }: ActivityFormProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [specialDiscount, setSpecialDiscount] = useState('');
  const [bookingOpen, setBookingOpen] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the new profile object
    const newActivity: Activity = {
      date,
      time,
      location,
      price,
      category,
      tags,
      specialDiscount,
      bookingOpen,
      _id: '',
    };

    try {
      // Send the POST request to the backend
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });

      if (response.ok) {
        const addedActivity = await response.json();

        // Call the onAddProfile function to update the state with the newly added profile
        onAddActivity(addedActivity);

        // Clear form fields
        setDate('');
        setTime('');
        setLocation('');
        setPrice('');
        setCategory('');
        setTags('');
        setSpecialDiscount('');
        setBookingOpen('');
      } else {
        console.error('Error adding activity:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add New Activity</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="date">
          Date
        </label>
        <input
          type="Date"
          id="date"
          placeholder="Date"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add Activity
      </button>
    </form>
  );
};

export default ActivityForm;
