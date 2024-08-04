// components/Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
      <h1> Gathering personalized data... </h1>
    </div>
  );
};

export default Spinner;
