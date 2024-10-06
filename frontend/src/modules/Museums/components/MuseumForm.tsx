import React, { useState, useRef } from 'react';
import { ModalRef } from './modal';
import defaultPhoto from '../assets/defaultPhoto.png';
import { Museum } from '../types/museum';

interface MuseumFormProps {
  onSubmit?: (museumData: MuseumFormData) => void;
  onUpdate?: (museumData: Museum) => void;
  selectedMuseum?: Museum;
  addModalRef: React.RefObject<ModalRef>;
  initialData?: MuseumFormData;
}

export interface MuseumFormData {
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

const MuseumForm: React.FC<MuseumFormProps> = ({ onSubmit, onUpdate, selectedMuseum, addModalRef, initialData }) => {
  const [formData, setFormData] = useState<Omit<MuseumFormData, 'pictures'>>( initialData || {
    name: '',
    description: '',
    category: '',
    tags: [''],
    location: {
      name: '',
      latitude: 40.712776,
      longitude: -74.005974,
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
  const [imagePreview, setImagePreview] = useState<string>(defaultPhoto); // State for image preview
  const [imageIndex, setImageIndex] = useState(0); // State to keep track of the current image index


  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    if (name === 'location') {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          name: value,
        },
      }));
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          latitude: 40.712776,
          longitude: -74.005974, // Update longitude
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
    if (files.length > 0) {
      setPictures(files.map(file => URL.createObjectURL(file))); // Store the file URLs
      setImageIndex(0); // Reset to the first image
      setImagePreview(URL.createObjectURL(files[0])); // Display the first uploaded image
    }
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
        "", // Add an empty string as the new tag
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
    const formDataWithAttachments = { ...formData, pictures: [], };

    if (onSubmit) {
      onSubmit(formDataWithAttachments);
    }
    if(onUpdate){
      const museum : Museum = {
        _id: selectedMuseum?._id || '', 
        name: formData.name,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        pictures: [],
        location: formData.location,
        opening_hours: formData.opening_hours,
        ticket_prices: formData.ticket_prices,
      }
      onUpdate(museum);
    }
    addModalRef.current?.close();
  };

  const handleImageToggle = (direction: 'next' | 'prev') => {
    setImageIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % pictures.length; // Loop to the first image
      } else {
        return (prevIndex - 1 + pictures.length) % pictures.length; // Loop to the last image
      }
    });
    setImagePreview(pictures[imageIndex]); // Update the preview with the selected image
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
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 w-7/8 mx-auto mt-4">
      {/* Left Side */}
      <div className="col-span-1 grid grid-cols-2 gap-4">
        {/* Name (Full width) */}
        <div className="col-span-2">
          <label htmlFor="name" className="mb-2 block">Museum Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Museum Name"
            className={styles.inputClass}
          />
        </div>
  
        {/* Description (Full width) */}
        <div className="col-span-2">
          <label htmlFor="description" className="mb-2 block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className={`${styles.inputClass} h-24`} // Increase height for textarea
          />
        </div>
  
        {/* Category and Location (Side by side) */}
        <div className="col-span-1">
          <label htmlFor="category" className="mb-2 block">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className={styles.inputClass}
          />
        </div>
  
        {/* Opening Hours (Full width) */}
        <div className="col-span-1">
          <label htmlFor="opening_hours" className="mb-2 block">Opening Hours</label>
          <input
            type="text"
            name="opening_hours"
            value={formData.opening_hours}
            onChange={handleInputChange}
            placeholder="Opening Hours"
            className={styles.inputClass}
          />
        </div>
  
        {/* Ticket Prices (Side by side) */}
        <div className="col-span-1">
          <label htmlFor="price-foreigner" className="mb-2 block">Ticket Price (Foreigner)</label>
          <input
            type="number"
            name="foreigner"
            value={formData.ticket_prices.foreigner}
            onChange={handlePriceChange}
            placeholder="Price for Foreigners"
            className={styles.inputClass}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="price-native" className="mb-2 block">Ticket Price (Native)</label>
          <input
            type="number"
            name="native"
            value={formData.ticket_prices.native}
            onChange={handlePriceChange}
            placeholder="Price for Natives"
            className={styles.inputClass}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="price-student" className="mb-2 block">Ticket Price (Student)</label>
          <input
            type="number"
            name="student"
            value={formData.ticket_prices.student}
            onChange={handlePriceChange}
            placeholder="Price for Students"
            className={styles.inputClass}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="location" className="mb-2 block">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location.name}
            onChange={handleInputChange}
            placeholder="Location"
            className={styles.inputClass}
          />
        </div>
      </div>
      
  
      {/* Right Side */}
      <div className="col-span-1 flex flex-col"> {/* Centering the column */}
        {/* Picture Upload */}
        <div>
        <label htmlFor="pictures" className="mb-2 block">Upload Pictures</label>
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="mt-4-gray-300 rounded-md w-full h-64 object-cover" 
          />
          {/* Conditionally render arrows if multiple pictures are uploaded */}
          {pictures.length > 1 && (
            <div className="flex justify-between mb-3">
              <span 
                onClick={() => handleImageToggle('prev')} 
                className="cursor-pointer text-gray-500 hover:text-black"
              >
                &#9664; {/* Left arrow */}
              </span>
              <span 
                onClick={() => handleImageToggle('next')} 
                className="cursor-pointer text-gray-500 hover:text-black"
              >
                &#9654; {/* Right arrow */}
              </span>
            </div>
          )}
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className={styles.inputClass}
            ref={fileInputRef}
          />
        </div>

  
        {/* Tags Section (Below Pictures) */}
        <div className="mt-6">
          <h3 className="mt-6 mb-4">Tags</h3>
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name="tag"
                value={tag}
                onChange={(e) => handleTagChange(index, e)}
                placeholder="Tag Name"
                className={styles.inputClass}
              />
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 bg-red-500 text-white rounded-md p-1"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTag}
            className="mt-4 bg-green-500 text-white rounded-md p-2"
          >
            Add Tag
          </button>
        </div>
      </div>
  
      {/* Submit Button (Full width) */}
      <div className="col-span-2 flex justify-end">
        <button type="submit" className={`${styles.button} w-1/4 p-4`}>
        {initialData?.name ? 'Update' : 'submit'}
        </button>
      </div>
    </form>
  );  
};

const styles = {
  inputClass: 'border border-gray-300 rounded-md p-2 mb-4 w-full',
  button: 'bg-gray-500 text-white rounded-md p-2',
};

export default MuseumForm;
