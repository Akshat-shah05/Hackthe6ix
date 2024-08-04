'use client'
import React, { useState } from 'react';
import BarcodeScanner from '../../components/Scanner';
import Image from 'next/image';
import logoImage from '../skinfocare_3.png';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Loader';

const ScanningPage: React.FC = () => {
  const router = useRouter()
  const [barcodes, setBarcodes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);

  const handleDetected = (result: string) => {
    console.log('Detected barcode:', result);
    setBarcodes((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add(result);
      return newSet;
    });
  };

  const onClose = async () => {
    console.log('Barcodes:', Array.from(barcodes));
    router.push('/product-analysis')
  };

  return (
    <div className="bg-custom-gradient-2 h-screen flex flex-col justify-center ">
      <div className="absolute top-0 left-0">
        <Image src={logoImage} alt="Logo" width={150} height={150} /> {/* Adjust size as needed */}
      </div>
      <BarcodeScanner onDetected={handleDetected} onClose={onClose} />
      {loading && <Spinner />}
    </div>
  );
};

export default ScanningPage;
