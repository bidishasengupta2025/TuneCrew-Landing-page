
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Settings, HelpCircle, Save } from "lucide-react";
import NavBar from "@/components/NavBar";
import { UserContext } from "@/context/UserContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userType, darkMode, setDarkMode } = useContext(UserContext);
  
  const [displayName, setDisplayName] = useState("Your Name");
  const [email, setEmail] = useState("your.email@example.com");
  const [notifyNewFeatures, setNotifyNewFeatures] = useState(true);
  const [notifyOptimization, setNotifyOptimization] = useState(true);
  const [isPublicProfile, setIsPublicProfile] = useState(false);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }
  }, [isLoggedIn, navigate]);
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Updated",
      description: "Your settings have been successfully updated.",
    });
  };
  
  const getSubscriptionPlan = () => {
    return "Free";
  };
  
  const getUserAvatar = () => {
    // Get first letter of display name
    return displayName.charAt(0).toUpperCase();
  };
  
  return (
    <div className="min-h-screen bg-eilumi-off-white">
      <NavBar />
      
      <main className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Profile & Settings</h1>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <Tabs defaultValue="profile">
            <TabsList className="w-full bg-eilumi-light-gray p-0 rounded-none">
              <TabsTrigger value="profile" className="flex-1 rounded-none py-4">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 rounded-none py-4">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="help" className="flex-1 rounded-none py-4">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-eilumi-orange text-white text-2xl">
                        {getUserAvatar()}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="absolute bottom-0 right-0 bg-eilumi-orange">
                      {userType || "User"}
                    </Badge>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  
                  <div className="mt-6 w-full">
                    <h3 className="font-semibold mb-2">Subscription</h3>
                    <div className="p-4 border border-gray-100 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{getSubscriptionPlan()} Plan</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      
                      {getSubscriptionPlan() === "Free" && (
                        <Button 
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => navigate("/subscription")}
                        >
                          Upgrade
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Privacy</h2>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="public-profile" className="font-medium">
                          Public Profile
                        </Label>
                        <p className="text-sm text-eilumi-dark-gray">
                          Allow others to see your profile
                        </p>
                      </div>
                      <Switch
                        id="public-profile"
                        checked={isPublicProfile}
                        onCheckedChange={setIsPublicProfile}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="p-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Appearance</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode" className="font-medium">
                        Dark Mode
                      </Label>
                      <p className="text-sm text-eilumi-dark-gray">
                        Toggle between light and dark theme
                      </p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-features" className="font-medium">
                          New Features
                        </Label>
                        <p className="text-sm text-eilumi-dark-gray">
                          Get notified about new app features
                        </p>
                      </div>
                      <Switch
                        id="notify-features"
                        checked={notifyNewFeatures}
                        onCheckedChange={setNotifyNewFeatures}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-optimization" className="font-medium">
                          Optimization Tips
                        </Label>
                        <p className="text-sm text-eilumi-dark-gray">
                          Receive tips for optimizing your tracks
                        </p>
                      </div>
                      <Switch
                        id="notify-optimization"
                        checked={notifyOptimization}
                        onCheckedChange={setNotifyOptimization}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Account Management</h2>
                  
                  <div className="space-y-4">
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                    
                    <Button variant="outline" size="sm" className="text-red-500">
                      Delete Account
                    </Button>
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="help" className="p-6">
              <h2 className="text-lg font-semibold mb-4">Help & Support</h2>
              
              <div className="space-y-6">
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
                  <p className="text-sm text-eilumi-dark-gray mb-3">
                    Quick answers to common questions about Eilumi AI.
                  </p>
                  <Button variant="outline" size="sm">
                    View FAQs
                  </Button>
                </div>
                
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h3 className="font-medium mb-2">Contact Support</h3>
                  <p className="text-sm text-eilumi-dark-gray mb-3">
                    Need help with something specific? Our team is here to help.
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Us
                  </Button>
                </div>
                
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h3 className="font-medium mb-2">Video Tutorials</h3>
                  <p className="text-sm text-eilumi-dark-gray mb-3">
                    Learn how to use Eilumi AI with our step-by-step video tutorials.
                  </p>
                  <Button variant="outline" size="sm">
                    Watch Tutorials
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <p className="text-sm text-eilumi-dark-gray">
                  App Version: 1.0.0
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
