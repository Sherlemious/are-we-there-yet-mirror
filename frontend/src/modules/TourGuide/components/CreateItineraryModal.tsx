import React, { useEffect, useState } from 'react';
import { Activity, Itinerary, Tag } from './ItineraryList';
import { getActivities, getTags } from './Api';

interface CreateItineraryModalProps {
  onClose: () => void;
  onSave: (itinerary: Partial<Itinerary>) => void;
}

function CreateItineraryModal({ onClose, onSave }: CreateItineraryModalProps) {
  const [name, setName] = useState('');
  const [timeline, setTimeline] = useState('');
  const [language, setLanguage] = useState('');
  const [price, setPrice] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState('');
  const [accessibilities, setAccessibilities] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [availableDateTimes, setAvailableDateTimes] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [activityIds, setActivityIds] = useState<string[]>([]);
  const [tagIds, setTagIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getActivities();
      setActivities(data);
    };
    const fetchTags = async () => {
      const data = await getTags();
      setTags(data);
    };
    fetchActivities();
    fetchTags();
  });

  const handleSave = () => {
    const newItinerary: Partial<Itinerary> = {
      name,
      language,
      price,
      dropoffLocation,
      pickupLocation,
      category,
      tags: tagIds,
      accessibilities,
      availableDateTimes2: availableDateTimes,
      activityIds,
      timeline,
    };
    onSave(newItinerary);
  };

  const handleAddDateTime = () => {
    setAvailableDateTimes([...availableDateTimes, new Date().toISOString()]);
  };

  const handleActivityChange = (event: any) => {
    setSelectedActivity(event.target.value);
  };

  const handleTagsChange = (event: any) => {
    setSelectedTags(event.target.value);
    const newTagIds = [...tagIds];
    newTagIds.pop(); // Remove the last element
    newTagIds.push(event.target.value); // Add the new value
    setTagIds(newTagIds);
  };

  const handleAddActivity = () => {
    if (selectedActivity) {
      setActivityIds([...activityIds, selectedActivity]);
      setSelectedActivity(''); // Reset the selected activity
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-[90vw] h-auto border-black border-2 bg-white p-4 relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold m-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div>
          {/* Itinerary name */}
          <div className="text-left font-bold text-xl w-fit my-8">
            <input
              type="text"
              placeholder="Itinerary Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-b-2 border-black w-full"
            />
          </div>
          {/* Itinerary details */}
          <div className="grid grid-cols-3 gap-8 mx-8 mb-8">
            {/* random info*/}
            <div className="grid grid-cols-2 grid-rows-auto gap-4">
              <div className="col-span-1">
                <div className="font-bold text-lg">Language</div>
                <input
                  type="text"
                  placeholder="Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div className="col-span-1">
                <div className="font-bold text-lg">Timeline</div>
                <input
                  type="text"
                  placeholder="Timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Price</div>
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Dropoff Location</div>
                <input
                  type="text"
                  placeholder="Dropoff Location"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Pickup Location</div>
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Category</div>
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div>
                <label htmlFor="tag-select">Choose a tag:</label>
                <select id="tag-select" value={selectedTags} onChange={handleTagsChange}>
                  <option value="">--Please choose an tag--</option>
                  {tags.map((tag: any) => (
                    <option key={tag._id} value={tag._id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                <div>Selected Tags: {selectedTags}</div>
              </div>
              <div>
                <div className="font-bold text-lg">Accessibilities</div>
                <input
                  type="checkbox"
                  checked={accessibilities}
                  onChange={(e) => setAccessibilities(e.target.checked)}
                />
              </div>
            </div>
            {/* Activities */}
            <div>
              <div className="font-bold text-lg">Activities</div>
              {activities.length !== 0 ? (
                <table className="w-full border-collapse border-2 text-sm">
                  <thead>
                    <tr className="border-b-2 text-center">
                      <th className="p-4 w-1/3">Location</th>
                      <th className="p-4 w-1/3">Duration (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <div>
                      <label htmlFor="activity-select">Choose an activity:</label>
                      <select id="activity-select" value={selectedActivity} onChange={handleActivityChange}>
                        <option value="">--Please choose an activity--</option>
                        {activities.map((activity: any) => (
                          <option key={activity._id} value={activity._id}>
                            {activity.specialDiscounts}
                          </option>
                        ))}
                      </select>
                    </div>
                    {activityIds.map((activityId, index) => (
                      <div>{activityId}</div>
                    ))}
                    <button onClick={handleAddActivity} className="ml-2 p-2 bg-blue-500 text-white rounded">
                      Add Activity
                    </button>
                  </tbody>
                </table>
              ) : (
                <div className="text-left">No activities</div>
              )}
            </div>
            {/* Date and Time */}
            <div>
              <div className="font-bold text-lg">Date & Time</div>
              {availableDateTimes.length !== 0 ? (
                <table className="w-full border-collapse border-2 text-sm">
                  <thead>
                    <tr className="border-b-2 text-center">
                      <th className="p-4">Date</th>
                      <th className="p-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableDateTimes.map((dateTime, index) => (
                      <tr key={index} className="border-b-2 text-center">
                        <td className="p-4">
                          <input
                            type="date"
                            value={new Date(dateTime).toISOString().split('T')[0]}
                            onChange={(e) => {
                              const newDateTimes = [...availableDateTimes];
                              newDateTimes[index] = new Date(e.target.value).toISOString();
                              setAvailableDateTimes(newDateTimes);
                            }}
                            className="border-b-2 border-black w-full"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No available date and time</div>
              )}
              <button onClick={handleAddDateTime} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Add Date & Time
              </button>
            </div>
          </div>
          <button onClick={handleSave} className="mt-4 p-2 bg-green-500 text-white rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateItineraryModal;
