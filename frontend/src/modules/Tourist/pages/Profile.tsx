import GeneralSettings from "../components/GeneralSettings";
import Greeting from "../../shared/components/Greeting";
import { useLoaderData } from "react-router";
import { getUser } from "../../shared/services/apiGetUserInfo";
import { LoaderFunctionArgs } from "react-router";

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
  job: string;
  nationality: string;
  dob: string;
  wallet: string;
};

export default function Profile() {
  const loaderData = useLoaderData() as {
    user: { data: { user: User } };
    countries: { name: { common: string } }[];
  };

  const user = loaderData.user;
  const {
    username,
    email,
    password,
    job,
    account_type,
    nationality,
    mobile_number,
    dob,
    wallet,
  } = user.data.user;

  const countries = loaderData.countries;

  return (
    <div className="mx-7 my-20">
      <div className="w-fit">
        <Greeting name={username} signedIn={true} title="Profile" />
      </div>
      <GeneralSettings
        wallet={wallet}
        mobileNumber={mobile_number}
        dob={dob}
        username={username}
        email={email}
        password={password}
        job={job}
        account_type={account_type}
        userNationality={nationality}
        countries={countries}
      />
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Error("User ID is required");
  }
  const userRes = await getUser(params.id);
  const userData = userRes.data;

  const countriesResponse = await fetch(`https://restcountries.com/v3.1/all`);
  const countriesData = await countriesResponse.json();

  const data = {
    user: userData,
    countries: countriesData,
  };

  return data;
}
