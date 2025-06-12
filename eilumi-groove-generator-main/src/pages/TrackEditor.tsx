
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NavBar from "@/components/NavBar";
import BottomNavBar from "@/components/BottomNavBar";
import { UserContext } from "@/context/UserContext";
import TrackDetails from "@/components/TrackEditor/TrackDetails";
import AudioSettingsControls from "@/components/TrackEditor/AudioSettingsControls";
import ActionButtons from "@/components/TrackEditor/ActionButtons";
import SocialShareButtons from "@/components/SocialShareButtons";

const TrackEditor = () => {
  const navigate = useNavigate();
  const { isLoggedIn, currentTrack, setCurrentTrack } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Track settings
  const [trackTitle, setTrackTitle] = useState("");
  const [pitchCorrection, setPitchCorrection] = useState([50]);
  const [reverb, setReverb] = useState([30]);
  const [tone, setTone] = useState([50]);
  const [bassBoost, setBassBoost] = useState([30]);
  const [trebleBoost, setTrebleBoost] = useState([40]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }
    
    if (!currentTrack) {
      navigate("/dashboard");
      return;
    }
    
    // Initialize editor values with track data
    if (currentTrack) {
      setTrackTitle(currentTrack.title || "");
      setPitchCorrection([(currentTrack.pitchCorrection || 50)]);
      setReverb([(currentTrack.reverb || 30)]);
      setTone([(currentTrack.tone || 50)]);
      setBassBoost([(currentTrack.bassBoost || 30)]);
      setTrebleBoost([(currentTrack.trebleBoost || 40)]);
    }
  }, [isLoggedIn, currentTrack, navigate]);
  
  const handlePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleSave = () => {
    if (!trackTitle.trim()) {
      toast({
        title: "Track Title Required",
        description: "Please enter a title for your track.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Update the current track with edited values
    const editedTrack = {
      ...currentTrack,
      title: trackTitle,
      pitchCorrection: pitchCorrection[0],
      reverb: reverb[0],
      tone: tone[0],
      bassBoost: bassBoost[0],
      trebleBoost: trebleBoost[0],
      lastEdited: new Date().toISOString(),
    };
    
    // Simulate API call to save edited track
    setTimeout(() => {
      setCurrentTrack(editedTrack);
      
      toast({
        title: "Track saved!",
        description: "Your track edits have been saved.",
      });
      setIsLoading(false);
      navigate("/library");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-eilumi-off-white pb-16 md:pb-0">
      <NavBar />
      
      <main className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-3"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Song Editor</h1>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Track Details</h2>
              {currentTrack && (
                <SocialShareButtons trackId={currentTrack.id} />
              )}
            </div>
            <TrackDetails 
              trackTitle={trackTitle}
              setTrackTitle={setTrackTitle}
              isPlaying={isPlaying}
              handlePlay={handlePlay}
            />
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-lg font-semibold mb-4">Audio Adjustments</h2>
            <AudioSettingsControls 
              pitchCorrection={pitchCorrection}
              setPitchCorrection={setPitchCorrection}
              reverb={reverb}
              setReverb={setReverb}
              tone={tone}
              setTone={setTone}
              bassBoost={bassBoost}
              setBassBoost={setBassBoost}
              trebleBoost={trebleBoost}
              setTrebleBoost={setTrebleBoost}
            />
          </div>
          
          <ActionButtons 
            isLoading={isLoading}
            onCancel={() => navigate("/optimizer")}
            onSave={handleSave}
          />
        </div>
      </main>
      
      {/* Hidden audio element for playback */}
      <audio 
        ref={audioRef}
        src={currentTrack?.audioUrl || undefined}
        onEnded={() => setIsPlaying(false)}
        style={{ display: "none" }}
      />
      
      <BottomNavBar />
    </div>
  );
};

export default TrackEditor;
