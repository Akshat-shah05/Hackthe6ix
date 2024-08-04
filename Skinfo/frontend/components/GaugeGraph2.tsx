import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GaugeComponent with server-side rendering disabled
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

const GaugeGraph2: React.FC = () => {
  return (
    <div className="pulse"> {/* Adjust width and height as needed */}
      <GaugeComponent
        type="semicircle"
        arc={{
          colorArray: ['red', 'green'],
          padding: 0.02,
          subArcs: [
            { limit: 1 },
            { limit: 2 },
            { limit: 3 },
            {},
            {},
            {},
            {}
          ]
        }
      }
        pointer={{ type: "blob", animationDelay: 0 }}
        value={2.06/3 * 100}
      />
    </div>
  );
};

export default GaugeGraph2;
