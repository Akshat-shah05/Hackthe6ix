'use client'
import React, { useState } from 'react'
import './animations.css';
import { useRouter } from 'next/navigation';
import SketchfabEmbed from '@/components/3dIntroModel';
import IntroModel from '@/components/3dIntroModel';
import mypng from './pngskincare.png' 
import Image from 'next/image';
import ParticlesBackground from '@/components/Particles';

const HomePage = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      router.push('/SkinQuiz'); // Adjust the route as needed
    }, 450); // Duration matches the CSS animation duration
  };
  
  return (
    <main className="w-screen h-screen bg-custom-gradient">
      <ParticlesBackground />
      <div className={`fixed bottom-0 left-0 right-0 bg-white bg-opacity-30 p-4 rounded-t-3xl shadow-lg flex flex-col items-center h-2/5 ${
          isAnimating ? 'expand-animation' : ''}`}
      >
        <span className="mt-4 text-6xl font-light">Get Started</span>
        <p className="mt-2 text-md font-thin">Click the button below to scan the </p>
        <p className="text-md font-thin">ingredient list on your skin care product</p>
        <div className="flex justify-center">
          <button className="pulse-animation mt-16 text-white p-2 rounded-full focus:outline-none text-2xl justify-center" onClick={handleClick}>
            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1" fill="none"/>
              <path d="M8 12h8M12 8l4 4-4 4" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  )
}

export default HomePage