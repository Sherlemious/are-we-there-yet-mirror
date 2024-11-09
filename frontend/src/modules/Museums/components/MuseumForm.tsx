import React, { useState, useRef, useEffect } from "react";
import { ModalRef } from "./modal";
import defaultPhoto from "../assets/defaultPhoto.png";
import { Museum } from "../types/museum";
import Map, { Location } from "../../shared/components/Map";
import SearchMultiSelect from '../../shared/components/SearchMultiSelect';
import axiosInstance from "../../shared/services/axiosInstance";
import {
  Building,
  DollarSign,
  ClipboardList,
  MapPin,
  ImagePlus,
  Clock,
  List,
  Tag,
} from "lucide-react";
import toast from "react-hot-toast";

interface MuseumFormProps {
  onSubmit?: (museumData: MuseumFormData) => void;
  onUpdate?: (museumData: Museum) => void;
  selectedMuseum?: Museum;
  addModalRef: React.RefObject<ModalRef>;
  initialData?: MuseumFormData;
}
const InputWrapper: React.FC<{
  children: React.ReactNode;
  icon: React.ReactNode;
  label: string;
}> = ({ children, icon, label }) => (
  <div className="mb-6">
    <label className="mb-2 flex items-center gap-2 font-sub_headings text-accent-dark-blue">
      {icon}
      {label}
    </label>
    {children}
  </div>
);
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
    const tagIds = selectedMuseum.tags.map(tag => {
      return typeof tag === "object" ? tag._id : tag; // If it's an object, get the name
    });

    setFormData((prevData) => ({
      ...prevData,
      name: selectedMuseum.name,
      description: selectedMuseum.description,
      category: selectedMuseum.category,
      tags: tagIds, // Store only tag names
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
    
    // Ensure the index is valid before attempting to delete
    if (index >= 0 && index < pictures.length) {
      // Remove the picture from the pictures array
      const updatedPictures = pictures.filter((_, i) => i !== index);
  
      // Also update the uploaded array if necessary
      // If the picture URL corresponds to an uploaded file, remove it from the uploaded array
      const deletedPictureUrl = pictures[index];
      const updatedUploaded = uploaded.filter((file, i) => {
        // Compare the file's object URL to determine if it's the same as the one being deleted
        const fileUrl = URL.createObjectURL(file);
        return fileUrl !== deletedPictureUrl; // Keep files that don't match the deleted picture
      });
  
      // Update the states
      setPictures(updatedPictures);
      setUploaded(updatedUploaded);
  
      // Adjust imageIndex if necessary
      const newIndex = index === pictures.length - 1 ? index - 1 : index;
      setImageIndex(newIndex >= updatedPictures.length ? updatedPictures.length - 1 : newIndex);
  
      // Update image preview
      setImagePreview(updatedPictures.length > 0 ? updatedPictures[newIndex] : undefined);
    } else {
      // If the index is invalid, reset image preview and index
      setImagePreview(undefined);
      setImageIndex(0);
    }
  
    console.log(index + " " + pictures.length);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Processing..."); // Show loading toast
    const ids = [];
    addModalRef.current?.close();
  
    try {
        for (let i = 0; i < uploaded.length; i++) {
        const formData = new FormData();
        formData.append("file", uploaded[i]);
        const response = await axiosInstance.post(
          `/attachments`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        ids.push(response.data._id);
      }
  
      // Collect fetched picture IDs
      for (let i = 0; i < fetched.length; i++) {
        if (pictures.includes(fetched[i].url)) {
          ids.push(fetched[i]._id);
        }
      }
  
      const formDataWithAttachments = { ...formData, pictures: ids };
  
      // Handle submission
      if (onSubmit) {
        await onSubmit(formDataWithAttachments); // Await onSubmit
        toast.success("Museum added successfully!", { id: loadingToastId }); // Success toast
      }
  
      // Handle update
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
        await onUpdate(museum); // Await onUpdate
        toast.success("Museum updated successfully!", { id: loadingToastId }); // Success toast
      }
    } catch (error) {
      toast.error("An error occurred while processing your request.", { id: loadingToastId }); // Error toast
      console.error(error);
    }
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
  useEffect(() => {
    if (imageIndex >= 0 && imageIndex < pictures.length) {
      setImagePreview(pictures[imageIndex]);
    }
  }, [imageIndex, pictures]);
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
        <InputWrapper icon={<Building size={20} />} label="Museum Name">
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleInputChange}
            placeholder="Museum Name"
            className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
          />
          </InputWrapper>

        </div>

        {/* Description (Full width) */}
        <div className="col-span-2">
        <InputWrapper icon={<ClipboardList size={20} />} label="Description">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Description"
            className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 h-24 text-text-primary" // Increase height for textarea
          />
        </InputWrapper>
        </div>

        {/* Category and Location (Side by side) */}
        <div className="col-span-1">
        <InputWrapper icon={<List size={20} />} label="Category">
          <input
            type="text"
            name="category"
            value={formData.category}
            required
            onChange={handleInputChange}
            placeholder="Category"
            className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
            />
        </InputWrapper>
        </div>

        {/* Opening Hours (Full width) */}
        <div className="col-span-1">
        <InputWrapper icon={<Clock size={20} />} label="Opening Hours">
          <input
            type="text"
            name="opening_hours"
            value={formData.opening_hours}
            required
            onChange={handleInputChange}
            placeholder="Opening Hours"
            className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
            />
        </InputWrapper>
        </div>

        {/* Ticket Prices (Side by side) */}
        <div className="col-span-1">
        <InputWrapper icon={<DollarSign size={20} />} label="Foreigner Price">
        <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
          <input
            type="number"
            name="foreigner"
            value={formData.ticket_prices.foreigner}
            onChange={handlePriceChange}
            placeholder="Price for Foreigners"
            className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey py-3 pl-8 pr-4 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
            />
        </div>
        </InputWrapper>
        </div>

        <div className="col-span-1">
        <InputWrapper icon={<DollarSign size={20} />} label="Native Price">
        <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
          <input
            type="number"
            name="native"
            value={formData.ticket_prices.native}
            onChange={handlePriceChange}
            placeholder="Price for Natives"
            className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey py-3 pl-8 pr-4 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
            />
        </div>
        </InputWrapper>
        </div>
        <div className="col-span-1">
        <InputWrapper icon={<DollarSign size={20} />} label="Student Price">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            name="student"
            value={formData.ticket_prices.student}
            onChange={handlePriceChange}
            placeholder="Price for Students"
            className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey py-3 pl-8 pr-4 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
            />
        </div>
        </InputWrapper>
        </div>
        <div className="col-span-1">
        <InputWrapper icon={<MapPin size={20} />} label="Location">
          <input
            type="text"
            name="location"
            value={formData.location.name}
            required
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
            />
        </InputWrapper>
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
  <InputWrapper icon={<ImagePlus size={20} />} label="Museum Images">
  {pictures.length === 0 || !imagePreview ? (
    <div className="rounded-lg border-2 border-dashed border-borders-primary bg-secondary-light_grey p-6 text-center mb-2">
    <>
      <ImagePlus className="mx-auto mb-2 text-primary-blue" size={32} />
      <p className="text-gray-500">
        Drag and drop your images here or click to browse
      </p>
    </>
    </div>
  ) : (
  <div className="relative mb-2">
    <img
      src={
        imagePreview && pictures.length > 0
          ? imagePreview
          : defaultPhoto
      }
      alt="Preview"
      className="h-64 w-full rounded-md object-cover border border-borders-primary"
    />

    {/* Conditionally render chevrons if multiple pictures are uploaded */}
    {pictures.length > 0 && (
      <>
        <span
          onClick={() => handleImageToggle("prev")}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-accent-dark-blue text-3xl"
        >
          {/* Left chevron icon */}
          &#10094;
        </span>
        <span
          onClick={() => handleImageToggle("next")}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-accent-dark-blue text-3xl"
        >
          {/* Right chevron icon */}
          &#10095;
        </span>

        <button
          type="button"
          onClick={() => handleDeletePicture(imageIndex)}
          className="absolute top-1 right-2 text-gray-500 hover:text-red-600 focus:outline-none text-3x1"
          aria-label="Delete picture"
        >
          &#10005; {/* "X" icon */}
        </button>
      </>
    )}
  </div>
    )}

  <input
    type="file"
    multiple
    onChange={handleFileChange}
    className={styles.inputClass}
    ref={fileInputRef}
    accept="image/*"
  />
</InputWrapper>
</div>
        
        <InputWrapper icon={<Tag size={20} />} label="Tags">
          <div className="mt-2">
            <SearchMultiSelect
              options={availableTags.map((tag) => ({
                value: tag._id, // Unique identifier
                label: tag.name, // Display name
                payload: tag // Full tag object as payload
              }))} // Extract tag names for options
              selectedItems={formData.tags.map(tagId => {
                const tag = availableTags.find((tag) => tag._id === tagId); // Find the tag object by ID
                return tag ? { value: tag._id, label: tag.name, payload: tag } : null;
              }).filter(Boolean)}
              onSelect={(item) => {
              if (!formData.tags.includes(item.value)) {
              setFormData((prevData) => ({
              ...prevData,
              tags: [...prevData.tags, item.value], // Add selected tag
                }));
                }
              }}
              onRemove={(item) => {
                setFormData((prevData) => ({
                ...prevData,
                tags: prevData.tags.filter((tag) => tag !== item.value), // Remove tag
                }));
                }}
                />
        </div>
      </InputWrapper>

      </div>
      <div className="col-span-2 flex justify-end">
      <button
            type="button"
            onClick={() => addModalRef.current?.close()}
            className="mr-4 rounded-lg px-6 py-3 font-bold text-accent-dark-blue transition-colors hover:bg-secondary-light_grey"
          >
            Cancel
          </button>
        <button type="submit" className="flex items-center gap-2 rounded-lg bg-accent-dark-blue px-6 py-3 font-bold text-white transition-all duration-150 hover:opacity-80"
        >
          <Building size={20} />
          {initialData?.name ? "Update Museum" : "Add New Museum"}
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
