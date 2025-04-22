import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-4 text-xl font-semibold text-blue-600">
          Loading...
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Please wait while we prepare your experience
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
