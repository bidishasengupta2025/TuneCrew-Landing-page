
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    
    // Animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);
  
  const handleGetStarted = () => {
    navigate("/auth");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-eilumi-light-gray p-6">
      <div 
        className={`flex flex-col items-center max-w-md text-center transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-6">
          <Logo size="lg" showText={true} showTagline={false} centered={true} />
        </div>
        
        <p className="mt-2 text-eilumi-dark-gray text-lg max-w-sm">
          Discover the joy of music creation with our easy-to-use platform.
        </p>
        
        <Button 
          onClick={handleGetStarted} 
          className="mt-8 px-10 py-6 text-lg transition-transform hover:scale-105"
        >
          Get Started
        </Button>
        
        <div className="mt-12 flex flex-col md:flex-row gap-4 text-sm text-eilumi-dark-gray">
          <a href="#" className="hover:text-eilumi-orange transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-eilumi-orange transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-eilumi-orange transition-colors">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
