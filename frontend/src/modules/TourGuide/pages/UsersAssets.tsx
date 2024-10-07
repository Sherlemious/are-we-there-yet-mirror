import Greeting from '../../shared/components/Greeting';
import { ItineraryList } from '../components/ItineraryList';

export function UsersAssets() {
  const Itineraries: string = 'Iteneraries';

  return (
    <div className="mx-7 flex flex-col gap-8">
      <div className="w-fit-content">
        <Greeting name="John Doe" sectionName={Itineraries} />
      </div>
      {/* This is the main content */}
      <div className="w-full h-fit border-black border-2 mb-16 flex flex-col">
        <ItineraryList />
      </div>
    </div>
  );
}
