'use client'
import RadarChart from '@/components/RadarChart';
import React, { useEffect } from 'react'
import Image from 'next/image';
import logoImage from '../skinfocare_3.png'


// src/components/GridComponent.tsx
const UserProfile = (results: any) => {
  useEffect(() => {
    console.log(results)
  })
  return (
    <>
    <div className="absolute top-0 left-0">
        <Image src={logoImage} alt="Logo" width={200} height={200} /> {/* Adjust size as needed */}
    </div>
    <div className="w-screen bg-custom-gradient-2">
      <div className="w-3/5 h-screen grid grid-cols-2 grid-rows-2 gap-8 p-4 bg-custom-gradient-2 pt-16 ">
          <div className="border border-white bg-transparent flex flex-row justify-center rounded rounded-lg" >
            <h1 className="text-3xl mt-4"> Skin Type </h1>
          </div>
          <div className="border border-white bg-transparent flex flex-col items-center rounded rounded-lg" >
            <h1 className="text-3xl mt-4"> Primary Skin Concerns </h1>
            <div className="w-50 h-50"><RadarChart results={results[3]}/></div>
          </div>
          <div className="border border-white bg-transparent flex flex-row justify-center rounded rounded-lg" >
            <h1 className="text-3xl mt-4"> Current Products Used </h1>
          </div>
          <div className="border border-white bg-transparent flex flex-row justify-center rounded rounded-lg" >
            <h1 className="text-3xl mt-4"> Sun Exposure </h1>
          </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
