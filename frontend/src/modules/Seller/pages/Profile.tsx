import { fieldNames } from "../../shared/constants/inputNames";
import { useContext } from "react";
import { UserContext } from "@/modules/shared/store/user-context";
import NewProf from "@/modules/shared/components/NewProf";
import { updateUser } from "@/modules/shared/services/apiUpdateUser";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <NewProf
      accountTypeNeededInAPICall
      endpoint={updateUser}
      fieldsIncludeNationality={false}
      APICallFields={[
        fieldNames.username,
        fieldNames.email,
        fieldNames.password,
        fieldNames.description,
      ]}
      mappingNeeded
      initialFormValues={{
        Username: user.username || "",
        Email: user.email || "",
        Password: "",
        Description: user.description || "",
      }}
    />
  );
}
