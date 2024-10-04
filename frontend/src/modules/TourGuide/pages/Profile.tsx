import GeneralSettings from "../../shared/components/GeneralSettings";
import Greeting from "../../shared/components/Greeting";
import Slider from "../../shared/components/Slider";
import { fieldNames } from "../../shared/constants/inputNames";

export default function Profile() {
  return (
    <div className="mx-7 my-20 flex h-auto flex-col gap-10">
      <div className="flex justify-between">
        <Greeting name="John Doe" signedIn={true} title={"Profile"} />
        <GeneralSettings
          inputFields={[fieldNames.mobileNumber, fieldNames.yearsOfExperience]}
        />
      </div>
      <Slider title="Previous Works" />
    </div>
  );
}
