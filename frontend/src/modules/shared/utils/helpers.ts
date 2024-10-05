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
    case "Email":
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
