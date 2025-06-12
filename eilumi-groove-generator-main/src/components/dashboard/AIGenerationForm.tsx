
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Mic, Music } from "lucide-react";
import WaveformDisplay from "@/components/WaveformDisplay";

interface AIGenerationFormProps {
  savedVoices: Array<{id: string, name: string}>;
  onGenerate: (trackData: any) => void;
  navigateToCustomMusic: () => void;
}

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

const AIGenerationForm = ({ savedVoices, onGenerate, navigateToCustomMusic }: AIGenerationFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [trackType, setTrackType] = useState("song");
  const [genre, setGenre] = useState("");
  const [beat, setBeat] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  
  const handleGenerateTrack = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt for your track.",
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
        title: prompt.length > 20 ? prompt.substring(0, 20) + "..." : prompt,
        genre: genre,
        mood: beat === "slow" ? "Chill" : beat === "medium" ? "Balanced" : "Energetic",
        viralScore: Math.floor(Math.random() * 30) + 50, // Random score between 50-80
        hookScore: Math.floor(Math.random() * 30) + 50,
        energyScore: Math.floor(Math.random() * 30) + 50,
        tempo: beat === "slow" ? 80 : beat === "medium" ? 100 : 130,
        trackType,
        voiceId: selectedVoice,
        thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
        createdAt: new Date().toISOString(),
      };
      
      onGenerate(newTrack);
      
      toast({
        title: "Track Generated",
        description: "Your track has been successfully created!",
      });
    }, 3000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Generate Music with AI</h2>
      
      <div className="mb-6">
        <Label htmlFor="prompt" className="mb-2 block">What do you want to create?</Label>
        <Textarea
          id="prompt"
          placeholder="Enter lyrics or describe your song idea..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="resize-none h-32"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="mb-2 block">Track Type</Label>
          <RadioGroup value={trackType} onValueChange={setTrackType} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="song" id="song" />
              <Label htmlFor="song">Song</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="instrumental" id="instrumental" />
              <Label htmlFor="instrumental">Instrumental</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beat" id="beat" />
              <Label htmlFor="beat">Beat Only</Label>
            </div>
          </RadioGroup>
        </div>
        
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
          <Label htmlFor="voice" className="mb-2 block">Voice</Label>
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
                <SelectItem value="default">Default AI Voice</SelectItem>
              )}
              <SelectItem value="default">Default AI Voice</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-6">
        <WaveformDisplay isGenerating={isGenerating} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Button 
          onClick={handleGenerateTrack} 
          size="lg" 
          className="flex-1"
          disabled={isGenerating}
        >
          <Music className="h-5 w-5 mr-2" />
          {isGenerating ? "Generating..." : "Generate AI Track"}
        </Button>
        
        <Button 
          onClick={navigateToCustomMusic}
          variant="outline" 
          size="lg"
          className="flex-1"
        >
          <Mic className="h-5 w-5 mr-2" />
          Custom Music
        </Button>
      </div>
    </div>
  );
};

export default AIGenerationForm;
