
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { UserContext } from "@/context/UserContext";
import { toast } from "@/components/ui/use-toast";

const userTypes = [
  {
    id: "artist",
    name: "Artist",
    description: "I create and perform my own music",
    icon: "🎤",
  },
  {
    id: "producer",
    name: "Producer",
    description: "I create beats and produce tracks",
    icon: "🎛️",
  },
  {
    id: "content-creator",
    name: "Content Creator",
    description: "I need music for my videos and content",
    icon: "📱",
  },
  {
    id: "hobbyist",
    name: "Hobbyist",
    description: "I make music for fun",
    icon: "🎸",
  },
];

const UserType = () => {
  const navigate = useNavigate();
  const { setUserType } = useContext(UserContext);
  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleContinue = () => {
    if (!selectedType) {
      toast({
        variant: "destructive",
        title: "Selection required",
        description: "Please select your user type to continue.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to save user type
    setTimeout(() => {
      setUserType(selectedType);
      toast({
        title: "Profile updated!",
        description: "Your user type has been saved.",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo />
          <h1 className="mt-6 text-2xl font-bold">Tell us about yourself</h1>
          <p className="mt-2 text-eilumi-dark-gray">
            We'll customize your experience based on your needs
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <RadioGroup value={selectedType} onValueChange={setSelectedType}>
            <div className="grid gap-4">
              {userTypes.map((type) => (
                <div key={type.id} className="flex">
                  <RadioGroupItem
                    value={type.id}
                    id={type.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={type.id}
                    className="flex items-center space-x-4 p-4 w-full rounded-lg border border-gray-100 peer-data-[state=checked]:border-eilumi-orange peer-data-[state=checked]:bg-eilumi-orange/5 cursor-pointer transition-all"
                  >
                    <div className="text-xl">{type.icon}</div>
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-eilumi-dark-gray">
                        {type.description}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
          
          <Button 
            onClick={handleContinue} 
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Continue to Dashboard"}
          </Button>
        </div>
        
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate("/auth")} 
            className="text-sm text-eilumi-dark-gray hover:text-eilumi-orange"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserType;
