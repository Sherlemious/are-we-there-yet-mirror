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

function AddItineraryCard({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center border-2 border-black"
      onClick={onAddClick}
    >
      <button className="text-6xl font-bold text-black">+</button>
    </div>
  );
}

export function ItineraryList() {
  const { data, loading, error, fetchData } = useGetMyItineraries();
  const { updateItinerary } = useUpdateMyItinerary();
  const {
    deleteItinerary,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteMyItinerary();
  const [selectedItinerary, setSelectedItinerary] =
    useState<ItineraryType | null>(null);

  // untestest

  const { activateItinerary } = useActivateItinerary();
  const { deactivateItinerary } = useDeactivateItinerary();
  const [isCreating, setIsCreating] = useState(false);
  const {
    createItinerary,
    loading: createLoading,
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
    await createItinerary(newItinerary);
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
    await updateItinerary(selectedItinerary._id, updatedItinerary);
    setIsCreating(false);
    setSelectedItinerary(null);
    fetchData();
  };

  const handleDeleteClick = async (itineraryId: string) => {
    await deleteItinerary(itineraryId);
    fetchData();
  };

  const handleActivateItinerary = async (itineraryId: string) => {
    await activateItinerary(itineraryId);
    setSelectedItinerary(null);
    fetchData();
  };

  const handleDeactivateItinerary = async (itineraryId: string) => {
    await deactivateItinerary(itineraryId);
    setSelectedItinerary(null);
    fetchData();
  };

  if (loading || deleteLoading || createLoading) {
    return <div>Loading...</div>;
  }

  if (error || deleteError || createError) {
    return <div>Error: {error || deleteError || createError}</div>;
  }

  return (
    <>
      <div className="grid-rows-auto grid grid-cols-3 gap-8 bg-secondary-white p-8">
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
