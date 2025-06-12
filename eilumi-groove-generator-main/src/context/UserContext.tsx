
import { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface Voice {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

interface UserContextType {
  userType: string;
  setUserType: (value: string) => void;
  currentTrack: any;
  setCurrentTrack: (value: any) => void;
  savedVoices: Voice[];
  setSavedVoices: (value: Voice[]) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  isLoggedIn: boolean;
}

export const UserContext = createContext<UserContextType>({
  userType: "",
  setUserType: () => {},
  currentTrack: null,
  setCurrentTrack: () => {},
  savedVoices: [],
  setSavedVoices: () => {},
  darkMode: false,
  setDarkMode: () => {},
  isLoggedIn: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userType, setUserType] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [savedVoices, setSavedVoices] = useState<Voice[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  
  const { user } = useAuth();
  const isLoggedIn = !!user;
  
  return (
    <UserContext.Provider value={{ 
      userType, 
      setUserType,
      currentTrack,
      setCurrentTrack,
      savedVoices,
      setSavedVoices,
      darkMode,
      setDarkMode,
      isLoggedIn
    }}>
      {children}
    </UserContext.Provider>
  );
};
