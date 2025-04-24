import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLayout from "../../../shared/components/layout/ContentLayout";
import QuestionContent from "../components/QuestionContent";
import RandomSelectionModal from "../components/RandomSelectionModal";
import ComingSoonModal from "../components/ComingSoonModal";
import { careerQuestions } from "../constants/questions";

const Decision: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomDecision, setRandomDecision] = useState("");
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const currentQuestion = careerQuestions[currentQuestionIndex];
  const totalQuestions = careerQuestions.length;

  const handleNext = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      setShowComingSoonModal(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
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

  const handleSubscribe = () => {
    // TODO: Implement subscription logic
    console.log("User subscribed to feature notification");
    setShowComingSoonModal(false);
  };

  const handleCloseComingSoon = () => {
    setShowComingSoonModal(false);
  };

  const handleMaybeLater = () => {
    setShowComingSoonModal(false);
    navigate("/pathway");
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
          currentQuestionIndex === totalQuestions - 1 ? "Decide" : "Next"
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
      {showComingSoonModal && (
        <ComingSoonModal
          onSubscribe={handleSubscribe}
          onClose={handleCloseComingSoon}
          onMaybeLater={handleMaybeLater}
        />
      )}
    </>
  );
};

export default Decision;
