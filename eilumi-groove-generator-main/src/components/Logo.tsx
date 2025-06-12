
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showTagline?: boolean;
  centered?: boolean;
  iconOnly?: boolean;
  compact?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  showText = true, 
  showTagline = false,
  centered = false,
  iconOnly = false,
  compact = false
}) => {
  const sizeMap = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-24 w-24', // Increased from h-20 w-20
  };

  const textSizeMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const taglineMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  if (iconOnly) {
    return (
      <div className={`flex ${className}`}>
        <img 
          src="/lovable-uploads/49ded806-212d-43a7-a6b3-77afbca42bb7.png" 
          alt="Eilumi AI Logo" 
          className={`${sizeMap[size]}`}
        />
      </div>
    );
  }

  return (
    <div className={`flex ${centered ? 'flex-col items-center' : 'items-center'} ${className}`}>
      <div className={`flex ${centered ? 'flex-col items-center' : 'flex items-center'} ${compact ? 'gap-1' : 'gap-2'}`}>
        <img 
          src="/lovable-uploads/49ded806-212d-43a7-a6b3-77afbca42bb7.png" 
          alt="Eilumi AI Logo" 
          className={`${sizeMap[size]}`}
        />
        
        {showText && (
          <h1 className={`font-poppins font-bold text-eilumi-black ${centered ? 'mt-4' : ''} ${textSizeMap[size]}`}>
            Eilumi <span className="text-eilumi-orange">AI</span>
          </h1>
        )}
        
        {showTagline && (
          <p className={`font-medium text-eilumi-dark-gray ${centered ? 'mt-2' : 'ml-2'} ${taglineMap[size]}`}>
            AI MUSIC - CREATE. SHINE. REPEAT.
          </p>
        )}
      </div>
    </div>
  );
};

export default Logo;
