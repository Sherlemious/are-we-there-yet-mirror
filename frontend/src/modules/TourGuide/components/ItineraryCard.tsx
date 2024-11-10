import { Itinerary } from "./Types";

export function ItineraryCard({
    itinerary,
    onCardClick,
    onDeleteClick,
  }: {
    itinerary: Itinerary;
    onCardClick: () => void;
    onDeleteClick: () => void;
  }) {
    return (
      <div
        className="relative h-full w-full border-2 border-black"
        onClick={onCardClick}
      >
        {/* Minus button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick();
          }}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white"
        >
          -
        </button>
        {/* Itinerary name */}
        <div className="p-2 text-center font-bold">{itinerary.name}</div>
        <div className="grid-rows-auto grid gap-2 p-4 pt-0">
          {itinerary.activities.length !== 0 ? (
              <div className="text-center">
                {itinerary.activities.length} {itinerary.activities.length === 1 ? 'activity' : 'activities'}
              </div>
          ) : (
            <div className="text-center">No activities</div>
          )}
        </div>
      </div>
    );
  }