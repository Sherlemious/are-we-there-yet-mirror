import { fieldNames } from "../constants/inputNames";

export function getPlaceholder(inputField: string) {
  switch (inputField) {
    case fieldNames.mobileNumber:
      return "+20 1234542009";
    case fieldNames.yearsOfExperience:
      return "5 years";
    case fieldNames.hotline:
      return "16555";
    case fieldNames.link:
      return "Professional.example.com";
    case fieldNames.name:
      return "Jane Doe";
    case fieldNames.wallet:
      return "Enter wallet number";
    default:
      return "Enter your " + inputField;
  }
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getType(inputField: string) {
  switch (inputField) {
    case fieldNames.mobileNumber:
      return "tel";
    case fieldNames.email:
      return "email";
    case fieldNames.password:
      return "password";
    case fieldNames.link:
      return "url";
    case fieldNames.yearsOfExperience:
      return "number";
    case fieldNames.hotline:
      return "tel";
    case fieldNames.dateOfBirth:
      return "date";
    default:
      return "text";
  }
}

export function isValidateHotline(hotline: FormDataEntryValue) {
  // Validate if hotline contains only digits and is of valid length (e.g., 3 to 5 digits)
  const isValidFormat = typeof hotline === "string" && /^\d+$/.test(hotline);

  // Check if hotline length is between 3 and 5 digits (adjust this based on your requirements)
  const isValidLength =
    typeof hotline === "string" && hotline.length >= 3 && hotline.length <= 5;

  return isValidFormat && isValidLength;
}
