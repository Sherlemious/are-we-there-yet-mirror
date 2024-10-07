import { LoaderFunctionArgs, useLoaderData } from "react-router";
import GeneralSettings from "../../shared/components/GeneralSettings";
import Greeting from "../../shared/components/Greeting";
import Slider from "../../shared/components/Slider";
import { fieldNames } from "../../shared/constants/inputNames";
import { getUser } from "../../shared/services/apiGetUserInfo";

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
  hotline: string;
  website: string;
  company_profile: string[];
};

export default function Profile() {
  const loaderData = useLoaderData() as {
    data: { user: User };
    message: string;
  };

  const user = loaderData.data.user;
  const {
    username,
    account_type,
    hotline,
    website,
    _id: id,
    company_profile,
  } = user;

  return (
    <div className="mx-7 my-20 flex h-auto flex-col gap-10">
      <div className="flex justify-between">
        <Greeting name={username} signedIn={true} title="Profile" />
        <GeneralSettings
          account_type={account_type}
          hotline={hotline}
          website={website}
          inputFields={[fieldNames.hotline, fieldNames.link]}
        />
      </div>
      <Slider
        title="Company Profile"
        id={id}
        array={company_profile}
        account_type={account_type}
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
