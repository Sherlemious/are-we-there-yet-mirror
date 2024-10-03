import GeneralSettings from "../../shared/components/GeneralSettings";
import Greeting from "../../shared/components/Greeting";
import Slider from "../../shared/components/Slider";

export default function Profile() {
  return (
    <div className="mx-7 my-20 flex h-auto flex-col gap-10">
      <div className="flex justify-between">
        <Greeting name="John Doe" />
        <GeneralSettings inputFields={["Hotline", "Link"]} />
        {/* <GeneralSettings inputFields={['Name']} /> */}
      </div>
      <Slider title="Company Profile" />
    </div>
  );
}
