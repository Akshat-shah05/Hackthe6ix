// src/components/MultipleChoiceCard.tsx

import React, { useState, useEffect } from 'react';
//import { Option } from '@/types/types'; no need to push
import { Option } from '../../frontend/types/types';

interface MultipleChoiceCardProps {
  questionText: string;
  options: Option[];
  multiSelect: boolean;
  onSelect: (selectedIds: string[]) => void;
}

const MultipleChoiceCard: React.FC<MultipleChoiceCardProps> = ({ questionText, options, multiSelect, onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions, onSelect]);

  const handleOptionChange = (optionId: string) => {
    if (multiSelect) {
      setSelectedOptions((prevSelected) => {
        const newSelection = prevSelected.includes(optionId)
          ? prevSelected.filter(id => id !== optionId)
          : [...prevSelected, optionId];
        return newSelection;
      });
    } else {
      setSelectedOptions([optionId]);
    }
  };

  return (
    <div className="card p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{questionText}</h3>
      <div className="options">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option p-2 mb-2 border rounded cursor-pointer ${
              selectedOptions.includes(option.id) ? ' text-blue-500 bg-white rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-transparent'
            }`}
            onClick={() => handleOptionChange(option.id)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceCard;
