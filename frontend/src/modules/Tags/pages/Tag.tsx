import React, { useEffect, useState } from 'react';
import TagTable from '../component/TagTable';
// import TagForm from '../component/TagForm';
import { Tag } from '../types/Tag';
import Header from '../component/Header';

const Dashboard = () => {
  const [Tags, setTags] = useState<Tag[]>([]);
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // Fetch profiles (GET request)
  const fetchTags = async () => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/tags');
      const data = await response.json();
      console.log(data);
      setTags(data.data.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  // Add tag (for frontend state)
  // const handleAddTag = (newTag: Tag) => {
  //   setTags([...Tags, newTag]);
  // };

  // Delete profile by _id (DELETE request)
  const handleDeleteTag = async (id: string) => {
    try {
      const response = await fetch(`https://are-we-there-yet-mirror.onrender.com/api/tags/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTags(Tags.filter((Tag) => Tag._id !== id));
        setRefresh(refresh + 1);
      } else {
        console.error('Failed to delete tag');
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };
  

  useEffect(() => {
    fetchTags(); // Fetch profiles when the component mounts
  }, []);

  return (
    <div className="container mx-auto">
      <Header 
        setIsTagPopupOpen={setIsTagPopupOpen}
        isTagPopupOpen={isTagPopupOpen}
        setTags={setTags}
        setRefresh={setRefresh}
      />
      <TagTable Tags={Tags} onDeleteTag={handleDeleteTag} />
      {/* <ProfileForm onAddProfile={handleAddProfile} /> */}
    </div>
  );
};

export default Dashboard;
