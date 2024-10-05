import React from 'react';
import { Museum } from '../types/museum';
import { Minus, Plus } from 'lucide-react';

interface MuseumListProps {
  museums: Museum[]; // All museums
  role: 'TourismGovernor'; // Define user roles
  onEdit?: (museum: Museum) => void; // Tourist/Guest functionality
  onDelete?: (museumId: string) => void; // Tourist/Guest functionality
  onAddMuseum?: () => void; // Function to toggle form visibility
}

const MuseumList: React.FC<MuseumListProps> = ({ museums, role, onDelete, onAddMuseum }) => {


  return (
    <div className={customStyles.container}>
      {/* Museum List */}
      <div className={customStyles.sliderContainer}>
        <div className={customStyles.sliderContent}>
          <div className={customStyles.sliderWrapper}>
            {museums.map((museum, index) => (
              <div key={index} className={customStyles.slide}>
                <div className={customStyles.slideContent}>
                  {(role === 'TourismGovernor') && (
                    <button onClick={() => onDelete && onDelete(museum._id)} className={customStyles.removeButton}>
                      <Minus size={16} className="duration-150 group-hover:stroke-black" />
                    </button>
                  )}

                  {/* Image */}
                  <div className={customStyles.imageContainer}>
                    <img src={museum.pictures[0]} alt={museum.name} className={customStyles.image} />
                  </div>

                  <h3 className={customStyles.slideTitle}>{museum.name}</h3>
                  <p className={customStyles.slideText}>{museum.description}</p>
                  
                  {/* Tags */}
                  <p className={customStyles.slideText}>Tags:</p>
                  {museum.tags.map((tag, i) => (
                    <div key={i} className={customStyles.tagContainer}>
                      <p className={`${customStyles.slideText} font-bold`}>Name: <span className="font-normal">{tag.name}</span></p>
                      <p className={`${customStyles.slideText} font-bold`}>Historical Period: <span className="font-normal">{tag.historical_period}</span></p>
                      <p className={`${customStyles.slideText} font-bold`}>Type: <span className="font-normal">{tag.type}</span></p>
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
              <div className={customStyles.addSlideDiv} onClick={onAddMuseum}>
                <Plus className={customStyles.addSlideIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
  tagContainer: 'flex flex-col gap-2 mt-2', // Updated to flex column
};

export default MuseumList;
