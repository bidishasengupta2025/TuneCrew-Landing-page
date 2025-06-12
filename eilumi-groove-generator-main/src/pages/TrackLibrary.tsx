
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Grid2X2, List, Plus } from "lucide-react";
import NavBar from "@/components/NavBar";
import BottomNavBar from "@/components/BottomNavBar";
import TrackCard from "@/components/TrackCard";
import SocialShareButtons from "@/components/SocialShareButtons";
import { UserContext } from "@/context/UserContext";

// Mock data for tracks
const mockTracks = [
  {
    id: "track-1",
    title: "Chill Lo-Fi Beat",
    genre: "Lo-Fi",
    mood: "Chill",
    viralScore: 78,
    thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    createdAt: "2025-04-15T14:30:00Z",
  },
  {
    id: "track-2",
    title: "Energetic EDM Track",
    genre: "EDM",
    mood: "Energetic",
    viralScore: 85,
    thumbnail: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    createdAt: "2025-04-14T10:15:00Z",
  },
  {
    id: "track-3",
    title: "Dreamy Indie Melody",
    genre: "Indie",
    mood: "Dreamy",
    viralScore: 62,
    thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    createdAt: "2025-04-13T18:45:00Z",
  },
];

const TrackLibrary = () => {
  const navigate = useNavigate();
  const { isLoggedIn, currentTrack } = useContext(UserContext);
  const [tracks, setTracks] = useState(mockTracks);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [trackToDelete, setTrackToDelete] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
    
    // Add the current track if it exists and isn't already in the list
    if (currentTrack && !tracks.some(track => track.id === currentTrack.id)) {
      setTracks(prevTracks => [currentTrack, ...prevTracks]);
    }
  }, [isLoggedIn, navigate, currentTrack]);
  
  const handlePlayTrack = (id: string) => {
    setPlayingTrackId(playingTrackId === id ? null : id);
  };
  
  const handleDeleteTrack = (id: string) => {
    setTrackToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (trackToDelete) {
      setTracks(tracks.filter(track => track.id !== trackToDelete));
      toast({
        title: "Track deleted",
        description: "Your track has been deleted.",
      });
    }
    setDeleteDialogOpen(false);
    setTrackToDelete(null);
  };
  
  return (
    <div className="min-h-screen bg-eilumi-off-white pb-16 md:pb-0">
      <NavBar />
      
      <main className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Tracks</h1>
          
          <div className="flex items-center gap-3">
            <div className="border border-gray-200 rounded-md flex">
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "grid" ? "bg-eilumi-light-gray" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "list" ? "bg-eilumi-light-gray" : ""}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Button onClick={() => navigate("/dashboard")}>
              <Plus className="h-4 w-4 mr-2" />
              New Track
            </Button>
          </div>
        </div>
        
        {tracks.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
            <h2 className="text-lg font-semibold mb-2">No tracks yet</h2>
            <p className="text-eilumi-dark-gray mb-6">
              Get started by creating your first AI-powered track
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Track
            </Button>
          </div>
        ) : (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.map((track) => (
                <div key={track.id} className="flex flex-col">
                  <TrackCard
                    id={track.id}
                    title={track.title}
                    genre={track.genre}
                    mood={track.mood}
                    viralScore={track.viralScore}
                    thumbnail={track.thumbnail}
                    createdAt={track.createdAt}
                    view="grid"
                    onPlay={() => handlePlayTrack(track.id)}
                    onDelete={() => handleDeleteTrack(track.id)}
                  />
                  <div className="mt-2 flex justify-end">
                    <SocialShareButtons trackId={track.id} compact={true} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {tracks.map((track) => (
                <div key={track.id} className="flex flex-col">
                  <TrackCard
                    id={track.id}
                    title={track.title}
                    genre={track.genre}
                    mood={track.mood}
                    viralScore={track.viralScore}
                    thumbnail={track.thumbnail}
                    createdAt={track.createdAt}
                    view="list"
                    onPlay={() => handlePlayTrack(track.id)}
                    onDelete={() => handleDeleteTrack(track.id)}
                  />
                  <div className="mt-2 flex justify-end">
                    <SocialShareButtons trackId={track.id} />
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Track</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this track? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <BottomNavBar />
    </div>
  );
};

export default TrackLibrary;
