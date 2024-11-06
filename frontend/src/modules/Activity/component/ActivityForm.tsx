import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
  type FormMethod,
  useLoaderData,
  LoaderFunctionArgs,
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

function ActivityForm({ method }: { method: FormMethod }) {
  const data = useActionData() as { message?: string };
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { categories, tags, activity } = useLoaderData() as LoaderDataType;
  const [location, setLocation] = useState(
    activity?.location || { latitude: 0, longitude: 0, name: "" },
  );
  const [selectedTags, setSelectedTags] = useState<MultiSelectOption[]>([]);

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
    <Form method={method} className="h-full w-full rounded-lg p-6 shadow-md">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 block font-semibold text-primary-blue"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={activity?.name || ""}
          required
          className="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="datetime"
          className="mb-2 block font-semibold text-primary-blue"
        >
          Date
        </label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          defaultValue={toDateTimeLocal(activity?.datetime)}
          required
          className="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="price"
          className="mb-2 block font-semibold text-primary-blue"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          defaultValue={activity?.price}
          required
          className="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="mb-4 h-full w-full">
        <span className="mb-2 block font-semibold text-primary-blue">
          Location
        </span>
        <div className="mb-2 flex gap-2">
          <input
            className="w-1/3 rounded-md border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            id="locationLat"
            name="locationLat"
            value={location.latitude}
            onChange={() => {}}
            required
            placeholder="Latitude"
          />
          <input
            className="w-1/3 rounded-md border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            id="locationLng"
            name="locationLng"
            value={location.longitude}
            onChange={() => {}}
            required
            placeholder="Longitude"
          />
          <input
            className="w-1/3 rounded-md border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            id="locationName"
            name="locationName"
            value={location.name}
            onChange={() => {}}
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
          className="h-96 w-full overflow-hidden rounded-lg border bg-gray-300"
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
          className="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 w-full">
        <span className="mb-2 block w-full font-semibold text-primary-blue">
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

      <div className="mb-4">
        <label
          htmlFor="specialDiscounts"
          className="mb-2 block font-semibold text-primary-blue"
        >
          Special Discount
        </label>
        <input
          type="number"
          id="specialDiscounts"
          name="specialDiscounts"
          min="0"
          defaultValue={activity?.specialDiscounts || 0}
          required
          className="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="isBooked" className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isBooked"
            name="isBooked"
            defaultChecked={activity && !activity.bookingOpen}
            className="form-checkbox h-5 w-5 text-gray-600"
          />
          <span className="font-semibold text-primary-blue">Is Booked</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          disabled={isSubmitting}
          className="rounded-md bg-accent-dark-blue px-4 py-2 text-white hover:bg-accent-dark-blue/80 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
        <button
          type="button"
          onClick={cancelHandler}
          disabled={isSubmitting}
          className="rounded-md bg-secondary-light_grey px-4 py-2 text-primary-blue hover:bg-secondary-light_grey/80 focus:outline-none focus:ring-2 focus:ring-secondary-light_grey focus:ring-opacity-50 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
      {data && data.message && (
        <p className="mb-4 text-red-500">{data.message}</p>
      )}
    </Form>
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

    return redirect("/activity");
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
