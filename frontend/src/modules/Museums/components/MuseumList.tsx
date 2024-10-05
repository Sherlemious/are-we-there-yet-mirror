import React from 'react';
import { Museum } from '../types/museum';
import { Minus, Plus } from 'lucide-react';

interface MuseumListProps {
  museums: Museum[]; // All museums
  role: 'tourismGovernor'; // Define user roles
  onEdit?: (museum: Museum) => void; // Tourist/Guest functionality
  onDelete?: (museumId: string) => void; // Tourist/Guest functionality
}

const MuseumList: React.FC<MuseumListProps> = ({ museums, role, onDelete }) => {
  // const [searchQuery, setSearchQuery] = useState(''); // State for search input
  // const [minPrice, setMinPrice] = useState<number | ''>(''); // State for minimum price filter
  // const [maxPrice, setMaxPrice] = useState<number | ''>(''); // State for maximum price filter
  // const [minPriceNative, setMinPriceNative] = useState<number | ''>(''); // State for minimum price filter
  // const [maxPriceNative, setMaxPriceNative] = useState<number | ''>(''); // State for maximum price filter
  // const [minPriceStudent, setMinPriceStudent] = useState<number | ''>(''); // State for minimum price filter
  // const [maxPriceStudent, setMaxPriceStudent] = useState<number | ''>(''); // State for maximum price filter

  // // Filter museums by search query and price
  // const filteredMuseums = museums.filter((museum) => {
  //   const matchesSearch = museum.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesPrice =
  //     (minPrice === '' || museum.ticket_prices.foreigner >= minPrice) && (maxPrice === '' || museum.ticket_prices.foreigner <= maxPrice) &&
  //     (minPriceStudent === '' || museum.ticket_prices.student >= minPriceStudent) && (maxPriceStudent === '' || museum.ticket_prices.student <= maxPriceStudent) &&
  //     (minPriceNative === '' || museum.ticket_prices.native >= minPriceNative) && (maxPriceNative === '' || museum.ticket_prices.native <= maxPriceNative);

  //   return matchesSearch && matchesPrice;
  // });

  return (
    <div className={customStyles.container}>
      {/* Search and Filter Controls */}
      {/* <div className={customStyles.filterContainer}> */} {/* Your existing filter controls */} {/* </div> */}

      {/* Museum List */}
      <div className={customStyles.sliderContainer}>
        <div className={customStyles.sliderContent}>
          <div className={customStyles.sliderWrapper}>
            {museums.map((museum, index) => (
              <div key={index} className={customStyles.slide}>
                <div className={customStyles.slideContent}>
                  {(role === 'tourismGovernor') && (
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
            {(
              <div className={customStyles.slide}>
                <div className={customStyles.addSlideDiv}>
                  <Plus className={customStyles.addSlideIcon} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const customStyles = {
  container: 'h-auto max-h-[85vh] max-w-fit border-2 border-gray-300 pr-14 pt-4 pl-20 pb-10 mx-auto',
  filterContainer: 'flex items-center justify-between gap-4',
  searchBar: 'px-4 py-2 border border-gray-300 rounded-lg w-[200px]',
  priceFilters: 'flex gap-4',
  priceInput: 'px-4 py-2 border border-gray-300 rounded-lg w-[50%]',
  sliderContainer: 'relative',
  sliderContent: 'overflow-hidden',
  sliderWrapper: 'grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto', // Set a max height and make it scrollable
  slide: 'w-[22%] h-[100%] flex-shrink-0 px-2 transition-all duration-600 m-6',
  slideContent: 'h-[40vh] w-[35vh] overflow-auto border-2 border-gray-300 bg-white p-6 relative cursor-pointer',
  slideTitle: 'mb-2 font-bold',
  slideText: 'text-sm',
  navButton: 'absolute top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition-all hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-black',
  removeButton: 'absolute group top-2 right-2 z-10 rounded-full border border-gray-500 bg-background-button p-1 hover:bg-red-600 focus:outline-none duration-150',
  addSlideDiv: 'flex items-center justify-center h-[40vh] w-[35vh] border-2 border-dashed border-gray-300 bg-white cursor-pointer hover:bg-gray-50',
  addSlideIcon: 'text-gray-400 w-16 h-16',
  navigationButtons: 'flex justify-between mt-4',
  endBeginButton: 'px-4 py-2 rounded hover:opacity-70 focus:outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed',
  imageContainer: 'w-full h-[200px] overflow-hidden mb-4', // Container for image with set height
  image: 'w-full h-full object-cover', // Image should cover the container without distortion
  imageGallery: 'flex gap-2', // Flex container for images
  tagContainer: 'flex flex-col gap-2 mt-2', // Updated to flex column
};

export default MuseumList;
