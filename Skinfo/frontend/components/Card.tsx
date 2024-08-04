// components/Card.tsx
import React from 'react';

interface CardProps {
  ingredient: string;
  score: number;
  response: string;
}

const Card: React.FC<CardProps> = ({ ingredient, score, response }) => {
  // Determine the background color based on the score
  const getScoreColor = (score: number) => {
    if (score === 3) return 'text-green-500'; // Good
    if (score === 2) return 'text-yellow-500'; // Neutral
    return 'text-red-500'; // Bad
  };

  return (
    <div className={`border rounded shadow-md h-full flex flex-col p-4 m-4 bg-white ${getScoreColor(score)}`}>
      <h2 className="text-lg font-semibold">{ingredient}</h2>
      <p className={`text-sm font-bold mb-16 ${getScoreColor(score)}`}>{`Score: ${score}`}</p>
      {response.length > 4 && (
        <p className={`text-sm text-white ${getScoreColor(score)}`}>{response}</p>
      )}
    </div>
  );
};

export default Card;
