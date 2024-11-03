import { LoaderFunctionArgs } from "react-router";

import { getUser } from "../../shared/services/apiGetUserInfo";
import { useContext } from "react";
import { UserContext } from "@/modules/shared/store/user-context";
import NewProf from "@/modules/shared/components/NewProf";
import { updateUser } from "@/modules/shared/services/apiUpdateUser";
import { fieldNames } from "@/modules/shared/constants/inputNames";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <NewProf
      accountTypeNeededInAPICall={true}
      endpoint={updateUser}
      fieldsIncludeNationality={true}
      APICallFields={[
        fieldNames.mobileNumber,
        fieldNames.yearsOfExperience,
        fieldNames.email,
        fieldNames.password,
      ]}
      mappingNeeded
      initialFormValues={{
        MobileNumber: user.mobile_number || "",
        YearsOfExperience: user.years_of_experience?.toString() || "",
        Email: user.email || "",
        Password: "",
      }}
    />
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Error("User ID is required");
  }

  const res = await getUser(params.id);

  const data = res.data;

  return data;
}
