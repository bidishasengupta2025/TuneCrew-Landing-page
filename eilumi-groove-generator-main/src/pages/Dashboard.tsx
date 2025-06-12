
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import BottomNavBar from "@/components/BottomNavBar";
import { UserContext } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import AIGenerationForm from "@/components/dashboard/AIGenerationForm";
import GettingStartedGuide from "@/components/dashboard/GettingStartedGuide";
import VoiceCalibrationReminder from "@/components/dashboard/VoiceCalibrationReminder";

const Dashboard = () => {
  const navigate = useNavigate();
  const { savedVoices, setCurrentTrack } = useContext(UserContext);
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  // If not authenticated and not loading, user will be redirected by the useEffect
  if (!user) return null;
  
  const handleGenerateTrack = (newTrack: any) => {
    setCurrentTrack(newTrack);
    navigate("/optimizer");
  };
  
  const navigateToCustomMusic = () => {
    navigate("/create-music");
  };
  
  const navigateToVoiceCalibration = () => {
    navigate("/voice-calibration");
  };
  
  const navigateToLibrary = () => {
    navigate("/library");
  };
  
  return (
    <div className="min-h-screen bg-eilumi-off-white">
      <NavBar />
      
      <main className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Create with AI</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIGenerationForm
              savedVoices={savedVoices}
              onGenerate={handleGenerateTrack}
              navigateToCustomMusic={navigateToCustomMusic}
            />
            
            {savedVoices.length === 0 && (
              <VoiceCalibrationReminder 
                navigateToVoiceCalibration={navigateToVoiceCalibration} 
              />
            )}
          </div>
          
          <div>
            <GettingStartedGuide
              navigateToVoiceCalibration={navigateToVoiceCalibration}
              navigateToLibrary={navigateToLibrary}
            />
          </div>
        </div>
      </main>
      
      <BottomNavBar />
    </div>
  );
};

export default Dashboard;
