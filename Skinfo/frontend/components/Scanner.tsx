'use client';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import AnimatedBackground from './AnimatedBackground';

interface BarcodeScannerProps {
  onDetected: (result: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [codeReader, setCodeReader] = useState<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    if (videoRef.current && isScanning) {
      const reader = new BrowserMultiFormatReader();
      setCodeReader(reader);

      reader.listVideoInputDevices()
        .then((videoInputDevices) => {
          if (videoInputDevices.length > 0) {
            const selectedDeviceId = videoInputDevices[0].deviceId;
            return reader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, error) => {
              if (result) {
                const barcode = result.getText();
                onDetected(barcode);
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 2000); // Hide the popup after 2 seconds
              }
              if (error && !(error instanceof NotFoundException)) {
                console.error(error);
              }
            });
          } else {
            console.error('No video input devices found.');
          }
        })
        .catch((error) => {
          console.error('Error listing video input devices:', error);
        });

      return () => {
        if (reader) {
          reader.reset();
        }
      };
    }
  }, [videoRef, isScanning, onDetected]);

  const handleDoneClick = () => {
    if (codeReader) {
      codeReader.reset();
    }
    onClose();
    setIsScanning(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <AnimatedBackground />
      <h1 className="text-4xl pb-8"> Scan the barcode of each product you currently use </h1>
      <video ref={videoRef} style={{ width: '100%', height: '500px', borderRadius: '50px' }} />
      {showPopup && (
        <div style={popupStyle}>
          Barcode scanned successfully
        </div>
      )}
      <button onClick={handleDoneClick} className="border p-8 mt-2 w-1/3 rounded rounded-lg">Complete Scanning Get Results</button>
    </div>
  );
};

// Inline styles for the popup
const popupStyle: React.CSSProperties = {
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(144, 238, 144, 0.75)',
  color: 'white',
  padding: '20px',
  borderRadius: '10px',
  zIndex: 1000,
};

export default BarcodeScanner;
