import { Activity, Itinerary } from './Types';
import { useState, useEffect } from "react";
import CreateItineraryModal from "./CreateItineraryModal";
import { 
  getActivities, 
  useDeleteMyItinerary, 
  useGetMyItineraries, 
  useCreateMyItinerary,
  useActivateItinerary,
  useDeactivateItinerary
} from "./Api";
import { ItineraryCard } from "./ItineraryCard";

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
  const {
    deleteItinerary,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteMyItinerary();
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(
    null,
  );

  // untestest

  const { activateItinerary, loading: activateLoading, error: activateError } = useActivateItinerary();
const { deactivateItinerary, loading: deactivateLoading, error: deactivateError } = useDeactivateItinerary();
  // useActivateItinerary();
  // useDeactivateItinerary();
  // untested
  const [isCreating, setIsCreating] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const {
    createItinerary,
    loading: createLoading,
    error: createError,
  } = useCreateMyItinerary(activities); // Extract createItinerary

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getActivities();
      setActivities(data);
    };
    fetchActivities();
  });

  const handleCardClick = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
    // setIsCreating(false);
    console.log(`Itinerary Name: ${itinerary.name}`);
    console.log(`Selected Tags: ${JSON.stringify(itinerary.selectedTags)}`);
    console.log(`Tags: ${JSON.stringify(itinerary.tags)}`);
    console.log(`Tag IDs: ${JSON.stringify(itinerary.tagIds)}`);
    console.log(`Activities: ${JSON.stringify(itinerary.activities)}`);
    console.log(`Activity IDs: ${JSON.stringify(itinerary.activityIds)}`);
  };

  const handleCloseModal = () => {
    setSelectedItinerary(null);
    setIsCreating(false);
  };

  const handleAddClick = () => {
    setIsCreating(true);
  };

  const handleSaveNewItinerary = async (newItinerary: Partial<Itinerary>) => {
        // if(selectedItinerary !=== null){
    //   await updateItinerary(newItinerary);
    // }
    // else{
    //   await createItinerary(newItinerary); // Call createItinerary function
    // }
    await createItinerary(newItinerary);
    setIsCreating(false);
    setSelectedItinerary(null);
    fetchData();
  };

  const handleUpdateItinerary = async (updatedItinerary: Partial<Itinerary>) => {
    await createItinerary(updatedItinerary); // Create the updated itinerary
    if (selectedItinerary) {
      await deleteItinerary(selectedItinerary.id); // Delete the old itinerary
    }
    setIsCreating(false);
    setSelectedItinerary(null);
    fetchData();
  };

  const handleDeleteClick = async (itineraryId: string) => {
    await deleteItinerary(itineraryId);
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
      <div className="grid-rows-auto grid grid-cols-3 gap-8 p-8">
        {data.map((itinerary, index) => (
          <ItineraryCard
            itinerary={itinerary}
            key={index}
            onCardClick={() => handleCardClick(itinerary)}
            onDeleteClick={() => handleDeleteClick(itinerary.id)}
          />
        ))}
        <AddItineraryCard onAddClick={handleAddClick} />{" "}
        {/* Add the new itinerary card */}
        </div>
      {/* {selectedItinerary && (
        <ItineraryModal
          itinerary={selectedItinerary}
          onClose={handleCloseModal}
        />
      )} */}
      {(isCreating || selectedItinerary) && (
        <CreateItineraryModal
          onClose={handleCloseModal}
          onSave={handleSaveNewItinerary}
          onUpdate={handleUpdateItinerary}
          itinerary={selectedItinerary}
          onActivate={activateItinerary} 
          onDeactivate={deactivateItinerary} 
        />
      )}
    </>
  );
}