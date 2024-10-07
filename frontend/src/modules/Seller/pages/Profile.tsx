import { CircleUserRound } from "lucide-react";
import GeneralSettings from "../../shared/components/GeneralSettings";
import Greeting from "../../shared/components/Greeting";
import { fieldNames } from "../../shared/constants/inputNames";
import { getUser } from "../../shared/services/apiGetUserInfo";
import { LoaderFunctionArgs, useLoaderData } from "react-router";

type User = {
  accepted: boolean;
  account_type: string;
  createdAt: string;
  email: string;
  password: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
  mobile_number: string;
  years_of_experience: number;
  description: string;
};

export default function Profile() {
  const loaderData = useLoaderData() as {
    data: { user: User };
    message: string;
  };

  const user = loaderData.data.user;
  const { username, account_type, description, password, email } = user;

  return (
    <div className="mx-7 my-20 flex h-auto flex-col gap-10">
      <div className="flex justify-between">
        <Greeting name={username} signedIn={true} title="Profile" />
        <CircleUserRound size={300} color="#d1d5db" strokeWidth={1.25} />
      </div>
      <GeneralSettings
        name={username}
        email={email}
        password={password}
        account_type={account_type}
        inputFields={[fieldNames.name]}
        description={description}
      />
    </div>
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
