import { useState, useEffect } from "react";
import axiosInstance from "../../shared/services/axiosInstance";

export default function UpdatePopup({ dialogRef, title, _id, setTags }) {
  const [isFormValid2, setIsFormValid2] = useState(false);
  const [name2, setName2] = useState("");
  const [historical_period2, setHistorical_Period2] = useState("");

  useEffect(() => {
    // Check if both fields are non-empty
    setIsFormValid2(
      name2.trim().length > 0 && historical_period2.trim().length > 0,
    );
  }, [name2, historical_period2]);

  const handleButtonClick = () => {
    if (isFormValid2) {
      updateTag(name2, "Preference", historical_period2, _id).then(() => {
        setName2("");
        setHistorical_Period2("");
      });
    } else {
      dialogRef.current?.close(); // Close dialog if "Cancel" is clicked
    }
  };

  const updateTag = async (
    name: string,
    type: string,
    historical_period: string,
    _id: string,
  ) => {
    console.log("updating with:", name, type, historical_period, _id);

    try {
      // Send the PUT request to the backend
      const response = await axiosInstance.put(`/tags/${_id}`, {
        _id,
        name,
        type,
        historical_period,
      });

      // Axios automatically throws an error for response status outside the range of 2xx
      if (response.status !== 200) {
        throw new Error("Failed to update tag");
      }

      // Update the local state with the new tag data
      setTags((prevTags) => {
        return prevTags.map((tag) => {
          if (tag._id === _id) {
            return { _id, name, type, historical_period }; // Update the tag
          }
          return tag; // Return the original tag
        });
      });

      // Close the dialog if it exists
      dialogRef.current?.close();
    } catch (error) {
      console.error("Error updating tag:", error);
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
              <label className="mb-2 block text-sm font-medium" htmlFor="name2">
                Name
              </label>
              <input
                type="text"
                id="name2"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="historical_period2"
              >
                Historical Period
              </label>
              <input
                type="text"
                id="historical_period2"
                value={historical_period2}
                onChange={(e) => setHistorical_Period2(e.target.value)}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleButtonClick}
                className={`rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isFormValid2
                    ? 'bg-accent-dark-gold hover:bg-accent-dark-blue/80 focus:ring-gray-500'
                    : 'border-red-200 text-lg text-red-600 hover:bg-red-50 hover:text-red-700'
                }`}
              >
                {isFormValid2 ? "Update" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </dialog>
  );
}
