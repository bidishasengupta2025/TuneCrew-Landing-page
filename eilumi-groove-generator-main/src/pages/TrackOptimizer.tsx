
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, ArrowLeft, Save } from "lucide-react";
import NavBar from "@/components/NavBar";
import WaveformDisplay from "@/components/WaveformDisplay";
import ViralScoreDial from "@/components/ViralScoreDial";
import { UserContext } from "@/context/UserContext";

const TrackOptimizer = () => {
  const navigate = useNavigate();
  const { isLoggedIn, currentTrack, setCurrentTrack } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Track parameters
  const [hookStrength, setHookStrength] = useState([75]);
  const [energy, setEnergy] = useState([60]);
  const [flow, setFlow] = useState([65]);
  
  // Scores
  const [viralScore, setViralScore] = useState(currentTrack?.viralScore || 70);
  const [hookScore, setHookScore] = useState(currentTrack?.hookScore || 70);
  const [energyScore, setEnergyScore] = useState(currentTrack?.energyScore || 60);
  const [trendScore, setTrendScore] = useState(Math.min(85, viralScore + 10));
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }
    
    if (!currentTrack) {
      navigate("/dashboard");
      return;
    }
    
    // Initialize sliders with track values if available
    if (currentTrack) {
      setHookStrength([currentTrack.hookScore || 75]);
      setEnergy([currentTrack.energyScore || 60]);
      setFlow([currentTrack.flow || 65]);
    }
  }, [isLoggedIn, currentTrack, navigate]);
  
  // Update score when sliders change
  useEffect(() => {
    // Update individual scores
    setHookScore(hookStrength[0]);
    setEnergyScore(energy[0]);
    
    // Simple formula to calculate viral score based on parameters
    const newScore = Math.round(
      (hookStrength[0] * 0.4) + 
      (energy[0] * 0.4) + 
      (flow[0] * 0.2)
    );
    
    setViralScore(Math.min(99, Math.max(newScore, 30)));
    
    // Update trend score to be slightly higher than viral score
    setTrendScore(Math.min(95, Math.round(viralScore * 1.15)));
  }, [hookStrength, energy, flow, viralScore]);
  
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleSave = () => {
    setIsLoading(true);
    
    // Update the current track with optimized values
    const optimizedTrack = {
      ...currentTrack,
      viralScore,
      hookScore: hookStrength[0],
      energyScore: energy[0],
      flow: flow[0],
      optimized: true,
    };
    
    // Simulate API call to save optimized track
    setTimeout(() => {
      setCurrentTrack(optimizedTrack);
      
      toast({
        title: "Track optimized!",
        description: "Your track has been optimized and saved.",
      });
      setIsLoading(false);
      navigate("/library");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-eilumi-off-white">
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
          <h1 className="text-2xl font-bold">Track Optimizer</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Preview</h2>
              <WaveformDisplay isPlaying={isPlaying} />
              
              <div className="flex justify-between items-center mt-4">
                <h3 className="font-medium">
                  {currentTrack?.title || "Untitled Track"}
                </h3>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handlePlay}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold mb-4">Optimize Parameters</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Hook Strength</span>
                    <span className="text-sm text-eilumi-dark-gray">{hookStrength}%</span>
                  </div>
                  <Slider 
                    min={0} 
                    max={100} 
                    step={1} 
                    value={hookStrength} 
                    onValueChange={setHookStrength} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Energy</span>
                    <span className="text-sm text-eilumi-dark-gray">{energy}%</span>
                  </div>
                  <Slider 
                    min={0} 
                    max={100} 
                    step={1}
                    value={energy} 
                    onValueChange={setEnergy} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Flow</span>
                    <span className="text-sm text-eilumi-dark-gray">{flow}%</span>
                  </div>
                  <Slider 
                    min={0} 
                    max={100} 
                    step={1}
                    value={flow} 
                    onValueChange={setFlow} 
                  />
                </div>
                
                <Button 
                  onClick={handleSave} 
                  className="w-full"
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Optimized Track"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Viral Score</h2>
            
            <div className="flex flex-col items-center">
              <ViralScoreDial score={viralScore} size="lg" />
              
              <div className="mt-8 w-full">
                <div className="flex flex-col gap-4 w-full">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium">Hook Strength</h3>
                      <span className="text-xs text-eilumi-dark-gray">{hookScore}%</span>
                    </div>
                    <div className="h-2 bg-eilumi-light-gray rounded-full">
                      <div 
                        className="h-full bg-eilumi-orange rounded-full"
                        style={{ width: `${hookScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium">Energy</h3>
                      <span className="text-xs text-eilumi-dark-gray">{energyScore}%</span>
                    </div>
                    <div className="h-2 bg-eilumi-light-gray rounded-full">
                      <div 
                        className="h-full bg-eilumi-orange rounded-full"
                        style={{ width: `${energyScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium">Trend Potential</h3>
                      <span className="text-xs text-eilumi-dark-gray">{trendScore}%</span>
                    </div>
                    <div className="h-2 bg-eilumi-light-gray rounded-full">
                      <div 
                        className="h-full bg-eilumi-orange rounded-full"
                        style={{ width: `${trendScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-eilumi-dark-gray mb-2">
                  Optimize your track to increase viral potential
                </p>
                <p className="text-xs text-eilumi-dark-gray">
                  Adjust parameters to find the perfect balance
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 w-full">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/editor")}
                >
                  Advanced Track Editing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackOptimizer;
