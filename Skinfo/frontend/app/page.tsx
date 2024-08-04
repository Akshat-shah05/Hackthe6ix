'use client'
import React, { useEffect, useState } from 'react'
import './animations.css';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';


const HomePage = () => {
  const {user, error, isLoading} = useUser()
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      router.push('/api/auth/login'); // Adjust the route as needed
    }, 550); // Duration matches the CSS animation duration
  };

  const Logout = () => {
    router.push('/api/auth/logout')
  }

  useEffect(() => {
    if (user) {
      router.push('/SkinQuiz')
    }
  })
  
  return (
    <main className="w-screen h-screen bg-teal-700">
      <button onClick={Logout} className="flex items-center justify-center p-2 bg-teal-700 hover:bg-teal-800 text-white rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
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