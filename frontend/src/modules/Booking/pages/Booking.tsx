import React, { useState, useRef } from "react";
import {
  Car,
  Bus,
  TrainFront,
  MapPin,
  CalendarCheck,
  Users,
  XCircle,
  LocateFixed,
} from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Map, { Location } from "../../shared/components/Map"; // Import the Map component

export default function Booking() {
  const [activeBooking, setActiveBooking] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    car: { pickup: "", dropoff: "", date: "", time: "", passengers: 1 },
    bus: { from: "", to: "", date: "", time: "", passengers: 1 },
    train: { from: "", to: "", date: "", time: "", passengers: 1 },
  });
  const [selectedLocation, setSelectedLocation] = useState<{
    type: string;
    field: string;
  } | null>(null);

  const cardStyle =
    "flex flex-col items-center rounded-lg bg-white/10 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl transition-transform duration-300 hover:transform hover:-translate-y-4";

  const handleBooking = (type: string) => {
    setActiveBooking(type);
  };

  const handleInputChange = (
    type: "car" | "bus" | "train",
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

  const handleLocationSelect = (location: Location) => {
    if (selectedLocation) {
      handleInputChange(
        selectedLocation.type as "car" | "bus" | "train",
        selectedLocation.field,
        location.name
      );
      setSelectedLocation(null);
    }
  };

  const openLocationMap = (
    type: "car" | "bus" | "train",
    field: string
  ) => {
    setSelectedLocation({ type, field });
  };

  const fetchLocation = async (
    type: "car" | "bus" | "train",
    field: string
  ) => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        const location =
          data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        handleInputChange(type, field, location);
      },
      () => {
        toast.error("Unable to retrieve your location.");
      }
    );
  };

  const renderLocationInput = (
    type: "car" | "bus" | "train",
    field: string,
    placeholder: string
  ) => (
    <div className="flex items-center gap-2">
      <Input
        placeholder={placeholder}
        value={bookingDetails[type][field] || ""}
        onClick={() => openLocationMap(type, field)}
        readOnly
        className="cursor-pointer"
      />
      <button
        type="button"
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-400"
        onClick={() => fetchLocation(type, field)}
      >
        <LocateFixed size={20} />
      </button>
    </div>
  );

  const submitBooking = (type: string) => {
    const currentBooking = bookingDetails[type as keyof typeof bookingDetails];
    const requiredFields = Object.values(currentBooking).filter(
      (val) => val === "" || val === 0
    );

    if (requiredFields.length > 0) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success(`Booking ${type} successful!`);
    setActiveBooking(null);
  };

  const renderBookingForm = (type: string) => (
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
        <div className="space-y-4">
          {renderLocationInput(type as "car" | "bus" | "train", "pickup", "Enter pickup location")}
          {renderLocationInput(type as "car" | "bus" | "train", "dropoff", "Enter drop-off location")}
          <div>
            <Label className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4" /> Date
            </Label>
            <Input
              type="date"
              value={bookingDetails[type as keyof typeof bookingDetails].date}
              onChange={(e) =>
                handleInputChange(type as "car" | "bus" | "train", "date", e.target.value)
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
                handleInputChange(type as "car" | "bus" | "train", "time", e.target.value)
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
              value={bookingDetails[type as keyof typeof bookingDetails].passengers}
              onChange={(e) =>
                handleInputChange(
                  type as "car" | "bus" | "train",
                  "passengers",
                  parseInt(e.target.value)
                )
              }
            />
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={() => submitBooking(type)} className="w-full">
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );

  const renderLocationMap = () => {
    if (!selectedLocation) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative w-full max-w-xl rounded-lg bg-white p-8">
          <button
            onClick={() => setSelectedLocation(null)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          >
            <XCircle className="h-6 w-6" />
          </button>
          <h2 className="mb-6 text-center text-2xl font-bold capitalize">
            Select Location
          </h2>
          <div className="h-96">
            <Map
              className="h-full w-full"
              onChange={handleLocationSelect}
            />
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

        {/* Train Option */}
        <div className={cardStyle}>
          <div className="flex flex-col items-center gap-16">
            <TrainFront  className="h-36 w-36 transform-gpu text-gray-400 transition-all duration-300 hover:rotate-6 hover:scale-110 hover:text-blue-500" />
            <div className="mb-4 text-xl font-semibold text-gray-400">
              Train
            </div>
          </div>
          <div className="mb-6 text-gray-400">
            Fastest option for long-distance travel.
          </div>
          <button
            onClick={() => handleBooking("train")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-400"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Forms */}
      {activeBooking && renderBookingForm(activeBooking)}
      
      {/* Location Map */}
      {renderLocationMap()}
    </div>
  );
}