import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Table, {TableColumn } from "../../../shared/components/Table"; // Assuming you have a Table component in shared
import { Label } from "@/components/ui/label";
import { CalendarCheck, Users, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Button from "@/modules/shared/components/Button";
interface Flight {
  flight: { number: string };
  airline: { name: string };
  departure: { timezone: string };
  arrival: { timezone: string };
}
const formatTimezone = (timezone: string) => {
  const [country, city] = timezone.split('/');
  return `${city}, ${country}`;
};
export function FlightBookingList() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [bookingDetails, setBookingDetails] = useState({
    flight: {date: "", time: "", passengers: 1 },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [activeBooking, setActiveBooking] = useState<string | null>(null);
  const handleBooking = (type: string) => {
    setActiveBooking(type);
  };
  const handleInputChange = (
    type: "flight",
    field: string,
    value: string | number,
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
    // Basic validation
    const currentBooking = bookingDetails[type as keyof typeof bookingDetails];
    const requiredFields = Object.values(currentBooking).filter(
      (val) => val === "" || val === 0,
    );

    if (requiredFields.length > 0) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulated booking submission
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
                type as "flight",
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
                type as "flight",
                "time",
                e.target.value,
              )
            }
          />
        </div>
        <div>
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Passengers
          </Label>
          <Input
            type="number"
            min="1"
            value={
              bookingDetails[type as keyof typeof bookingDetails].passengers
            }
            onChange={(e) =>
              handleInputChange(
                type as "flight",
                "passengers",
                parseInt(e.target.value),
              )
            }
          />
        </div>
      </div>
    );
  
    return ( // Return the form JSX here
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
            <Button onClick={() => submitBooking(type)}
              className="w-full bg-accent-dark-blue px-8 py-4 text-lg font-bold">
                Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  const API_KEY = import.meta.env.VITE_AVIATION_STACK_API_KEY;
  const API_URL = `https://api.aviationstack.com/v1/flights`;

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(API_URL, {
        params: {
          access_key: API_KEY,
          limit,
          offset,
        },
      })
      .then((response) => {
        setFlights(response.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch flight data");
        setLoading(false);
      });
  }, [limit, offset]);
  const columns: TableColumn[] = [
    { header: "Flight Number", accessor: "flight.number" },
    { header: "Airline", accessor: "airline.name" },
    { header: "Departure", accessor: "departure.timezone", render: (timezone) => (timezone !== undefined ? formatTimezone(timezone): "N/A"),
    },
    { header: "Arrival", accessor: "arrival.timezone", render: (timezone) => (timezone !== undefined ? formatTimezone(timezone): "N/A") },
    { 
      header: "Price", 
      accessor: "name",
      render: () => (
        <span className="p-5 text-center text-body text-accent-dark-blue">${Math.floor(Math.random() * 9) * 100 + 100 }</span>
      ) 
    },
    {
      header: "Actions",
      accessor: "flight.number",
      render: () => (
        <button
          onClick={() => handleBooking("flight")}
          className="px-4 py-3 text-sm text-white bg-accent-dark-blue font-bold transition-all duration-150 hover:opacity-80"
        >
          Book
        </button>
      ),
    }
  ];
  return (
    <div className="p-4">
      {loading && <p className="text-white text-body">Loading flights...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && flights.length > 0 && (
        <Table data={flights} columns={columns} actions={null} />
      )}
      {!loading && !error && flights.length === 0 && <p>No flights available</p>}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-3 text-sm text-white bg-accent-dark-blue font-bold transition-all duration-150 hover:opacity-80"
          onClick={() => setOffset(Math.max(0, offset - limit))}
          disabled={offset === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-3 text-sm text-white bg-accent-dark-blue font-bold transition-all duration-150 hover:opacity-80"
          onClick={() => setOffset(offset + limit)}
        >
          Next
        </button>
      </div>
      {activeBooking && renderBookingForm(activeBooking)}
    </div>
  );
}
