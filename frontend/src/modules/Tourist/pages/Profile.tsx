import GeneralSettings from "../components/GeneralSettings";
import Greeting from "../../shared/components/Greeting";
import { fieldNames } from "../../shared/constants/inputNames";

export default function Profile() {
  return (
    <div className="mx-7 my-20">
      <div className="w-fit">
        <Greeting name="John Schmo" signedIn={true} title="Profile" />
      </div>
      <GeneralSettings />
    </div>
  );
}
