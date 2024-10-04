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
