import React, { useEffect, useState } from 'react';
import CategoryTable from '../component/CategoryTable';
// import ActivityForm from '../component/ActivityForm';
import { Category } from '../types/Category';
import Header from '../component/Header';

const Dashboard = () => {
  const [Categories, setCategories] = useState<Category[]>([]);

  // Fetch profiles (GET request)
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/categories');
      const data = await response.json();
      console.log(data);
      setCategories(data.data.categories);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  // Add Category (for frontend state)
  const handleAddCategory = (newCategory: Category) => {
    setCategories([...Categories, newCategory]);
  };

  // Delete profile by _id (DELETE request)
  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`https://are-we-there-yet-mirror.onrender.com/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(Categories.filter((Category) => Category._id !== id));
      } else {
        console.error('Failed to delete Category');
      }
    } catch (error) {
      console.error('Error deleting Category:', error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch profiles when the component mounts
  }, []);

  return (
    <div className="container mx-auto">
      <Header />
      <CategoryTable Categories={Categories} onDeleteCategory={handleDeleteCategory} />
      {/* <ProfileForm onAddProfile={handleAddProfile} /> */}
    </div>
  );
};

export default Dashboard;
