
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Mic, MicOff, Upload, ArrowLeft, Play, Pause } from "lucide-react";
import NavBar from "@/components/NavBar";
import WaveformDisplay from "@/components/WaveformDisplay";
import { UserContext } from "@/context/UserContext";

const genres = [
  { value: "pop", label: "Pop" },
  { value: "hiphop", label: "Hip-Hop" },
  { value: "lofi", label: "Lo-Fi" },
  { value: "rock", label: "Rock" },
  { value: "edm", label: "EDM" },
  { value: "rnb", label: "R&B" }
];

const beats = [
  { value: "slow", label: "Slow (70-90 BPM)" },
  { value: "medium", label: "Medium (90-120 BPM)" },
  { value: "fast", label: "Fast (120+ BPM)" }
];

const RecordUpload = () => {
  const navigate = useNavigate();
  const { isLoggedIn, savedVoices, setCurrentTrack } = useContext(UserContext);
  
  const [activeTab, setActiveTab] = useState("record");
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [genre, setGenre] = useState("");
  const [beat, setBeat] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        
        // Stop all tracks in the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone Access Error",
        description: "Please allow microphone access to record your voice.",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'audio/mpeg' && file.type !== 'audio/wav') {
        toast({
          title: "Invalid File Format",
          description: "Please upload an MP3 or WAV file.",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      setAudioURL(URL.createObjectURL(file));
    }
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const togglePlayPause = () => {
    if (!audioRef.current || !audioURL) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleGenerate = () => {
    if (!audioURL) {
      toast({
        title: "Audio Required",
        description: activeTab === "record" ? "Please record your tune first." : "Please upload an audio file first.",
        variant: "destructive",
      });
      return;
    }
    
    if (!genre) {
      toast({
        title: "Genre Required",
        description: "Please select a genre for your track.",
        variant: "destructive",
      });
      return;
    }
    
    if (!beat) {
      toast({
        title: "Beat Required",
        description: "Please select a beat speed for your track.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      
      // Create a mock track
      const newTrack = {
        id: `track-${Date.now()}`,
        title: activeTab === "record" ? "My Recorded Track" : uploadedFile?.name.replace(/\.[^/.]+$/, "") || "Uploaded Track",
        genre: genre,
        mood: beat === "slow" ? "Chill" : beat === "medium" ? "Balanced" : "Energetic",
        viralScore: Math.floor(Math.random() * 30) + 50, // Random score between 50-80
        hookScore: Math.floor(Math.random() * 30) + 50,
        energyScore: Math.floor(Math.random() * 30) + 50,
        tempo: beat === "slow" ? 80 : beat === "medium" ? 100 : 130,
        trackType: "song",
        voiceId: selectedVoice,
        audioUrl: audioURL,
        thumbnail: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
        createdAt: new Date().toISOString(),
      };
      
      setCurrentTrack(newTrack);
      
      toast({
        title: "Track Generated",
        description: "Your track has been successfully created!",
      });
      
      // Navigate to the optimizer
      navigate("/optimizer");
    }, 3000);
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
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Record or Upload</h1>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <Tabs defaultValue="record" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="record">Record Your Tune</TabsTrigger>
              <TabsTrigger value="upload">Upload Audio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="record" className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Record Your Voice or Instrument</h2>
                <p className="text-eilumi-dark-gray mb-6">
                  Record a short clip of your singing, rapping, or instrument. We'll use AI to generate a full track based on your recording.
                </p>
                
                <WaveformDisplay isPlaying={isRecording} />
                
                <div className="flex justify-center mt-4">
                  {isRecording ? (
                    <Button 
                      onClick={stopRecording}
                      size="lg"
                      variant="destructive"
                    >
                      <MicOff className="h-6 w-6 mr-2" />
                      Stop Recording
                    </Button>
                  ) : (
                    <Button 
                      onClick={startRecording}
                      size="lg"
                      disabled={!!audioURL}
                    >
                      <Mic className="h-6 w-6 mr-2" />
                      Start Recording
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Upload Your Audio</h2>
                <p className="text-eilumi-dark-gray mb-6">
                  Upload an MP3 or WAV file of your singing, rapping, or instrument. We'll use AI to generate a full track based on your audio.
                </p>
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".mp3,.wav"
                  className="hidden"
                />
                
                <div 
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={triggerFileUpload}
                >
                  {uploadedFile ? (
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-eilumi-dark-gray">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="font-medium mb-1">Click to upload audio</p>
                      <p className="text-sm text-eilumi-dark-gray">MP3 or WAV (max 10MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {audioURL && (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <h3 className="font-semibold mb-4">Preview Your Audio</h3>
                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-4 w-full">
                    <WaveformDisplay isPlaying={isPlaying} />
                    <Button 
                      onClick={togglePlayPause}
                      variant="outline"
                      size="icon"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="font-semibold mb-4">Track Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="genre" className="mb-2 block">Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger id="genre">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="beat" className="mb-2 block">Beat</Label>
                  <Select value={beat} onValueChange={setBeat}>
                    <SelectTrigger id="beat">
                      <SelectValue placeholder="Select beat" />
                    </SelectTrigger>
                    <SelectContent>
                      {beats.map((b) => (
                        <SelectItem key={b.value} value={b.value}>
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="voice" className="mb-2 block">Voice (Optional)</Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger id="voice">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {savedVoices.length > 0 ? (
                        savedVoices.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            {voice.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none">No saved voices</SelectItem>
                      )}
                      <SelectItem value="none">Use my recording only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleGenerate}
                size="lg"
                disabled={!audioURL || isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Full Track"}
              </Button>
            </div>
          </Tabs>
        </div>
      </main>
      
      {/* Hidden audio element for playback */}
      <audio 
        ref={audioRef}
        src={audioURL || undefined}
        onEnded={() => setIsPlaying(false)}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default RecordUpload;
