import { UserContext } from "@/modules/shared/store/user-context";
import Greeting from "../../shared/components/Greeting";
import { ItineraryList } from "../components/ItineraryList";
import { useContext } from "react";

export function MyItineraries() {
  const { user } = useContext(UserContext);

  return (
    <div className="mx-7 flex flex-col gap-8">
      <div className="bg-secondary-white w-fit-content">
        <Greeting name={user.username} title="Itineraries" signedIn />
      </div>
      {/* This is the main content */}
      <div className="mb-16 flex h-fit w-full flex-col border-2 border-black">
        <ItineraryList />
      </div>
    </div>
  );
}
