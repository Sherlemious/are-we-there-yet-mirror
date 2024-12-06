import { MuseumList } from "../components/MuseumList";

export function AllMuseums() {
  // define some stuff

  return (
    <div className="mx-7 flex flex-col gap-4">
      {/* This is the main content */}
      <MuseumList />
    </div>
  );
}
