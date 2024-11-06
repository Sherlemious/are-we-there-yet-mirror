import axiosInstance from "@/modules/shared/services/axiosInstance";

export async function apiGetTermsAndConditions() {
  try {
    const response = await axiosInstance.get("termsAndConditions");

    return response.data.data.terms;
  } catch (error) {
    console.error(error);
    return "";
  }
}
