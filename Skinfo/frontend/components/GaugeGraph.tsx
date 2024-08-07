import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GaugeComponent with server-side rendering disabled
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

const GaugeGraph: React.FC = () => {
  return (
    <div className="pulse"> {/* Adjust width and height as needed */}
      <GaugeComponent
        type="semicircle"
        arc={{
          colorArray: ['orange', 'red'],
          padding: 0.02,
          subArcs: [
            { limit: 40 },
            { limit: 60 },
            { limit: 70 },
            {},
            {},
            {},
            {}
          ]
        }
      }
        pointer={{ type: "blob", animationDelay: 0 }}
        value={50}
      />
    </div>
  );
};

export default GaugeGraph;
