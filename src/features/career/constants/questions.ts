export interface QuestionOption {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  question: string;
  imageUrl: string;
  options: QuestionOption[];
}

export const careerQuestions: Question[] = [
  {
    id: 1,
    question: "What is your career choice of interest?",
    imageUrl: "/images/icons/choose.png",
    options: [
      { id: 1, name: "Software Development" },
      { id: 2, name: "Data Science" },
      { id: 3, name: "Cybersecurity" },
      { id: 4, name: "AI/Machine Learning" },
      { id: 5, name: "I'd rather not say" },
    ],
  },
  {
    id: 2,
    question: "What's your current employment status?",
    imageUrl: "/images/icons/work.png",
    options: [
      { id: 1, name: "Full-time employed" },
      { id: 2, name: "Part-time employed" },
      { id: 3, name: "Self-employed" },
      { id: 4, name: "Student" },
      { id: 5, name: "Unemployed" },
    ],
  },
  {
    id: 3,
    question: "What's your preferred work environment?",
    imageUrl: "/images/icons/environment.png",
    options: [
      { id: 1, name: "Office" },
      { id: 2, name: "Remote" },
      { id: 3, name: "Hybrid" },
      { id: 4, name: "No preference" },
    ],
  },
  {
    id: 4,
    question: "What's your experience level in your field?",
    imageUrl: "/images/icons/experience.png",
    options: [
      { id: 1, name: "Entry level" },
      { id: 2, name: "Mid level" },
      { id: 3, name: "Senior level" },
      { id: 4, name: "Expert/Lead" },
    ],
  },
];
