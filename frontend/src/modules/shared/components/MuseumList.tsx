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
}

function useGetMuseums() {
  // init the states
  const [data, setData] = useState<Museum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // fetch the data
  useEffect(() => {
    const runner = async () => {
      // init the url
      const baseUrl = 'https://are-we-there-yet-mirror.onrender.com/api';
      const url = `${baseUrl}/museums/getall`;

      // main logic
      try {
        // fetch the data
        const response = await fetch(url, {
          method: 'GET',
        });

        // check if the response is ok
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // parse the response
        const parsedData = await response.json();

        // format the data
        const tempData: Museum[] = await parsedData.data.museums.map((item) => {
          const name = item.name ?? 'N/A';

          let tags = item.tags ?? [];
          tags = tags.map((tag) => tag.name ?? 'N/A');

          const description = item.description ?? 'N/A';
          const category = item.category ?? 'N/A';
          const pictures = item.pictures ?? [];
          const location = {
            name: item.location.name ?? 'N/A',
            latitude: item.location.latitude ?? 0,
            longitude: item.location.longitude ?? 0,
          };
          const opening_hours = item.opening_hours ?? 'N/A';
          const ticket_prices = {
            foreigner: item.ticket_prices.foreigner ?? 0,
            native: item.ticket_prices.native ?? 0,
            student: item.ticket_prices.student ?? 0,
          };

          return {
            name,
            tags,
            description,
            category,
            pictures,
            location,
            opening_hours,
            ticket_prices,
          };
        });

        // set the data
        setData(tempData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // run the function
    runner();
  }, []);

  return { data, loading, error };
}

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
};

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
                <div className="">{Museum.tags.length === 0 ? 'N/A' : Museum.tags.join(', ')}</div>
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
                  <thead>
                    <tr className="border border-b-2">
                      <th className="p-2">Foreigner</th>
                      <th className="p-2">Native</th>
                      <th className="p-2">Student</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-b-2">
                      <td>{Museum.ticket_prices.foreigner}</td>
                      <td>{Museum.ticket_prices.native}</td>
                      <td>{Museum.ticket_prices.student}</td>
                    </tr>
                  </tbody>
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

  // get the data
  const { data, loading, error } = useGetMuseums();
  console.log(data);

  // handle the search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Activity[]>([]);
  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        const matchesSearchQuery =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearchQuery;
      })
    );
  }, [searchQuery, data]);

  return (
    <>
      {loading && <div className="text-center text-2xl font-bold">Loading...</div>}
      {error && <div className="text-center text-2xl font-bold">{error}</div>}
      {!loading && !error && (
        <>
          {/* tool bar */}
          <div className="p-4 grid grid-cols-2 gap-8">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-full border-black border-2 p-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="border-black border-2 p-4"></div>
          </div>
          {/* body */}
          <div className="grid grid-cols-3 grid-rows-auto gap-8 p-8">
            {filteredData.map((Museum, index) => (
              <MuseumCard Museum={Museum} key={index} onCardClick={() => handleCardClick(Museum)} />
            ))}
          </div>
          {/* modal */}
          {selectedMuseum && <MuseumModal Museum={selectedMuseum} onClose={handleCloseModal} />}
        </>
      )}
    </>
  );
}
