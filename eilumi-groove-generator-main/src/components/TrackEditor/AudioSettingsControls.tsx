
import React from "react";
import { Slider } from "@/components/ui/slider";

interface AudioSettingsControlsProps {
  pitchCorrection: number[];
  setPitchCorrection: (value: number[]) => void;
  reverb: number[];
  setReverb: (value: number[]) => void;
  tone: number[];
  setTone: (value: number[]) => void;
  bassBoost: number[];
  setBassBoost: (value: number[]) => void;
  trebleBoost: number[];
  setTrebleBoost: (value: number[]) => void;
}

const AudioSettingsControls: React.FC<AudioSettingsControlsProps> = ({
  pitchCorrection,
  setPitchCorrection,
  reverb,
  setReverb,
  tone,
  setTone,
  bassBoost,
  setBassBoost,
  trebleBoost,
  setTrebleBoost,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Pitch Correction</span>
          <span className="text-sm text-eilumi-dark-gray">{pitchCorrection[0]}%</span>
        </div>
        <Slider 
          min={0} 
          max={100} 
          step={1} 
          value={pitchCorrection} 
          onValueChange={setPitchCorrection} 
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Reverb</span>
          <span className="text-sm text-eilumi-dark-gray">{reverb[0]}%</span>
        </div>
        <Slider 
          min={0} 
          max={100} 
          step={1}
          value={reverb} 
          onValueChange={setReverb} 
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Tone</span>
          <span className="text-sm text-eilumi-dark-gray">
            {tone[0] < 50 ? "Warmer" : tone[0] > 50 ? "Brighter" : "Neutral"}
          </span>
        </div>
        <Slider 
          min={0} 
          max={100} 
          step={1}
          value={tone} 
          onValueChange={setTone} 
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-eilumi-dark-gray">Warm</span>
          <span className="text-xs text-eilumi-dark-gray">Bright</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Bass Boost</span>
            <span className="text-sm text-eilumi-dark-gray">{bassBoost[0]}%</span>
          </div>
          <Slider 
            min={0} 
            max={100} 
            step={1}
            value={bassBoost} 
            onValueChange={setBassBoost} 
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Treble Boost</span>
            <span className="text-sm text-eilumi-dark-gray">{trebleBoost[0]}%</span>
          </div>
          <Slider 
            min={0} 
            max={100} 
            step={1}
            value={trebleBoost} 
            onValueChange={setTrebleBoost} 
          />
        </div>
      </div>
    </div>
  );
};

export default AudioSettingsControls;
