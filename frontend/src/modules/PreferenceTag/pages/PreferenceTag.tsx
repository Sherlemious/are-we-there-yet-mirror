import { useEffect, useState } from "react";
import TagTable from "../component/TagTable";
import { preferenceTag } from "../types/PreferenceTag";
import Header from "../component/Header";
import axiosInstance from "../../shared/services/axiosInstance";

const Dashboard = () => {
  const [Tags, setTags] = useState<preferenceTag[]>([]);
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // Fetch profiles (GET request)
  const fetchTags = async () => {
    try {
      const response = await axiosInstance.get("/tags");
      const tags = response.data.data.tags.filter(
        (t: preferenceTag) => t.type === "Preference",
      );
      setTags(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Delete profile by _id (DELETE request)
  const handleDeleteTag = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/tags/${id}`);

      if (response.status === 200) {
        setTags((prevTags) => prevTags.filter((tag) => tag._id !== id));
        setRefresh(refresh + 1);
      } else {
        console.error("Failed to delete tag");
      }
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="container mx-auto">
      <Header
        setIsTagPopupOpen={setIsTagPopupOpen}
        isTagPopupOpen={isTagPopupOpen}
        setTags={setTags}
        setRefresh={setRefresh}
      />
      <TagTable
        key={refresh}
        Tags={Tags}
        onDeleteTag={handleDeleteTag}
        setTags={setTags}
      />
    </div>
  );
};

export default Dashboard;
