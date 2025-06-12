
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Music, Settings, User, List, Upload, Mic, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  // Main navigation items
  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Create Music', path: '/create-music', icon: Music },
    { name: 'Voice Calibration', path: '/voice-calibration', icon: Mic },
    { name: 'Library', path: '/library', icon: List },
  ];
  
  // Secondary navigation items
  const secondaryNavItems = [
    { name: 'Upload & Record', path: '/record-upload', icon: Upload },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/49ded806-212d-43a7-a6b3-77afbca42bb7.png" 
              alt="Eilumi AI Logo" 
              className={`${isMobile ? 'h-8 w-8' : 'h-9 w-9'}`}
            />
            {!isMobile && (
              <span className="font-poppins font-semibold text-lg ml-1">
                Eilumi <span className="text-eilumi-orange">AI</span>
              </span>
            )}
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link to={item.path}>
                    <Button 
                      variant={isActive(item.path) ? "default" : "ghost"} 
                      className="px-4 py-2"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                </NavigationMenuItem>
              ))}
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>More</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-4 w-[240px]">
                    {secondaryNavItems.map((item) => (
                      <Link to={item.path} key={item.name} className="block">
                        <NavigationMenuLink
                          className={`${navigationMenuTriggerStyle()} ${
                            isActive(item.path) ? "bg-accent" : ""
                          }`}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          <span>{item.name}</span>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                    <Link to="/subscription" className="block">
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} ${
                          isActive("/subscription") ? "bg-accent" : ""
                        }`}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        <span>Subscription</span>
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={isActive("/profile") ? "default" : "ghost"} className="mr-2">
                <User className="h-4 w-4 mr-2" />
                {user.email?.split('@')[0] || "Profile"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile Navigation is handled by BottomNavBar component */}
      </div>
    </nav>
  );
};

export default NavBar;
