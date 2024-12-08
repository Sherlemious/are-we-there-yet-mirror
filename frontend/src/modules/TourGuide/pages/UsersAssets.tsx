import { ItineraryList } from "../components/ItineraryList";

export function MyItineraries() {

  return (
    <div className="mx-7 flex flex-col gap-8">
      {/* This is the main content */}
      <div className="mb-16 flex h-fit w-full flex-col border-2 border-black">
        <ItineraryList />
      </div>
    </div>
  );
}
