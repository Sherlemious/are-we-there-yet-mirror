import GeneralSettings from "../../shared/components/GeneralSettings";
import Greeting from "../../shared/components/Greeting";

export default function Profile() {
  return (
    <div className="mx-7 my-20 flex h-auto flex-col gap-10">
      <div className="flex justify-between">
        <Greeting name="John Doe" />
      </div>
      <GeneralSettings
        inputFields={["Name"]}
        description="
      efdjnfwivuwnviwevnwievnwivnwivnwvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvjkwnvwiovnweivunweivn
      "
      />
    </div>
  );
}
