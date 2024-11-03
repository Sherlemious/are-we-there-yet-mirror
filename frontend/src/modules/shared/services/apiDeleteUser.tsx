import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

export async function deleteUser(id: string) {
  try {
    const resPromise = axiosInstance.delete(`/users/${id}`) as Promise<unknown>;

    toast.promise(resPromise, {
      loading: "Deleting account...",
      success: "Account deleted successfully",
      error: "An error occurred while deleting your account",
    });

    return resPromise;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
}
