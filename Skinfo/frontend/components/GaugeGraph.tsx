import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GaugeComponent with server-side rendering disabled
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

const GaugeGraph: React.FC = () => {
  return <GaugeComponent />;
};

export default GaugeGraph;
