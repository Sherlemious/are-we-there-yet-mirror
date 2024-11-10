import { useEffect, useState } from 'react';
import { Activity, Itinerary, AccessibilityType } from './Types';
import { useLoaderData } from 'react-router';
import { CategoryType } from '@/modules/shared/types/Category.types';
import { TagType } from '@/modules/shared/types/Tag.types';
interface CreateItineraryModalProps {
  onClose: () => void;
  onSave: (itinerary: Partial<Itinerary>) => void;
  onUpdate: (itinerary: Partial<Itinerary>) => void;
  onActivate: (itineraryId: string) => void;
  onDeactivate: (itineraryId: string) => void;
  itinerary?: Partial<Itinerary> | null;
}

function CreateItineraryModal({ onClose, onSave, onUpdate, onActivate, onDeactivate, itinerary }: CreateItineraryModalProps) {
  const [name, setName] = useState(itinerary?.name || '');  
  const [timeline, setTimeline] = useState( itinerary?.timeline || '');
  const [language, setLanguage] = useState( itinerary?.language || '');
  const [price, setPrice] = useState( itinerary?.price || '');
  const [dropoffLocation, setDropoffLocation] = useState( itinerary?.dropoffLocation || '');
  const [pickupLocation, setPickupLocation] = useState( itinerary?.pickupLocation || '');
  const [category, setCategory] = useState( itinerary?.category || '');
  const [accessibilities, setAccessibilities] = useState<AccessibilityType>({
    wheelchairAccessible: itinerary?.accessibilities?.wheelchairAccessible || false,
    assistiveHearingDevices: itinerary?.accessibilities?.assistiveHearingDevices || false,
    visualAidSupport: itinerary?.accessibilities?.visualAidSupport || false,
    serviceAnimalAllowed: itinerary?.accessibilities?.serviceAnimalAllowed || false,
    accessibleParking: itinerary?.accessibilities?.accessibleParking || false,
  });
  const [availableDateTimes, setAvailableDateTimes] = useState<string[]>([]);

  const [selectedActivityId, setSelectedActivityId] = useState<string>('');
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [activityIds, setActivityIds] = useState<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<TagType[]>( itinerary?.selectedTags || []); // doesnt work
  const [tagIds, setTagIds] = useState<string[]>( itinerary?.tags || []); // doesnt work

  const { activities, categories, tags } = useLoaderData() as {
    categories: CategoryType[];
    tags: TagType[];
    activities: Activity[];
  };

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setIsEdited(false);
  }, [itinerary]);

  const handleSave = () => {
    console.log('Selected Tags:', selectedTags);
    console.log('Tag IDs:', tagIds);
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
      activities: selectedActivities,
      timeline,
      selectedTags,
    };
    onSave(newItinerary);
  };

  // new untested
  const handleUpdate = () => {
    const updatedItinerary: Partial<Itinerary> = {
      name,
      language,
      price,
      dropoffLocation,
      pickupLocation,
      category,
      tags: tagIds,
      accessibilities,
      availableDateTimes2: availableDateTimes,
      activities: selectedActivities,
      timeline,
      selectedTags,
    };
    onUpdate(updatedItinerary);
  };
  
  const handleTagsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTagId = event.target.value;
    const selectedTag = tags.find(tag => tag._id === selectedTagId);
    if (selectedTag && !selectedTags.some(tag => tag._id === selectedTagId)) {
      setSelectedTags([...selectedTags, selectedTag]);
      setTagIds([...tagIds, selectedTagId]);
      console.log('Selected Tags:', [...selectedTags, selectedTag]);
      console.log('Tag IDs:', [...tagIds, selectedTagId]);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(tag => tag._id !== tagId));
    setTagIds(tagIds.filter(id => id !== tagId));
  };

  const handleAddDateTime = () => {
    setAvailableDateTimes([...availableDateTimes, new Date().toISOString()]);
  };

  const handleActivityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivityId(event.target.value);
  };

  const handleRemoveActivity = (activityId: string) => {
    console.log(activityId);
    setSelectedActivities(selectedActivities.filter(activity => activity._id !== activityId));
    console.log(selectedActivities.filter(activity => activity._id !== activityId));
    setActivityIds(activityIds.filter(id => id !== activityId));
    console.log(activityIds.filter(id => id !== activityId));
  };

  const handleRemoveDateTime = (index: number) => {
    const newDateTimes = [...availableDateTimes];
    newDateTimes.splice(index, 1);
    setAvailableDateTimes(newDateTimes);
  };

  const handleAddActivity = () => {
    console.log(selectedActivityId);
    const selectedActivity = activities.find(activity => activity._id === selectedActivityId);
    console.log(selectedActivity);
    if (selectedActivity && !selectedActivities.some(activity => activity._id === selectedActivityId)) {
      setSelectedActivities([...selectedActivities, selectedActivity]);
      setActivityIds([...activityIds, selectedActivityId]);
      setSelectedActivityId(''); // Reset the selected activity ID
    }
  };

  const handleAccessibilityChange = (event: any) => {
    const { name, checked } = event.target;
    setAccessibilities((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleActivate = async () => {
    if (itinerary && itinerary.id) {
      await onActivate(itinerary.id);
    }
  };

  const handleDeactivate = async () => {
    if (itinerary && itinerary.id) {
      await onDeactivate(itinerary.id);
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
              onChange={(e) => {
                setName(e.target.value);
                setIsEdited(true);
              }}
              className="border-b-2 border-black w-full"
            />
            {itinerary && (
              <div className="flex space-x-4 mt-2">
                <button onClick={handleActivate} className="p-2 bg-green-500 text-white rounded">
                  Activate
                </button>
                <button onClick={handleDeactivate} className="p-2 bg-red-500 text-white rounded">
                  Deactivate
                </button>
              </div>
            )}
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
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setIsEdited(true);
                  }}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div className="col-span-1">
                <div className="font-bold text-lg">Timeline</div>
                <input
                  type="text"
                  placeholder="Timeline"
                  value={timeline}
                  onChange={(e) => {
                    setTimeline(e.target.value);
                    setIsEdited(true);
                  }}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Price</div>
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setIsEdited(true);
                  }}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Dropoff Location</div>
                <input
                  type="text"
                  placeholder="Dropoff Location"
                  value={dropoffLocation}
                  onChange={(e) => {
                    setDropoffLocation(e.target.value);
                    setIsEdited(true);
                  }}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Pickup Location</div>
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={pickupLocation}
                  onChange={(e) => {
                    setPickupLocation(e.target.value);
                    setIsEdited(true);
                  }}
                  className="border-b-2 border-black w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="mb-2 block font-semibold text-primary-blue"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  required
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setIsEdited(true);
                  }}
                  className="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tag-select">Choose a tag:</label>
                <select id="tag-select" onChange={handleTagsChange} className="border-b-2 border-black w-full mb-4">
                  <option value="">--Please choose tag(s)--</option>
                  {tags.map((tag) => (
                    <option key={tag._id} value={tag._id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap">
                  {selectedTags.map((tag) => (
                    <div key={tag._id} className="bg-gray-200 p-2 m-1 rounded">
                      {tag.name}
                      <button onClick={() => handleRemoveTag(tag._id)} className="ml-2 text-red-500">
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-bold text-lg">Accessibilities</div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="wheelchairAccessible"
                      checked={accessibilities.wheelchairAccessible}
                      onChange={(e) => {
                        handleAccessibilityChange(e);
                        setIsEdited(true);
                      }}
                    />
                    Wheelchair Accessible
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="assistiveHearingDevices"
                      checked={accessibilities.assistiveHearingDevices}
                      onChange={(e) => {
                        handleAccessibilityChange(e);
                        setIsEdited(true);
                      }}                    />
                    Assistive Hearing Devices
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="visualAidSupport"
                      checked={accessibilities.visualAidSupport}
                      onChange={(e) => {
                        handleAccessibilityChange(e);
                        setIsEdited(true);
                      }}                 />
                    Visual Aid Support
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="serviceAnimalAllowed"
                      checked={accessibilities.serviceAnimalAllowed}
                      onChange={(e) => {
                        handleAccessibilityChange(e);
                        setIsEdited(true);
                      }}                    />
                    Service Animal Allowed
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="accessibleParking"
                      checked={accessibilities.accessibleParking}
                      onChange={(e) => {
                        handleAccessibilityChange(e);
                        setIsEdited(true);
                      }}                    />
                    Accessible Parking
                  </label>
                </div>
              </div>
            </div>
            {/* Activities */}
            <div>
              <div>
                <label htmlFor="activity-select">Choose an activity:</label>
                <select id="activity-select" value={selectedActivityId} onChange={handleActivityChange} className="border-b-2 border-black w-full mb-4">
                <option value="">--Please choose an activity--</option>
                {activities.filter(activity => activity.name && activity.name.trim() !== '').map((activity) => (
                  <option key={activity._id} value={activity._id}>
                    {activity.name}
                  </option>
                ))}
              </select>
                <button onClick={handleAddActivity} className="ml-2 p-2 bg-blue-500 text-white rounded">
                  Add Activity
                </button>
              </div>
              <div className="mt-4">
                {selectedActivities.length > 0 && (
                  <table className="w-full border-collapse border-2 text-sm">
                    <thead>
                      <tr className="border-b-2 text-center">
                        <th className="p-4 w-1/3">Name</th>
                        <th className="p-4 w-1/3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedActivities.map((activity, index) => (
                        <tr key={index} className="border-b-2 text-center">
                          <td className="p-4">{activity.name}</td>
                          <td className="p-4">
                            <button onClick={() => handleRemoveActivity(activity._id)} className="text-red-500">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
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
                      <th className="p-4">Actions</th>
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
                              setIsEdited(true);
                            }}
                            className="border-b-2 border-black w-full"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="time"
                            value={new Date(dateTime).toISOString().split('T')[1].split('.')[0]}
                            onChange={(e) => {
                              const newDateTimes = [...availableDateTimes];
                              newDateTimes[index] = new Date(`${newDateTimes[index].split('T')[0]}T${e.target.value}`).toISOString();
                              setAvailableDateTimes(newDateTimes);
                            }}
                            className="border-b-2 border-black w-full"
                          />
                        </td>
                        <td className="p-4">
                          <button onClick={() => handleRemoveDateTime(index)} className="text-red-500">
                            Remove
                          </button>
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
          {itinerary ? (
            <button onClick={handleUpdate} className={`mt-4 p-2 bg-green-500 text-white rounded ${isEdited ? '' : 'opacity-50 cursor-not-allowed'}`} disabled={!isEdited}>
              Update
            </button>
          ) : (
            <button onClick={handleSave} className="mt-4 p-2 bg-green-500 text-white rounded">
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateItineraryModal;