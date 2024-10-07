import React, { useState } from 'react';
import { Activity, Itinerary } from './ItineraryList';

interface CreateItineraryModalProps {
    onClose: () => void;
    onSave: (itinerary: Partial<Itinerary>) => void;
  }

function CreateItineraryModal({ onClose, onSave }: CreateItineraryModalProps) {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');
    const [price, setPrice] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [accessibilities, setAccessibilities] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [availableDateTimes, setAvailableDateTimes] = useState<{ date: string; time: string }[]>([]);
  
    const handleSave = () => {
      const newItinerary: Partial<Itinerary> = {
        name,
        language,
        price,
        dropoffLocation,
        pickupLocation,
        category,
        tags,
        accessibilities,
        activities,
        availableDateTimes,
      };
      onSave(newItinerary);
    };
  
    const handleAddActivity = () => {
      setActivities([...activities, { duration: '', date: '', time: '', location: '', price: '', category: '', tags: [], discount: '', bookingOpen: false }]);
    };
  
    const handleAddDateTime = () => {
      setAvailableDateTimes([...availableDateTimes, { date: '', time: '' }]);
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
                  <div className="font-bold text-lg">Tags</div>
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags.join(', ')}
                    onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                    className="border-b-2 border-black w-full"
                  />
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
                      {activities.map((activity, index) => (
                        <tr key={index} className="border-b-2 text-center">
                          <td className="p-4">
                            <input
                              type="text"
                              placeholder="Location"
                              value={activity.location}
                              onChange={(e) => {
                                const newActivities = [...activities];
                                newActivities[index].location = e.target.value;
                                setActivities(newActivities);
                              }}
                              className="border-b-2 border-black w-full"
                            />
                          </td>
                          <td className="p-4">
                            <input
                              type="text"
                              placeholder="Duration"
                              value={activity.duration}
                              onChange={(e) => {
                                const newActivities = [...activities];
                                newActivities[index].duration = e.target.value;
                                setActivities(newActivities);
                              }}
                              className="border-b-2 border-black w-full"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-left">No activities</div>
                )}
                <button onClick={handleAddActivity} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Activity</button>
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
                              value={dateTime.date}
                              onChange={(e) => {
                                const newDateTimes = [...availableDateTimes];
                                newDateTimes[index].date = e.target.value;
                                setAvailableDateTimes(newDateTimes);
                              }}
                              className="border-b-2 border-black w-full"
                            />
                          </td>
                          <td className="p-4">
                            <input
                              type="time"
                              value={dateTime.time}
                              onChange={(e) => {
                                const newDateTimes = [...availableDateTimes];
                                newDateTimes[index].time = e.target.value;
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
                <button onClick={handleAddDateTime} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Date & Time</button>
              </div>
            </div>
            <button onClick={handleSave} className="mt-4 p-2 bg-green-500 text-white rounded">Create</button>
          </div>
        </div>
      </div>
    );
  }
  export default CreateItineraryModal;