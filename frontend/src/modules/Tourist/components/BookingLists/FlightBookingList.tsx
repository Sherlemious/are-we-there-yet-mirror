import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Table, { ActionProps, TableColumn } from "../../../shared/components/Table"; // Assuming you have a Table component in shared
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const API_KEY = "6526f0a2e065171b9fdf01f516e2735f"; // Replace with your API key
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

  const handleBookFlight = (flightNumber: string) => {
    toast.success(`Flight ${flightNumber} has been booked!`);
  };
  const columns: TableColumn[] = [
    { header: "Name", accessor: "flight.number" },
    { header: "Airline", accessor: "airline.name" },
    { header: "Departure", accessor: "departure.timezone", render: (timezone) => (timezone !== undefined ? formatTimezone(timezone): "N/A"),
    },
    { header: "Arrival", accessor: "arrival.timezone", render: (timezone) => (timezone !== undefined ? formatTimezone(timezone): "N/A") },
    {
      header: "Actions",
      accessor: "flight.number",
      render: (number: string) => (
        <button
          onClick={() => handleBookFlight(number)}
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
        // <table className="w-full border-collapse border border-gray-300">
        //   <thead>
        //     <tr>
        //       <th className="border border-gray-300 p-2">Flight Number</th>
        //       <th className="border border-gray-300 p-2">Airline</th>
        //       <th className="border border-gray-300 p-2">Departure Timezone</th>
        //       <th className="border border-gray-300 p-2">Arrival Timezone</th>
        //       <th className="border border-gray-300 p-2">Action</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {flights.map((flight, index) => (
        //       <tr key={index}>
        //         <td className="border border-gray-300 p-2">
        //           {flight.flight.number}
        //         </td>
        //         <td className="border border-gray-300 p-2">
        //           {flight.airline.name}
        //         </td>
        //         <td className="border border-gray-300 p-2">
        //           {flight.departure.timezone}
        //         </td>
        //         <td className="border border-gray-300 p-2">
        //           {flight.arrival.timezone}
        //         </td>
        //         <td className="border border-gray-300 p-2 text-center">
        //           <button
        //             className="bg-green-500 text-white px-3 py-1 rounded"
        //             onClick={() => handleBookFlight(flight.flight.number)}
        //           >
        //             Book
        //           </button>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
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
    </div>
  );
}
