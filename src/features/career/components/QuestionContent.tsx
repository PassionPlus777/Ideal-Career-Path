import React from "react";

interface Option {
  id: number;
  name: string;
}

interface QuestionContentProps {
  questionNumber?: number;
  totalQuestions?: number;
  question: string;
  options: Option[];
  selectedOption: number;
  onOptionChange: (value: number) => void;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <>
      <div className="w-full mb-6">
        {questionNumber && totalQuestions && (
          <div className="text-[#170062ff] font-mono font-bold mb-2">
            Question {questionNumber} of {totalQuestions}
          </div>
        )}
        <h2 className="text-2xl font-bold font-mono">{question}</h2>
      </div>
      <div className="w-full">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="radio"
              name="question-option"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={(e) => onOptionChange(Number(e.target.value))}
              className="w-5 h-5 !border-[#170062ff] !accent-[#170062ff] focus:ring-[#170062ff] !border-[#170062ff] cursor-pointer"
            />
            <span className="font-sans">{option.name}</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default QuestionContent;
