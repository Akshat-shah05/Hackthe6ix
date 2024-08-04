// src/components/Quiz.tsx
'use client'
import React, { useState } from 'react';
import MultipleChoiceCard from './MultipleChoiceCard';
//import { Question } from '@/types/types';
import { Option, Question } from '../../frontend/types/types';
import { useRouter } from 'next/navigation';

interface QuizProps {
  questions: Question[];
  setResult: any;
  setComplete: any;
}

interface Result {
  questionId: string;
  selectedOptions: string[];
}

const Quiz: React.FC<QuizProps> = ({ questions, setResult, setComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const router = useRouter();

  const handleOptionSelect = (newSelectedIds: string[]) => {
    setSelectedOptions(newSelectedIds);
    console.log(newSelectedIds)
  };

  const handleNext = () => {
    // Save the selected options for the current question
    setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults[currentQuestionIndex] = {
        questionId: questions[currentQuestionIndex].id,
        selectedOptions: selectedOptions,
      };
      return updatedResults;
    });

    if (currentQuestionIndex < questions.length - 1) {
      // Move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      // Clear the selected options for the next question
      setSelectedOptions([]);
    } else {
      // Navigate to /Scan on completion
      const updatedResults = [...results];
      updatedResults[currentQuestionIndex] = {
        questionId: questions[currentQuestionIndex].id,
        selectedOptions: selectedOptions,
      };
      setResult(updatedResults)
      setComplete(true)
      //router.push('/Scan');
    }
  };

  const handlePrevious = () => {
    // Move to the previous question
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex >= 0 ? newIndex : 0;
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 w-1/3">
      {currentQuestion ? (
        <>
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
        </>
      ) : (
        <div className="text-lg font-semibold">
          Quiz Completed! Here are your results:
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Quiz;
