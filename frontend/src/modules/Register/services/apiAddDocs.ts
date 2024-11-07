import axiosInstance from "@/modules/shared/services/axiosInstance";
import toast from "react-hot-toast";

export async function apiAddDocs(formData: FormData) {
  const attachmentsPromise = axiosInstance.post("/attachments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  toast.promise(
    attachmentsPromise,
    {
      loading: "Uploading Document...",
      success: "Document Uploaded Successfully",
      error: "Failed to upload",
    },
    {
      success: {
        duration: 500,
      },
    },
  );

  const res = await attachmentsPromise;
  return res;
}
