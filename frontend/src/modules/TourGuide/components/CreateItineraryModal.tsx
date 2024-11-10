import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import type { CategoryType } from "@/modules/shared/types/Category.types";
import type { TagType } from "@/modules/shared/types/Tag.types";
import type { ActivityType } from "@/modules/shared/types/Activity.types";
import type { AccessibilityType } from "@/modules/shared/types/Itinerary.types";
import type { ItineraryType } from "@/modules/shared/types/Itinerary.types";
import type { LocationType } from "@/modules/shared/types/Location.types";
import Map from "@/modules/shared/components/Map";
import type { ItineraryPostType } from "./Types";
import Modal from "@/modules/shared/components/Modal";
import { X } from "lucide-react";

interface ItineraryModalProps {
  onClose: () => void;
  onSave: (itinerary: ItineraryPostType) => void;
  onUpdate: (itinerary: Partial<ItineraryPostType> & { _id: string }) => void;
  onActivate: (itineraryId: string) => void;
  onDeactivate: (itineraryId: string) => void;
  itinerary?: Partial<ItineraryType> | null;
}

function ItineraryModal({
  onClose,
  onSave,
  onUpdate,
  onActivate,
  onDeactivate,
  itinerary,
}: ItineraryModalProps) {
  const [name, setName] = useState(itinerary?.name || "");
  const [timeline, setTimeline] = useState(itinerary?.timeline || "");
  const [language, setLanguage] = useState(itinerary?.language || "");
  const [price, setPrice] = useState(itinerary?.price || "");
  const [dropoffLocation, setDropoffLocation] = useState<LocationType>(
    itinerary?.drop_off_location || { name: "", latitude: 0, longitude: 0 },
  );
  const [pickupLocation, setPickupLocation] = useState<LocationType>(
    itinerary?.pick_up_location || { name: "", latitude: 0, longitude: 0 },
  );
  const [category, setCategory] = useState(itinerary?.category || "");
  const [accessibilities, setAccessibilities] = useState<
    Omit<AccessibilityType, "_id">
  >({
    wheelchairAccessible:
      itinerary?.accessibility?.wheelchairAccessible || false,
    assistiveHearingDevices:
      itinerary?.accessibility?.assistiveHearingDevices || false,
    visualAidSupport: itinerary?.accessibility?.visualAidSupport || false,
    serviceAnimalAllowed:
      itinerary?.accessibility?.serviceAnimalAllowed || false,
    accessibleParking: itinerary?.accessibility?.accessibleParking || false,
  });
  const [availableDateTimes, setAvailableDateTimes] = useState<string[]>([]);

  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>(
    [],
  );
  const [activityIds, setActivityIds] = useState<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<TagType[]>(
    itinerary?.tags || [],
  );
  const [tagIds, setTagIds] = useState<string[]>(
    itinerary?.tags?.map((t) => t._id) || [],
  );
  const [mapToShow, setMapToShow] = useState<"dropoff" | "pickup" | "">("");

  const { activities, categories, tags } = useLoaderData() as {
    categories: CategoryType[];
    tags: TagType[];
    activities: ActivityType[];
  };

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setIsEdited(false);
  }, [itinerary]);

  const handleSave = () => {
    console.log("Selected Tags:", selectedTags);
    const newItinerary: ItineraryPostType = {
      name,
      language,
      price: Number(price),
      drop_off_location: dropoffLocation,
      pick_up_location: pickupLocation,
      category,
      tags: tagIds,
      accessibility: accessibilities,
      available_datetimes: availableDateTimes,
      activities: selectedActivities.map((activity) => ({
        activity: activity._id,
        duration: 90,
      })),
      timeline,
      active: true,
      locations: [],
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
    const selectedTag = tags.find((tag) => tag._id === selectedTagId);
    if (selectedTag && !selectedTags.some((tag) => tag._id === selectedTagId)) {
      setSelectedTags([...selectedTags, selectedTag]);
      setTagIds([...tagIds, selectedTagId]);
      console.log("Selected Tags:", [...selectedTags, selectedTag]);
      console.log("Tag IDs:", [...tagIds, selectedTagId]);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag._id !== tagId));
    setTagIds(tagIds.filter((id) => id !== tagId));
  };

  const handleAddDateTime = () => {
    setAvailableDateTimes([
      ...availableDateTimes,
      new Date().toISOString().slice(0, 16),
    ]);
  };

  const handleActivityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedActivityId(event.target.value);
  };

  const handleRemoveActivity = (activityId: string) => {
    console.log(activityId);
    setSelectedActivities(
      selectedActivities.filter((activity) => activity._id !== activityId),
    );
    console.log(
      selectedActivities.filter((activity) => activity._id !== activityId),
    );
    setActivityIds(activityIds.filter((id) => id !== activityId));
    console.log(activityIds.filter((id) => id !== activityId));
  };

  const handleRemoveDateTime = (index: number) => {
    const newDateTimes = [...availableDateTimes];
    newDateTimes.splice(index, 1);
    setAvailableDateTimes(newDateTimes);
  };

  const handleAddActivity = () => {
    console.log(selectedActivityId);
    const selectedActivity = activities.find(
      (activity) => activity._id === selectedActivityId,
    );
    console.log(selectedActivity);
    if (
      selectedActivity &&
      !selectedActivities.some(
        (activity) => activity._id === selectedActivityId,
      )
    ) {
      setSelectedActivities([...selectedActivities, selectedActivity]);
      setActivityIds([...activityIds, selectedActivityId]);
      setSelectedActivityId(""); // Reset the selected activity ID
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
    if (itinerary && itinerary._id) {
      onActivate(itinerary._id);
    }
  };

  const handleDeactivate = async () => {
    if (itinerary && itinerary._id) {
      onDeactivate(itinerary._id);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="flex items-center justify-center bg-black bg-opacity-50">
        <div className="h-auto w-full max-w-[90vw] bg-white p-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 m-4 text-xl font-bold"
          >
            <X size={24} />
          </button>
          <div>
            {/* Itinerary name */}
            <div className="my-8 w-full text-left text-xl font-bold">
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Itinerary Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setIsEdited(true);
                  }}
                  className="border-b-2 border-black"
                />
                {itinerary ? (
                  <button
                    onClick={handleUpdate}
                    className={`mt-4 rounded bg-green-500 p-2 text-white ${isEdited ? "" : "cursor-not-allowed opacity-50"}`}
                    disabled={!isEdited}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="mt-4 rounded bg-green-500 p-2 text-white"
                  >
                    Create
                  </button>
                )}
              </div>
              {itinerary && (
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={handleActivate}
                    className="rounded bg-green-500 p-2 text-white"
                  >
                    Activate
                  </button>
                  <button
                    onClick={handleDeactivate}
                    className="rounded bg-red-500 p-2 text-white"
                  >
                    Deactivate
                  </button>
                </div>
              )}
            </div>
            {/* Itinerary details */}
            <div className="mb-8 gap-8">
              {/* random info*/}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="text-lg font-bold">Language</div>
                  <input
                    type="text"
                    placeholder="Language"
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      setIsEdited(true);
                    }}
                    className="w-full border-b-2 border-black"
                  />
                </div>
                <div className="col-span-1">
                  <div className="text-lg font-bold">Timeline From</div>
                  <input
                    type="datetime-local"
                    value={timeline.split(" - ")[0]}
                    onChange={(e) => {
                      const to = timeline.split(" - ")[1];
                      setTimeline(`${e.target.value} - ${to}`);
                      setIsEdited(true);
                    }}
                    className="w-full border-b-2 border-black"
                  />
                </div>
                <div className="col-span-1">
                  <div className="text-lg font-bold">Timeline To</div>
                  <input
                    type="datetime-local"
                    value={timeline.split(" - ")[1]}
                    onChange={(e) => {
                      const from = timeline.split(" - ")[0];
                      setTimeline(`${from} - ${e.target.value}`);
                      setIsEdited(true);
                    }}
                    className="w-full border-b-2 border-black"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold">Price</div>
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setIsEdited(true);
                    }}
                    className="w-full border-b-2 border-black"
                    min="0"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </div>
                <div>
                  <div className="text-lg font-bold">Dropoff Location</div>
                  <input
                    type="text"
                    placeholder="Dropoff Location"
                    value={dropoffLocation.name}
                    className="w-full border-b-2 border-black"
                    onFocus={() => setMapToShow("dropoff")}
                    readOnly
                  />
                </div>
                <div>
                  <div className="text-lg font-bold">Pickup Location</div>
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={pickupLocation.name}
                    className="w-full border-b-2 border-black"
                    onFocus={() => setMapToShow("pickup")}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="mb-2 block font-bold">
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
                    <option value="">--Please choose a category--</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="tag-select">Choose a tag:</label>
                  <select
                    id="tag-select"
                    onChange={handleTagsChange}
                    className="mb-4 w-full border-b-2 border-black"
                  >
                    <option value="">--Please choose tag(s)--</option>
                    {tags.map((tag) => (
                      <option key={tag._id} value={tag._id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-wrap">
                    {selectedTags.map((tag) => (
                      <div
                        key={tag._id}
                        className="m-1 rounded bg-gray-200 p-2"
                      >
                        {tag.name}
                        <button
                          onClick={() => handleRemoveTag(tag._id)}
                          className="ml-2 text-red-500"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold">Accessibilities</div>
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
                        }}
                      />
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
                        }}
                      />
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
                        }}
                      />
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
                        }}
                      />
                      Accessible Parking
                    </label>
                  </div>
                </div>
              </div>
              {/* Activities */}
              <div>
                <div>
                  <label htmlFor="activity-select">Choose an activity:</label>
                  <select
                    id="activity-select"
                    value={selectedActivityId}
                    onChange={handleActivityChange}
                    className="mb-4 w-full border-b-2 border-black"
                  >
                    <option value="">--Please choose an activity--</option>
                    {activities
                      .filter(
                        (activity) =>
                          activity.name && activity.name.trim() !== "",
                      )
                      .map((activity) => (
                        <option key={activity._id} value={activity._id}>
                          {activity.name}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={handleAddActivity}
                    className="ml-2 rounded bg-blue-500 p-2 text-white"
                  >
                    Add Activity
                  </button>
                </div>
                <div className="mt-4">
                  {selectedActivities.length > 0 && (
                    <table className="w-full border-collapse border-2 text-sm">
                      <thead>
                        <tr className="border-b-2 text-center">
                          <th className="w-1/3 p-4">Name</th>
                          <th className="w-1/3 p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedActivities.map((activity, index) => (
                          <tr key={index} className="border-b-2 text-center">
                            <td className="p-4">{activity.name}</td>
                            <td className="p-4">
                              <button
                                onClick={() =>
                                  handleRemoveActivity(activity._id)
                                }
                                className="text-red-500"
                              >
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
                <div className="text-lg font-bold">Available Date & Time</div>
                {availableDateTimes.length !== 0 ? (
                  <table className="w-full border-collapse border-2 text-sm">
                    <thead>
                      <tr className="border-b-2 text-center">
                        <th className="p-4">Date</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableDateTimes.map((dateTime, index) => (
                        <tr key={index} className="border-b-2 text-center">
                          <td className="p-4">
                            <input
                              type="datetime-local"
                              value={dateTime}
                              onChange={(e) => {
                                const newDateTimes = [...availableDateTimes];
                                newDateTimes[index] = e.target.value;
                                setAvailableDateTimes(newDateTimes);
                                setIsEdited(true);
                              }}
                              className="w-full border-b-2 border-black"
                            />
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => handleRemoveDateTime(index)}
                              className="text-red-500"
                            >
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
                <button
                  onClick={handleAddDateTime}
                  className="mt-4 rounded bg-blue-500 p-2 text-white"
                >
                  Add Date & Time
                </button>
              </div>
            </div>
            {mapToShow !== "" && (
              <div className="h-[20vh]">
                {mapToShow === "dropoff" && (
                  <Map
                    onChange={(loc) => {
                      setDropoffLocation({
                        name: loc.name,
                        latitude: loc.lat,
                        longitude: loc.lng,
                      });
                      setIsEdited(true);
                    }}
                  />
                )}
                {mapToShow === "pickup" && (
                  <Map
                    onChange={(loc) => {
                      setPickupLocation({
                        name: loc.name,
                        latitude: loc.lat,
                        longitude: loc.lng,
                      });
                      setIsEdited(true);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ItineraryModal;
