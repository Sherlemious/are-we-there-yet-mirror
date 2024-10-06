import { useState, useEffect } from 'react';

// data
interface Museum {
  name: string;
  tags: string[];
  description: string;
  category: string;
  pictures: string[];
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  opening_hours: string;
  ticket_prices: {
    foreigner: number;
    native: number;
    student: number;
  };
  created_by: string;
  modified_by: string;
}
const data: Museum[] = [
  {
    name: 'National Art Gallery',
    tags: ['64db0f774b5e3f6dc2b9c1a1'],
    description: 'A gallery showcasing national art pieces from various artists.A gallery showcasing national art pieces from various artists.A gallery showcasing national art pieces from various artists.A gallery showcasing national art pieces from various artists.A gallery showcasing national art pieces from various artists.A gallery showcasing national art pieces from various artists.A gallery showcasing national art pieces from various artists.A gallery showcasing national art pieces from various artists.',
    category: 'Art',
    pictures: ['64db0f774b5e3f6dc2b9c1b2'],
    location: {
      name: '123 Art St, Cityville',
      latitude: 40.712776,
      longitude: -74.005974,
    },
    opening_hours: '9:00 AM - 5:00 PM',
    ticket_prices: {
      foreigner: 20,
      native: 10,
      student: 5,
    },
    created_by: '64db0f774b5e3f6dc2b9c1c3',
    modified_by: '64db0f774b5e3f6dc2b9c1c3',
  },
  {
    name: 'History Museum of Cityville',
    tags: ['64db0f774b5e3f6dc2b9c1a2', '64db0f774b5e3f6dc2b9c1a3'],
    description: 'Exploring the rich history of Cityville.',
    category: 'History',
    pictures: ['64db0f774b5e3f6dc2b9c1b3', '64db0f774b5e3f6dc2b9c1b4'],
    location: {
      name: '456 History Lane, Cityville',
      latitude: 40.712345,
      longitude: -74.004567,
    },
    opening_hours: '10:00 AM - 6:00 PM',
    ticket_prices: {
      foreigner: 25,
      native: 15,
      student: 8,
    },
    created_by: '64db0f774b5e3f6dc2b9c1c4',
    modified_by: '64db0f774b5e3f6dc2b9c1c5',
  },
  {
    name: 'Science Discovery Center',
    tags: ['64db0f774b5e3f6dc2b9c1a4'],
    description: 'A museum dedicated to interactive science exhibits for all ages.',
    category: 'Science',
    pictures: ['64db0f774b5e3f6dc2b9c1b5'],
    location: {
      name: '789 Science Ave, Cityville',
      latitude: 40.713678,
      longitude: -74.006789,
    },
    opening_hours: '9:00 AM - 7:00 PM',
    ticket_prices: {
      foreigner: 30,
      native: 20,
      student: 10,
    },
    created_by: '64db0f774b5e3f6dc2b9c1c6',
    modified_by: '64db0f774b5e3f6dc2b9c1c6',
  },
  {
    name: "Children's Exploration Museum",
    tags: ['64db0f774b5e3f6dc2b9c1a5'],
    description: 'An interactive museum designed for children to learn and play.',
    category: 'Children',
    pictures: ['64db0f774b5e3f6dc2b9c1b6'],
    location: {
      name: '101 Kids Road, Cityville',
      latitude: 40.714123,
      longitude: -74.00789,
    },
    opening_hours: '10:00 AM - 4:00 PM',
    ticket_prices: {
      foreigner: 15,
      native: 8,
      student: 5,
    },
    created_by: '64db0f774b5e3f6dc2b9c1c7',
    modified_by: '64db0f774b5e3f6dc2b9c1c8',
  },
  {
    name: 'Museum of Modern Culture',
    tags: ['64db0f774b5e3f6dc2b9c1a6', '64db0f774b5e3f6dc2b9c1a7'],
    description: 'Celebrating contemporary culture and lifestyles.',
    category: 'Culture',
    pictures: ['64db0f774b5e3f6dc2b9c1b7', '64db0f774b5e3f6dc2b9c1b8'],
    location: {
      name: '202 Modern St, Cityville',
      latitude: 40.715678,
      longitude: -74.008901,
    },
    opening_hours: '11:00 AM - 8:00 PM',
    ticket_prices: {
      foreigner: 18,
      native: 10,
      student: 6,
    },
    created_by: '64db0f774b5e3f6dc2b9c1c9',
    modified_by: '64db0f774b5e3f6dc2b9c1ca',
  },
  {
    name: 'Ancient History Museum',
    tags: ['64db0f774b5e3f6dc2b9c1a8'],
    description: 'Explore artifacts from ancient civilizations across the world.',
    category: 'History',
    pictures: ['64db0f774b5e3f6dc2b9c1b9'],
    location: {
      name: '303 Ancient Ave, Cityville',
      latitude: 40.716123,
      longitude: -74.009123,
    },
    opening_hours: '10:00 AM - 5:00 PM',
    ticket_prices: {
      foreigner: 22,
      native: 12,
      student: 7,
    },
    created_by: '64db0f774b5e3f6dc2b9c1cb',
    modified_by: '64db0f774b5e3f6dc2b9c1cb',
  },
  {
    name: 'Cityville Natural History Museum',
    tags: ['64db0f774b5e3f6dc2b9c1a9'],
    description: 'Learn about the natural history of Cityville and its surroundings.',
    category: 'Natural History',
    pictures: ['64db0f774b5e3f6dc2b9c1ba'],
    location: {
      name: '404 Nature Blvd, Cityville',
      latitude: 40.717345,
      longitude: -74.010234,
    },
    opening_hours: '9:00 AM - 6:00 PM',
    ticket_prices: {
      foreigner: 25,
      native: 14,
      student: 10,
    },
    created_by: '64db0f774b5e3f6dc2b9c1cc',
    modified_by: '64db0f774b5e3f6dc2b9c1cc',
  },
  {
    name: 'Railroad Heritage Museum',
    tags: ['64db0f774b5e3f6dc2b9c1aa'],
    description: 'Experience the evolution of railway transportation.',
    category: 'Transportation',
    pictures: ['64db0f774b5e3f6dc2b9c1bb'],
    location: {
      name: '505 Rails St, Cityville',
      latitude: 40.718456,
      longitude: -74.011345,
    },
    opening_hours: '10:00 AM - 5:30 PM',
    ticket_prices: {
      foreigner: 15,
      native: 10,
      student: 5,
    },
    created_by: '64db0f774b5e3f6dc2b9c1cd',
    modified_by: '64db0f774b5e3f6dc2b9c1cd',
  },
  {
    name: 'Aviation and Space Museum',
    tags: ['64db0f774b5e3f6dc2b9c1ab'],
    description: 'A tribute to the evolution of aviation and space travel.',
    category: 'Science',
    pictures: ['64db0f774b5e3f6dc2b9c1bc'],
    location: {
      name: '606 Skyway St, Cityville',
      latitude: 40.719567,
      longitude: -74.012456,
    },
    opening_hours: '11:00 AM - 6:00 PM',
    ticket_prices: {
      foreigner: 20,
      native: 15,
      student: 10,
    },
    created_by: '64db0f774b5e3f6dc2b9c1ce',
    modified_by: '64db0f774b5e3f6dc2b9c1ce',
  },
];

// helper functions
const formatLocation = (location: string) => {
  const maxLength = 5 * 4;
  if (location.length > maxLength) {
    return `${location.substring(0, maxLength)}...`;
  }
  return location;
};
const formatDescription = (description: string) => {
  const maxLength = 5 * 15 * 4;
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`;
  }
  return description;
}

// main components
function MuseumModal({ Museum, onClose }: { Museum: Museum; onClose: () => void }) {
  // states for the animation
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // handle the close button
  useEffect(() => {
    // Trigger opening animation when component mounts
    setIsVisible(true);
  }, []);

  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300); // Match timeout to the animation duration
  };

  // Animation styles
  const modalOverlayStyle = {
    transition: 'opacity 0.3s ease-in-out',
    opacity: isVisible && !isClosing ? 1 : 0,
  };

  const modalContentStyle = {
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    transform: isVisible && !isClosing ? 'scale(1)' : 'scale(0.95)',
    opacity: isVisible && !isClosing ? 1 : 0,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={modalOverlayStyle}>
      <div className="w-full max-w-[80vw] h-auto border-black border-2 bg-white p-4 relative" style={modalContentStyle}>
        {/* Close button */}
        <button onClick={handleModalClose} className="absolute top-2 right-2 text-xl font-bold m-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div>
          {/* Museum name */}
          <div className="text-left font-bold text-xl w-fit my-8 mx-4">
            {Museum.name}
            {/* add an underline */}
            <div className="border-b-2 border-black"></div>
          </div>
          {/* Museum details */}
          <div className="grid grid-cols-[70%_30%] gap-8 mx-8 mb-8 px-8">
            {/* Museum info */}
            <div className="col-start-1 col-end-1 grid grid-rows-auto gap-4 grid-cols-2">
              {/* tags */}
              <div>
                <div className="text-left font-bold">Tags</div>
                <div className="">{Museum.tags.join(', ')}</div>
              </div>

              {/* description */}
              <div>
                <div className="text-left font-bold">Description</div>
                <div className="">{formatDescription(Museum.description)}</div>
              </div>

              {/* category */}
              <div>
                <div className="text-left font-bold">Category</div>
                <div className="">{Museum.category}</div>
              </div>

              {/* location */}
              <div>
                <div className="text-left font-bold">Location</div>
                <div className="">{formatLocation(Museum.location.name)}</div>
              </div>

              {/* opening hours */}
              <div>
                <div className="text-left font-bold">Opening Hours</div>
                <div className="">{Museum.opening_hours}</div>
              </div>

              {/* ticket prices */}
              <div>
                <div className="text-left font-bold">Ticket Prices</div>
                <table className="border-collapse border border-black">
                  <tr className="border border-b-2">
                    <th className="p-2">Foreigner</th>
                    <th className="p-2">Native</th>
                    <th className="p-2">Student</th>
                  </tr>
                  <tr className="border border-b-2">
                    <td>{Museum.ticket_prices.foreigner}</td>
                    <td>{Museum.ticket_prices.native}</td>
                    <td>{Museum.ticket_prices.student}</td>
                  </tr>
                </table>
              </div>
            </div>
            {/* Museum picture */}
            <img src={Museum.pictures[0]} className="w-full h-auto col-start-2 col-end-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MuseumCard({ Museum, onCardClick }: { Museum: Museum; onCardClick: () => void }) {
  return (
    <div className="w-full h-full border-black border-2 p-4" onClick={onCardClick}>
      {/* Museum picture */}
      <img src={Museum.pictures[0]} className="w-1/2 h-auto mb-8" />
      {/* Museum name */}
      <div className="text-left font-bold">{Museum.name}</div>
      {/* Museum description */}
      <div className="">{formatDescription(Museum.description)}</div>
    </div>
  );
}

export function MuseumList() {
  const [selectedMuseum, setSelectedMuseum] = useState<Museum | null>(null);
  const handleCardClick = (Museum: Museum) => {
    setSelectedMuseum(Museum);
  };
  const handleCloseModal = () => {
    setSelectedMuseum(null);
  };

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-auto gap-8 p-8">
        {data.map((Museum, index) => (
          <MuseumCard Museum={Museum} key={index} onCardClick={() => handleCardClick(Museum)} />
        ))}
      </div>
      {selectedMuseum && <MuseumModal Museum={selectedMuseum} onClose={handleCloseModal} />}
    </>
  )
}
