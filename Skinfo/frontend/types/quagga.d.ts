declare module 'quagga' {
    export interface Quagga {
      init(config: any, callback: (err: any) => void): void;
      start(): void;
      stop(): void;
      decodeSingle(config: any, callback: (result: any) => void): void;
      onDetected(callback: (result: any) => void): void;
    }
  
    const Quagga: Quagga;
    export default Quagga;
  }
  