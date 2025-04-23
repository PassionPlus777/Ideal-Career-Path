import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLayout from "../../../shared/components/layout/ContentLayout";
import QuestionContent from "../components/QuestionContent";
import RandomSelectionModal from "../components/RandomSelectionModal";
import { careerQuestions } from "../constants/questions";

const Decision: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomDecision, setRandomDecision] = useState("");

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
    // Generate a random career decision
    const randomCareers = careerQuestions[currentQuestionIndex].options;
    const randomCareer =
      randomCareers[Math.floor(Math.random() * randomCareers.length)].name;
    setRandomDecision(randomCareer);
    setShowRandomModal(true);
  };

  const handleCancel = () => {
    setShowRandomModal(false);
  };

  const handleView = () => {
    setShowRandomModal(false);
    handleNext();
  };

  const handleOptionChange = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  return (
    <>
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
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedOption={answers[currentQuestion.id] || -1}
          onOptionChange={handleOptionChange}
        />
      </ContentLayout>
      {showRandomModal && (
        <RandomSelectionModal
          decision={randomDecision}
          onCancel={handleCancel}
          onView={handleView}
        />
      )}
    </>
  );
};

export default Decision;
