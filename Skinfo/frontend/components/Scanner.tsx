'use client';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

interface BarcodeScannerProps {
  onDetected: (result: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected }) => {
  const [hasDetected, setHasDetected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [codeReader, setCodeReader] = useState<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    if (videoRef.current && !hasDetected) {
      const reader = new BrowserMultiFormatReader();
      setCodeReader(reader);

      reader.listVideoInputDevices()
        .then((videoInputDevices) => {
          if (videoInputDevices.length > 0) {
            const selectedDeviceId = videoInputDevices[0].deviceId;
            return reader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, error) => {
              if (result) {
                if (!hasDetected) {
                  onDetected(result.getText());
                  setHasDetected(true);
                  reader.reset();
                }
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
  }, [videoRef, hasDetected, onDetected]);

  return <video ref={videoRef} style={{ width: '100%', height: '500px' }} />;
};

export default BarcodeScanner;
