import React, { useState, useEffect } from 'react';

interface AddActivityProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    date: string,
    time: string,
    location: string,
    price: string,
    category: string,
    tags: string,
    specialDiscount: string,
    booking: string
  ) => void;
  title: string;
}

const AddActivityPopup: React.FC<AddActivityProps> = ({ isOpen, onClose, onAdd, title }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [specialDiscount, setSpecialDiscount] = useState('');
  const [booking, setBooking] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      date.trim() !== '' &&
        time.trim() !== '' &&
        location.trim() !== '' &&
        price.trim() !== '' &&
        category.trim() !== '' &&
        tags.trim() !== '' &&
        specialDiscount.trim() !== '' &&
        booking.trim() !== ''
    );
  }, [date, time, location, price, category, tags, specialDiscount, booking]);

  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (isFormValid) {
      onAdd(date, time, location, price, category, tags, specialDiscount, booking);
      setDate('');
      setTime('');
      setLocation('');
      setPrice('');
      setCategory('');
      setTags('');
      setSpecialDiscount('');
      setBooking('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-8">
        <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
        <input
          type="Date"
          placeholder="Date"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="Time"
          placeholder="Time"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="Number"
          placeholder="Price"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Special Discount"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={specialDiscount}
          onChange={(e) => setSpecialDiscount(e.target.value)}
        />
        <input
          type="Boolean"
          placeholder="Booking"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={booking}
          onChange={(e) => setBooking(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className={`rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isFormValid
                ? 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500'
                : 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500'
            }`}
            onClick={handleButtonClick}
          >
            {isFormValid ? 'Add' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Button to open the popup (unchanged)
const OpenPopupButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
  >
    {children}
  </button>
);

export { AddActivityPopup, OpenPopupButton };
