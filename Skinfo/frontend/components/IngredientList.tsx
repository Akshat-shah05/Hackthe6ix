// components/IngredientsList.tsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Carousel from './Carousel';
import GaugeGraph2 from './GaugeGraph2';
import NavBar from './NavBar';
import Spinner from './Loader';

interface IngredientScore {
  score: number;
  response: string;
}

interface IngredientsData {
  ingredient_scores: Record<string, IngredientScore>;
}

const IngredientsList: React.FC = () => {
  const [ingredientsData, setIngredientsData] = useState<IngredientsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIngredients = async () => {
    
        await new Promise((resolve) => setTimeout(resolve, 5000));

      try {
        const response = await fetch('/api/getGPTData');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: IngredientsData = await response.json();
        setIngredientsData(data); // Set the ingredient data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (loading) {
    return <div className="flex flex-row h-screen justify-center items-center"><Spinner /></div>;
  }

  // Sort the ingredients by score in descending order
  const sortedIngredients = ingredientsData
    ? Object.entries(ingredientsData.ingredient_scores).sort(
        ([, { score: scoreA }], [, { score: scoreB }]) => scoreB - scoreA
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="flex flex-row justify-center text-2xl font-bold mb-6 mt-6">Ingredient Scores: "Cetaphil Moisturizer"</h1>
      <div className="pulse-animation w-full h-full mt-20 items-center flex flex-row justify-center"><GaugeGraph2 /></div>
      <h1 className="items-center flex flex-row justify-center"> Overall Score: 2.06/3.00</h1>
      <div className="mt-32">
        <Carousel>
            {sortedIngredients.map(([ingredient, { score, response }]) => (
            <Card key={ingredient} ingredient={ingredient} score={score} response={response} />
            ))}
        </Carousel>
      </div>
      <NavBar />
    </div>
  );
};

export default IngredientsList;
