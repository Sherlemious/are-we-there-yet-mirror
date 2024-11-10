import { Car, Bus, PlaneTakeoff } from "lucide-react";
import toast from "react-hot-toast";

export default function Booking() {
  const cardStyle =
    "flex flex-col items-center rounded-lg bg-white/10 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl transition-transform duration-300 hover:transform hover:-translate-y-4";
  const handleBooking = (type: string) => {
    toast.success(`Booking ${type} successful!`);
  };
  return (
    <div className="mx-8 my-16 flex h-full min-h-[75vh] flex-col items-center justify-center rounded-lg bg-black/60 backdrop-blur-md">
      {/* title */}
      <div className="font-heading mb-8 mt-2 text-left text-4xl font-bold text-blue-500">
        Transportation Booking
      </div>
      {/* options */}
      <div className="grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 md:grid-cols-3">
        {/* Car Option */}
        <div className={cardStyle}>
          <div className="flex flex-col items-center gap-16">
            <Car className="h-36 w-36 transform-gpu text-gray-400 transition-all duration-300 hover:rotate-6 hover:scale-110 hover:text-blue-500" />
            <div className="mb-4 text-xl font-semibold text-gray-100">Car</div>
          </div>
          <div className="mb-6 text-gray-400">
            Comfortable ride for short to medium trips.
          </div>
          <button
            onClick={() => handleBooking("Car")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-400"
          >
            Book Now
          </button>
        </div>

        {/* Bus Option */}
        <div className={cardStyle}>
          <div className="flex flex-col items-center gap-16">
            <Bus className="h-36 w-36 transform-gpu text-gray-400 transition-all duration-300 hover:rotate-6 hover:scale-110 hover:text-blue-500" />
            <div className="mb-4 text-xl font-semibold text-gray-400">Bus</div>
          </div>
          <div className="mb-6 text-gray-400">
            Ideal for group travel at an affordable price.
          </div>
          <button
            onClick={() => handleBooking("Bus")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-400"
          >
            Book Now
          </button>
        </div>

        {/* Airplane Option */}
        <div className={cardStyle}>
          <div className="flex flex-col items-center gap-16">
            <PlaneTakeoff className="h-36 w-36 transform-gpu text-gray-400 transition-all duration-300 hover:rotate-6 hover:scale-110 hover:text-blue-500" />
            <div className="mb-4 text-xl font-semibold text-gray-400">
              Airplane
            </div>
          </div>
          <div className="mb-6 text-gray-400">
            Fastest option for long-distance travel.
          </div>
          <button
            onClick={() => handleBooking("Airplane")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-400"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
