"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import brandData from "./brandData";
import Link from "next/link";
import menuDataJson from "@/data.json";
import AIMusicGenerator from "../AIMusicGenerator";

// Add blinking cursor style
<style jsx global>{`
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.animated-cursor {
  display: inline-block;
  width: 1ch;
  animation: blink 1s steps(1) infinite;
}
@keyframes gradientPulseLeft {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes gradientPulseRight {
  0%, 100% { background-position: 100% 50%; }
  50% { background-position: 0% 50%; }
}
.animated-gradient-left {
  background: linear-gradient(135deg, #ff9800 0%, #ffb347 60%, #ffcc33 100%);
  background-size: 200% 200%;
  animation: gradientPulseLeft 4s ease-in-out infinite;
}
.animated-gradient-right {
  background: linear-gradient(225deg, #f15107 0%, #ffb347 60%, #ffcc33 100%);
  background-size: 200% 200%;
  animation: gradientPulseRight 4s ease-in-out infinite;
}
@keyframes fadeInSoft {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.soft-fade-in {
  display: inline-block;
  opacity: 0;
  animation: fadeInSoft 0.6s ease forwards;
}
@keyframes dynamicUnderlay {
  0% { 
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0.05) 100%);
    transform: translateX(-100%);
  }
  50% { 
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0.1) 100%);
    transform: translateX(0%);
  }
  100% { 
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0.05) 100%);
    transform: translateX(100%);
  }
}
.dynamic-underlay {
  animation: dynamicUnderlay 3s ease-in-out infinite;
  background-size: 200% 100%;
}

@keyframes glossyShift {
  0%, 100% { 
    background-position: 0% 50%;
    box-shadow: 0 4px 20px rgba(251, 191, 36, 0.3);
  }
  50% { 
    background-position: 100% 50%;
    box-shadow: 0 6px 25px rgba(251, 191, 36, 0.5);
  }
}

@keyframes glossyShiftDark {
  0%, 100% { 
    background-position: 0% 50%;
    box-shadow: 0 4px 20px rgba(194, 65, 12, 0.2);
  }
  50% { 
    background-position: 100% 50%;
    box-shadow: 0 6px 25px rgba(194, 65, 12, 0.3);
  }
}
`}</style>

const Hero = () => {
	// Animated signature text component
	const AnimatedSignatureText = () => {
		const lines = [
			"Introducing",
			"AI Viral-Music Engine",
			"For Your TikTok, Reels, Or Shorts."
		];
		const [displayed, setDisplayed] = useState(["", "", ""]);
		const [currentLine, setCurrentLine] = useState(0);
		const timeoutRef = useRef<NodeJS.Timeout | null>(null);
		const [showTrendLine, setShowTrendLine] = useState(false);
		const trendWords = ["Create", "→", "Score", "→", "Post", "→", "Trend"];
		const [trendIndex, setTrendIndex] = useState(0);

		// Define the typing function outside useEffect so it can be called again
		const type = useRef<(line?: number, char?: number) => void>();
		type.current = (line = 0, char = 0) => {
			if (line < lines.length) {
				if (char <= lines[line].length) {
					setDisplayed(prev => prev.map((d, i) => i === line ? lines[line].slice(0, char) : d));
					setCurrentLine(line);
					timeoutRef.current = setTimeout(() => type.current?.(line, char + 1), 130);
				} else {
					timeoutRef.current = setTimeout(() => type.current?.(line + 1, 0), 864);
				}
			} else {
				setShowTrendLine(true);
				setTrendIndex(0);
				// Animate trend words
				const animateTrend = () => {
					if (trendIndex < trendWords.length) {
						setTrendIndex(i => i + 1);
						timeoutRef.current = setTimeout(animateTrend, 500);
					}
				};
				animateTrend();
				// Pause, then restart everything
				timeoutRef.current = setTimeout(() => {
					setDisplayed(["", "", ""]);
					setCurrentLine(0);
					setShowTrendLine(false);
					setTrendIndex(0);
					type.current?.(0, 0);
				}, 1200 + 400 * trendWords.length);
				return;
			}
		};

		useEffect(() => {
			type.current?.(0, 0);
			return () => {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
		}, []);

		return (
			<div className="animate-fade-slide-up text-center text-[2.8875vw] font-dancing text-white capitalize" style={{letterSpacing: '1.5px', lineHeight: '1.4', fontWeight: 500}}>
				<span style={{color: '#000', fontWeight: 600, display: 'inline-block', marginBottom: '1em', marginTop: '0.7em'}}>{displayed[0]}</span><br/>
				<span className="font-roboto font-bold" style={{color: '#fff', whiteSpace: 'nowrap', fontSize: '2vw'}}>{displayed[1]}</span><br/>
				<span className="font-roboto font-bold" style={{color: '#fff', whiteSpace: 'nowrap', fontSize: '2vw'}}>{displayed[2]}</span>
				{showTrendLine && <><br/>{trendWords.slice(0, trendIndex).map((word, i) => (
					<span key={i} className="font-roboto font-bold soft-fade-in" style={{color: '#fff', whiteSpace: 'nowrap', fontSize: '2vw', animationDelay: `${i * 0.18}s`}}>{word} </span>
				))}</>}
			</div>
		);
	};

	return (
		<section className="w-full min-h-screen pt-[60px] md:pt-[80px] flex flex-col justify-center items-center py-0 md:py-1 relative" style={{height: 'auto', maxHeight: 'none'}}>
			{/* Hero Section Background */}
			<div 
				className="absolute inset-0 bg-orange-100 dark:bg-orange-800"
				style={{
					zIndex: -1
				}}
			></div>
			<div className="container mx-auto flex flex-col items-center justify-center px-0 md:px-2 py-0 md:py-1 relative z-10">
				{/* Centered Text Content */}
				<div className="flex flex-col items-center text-center w-full max-w-none px-1 md:px-4 py-0 md:py-1">
					<div
						className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4"
						style={{
							fontFamily: 'Satoshi, sans-serif',
							letterSpacing: '0.5px',
							position: 'relative',
							lineHeight: 1.2
						}}
					>
						Creator: Your Video's Background Music Has 3 Seconds to Hook Viewers
					</div>
					<div
						className="text-gray-700 dark:text-white mb-4 md:mb-6 max-w-6xl"
						style={{
							fontSize: '1.68rem',
							fontWeight: 400,
							lineHeight: 1.6,
							letterSpacing: '0.2px',
							fontFamily: 'Satoshi, sans-serif'
						}}
					>
						Generic stock music = <strong>lost views and income</strong>. Trending copyrighted music = <strong>legal disaster</strong>. Original viral-style music = <strong>higher engagement and safe monetization</strong>. Eilumi AI creates <strong>trending tracks</strong> for TikTok, Reels, and Shorts while protecting you from <strong>copyright strikes</strong> that remove monetization, flag channels, and cancel brand deals.
					</div>




					<button 
						onClick={() => {
							// Trigger the waitlist modal
							const event = new CustomEvent('openWaitlist');
							window.dispatchEvent(event);
						}}
						className="mt-4 md:mt-6 bg-orange-600 text-white font-bold rounded-lg px-8 py-4 md:px-12 md:py-4 text-[16px] md:text-[18px] hover:bg-orange-700 transition w-auto transform hover:scale-105 flex items-center gap-2"
					>
						Join the Waitlist →
					</button>
					
					{/* Feature Highlights */}
					<div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-6 md:gap-8">
						<div className="flex items-center gap-2 text-base md:text-lg text-gray-700 dark:text-white font-bold">
							<div className="w-7 h-7 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
								<span className="text-red-600 dark:text-red-300 font-bold text-sm">🎯</span>
							</div>
							<span>Built by Creators Who Get It</span>
						</div>
						<div className="flex items-center gap-2 text-base md:text-lg text-gray-700 dark:text-white font-bold">
							<div className="w-7 h-7 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
								<span className="text-yellow-600 dark:text-yellow-300 font-bold text-sm">⭐</span>
							</div>
							<span>No Copyright Headaches</span>
						</div>
						<div className="flex items-center gap-2 text-base md:text-lg text-gray-700 dark:text-white font-bold">
							<div className="w-7 h-7 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
								<span className="text-red-600 dark:text-red-300 font-bold text-sm">🛡️</span>
							</div>
							<span>Protects Your Income</span>
						</div>
						<div className="flex items-center gap-2 text-base md:text-lg text-gray-700 dark:text-white font-bold">
							<div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
								<span className="text-green-600 dark:text-green-300 font-bold text-sm">📊</span>
							</div>
							<span>4x More Engagement</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

{/* --- Restored Sections Below Hero Banner --- */}

{/* Target Audience Section - Who's This Built For? */}
<div className='mx-auto mt-12 mb-20 w-full max-w-[740px] px-4 sm:px-8 xl:px-0'>
	<h2 className='mb-8 text-center font-satoshi text-[24.5px] font-bold -tracking-[1.6px] text-black dark:text-white lg:text-[33.6px] xl:text-[40.6px] xl:leading-[1.12]'>
		{menuDataJson.hero.targetAudience.title}
	</h2>
	<div className='grid gap-6 md:grid-cols-3'>
		{menuDataJson.hero.targetAudience.items.map((item, index) => (
			<div key={index} className='rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2 transition duration-300 ease-in-out hover:shadow-[0px_15px_30px_rgba(249,115,22,0.4)] shadow-[0px_8px_15px_rgba(249,115,22,0.15)]'>
				<h3 className='mb-3 font-satoshi text-lg font-bold text-black dark:text-white'>
					{item.title}
				</h3>
				<p className='text-gray-6 dark:text-gray-4'>
					{item.description}
				</p>
			</div>
		))}
	</div>
</div>

{/* Launchpad/AI Music Generator Section */}
<div className='mx-auto mt-12 mb-20 w-full max-w-[740px] px-4 sm:px-8 xl:px-0'>
	<h2 className='mb-8 text-center font-satoshi text-[24.5px] font-bold -tracking-[1.6px] text-black dark:text-white lg:text-[33.6px] xl:text-[40.6px] xl:leading-[1.12]'>
		Say Hello! to your AI-powered Viral Music Launchpad and Create Now
	</h2>
	<div className='mx-auto mb-2'>
		<AIMusicGenerator />
	</div>
</div>

{/* Brand Logos/Press Mentions Section */}
<div className='mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0'>
	<h2 className='text-center font-satoshi text-lg font-medium text-black dark:text-white'>
		{menuDataJson.hero.brand.description}
	</h2>
	<div className='mt-9 flex flex-wrap items-center justify-center gap-7.5 xl:gap-16'>
		{brandData?.map((brand, key) => (
			<Link
				key={key}
				href={brand.link}
				target='_blank'
				rel='noopener noreferrer'
				aria-label={brand.name}
				className='text-dark-4 duration-300 ease-in-out hover:text-dark-3 dark:hover:text-white'
			>
				<Image 
					src={brand.image} 
					alt={brand.name} 
					width={153} 
					height={28} 
					className='text-dark-4 duration-300 ease-in-out hover:text-dark-3 dark:hover:text-white'
				/>
			</Link>
		))}
	</div>
</div>
