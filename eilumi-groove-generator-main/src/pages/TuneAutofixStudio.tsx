
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import BottomNavBar from "@/components/BottomNavBar";
import WaveformDisplay from "@/components/WaveformDisplay";
import { Mic, Upload, Sparkles, Save, Play, Pause } from "lucide-react";

const TuneAutofixStudio = () => {
  const navigate = useNavigate();
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Audio effect sliders
  const [pitchCorrection, setPitchCorrection] = useState([50]);
  const [reverb, setReverb] = useState([30]);
  const [echo, setEcho] = useState([20]);
  const [harmony, setHarmony] = useState([40]);
  const [voiceChange, setVoiceChange] = useState([0]);
  
  const handleStartRecording = () => {
    setIsRecording(true);
    
    // Simulate recording for demo purposes
    setTimeout(() => {
      setIsRecording(false);
      setAudioSource("recorded");
      toast({
        title: "Recording Completed",
        description: "Your voice has been recorded successfully.",
      });
    }, 3000);
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload
      setAudioSource("uploaded");
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };
  
  const handleTogglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleAutofix = () => {
    if (!audioSource) {
      toast({
        title: "No Audio Source",
        description: "Please record or upload an audio file first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setPitchCorrection([85]);
      setReverb([45]);
      setEcho([25]);
      setHarmony([60]);
      
      setIsProcessing(false);
      
      toast({
        title: "Auto-Enhancement Complete",
        description: "Your audio has been automatically enhanced!",
      });
    }, 2000);
  };
  
  const handleSave = () => {
    if (!audioSource) {
      toast({
        title: "No Audio Source",
        description: "Please record or upload an audio file first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      
      toast({
        title: "Track Saved!",
        description: "Your enhanced track has been saved to your library.",
      });
      
      navigate("/library");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-eilumi-off-white pb-16">
      <NavBar />
      
      <main className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Tune Autofix Studio</h1>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add Your Audio</h2>
          
          <Tabs defaultValue="record">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="record">Sing Now</TabsTrigger>
              <TabsTrigger value="upload">Upload Song</TabsTrigger>
            </TabsList>
            
            <TabsContent value="record">
              <div className="text-center space-y-4">
                <WaveformDisplay isPlaying={isRecording} />
                
                {audioSource !== "recorded" ? (
                  <Button 
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    size="lg"
                    variant={isRecording ? "destructive" : "default"}
                  >
                    <Mic className="h-5 w-5 mr-2" />
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Button onClick={handleTogglePlayback}>
                        {isPlaying ? (
                          <Pause className="h-4 w-4 mr-2" />
                        ) : (
                          <Play className="h-4 w-4 mr-2" />
                        )}
                        {isPlaying ? "Pause" : "Play"}
                      </Button>
                    </div>
                    <Button 
                      onClick={() => setAudioSource(null)} 
                      variant="outline"
                    >
                      Record Again
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="upload">
              <div className="text-center space-y-4">
                {audioSource !== "uploaded" ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-eilumi-dark-gray mb-2" />
                    <p className="text-eilumi-dark-gray mb-4">
                      Upload your audio file (MP3, WAV)
                    </p>
                    <input
                      type="file"
                      id="audioUpload"
                      className="hidden"
                      accept="audio/*"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="audioUpload">
                      <Button className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Select Audio File
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <WaveformDisplay isPlaying={isPlaying} />
                    <div className="flex justify-center">
                      <Button onClick={handleTogglePlayback}>
                        {isPlaying ? (
                          <Pause className="h-4 w-4 mr-2" />
                        ) : (
                          <Play className="h-4 w-4 mr-2" />
                        )}
                        {isPlaying ? "Pause" : "Play"}
                      </Button>
                    </div>
                    <Button 
                      onClick={() => setAudioSource(null)} 
                      variant="outline"
                    >
                      Upload Different File
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {audioSource && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleAutofix}
                disabled={isProcessing}
                className="px-6"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isProcessing ? "Enhancing..." : "One-Click Auto-Enhancement"}
              </Button>
            </div>
          )}
        </div>
        
        {audioSource && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Audio Adjustments</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Pitch Correction</span>
                    <span className="text-sm text-eilumi-dark-gray">{pitchCorrection}%</span>
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
                    <span className="text-sm text-eilumi-dark-gray">{reverb}%</span>
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
                    <span className="text-sm font-medium">Echo</span>
                    <span className="text-sm text-eilumi-dark-gray">{echo}%</span>
                  </div>
                  <Slider 
                    min={0} 
                    max={100} 
                    step={1}
                    value={echo} 
                    onValueChange={setEcho} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Harmony</span>
                    <span className="text-sm text-eilumi-dark-gray">{harmony}%</span>
                  </div>
                  <Slider 
                    min={0} 
                    max={100} 
                    step={1}
                    value={harmony} 
                    onValueChange={setHarmony} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Voice Change</span>
                    <span className="text-sm text-eilumi-dark-gray">
                      {voiceChange[0] === 0 ? "None" : `${voiceChange}%`}
                    </span>
                  </div>
                  <Slider 
                    min={0} 
                    max={100} 
                    step={1}
                    value={voiceChange} 
                    onValueChange={setVoiceChange} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {audioSource && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Audio Presets</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Pop Star", icon: "✨" },
                { name: "Deep Voice", icon: "🎭" },
                { name: "Harmonize", icon: "🎵" },
                { name: "Echo Chamber", icon: "🔊" },
                { name: "Vocal Enhancer", icon: "🎤" },
                { name: "Natural", icon: "🌿" }
              ].map((preset) => (
                <Card key={preset.name} className="cursor-pointer hover:border-eilumi-orange transition-colors">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{preset.icon}</div>
                      <span>{preset.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleSave} 
                size="lg" 
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Enhanced Track"}
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <BottomNavBar />
    </div>
  );
};

export default TuneAutofixStudio;
