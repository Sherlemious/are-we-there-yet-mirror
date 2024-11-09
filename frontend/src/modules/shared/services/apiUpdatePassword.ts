import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

export async function updatePassword(password: string) {
  const promise = axiosInstance.patch("/users/changePassword", {
    password,
  });

  toast.promise(promise, {
    loading: "Updating password...",
    success: "Password updated successfully",
    error: "Failed to update password",
  });

  const res = await promise;

  return res;
}
