import Greeting from "@/modules/shared/components/Greeting";
import { UserContext } from "@/modules/shared/store/user-context";
import { useContext, useEffect, useRef, useState } from "react";
import TourGuidesTable from "../components/TourGuidesTable";
import Modal, { ModalRef } from "@/modules/shared/components/Modal";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import ReviewsForm from "../components/ReviewsForm";
import toast from "react-hot-toast";
import ActivitiesTable from "../components/ActivitiesTable";

interface TourGuide {
    _id: string;
    username: string;
    email: string;
    mobilenumber: string;
    years_of_experience?: number;
    average_rating?: number;
  }
  interface Activity {
    _id: string;
    name: string;
    datetime: Date;
    location: { name: string };
    price: number;
    category: string;
    tags: { name: string }[];
    specialDiscounts: number;
    average_rating?: number;
  }
export function History(){

const sectionName: string = 'History';
const [currentTab, setCurrentTab] = useState('tour guides');
const { user } = useContext(UserContext);
const [tourGuides, setTourGuides] = useState<TourGuide[]>([]);
const [activities, setActivities] = useState<Activity[]>([]);
const [objectId, setObjectId] = useState<string>("");
const [objectType, setObjectType] = useState<string>("");
const modalRef = useRef<ModalRef>(null);
const [refresh, setRefresh] = useState(0); // State for refresh trigger


useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axiosInstance.get("/users/tourGuides");
        setTourGuides(response.data.data.tourGuides);
      } catch (error) {
        console.error("Error fetching tourGuides:", error);
      }
    };
    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get("/users/getActivities");
        console.log(response.data.data.activities.activity_bookings);
        setActivities(response.data.data.activities.activity_bookings);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchTourGuides();
    fetchActivities();
  }, [refresh]);

const handleCreateRating = async (modelType, modelId, review: { rating: number; comment: string }, ) => {
        try {
        console.log(modelType, modelId, review);
        const response = await axiosInstance.post("/reviews", {review, modelType, modelId});
        if(response.status === 200) {
        toast.success("Review submitted successfully!");
        }
        modalRef.current?.close();
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
    <div className="w-fit-content">
      <Greeting name={user.username} title={sectionName} signedIn />
    </div>
    {/* tab to choose which asset to view */}
    <div className="w-full h-fit border-2 flex flex-row justify-around bg-primary-green">
  <button
    className={`w-fit h-full my-4 self-center text-xl ${currentTab === 'activities' ? 'font-bold text-white' : 'text-gray-900'} hover:text-white`}
    onClick={() => handleTabChange('activities')}
  >
    Activities
  </button>
  <button
    className={`w-fit h-full my-4 self-center text-xl ${currentTab === 'itinerary' ? 'font-bold text-white' : 'text-gray-900'} hover:text-white`}
    onClick={() => handleTabChange('itinerary')}
  >
    Itineraries
  </button>
  <button
    className={`w-fit h-full my-4 self-center text-xl ${currentTab === 'product' ? 'font-bold text-white' : 'text-gray-900'} hover:text-white`}
    onClick={() => handleTabChange('product')}
  >
    Products
  </button>
  <button
    className={`w-fit h-full my-4 self-center text-xl ${currentTab === 'tour guide' ? 'font-bold text-white' : 'text-gray-900'} hover:text-white`}
    onClick={() => handleTabChange('tour guide')}
  >
    Tour Guides
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
    <div className="w-full h-fit border-black border-2 mb-16 flex flex-col bg-primary-green">
      {currentTab === 'activities' ? (
        activities.length > 0 ? (
          <ActivitiesTable activities={activities} onEditRating={handleOpenModal} />
        ) : (
          <div className="text-center text-2xl text-gray-900">No attended activities</div>
        )
      ) : null}

      {currentTab === 'tour guide' ? (
        tourGuides.length > 0 ? (
          <TourGuidesTable tourGuides={tourGuides} onEditRating={handleOpenModal} />
        ) : (
          <div className="text-center text-2xl text-gray-900">No tour guides booked with</div>
        )
      ) : null}

      {currentTab === 'itinerary' ? (
        <div className="text-center text-2xl text-gray-900">Itinerary content will go here</div>
      ) : null}
      
      {currentTab === 'product' ? (
        <div className="text-center text-2xl text-gray-900">Product content will go here</div>
      ) : null}
    </div>
  </div>
);
}

export default History;