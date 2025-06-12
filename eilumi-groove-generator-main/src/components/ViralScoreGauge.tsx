
import React, { useState, useEffect } from 'react';

interface ViralScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const ViralScoreGauge: React.FC<ViralScoreGaugeProps> = ({
  score,
  size = 'md',
  className = '',
  animated = true
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }
    
    let start = 0;
    const end = score;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [score, animated]);

  // Determine color based on score
  const getScoreColor = (value: number) => {
    if (value < 30) return 'text-red-500';
    if (value < 70) return 'text-yellow-500';
    return 'text-green-500';
  };
  
  const scoreColor = getScoreColor(displayScore);
  
  // Calculate rotation for the gauge needle
  const needleRotation = -90 + ((displayScore / 100) * 180);
  
  // Size classes
  const sizeClasses = {
    sm: 'w-32 h-16',
    md: 'w-44 h-24',
    lg: 'w-64 h-32'
  };
  
  const needleSizes = {
    sm: 'w-1 h-14',
    md: 'w-1.5 h-20',
    lg: 'w-2 h-28'
  };
  
  const fontSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        {/* Gauge background */}
        <div className="absolute inset-0 bg-gray-200 rounded-t-full overflow-hidden">
          {/* Red zone (0-30%) */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
        </div>
        
        {/* Score display */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
          <span className={`${fontSizes[size]} font-bold ${scoreColor}`}>
            {displayScore}
          </span>
        </div>
        
        {/* Gauge needle */}
        <div 
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom ${needleSizes[size]}`} 
          style={{ 
            backgroundColor: 'black',
            transform: `rotate(${needleRotation}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full" />
        </div>
      </div>
      
      <p className="mt-2 font-semibold text-sm text-eilumi-dark-gray">Viral Score</p>
    </div>
  );
};

export default ViralScoreGauge;
