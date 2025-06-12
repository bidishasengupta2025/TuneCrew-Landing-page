
import { Button } from "@/components/ui/button";
import { Music4 } from "lucide-react";

interface VoiceCalibrationReminderProps {
  navigateToVoiceCalibration: () => void;
}

const VoiceCalibrationReminder = ({ navigateToVoiceCalibration }: VoiceCalibrationReminderProps) => {
  return (
    <div className="mt-4 p-4 bg-eilumi-light-gray rounded-lg">
      <p className="text-sm flex items-center gap-2">
        <Music4 className="h-4 w-4" />
        <span>
          You haven't calibrated your voice yet. 
          <Button 
            variant="link" 
            className="p-0 h-auto text-eilumi-orange"
            onClick={navigateToVoiceCalibration}
          >
            Calibrate now
          </Button>
        </span>
      </p>
    </div>
  );
};

export default VoiceCalibrationReminder;
