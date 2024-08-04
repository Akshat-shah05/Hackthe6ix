'use client'
import React, { useEffect, useState } from 'react';
import './animations.css';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import scanImage from '../app/Scan.png';
import Image from 'next/image';
import logoImage from './skinfocare_3.png'

const HomePage = () => {
  const { user, error, isLoading } = useUser();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true); // New state to control image visibility
  const router = useRouter();

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsImageVisible(false); // Set image visibility to false after the animation
      router.push('/api/auth/login'); // Adjust the route as needed
    }, 550); // Duration matches the CSS animation duration
  };

  const Logout = () => {
    router.push('/api/auth/logout');
  }

  useEffect(() => {
    if (user) {
      router.push('/SkinQuiz');
    }
  }, [user, router]);

  return (
    <main className="w-screen h-screen bg-teal-700">
      <div className="absolute top-0 left-0">
        <Image src={logoImage} alt="Logo" width={200} height={200} /> {/* Adjust size as needed */}
      </div>
      <div className="flex w-full flex-row justify-center">
        {isImageVisible && ( // Conditional rendering based on image visibility
          <Image 
            src={scanImage} 
            alt="Scan" 
            style={{ opacity: isAnimating ? 0 : 1, transition: 'opacity 0.5s' }} 
          />
        )}
      </div>

      <div className={`fixed bottom-0 left-0 right-0 bg-white bg-opacity-30 p-4 rounded-t-3xl shadow-lg flex flex-col items-center h-2/5 ${
          isAnimating ? 'expand-animation' : ''}`}
      >
        <span className="mt-4 text-6xl font-light">Welcome to SkinfoCare</span>
        <p className="mt-2 text-md font-thin">Simply scan the ingredient list on your skin care product to get personalized recommendations</p>
        <p className="mt-2 text-md font-thin"> First let's get you onboarded with a quick quiz! </p>
        <p className="text-md font-thin"></p>
        <div className="flex justify-center">
          <button className="pulse-animation mt-8 text-white p-2 rounded-full focus:outline-none text-2xl justify-center" onClick={handleClick}>
            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1" fill="none"/>
              <path d="M8 12h8M12 8l4 4-4 4" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;


     {/* <button onClick={Logout} className="flex items-center justify-center p-2 bg-teal-700 hover:bg-teal-800 text-white rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button> */}