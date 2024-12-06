import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NavBarContent } from "../utils/content";
import { X } from "lucide-react"; // Import X icon for close button

const NavBarTutorial = ({
  isOpen,
  onClose,
  accountType,
  navLinks,
}: {
  isOpen: boolean;
  onClose: () => void;
  accountType: string;
  navLinks: NavBarContent;
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const descriptions = {
    Activities: "Browse and book exciting activities and tours across Egypt",
    "Historical Places":
      "Explore Egypt's rich history through its museums and monuments",
    Itineraries:
      "Find or create perfect travel plans for your Egyptian adventure",
    "My Activities": "Manage and track all your booked activities in one place",
    "My Museums": "View your saved historical places and museum visits",
    "My Itineraries": "Access and edit your custom travel itineraries",
    "Manage Activities": "Create and update activity listings for tourists",
    "Manage Museums":
      "Oversee and update museum and historical site information",
    Dashboard: "Access your admin controls and overview",
    Profile: "View and edit your account settings",
    Complaints: "Submit or manage any issues you encounter",
  };

  const filteredLinks =
    navLinks?.links?.filter((item) => {
      if (item.list) {
        return true;
      }
      return item.name !== "Home";
    }) || [];

  const handleNext = () => {
    if (currentStep < filteredLinks.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-1/2 top-1/2 w-[90vw] -translate-x-1/2 -translate-y-1/2 transform border-2 border-accent-gold bg-white p-6 shadow-lg sm:max-w-[500px]">
        <div className="p-6">
          {/* Header */}
          <h2 className="mb-6 text-3xl font-bold text-accent-gold">
            Welcome to Are We There Yet!
          </h2>

          <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between">
              <p className="text-lg text-gray-600">
                Step {currentStep + 1} of {filteredLinks.length}
              </p>
              <button
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-accent-gold"
              >
                Skip Tutorial
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-accent-gold transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / filteredLinks.length) * 100}%`,
                }}
              />
            </div>

            {/* Content Box */}
            <div className="min-h-[120px] rounded-xl border-2 border-accent-gold/30 bg-white p-6 shadow-lg">
              <h3 className="mb-3 text-2xl font-semibold text-accent-gold">
                {filteredLinks[currentStep]?.name}
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {descriptions[filteredLinks[currentStep]?.name] ||
                  "Explore this section to find more features"}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                className="min-w-[100px] rounded-lg border-2 border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:border-accent-gold hover:text-accent-gold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-700"
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="min-w-[100px] rounded-lg bg-accent-gold px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-dark-blue hover:shadow-lg"
              >
                {currentStep === filteredLinks.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavBarTutorial;
