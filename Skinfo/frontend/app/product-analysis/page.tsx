// app/page.tsx
'use client'
import IngredientsList from "@/components/IngredientList";

const Home: React.FC = () => {
  return (
    <div className="h-screen bg-custom-gradient-2">
      <IngredientsList />
    </div>
  );
};

export default Home;
