import React, { useState, useEffect } from 'react';

interface AddCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    name: string,
  ) => void;
  title: string;
}

const AddCategoryPopup: React.FC<AddCategoryProps> = ({ isOpen, onClose, onAdd, title }) => {
  const [name, setName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      name.trim() !== ''
    );
  }, [name]);

  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (isFormValid) {
      onAdd(name);
      setName('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-8">
        <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
        <input
          type="string"
          placeholder="Name"
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export { AddCategoryPopup, OpenPopupButton };
