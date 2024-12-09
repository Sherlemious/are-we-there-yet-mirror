import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Table, { TableColumn } from "../../../shared/components/Table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getAmadeusToken } from "../../utils/amadeusAuth";

interface Hotel {
  hotelId: string;
  name: string;
  rating: number | string;
}

const CITY_CODES = [
  { code: "PAR", name: "Paris" },
  { code: "CAI", name: "Cairo" },
  { code: "BER", name: "Berlin" },
  { code: "AMS", name: "Amsterdam" },
];

export function HotelBookingList() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cityCode, setCityCode] = useState<string>("PAR");

  const handleCityChange = (code: string) => {
    setCityCode(code);
  };

  useEffect(() => {
    const fetchHotelsData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = await getAmadeusToken();
        const API_URL = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city`;

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            cityCode,
          },
        });

        const hotelsData = response.data.data.map((hotel: any) => ({
          hotelId: hotel.hotelId,
          name: hotel.name,
          rating: hotel.rating || "N/A",
        }));

        setHotels(hotelsData);
      } catch (error) {
        setError("Failed to fetch hotel data");
      } finally {
        setLoading(false);
      }
    };

    if (cityCode) {
      fetchHotelsData();
    }
  }, [cityCode]);

  const columns: TableColumn[] = [
    { header: "Hotel ID", accessor: "hotelId" },
    { header: "Name", accessor: "name" },
    { header: "Rating", accessor: "rating" },
    {
      header: "Actions",
      accessor: "hotelId",
      render: () => (
        <button className="px-4 py-2 text-sm text-white bg-accent-dark-blue font-bold hover:opacity-80">
          Book
        </button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-4 py-2 border rounded">
              {CITY_CODES.find((city) => city.code === cityCode)?.name || "Select a City"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {CITY_CODES.map((city) => (
              <DropdownMenuItem
                key={city.code}
                onClick={() => handleCityChange(city.code)}
              >
                {city.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {loading && <p>Loading hotels...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && hotels.length > 0 && (
        <Table data={hotels} columns={columns} />
      )}
      {!loading && !error && hotels.length === 0 && <p>No hotels available for this city</p>}
    </div>
  );
}
