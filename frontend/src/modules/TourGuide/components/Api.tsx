import { Activity, Itinerary, Tag } from './Types';
import axiosInstance from "../../shared/services/axiosInstance";
import { CategoryType } from '@/modules/shared/types/Category.types';
import { TagType } from '@/modules/shared/types/Tag.types';
import { ApiResponse } from '@/modules/shared/types/Response.types';
import { useEffect, useState } from 'react';
import { formatDateTime } from './Helper';
import { AxiosError } from 'axios';

//const API_URL = 'https://are-we-there-yet-mirror.onrender.com/api';

// Create an Itinerary

export function useCreateMyItinerary(activities: Activity[]) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createItinerary = async (newItinerary: Partial<Itinerary>) => {
    setLoading(true);
    setError(null);

    const url = `/itineraries`;

    try {
      // Convert boolean accessibilities into object
      newItinerary.accessibility = {
        wheelchairAccessible: newItinerary.accessibilities?.wheelchairAccessible || false,
        assistiveHearingDevices: newItinerary.accessibilities?.assistiveHearingDevices || false,
        visualAidSupport: newItinerary.accessibilities?.visualAidSupport || false,
        serviceAnimalAllowed: newItinerary.accessibilities?.serviceAnimalAllowed || false,
        accessibleParking: newItinerary.accessibilities?.accessibleParking || false,
      };

      newItinerary.available_datetimes = newItinerary.availableDateTimes2;
      newItinerary.pick_up_location = {
        name: newItinerary.pickupLocation || "",
        latitude: 34.052235,
        longitude: -118.243683,
      };
      newItinerary.drop_off_location = {
        name: newItinerary.dropoffLocation || "",
        latitude: 34.052235,
        longitude: -118.243683,
      };
      const ids = newItinerary.activityIds || [];
      newItinerary.locations = activities
        .filter((activity) => ids.includes(activity._id))
        .map((activity) => activity.location);

      console.table(newItinerary);

      // Make POST request with axiosInstance
      const response = await axiosInstance.post(url, newItinerary);

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status !== 201) {
        console.error("Error:", response.data);
        throw new Error("Failed to create itinerary");
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
      }

      setLoading(false);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("Error details:", axiosError.response?.data || axiosError.message);
      setError("Failed to create itinerary");
      setLoading(false);
    }
  };

  return { createItinerary, loading, error };
}

// Get all Itineraries

export function useGetMyItineraries() {
  const [data, setData] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const url = `/itineraries/mine`;

    try {
      const response = await axiosInstance.get(url);

      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      const parsedData = response.data;
      const itineraries = parsedData.data.itineraries;

      const tempData: Itinerary[] = itineraries.map((item: any) => {
        const name = item.name ?? "N/A";
        const category = item.category ?? "N/A";
        const activities = item.activities
          ? item.activities.map((activity: Activity) => {
              return {
                duration: activity.duration ?? "N/A",
                date: activity.date ?? "N/A",
                time: activity.time ?? "N/A",
                location: activity.location ?? "N/A",
                price: activity.price ?? "N/A",
                category: activity.category ?? "N/A",
                tags: activity.tags ?? [],
                discount: activity.discount ?? "N/A",
                bookingOpen: activity.bookingOpen ?? false,
              };
            })
          : [];
        const language = item.language ?? "N/A";
        const tags = item.tags
          ? item.tags.map((tag: { name: string }) => tag.name)
          : [];
        const locations = item.locations
          ? item.locations.map((location: { name: string }) => location.name)
          : [];
        const price = item.price ?? "N/A";
        const timeline = item.timeline ?? "N/A";
        const availableDateTimes = item.available_datetimes
          ? item.available_datetimes.map((dateTime: string) => {
              return formatDateTime(dateTime);
            })
          : [];
        const accessibilities = item.accessibility ?? false;
        const pickupLocation = item.pick_up_location?.name ?? "N/A";
        const dropoffLocation = item.drop_off_location?.name ?? "N/A";
        return {
          id: item._id,
          name,
          category,
          timeline,
          tags,
          activities,
          locations,
          language,
          price,
          availableDateTimes,
          accessibilities,
          pickupLocation,
          dropoffLocation,
        };
      });

      setData(tempData);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData };
}

// Delete an Itinerary

export function useDeleteMyItinerary() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItinerary = async (itineraryId: string) => {
    setLoading(true);
    setError(null);

    const url = `/itineraries/${itineraryId}`;

    try {
      const response = await axiosInstance.delete(url);

      if (response.status !== 200) {
        throw new Error("Failed to delete itinerary");
      }

      setLoading(false);
    } catch (error) {
      setError("Failed to delete itinerary");
      setLoading(false);
    }
  };

  return { deleteItinerary, loading, error };
}

// Activate an Itinerary
export const useActivateItinerary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activateItinerary = async (itineraryId: string) => {
    setLoading(true);
    setError(null);

    const url = `/itineraries/${itineraryId}/activate`;

    try {
      const response = await axiosInstance.post(url);

      if (response.status !== 200) {
        throw new Error("Failed to activate itinerary");
      }

      setLoading(false);
    } catch (error) {
      setError("Failed to activate itinerary");
      setLoading(false);
    }
  };

  return { activateItinerary, loading, error };
};

// Deactivate an Itinerary
export const useDeactivateItinerary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deactivateItinerary = async (itineraryId: string) => {
    setLoading(true);
    setError(null);

    const url = `/itineraries/${itineraryId}/deactivate`;

    try {
      const response = await axiosInstance.post(url);

      if (response.status !== 200) {
        throw new Error("Failed to deactivate itinerary");
      }

      setLoading(false);
    } catch (error) {
      setError("Failed to deactivate itinerary");
      setLoading(false);
    }
  };

  return { deactivateItinerary, loading, error };
};

export const getTags = async (): Promise<Tag[]> => {
  try {
    const response = await axiosInstance.get<{ data: { tags: Tag[] } }>(`/tags`);
    return response.data.data.tags;
  } catch (error) {
    console.log('Error not working');
      throw new Error('Error fetching tags');
  }
};

export const getActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axiosInstance.get<{ data: Activity[] }>(`/activities`);
    return response.data.data;
  } catch (error) {
    console.log('Error not working',error);
      throw new Error('Error fetching activities');
  }
};

interface LoaderDataType {
  categories: CategoryType[];
  tags: TagType[];
  activities: Activity[];
}
export async function loader(): Promise<LoaderDataType> {
  console.log('loader');
  const [categories, tags, activities] = await Promise.all([
    axiosInstance.get<ApiResponse<{ categories: CategoryType[] }>>(
      "/categories",
    ),
    axiosInstance.get<ApiResponse<{ tags: TagType[] }>>("/tags"),
    axiosInstance.get<{ data: Activity[] }>(`/activities`),
  ]);

  return {
    categories: categories.data.data.categories,
    tags: tags.data.data.tags,
    activities: activities.data.data,
  };
}