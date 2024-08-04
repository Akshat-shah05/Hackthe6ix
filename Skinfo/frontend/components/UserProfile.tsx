'use client'
import RadarChart from '@/components/RadarChart';
import React, { useEffect } from 'react';
import Image from 'next/image';
import image from './dryskin.png'

interface UserProfileProps {
  results: { [key: string]: string[] };
}

const UserProfile: React.FC<UserProfileProps> = ({ results }) => {
  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div className="w-screen h-full bg-custom-gradient-2 overflow-y-hidden overflow-x-hidden overflow-auto">
      <div className="w-screen h-full grid grid-cols-2 grid-rows-2 gap-8 p-4 bg-custom-gradient-2 pt-8 pb-20">
        <div className="border border-white bg-transparent flex flex-col items-center rounded rounded-lg">
          <h1 className="text-3xl mt-4 mb-8"> Skin Type </h1>
          <Image src={image} alt="Description" width={250} height={250} />
        </div>
        <div className="border border-white bg-transparent flex flex-col items-center rounded rounded-lg">
          <h1 className="text-3xl mt-4 mb-8"> Primary Skin Concerns </h1>
          <div className="w-100 h-100">
            <RadarChart results={results["4"]} />
          </div>
        </div>
        <div className="border border-white bg-transparent flex flex-row justify-center rounded rounded-lg">
          <h1 className="text-3xl mt-4"> Current Products Used </h1>
        </div>
        <div className="border border-white bg-transparent flex flex-row justify-center rounded rounded-lg">
          <h1 className="text-3xl mt-4"> Sun Exposure </h1>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
