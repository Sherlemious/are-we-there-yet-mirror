import axiosInstance from "../../shared/services/axiosInstance";
import { AddTagPopup, OpenPopupButton } from "./popup";

const Header = ({
  isTagPopupOpen,
  setIsTagPopupOpen,
  setTags,
  setRefresh,
}: {
  isTagPopupOpen: boolean;
  setIsTagPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTags: React.Dispatch<React.SetStateAction<any[]>>;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // Function to add an Tag
  const addTag = async (
    name: string,
    type: string,
    historical_period: string,
  ) => {
    try {
      const response = await axiosInstance.post("/tags", {
        name,
        type,
        historical_period,
      });

      const newTag = response.data; // Adjust according to your response structure
      console.log("Tag added:", newTag); // Log the added user
      const tagId = newTag.data.tagId;
      const tag = await getTag(tagId);
      setTags((prevTags) => [
        ...prevTags,
        {
          _id: tag._id,
          name: tag.name,
          type: tag.type,
          historical_period: tag.historical_period,
        },
      ]);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };
  async function getTag(id: string) {
    try {
      // Send the GET request to the backend
      const response = await axiosInstance.get(`/tags/${id}`);
      console.log(response.data.data); // Log the response data for debugging
      return response.data.data.tag[0]; // Adjust according to your response structure
    } catch (error) {
      console.error("Error fetching tag:", error);
      throw error; // Optionally rethrow the error for further handling
    }
  }

  const handleAddTag = (name: string, historical_period: string) => {
    addTag(name, "preference", historical_period);
    setIsTagPopupOpen(false); // Close the popup after adding
  };

  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex flex-col justify-end py-14 text-primary-blue">
        <h3 className="py-4 text-2xl font-bold">Preference Tags</h3>
      </div>
      <div className="flex space-x-4">
        <OpenPopupButton onClick={() => setIsTagPopupOpen(true)}>
          Add Preference Tag
        </OpenPopupButton>
        <AddTagPopup
          isOpen={isTagPopupOpen}
          onClose={() => setIsTagPopupOpen(false)}
          onAdd={handleAddTag}
          title="Add a Preference Tag"
          isHeader={true}
        />
      </div>
    </header>
  );
};

export default Header;
