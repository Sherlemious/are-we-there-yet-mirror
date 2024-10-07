import { useState, useEffect } from 'react';

export default function UpdatePopup({ dialogRef, title, _id, setTags }) {
  const [isFormValid2, setIsFormValid2] = useState(false);
  const [name2, setName2] = useState('');
  const [historical_period2, setHistorical_Period2] = useState('');

  useEffect(() => {
    // Check if both fields are non-empty
    setIsFormValid2(name2.trim().length > 0 && historical_period2.trim().length > 0);
  }, [name2, historical_period2]);

  const handleButtonClick = () => {
    if (isFormValid2) {
      updateTag(name2, 'Preference', historical_period2, _id).then(() => {
        setName2('');
        setHistorical_Period2('');
      });
    } else {
      dialogRef.current?.close(); // Close dialog if "Cancel" is clicked
    }
  };

  const updateTag = async (name: string, type: string, historical_period: string, _id: string) => {
    console.log('updating with:', name, type, historical_period, _id);
    try {
      const response = await fetch(`https://are-we-there-yet-mirror.onrender.com/api/tags/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id, name, type, historical_period }),
      });

      if (!response.ok) {
        throw new Error('Failed to update tag');
      }

      await response.json();
      setTags((prevTags) => {
        return prevTags.map((tag) => {
          if (tag._id === _id) {
            return { _id, name, type, historical_period };
          }
          return tag;
        });
      });
      dialogRef.current?.close();
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  return (
    <dialog ref={dialogRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonClick();
        }}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-96 rounded-lg bg-white p-8">
            <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name2">
                Name
              </label>
              <input
                type="text"
                id="name2"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="historical_period2">
                Historical Period
              </label>
              <input
                type="text"
                id="historical_period2"
                value={historical_period2}
                onChange={(e) => setHistorical_Period2(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleButtonClick}
                className={`rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isFormValid2
                  ? 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500'
                  : 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500'
                }`}
              >
                {isFormValid2 ? 'Update' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </dialog>
  );
}
