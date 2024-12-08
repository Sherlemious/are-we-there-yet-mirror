import { type ItineraryPostType } from "./Types";
import axiosInstance from "../../shared/services/axiosInstance";
import { CategoryType } from "@/modules/shared/types/Category.types";
import { TagType } from "@/modules/shared/types/Tag.types";
import { ApiResponse } from "@/modules/shared/types/Response.types";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import type { ItineraryType } from "@/modules/shared/types/Itinerary.types";
import type { ActivityType } from "@/modules/shared/types/Activity.types";

// Create an Itinerary
export function useCreateMyItinerary() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createItinerary = async (newItinerary: ItineraryPostType) => {
    setLoading(true);
    setError(null);

    const url = `/itineraries`;

    try {
      console.table(newItinerary);

      // Make POST request with axiosInstance
      const response = await axiosInstance.post(url, newItinerary);

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status !== 201) {
        console.error("Error:", response.data);
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
        throw new Error("Failed to create itinerary");
      }

      setLoading(false);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error(
        "Error details:",
        axiosError.response?.data || axiosError.message,
      );
      setError("Failed to create itinerary");
      setLoading(false);
    }
  };

  return { createItinerary, loading, error };
}

// Get all Itineraries

export function useGetMyItineraries() {
  const [data, setData] = useState<ItineraryType[]>([]);
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

      setData(itineraries);
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

export function useUpdateMyItinerary() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateItinerary = async (
    itineraryId: string,
    updatedItinerary: Partial<ItineraryPostType>,
  ) => {
    setLoading(true);
    setError(null);

    const url = `/itineraries/${itineraryId}`;

    try {
      const response = await axiosInstance.put(url, updatedItinerary);

      if (response.status !== 200) {
        throw new Error("Failed to delete itinerary");
      }

      setLoading(false);
    } catch (error) {
      setError("Failed to delete itinerary");
      setLoading(false);
    }
  };

  return { updateItinerary, loading, error };
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
      const response = await axiosInstance.patch(url);

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
      const response = await axiosInstance.patch(url);

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

export const getTags = async (): Promise<TagType[]> => {
  try {
    const response = await axiosInstance.get<{ data: { tags: TagType[] } }>(
      `/tags`,
    );
    return response.data.data.tags;
  } catch (error) {
    console.log("Error not working");
    throw new Error("Error fetching tags");
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
    throw new Error("Error fetching activities");
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
