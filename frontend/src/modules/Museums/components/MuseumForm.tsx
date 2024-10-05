import React, { useState } from 'react';
import { type } from '../types/museum';

interface MuseumFormProps {
  onSubmit: (museumData: MuseumFormData) => void;
}

export interface MuseumFormData {
  name: string;
  description: string;
  category: string;
  tags: {
    _id: string; // Unique identifier for the tag
    name: string; // Name of the tag
    type: type; // Type of the tag (using the defined enum)
    historical_period: string; // Historical period related to the tag
  }[];
  pictures: File[]; // Array to hold multiple pictures
  opening_hours: string;
  ticket_prices: {
    foreigner: number;
    native: number;
    student: number;
  };
}

const MuseumForm: React.FC<MuseumFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<MuseumFormData, 'pictures'>>({
    name: '',
    description: '',
    category: '',
    tags: [
      {
        _id: '',
        name: '',
        type: type.Museum, // Assign the default type here
        historical_period: '',
      },
    ],
    opening_hours: '',
    ticket_prices: {
      foreigner: 0,
      native: 0,
      student: 0,
    },
  });

  const [pictures, setPictures] = useState<File[]>([]); // Separate state for file uploads

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const priceValue = Number(value);

    setFormData((prevData) => ({
      ...prevData,
      ticket_prices: {
        ...prevData.ticket_prices,
        [name]: priceValue,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPictures(files); // Store the selected files
  };

  // Handling tags
  const handleTagChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedTags = [...formData.tags];

    // Using type assertion to ensure proper type for 'type'
    if (name === 'type') {
      updatedTags[index][name] = value as type; // Ensure the value is of type 'type'
    } else {
      updatedTags[index][name as keyof typeof updatedTags[number]] = value;
    }

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
        {
          _id: '',
          name: '',
          type: type.Museum, // Default type for new tag
          historical_period: '',
        },
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
    const formDataWithAttachments = { ...formData, pictures }; // Include pictures

    onSubmit(formDataWithAttachments); // Pass the complete data
  };

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
      <label htmlFor="opening_hours">Opening Hours</label>
      <input
        type="text"
        name="opening_hours"
        value={formData.opening_hours}
        onChange={handleInputChange}
        placeholder="Opening Hours"
        className={styles.inputClass}
      />
      <label htmlFor="price-foreigner">Price for a foreigner</label>
      <input
        type="number"
        name="foreigner" // Unique name for the ticket price field
        value={formData.ticket_prices.foreigner}
        onChange={handlePriceChange}
        placeholder="Price for Foreigners"
        className={styles.inputClass}
      />
      <label htmlFor="price-native">Price for a native</label>
      <input
        type="number"
        name="native" // Unique name for the ticket price field
        value={formData.ticket_prices.native}
        onChange={handlePriceChange}
        placeholder="Price for Natives"
        className={styles.inputClass}
      />
      <label htmlFor="price-student">Price for a student</label>
      <input
        type="number"
        name="student" // Unique name for the ticket price field
        value={formData.ticket_prices.student}
        onChange={handlePriceChange}
        placeholder="Price for Students"
        className={styles.inputClass}
      />
      
      {/* Tags Section */}
      <h3 className="mt-4">Tags</h3>
      {formData.tags.map((tag, index) => (
        <div key={index} className="flex flex-col mb-2">
          <label htmlFor={`tag-name-${index}`}>Tag Name</label>
          <input
            type="text"
            name="name"
            value={tag.name}
            onChange={(e) => handleTagChange(index, e)}
            placeholder="Tag Name"
            className={styles.inputClass}
          />
          <label htmlFor={`tag-type-${index}`}>Tag Type</label>
          <select
            name="type"
            value={tag.type}
            onChange={(e) => handleTagChange(index, e)}
            className={styles.inputClass}
          >
            {Object.values(type).map((tagType) => (
              <option key={tagType} value={tagType}>
                {tagType}
              </option>
            ))}
          </select>
          <label htmlFor={`tag-historical-period-${index}`}>Historical Period</label>
          <input
            type="text"
            name="historical_period"
            value={tag.historical_period}
            onChange={(e) => handleTagChange(index, e)}
            placeholder="Historical Period"
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
      
      {/* File Upload */}
      <label htmlFor="pictures">Upload Pictures</label>
      <input
        type="file"
        multiple // Allow multiple file uploads
        onChange={handleFileChange}
        className={styles.inputClass}
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
