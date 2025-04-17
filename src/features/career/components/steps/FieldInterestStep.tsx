import React from "react";
import SelectDropdown from "../SelectDropdown";

interface FieldInterestStepProps {
  selectedOption: string;
  isOpen: boolean;
  onSelect: (option: string) => void;
  onToggle: () => void;
}

const FieldInterestStep: React.FC<FieldInterestStepProps> = ({
  selectedOption,
  isOpen,
  onSelect,
  onToggle,
}) => {
  const options = [
    "Business",
    "Technology",
    "Healthcare",
    "Education",
    "Arts & Design",
    "Engineering",
  ];

  return (
    <div className="flex-1 px-6 pt-8">
      <div className="border-b border-[#2196f3] pb-3">
        <h2 className="text-[#2196f3] text-lg font-semibold tracking-tight">
          What field/sector interests you?
        </h2>
      </div>

      <SelectDropdown
        options={options}
        selectedOption={selectedOption}
        isOpen={isOpen}
        onSelect={onSelect}
        onToggle={onToggle}
      />
    </div>
  );
};

export default FieldInterestStep;
