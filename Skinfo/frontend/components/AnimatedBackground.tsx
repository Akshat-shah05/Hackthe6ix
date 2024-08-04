const AnimatedBackground = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#66b3b3', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#3a9e9e', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#007575', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)">
            <animate attributeName="x" from="0" to="100%" dur="10s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    );
  };
  
  export default AnimatedBackground;
  