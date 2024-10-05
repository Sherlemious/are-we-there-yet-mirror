import GeneralSettings from "../components/GeneralSettings";
import Greeting from "../../shared/components/Greeting";
import { useSelector } from "react-redux";

export default function Profile() {
  const { username } = useSelector(
    (state: { user: { username: string } }) => state.user,
  );
  return (
    <div className="mx-7 my-20">
      <div className="w-fit">
        <Greeting name={username} signedIn={true} title="Profile" />
      </div>
      <GeneralSettings />
    </div>
  );
}
