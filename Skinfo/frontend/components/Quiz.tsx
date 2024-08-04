'use client'
import React, { useState, useEffect } from 'react';
import MultipleChoiceCard from './MultipleChoiceCard';
import { Question } from '@/types/types';
import { useUser } from '@auth0/nextjs-auth0/client';
import UserProfile from '@/components/UserProfile';
import NavBar from './NavBar';

interface QuizProps {
  questions: Question[];
  setResult: (results: Result[]) => void;
  setComplete: (complete: boolean) => void;
}

interface Result {
  questionId: string;
  selectedOptions: string[];
}

const Quiz: React.FC<QuizProps> = ({ questions, setResult, setComplete }) => {
  const { user, error, isLoading } = useUser();
  console.log(user?.sid);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<{ [key: string]: string[] }>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      setResult(Object.entries(results).map(([questionId, selectedOptions]) => ({ questionId, selectedOptions })));
      setComplete(true);
    }
  }, [currentQuestionIndex, questions.length, results, setComplete, setResult]);

  useEffect(() => {
    // Reset the selected options when the current question index changes
    setSelectedOptions(results[questions[currentQuestionIndex]?.id] || []);
  }, [currentQuestionIndex, results, questions]);

  const handleOptionSelect = (newSelectedIds: string[]) => {
    setSelectedOptions(newSelectedIds);
  };

  const handleNext = () => {
    // Save the selected options for the current question
    const updatedResults = { ...results, [questions[currentQuestionIndex].id]: selectedOptions };
    setResults(updatedResults);

    if (currentQuestionIndex < questions.length - 1) {
      // Move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // On completion, trigger the useEffect to finalize results
      console.log(updatedResults);
      setCurrentQuestionIndex(questions.length);
    }
  };

  const handlePrevious = () => {
    // Move to the previous question
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {currentQuestionIndex < questions.length ? (
        <>
        <div className="p-4 w-1/3">
          <MultipleChoiceCard
            questionText={currentQuestion.text}
            options={currentQuestion.options}
            multiSelect={currentQuestion.multiSelect}
            onSelect={handleOptionSelect}
          />
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-transparent border border-white text-white rounded disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === questions.length - 1
                  ? 'bg-green-500'
                  : 'bg-transparent'
              } border border-white text-white disabled:opacity-50`}
              onClick={handleNext}
              disabled={selectedOptions.length === 0}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
          </div>
        </>
      ) : (
        <div className="h-screen w-screen flex flex-row justify-center overflow-hidden">
          <div className="flex flex-col">
            <UserProfile results={results} />
            <NavBar />
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
