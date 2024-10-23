import { useEffect, useState } from "react";
import TagTable from "../component/TagTable";
import { prefrenceTag } from "../types/PrefrenceTag";
import Header from "../component/Header";
import axiosInstance from "../../shared/services/axiosInstance";

const Dashboard = () => {
  const [Tags, setTags] = useState<prefrenceTag[]>([]);
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // Fetch profiles (GET request)
  const fetchTags = async () => {
    try {
      // const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/tags');
      const response = await axiosInstance.get("/tags");
      // const data = await response.json();
      // console.log(data);
      // setTags(data.data.tags);
      setTags(response.data.data.tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Delete profile by _id (DELETE request)
  const handleDeleteTag = async (id: string) => {
    try {
      // const response = await fetch(
      //   `https://are-we-there-yet-mirror.onrender.com/api/tags/${id}`,
      //   {
      //     method: "DELETE",
      //   },
      // );
      const response = await axiosInstance.delete(`/tags/${id}`);

      // if (response.ok) {
      if (response.status === 200) {
        // setTags(Tags.filter((Tag) => Tag._id !== id));
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
