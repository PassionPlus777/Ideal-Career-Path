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
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-lg w-full m-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-[28px] font-bold mb-6 leading-tight">
            Random Selection
          </h2>
          <p className="text-[17px] leading-[1.3] text-gray-900 mb-6">
            Here is a random career for you to take a peak at:{" "}
            <span className="font-bold">{decision}</span>
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 text-[17px] font-medium text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onView}
              className="px-6 py-2 text-[17px] font-medium text-white bg-[#007bff] hover:bg-[#0056b3] rounded-xl transition-colors cursor-pointer"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomSelectionModal;
