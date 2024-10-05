import validator from "validator";
import { fieldNames } from "../../shared/constants/inputNames";

export function validateFormDataValue(
  inputField: string,
  value: string,
): boolean {
  switch (inputField) {
    case fieldNames.mobileNumber:
      // Add validation logic for mobile number
      break;
    case fieldNames.email:
      if (
        value.split("@")[1].split(".")[0] !== "gmail" &&
        value.split("@")[1].split(".")[0] !== "yahoo" &&
        value.split("@")[1].split(".")[0] !== "hotmail" &&
        value.split("@")[1].split(".")[0] !== "outlook"
      )
        return false;
      return true;
    case fieldNames.password:
      if (
        !validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      )
        return false;
      return true;
    case fieldNames.link:
      // Add validation logic for link
      break;
    case fieldNames.yearsOfExperience:
      // Add validation logic for years of experience
      break;
    case fieldNames.hotline:
      // Add validation logic for hotline
      break;
    case fieldNames.dateOfBirth:
      // Add validation logic for date of birth
      break;
    default:
      // Add default validation logic
      break;
  }
  return true; // Return true if validation passes, otherwise return false
}
