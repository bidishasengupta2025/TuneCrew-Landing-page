
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import WaveformDisplay from "@/components/WaveformDisplay";

interface TrackDetailsProps {
  trackTitle: string;
  setTrackTitle: (value: string) => void;
  isPlaying: boolean;
  handlePlay: () => void;
}

const TrackDetails: React.FC<TrackDetailsProps> = ({
  trackTitle,
  setTrackTitle,
  isPlaying,
  handlePlay,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="trackTitle" className="block text-sm font-medium mb-1">
          Track Title
        </label>
        <Input
          id="trackTitle"
          value={trackTitle}
          onChange={(e) => setTrackTitle(e.target.value)}
          placeholder="Enter track title"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Track Preview
        </label>
        <WaveformDisplay isPlaying={isPlaying} />
        
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;
