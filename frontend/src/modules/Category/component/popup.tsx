import React, { useState, useEffect } from 'react';

interface AddCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (name: string) => void;
  title: string;
  isHeader: boolean;
  _id?: string;
}

const AddCategoryPopup: React.FC<AddCategoryProps> = ({ isOpen, onClose, onAdd, title, isHeader, _id }) => {
  const [name, setName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(name.trim().length > 0);
  }, [name]);
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (isFormValid) {
      if (isHeader && onAdd) {
        onAdd(name);
        setName('');
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
        <div className="flex justify-center">
          <button
            className={`rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isFormValid
                 ? 'bg-accent-dark-gold hover:bg-accent-dark-blue/80 focus:ring-gray-500'
                : 'border-red-200 text-lg text-red-600 hover:bg-red-50 hover:text-red-700'
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
    className="rounded bg-accent-dark-blue px-5 py-3 text-white hover:bg-accent-dark-blue/80 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
  >
    {children}
  </button>
);

export { AddCategoryPopup, OpenPopupButton };
