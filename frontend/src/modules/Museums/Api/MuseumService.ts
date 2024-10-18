import axios from "axios";
import { Museum } from "../types/museum";
import axiosInstance from "../../shared/services/axiosInstance";

const API_URL = "https://are-we-there-yet-mirror.onrender.com/api";

export const createMuseum = async (
  museumData: Omit<Museum, "_id">,
): Promise<Museum> => {
  try {
    const response = await axios.post<{ data: { museum: Museum } }>(
      `${API_URL}/museums`,
      museumData,
    );
    return response.data.data.museum;
  } catch (error) {
    console.log("Error not working");
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error creating museum");
    } else {
      throw new Error("Error creating museum");
    }
  }
};

export const deleteMuseum = async (museumId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/museums/${museumId}`);
  } catch (error) {
    console.log("Error not working");
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error deleting museum");
    } else {
      throw new Error("Error deleting museum");
    }
  }
};

export const updateMuseum = async (
  museumId: string,
  museumData: Museum,
): Promise<Museum> => {
  try {
    const response = await axios.put<{ data: { museum: Museum } }>(
      `${API_URL}/museums/${museumId}`,
      museumData,
    );
    return response.data.data.museum;
  } catch (error) {
    console.log("Error not working");
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error updating museum");
    } else {
      throw new Error("Error updating museum");
    }
  }
};

export const getMuseums = async (): Promise<Museum[]> => {
  try {
    const response = await axiosInstance.get<{ data: { museums: Museum[] } }>(
      `${API_URL}/museums/mine`,
    );
    return response.data.data.museums;
  } catch (error) {
    console.log("Error not working");
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error fetching museum");
    } else {
      throw new Error("Error fetching museum");
    }
  }
};
