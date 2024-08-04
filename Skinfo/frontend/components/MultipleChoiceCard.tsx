'use client'
import React, { useState, useEffect } from 'react';
import { Option } from '../../frontend/types/types';

interface MultipleChoiceCardProps {
  questionText: string;
  options: Option[];
  multiSelect: boolean;
  onSelect: (selectedIds: string[]) => void;
  selectedOptions: string[]; // Add selectedOptions prop
}

const MultipleChoiceCard: React.FC<MultipleChoiceCardProps> = ({ questionText, options, multiSelect, onSelect, selectedOptions }) => {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<string[]>(selectedOptions);

  const handleOptionChange = (optionId: string) => {
    if (multiSelect) {
      const newSelection = localSelectedOptions.includes(optionId)
        ? localSelectedOptions.filter(id => id !== optionId)
        : [...localSelectedOptions, optionId];
      setLocalSelectedOptions(newSelection);
      onSelect(newSelection); // Call onSelect directly
    } else {
      setLocalSelectedOptions([optionId]);
      onSelect([optionId]); // Call onSelect directly
    }
  };

  useEffect(() => {
    setLocalSelectedOptions(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="card p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{questionText}</h3>
      <div className="options">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option p-2 mb-2 border rounded cursor-pointer ${
              selectedOptions.includes(option.id) ? 'text-white bg-teal-700 border-teal-700' : 'bg-transparent'
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
