import {useEffect, useRef, useState } from "react";
import Modal, { ModalRef } from "@/modules/shared/components/Modal";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import ReviewsForm from "../components/ReviewsForm";
import toast from "react-hot-toast";
import ActivitiesTable from "../components/ActivitiesTable";
import ItineraryTable from "../components/ItineraryTable";

interface TourGuide {
  _id: string;
  username: string;
  email: string;
  mobile_number: string;
  years_of_experience?: number;
  average_rating?: number;
  reviews: {user: string, rating: number, comment: string}[];
}
interface Activity {
  _id: string;
  name: string;
  datetime: Date;
  location: { name: string };
  price: number;
  category: { name: string };
  tags: { name: string }[];
  specialDiscounts: number;
  average_rating?: number;
  reviews: {user: string, rating: number, comment: string}[];
}
interface Itinerary {
  _id: string;
  name: string;
  tags: { name: string }[];
  timeline: string;
  language: string;
  price: number;
  available_datetimes: Date[];
  created_by: { _id: string, username: string };
  accessibility: {
    wheelchairAccessible: boolean;
    assistiveHearingDevices: boolean;
    visualAidSupport: boolean;
    serviceAnimalAllowed: boolean;
    accessibleParking: boolean;
  };
  average_rating?: number;
  pick_up_location: { name: string };
  drop_off_location: { name: string };
  reviews: {user: string, rating: number, comment: string}[];
}



export function History() {
  const [currentTab, setCurrentTab] = useState("activities");
  const [tourGuides, setTourGuides] = useState<TourGuide[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [objectId, setObjectId] = useState<string>("");
  const [objectType, setObjectType] = useState<string>("");
  const modalRef = useRef<ModalRef>(null);
  const [refresh, setRefresh] = useState(0); // State for refresh trigger

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axiosInstance.get("/users/getItineraries");
        console.log(response.data.data.itineraries.itinerary_bookings);

        // Get the itineraries from the booking data
        const itineraries =
          response.data.data.itineraries.itinerary_bookings.map(
            (booking) => booking.itinerary,
          );

        // Extract the user IDs (tour guide IDs) from the itineraries
        const tourGuideIds = itineraries.map(
          (itinerary) => itinerary.created_by._id,
        );
        console.log(tourGuideIds);
        // Set the itineraries in the state
        setItineraries(itineraries);

        // Fetch the tour guides based on the filtered IDs
        await fetchTourGuides(tourGuideIds); // Pass the filtered tour guide IDs to the function
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    const fetchTourGuides = async (tourGuideIds) => {
      try {
        const response = await axiosInstance.get("/users/tourGuides");
        const filteredTourGuides = response.data.data.tourGuides.filter(
          (tourGuide) => tourGuideIds.includes(tourGuide._id), // Filter tour guides based on the extracted IDs
        );
        setTourGuides(filteredTourGuides); // Set the filtered tour guides in the state
        console.log(filteredTourGuides);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get("/users/getActivities");
        const activities = response.data.data.activities.activity_bookings.map(
          (booking) => booking.activity,
        );

        setActivities(activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    // Call all fetch functions inside useEffect
    fetchItineraries();
    fetchActivities();
  }, [refresh]); // Only re-fetch when `refresh` changes

  const handleCreateRating = async (
    modelType,
    modelId,
    review: { rating: number; comment: string },
  ) => {
    try {
      console.log(modelType, modelId, review);
      modalRef.current?.close();
      const response = await axiosInstance.post("/reviews", {
        review,
        modelType,
        modelId,
      });
      if (response.status === 200) {
        toast.success("Review submitted successfully!");
      }
      setRefresh((prev) => prev + 1); // Increment the refresh state
    } catch (error) {
      console.error("Error creating review:", error);
      toast.error("Error submitting review!");
    }
  };

  const handleOpenModal = (object: { _id: string; type: string }) => {
    setObjectId(object._id);
    setObjectType(object.type);
    console.log(objectId);
    console.log(objectType);
    modalRef.current?.open();
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
  };
  // handle tab change
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="mx-7 flex flex-col gap-8">
      {/* tab to choose which asset to view */}
      <div className="flex h-fit w-full flex-row justify-around border-2 bg-primary-green">
        <button
          className={`my-4 h-full w-fit self-center text-xl ${currentTab === "activities" ? "font-bold text-white" : "text-gray-900"} hover:text-white`}
          onClick={() => handleTabChange("activities")}
        >
          Activities
        </button>
        <button
          className={`my-4 h-full w-fit self-center text-xl ${currentTab === "itinerary" ? "font-bold text-white" : "text-gray-900"} hover:text-white`}
          onClick={() => handleTabChange("itinerary")}
        >
          Itineraries
        </button>
      </div>
      <Modal ref={modalRef} onClose={handleCloseModal}>
        <ReviewsForm
          objectType={objectType}
          objectId={objectId}
          initialValues={{ rating: 0, comment: "" }}
          onClose={handleCloseModal}
          onSubmit={handleCreateRating}
        />
      </Modal>
      {/* This is the main content */}
      <div className="mb-16 flex h-fit w-full flex-col border-2 border-black bg-primary-green">
        {currentTab === "activities" ? (
          <ActivitiesTable
            activities={activities}
            onEditRating={handleOpenModal}
          />
        ) : null}
        {currentTab === "itinerary" ? (
          <ItineraryTable
            itineraries={itineraries}
            onEditRating={handleOpenModal}
          />
        ) : null}
      </div>
    </div>
  );
}

export default History;
