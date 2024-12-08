import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NavBarContent } from "../utils/content";
import { descriptions } from "../utils/tut-content";

const NewTouristTut = ({
  isOpen,
  onClose,
  navLinks,
}: {
  isOpen: boolean;
  onClose: () => void;
  accountType: string;
  navLinks: NavBarContent;
}) => {
  const [currentStep, setCurrentStep] = useState(-1);

  const handleNext = () => {
    if (currentStep < navLinks.links.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const getStepContent = () => {
    if (currentStep === -1) {
      return {
        title: "Welcome to Your Journey!",
        description: `We're excited to have you join us at Are We There Yet! Let's take a quick tour of all the amazing features waiting for you. This tutorial will show you how to make the most of your Egyptian adventure, from finding activities to creating perfect itineraries. Ready to explore?`,
      };
    }

    return {
      title: navLinks.links[currentStep]?.name || "",
      description:
        descriptions.Tourist[
          navLinks.links[currentStep]?.name as keyof typeof descriptions.Tourist
        ] || "Explore this section to find more features",
    };
  };

  const { title, description } = getStepContent();
  const totalSteps = navLinks.links.length;
  const currentStepDisplay = currentStep + 2;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-1/2 top-1/2 w-[90vw] -translate-x-1/2 -translate-y-1/2 transform border-2 border-accent-gold bg-white shadow-lg sm:max-w-[500px]">
        {/* Main container with fixed height */}
        <div className="flex h-[600px] flex-col">
          {/* Header section */}
          <div className="px-6 pt-6">
            <h2 className="mb-6 text-3xl font-bold text-accent-gold">
              Welcome to Are We There Yet!
            </h2>
          </div>

          {/* Scrollable content area */}
          <div className="flex flex-1 flex-col overflow-hidden px-6">
            {/* Progress section */}
            {currentStep !== -1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg text-gray-600">
                    Step {currentStepDisplay - 1} of {totalSteps}
                  </p>
                  <button
                    onClick={onClose}
                    className="text-sm text-gray-500 transition-all duration-150 hover:text-accent-gold"
                  >
                    Skip Tutorial
                  </button>
                </div>

                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-accent-gold transition-all duration-300"
                    style={{
                      width: `${(currentStepDisplay / (totalSteps + 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Main content box - scrollable if content overflows */}
            <div className="mt-4 flex-1 overflow-y-auto">
              <div className="rounded-xl border-2 border-accent-gold/30 bg-white p-6 shadow-lg">
                <h3 className="mb-3 text-2xl font-semibold text-accent-gold">
                  {title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Fixed footer with buttons */}
          <div className="mt-auto border-t border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(-1, prev - 1))}
                className="min-w-[100px] rounded-lg border-2 border-gray-200 bg-white px-6 py-3 text-lg font-medium text-gray-700 transition-all hover:border-accent-gold hover:text-accent-gold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-700"
                disabled={currentStep === -1}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="min-w-[100px] rounded-lg bg-accent-gold px-6 py-3 text-lg font-medium text-white transition-all hover:bg-accent-dark-blue hover:text-accent-gold hover:shadow-lg"
              >
                {currentStep === navLinks.links.length - 1
                  ? "Finish"
                  : currentStep === -1
                    ? "Yes, Let's Go!"
                    : "Next"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTouristTut;
