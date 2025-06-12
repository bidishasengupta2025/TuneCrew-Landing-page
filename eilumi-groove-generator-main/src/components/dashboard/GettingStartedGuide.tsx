
import { Button } from "@/components/ui/button";
import { Mic, Library } from "lucide-react";

interface GettingStartedGuideProps {
  navigateToVoiceCalibration: () => void;
  navigateToLibrary: () => void;
}

const GettingStartedGuide = ({ 
  navigateToVoiceCalibration, 
  navigateToLibrary 
}: GettingStartedGuideProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-100 rounded-lg">
          <h3 className="font-medium text-sm mb-2">1. Describe Your Track</h3>
          <p className="text-xs text-eilumi-dark-gray">
            Enter lyrics or describe the style of music you want to create.
          </p>
        </div>
        
        <div className="p-4 border border-gray-100 rounded-lg">
          <h3 className="font-medium text-sm mb-2">2. Choose Options</h3>
          <p className="text-xs text-eilumi-dark-gray">
            Select track type, genre, beat, and voice settings.
          </p>
        </div>
        
        <div className="p-4 border border-gray-100 rounded-lg">
          <h3 className="font-medium text-sm mb-2">3. Generate</h3>
          <p className="text-xs text-eilumi-dark-gray">
            Click the generate button and let AI create your track.
          </p>
        </div>
        
        <div className="p-4 border border-gray-100 rounded-lg">
          <h3 className="font-medium text-sm mb-2">4. Optimize</h3>
          <p className="text-xs text-eilumi-dark-gray">
            Fine-tune your track using the optimizer to increase viral potential.
          </p>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={navigateToVoiceCalibration}
        >
          <Mic className="h-4 w-4 mr-2" />
          Voice Calibration
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={navigateToLibrary}
        >
          <Library className="h-4 w-4 mr-2" />
          View My Tracks
        </Button>
      </div>
    </div>
  );
};

export default GettingStartedGuide;
