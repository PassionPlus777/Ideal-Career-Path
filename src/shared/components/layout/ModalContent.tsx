import React, { ReactNode } from "react";

interface ModalContentProps {
  imageUrl: string;
  children: ReactNode;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  onClose?: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
  imageUrl,
  children,
  leftButtonText = "Not Sure",
  rightButtonText = "Next",
  onLeftButtonClick,
  onRightButtonClick,
  onClose,
}) => {
  return (
    <div className="flex flex-col bg-white relative">
      {/* Close button */}
      {onClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center max-w-md mx-auto w-full">
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
              className="text-gray-800 hover:text-blue-500 transition-colors font-medium cursor-pointer z-10"
            >
              {leftButtonText}
            </button>
            <button
              onClick={onRightButtonClick}
              className="text-gray-800 hover:text-blue-500 transition-colors font-medium cursor-pointer z-10"
            >
              {rightButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
