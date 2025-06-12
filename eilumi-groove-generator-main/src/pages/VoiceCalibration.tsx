
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Mic, MicOff, Play, Save, Trash2, ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import WaveformDisplay from "@/components/WaveformDisplay";
import { UserContext } from "@/context/UserContext";

interface Voice {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

const VoiceCalibration = () => {
  const navigate = useNavigate();
  const { isLoggedIn, savedVoices, setSavedVoices } = useContext(UserContext);
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingName, setRecordingName] = useState("My Voice");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [voiceToRename, setVoiceToRename] = useState<Voice | null>(null);
  const [newVoiceName, setNewVoiceName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [voiceToDelete, setVoiceToDelete] = useState<Voice | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
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
  
  const saveRecording = () => {
    if (audioURL) {
      const newVoice: Voice = {
        id: Date.now().toString(),
        name: recordingName,
        url: audioURL,
        createdAt: new Date().toISOString(),
      };
      
      setSavedVoices([...savedVoices, newVoice]);
      setAudioURL(null);
      setRecordingName("My Voice");
      
      toast({
        title: "Voice Saved",
        description: `Your voice "${newVoice.name}" has been saved.`,
      });
    }
  };
  
  const handlePlayVoice = (voiceId: string) => {
    if (isPlaying === voiceId) {
      audioRef.current?.pause();
      setIsPlaying(null);
    } else {
      const voice = savedVoices.find(v => v.id === voiceId);
      if (voice && audioRef.current) {
        audioRef.current.src = voice.url;
        audioRef.current.play();
        setIsPlaying(voiceId);
      }
    }
  };
  
  const openRenameDialog = (voice: Voice) => {
    setVoiceToRename(voice);
    setNewVoiceName(voice.name);
    setRenameDialogOpen(true);
  };
  
  const handleRename = () => {
    if (voiceToRename && newVoiceName.trim()) {
      setSavedVoices(
        savedVoices.map(voice => 
          voice.id === voiceToRename.id ? { ...voice, name: newVoiceName } : voice
        )
      );
      
      setRenameDialogOpen(false);
      setVoiceToRename(null);
      
      toast({
        title: "Voice Renamed",
        description: `Your voice has been renamed to "${newVoiceName}".`,
      });
    }
  };
  
  const openDeleteDialog = (voice: Voice) => {
    setVoiceToDelete(voice);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (voiceToDelete) {
      setSavedVoices(savedVoices.filter(voice => voice.id !== voiceToDelete.id));
      
      setDeleteDialogOpen(false);
      setVoiceToDelete(null);
      
      toast({
        title: "Voice Deleted",
        description: "Your voice has been deleted.",
      });
    }
  };
  
  const handleProceed = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-eilumi-off-white">
      <NavBar />
      
      <main className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Voice Calibration</h1>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Record Your Voice</h2>
          <p className="text-eilumi-dark-gray mb-6">
            Record your voice to use it for AI-generated tracks. Your voice will be stored and used for future track generation.
          </p>
          
          <div className="mb-6">
            <WaveformDisplay isGenerating={false} isPlaying={isRecording} />
            
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
                >
                  <Mic className="h-6 w-6 mr-2" />
                  Start Recording
                </Button>
              )}
            </div>
          </div>
          
          {audioURL && (
            <div className="border-t border-gray-100 pt-4">
              <div className="flex gap-3 items-center">
                <Input
                  value={recordingName}
                  onChange={(e) => setRecordingName(e.target.value)}
                  placeholder="Voice name"
                  className="flex-grow"
                />
                <Button onClick={saveRecording}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              
              <div className="mt-4 flex justify-center">
                <audio src={audioURL} controls className="w-full max-w-md" />
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Your Voices</h2>
          
          {savedVoices.length === 0 ? (
            <p className="text-center py-8 text-eilumi-dark-gray">
              You don't have any saved voices yet. Record your voice to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {savedVoices.map((voice) => (
                <div 
                  key={voice.id}
                  className="p-4 border border-gray-100 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{voice.name}</h3>
                    <p className="text-xs text-eilumi-dark-gray">
                      {new Date(voice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={() => handlePlayVoice(voice.id)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={() => openRenameDialog(voice)}
                    >
                      <span className="text-xs">Rename</span>
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={() => openDeleteDialog(voice)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleProceed} size="lg">
            Proceed to Music Creation
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>
      
      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Voice</DialogTitle>
            <DialogDescription>
              Enter a new name for your voice recording.
            </DialogDescription>
          </DialogHeader>
          
          <Input
            value={newVoiceName}
            onChange={(e) => setNewVoiceName(e.target.value)}
            placeholder="Voice name"
            className="mt-4"
          />
          
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename}>
              Rename
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Voice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this voice? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Hidden audio element for playback */}
      <audio 
        ref={audioRef}
        onEnded={() => setIsPlaying(null)}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default VoiceCalibration;
