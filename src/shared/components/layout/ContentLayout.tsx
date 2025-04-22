import React, { ReactNode } from "react";
import ProgressIndicator from "../../../features/career/components/ProgressIndicator";

interface ContentLayoutProps {
  imageUrl: string;
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  imageUrl,
  children,
  currentStep = 1,
  totalSteps = 4,
  leftButtonText = "Not Sure",
  rightButtonText = "Next",
  onLeftButtonClick,
  onRightButtonClick,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-4 py-8 max-w-md mx-auto w-full">
        {/* Image */}
        <img
          src={imageUrl}
          alt="Content illustration"
          className="w-full mb-4"
        />

        {/* Dynamic Content */}
        {children}
      </div>

      {/* Footer */}
      <div className="border-t-2 border-gray-200 py-2">
        <div className="max-w-md mx-auto px-6 py-6 relative">
          {/* Navigation buttons */}
          <div className="w-full flex items-center justify-between">
            <button
              onClick={onLeftButtonClick}
              className="text-[#303a6d] hover:text-[#7744EF] transition-colors font-medium cursor-pointer z-10"
            >
              {leftButtonText}
            </button>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            </div>
            <button
              onClick={onRightButtonClick}
              className="text-[#303a6d] hover:text-[#7744EF] transition-colors font-medium cursor-pointer z-10"
            >
              {rightButtonText}
            </button>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
