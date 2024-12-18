import { type ItineraryPostType } from "./Types";
import axiosInstance from "../../shared/services/axiosInstance";
import { CategoryType } from "@/modules/shared/types/Category.types";
import { TagType } from "@/modules/shared/types/Tag.types";
import { ApiResponse } from "@/modules/shared/types/Response.types";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import type { ItineraryType } from "@/modules/shared/types/Itinerary.types";
import type { ActivityType } from "@/modules/shared/types/Activity.types";
import toast from "react-hot-toast";

// Create an Itinerary
export function useCreateMyItinerary() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createItinerary = async (newItinerary: ItineraryPostType) => {
    setSuccess(null);
    setError(null);

    const url = `/itineraries`;

    try {
      console.table(newItinerary);

      // Make POST request with axiosInstance
      const response = await axiosInstance.post(url, newItinerary);
      setSuccess("Successfully created itinerary");
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error(
        "Error details:",
        axiosError.response?.data || axiosError.message,
      );
      setError("Failed to create itinerary");
      ;
    }
  };

  return { createItinerary, success, error };
}

// Get all Itineraries

export function useGetMyItineraries() {
  const [data, setData] = useState<ItineraryType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const url = `/itineraries/mine`;

    try {
      const response = await axiosInstance.get(url);

      const parsedData = response.data;
      const itineraries = parsedData.data.itineraries;

      setData(itineraries);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, fetchData };
}

export function useUpdateMyItinerary() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateItinerary = async (
    itineraryId: string,
    updatedItinerary: Partial<ItineraryPostType>,
  ) => {
    setSuccess(null);
    setError(null);

    const url = `/itineraries/${itineraryId}`;

    try {
      const response = await axiosInstance.put(url, updatedItinerary);
      setSuccess("Successfully updated itinerary");
    } catch (error) {
      setError("Failed to update itinerary");
      ;
    }
  };

  return { updateItinerary, success, error };
}

// Delete an Itinerary

export function useDeleteMyItinerary() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deleteItinerary = async (itineraryId: string) => {
    setSuccess(null);
    setError(null);

    const url = `/itineraries/${itineraryId}`;

    try {
      const response = await axiosInstance.delete(url);
      setSuccess("Successfully deleted itinerary");
    } catch (error) {
      setError("Failed to delete itinerary");
      ;
    }
  };

  return { deleteItinerary, success, error };
}

// Activate an Itinerary
export const useActivateItinerary = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activateItinerary = async (itineraryId: string) => {
    setSuccess(null);
    setError(null);

    const url = `/itineraries/${itineraryId}/activate`;

    try {
      const response = await axiosInstance.patch(url);



      setSuccess("Successfully activated itinerary");
    } catch (error) {
      setError("Failed to activate itinerary");
      ;
    }
  };

  return { activateItinerary, success, error };
};

// Deactivate an Itinerary
export const useDeactivateItinerary = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deactivateItinerary = async (itineraryId: string) => {
    setSuccess(null);
    setError(null);

    const url = `/itineraries/${itineraryId}/deactivate`;

    try {
      const response = await axiosInstance.patch(url);
      setSuccess("Successfully deactivated itinerary");
    } catch (error) {
      setError("Failed to deactivate itinerary");
      ;
    }
  };

  return { deactivateItinerary, success, error };
};

export const getTags = async (): Promise<TagType[]> => {
  try {
    const response = await axiosInstance.get<{ data: { tags: TagType[] } }>(
      `/tags`,
    );
    return response.data.data.tags;
  } catch (error) {
    console.log("Error not working");
    toast.error("Error fetching tags");
  }
};

export const getActivities = async (): Promise<ActivityType[]> => {
  try {
    const response = await axiosInstance.get<{ data: ActivityType[] }>(
      `/activities`,
    );
    return response.data.data;
  } catch (error) {
    console.log("Error not working", error);
    toast.error("Error fetching activities");
  }
};

interface LoaderDataType {
  categories: CategoryType[];
  tags: TagType[];
  activities: Activity[];
}
export async function loader(): Promise<LoaderDataType> {
  console.log("loader");
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
