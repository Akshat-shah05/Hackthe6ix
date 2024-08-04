'use client'

import Quiz from "@/components/Quiz";
import { Option, Question } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GridComponent from "../UserProfile/page";

const questions: Question[] = [
    {
        id: '1',
        text: 'Age',
        options: [
          { id: '0-17', label: '0-17' },
          { id: '18-30', label: '18-30' },
          { id: '30-50', label: '30-50' },
          { id: '50+', label: '50+' }
        ],
        multiSelect: false
      },
    {
    id: '2',
    text: 'Sex',
    options: [
        { id: 'Male', label: 'Male' },
        { id: 'Female', label: 'Female' },
    ],
    multiSelect: false
    },
    {
      id: '3',
      text: 'What is your skin type?',
      options: [
        { id: 'Dry', label: 'Dry' },
        { id: 'Combination', label: 'Combination' },
        { id: 'Oily', label: 'Oily' },
      ],
      multiSelect: false
    },
    {
      id: '4',
      text: 'What are your primary skin concerns?',
      options: [
        { id: 'Acne', label: 'Acne' },
        { id: 'Hyperpigmentation', label: 'Hyperpigmentation' },
        { id: 'Wrinkles/Fine Lines', label: 'Wrinkles/Fine Lines' },
        { id: 'Redness/Rosacea', label: 'Redness/Rosacea'},
        { id: 'Dryness/Dehydration', label: "Dryness/Dehydration"},
        { id: 'Large Pores', label: 'Large Pores'}
      ],
      multiSelect: true
    },
    {
        id: '5',
        text: 'Current Skincare Routine - Products Used',
        options: [
          { id: 'Face wash / Cleanser', label: 'Face wash / Cleanser' },
          { id: 'Moisturizer', label: 'Moisturizer' },
          { id: 'Serums', label: 'Serums' },
          { id: 'Toners', label: 'Toners'},
          { id: 'Sunscreen', label: "Sunscreen"},
          { id: 'Physical Exfoliants', label: 'Physical Exfoliants'},
          { id: 'Chemical Exfoliants', label: 'Chemical Exfoliants'}
        ],
        multiSelect: true
      },
      {
        id: '6',
        text: 'Sun Exposure',
        options: [
          { id: 'Mild (< 1 hour per day)', label: 'Mild (< 1 hour per day)' },
          { id: 'Moderate (1 - 3 hours per day)', label: 'Moderate (1 - 3 hours per day)' },
          { id: 'High (> 3 hours per day)', label: 'High (> 3 hours per day)'}
        ],
        multiSelect: false
      },
    // Add more questions as needed
  ];

const SkinCare = () => {
    const router = useRouter();
    const [results, setResults] = useState<any[]>([])
    const [complete, setComplete] = useState<boolean>(false)

    useEffect(() => {
        console.log(results)
    }, [results])
    useEffect(() => {
        if (complete) {
            router.push('/UserProfile')
        }
    })
    return (
        (!complete ? <div className="flex flex-row justify-center items-center h-screen bg-custom-gradient-2">
            <Quiz questions={questions} setResult={setResults} setComplete={setComplete}/>   
        </div> : <GridComponent results={results}/>)
    )
}

export default SkinCare