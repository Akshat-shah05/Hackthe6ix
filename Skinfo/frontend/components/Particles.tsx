// components/ParticlesBackground.tsx
import React from 'react';
import Particles from 'react-tsparticles';

const ParticlesBackground: React.FC = () => {
  return (
    <div className="h-full">
        <Particles
        id="tsparticles"
        options={{
            background: {
            color: {
                value: "transparent", // Set background to transparent
            },
            },
            particles: {
            color: {
                value: "#ffffff", // White particles
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                default: "out",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                enable: true,
                area: 800,
                },
                value: 100,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
            },
            interactivity: {
            detectsOn: "canvas",
            events: {
                onClick: {
                enable: true,
                mode: "push",
                },
                onHover: {
                enable: true,
                mode: "repulse",
                },
                resize: true,
            },
            },
            retina_detect: true,
        }}
        />
    </div>
  );
};

export default ParticlesBackground;
