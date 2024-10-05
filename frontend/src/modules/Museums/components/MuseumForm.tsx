





import React, { useState } from 'react';
interface MuseumFormProps {
    onSubmit: (museumData: MuseumFormData) => void;
  }
  
  export interface MuseumFormData {
    name: string;
    description: string;
    category: string;
    pictures: File[];
    opening_hours: string;
    ticket_prices: {
      foreigner: number;
      native: number;
      student: number;
    }; // Assuming you will implement file handling
  }
  
  const MuseumForm: React.FC<MuseumFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<Omit<MuseumFormData, 'attachments'>>({
      name: '',
      description: '',
      category: '',
      pictures: [],
      opening_hours: '',
      ticket_prices: {
          foreigner: 0,
          native: 0,
          student: 0,
        },
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formDataWithAttachments = { ...formData, pictures: [] };
  
      onSubmit(formDataWithAttachments);
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col  w-1/3 mx-auto">
        <label htmlFor="name">Museum Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Museum Name"
          className={styles.inputClass}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className={styles.inputClass}
        />
        <label htmlFor="category">Category</label>
        <textarea
          name="description"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Description"
          className={styles.inputClass}
        />
         <label htmlFor="opening-hours">Opening Hours</label>
        <textarea
          name="description"
          value={formData.opening_hours}
          onChange={handleInputChange}
          placeholder="Description"
          className={styles.inputClass}
        />
        <label htmlFor="price-foreigner">Price for a foreigner</label>
        <input
          type="number"
          name="price"
          value={formData.ticket_prices.foreigner}
          onChange={handleInputChange}
          placeholder="Price for Foreigners"
          className={styles.inputClass}
        />
        <label htmlFor="price-native">Price for a native</label>
        <input
          type="number"
          name="price"
          value={formData.ticket_prices.native}
          onChange={handleInputChange}
          placeholder="Price for Natives"
          className={styles.inputClass}
        />
        <label htmlFor="price-student">Price for a student</label>
        <input
          type="number"
          name="price"
          value={formData.ticket_prices.student}
          onChange={handleInputChange}
          placeholder="Price for Students"
          className={styles.inputClass}
        />
        {/* You can add file upload input for attachments */}
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    );
  };
  
  const styles = {
    inputClass: 'border border-gray-300 rounded-md p-2 mb-2',
    button: 'bg-gray-500 text-white rounded-md p-2',
  };
export default MuseumForm;