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
  onUpdate: (itinerary: Partial<ItineraryPostType>) => void;
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
  const [category, setCategory] = useState(itinerary?.category?._id || "");
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
  const [availableDateTimes, setAvailableDateTimes] = useState<string[]>(
    itinerary?.available_datetimes?.map((dt) => dt.slice(0, 16)) || [],
  );

  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>(
    itinerary?.activities?.map((a) => a.activity) || [],
  );
  const [activityIds, setActivityIds] = useState<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<TagType[]>(
    itinerary?.tags || [],
  );
  const [tagIds, setTagIds] = useState<string[]>(
    itinerary?.tags?.map((t) => t._id) || [],
  );
  const [locations, setLocations] = useState<LocationType[]>(
    itinerary?.locations || [],
  );
  const [mapToShow, setMapToShow] = useState<
    "dropoff" | "pickup" | "locations" | ""
  >("");

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
      locations,
    };
    onSave(newItinerary);
  };

  // new untested
  const handleUpdate = () => {
    const updatedItinerary: Partial<ItineraryPostType> = {
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
      locations,
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
    setIsEdited(true);
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag._id !== tagId));
    setTagIds(tagIds.filter((id) => id !== tagId));
    setIsEdited(true);
  };

  const handleAddDateTime = () => {
    setAvailableDateTimes([
      ...availableDateTimes,
      new Date().toISOString().slice(0, 16),
    ]);
    setIsEdited(true);
  };

  const handleActivityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedActivityId(event.target.value);
    setIsEdited(true);
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
    setIsEdited(true);
  };

  const handleRemoveDateTime = (index: number) => {
    const newDateTimes = [...availableDateTimes];
    newDateTimes.splice(index, 1);
    setAvailableDateTimes(newDateTimes);
    setIsEdited(true);
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
    setIsEdited(true);
  };

  const handleAccessibilityChange = (event: any) => {
    const { name, checked } = event.target;
    setAccessibilities((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setIsEdited(true);
  };

  const handleActivate = async () => {
    if (itinerary && itinerary._id) {
      onActivate(itinerary._id);
    }
    setIsEdited(true);
  };

  const handleDeactivate = async () => {
    if (itinerary && itinerary._id) {
      onDeactivate(itinerary._id);
    }
    setIsEdited(true);
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
           <div className="mb-2 flex items-center gap-2 font-headings text-lg text-accent-dark-blue">Itinerary Name</div>
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setIsEdited(true);
                  }}
                  className="border border-borders-primary rounded-lg bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                  //className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                />
              </div>
              {itinerary && (
                <div className="mt-7 flex space-x-4">
                  <button
                    onClick={handleActivate}
                    className="flex items-center gap-2 rounded-lg bg-accent-gold px-6 py-3 font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50"
             //       className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    disabled={itinerary.active}
                  >
                    Activate
                  </button>
                  <button
                    onClick={handleDeactivate}
                    className="flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!itinerary.active}
                  >
                    Deactivate
                  </button>
                </div>
              )}
            </div>
            {mapToShow !== "" && (
              <div className="h-[20vh]">
                {mapToShow === "locations" && (
                  <Map
                    onChange={(loc) => {
                      setLocations([
                        ...locations,
                        {
                          name: loc.name,
                          latitude: loc.lat,
                          longitude: loc.lng,
                        },
                      ]);
                      setMapToShow("");
                      setIsEdited(true);
                    }}
                  />
                )}
                {mapToShow === "dropoff" && (
                  <Map
                    onChange={(loc) => {
                      setDropoffLocation({
                        name: loc.name,
                        latitude: loc.lat,
                        longitude: loc.lng,
                      });
                      setMapToShow("");
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
                      setMapToShow("");
                      setIsEdited(true);
                    }}
                  />
                )}
              </div>
            )}
            {/* Itinerary details */}
            <div className="mb-8 gap-8">
              {/* random info*/}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">Language</div>
                  <input
                    type="text"
                    placeholder="Language"
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      setIsEdited(true);
                    }}
                    className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">Price</div>
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setIsEdited(true);
                    }}
                    className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    min="0"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </div>
                <div className="col-span-1">
                  <div className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">Timeline From</div>
                  <input
                    type="datetime-local"
                    value={timeline.split(" - ")[0]}
                    onChange={(e) => {
                      const to = timeline.split(" - ")[1];
                      setTimeline(`${e.target.value} - ${to}`);
                      setIsEdited(true);
                    }}
                    className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    />
                </div>
                <div className="col-span-1">
                  <div className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">Timeline To</div>
                  <input
                    type="datetime-local"
                    value={timeline.split(" - ")[1]}
                    onChange={(e) => {
                      const from = timeline.split(" - ")[0];
                      setTimeline(`${from} - ${e.target.value}`);
                      setIsEdited(true);
                    }}
                    className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    />
                </div>
               
                <div>
                  <div className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">Dropoff Location</div>
                  <input
                    type="text"
                    placeholder="Dropoff Location"
                    value={dropoffLocation.name}
                    className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    onFocus={() => setMapToShow("dropoff")}
                    readOnly
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">Pickup Location</div>
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={pickupLocation.name}
                    className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
                    onFocus={() => setMapToShow("pickup")}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">
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
                    className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
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
                  <label htmlFor="tag-select" className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">
                    Choose a tag:
                  </label>
                  <select
                    id="tag-select"
                    onChange={handleTagsChange}
                    className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
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
                        className="mt-3 rounded bg-accent-gold p-2"
                      >
                        {tag.name}
                        <button
                          onClick={() => handleRemoveTag(tag._id)}
                          className="ml-2 text-black"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">Accessibilities</div>
                  <div>
                  <label className="flex items-center gap-3">
                  <input
                        type="checkbox"
                        name="wheelchairAccessible"
                        checked={accessibilities.wheelchairAccessible}
                        onChange={(e) => {
                          handleAccessibilityChange(e);
                          setIsEdited(true);
                        }}
                      />
                    <span className="text-body text-text-primary">
                      Wheelchair Accessible
                    </span>
                    </label>
                  </div>
                  <div>
                  <label className="flex items-center gap-3">
                  <input
                        type="checkbox"
                        name="assistiveHearingDevices"
                        checked={accessibilities.assistiveHearingDevices}
                        onChange={(e) => {
                          handleAccessibilityChange(e);
                          setIsEdited(true);
                        }}
                      />
                      <span className="text-body text-text-primary">
                        Assistive Hearing Devices
                      </span>
                    </label>
                  </div>
                  <div>
                  <label className="flex items-center gap-3">
                  <input
                        type="checkbox"
                        name="visualAidSupport"
                        checked={accessibilities.visualAidSupport}
                        onChange={(e) => {
                          handleAccessibilityChange(e);
                          setIsEdited(true);
                        }}
                      />
                      <span className="text-body text-text-primary">
                        Visual Aid Support
                      </span>
                    </label>
                  </div>
                  <div>
                  <label className="flex items-center gap-3">
                  <input
                        type="checkbox"
                        name="serviceAnimalAllowed"
                        checked={accessibilities.serviceAnimalAllowed}
                        onChange={(e) => {
                          handleAccessibilityChange(e);
                          setIsEdited(true);
                        }}
                      />
                      <span className="text-body text-text-primary">
                        Service Animal Allowed
                       </span>
                    </label>
                  </div>
                  <div>
                  <label className="flex items-center gap-3 mt-1">
                  <input
                        type="checkbox"
                        name="accessibleParking"
                        checked={accessibilities.accessibleParking}
                        onChange={(e) => {
                          handleAccessibilityChange(e);
                          setIsEdited(true);
                        }}
                      />
                       <span className="text-body text-text-primary">Accessible Parking</span>
                    </label>
                  </div>
                </div>
              </div>
              {/* Activities */}
              <div className="mt-2">
                <div>
                  <label htmlFor="activity-select" className="mb-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">
                    Choose an activity:
                  </label>
                  <select
                    id="activity-select"
                    value={selectedActivityId}
                    onChange={handleActivityChange}
                    className="w-full rounded-lg border border-borders-primary bg-secondary-light_grey px-4 py-3 outline-none transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
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
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                  >
                    Add Activity
                  </button>
                </div>
                <div className="mt-4">
                  {selectedActivities.length > 0 && (
                    <table className="w-full border-collapse border-2 text-sm">
                      <thead>
                        <tr className="bg-gradient-to-r from-primary-green to-primary-blue">
                          <th className="text-nowrap p-5 text-center text-input_or_label font-headline text-secondary-white first:rounded-tl-lg">
                            Name</th>
                            <th className="text-nowrap p-5 text-center text-input_or_label font-headline text-secondary-white first:rounded-tl-lg">
                            Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary-light_grey">
                      {selectedActivities.map((activity, index) => (
                          <tr key={index} 
                className="text-center transition-colors duration-200 hover:bg-secondary-light_grey/50"
                          >
                            <td className="p-5 text-center text-body text-accent-dark-blue">{activity.name}</td>
                            <td className="p-5 text-center">
                              <button
                                onClick={() =>
                                  handleRemoveActivity(activity._id)
                                }
                                className="mr-4 text-base	rounded-lg px-6 py-3 font-bold border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
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
                <div className="flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">
                  Available Date & Time
                </div>
                <button
                  onClick={handleAddDateTime}
                  className="my-4 rounded bg-blue-500 px-4 py-2 text-white"
                  disabled={availableDateTimes.length>0}
                >
                  Add Date & Time
                </button>
                {availableDateTimes.length !== 0 ? (
                  <table className="w-full border-collapse border-2 text-sm">
                    <thead>
                    <tr className="bg-gradient-to-r from-primary-green to-primary-blue">
                    <th className="text-nowrap p-5 text-center text-input_or_label font-headline text-secondary-white first:rounded-tl-lg">
                      Date</th>
                      <th className="text-nowrap p-5 text-center text-input_or_label font-headline text-secondary-white first:rounded-tl-lg">
                      Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-light_grey">
                    {availableDateTimes.map((dateTime, index) => (
                        <tr key={index} 
                        className="text-center transition-colors duration-200 hover:bg-secondary-light_grey/50"
                        >
                          <td className="p-5 text-center text-body text-accent-dark-blue">
                            <input
                              type="datetime-local"
                              value={dateTime}
                              onChange={(e) => {
                                const newDateTimes = [...availableDateTimes];
                                newDateTimes[index] = e.target.value;
                                setAvailableDateTimes(newDateTimes);
                                setIsEdited(true);
                              }}
                              className="w-96 border-b-2 border-black"
                            />
                          </td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() => handleRemoveDateTime(index)}
                              className="mr-4 text-base	rounded-lg px-6 py-3 font-bold border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div></div>
                )}
              </div>
              <div>
                <div className="mt-2 flex items-center gap-2 font-sub_headings text-lg text-accent-dark-blue">Locations</div>
                <button
                  className="mt-3 rounded bg-blue-500 px-4 py-2 text-white"
                  onClick={() => setMapToShow("locations")}
                >
                  Add Location
                </button>
                <div className="mt-4">
                  {locations.length > 0 && (
                    <table className="w-full border-collapse border-2 text-sm">
                      <thead>
                      <tr className="bg-gradient-to-r from-primary-green to-primary-blue">
                      <th className="text-nowrap p-5 text-center text-input_or_label font-headline text-secondary-white first:rounded-tl-lg">
                        Name</th>
                        <th className="text-nowrap p-5 text-center text-input_or_label font-headline text-secondary-white first:rounded-tl-lg">
                        Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary-light_grey">
                      {locations.map((activity, index) => (
                        <tr key={index} 
                        className="text-center transition-colors duration-200 hover:bg-secondary-light_grey/50"
                        >
                            <td className="p-5 text-center text-body text-accent-dark-blue">{activity.name}</td>
                            <td className="p-5 text-center">
                              <button
                                onClick={() =>
                                  setLocations(
                                    locations.filter((_, i) => i !== index),
                                  )
                                }
                                className="mr-4 text-base	 rounded-lg px-6 py-3 font-bold border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
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
            </div>
          </div>
            <div className="col-span-2 flex justify-end">
                  <button
            type="button"
            onClick={onClose}
            className="mr-4 rounded-lg px-6 py-3 font-bold border-red-200 text-lg text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Cancel
          </button>
                  {itinerary ? (
                  <button
                    onClick={handleUpdate}
                    className={`flex items-center gap-2 rounded-lg bg-accent-gold px-6 py-3 font-bold transition-all duration-150 hover:opacity-80 ${isEdited ? "" : "cursor-not-allowed opacity-50"}`}
                    disabled={!isEdited}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-lg bg-accent-gold px-6 py-3 font-bold transition-all duration-150 hover:opacity-80"
                    >
                    Create
                  </button>
                )}
                </div>
        </div>
      </div>
    </Modal>
  );
}

export default ItineraryModal;
