import React from "react";

interface SelectDropdownProps {
  options: string[];
  selectedOption: string;
  isOpen: boolean;
  onSelect: (option: string) => void;
  onToggle: () => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  selectedOption,
  isOpen,
  onSelect,
  onToggle,
}) => {
  return (
    <div className="mt-6 relative w-full">
      <button
        onClick={onToggle}
        className="w-full bg-[#e3f2fd] text-[#2196f3] p-4 rounded-xl flex items-center justify-between transition-all duration-200 hover:bg-[#bbdefb] focus:outline-none focus:ring-2 focus:ring-[#2196f3] focus:ring-opacity-50"
      >
        <span className="font-medium">
          {selectedOption || "Select an option"}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10 transition-all duration-200">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`w-full text-left px-4 py-3.5 text-[#2196f3] hover:bg-[#e3f2fd] transition-colors duration-150
                ${
                  index !== options.length - 1 ? "border-b border-gray-50" : ""
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
