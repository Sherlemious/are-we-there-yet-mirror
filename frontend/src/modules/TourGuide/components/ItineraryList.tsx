import { useState } from "react";
import ItineraryModal from "./CreateItineraryModal";
import {
  useDeleteMyItinerary,
  useGetMyItineraries,
  useCreateMyItinerary,
  useActivateItinerary,
  useDeactivateItinerary,
  useUpdateMyItinerary,
} from "./Api";
import { ItineraryCard } from "./ItineraryCard";
import type { ItineraryType } from "@/modules/shared/types/Itinerary.types";
import type { ItineraryPostType } from "./Types";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

function AddItineraryCard({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div
    className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
    onClick={onAddClick}
    >
      <button className="flex items-center justify-center text-6xl text-gray-400">
        <Plus size={40}/>
      </button>
    </div>
  );
}

export function ItineraryList() {
  const { data, success, error, fetchData } = useGetMyItineraries();
  const { updateItinerary } = useUpdateMyItinerary();
  const {
    deleteItinerary,
    success: deleteSuccess,
    error: deleteError,
  } = useDeleteMyItinerary();
  const [selectedItinerary, setSelectedItinerary] =
    useState<ItineraryType | null>(null);

  // untestest
  const loadingToastId = toast.toString();
  const { activateItinerary } = useActivateItinerary();
  const { deactivateItinerary } = useDeactivateItinerary();
  const [isCreating, setIsCreating] = useState(false);
  const {
    createItinerary,
    success: createSuccess,
    error: createError,
  } = useCreateMyItinerary(); // Extract createItinerary

  const handleCardClick = (itinerary: ItineraryType) => {
    setSelectedItinerary(itinerary);
  };

  const handleCloseModal = () => {
    setSelectedItinerary(null);
    setIsCreating(false);
  };

  const handleAddClick = () => {
    setIsCreating(true);
  };

  const handleSaveNewItinerary = async (newItinerary: ItineraryPostType) => {
    try{
    await createItinerary(newItinerary);
    toast.success("Created new itinerary", {id: loadingToastId});
    } catch(error){
      console.error(error);
      toast.error("failed to create new itinerary", {id: loadingToastId});
    }
    setIsCreating(false);
    setSelectedItinerary(null);
    fetchData();
  };

  const handleUpdateItinerary = async (
    updatedItinerary: Partial<ItineraryPostType>,
  ) => {
    if (!selectedItinerary) {
      console.error("No itinerary selected");
      return;
    }
    try{
    await updateItinerary(selectedItinerary._id, updatedItinerary);
    toast.success("Updated itinerary", {id: loadingToastId});
    }catch(error){
      console.error(error);
      toast.error("failed to update itinerary", {id: loadingToastId});
    }
    setIsCreating(false);
    setSelectedItinerary(null);
    fetchData();
  };

  const handleDeleteClick = async (itineraryId: string) => {
    try{
    await deleteItinerary(itineraryId);
    toast.success("Deleted itinerary", {id: loadingToastId});
    }catch(error){
      console.error(error);
      toast.error("failed to delete itinerary", {id: loadingToastId});
    }
    fetchData();
  };

  const handleActivateItinerary = async (itineraryId: string) => {
    try{
    await activateItinerary(itineraryId);
    toast.success("Activated itinerary", {id: loadingToastId});
    }
    catch(error){
      console.error(error);
      toast.error("failed to activate itinerary", {id: loadingToastId});
    }
    setSelectedItinerary(null);
    fetchData();
  };

  const handleDeactivateItinerary = async (itineraryId: string) => {
    try{
    await deactivateItinerary(itineraryId);
    toast.success("Deactivated itinerary", {id: loadingToastId});
    }catch(error){
      console.error(error);
      toast.error("failed to deactivate itinerary", {id: loadingToastId});
    }
    setSelectedItinerary(null);
    fetchData();
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 bg-secondary-white p-12">
        {data.map((itinerary, index) => (
          <ItineraryCard
            itinerary={itinerary}
            key={index}
            onCardClick={() => handleCardClick(itinerary)}
            onDeleteClick={() => handleDeleteClick(itinerary._id)}
          />
        ))}
        <AddItineraryCard onAddClick={handleAddClick} />{" "}
        {/* Add the new itinerary card */}
      </div>
      {(isCreating || selectedItinerary) && (
        <ItineraryModal
          onClose={handleCloseModal}
          onSave={handleSaveNewItinerary}
          onUpdate={handleUpdateItinerary}
          itinerary={selectedItinerary}
          onActivate={handleActivateItinerary}
          onDeactivate={handleDeactivateItinerary}
        />
      )}
    </>
  );
}
