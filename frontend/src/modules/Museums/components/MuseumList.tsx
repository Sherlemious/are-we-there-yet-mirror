import React from 'react';
import { useState, useRef } from 'react';
import { Museum } from '../types/museum';
import { Minus, Plus } from 'lucide-react';
import Modal, { ModalRef } from './modal';
import MuseumForm, {MuseumFormData} from './MuseumForm';
import defaultPhoto from '../assets/defaultPhoto.png';


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

  const EditmodalRef = useRef<ModalRef>(null); // Reference for modal
  const AddmodalRef = useRef<ModalRef>(null); // Reference for modal
  const handleOpenModal = (museum: Museum) => {
    setSelectedMuseum(museum);
    EditmodalRef.current?.open(); // Open the modal
  };

  return (
    <div className={customStyles.container}>
      {/* Museum List */}
      <div className={customStyles.sliderContainer}>
        <div className={customStyles.sliderContent}>
          <div className={customStyles.sliderWrapper}>
            {museums.map((museum, index) => (
              <div key={index} className={customStyles.slide}>
                <div onClick={() => handleOpenModal(museum)} className={customStyles.slideContent}>
                  {(role === 'TourismGovernor') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the event from bubbling up to the parent
                        if (onDelete) {
                          onDelete(museum._id);
                        }
                      }}
                      className={customStyles.removeButton}
                    >                      <Minus size={16} className="duration-150 group-hover:stroke-black" />
                    </button>
                  )}

                  {/* Image */}
                  <div className={customStyles.imageContainer}>
                  <img src={museum.pictures.length > 0 ? (typeof museum.pictures[0] === 'string' ? museum.pictures[0] : URL.createObjectURL(museum.pictures[0])) : defaultImage} alt={museum.name} className={customStyles.image} />
                  </div>

                  <h3 className={customStyles.slideTitle}>{museum.name}</h3>
                  <p className={customStyles.slideText}>{museum.description}</p>
                  
                  {/* Tags */}
                  <p className={customStyles.slideText}>Tags:</p>
                  {museum.tags.map((tag, i) => (
                    <div key={i} className={customStyles.tagContainer}>
                      <p className={`${customStyles.slideText} font-bold`}><span className="font-normal">{tag}</span></p>
                    </div>
                  ))}

                  <p className={`${customStyles.slideText} font-bold`}>Opening Hours: <span className="font-normal">{museum.opening_hours}</span></p>
                  <p className={`${customStyles.slideText} font-bold`}>Ticket Prices:</p>
                  <p className={customStyles.slideText}>Foreigner: {museum.ticket_prices.foreigner}</p>
                  <p className={customStyles.slideText}>Native: {museum.ticket_prices.native}</p>
                  <p className={customStyles.slideText}>Student: {museum.ticket_prices.student}</p>
                </div>
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
                onSubmit={() => onEdit && onEdit(selectedMuseum)}
                initialData={{
                  _id: selectedMuseum._id,
                  name: selectedMuseum.name,
                  description: selectedMuseum.description,
                  category: selectedMuseum.category,
                  tags: selectedMuseum.tags,
                  location: selectedMuseum.location,
                  pictures: [],
                  ticket_prices: selectedMuseum.ticket_prices,
                  opening_hours: selectedMuseum.opening_hours,

                  // Add an empty array or appropriate initial value for attachments
                }}
              />
               )}
          </div>
        )}
      </Modal>
      

      <Modal ref={AddmodalRef} title="Add Museum">
        <div>
          <MuseumForm addModalRef={AddmodalRef} onSubmit= {onCreate} />
        </div>
      </Modal>
    </div>
  );
};

const customStyles = {
  container: 'h-auto max-h-[85vh] max-w-fit border-2 border-gray-300 pr-14 pt-4 pl-20 pb-10 mx-auto',
  sliderContainer: 'relative',
  sliderContent: 'overflow-hidden',
  sliderWrapper: 'grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto', // Set a max height and make it scrollable
  slide: 'w-[22%] h-[100%] flex-shrink-0 px-2 transition-all duration-600 m-6',
  slideContent: 'h-[40vh] w-[35vh] overflow-auto border-2 border-gray-300 bg-white p-6 relative cursor-pointer',
  slideTitle: 'mb-2 font-bold',
  slideText: 'text-sm',
  removeButton: 'absolute group top-2 right-2 z-10 rounded-full border border-gray-500 bg-background-button p-1 hover:bg-red-600 focus:outline-none duration-150',
  addSlideDiv: 'flex items-center justify-center h-[40vh] w-[35vh] border-2 border-dashed border-gray-300 bg-white cursor-pointer hover:bg-gray-50',
  addSlideIcon: 'text-gray-400 w-16 h-16',
  imageContainer: 'w-full h-[100px] overflow-hidden mb-4', // Container for image with set height
  image: 'w-full h-full object-cover', // Image should cover the container without distortion
  tagContainer: 'flex flex-col gap-2 mt-2',
  editButton: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
  editSection: 'mt-4',
};

export default MuseumList;
