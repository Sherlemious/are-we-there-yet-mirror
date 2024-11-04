import { useLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router";
import NewProf from "../../shared/components/NewProf";
import { updateUser } from "@/modules/shared/services/apiUpdateUser";
import { fieldNames } from "@/modules/shared/constants/inputNames";
import { UserContext } from "@/modules/shared/store/user-context";
import { useContext } from "react";

export default function Profile() {
  const loaderData = useLoaderData() as {
    countries: { name: { common: string } }[];
  };
  const countries = loaderData.countries.sort();

  const { user } = useContext(UserContext);

  return (
    <NewProf
      countries={countries}
      accountTypeNeededInAPICall={true}
      endpoint={updateUser}
      fieldsIncludeNationality={true}
      APICallFields={[
        fieldNames.dateOfBirth,
        fieldNames.wallet,
        fieldNames.mobileNumber,
        fieldNames.occupation,
        fieldNames.email,
        fieldNames.nationality,
        fieldNames.password,
      ]}
      mappingNeeded
      initialFormValues={{
        "Date of Birth": user.dob?.slice(0, 10) || "",
        Wallet: user.wallet === undefined ? "" : user.wallet?.toString(),
        Mobile: user.mobile_number || "",
        Occupation: user.job || "",
        Email: user.email || "",
        Nationality: user.nationality || "",
        Password: "",
      }}
    />
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Error("User ID is required");
  }

  const countriesResponse = await fetch(`https://restcountries.com/v3.1/all`);
  const countriesData = await countriesResponse.json();

  const data = {
    countries: countriesData,
  };

  return data;
}
