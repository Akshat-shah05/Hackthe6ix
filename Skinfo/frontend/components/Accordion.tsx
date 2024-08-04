// components/Accordion.tsx
import React, { useState } from 'react';

interface AccordionProps {
  ingredient: string;
  score: number;
  response: string;
}

const Accordion: React.FC<AccordionProps> = ({ ingredient, score, response }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    // Only toggle if response length is 4 or more
    if (response.length >= 4) {
      setIsOpen(!isOpen);
    }
  };

  // Determine the color based on the score
  const getScoreColor = (score: number) => {
    if (score >= 3) return 'bg-green-700'; // Good
    if (score === 2) return 'bg-yellow-600'; // Neutral
    return 'bg-red-700'; // Bad
  };

  return (
    <div className="mb-4 border border-gray-300 rounded">
      <div
        className={`flex justify-between items-center p-4 cursor-pointer ${getScoreColor(score)}`}
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold">{ingredient}</h2>
        <span className="font-bold">{score}</span>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-100">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
