import axiosInstance from "@/modules/shared/services/axiosInstance";

export async function handleUserLogin(data: {
  [k: string]: FormDataEntryValue;
}) {
  const resPromise = axiosInstance.post("/auth/login", {
    email: data.email,
    password: data.password,
  });

  return resPromise;
}
