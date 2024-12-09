import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Table, { TableColumn } from "../../../shared/components/Table"; // Assuming the shared Table component exists
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarCheck, Users, XCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
import { getAmadeusToken } from "../../utils/amadeusAuth";
import Button from "@/modules/shared/components/Button";

interface Hotel {
    hotelId: string;
    name: string;
    price: number;
  }

const CITY_CODES = [
  { code: "PAR", name: "Paris" },
  { code: "CAI", name: "Cairo" },
  { code: "BER", name: "Berlin" },
  { code: "AMS", name: "Amsterdam" },
];

export function HotelBookingList() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [bookingDetails, setBookingDetails] = useState({
    hotel: { date: "", time: "", guests: 1 },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cityCode, setCityCode] = useState<string>("PAR");
  const [activeBooking, setActiveBooking] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

// Add the dropdown for selecting the city
<select
  className="mb-4 p-2 border border-gray-300 rounded"
  onChange={(e) => setSelectedCity(e.target.value)}
  value={selectedCity || ""}
>
  <option value="" disabled>
    Select a city
  </option>
  <option value="PAR">Paris (PAR)</option>
  <option value="CAI">Cairo (CAI)</option>
  <option value="BER">Berlin (BER)</option>
  <option value="AMS">Amsterdam (AMS)</option>
</select>


  const handleCityChange = (code: string) => {
    setCityCode(code);
  };

  const handleBooking = (type: string) => {
    setActiveBooking(type);
  };

  const handleInputChange = (
    type: "hotel",
    field: string,
    value: string | number
  ) => {
    setBookingDetails((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const submitBooking = (type: string) => {
    const currentBooking = bookingDetails[type as keyof typeof bookingDetails];
    const requiredFields = Object.values(currentBooking).filter(
      (val) => val === "" || val === 0
    );

    if (requiredFields.length > 0) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success(`Booking ${type} successful!`);
    setActiveBooking(null);
  };

  const renderBookingForm = (type: string) => {
    const commonInputs = (
      <div className="space-y-4">
        <div>
          <Label className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" /> Date
          </Label>
          <Input
            type="date"
            value={bookingDetails[type as keyof typeof bookingDetails].date}
            onChange={(e) =>
              handleInputChange(
                type as "hotel",
                "date",
                e.target.value,
              )
            }
          />
        </div>
        <div>
          <Label className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" /> Time
          </Label>
          <Input
            type="time"
            value={bookingDetails[type as keyof typeof bookingDetails].time}
            onChange={(e) =>
              handleInputChange(
                type as "hotel",
                "time",
                e.target.value,
              )
            }
          />
        </div>
        <div>
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Guests
          </Label>
          <Input
            type="number"
            min="1"
            value={
              bookingDetails[type as keyof typeof bookingDetails].guests
            }
            onChange={(e) =>
              handleInputChange(
                type as "hotel",
                "guests",
                parseInt(e.target.value),
              )
            }
          />
        </div>
      </div>
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative w-full max-w-md rounded-lg bg-white p-8">
          <button
            onClick={() => setActiveBooking(null)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          >
            <XCircle className="h-6 w-6" />
          </button>
          <h2 className="mb-6 text-center text-2xl font-bold capitalize">
            {type} Booking
          </h2>
          {commonInputs}
          <div className="mt-6">
            <Button
              onClick={() => submitBooking(type)}
              className="w-full bg-accent-dark-blue px-8 py-4 text-lg font-bold"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    );
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
  
        // Transform the API response to match the Hotel interface
        const transformedHotels = response.data.data.map((hotel: any) => ({
          hotelId: hotel.hotelId,
          name: hotel.name,
          price: Math.floor(Math.random() * 9) * 100 + 100 
        }));
  
        setHotels(transformedHotels);
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
    { header: "Price", accessor: "price" },
    {
      header: "Actions",
      accessor: "hotelId",
      render: () => (
        <button
          onClick={() => handleBooking("hotel")}
          className="px-4 py-3 text-sm text-white bg-accent-dark-blue font-bold transition-all duration-150 hover:opacity-80"
        >
          Book
        </button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex justify-center mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full max-w-md rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20">
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
      </div>
      {loading && <p className="text-white text-body">Loading hotels...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && hotels.length > 0 && (
        <Table data={hotels} columns={columns} actions={null} />
      )}
      {!loading && !error && hotels.length === 0 && (
        <p>No hotels available for this city</p>
      )}
      {activeBooking && renderBookingForm(activeBooking)}
    </div>
  );
}
