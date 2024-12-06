import { ItineraryList } from "../components/ItineraryList";

export function AllItineraries() {

  return (
    <div className="mx-7 flex flex-col gap-4">
      {/* This is the main content */}
      <ItineraryList />
    </div>
  );
}
