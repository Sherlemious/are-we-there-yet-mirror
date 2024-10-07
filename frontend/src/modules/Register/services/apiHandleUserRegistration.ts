import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

// Generic function for handling form submission, API request, and redirect
export async function handleUserRegistration({
  url,
  requestData,
  successRedirect,
}: {
  url: string;
  requestData: object;
  successRedirect: string;
}) {
  try {
    const resPromise = axios.post(url, requestData);

    toast.promise(
      resPromise,
      {
        loading: "Creating account...",
        success: "Account created successfully",
        error: (err) => {
          if (
            err.response?.data?.message.includes("duplicate key error") &&
            err.response?.data?.message.includes("email")
          ) {
            return "Email already exists";
          }
          if (
            err.response?.data?.message.includes("duplicate key error") &&
            err.response?.data?.message.includes("username")
          ) {
            return "Username already exists";
          }
          return "An error occurred";
        },
      },
      {
        style: {
          display: "absolute",
        },
        success: {
          duration: 2000,
        },
      },
    );

    const res = await resPromise;

    // Check if the response is successful and perform the redirect
    if (res.status === 200) {
      return redirect(`${successRedirect}/${res.data.data.user._id}`); // Redirect to the specified route
    }
  } catch (error) {
    console.error("Request failed:", error);
  }

  return null;
}
