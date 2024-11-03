import axiosInstance from "../services/axiosInstance";
import { useState, useEffect } from "react";

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

async function getMuseums() {
  try {
    // fetch the data
    const response = await axiosInstance.get("/museums/getall");

    // format the data
    const tempData: Museum[] = await response.data.data.museums.map(
      (item: any) => {
        const name = item.name ?? "N/A";

        let tags = item.tags ?? [];
        tags = tags.map((tag: any) => tag.name ?? "N/A");

        const description = item.description ?? "N/A";
        const category = item.category ?? "N/A";
        const pictures = item.pictures ?? [];
        const location = {
          name: item.location.name ?? "N/A",
          latitude: item.location.latitude ?? 0,
          longitude: item.location.longitude ?? 0,
        };
        const opening_hours = item.opening_hours ?? "N/A";
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
      },
    );
    return await tempData;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
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

function getAllTags(data: Museum[]) {
  let tags: string[] = [];
  data?.forEach((item) => {
    tags = [...tags, ...item.tags];
  });
  return [...new Set(tags)];
}

// main components
function MuseumModal({
  Museum,
  onClose,
}: {
  Museum: Museum;
  onClose: () => void;
}) {
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
    transition: "opacity 0.3s ease-in-out",
    opacity: isVisible && !isClosing ? 1 : 0,
  };

  const modalContentStyle = {
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
    transform: isVisible && !isClosing ? "scale(1)" : "scale(0.95)",
    opacity: isVisible && !isClosing ? 1 : 0,
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={modalOverlayStyle}
    >
      <div
        className="relative h-auto w-full max-w-[80vw] border-2 border-black bg-white p-4"
        style={modalContentStyle}
      >
        {/* Close button */}
        <button
          onClick={handleModalClose}
          className="absolute right-2 top-2 m-4 text-xl font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div>
          {/* Museum name */}
          <div className="mx-4 my-8 w-fit text-left text-xl font-bold">
            {Museum.name}
            {/* add an underline */}
            <div className="border-b-2 border-black"></div>
          </div>
          {/* Museum details */}
          <div className="mx-8 mb-8 grid grid-cols-[70%_30%] gap-8 px-8">
            {/* Museum info */}
            <div className="grid-rows-auto col-start-1 col-end-1 grid grid-cols-2 gap-4">
              {/* tags */}
              <div>
                <div className="text-left font-bold">Tags</div>
                <div className="">
                  {Museum.tags.length === 0 ? "N/A" : Museum.tags.join(", ")}
                </div>
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
            <img
              src={Museum.pictures[0]}
              className="col-start-2 col-end-2 h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MuseumCard({
  Museum,
  onCardClick,
}: {
  Museum: Museum;
  onCardClick: () => void;
}) {
  return (
    <div
      className="h-full w-full border-2 border-black p-4"
      onClick={onCardClick}
    >
      {/* Museum picture */}
      <img src={Museum.pictures[0]} className="mb-8 h-auto w-1/2" />
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
  const [ data, setData ] = useState<Museum[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    getMuseums()
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // handle the search and filter
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [allTags, setAllTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const [filteredData, setFilteredData] = useState<Activity[]>([]);

  // get all the tags
  useEffect(() => {
    setAllTags(getAllTags(data));
  }, [data]);

  useEffect(() => {
    setFilteredData(
      data?.filter((item) => {
        // handle the search
        const matchesSearchQuery =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          );

        // handle then the tags
        const matchesTag = tag === "" || item.tags.includes(tag);

        return matchesSearchQuery && matchesTag;
      }),
    );
  }, [searchQuery, tag, data]);

  return (
    <>
      {loading && (
        <div className="text-center text-2xl font-bold">Loading...</div>
      )}
      {error && <div className="text-center text-2xl font-bold">{error}</div>}
      {!loading && !error && (
        <>
          {/* tool bar */}
          <div className="grid grid-cols-2 gap-8 p-4">
            <input
              type="text"
              placeholder="Search"
              className="h-full w-full border-2 border-black p-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="grid h-full w-full grid-cols-[90%_10%] justify-between border-2 border-black p-4">
              <select
                className="h-full w-full px-2"
                style={{ appearance: "none" }}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="">All Tags</option>
                {allTags?.map((tag, index) => (
                  <option value={tag} key={index}>
                    {tag}
                  </option>
                ))}
              </select>
              {/* dropdown icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 place-self-center"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {/* body */}
          <div className="grid-rows-auto grid grid-cols-3 gap-8 p-8">
            {filteredData?.map((Museum, index) => (
              <MuseumCard
                Museum={Museum}
                key={index}
                onCardClick={() => handleCardClick(Museum)}
              />
            ))}
          </div>
          {/* modal */}
          {selectedMuseum && (
            <MuseumModal Museum={selectedMuseum} onClose={handleCloseModal} />
          )}
        </>
      )}
    </>
  );
}
