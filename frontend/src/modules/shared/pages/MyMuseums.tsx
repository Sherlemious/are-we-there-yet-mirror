import { useContext } from "react";
import Greeting from "../../shared/components/Greeting";
import { MuseumList } from "../components/MuseumList";
import { UserContext } from "../store/user-context";

export function AllMuseums() {
  // define some stuff
  const { user } = useContext(UserContext);
  const sectionName: string = "Museums";

  return (
    <div className="mx-7 flex flex-col gap-4">
      {user.username && (
        <div className="w-fit-content">
          <Greeting name="John Doe" title={sectionName} signedIn />
        </div>
      )}
      {/* This is the main content */}
      <div className="mb-16 flex h-fit w-full flex-col rounded-lg border-2 border-borders-primary">
        <MuseumList />
      </div>
    </div>
  );
}
