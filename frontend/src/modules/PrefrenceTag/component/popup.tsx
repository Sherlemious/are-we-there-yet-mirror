import React, { useState, useEffect } from 'react';

interface AddTagProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (name: string, historical_period: string) => void;
  title: string;
  isHeader: boolean;
  _id?: string;
}

const AddTagPopup: React.FC<AddTagProps> = ({ isOpen, onClose, onAdd, title, isHeader, _id }) => {
  const [name, setName] = useState('');
  const [historical_period, setHistoricalPeriod] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(name.trim().length > 0 && historical_period.trim().length > 0);
  }, [name, historical_period]);
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (isFormValid) {
      if (isHeader && onAdd) {
        onAdd(name, historical_period);
        setName('');
        setHistoricalPeriod('');
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-8">
        <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="historical_period">
            Historical Period
          </label>
          <input
            type="text"
            id="historical_period"
            value={historical_period}
            onChange={(e) => setHistoricalPeriod(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
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

export { AddTagPopup, OpenPopupButton };
