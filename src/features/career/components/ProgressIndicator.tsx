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
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-3">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`w-2.5 h-2.5 rounded-full ${
              step <= currentStep ? "bg-black" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
