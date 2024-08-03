'use client'

import Quiz from "@/components/Quiz";
import { Option, Question } from "@/types/types";

const questions: Question[] = [
    {
        id: '1',
        text: 'Age',
        options: [
          { id: 'a', label: '0-17' },
          { id: 'b', label: '18-30' },
          { id: 'c', label: '30-50' },
          { id: 'd', label: '50+' }
        ],
        multiSelect: false
      },
    {
    id: '2',
    text: 'Sex',
    options: [
        { id: 'a', label: 'Male' },
        { id: 'b', label: 'Female' },
    ],
    multiSelect: false
    },
    {
      id: '3',
      text: 'What is your skin type?',
      options: [
        { id: 'a', label: 'Dry' },
        { id: 'b', label: 'Combination' },
        { id: 'c', label: 'Oily' },
      ],
      multiSelect: false
    },
    {
      id: '4',
      text: 'What are your primary skin concerns?',
      options: [
        { id: 'a', label: 'Acne' },
        { id: 'b', label: 'Hyperpigmentation' },
        { id: 'c', label: 'Wrinkles/Fine Lines' },
        { id: 'd', label: 'Redness/Rosacea'},
        { id: 'e', label: "Dryness/Dehydration"},
        { id: 'f', label: 'Large Pores'}
      ],
      multiSelect: true
    },
    {
        id: '5',
        text: 'Current Skincare Routine - Products Used',
        options: [
          { id: 'a', label: 'Face wash / Cleanser' },
          { id: 'b', label: 'Moisturizer' },
          { id: 'c', label: 'Serums' },
          { id: 'd', label: 'Toners'},
          { id: 'e', label: "Sunscreen"},
          { id: 'f', label: 'Physical Exfoliants'},
          { id: 'g', label: 'Chemical Exfoliants'}
        ],
        multiSelect: true
      },
      {
        id: '6',
        text: 'Sun Exposure',
        options: [
          { id: 'a', label: 'Face wash / Cleanser' },
          { id: 'b', label: 'Moisturizer' },
        ],
        multiSelect: false
      },
    // Add more questions as needed
  ];

const SkinCare = () => {
    return (
        <div className="flex flex-row justify-center items-center h-screen bg-custom-gradient">
            <Quiz questions={questions} />   
        </div>
    )
}

export default SkinCare