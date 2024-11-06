import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

export async function requestAccountDeletion() {
  try {
    const resPromise = axiosInstance.patch(
      `/users/requestDeletion`,
    ) as Promise<unknown>;

    toast.promise(resPromise, {
      loading: "Requesting account deletion...",
      success: "Your request was successfully submitted",
      error: "An error occurred while requesting to deleting your account",
    });

    return resPromise;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
}
