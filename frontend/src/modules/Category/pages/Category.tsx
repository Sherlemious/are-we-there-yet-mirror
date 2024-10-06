import { useEffect, useState } from 'react';
import CategoryTable from '../component/CategoryTable';
import { Category } from '../types/Category';
import Header from '../component/Header';

const Dashboard = () => {
  const [Categories, setCategories] = useState<Category[]>([]);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // Fetch profiles (GET request)
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://are-we-there-yet-mirror.onrender.com/api/categories');
      const data = await response.json();
      // console.log(data);
      setCategories(data.data.categories);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  // Delete profile by _id (DELETE request)
  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`https://are-we-there-yet-mirror.onrender.com/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(Categories.filter((Category) => Category._id !== id));
        setRefresh(refresh + 1);
      } else {
        console.error('Failed to delete Category');
      }
    } catch (error) {
      console.error('Error deleting Category:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(Categories);

  return (
    <div className="container mx-auto">
      <Header
        setIsCategoryPopupOpen={setIsCategoryPopupOpen}
        isCategoryPopupOpen={isCategoryPopupOpen}
        setCategories={setCategories}
        setRefresh={setRefresh}
      />

      <CategoryTable
        key={refresh}
        Categories={Categories}
        onDeleteCategory={handleDeleteCategory}
        setCategories={setCategories}
      />
    </div>
  );
};

export default Dashboard;
