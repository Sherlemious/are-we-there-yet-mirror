import { useState } from 'react';
import Greeting from '../../shared/Greeting';
import { ActivityList } from '../components/ActivityList';
import { ItineraryList } from '../components/ItineraryList';
import { MuseumList } from '../components/MuseumList';

export function UsersAssets() {
  // define some stuff
  const sectionName: string = 'Assets';
  const [currentTab, setCurrentTab] = useState('activities');

  // handle tab change
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="h-dvh mx-7 flex flex-col gap-8">
      <div className="w-fit-content">
        <Greeting name="John Doe" sectionName={sectionName} />
      </div>
      {/* tab to choose which asset to view */}
      <div className="w-full h-fit border-black border-2 flex flex-row justify-around">
        <button
          className={`w-fit h-full my-4 self-center text-xl ${currentTab === 'activities' && 'font-bold'}`}
          onClick={() => handleTabChange('activities')}
        >
          Activities
        </button>
        <button
          className={`w-fit h-full my-4 self-center text-xl ${currentTab === 'itinerary' && 'font-bold'}`}
          onClick={() => handleTabChange('itinerary')}
        >
          Itineraries
        </button>
        <button
          className={`w-fit h-full my-4 self-center text-xl ${currentTab === 'museum' && 'font-bold'}`}
          onClick={() => handleTabChange('museum')}
        >
          Museum and Historical Places
        </button>
      </div>
      {/* This is the main content */}
      <div className="w-full h-full border-black border-2 mb-16 flex flex-col">
        {currentTab === 'activities' && <ActivityList />}
        {currentTab === 'itinerary' && <ItineraryList />}
        {currentTab === 'museum' && <MuseumList />}
      </div>
    </div>
  );
}
