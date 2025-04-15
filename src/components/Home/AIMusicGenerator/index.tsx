"use client";

import React, { useState, useEffect, useRef } from "react";
import jsonData from "@/data.json";
import Image from "next/image";

type MoodType = 'bright' | 'happy' | 'upbeat' | 'sad' | 'melancholic' | 'dreamy';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
  </svg>
);

const AIMusicGenerator = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<MoodType | "">("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const moods = [
    "Happy",
    "Bright",
    "Upbeat",
    "Sad",
    "Dreamy",
    "Melancholic"
  ];

  const loadingMessages = [
    "Crafting Your Perfect Beat!",
    "Mixing Magic in Progress!",
    "Fine-Tuning Your Soundtrack!"
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleAudioContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('audio')) {
        document.getElementById('pricing')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    document.addEventListener('click', handleAudioContextMenu);

    return () => {
      document.removeEventListener('click', handleAudioContextMenu);
    };
  }, []);

  const handleGenerate = () => {
    if (!selectedGenre || !selectedMood) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleMoodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMood(event.target.value as MoodType);
  };

  const getMoodType = (selectedMood: string): 'upbeat' | 'dreamy' => {
    switch (selectedMood.toLowerCase()) {
      case 'bright':
      case 'happy':
      case 'upbeat':
        return 'upbeat';
      case 'sad':
      case 'melancholic':
      case 'dreamy':
        return 'dreamy';
      default:
        return 'upbeat';
    }
  };

  const getSamplePath = (genre: string, mood: string) => {
    const moodType = getMoodType(mood);
    const sampleNumber = Math.floor(Math.random() * 6) + 1;
    return `/audio/${genre.toLowerCase()}/${moodType}/sample${sampleNumber}.mp3`;
  };

  const handlePlay = async () => {
    if (!selectedGenre || !selectedMood) return;

    try {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      let messageIndex = 0;
      
      const messageInterval = setInterval(() => {
        setLoadingMessage(loadingMessages[messageIndex]);
        messageIndex = (messageIndex + 1) % loadingMessages.length;
      }, 1000);

      await new Promise(resolve => setTimeout(resolve, 5000));
      
      clearInterval(messageInterval);
      setIsLoading(false);

      const trackToPlay = getSamplePath(selectedGenre, selectedMood);
      
      if (audioRef.current) {
        setCurrentTrack(trackToPlay);
        audioRef.current.src = trackToPlay;
        
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error in handlePlay:', error);
      setIsLoading(false);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const regenerateTrack = () => {
    if (!selectedGenre || !selectedMood) return;

    try {
      const newTrack = getSamplePath(selectedGenre, selectedMood);
      
      if (newTrack === currentTrack) {
        regenerateTrack();
        return;
      }

      setCurrentTrack(newTrack);
      if (audioRef.current) {
        audioRef.current.src = newTrack;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error in regenerateTrack:', error);
    }
  };

  const moodOptions = [
    { label: "Bright", value: "bright" },
    { label: "Happy", value: "happy" },
    { label: "Upbeat", value: "upbeat" },
    { label: "Sad", value: "sad" },
    { label: "Melancholic", value: "melancholic" },
    { label: "Dreamy", value: "dreamy" }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div id="music-generator" className="relative w-full max-w-2xl mx-auto pt-5 scroll-margin-top-24">
      <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#f15107]/20 via-black/5 to-[#f15107]/20 rounded-[40px] transform scale-105"></div>
      <div className="w-full p-6 backdrop-blur-sm rounded-3xl relative overflow-hidden bg-gradient-to-b from-black/10 to-transparent">
        {/* Background Image with Color Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-orange-900/30 to-red-900/40 mix-blend-color"></div>
          <Image
            src={`/images/hero/music-bg.jpg?v=${new Date().getTime()}`}
            alt="Music background"
            width={1000}
            height={600}
            className="object-cover w-full h-full rounded-3xl brightness-90"
            priority
            unoptimized
          />
        </div>
        
        <div className="flex flex-col items-start pl-8 pr-6 relative z-10 max-w-[70%]">
          <h2 className="text-xl font-bold text-white mb-2 whitespace-nowrap">
          Create Your Viral Music in Seconds
        </h2>
        <div className="w-full mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
            Select Genre
          </h3>
            <div className="flex gap-2">
            {jsonData.aiMusicGenerator.genres.map((genre) => (
              <button
                key={genre.name}
                onClick={() => setSelectedGenre(genre.name)}
                  className={`px-6 py-2 rounded-full text-sm transition-all ${
                  selectedGenre === genre.name
                      ? "bg-[#f15107] text-white shadow-lg"
                      : "bg-white/90 text-[#f15107] hover:bg-[#f15107] hover:text-white shadow-md"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
            Select Your Mood
          </h3>
            <div className="flex">
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value as MoodType)}
                className="w-72 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f15107] text-gray-600 text-sm bg-white/90 shadow-md"
            >
              <option value="">Choose your mood...</option>
              {moodOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

          <div className="w-full">
          <div className="flex gap-4 mb-4">
            <button
              onClick={handlePlay}
              disabled={!selectedGenre || !selectedMood || isLoading}
                className={`rounded-full w-14 h-14 flex items-center justify-center transition-all shadow-lg ${
                !selectedGenre || !selectedMood || isLoading
                  ? "bg-gray-200 cursor-not-allowed"
                  : isPlaying
                      ? "bg-[#f15107] text-white"
                      : "bg-white/90 text-[#f15107] hover:bg-[#f15107] hover:text-white"
              }`}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              onClick={regenerateTrack}
              disabled={!selectedGenre || !selectedMood}
                className={`rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-lg ${
                !selectedGenre || !selectedMood
                    ? "bg-white/90 text-gray-200 cursor-not-allowed"
                    : "bg-white/90 text-[#f15107] hover:bg-[#f15107] hover:text-white"
              }`}
              title="Generate new sample"
            >
              <RefreshIcon />
            </button>
          </div>

          {isLoading && (
              <div className="mb-4 p-4 rounded-lg bg-white/90 shadow-md text-[#f15107] animate-pulse max-w-sm">
              <div className="flex items-center">
                <div className="mr-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <div className="text-sm font-medium">
                  {loadingMessage}
                </div>
              </div>
            </div>
          )}

          <audio
            ref={audioRef}
            onEnded={() => setIsPlaying(false)}
            controls
            className="w-64 mt-2"
          />

          {currentTrack && !isLoading && (
              <div className="text-sm text-white mt-2">
              Now Playing: {selectedGenre} - {selectedMood}
            </div>
          )}

            <div className="text-xs text-white/90 mt-1">
            ✨ Upgrade to download tracks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMusicGenerator;