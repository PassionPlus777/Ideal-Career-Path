import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../components/ProgressIndicator";
import FieldInterestStep from "../components/steps/FieldInterestStep";
import CareerPathStep from "../components/steps/CareerPathStep";

const Decision: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      setSelectedOption("");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSelectedOption("");
    }
  };

  const handleStartJourney = () => {
    navigate("/pathway");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FieldInterestStep
            selectedOption={selectedOption}
            isOpen={isOpen}
            onSelect={handleSelect}
            onToggle={() => setIsOpen(!isOpen)}
          />
        );
      case 2:
        return (
          <CareerPathStep
            selectedOption={selectedOption}
            isOpen={isOpen}
            onSelect={handleSelect}
            onToggle={() => setIsOpen(!isOpen)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {renderStep()}

      {/* Mentorship Note - Fixed position with blue background */}
      <div className="fixed left-0 right-0 bottom-30 px-6">
        {currentStep === 1 ? (
          <div className="p-4 flex items-start space-x-3">
            <span className="text-[#2196f3] text-lg transform -translate-y-0.5">
              ★
            </span>
            <div>
              <p className="text-[#2196f3] text-lg">
                Not sure of your interest?
              </p>
              <p className="text-[#2196f3] text-md mt-0.5">
                Join our mentorship program..
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 mt-8 space-y-4 space-x-3">
            <div className="flex items-start space-x-3">
              <span className="text-[#2196f3] text-lg">★</span>
              <div>
                <p className="text-[#2196f3] text-lg">
                  Not sure of your career path?
                </p>
                <p className="text-[#2196f3] text-md mt-0.5">
                  Join our mentorship program..
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-[#2196f3] text-lg">★</span>
              <div>
                <p className="text-[#2196f3] text-lg">
                  Not finding your career path?
                </p>
                <p className="text-[#2196f3] text-md mt-0.5">
                  Please share a path you're interested..
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ProgressIndicator currentStep={currentStep} totalSteps={2} />

      {/* Bottom Buttons - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#e3f2fd] border-t border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          {currentStep === 1 ? (
            <button className="w-full py-3.5 bg-[#2196f3] text-white font-medium transition-all duration-200 hover:bg-[#bbdefb] focus:outline-none focus:ring-2 focus:ring-[#2196f3] focus:ring-opacity-50">
              I Don't Know
            </button>
          ) : (
            <button
              onClick={handleBack}
              className="w-full py-3.5 bg-[#2196f3] text-white font-medium transition-all duration-200 hover:bg-[#bbdefb] focus:outline-none focus:ring-2 focus:ring-[#2196f3] focus:ring-opacity-50"
            >
              Previous
            </button>
          )}
          {currentStep === 2 ? (
            <button
              onClick={handleStartJourney}
              className="w-full py-3.5 bg-[#2196f3] text-white font-medium transition-all duration-200 hover:bg-[#1976d2] focus:outline-none focus:ring-2 focus:ring-[#2196f3] focus:ring-opacity-50"
            >
              Start Career Journey
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-[#2196f3] text-white font-medium transition-all duration-200 hover:bg-[#1976d2] focus:outline-none focus:ring-2 focus:ring-[#2196f3] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedOption}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Decision;
