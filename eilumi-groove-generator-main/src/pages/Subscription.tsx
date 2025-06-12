
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import NavBar from "@/components/NavBar";
import { UserContext } from "@/context/UserContext";

interface Plan {
  name: string;
  price: string;
  features: string[];
  limitations: string[];
  buttonText: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    features: [
      "5 AI tracks per month",
      "Basic optimization",
      "MP3 export",
    ],
    limitations: [
      "Limited genre selection",
      "Standard quality audio",
      "Eilumi AI credit required",
    ],
    buttonText: "Current Plan",
  },
  {
    name: "Basic",
    price: "$9.99/mo",
    features: [
      "30 AI tracks per month",
      "Advanced optimization",
      "MP3 & WAV export",
      "Social sharing",
      "Remove Eilumi credit",
    ],
    limitations: [
      "Standard mixing quality",
    ],
    buttonText: "Upgrade",
    popular: true,
  },
  {
    name: "Pro",
    price: "$19.99/mo",
    features: [
      "Unlimited AI tracks",
      "Premium optimization",
      "All export formats",
      "Priority generation",
      "Advanced customization",
      "Commercial usage",
      "Premium support",
    ],
    limitations: [],
    buttonText: "Upgrade to Pro",
  },
];

const Subscription = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);
  
  const handleUpgrade = (plan: string) => {
    if (plan === "Free") return;
    
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Upgrade successful!",
        description: `You've upgraded to the ${plan} plan.`,
      });
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-eilumi-off-white">
      <NavBar />
      
      <main className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-eilumi-dark-gray max-w-lg">
            Unlock more features and generate better tracks with our premium plans
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white rounded-xl border ${
                plan.popular 
                  ? "border-eilumi-orange shadow-lg relative" 
                  : "border-gray-100 shadow-sm"
              } p-6 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-eilumi-orange text-white text-xs font-bold py-1 px-3 rounded-full">
                  Popular
                </div>
              )}
              
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className={`text-2xl font-bold mt-2 ${plan.popular ? "text-eilumi-orange" : ""}`}>
                {plan.price}
              </p>
              
              <div className="mt-6 flex-grow">
                <h3 className="text-sm font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.limitations.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold mt-4 mb-3">Limitations</h3>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center text-sm text-eilumi-dark-gray">
                          <span className="h-4 w-4 text-eilumi-gray mr-2 flex-shrink-0">•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <Button 
                onClick={() => handleUpgrade(plan.name)}
                disabled={isLoading || plan.name === "Free"}
                variant={plan.popular ? "default" : "outline"}
                className="mt-6 w-full"
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-lg font-semibold mb-4">Need a custom plan?</h2>
          <p className="text-eilumi-dark-gray mb-6">
            Contact us for enterprise options or special requirements
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
