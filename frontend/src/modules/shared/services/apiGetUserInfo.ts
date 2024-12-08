import axiosInstance from "./axiosInstance";

export async function getUser(id: string) {
  try {
    const resPromise = axiosInstance.get(`/users/${id}`);

    return await resPromise;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}
