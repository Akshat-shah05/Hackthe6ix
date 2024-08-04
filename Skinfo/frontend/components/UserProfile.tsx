'use client'
import RadarChart from '@/components/RadarChart';
import React, { useEffect } from 'react';
import Image from 'next/image';
import ListItem from './ListItem';
import GaugeGraph from './GaugeGraph';
import image from './skinfocare.png'
import { useRouter } from 'next/navigation';
import NavBar from './NavBar';

interface UserProfileProps {
  results: { [key: string]: string[] };
}

const UserProfile: React.FC<UserProfileProps> = ({ results }) => {
    const router = useRouter();
  console.log(results)
  const labels = ["Moisturizer", "Face Wash / Cleanser", "Serums", "Toners", "Sunscreen", "Physical Exfoliants", "Chemical Exfoliants"]

  const handleClick = () => {
    router.push('/ScanningPage')
  }

  return (
    <div className="text-white flex flex-col items-center w-screen h-full  overflow-x-hidden overflow-auto">
      <h1 className="mt-6 text-4xl flex flex-row justify-center"> About You </h1>
      <div className="w-screen h-full grid grid-cols-2 grid-rows-2 gap-8 p-4 bg-custom-gradient-2 pt-8 pb-32">
        <div className="border bg-white shadow-inner flex flex-col items-center rounded rounded-lg">
          <h1 className="text-2xl mt-4 text-teal-700"> Skin Type - {results["3"]} </h1>
          <Image src={image} alt="alt" width={300} height={300}/>
        </div>
        <div className="border border-white bg-white shadow-inner flex flex-col items-center rounded rounded-lg">
          <h1 className="text-2xl mt-2 text-teal-700"> Primary Skin Concerns </h1>
          <div className="w-80 h-80">
            <RadarChart results={results["4"]} />
          </div>
        </div>
        <div className="border border-white bg-white shadow-inner flex flex-col items-center rounded rounded-lg">
          <h1 className="text-2xl mt-4 mb-2 text-teal-700"> Current Products Used </h1>
          {labels.map((label, index) => {
            return <ListItem key={index} included={results[5].includes(label) ? true : false} label={label}/>
          })}
        </div>
        <div className="border border-white bg-white shadow-inner flex flex-col items-center rounded rounded-lg">
          <h1 className="text-2xl mt-4 text-teal-700"> Sun Exposure </h1>
          <div className="pulse-animation w-full h-full items-center flex flex-row justify-center"><GaugeGraph /></div>
        </div>
      </div>
      {/*<button className="flex flex-row bg-teal-900 p-4 rounded-3xl shadow-lg justify-center w-1/2 mb-4" onClick={handleClick}> Scan the products you currently use to get personalized suggestions! </button>*/}
      <NavBar />
    </div>
  );
};

export default UserProfile;
