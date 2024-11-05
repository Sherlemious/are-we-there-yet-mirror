import Greeting from "../../shared/components/Greeting";
import { MuseumList } from "../components/MuseumList";

export function MyMuseums() {
  // define some stuff
  const sectionName: string = "Museums";

  return (
    <div className="mx-7 flex flex-col gap-4">
      <div className="w-fit-content">
        <Greeting name="John Doe" title={sectionName} signedIn />
      </div>
      {/* This is the main content */}
      <div className="mb-16 flex h-fit w-full flex-col rounded-lg border-2 border-borders-primary">
        <MuseumList />
      </div>
    </div>
  );
}
