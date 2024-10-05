import React, { useState, useRef } from 'react';
import { ModalRef } from './modal';

interface MuseumFormProps {
  onSubmit: (museumData: MuseumFormData) => void;
  addModalRef: React.RefObject<ModalRef>;
  initialData?: MuseumFormData;
}

export interface MuseumFormData {
  _id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  location: {
    name: string;
    latitude: number;
    longitude: number;
  }
  pictures: string[]; // Array to hold multiple pictures
  opening_hours: string;
  ticket_prices: {
    foreigner: number;
    native: number;
    student: number;
  };
}

const MuseumForm: React.FC<MuseumFormProps> = ({ onSubmit, addModalRef, initialData }) => {
  const [formData, setFormData] = useState<Omit<MuseumFormData, 'pictures'>>( initialData || {
    _id: '',
    name: '',
    description: '',
    category: '',
    tags: [''],
    location: {
      name: '',
      latitude: 0,
      longitude: 0,
    },
    opening_hours: '',
    ticket_prices: {
      foreigner: 0,
      native: 0,
      student: 0,
    },
  });

  const [pictures, setPictures] = useState<string[]>([]); // Separate state for file uploads
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const priceValue = Math.max(0, Number(value)); // Ensure the price is not negative
  
    setFormData((prevData) => ({
      ...prevData,
      ticket_prices: {
        ...prevData.ticket_prices,
        [name]: priceValue, // Assign the validated price
      },
    }));
  };
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPictures(files.map(file => URL.createObjectURL(file))); // Store the file URLs
  };

  // Handling tags
  const handleTagChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedTags = [...formData.tags];
    updatedTags[index] = value; 

    setFormData((prevData) => ({
      ...prevData,
      tags: updatedTags,
    }));
  };
  const addTag = () => {
    setFormData((prevData) => ({
      ...prevData,
      tags: [
        ...prevData.tags,
      ],
    }));
  };


  const removeTag = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataWithAttachments = { ...formData, pictures: [] };

    if (onSubmit) {
      onSubmit(formDataWithAttachments);
    }
    addModalRef.current?.close();
  };
  // const resetForm = () => {
  //   setFormData({
  //     name: '',
  //     description: '',
  //     category: '',
  //     tags: [{
  //       _id: '',
  //       name: '',
  //       type: type.Museum,
  //       historical_period: '',
  //     }],
  //     location:{
  //       name: '',
  //       latitude: 0,
  //       longitude: 0,
  //     },
  //     opening_hours: '',
  //     ticket_prices: {
  //       foreigner: 0,
  //       native: 0,
  //       student: 0,
  //     },
  //   });
  //   setPictures([]); // Clear the selected pictures
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = ''; // Reset the file input field
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/3 mx-auto">
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
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        placeholder="Category"
        className={styles.inputClass}
      />
        {/* Tags Section */}
        <h3 className="mt-4">Tags</h3>
      {formData.tags.map((tag, index) => (
        <div key={index} className="flex flex-col mb-2">
          <label htmlFor={`tag-name-${index}`}>Tag</label>
          <input
            type="text"
            name="name"
            value={tag}
            onChange={(e) => handleTagChange(index, e)}
            placeholder="Tag Name"
            className={styles.inputClass}
          />
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="mt-2 bg-red-500 text-white rounded-md p-1"
          >
            Remove Tag
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addTag}
        className="mt-2 bg-green-500 text-white rounded-md p-1"
      >
        Add Tag
      </button>
      <label htmlFor="opening_hours">Opening Hours</label>
      <input
        type="text"
        name="opening_hours"
        value={formData.opening_hours}
        onChange={handleInputChange}
        placeholder="Opening Hours"
        className={styles.inputClass}
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        value={formData.location.name}
        onChange={handleInputChange}
        placeholder="Location"
        className={styles.inputClass}
      />
      <label htmlFor="price-foreigner">Ticket Price for a foreigner</label>
      <input
        type="number"
        name="foreigner" // Unique name for the ticket price field
        value={formData.ticket_prices.foreigner}
        onChange={handlePriceChange}
        placeholder="Price for Foreigners"
        className={styles.inputClass}
      />
      <label htmlFor="price-native">Ticket Price for a native</label>
      <input
        type="number"
        name="native" // Unique name for the ticket price field
        value={formData.ticket_prices.native}
        onChange={handlePriceChange}
        placeholder="Price for Natives"
        className={styles.inputClass}
      />
      <label htmlFor="price-student">Ticket Price for a student</label>
      <input
        type="number"
        name="student" // Unique name for the ticket price field
        value={formData.ticket_prices.student}
        onChange={handlePriceChange}
        placeholder="Price for Students"
        className={styles.inputClass}
      />
      
    
      {/* File Upload */}
      <label htmlFor="pictures">Upload Pictures</label>
      <input
        type="file"
        multiple // Allow multiple file uploads
        onChange={handleFileChange}
        className={styles.inputClass}
        ref={fileInputRef} // Attach the ref here
      />
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
