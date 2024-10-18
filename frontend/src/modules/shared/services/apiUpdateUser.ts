import { userRoles } from "../constants/roles";
import toast from "react-hot-toast";
import { fieldNames } from "../constants/inputNames";
import {
  isValidateMobileNumber,
  validateFormDataValue,
} from "../../Register/utils/helpers";
import { isValidateHotline } from "../utils/helpers";
import axiosInstance from "./axiosInstance";

export async function updateUser(
  id: string,
  data: { [key: string]: FormDataEntryValue },
) {
  if (
    data[fieldNames.mobileNumber] &&
    !isValidateMobileNumber(data[fieldNames.mobileNumber])
  ) {
    return toast.error("Invalid mobile number");
  }

  if (
    data.email &&
    validateFormDataValue(fieldNames.email, data.email as string) === false
  ) {
    return toast.error("Invalid email address");
  }

  if (
    data.password &&
    validateFormDataValue(fieldNames.password, data.password as string) ===
      false
  ) {
    return toast.error(
      "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
    );
  }

  if (
    data[fieldNames.hotline] &&
    !isValidateHotline(data[fieldNames.hotline])
  ) {
    return toast.error("Invalid hotline number");
  }

  const keys = prepareData(data, data["account_type"]);

  if (!keys) {
    return;
  }

  try {
    const resPromise = axiosInstance.patch(`/users/${id}`, keys);
    toast.promise(
      resPromise,
      {
        loading: "Updating user...",
        success: "User updated",
        error: "Failed to update user",
      },
      {
        style: {
          minWidth: "250px",
          display: "absolute",
          backgroundColor: "white",
        },
      },
    );

    return await resPromise;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

function prepareData(
  data: { [key: string]: FormDataEntryValue },
  account_type: FormDataEntryValue,
) {
  const keys: { [key: string]: FormDataEntryValue } = {};

  if (account_type === userRoles.tourist) {
    if (data["username"]) {
      keys["username"] = data["username"];
    }
    if (data["email"]) {
      keys["email"] = data["email"];
    }
    if (data["password"]) {
      keys["password"] = data["password"];
    }
    if (data["date of Birth"]) {
      keys["dob"] = data["date of Birth"];
    }
    if (data["occupation"]) {
      keys["job"] = data["occupation"];
    }
    if (data["mobile number"]) {
      keys["mobile_number"] = data["mobile number"];
    }

    if (data["nationality"]) {
      keys["nationality"] = data["nationality"];
    }
    if (data["wallet"]) {
      keys["wallet"] = data["wallet"];
    }

    return keys;
  }

  if (account_type === userRoles.tourGuide) {
    if (data["email"]) {
      keys["email"] = data["email"];
    }
    if (data["password"]) {
      keys["password"] = data["password"];
    }
    if (data["mobile number"]) {
      {
        keys["mobile_number"] = data["mobile number"];
      }
    }

    if (data["years of experience"]) {
      keys["years_of_experience"] = data["years of experience"];
    }
    return keys;
  }

  if (account_type === userRoles.seller) {
    if (data["email"]) {
      keys["email"] = data["email"];
    }
    if (data["password"]) {
      keys["password"] = data["password"];
    }
    if (data["description"]) {
      keys["description"] = data["description"];
    }

    if (data["name"]) {
      keys["username"] = data["name"];
    }
    return keys;
  }

  if (account_type === userRoles.advertiser) {
    if (data["email"]) {
      keys["email"] = data["email"];
    }
    if (data["password"]) {
      keys["password"] = data["password"];
    }
    if (data[fieldNames.hotline]) {
      keys["hotline"] = data[fieldNames.hotline];
    }

    if (data["link"]) {
      keys["website"] = data["link"];
    }
    return keys;
  }
  return;
}
