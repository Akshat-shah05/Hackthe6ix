'use client'
import React from 'react';
import GaugeGraphcomp from '../../components/GaugeGraph';
import NavBar from '../../components/NavBar';

const AnalysisPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 flex items-center justify-center p-4">
        <GaugeGraphcomp />
      </main>
    </div>
  );
};

export default AnalysisPage;
