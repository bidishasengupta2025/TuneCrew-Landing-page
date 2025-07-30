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
		<section className="w-full min-h-screen pt-[60px] md:pt-[100px] flex flex-col justify-center items-center bg-[#E55A2B] py-4 md:py-6" style={{height: 'auto', maxHeight: 'none'}}>
			<div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4">
				{/* Left: Text Content */}
				<div className="flex-1 flex flex-col items-start md:items-start text-left md:text-left mt-2 md:mt-12 max-w-xl md:max-w-2xl px-2 md:px-8 py-2 md:py-4">
					<h1
						className="text-xl font-bold text-white lg:text-2xl xl:text-3xl mb-4 md:mb-6"
						style={{
							color: '#ffffff',
							textShadow: '0 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.2)',
							fontFamily: 'Satoshi, sans-serif',
							letterSpacing: '0.5px',
							position: 'relative'
						}}
					>
						<span className="dynamic-underlay" style={{
							padding: '6px 12px',
							borderRadius: '6px',
							display: 'inline-block',
							borderBottom: '2px solid rgba(255,255,255,0.4)',
							position: 'relative',
							overflow: 'hidden'
						}}>
							AI Music That Hooks. No Strikes. More Views.
						</span>
					</h1>
					<div
						className="text-white mb-3"
						style={{
							fontSize: '1.4rem',
							fontWeight: 500,
							lineHeight: 1.3,
							letterSpacing: '0.2px',
							textShadow: '0 1px 3px rgba(0,0,0,0.2)',
							fontFamily: 'Satoshi, sans-serif'
						}}
					>
						<span style={{textShadow: '0 2px 4px rgba(0,0,0,0.4)', fontWeight: '600'}}>$150K/year</span> from Viral Content — Ready?
					</div>
					<div
						className="text-white mb-2"
						style={{
							fontSize: '1.3rem',
							fontWeight: 500,
							lineHeight: 1.4,
							letterSpacing: '0.2px',
							textShadow: '0 2px 4px rgba(0,0,0,0.2)',
							fontFamily: 'Satoshi, sans-serif'
						}}
					>
						<span style={{textShadow: '0 2px 4px rgba(0,0,0,0.4)', fontWeight: '600'}}>Secret Weapon:</span> AI-powered background music that hooks views in 3 seconds — scored against 1,000s of viral tracks- Copyright free!
					</div>


					<div
						className="text-white relative overflow-hidden mb-4 md:mb-6"
						style={{
							fontSize: '1.3rem',
							fontWeight: 600,
							lineHeight: 1.4,
							letterSpacing: '0.2px',
							textShadow: '0 2px 4px rgba(0,0,0,0.2)',
							fontFamily: 'Satoshi, sans-serif',
							maxWidth: '100%',
							width: '100%'
						}}
					>
						<div
							className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-lg"
							style={{
								transform: 'skew(-1deg)',
								zIndex: -1,
								background: 'linear-gradient(90deg, #dc2626 0%, #ea580c 50%, #dc2626 100%)',
								boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
							}}
						></div>
						<div 
							className="relative px-3 py-2 md:px-4 md:py-3 text-center font-semibold"
							style={{
								animation: 'ticker 17.784s linear infinite',
								whiteSpace: 'nowrap',
								display: 'inline-block',
								width: 'max-content'
							}}
						>
							<span className="text-white font-bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>BREAKING:</span> <span className="text-white font-bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>Over 10M creators</span> <span className="text-white font-bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>hit by copyright strikes in 2024. 3 Strikes = Channel suspended. Protect your channel now.</span>
						</div>
					</div>
					<div
						className="text-white mb-4"
						style={{
							fontSize: '1.4rem',
							fontWeight: 700,
							lineHeight: 1.3,
							letterSpacing: '0.3px',
							textShadow: '0 2px 4px rgba(0,0,0,0.3)',
							fontFamily: 'Satoshi, sans-serif'
						}}
					>
						Creators, don't follow the trend, Become The One!
					</div>

					<button 
						onClick={() => {
							// Trigger the waitlist modal
							const event = new CustomEvent('openWaitlist');
							window.dispatchEvent(event);
						}}
						className="mt-2 md:mt-4 bg-white text-black font-open-sauce font-bold rounded-full px-6 py-3 md:px-10 md:py-4 text-[14px] md:text-[18px] shadow-[0_8px_32px_rgba(68,68,68,0.3)] hover:shadow-[0_12px_40px_rgba(68,68,68,0.4)] hover:bg-orange-100 transition w-auto transform hover:scale-105"
					>
						Join Waitlist
					</button>
					<div
						className="text-white mt-8"
						style={{
							fontSize: '0.8rem',
							fontWeight: 400,
							fontStyle: 'italic',
							lineHeight: 1.4,
							letterSpacing: '0.1px',
							textShadow: '0 1px 2px rgba(0,0,0,0.1)',
							margin: '8px 0',
							fontFamily: 'Satoshi, sans-serif',
							opacity: 0.8
						}}
					>
						*Results may vary. Earnings depend on content quality, consistency, and market factors. Eilumi provides tools but does not guarantee income or viral success.
					</div>
				</div>
				{/* Right: App Screenshots */}
				<div className="flex-1 flex justify-center md:justify-end mt-4 md:mt-12">
					<div className="flex flex-row gap-3 md:gap-6 items-end">
						<img src="/images/app-screenshot.jpg" alt="App Screenshot" className="w-[150px] md:w-[253px] rounded-2xl shadow-2xl border-4 border-white transform rotate-[-12deg] md:rotate-[-10deg] mt-4 md:mt-0" style={{boxShadow: '0 16px 40px 0 rgba(0,0,0,0.18), 0 2px 8px 0 rgba(0,0,0,0.10)'}} />
						<img src="/images/app-screenshort-2.jpg" alt="App Screenshot 2" className="w-[150px] md:w-[253px] rounded-2xl shadow-2xl border-4 border-white transform rotate-[8deg] md:rotate-[10deg] mt-8 md:mt-12" style={{boxShadow: '0 16px 40px 0 rgba(0,0,0,0.18), 0 2px 8px 0 rgba(0,0,0,0.10)'}} />
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
