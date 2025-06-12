
import { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';

interface ViralScoreDialProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const ViralScoreDial = ({ score = 0, size = 'md' }: ViralScoreDialProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const increment = score / 20;
    let current = 0;
    
    const updateScore = () => {
      current += increment;
      if (current < score) {
        setDisplayScore(Math.min(Math.round(current), score));
        timeout = setTimeout(updateScore, 50);
      } else {
        setDisplayScore(score);
      }
    };
    
    updateScore();
    
    return () => clearTimeout(timeout);
  }, [score]);

  const sizeClass = {
    sm: 'w-24 h-24 text-xl',
    md: 'w-32 h-32 text-2xl',
    lg: 'w-40 h-40 text-3xl'
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-red-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  // Calculate angle for the gauge dial
  const angle = (displayScore / 100) * 180;
  const rotation = -90 + angle;

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`${sizeClass[size]} relative flex flex-col items-center justify-center`}
      >
        {/* Dial background - semi-circle */}
        <div className="absolute w-full h-full rounded-full border-8 border-gray-100"></div>
        
        {/* Active gauge section */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="50%" stopColor="#ffbb33" />
              <stop offset="100%" stopColor="#33cc33" />
            </linearGradient>
          </defs>
          <path 
            d={`M 50,50 m 0,45 a 45,45 0 1,1 0,-90 a 45,45 0 1,1 0,90`} 
            fill="none" 
            stroke="url(#dialGradient)" 
            strokeWidth="8"
            strokeDasharray="282.7"
            strokeDashoffset={`${282.7 * (1 - displayScore / 100)}`}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 bg-black rounded-t-full"
          style={{
            height: '45%',
            transformOrigin: 'bottom center',
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            transition: 'transform 0.3s ease'
          }}
        >
          <div className="absolute -top-1 -left-1.5 w-4 h-4 rounded-full bg-black"></div>
        </div>
        
        {/* Score display in the middle */}
        <div className={`${getScoreColor(displayScore)} font-bold absolute bottom-10 text-center`}>
          {displayScore}
        </div>
      </div>
      <p className="mt-2 font-semibold text-sm text-eilumi-dark-gray">Viral Score</p>
    </div>
  );
};

export default ViralScoreDial;
