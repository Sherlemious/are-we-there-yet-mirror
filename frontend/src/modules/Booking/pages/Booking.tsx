import { useState } from "react";
import {
  Car,
  Bus,
  PlaneTakeoff,
  MapPin,
  CalendarCheck,
  Users,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Booking() {
  const [activeBooking, setActiveBooking] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    car: { pickup: "", dropoff: "", date: "", passengers: 1 },
    bus: { from: "", to: "", date: "", passengers: 1 },
    airplane: { from: "", to: "", date: "", passengers: 1 },
  });

  const cardStyle =
    "flex flex-col items-center rounded-lg bg-white/10 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl transition-transform duration-300 hover:transform hover:-translate-y-4";

  const handleBooking = (type: string) => {
    setActiveBooking(type);
  };

  const handleInputChange = (
    type: "car" | "bus" | "airplane",
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
            <MapPin className="h-4 w-4" />
            {type === "car" ? "Pickup Location" : "Departure"}
          </Label>
          <Input
            placeholder={`Enter ${type === "car" ? "pickup" : "departure"} location`}
            value={
              bookingDetails[type as keyof typeof bookingDetails].from ||
              bookingDetails[type as keyof typeof bookingDetails].pickup
            }
            onChange={(e) =>
              handleInputChange(
                type as "car" | "bus" | "airplane",
                type === "car" ? "pickup" : "from",
                e.target.value,
              )
            }
          />
        </div>
        <div>
          <Label className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {type === "car" ? "Drop-off Location" : "Destination"}
          </Label>
          <Input
            placeholder={`Enter ${type === "car" ? "drop-off" : "destination"} location`}
            value={
              bookingDetails[type as keyof typeof bookingDetails].to ||
              bookingDetails[type as keyof typeof bookingDetails].dropoff
            }
            onChange={(e) =>
              handleInputChange(
                type as "car" | "bus" | "airplane",
                type === "car" ? "dropoff" : "to",
                e.target.value,
              )
            }
          />
        </div>
        <div>
          <Label className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" /> Date
          </Label>
          <Input
            type="date"
            value={bookingDetails[type as keyof typeof bookingDetails].date}
            onChange={(e) =>
              handleInputChange(
                type as "car" | "bus" | "airplane",
                "date",
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
                type as "car" | "bus" | "airplane",
                "passengers",
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
            <Button onClick={() => submitBooking(type)} className="w-full">
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    );
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
            onClick={() => handleBooking("car")}
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
            onClick={() => handleBooking("bus")}
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
            onClick={() => handleBooking("airplane")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-400"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Forms */}
      {activeBooking && renderBookingForm(activeBooking)}
    </div>
  );
}
