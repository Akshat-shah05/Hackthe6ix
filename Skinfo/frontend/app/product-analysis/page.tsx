// app/page.tsx
'use client'
import IngredientsList from "@/components/IngredientList";

const Home: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-custom-gradient-2 overflow-x-hidden">
      <IngredientsList />
    </div>
  );
};

export default Home;
