"use client";

import React, { useState, useEffect, useRef } from "react";
import jsonData from "@/data.json";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";

type MoodType = 'upbeat' | 'dreamy';

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-5 h-5">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const RedoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
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
    // Add event listener to handle download attempts from the audio player menu
    const handleAudioContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('audio')) {
        // If clicking download from the menu, redirect to pricing
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

  // Map display moods to internal mood types
  const getMoodType = (selectedMood: string): MoodType => {
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

  // Generate sample path based on genre and mood
  const getSamplePath = (genre: string, mood: string) => {
    const moodType = getMoodType(mood);
    const sampleNumber = Math.floor(Math.random() * 6) + 1; // Random number between 1-6
    return `/audio/${genre.toLowerCase()}/${moodType}/sample${sampleNumber}.mp3`;
  };

  const handlePlay = async () => {
    if (!selectedGenre || !selectedMood) return;

    try {
      // If already playing, pause immediately without animation
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }

      // Show loading animation only when starting playback
      setIsLoading(true);
      let messageIndex = 0;
      
      // Start cycling through messages
      const messageInterval = setInterval(() => {
        setLoadingMessage(loadingMessages[messageIndex]);
        messageIndex = (messageIndex + 1) % loadingMessages.length;
      }, 1000);

      // Wait for 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      clearInterval(messageInterval);
      setIsLoading(false);

      // Play logic
      const trackToPlay = getSamplePath(selectedGenre, selectedMood);
      
      if (audioRef.current) {
        if (currentTrack !== trackToPlay) {
          setCurrentTrack(trackToPlay);
          audioRef.current.src = trackToPlay;
        }
        
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
      
      // Make sure we don't get the same track
      if (newTrack === currentTrack) {
        regenerateTrack(); // Try again if we got the same track
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
    { label: "Bright", value: "upbeat" },
    { label: "Happy", value: "upbeat" },
    { label: "Upbeat", value: "upbeat" },
    { label: "Sad", value: "dreamy" },
    { label: "Melancholic", value: "dreamy" },
    { label: "Dreamy", value: "dreamy" }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl border-2 border-[#f15107] shadow-[0_14px_28px_rgba(241,81,7,0.25)]">
      <div className="flex flex-col items-center relative z-10">
        <h2 className="text-2xl font-bold text-[#0F1B4C] mb-2 text-center">
          Create Your Viral Music in Seconds
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center max-w-sm">
          Make Music Fast. Let the Algorithm Do the Rest.
        </p>

        <div className="w-full mb-6">
          <h3 className="text-lg font-semibold text-[#0F1B4C] mb-3 text-center">
            Select Genre
          </h3>
          <div className="flex justify-center gap-2">
            {jsonData.aiMusicGenerator.genres.map((genre) => (
              <button
                key={genre.name}
                onClick={() => setSelectedGenre(genre.name)}
                className={`px-6 py-2 rounded-full text-sm transition-all border ${
                  selectedGenre === genre.name
                    ? "bg-[#f15107] border-[#f15107] text-white"
                    : "bg-white border-[#f15107] text-[#f15107]"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full mb-6">
          <h3 className="text-lg font-semibold text-[#0F1B4C] mb-3 text-center">
            Select Your Mood
          </h3>
          <div className="flex justify-center">
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value as MoodType)}
              className="w-72 p-2.5 rounded-lg border border-[#f15107] focus:outline-none focus:ring-1 focus:ring-[#f15107] text-gray-600 text-sm"
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

        <div className="w-full flex flex-col items-center">
          <div className="flex gap-4 mb-4">
            <button
              onClick={handlePlay}
              disabled={!selectedGenre || !selectedMood || isLoading}
              className={`rounded-full w-14 h-14 flex items-center justify-center transition-all ${
                !selectedGenre || !selectedMood || isLoading
                  ? "bg-gray-200 cursor-not-allowed"
                  : isPlaying
                    ? "bg-[#f15107] border-[#f15107] text-white"
                    : "bg-white border-[#f15107] text-[#f15107]"
              }`}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              onClick={regenerateTrack}
              disabled={!selectedGenre || !selectedMood}
              className={`rounded-full w-12 h-12 flex items-center justify-center transition-all border ${
                !selectedGenre || !selectedMood
                  ? "bg-white border-gray-200 text-gray-200 cursor-not-allowed"
                  : "bg-white border-[#f15107] text-[#f15107]"
              }`}
              title="Generate new sample"
            >
              <RedoIcon />
            </button>
          </div>

          {/* Loading Animation */}
          {isLoading && (
            <div className="mb-4 p-4 rounded-lg bg-[#fff2ed] text-[#f15107] animate-pulse">
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
            <div className="text-sm text-gray-600 mt-2 text-center">
              Now Playing: {selectedGenre} - {selectedMood}
            </div>
          )}

          {/* Optional: Keep the upgrade message */}
          <div className="text-xs text-gray-500 mt-1">
            ✨ Upgrade to download tracks
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMusicGenerator; 