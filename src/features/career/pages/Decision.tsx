import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLayout from "../../../shared/components/layout/ContentLayout";
import QuestionContent from "../components/QuestionContent";
import { careerQuestions } from "../constants/questions";

const Decision: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = careerQuestions[currentQuestionIndex];
  const totalQuestions = careerQuestions.length;

  const handleNext = () => {
    navigate("/pathway");
    setCurrentQuestionIndex(0);
    // if (currentQuestionIndex < totalQuestions - 1) {
    //   setCurrentQuestionIndex((prev) => prev + 1);
    // } else {
    //   // Handle completion - navigate to results page
    //   navigate("/pathway");
    // }
  };

  const handleNotSure = () => {
    // Set "I'd rather not say" or similar option
    const lastOptionId =
      currentQuestion.options[currentQuestion.options.length - 1].id;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: lastOptionId,
    }));
    handleNext();
  };

  const handleOptionChange = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  return (
    <ContentLayout
      imageUrl={currentQuestion.imageUrl}
      currentStep={currentQuestionIndex + 1}
      totalSteps={totalQuestions}
      onLeftButtonClick={handleNotSure}
      onRightButtonClick={handleNext}
      rightButtonText={
        currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"
      }
    >
      <QuestionContent
        // questionNumber={currentQuestionIndex + 1}
        // totalQuestions={totalQuestions}
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedOption={answers[currentQuestion.id] || -1}
        onOptionChange={handleOptionChange}
      />
    </ContentLayout>
  );
};

export default Decision;
