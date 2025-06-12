
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import UserType from "./pages/UserType";
import Dashboard from "./pages/Dashboard";
import TrackOptimizer from "./pages/TrackOptimizer";
import TrackLibrary from "./pages/TrackLibrary";
import ExportShare from "./pages/ExportShare";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";
import VoiceCalibration from "./pages/VoiceCalibration";
import RecordUpload from "./pages/RecordUpload";
import TrackEditor from "./pages/TrackEditor";
import UserProfile from "./pages/UserProfile";
import CustomMusicCreation from "./pages/CustomMusicCreation";

// Context
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/user-type" element={<UserType />} />
                <Route path="/voice-calibration" element={<VoiceCalibration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/record-upload" element={<RecordUpload />} />
                <Route path="/optimizer" element={<TrackOptimizer />} />
                <Route path="/editor" element={<TrackEditor />} />
                <Route path="/library" element={<TrackLibrary />} />
                <Route path="/export" element={<ExportShare />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/create-music" element={<CustomMusicCreation />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
