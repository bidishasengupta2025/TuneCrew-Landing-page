import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `TuneCrew AI`,
  description: `TuneCrew AI is your personal AI-powered music co-producer, transforming your raw musical ideas into fully produced tracks in seconds. With instant song generation, voice and lyrics upload, diverse global beats, and AI-enhanced harmonization, TuneBrush helps you compose, experiment, and innovate effortlessly—no studio required.`,
  openGraph: {
    type: "website",
    title: `TuneCrew AI`,
    description: `TuneCrew AI is your personal AI-powered music co-producer, transforming your raw musical ideas into fully produced tracks in seconds. With instant song generation, voice and lyrics upload, diverse global beats, and AI-enhanced harmonization, TuneBrush helps you compose, experiment, and innovate effortlessly—no studio required.`
  },
  twitter: {
    card: "summary_large_image",
    title: `TuneCrew AI`,
    description: `TuneCrew AI is your personal AI-powered music co-producer, transforming your raw musical ideas into fully produced tracks in seconds. With instant song generation, voice and lyrics upload, diverse global beats, and AI-enhanced harmonization, TuneBrush helps you compose, experiment, and innovate effortlessly—no studio required.`
  },
};

export default function HomePage() {
  return (
    <main>
      <Home />
    </main>
  );
}
