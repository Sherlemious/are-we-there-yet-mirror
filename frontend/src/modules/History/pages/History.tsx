import Greeting from "@/modules/shared/components/Greeting";
import { UserContext } from "@/modules/shared/store/user-context";
import { useContext, useEffect, useRef, useState } from "react";
import TourGuidesTable from "../components/TourGuidesTable";
import Modal, { ModalRef } from "@/modules/shared/components/Modal";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import ReviewsForm from "../components/ReviewsForm";
import toast from "react-hot-toast";

interface TourGuide {
    _id: string;
    username: string;
    email: string;
    mobilenumber: string;
    years_of_experience?: number;
    average_rating?: number;
  }

export function History(){

const sectionName: string = 'History';
const [currentTab, setCurrentTab] = useState('tour guides');
const { user } = useContext(UserContext);
const [tourGuides, setTourGuides] = useState<TourGuide[]>([]);
const [objectId, setObjectId] = useState<string>("");
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
    fetchTourGuides();
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

const handleOpenModal = (tourGuide: object) => {
    setObjectId(tourGuide._id);
    console.log(objectId);
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
    className={`w-fit h-full my-4 self-center text-xl ${currentTab === 'tour guide' ? 'font-bold text-white' : 'text-gray-900'} hover:text-white`}
    onClick={() => handleTabChange('tour guide')}
  >
    Tour Guides
  </button>
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
</div>
    <Modal ref={modalRef} onClose={handleCloseModal}>
        <ReviewsForm 
          objectType="users"
          objectId={objectId}
          initialValues={{ rating: 0, comment: "" }}
          onClose={handleCloseModal} 
          onSubmit={handleCreateRating}
        />
      </Modal>
    {/* This is the main content */}
    <div className="w-full h-fit border-black border-2 mb-16 flex flex-col">
      {currentTab === 'tour guide'  && <TourGuidesTable tourGuides={tourGuides} onEditRating = {handleOpenModal}  /> }
      {currentTab === 'activities' }
      {currentTab === 'itinerary' } 
    </div>
  </div>
);
}

export default History;