import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Museum } from '../types/museum';
import { Clock, MapPin, Plus, CreditCard } from 'lucide-react';
import Modal, { ModalRef } from './modal';
import MuseumForm, {MuseumFormData} from './MuseumForm';
import defaultPhoto from '../assets/defaultPhoto.png';
import axiosInstance from '../../shared/services/axiosInstance';
import GenericCard from '../../shared/GenericCard/GenericCard';
import toast from 'react-hot-toast';


interface MuseumListProps {
  museums: Museum[]; // All museums
  role: 'TourismGovernor'; // Define user roles
  onEdit?: (museum: Museum) => void; // Tourist/Guest functionality
  onDelete?: (museumId: string) => void; // Tourist/Guest functionality
  onCreate?: (museumData: MuseumFormData) => void; //  functionality
}

const defaultImage = defaultPhoto;

const MuseumList: React.FC<MuseumListProps> = ({ museums, role, onCreate, onEdit, onDelete  }) => {
  const [selectedMuseum, setSelectedMuseum] = useState<Museum | null>(null); // State to store the clicked museum
  const [imageURLs, setImageURLs] = useState<{ [key: string]: string[] }>({});
  const EditmodalRef = useRef<ModalRef>(null); // Reference for modal
  const AddmodalRef = useRef<ModalRef>(null); // Reference for modal
  const handleOpenModal = (museum: Museum) => {
    setSelectedMuseum(museum);
    EditmodalRef.current?.open(); // Open the modal
  };
  const fetchPicture = async (pictureId: string): Promise<string | undefined> => {
    try {
      const response = await axiosInstance.get(`/attachments/${pictureId}`); // Fetch binary data
      return response.data.url;
    } catch (error) {
      console.error('Error fetching picture:', error);
      return undefined;
    }
  };
  useEffect(() => {
    const fetchImages = async () => {
      const newImageURLs: { [key: string]: string[] } = {}; // Prepare to store an array of URLs
      for (const museum of museums) {
        newImageURLs[museum._id] = []; // Initialize an empty array for each museum
        if (museum.pictures.length > 0) {
          for (const pictureId of museum.pictures) {
            const imageUrl = await fetchPicture(pictureId);
            if (imageUrl) {
              newImageURLs[museum._id].push(imageUrl); // Store the image URL
            }
          }
        }
        // If no valid images were fetched, add the default image
        if (newImageURLs[museum._id].length === 0) {
          newImageURLs[museum._id].push(defaultPhoto); // Default image if no valid pictures
        }
      }
      setImageURLs(newImageURLs); // Update state with new URLs
    };
  
    fetchImages();
  }, [museums]);

  return (
    <div className={customStyles.container}>
      {/* Museum List */}
      <div className={customStyles.sliderContainer}>
        <div className={customStyles.sliderContent}>
          <div className={customStyles.sliderWrapper}>
            {museums.map((museum, index) => (
              <div key={index}>
                <GenericCard
                item={museum}
                images={imageURLs[museum._id] ? imageURLs[museum._id] : [defaultImage]} // Pass the fetched image URL or default image
                onClick={() => handleOpenModal(museum)} // Opens the modal on click
                onRemove={(id) => {
                  if (onDelete) {
                    onDelete(id); // Call delete function with the museum ID
                    toast.success('Museum deleted successfully!');
                  }
                }}
              >
                <p className="line-clamp-2 text-body text-gray-700">{museum.description}</p>
                 <div className={customStyles.infoRow}>
                  <Clock size={20} className={customStyles.icon} />
                  <p className={customStyles.slideText}>{museum.opening_hours}</p>
                </div>                
                
                <div className={customStyles.ticketPrices}>
                <p className={`${customStyles.slideText} font-bold text-accent-dark-blue text-center flex items-center justify-center`}>
                <CreditCard size ={20} className={customStyles.icon} /> Ticket Prices:
                </p>
                 <div className={customStyles.ticketRow}>
                  <div className={customStyles.ticketColumn}>
                    <p className={customStyles.slideText}>Foreigner</p>
                    <p className={customStyles.slideText2}>${museum.ticket_prices.foreigner}</p>
                    </div>
                    <div className={customStyles.ticketColumn}>
                      <p className={customStyles.slideText}>Native</p>
                      <p className={customStyles.slideText2}>${museum.ticket_prices.native}</p>
                      </div>
                      <div className={customStyles.ticketColumn}>
                        <p className={customStyles.slideText}>Student</p>
                        <p className={customStyles.slideText2}>${museum.ticket_prices.student}</p>
                        </div>
                      </div>
                <div className={`${customStyles.infoRow} mt-2`}>
                  <MapPin size={50} className={customStyles.icon} />
                  <p className={customStyles.slideText}>{museum.location.name}</p>
                </div>
                </div>
              </GenericCard>
 
              </div>
            ))}
            {/* Plus Button to Add New Museum */}
            <div className={customStyles.slide}>
                <div onClick={() => AddmodalRef.current?.open()} className={customStyles.addSlideDiv}>
                  <Plus className={customStyles.addSlideIcon} />
                </div>
              </div>
          </div>
        </div>
      </div>
      <Modal
        ref={EditmodalRef}
        title={selectedMuseum?.name || 'Museum Details'}
        onClose={() => setSelectedMuseum(null)}
      >
        {selectedMuseum && (
        <div>
        {role === 'TourismGovernor' && (
        <MuseumForm
                addModalRef={EditmodalRef}
                onUpdate={onEdit}
                initialData={{
                  name: selectedMuseum.name,
                  description: selectedMuseum.description,
                  category: selectedMuseum.category,
                  tags: selectedMuseum.tags,
                  location: selectedMuseum.location,
                  pictures: selectedMuseum.pictures,
                  ticket_prices: selectedMuseum.ticket_prices,
                  opening_hours: selectedMuseum.opening_hours,
                  // Add an empty array or appropriate initial value for attachments
                }}
                selectedMuseum={selectedMuseum}
              />
               )}
          </div>
        )}
      </Modal>
      <Modal ref={AddmodalRef} title="Add New Museum">
        <div>
          <MuseumForm addModalRef={AddmodalRef} onSubmit= {onCreate} />
        </div>
      </Modal>
    </div>
  );
};

const customStyles = {
  container: "h-auto max-h-[100vh] bg-secondary-white max-w-fit border-2 border-gray-300 pr-2 pt-4 pl-10 pb-10 mx-auto",
  sliderContainer: "relative",
  sliderContent: "overflow-hidden",
  sliderWrapper: "grid grid-cols-3 gap-12 max-h-[70vh] overflow-y-auto pr-6 pt-2", // Set a max height and make it scrollable
  slideText: "text-sm mt-1",
  slide: "w-[50%] h-[100%] flex-shrink-0 px-2 transition-all duration-600 m-6",
  addSlideDiv: "flex items-center justify-center h-[50vh] w-[35vh] border-2 border-dashed border-gray-300 bg-white cursor-pointer hover:bg-gray-50",
  addSlideIcon: "text-gray-400 w-16 h-16",
  infoRow: "flex items-center justify-center mb-2", // Center align info rows
  ticketPrices: "text-center mt-2",
  ticketRow: "flex justify-between", // Flex container for the ticket row
  ticketColumn: "flex flex-col items-center", // Flex column for each ticket type
  slideText2: "text-sm text-gray-700", // Adjusted text styles as needed // Margin for icons
  icon: " text-blue-600 mr-2"
};

export default MuseumList;
