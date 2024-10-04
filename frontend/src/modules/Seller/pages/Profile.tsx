import { CircleUserRound } from "lucide-react";
import GeneralSettings from "../../shared/components/GeneralSettings";
import Greeting from "../../shared/components/Greeting";
import { fieldNames } from "../../shared/constants/inputNames";

export default function Profile() {
  return (
    <div className="mx-7 my-20 flex h-auto flex-col gap-10">
      <div className="flex justify-between">
        <Greeting name="John Doe" signedIn={true} title="Profile" />
        <CircleUserRound size={300} color="#d1d5db" strokeWidth={1.25} />
      </div>
      <GeneralSettings
        inputFields={[fieldNames.name]}
        description="
      efdjnfwivuwnviwevnwievnwivnwivnwvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvjkwnvwiovnweivunweivn
      "
      />
    </div>
  );
}
