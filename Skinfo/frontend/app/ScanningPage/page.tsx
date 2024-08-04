'use client'
import React from 'react';
import BarcodeScanner from '../../components/Scanner';
import Image from 'next/image';
import logoImage from '../skinfocare_3.png'

const ScanningPage: React.FC = () => {
  const handleDetected = (result: string) => {
    console.log('Detected barcode:', result);
  };

  return (
    <div className="bg-custom-gradient-2 h-screen flex flex-col justify-center ">
      <div className="absolute top-0 left-0">
        <Image src={logoImage} alt="Logo" width={150} height={150} /> {/* Adjust size as needed */}
      </div>
      <BarcodeScanner onDetected={handleDetected} />
    </div>
    
  );
};

export default ScanningPage;