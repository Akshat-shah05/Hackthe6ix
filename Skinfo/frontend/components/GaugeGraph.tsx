import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GaugeComponent with server-side rendering disabled
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

const GaugeGraph: React.FC = () => {
  return <GaugeComponent
  type = "semicircle"
  arc={{
    colorArray: ['blue', '#FF2121'],
    padding: 0.02,
    subArcs:
      [
        { limit: 40 },
        { limit: 60 },
        { limit: 70 },
        {},
        {},
        {},
        {}
      ]
  }}
  pointer={{type: "blob", animationDelay: 0}}
  value={50}
/>;
};

export default GaugeGraph;
