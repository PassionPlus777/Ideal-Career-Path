import React from "react";

interface RandomSelectionModalProps {
  decision: string;
  onCancel: () => void;
  onView: () => void;
}

const RandomSelectionModal: React.FC<RandomSelectionModalProps> = ({
  decision,
  onCancel,
  onView,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
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
        <h2 className="text-2xl font-bold text-center mb-4">
          Random Selection
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We've selected: <span className="font-semibold">{decision}</span>
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onView}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={onCancel}
            className="text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomSelectionModal;
