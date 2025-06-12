
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import NavBar from "@/components/NavBar";
import WaveformDisplay from "@/components/WaveformDisplay";
import { UserContext } from "@/context/UserContext";

const ExportShare = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, currentTrack } = useContext(UserContext);
  
  const [selectedFormat, setSelectedFormat] = useState("mp3");
  const [selectedQuality, setSelectedQuality] = useState("high");
  const [creditEilumi, setCreditEilumi] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // Get track ID from query params
  const searchParams = new URLSearchParams(location.search);
  const trackId = searchParams.get("track");
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
    
    if (!trackId && !currentTrack) {
      navigate("/library");
    }
  }, [isLoggedIn, trackId, currentTrack, navigate]);
  
  const handleExport = () => {
    setIsLoading(true);
    
    // Simulate file export
    setTimeout(() => {
      toast({
        title: "Track exported!",
        description: `Your track has been exported as ${selectedFormat.toUpperCase()} (${selectedQuality} quality).`,
      });
      setIsLoading(false);
    }, 2000);
  };
  
  const handleShare = (platform: string) => {
    setIsSharing(true);
    
    // Simulate sharing process
    setTimeout(() => {
      toast({
        title: `Shared to ${platform}!`,
        description: creditEilumi
          ? "Your track has been shared with Eilumi AI credit."
          : "Your track has been shared.",
      });
      setIsSharing(false);
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
          <h1 className="text-2xl font-bold">Export & Share</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Track Preview</h2>
            <WaveformDisplay />
            
            <div className="mt-4">
              <h3 className="font-medium">
                {currentTrack?.title || "Selected Track"}
              </h3>
              <p className="text-sm text-eilumi-dark-gray mt-1">
                {currentTrack?.genre || "Genre"} • {currentTrack?.mood || "Mood"}
              </p>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Export Options</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="format">Format</Label>
                    <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mp3">MP3</SelectItem>
                        <SelectItem value="wav">WAV</SelectItem>
                        <SelectItem value="flac">FLAC</SelectItem>
                        <SelectItem value="aac">AAC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="quality">Quality</Label>
                    <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                      <SelectTrigger id="quality">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High (320kbps)</SelectItem>
                        <SelectItem value="medium">Medium (192kbps)</SelectItem>
                        <SelectItem value="low">Low (128kbps)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="credit" 
                    checked={creditEilumi} 
                    onCheckedChange={(checked) => setCreditEilumi(!!checked)} 
                  />
                  <Label htmlFor="credit">Credit Eilumi AI in metadata</Label>
                </div>
                
                <Button 
                  onClick={handleExport} 
                  className="w-full"
                  disabled={isLoading}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isLoading ? "Exporting..." : "Export Track"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Share</h2>
            
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => handleShare("TikTok")}
                disabled={isSharing}
              >
                <div className="w-6 h-6 mr-3 flex items-center justify-center text-xl">
                  ♪
                </div>
                Share to TikTok
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => handleShare("Instagram")}
                disabled={isSharing}
              >
                <div className="w-6 h-6 mr-3 flex items-center justify-center text-xl">
                  📷
                </div>
                Share to Instagram
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => handleShare("YouTube")}
                disabled={isSharing}
              >
                <div className="w-6 h-6 mr-3 flex items-center justify-center text-xl">
                  🎬
                </div>
                Share to YouTube
              </Button>
              
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox 
                    id="credit-share" 
                    checked={creditEilumi} 
                    onCheckedChange={(checked) => setCreditEilumi(!!checked)} 
                  />
                  <Label htmlFor="credit-share">Credit Eilumi AI when sharing</Label>
                </div>
                
                <p className="text-xs text-eilumi-dark-gray">
                  By sharing, you agree to our terms of service and the platform's sharing policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExportShare;
