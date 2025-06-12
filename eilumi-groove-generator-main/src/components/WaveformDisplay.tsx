
import React from 'react';

interface WaveformDisplayProps {
  isGenerating?: boolean;
  isPlaying?: boolean;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({ 
  isGenerating = false, 
  isPlaying = false 
}) => {
  // Number of bars in the waveform
  const bars = 30;

  if (isGenerating) {
    return (
      <div className="w-full h-32 bg-eilumi-light-gray rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-full h-1 bg-eilumi-orange rounded-full mb-3 overflow-hidden">
            <div className="loader h-full bg-gradient-to-r from-eilumi-orange to-eilumi-light-orange"></div>
          </div>
          <p className="text-sm font-medium text-eilumi-dark-gray">Generating your track...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-32 bg-eilumi-light-gray rounded-lg flex items-center justify-center overflow-hidden">
      {isPlaying ? (
        <div className="flex items-end justify-center h-20 w-full px-4 space-x-1">
          {[...Array(bars)].map((_, i) => {
            const height = 10 + Math.random() * 60;
            return (
              <div
                key={i}
                className="waveform-bar bg-eilumi-orange w-2 rounded-t-md"
                style={{
                  height: `${height}%`,
                  '--delay': i % 10,
                } as React.CSSProperties}
              ></div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-end justify-center h-20 w-full px-4 space-x-1">
          {[...Array(bars)].map((_, i) => {
            const height = 10 + Math.sin(i * 0.5) * 20 + 15;
            return (
              <div
                key={i}
                className="bg-eilumi-gray w-2 rounded-t-md"
                style={{ height: `${height}%` }}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WaveformDisplay;
