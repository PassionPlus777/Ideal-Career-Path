import React from "react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="fixed left-0 right-0 bottom-25 px-6">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={`w-2.5 h-2.5 rounded-full ${
                step <= currentStep ? "bg-[#2196f3]" : "bg-[#e3f2fd]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
