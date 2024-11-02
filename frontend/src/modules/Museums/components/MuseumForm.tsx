import React, { useState, useRef, useEffect } from "react";
import { ModalRef } from "./modal";
import defaultPhoto from "../assets/defaultPhoto.png";
import { Museum } from "../types/museum";
import Map, { Location } from "../../shared/components/Map";
import SearchMultiSelect from '../../shared/components/SearchMultiSelect';
import axiosInstance from "../../shared/services/axiosInstance";

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
  };
  pictures: string[]; // Array to hold multiple pictures
  opening_hours: string;
  ticket_prices: {
    foreigner: number;
    native: number;
    student: number;
  };
}

const MuseumForm: React.FC<MuseumFormProps> = ({
  onSubmit,
  onUpdate,
  selectedMuseum,
  addModalRef,
  initialData,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      category: "",
      tags: [],
      pictures: [],
      location: {
        name: "",
        latitude: 40.712776,
        longitude: -74.005974,
      },
      opening_hours: "",
      ticket_prices: {
        foreigner: 0,
        native: 0,
        student: 0,
      },
    },
  );

  const [pictures, setPictures] = useState<string[]>([]); // Separate state for file uploads
  const [uploaded, setUploaded] = useState<File[]>([]); // Separate state for file uploads
  const [fetched, setFetched] = useState<object[]>([]); // Separate state for file uploads
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input
  const [imagePreview, setImagePreview] = useState<string>(); // State for image preview
  const [imageIndex, setImageIndex] = useState(0); // State to keep track of the current image index
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  ); // To track location from the map

  const fetchPictures = async (museum: Museum) => {
    try {
      const fetchedURLs: string[] = [];
      const objects: object[] = [];
      for (let i = 0; i < museum.pictures.length; i++) {
        // Fetch the picture using the attachment ID
        if (museum.pictures[i]) {
          const response = await axiosInstance.get(
            `/attachments/${museum.pictures[i]}`,
          );
          console.log(response);
          // Convert Blob to File
          // const file = new File([response.data], response.data.original_name, {
          //   type: response.data.type || "image/png",
          // });
          objects.push(response.data);
          fetchedURLs.push(response.data.url); // Push the file into the array
        }

        // Set the fetched files into the state
        setPictures(fetchedURLs);
        setFetched(objects);
        // Optionally set the first file as preview
        if (fetchedURLs.length > 0) {
          setImagePreview(fetchedURLs[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching pictures:", error);
    }
  };

  const [availableTags, setAvailableTags] = useState<
    { _id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get(
          "/tags",
        );
        setAvailableTags(response.data.data.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
  if (selectedMuseum) {
    const tagNames = selectedMuseum.tags.map(tag => {
      return typeof tag === "object" ? tag.name : tag; // If it's an object, get the name
    });

    setFormData((prevData) => ({
      ...prevData,
      name: selectedMuseum.name,
      description: selectedMuseum.description,
      category: selectedMuseum.category,
      tags: tagNames, // Store only tag names
      opening_hours: selectedMuseum.opening_hours,
      ticket_prices: selectedMuseum.ticket_prices,
      location: {
        name: selectedMuseum.location.name,
        latitude: selectedMuseum.location.latitude,
        longitude: selectedMuseum.location.longitude,
      },
      pictures: selectedMuseum.pictures,
    }));

    fetchPictures(selectedMuseum);

    setSelectedLocation({
      lat: selectedMuseum.location.latitude,
      lng: selectedMuseum.location.longitude,
      name: selectedMuseum.location.name,
    });
  }
}, [selectedMuseum, availableTags]);

  const handleLocationChange = (location: Location) => {
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        latitude: location.lat,
        longitude: location.lng,
        name: location.name,
      },
    }));
  };

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "location") {
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
    const urls = files.map((file) => URL.createObjectURL(file));
    if (files.length > 0) {
      //update pictures to add existing pictures with the new files
      setUploaded([...uploaded, ...files]);
      setPictures([...pictures, ...urls]);
      setImageIndex(0); // Reset to the first image
      setImagePreview(urls[0]); // Display the first uploaded image
    }
  };

  const handleDeletePicture = (index: number) => {
    console.log(index + " " + pictures.length);
    if (pictures.length > 0) {
      setImageIndex(index >= pictures.length ? pictures.length - 1 : index); // Adjust imageIndex if necessary
      setImagePreview(
        pictures[index > pictures.length ? pictures.length - 1 : index],
      ); // Update preview
    } else {
      setImagePreview(undefined);
      setImageIndex(0);
    }
    setPictures((prevPictures) => prevPictures.filter((_, i) => i !== index));
    console.log(index + " " + pictures.length);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ids = [];
    for (let i = 0; i < uploaded.length; i++) {
      const formData = new FormData();
      formData.append("file", uploaded[i]);
      console.log(formData);
      console.log(uploaded[i]);
      const response = await axiosInstance.post(
        `/attachments`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      ids.push(response.data._id);
    }
    for(let i=0; i<fetched.length;i++){
      if (pictures.includes(fetched[i].url)) {
        ids.push(fetched[i]._id); // Only push the ID if it is not present in pictures
    }
    }
    for (let i = 0; i < formData.tags.length; i++) {
      if (availableTags.find((tag) => tag.name === formData.tags[i])) {
        formData.tags[i] =
          availableTags.find((tag) => tag.name === formData.tags[i])?._id || "";
      }
    }
    console.log(ids);
    console.log(formData.tags);
    const formDataWithAttachments = { ...formData, pictures: ids };
    if (onSubmit) {
      onSubmit(formDataWithAttachments);
    }
    if (onUpdate) {
      const museum: Museum = {
        _id: selectedMuseum?._id || "",
        name: formData.name,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        pictures: ids,
        location: formData.location,
        opening_hours: formData.opening_hours,
        ticket_prices: formData.ticket_prices,
      };
      onUpdate(museum);
    }
    addModalRef.current?.close();
  };

  const handleImageToggle = (direction: "next" | "prev") => {
    setImageIndex((prevIndex) => {
      if (direction === "next") {
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
    <form
      onSubmit={handleSubmit}
      className="w-7/8 mx-auto mt-4 grid grid-cols-2 gap-4"
    >
      {/* Left Side */}
      <div className="col-span-1 grid grid-cols-2 gap-4">
        {/* Name (Full width) */}
        <div className="col-span-2">
          <label htmlFor="name" className="mb-2 block text-input_or_label text-text-primary">
            Museum Name
          </label>
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
          <label htmlFor="description" className="mb-2 block text-input_or_label text-text-primary">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className={`${styles.inputClass} h-24 text-text-primary`} // Increase height for textarea
          />
        </div>

        {/* Category and Location (Side by side) */}
        <div className="col-span-1">
          <label htmlFor="category" className="mb-2 block text-input_or_label text-text-primary">
            Category
          </label>
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
          <label htmlFor="opening_hours" className="mb-2 block text-input_or_label text-text-primary">
            Opening Hours
          </label>
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
          <label htmlFor="price-foreigner" className="mb-2 block text-input_or_label text-text-primary">
            Ticket Price (Foreigner)
          </label>
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
          <label htmlFor="price-native" className="mb-2 block text-input_or_label text-text-primary">
            Ticket Price (Native)
          </label>
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
          <label htmlFor="price-student" className="mb-2 block text-input_or_label text-text-primary">
            Ticket Price (Student)
          </label>
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
          <label htmlFor="location" className="mb-2 block text-input_or_label text-text-primary">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location.name}
            onChange={handleInputChange}
            placeholder="Location"
            className={styles.inputClass}
          />
        </div>
        <div className="col-span-2 h-96">
          {/* Ensure the map has a fixed height */}
          <Map
            className="h-full w-full"
            value={selectedLocation || undefined}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-1 flex flex-col">
        {" "}
        {/* Centering the column */}
        {/* Picture Upload */}
        <div>
          <label htmlFor="pictures" className="mb-2 block text-input_or_label text-text-primary">
            Upload Pictures
          </label>
          <img
            src={
              imagePreview && pictures.length > 0
                ?imagePreview
                : defaultPhoto
            }
            alt="Preview"
            className="mt-4-gray-300 h-64 w-full rounded-md object-cover border border-borders-primary"
            />

          {/* Conditionally render arrows if multiple pictures are uploaded */}
          {pictures.length > 0 && (
            <div className="mb-3 flex justify-between">
              <span
                onClick={() => handleImageToggle("prev")}
                className="cursor-pointer text-gray-500 hover:text-accent-dark-blue"
                >
                &#9664; {/* Left arrow */}
              </span>
              <span
                onClick={() => handleImageToggle("next")}
                className="cursor-pointer text-gray-500 hover:text-accent-dark-blue"
                >
                &#9654; {/* Right arrow */}
              </span>
              <button
                type="button"
                onClick={() => handleDeletePicture(imageIndex)}
                className="ml-4 rounded-md bg-accent-gold p-1 text-secondary-white"
                >
                Delete
              </button>
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
        
        <div className="mt-2">
          <h3 className="mb-2 mt-2 text-input_or_label text-text-primary">Tags</h3>
            <SearchMultiSelect
              options={availableTags.map((tag) => tag.name)} // Extract tag names for options
              selectedItems={formData.tags.map(tag => (typeof tag === "object" ? tag.name : tag))} // Map to tag names
              onSelect={(item: string) => {
              if (!formData.tags.includes(item)) {
              setFormData((prevData) => ({
              ...prevData,
              tags: [...prevData.tags, item], // Add selected tag
                }));
                }
              }}
              onRemove={(item: string) => {
                setFormData((prevData) => ({
                ...prevData,
                tags: prevData.tags.filter((tag) => tag !== item), // Remove tag
                }));
                }}
          />
        </div>

      </div>
      <div className="col-span-2 flex justify-end">
        <button type="submit" className={`${styles.button} w-1/4 p-4`}>
          {initialData?.name ? "Update" : "Submit"}
        </button>
      </div>
      {/* Submit Button (Full width) */}
    </form>
  );
};

const styles = {
  inputClass: "border border-borders-primary rounded-md p-2 mb-4 w-full bg-secondary-light_grey text-text-primary placeholder:text-gray-500",
  button: "bg-primary-blue text-secondary-white rounded-md p-2 hover:bg-accent-dark-blue transition-all duration-150",
};
export default MuseumForm;
