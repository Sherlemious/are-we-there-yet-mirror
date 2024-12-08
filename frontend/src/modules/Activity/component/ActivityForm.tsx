import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
  type FormMethod,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";

import Map from "../../shared/components/Map";
import { useState } from "react";
import axiosInstance from "../../shared/services/axiosInstance";
import { CategoryType } from "../../shared/types/Category.types";
import { type TagType } from "../../shared/types/Tag.types";
import { type ActivityType } from "../../shared/types/Activity.types";
import { ApiResponse } from "../../shared/types/Response.types";
import SearchMultiSelect, {
  type MultiSelectOption,
} from "@/modules/shared/components/SearchMultiSelect";
import {
  MapPin,
  Calendar,
  DollarSign,
  Tags,
  ListChecks,
  Layers,
  CircleCheck,
  XCircle,
} from "lucide-react";

function ActivityForm({ method }: { method: FormMethod }) {
  const data = useActionData() as { message?: string };
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { categories, tags, activity } = useLoaderData() as LoaderDataType;
  const [location, setLocation] = useState(
    activity?.location || { latitude: 0, longitude: 0, name: "" },
  );
  const [selectedTags, setSelectedTags] = useState<MultiSelectOption[]>(
    activity?.tags.map((tag) => ({
      value: tag._id,
      label: tag.name,
      payload: tag,
    })) || [],
  );

  const isSubmitting = navigation.state === "submitting";

  function toDateTimeLocal(isoTimestamp?: string) {
    if (!isoTimestamp) return "";

    const date = new Date(isoTimestamp);
    const dateTimeLocal = date.toISOString().slice(0, 16);

    return dateTimeLocal;
  }

  function cancelHandler() {
    navigate("..");
  }

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
        <div className="p-6 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="flex items-center justify-center text-3xl font-extrabold text-primary-blue">
              <Layers className="mr-3 h-8 w-8 text-primary-blue/80" />
              {method === "post" ? "Create New Activity" : "Edit Activity"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Fill in the details for your activity
            </p>
          </div>

          <Form method={method} className="space-y-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-1">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-2 flex items-center text-sm font-medium text-primary-blue"
                  >
                    <MapPin className="mr-2 h-5 w-5 text-primary-blue/70" />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={activity?.name || ""}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="datetime"
                    className="mb-2 flex items-center text-sm font-medium text-primary-blue"
                  >
                    <Calendar className="mr-2 h-5 w-5 text-primary-blue/70" />
                    Date
                  </label>
                  <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    defaultValue={toDateTimeLocal(activity?.datetime)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="mb-2 flex items-center text-sm font-medium text-primary-blue"
                  >
                    <DollarSign className="mr-2 h-5 w-5 text-primary-blue/70" />
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    defaultValue={activity?.price}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="mb-2 flex items-center text-sm font-medium text-primary-blue"
                  >
                    <ListChecks className="mr-2 h-5 w-5 text-primary-blue/70" />
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="specialDiscounts"
                    className="mb-2 flex items-center text-sm font-medium text-primary-blue"
                  >
                    <Tags className="mr-2 h-5 w-5 text-primary-blue/70" />
                    Special Discount
                  </label>
                  <input
                    type="number"
                    id="specialDiscounts"
                    name="specialDiscounts"
                    min="0"
                    defaultValue={activity?.specialDiscounts || 0}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div className="flex justify-center pt-8">
                  <label
                    htmlFor="isBooked"
                    className="flex cursor-pointer items-center space-x-3"
                  >
                    <input
                      type="checkbox"
                      id="isBooked"
                      name="isBooked"
                      defaultChecked={activity && !activity.bookingOpen}
                      className="h-5 w-5 rounded"
                    />
                    <span className="text-sm font-semibold text-primary-blue">
                      Is Booked
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4 w-full">
              <span className="mb-2 flex items-center text-sm font-medium text-primary-blue">
                <MapPin className="mr-2 h-5 w-5 text-primary-blue/70" />
                Location
              </span>
              <div className="mb-2 flex flex-wrap gap-2">
                <input
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  type="text"
                  id="locationLat"
                  name="locationLat"
                  value={location.latitude}
                  onChange={() => { }}
                  required
                  placeholder="Latitude"
                />
                <input
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  type="text"
                  id="locationLng"
                  name="locationLng"
                  value={location.longitude}
                  onChange={() => { }}
                  required
                  placeholder="Longitude"
                />
                <input
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  type="text"
                  id="locationName"
                  name="locationName"
                  value={location.name}
                  onChange={() => { }}
                  required
                  placeholder="Location Name"
                />
              </div>
              <Map
                defaultMark={
                  activity && {
                    lat: activity.location.latitude,
                    lng: activity.location.longitude,
                    name: activity.location.name,
                  }
                }
                onChange={(location) => {
                  setLocation({
                    latitude: location.lat,
                    longitude: location.lng,
                    name: location.name,
                  });
                }}
                className="h-96 w-full overflow-hidden rounded-lg border border-gray-300 shadow-lg"
              />
            </div>

            <div className="mb-4 w-full">
              <span className="mb-2 flex items-center text-sm font-medium text-primary-blue">
                <Tags className="mr-2 h-5 w-5 text-primary-blue/70" />
                Tags
              </span>
              <SearchMultiSelect
                options={tags.map((tag) => ({
                  value: tag._id,
                  label: tag.name,
                  payload: tag,
                }))}
                selectedItems={selectedTags}
                onSelect={(tag) => {
                  setSelectedTags((prev) => [...prev, tag]);
                }}
                onRemove={(tag) => {
                  setSelectedTags((prev) =>
                    prev.filter((t) => t.value !== tag.value),
                  );
                }}
              />
              <input
                type="hidden"
                name="tags"
                value={selectedTags.map((t) => t.value)}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={cancelHandler}
                disabled={isSubmitting}
                className="flex items-center rounded-lg bg-blue-100 px-6 py-3 text-sm font-medium text-primary-blue hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XCircle className="mr-2 h-5 w-5" />
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                className="flex items-center rounded-lg bg-primary-blue px-6 py-3 text-sm font-medium text-white hover:bg-primary-blue/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CircleCheck className="mr-2 h-5 w-5" />
                {isSubmitting ? "Submitting..." : "Save"}
              </button>
            </div>

            {data && data.message && (
              <div className="mt-4 flex items-center rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                <svg
                  className="mr-3 h-6 w-6 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                {data.message}
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ActivityForm;

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { activityId?: string };
}) {
  const method = request.method;
  const data = await request.formData();

  const activityData: unknown = {
    name: data.get("name"),
    datetime: data.get("datetime"),
    price: data.get("price"),
    location: {
      latitude: data.get("locationLat"),
      longitude: data.get("locationLng"),
      name: data.get("locationName"),
      address: data.get("locationAddress"),
    },
    category: data.get("category"),
    tags: data.getAll("tags"),
    specialDiscounts: data.get("specialDiscounts"),
    bookingOpen: data.get("isBooked") !== "on",
  };

  let url = "/activities";

  if (method === "PUT") {
    const activityId = params.activityId;
    url = `${url}/${activityId}`;
  }

  try {
    await axiosInstance({
      method: method,
      url: url,
      data: activityData,
    });

    return redirect("..");
  } catch (e) {
    console.error("Error saving activity", e);
    return { message: "Error submitting" };
  }
}

interface LoaderDataType {
  categories: CategoryType[];
  tags: TagType[];
  activity?: ActivityType;
}
export async function loader(): Promise<LoaderDataType> {
  const [categories, tags] = await Promise.all([
    axiosInstance.get<ApiResponse<{ categories: CategoryType[] }>>(
      "/categories",
    ),
    axiosInstance.get<ApiResponse<{ tags: TagType[] }>>("/tags"),
  ]);

  return {
    categories: categories.data.data.categories,
    tags: tags.data.data.tags,
  };
}

export async function editLoader({
  params,
}: LoaderFunctionArgs): Promise<LoaderDataType> {
  if (!params.activityId) {
    return {
      categories: [],
      tags: [],
    };
  }

  const [categories, tags, activity] = await Promise.all([
    axiosInstance.get<ApiResponse<{ categories: CategoryType[] }>>(
      "/categories",
    ),
    axiosInstance.get<ApiResponse<{ tags: TagType[] }>>("/tags"),
    axiosInstance.get<ApiResponse<{ activity: ActivityType }>>(
      `/activities/${params.activityId}`,
    ),
  ]);

  return {
    categories: categories.data.data.categories,
    tags: tags.data.data.tags,
    activity: activity.data.data.activity,
  };
}
