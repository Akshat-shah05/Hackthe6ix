'use client'
import React from 'react';
import BarcodeScanner from '../../components/Scanner';

const ScanningPage: React.FC = () => {
  const handleDetected = (result: string) => {
    console.log('Detected barcode:', result);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <BarcodeScanner onDetected={handleDetected} />
    </div>
  );
};

export default ScanningPage;