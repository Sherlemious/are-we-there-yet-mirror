import axios from "axios";

export async function getUser(id: string) {
  try {
    const resPromise = axios.get(
      `https://are-we-there-yet-mirror.onrender.com/api/users/${id}`,
    );

    return await resPromise;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}
