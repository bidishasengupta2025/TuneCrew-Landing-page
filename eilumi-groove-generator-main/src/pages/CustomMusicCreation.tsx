
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import NavBar from "@/components/NavBar";
import BottomNavBar from "@/components/BottomNavBar";
import { Mic, Upload, Music } from "lucide-react";
import WaveformDisplay from "@/components/WaveformDisplay";

const CustomMusicCreation = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState("");
  const [beats, setBeats] = useState("");
  const [voice, setVoice] = useState("");
  const [musicType, setMusicType] = useState("song");
  const [lyrics, setLyrics] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const genres = ["Pop", "Hip-Hop", "Lo-Fi", "R&B", "Rock", "EDM", "Country"];
  const beatOptions = ["Slow", "Medium", "Fast", "Dynamic"];
  const voiceOptions = ["My Voice", "Male Voice 1", "Female Voice 1", "Auto-Detect"];

  const handleCreateTrack = () => {
    if (!genre || !beats || !voice) {
      toast({
        title: "Missing Information",
        description: "Please select all required options before creating a track.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call to create track
    setTimeout(() => {
      toast({
        title: "Track Created!",
        description: "Your custom track has been successfully created.",
      });
      setIsLoading(false);
      navigate("/optimizer");
    }, 2000);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Recording logic would go here
    
    // Simulate recording for demo purposes
    setTimeout(() => {
      setIsRecording(false);
      setAudioURL("https://example.com/fake-audio.mp3");
      toast({
        title: "Recording Completed",
        description: "Your voice has been recorded successfully.",
      });
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Stop recording logic
  };

  const handlePlayPreview = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload
      const url = URL.createObjectURL(file);
      setAudioURL(url);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-eilumi-off-white pb-16">
      <NavBar />
      
      <main className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Custom Music Creation</h1>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Create Your Track</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="genre">Select Genre</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Choose a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((g) => (
                      <SelectItem key={g} value={g.toLowerCase()}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="beats">Select Beats</Label>
                <Select value={beats} onValueChange={setBeats}>
                  <SelectTrigger id="beats">
                    <SelectValue placeholder="Choose beats" />
                  </SelectTrigger>
                  <SelectContent>
                    {beatOptions.map((beat) => (
                      <SelectItem key={beat} value={beat.toLowerCase()}>
                        {beat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="voice">Select Voice</Label>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger id="voice">
                    <SelectValue placeholder="Choose a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceOptions.map((v) => (
                      <SelectItem key={v} value={v.toLowerCase()}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="musicType">Music Type</Label>
                <Select value={musicType} onValueChange={setMusicType}>
                  <SelectTrigger id="musicType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="song">Song</SelectItem>
                    <SelectItem value="instrumental">Instrumental</SelectItem>
                    <SelectItem value="beat">Beat Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="lyrics">Lyrics or Song Idea</Label>
              <Textarea
                id="lyrics"
                placeholder="Enter lyrics or describe your song idea..."
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add Your Tune</h2>
          
          <Tabs defaultValue="record">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="record">Sing Tune</TabsTrigger>
              <TabsTrigger value="upload">Upload Tune</TabsTrigger>
            </TabsList>
            
            <TabsContent value="record">
              <div className="text-center space-y-4">
                <WaveformDisplay isPlaying={isRecording} />
                
                {!audioURL ? (
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
                      <Button onClick={handlePlayPreview}>
                        <Music className="h-4 w-4 mr-2" />
                        {isPlaying ? "Pause Preview" : "Play Preview"}
                      </Button>
                    </div>
                    <Button onClick={() => setAudioURL(null)} variant="outline">
                      Record Again
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="upload">
              <div className="text-center space-y-4">
                {!audioURL ? (
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
                      <Button onClick={handlePlayPreview}>
                        <Music className="h-4 w-4 mr-2" />
                        {isPlaying ? "Pause Preview" : "Play Preview"}
                      </Button>
                    </div>
                    <Button onClick={() => setAudioURL(null)} variant="outline">
                      Upload Different File
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleCreateTrack} 
            size="lg" 
            className="px-8 py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Creating Track..." : "Create Track"}
          </Button>
        </div>
      </main>
      
      <BottomNavBar />
    </div>
  );
};

export default CustomMusicCreation;
