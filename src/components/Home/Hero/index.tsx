import Image from "next/image";
import React from "react";
import brandData from "./brandData";
import Link from "next/link";
import menuDataJson from "@/data.json";
import AIMusicGenerator from "../AIMusicGenerator";

const Hero = () => {
	return (
		<>
			{/* Main Hero Section */}
			<div className="relative pt-0">
				{/* Hero Text Section with Background */}
				<div className="relative min-h-[500px] w-full overflow-hidden">
					{/* Background div with direct styling */}
					<div 
						className="absolute top-0 left-0 w-full h-full"
						style={{
							backgroundImage: 'url("/images/hero/background.jpg")',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							filter: 'contrast(1.2) brightness(1) saturate(1.1)',
							transform: 'scale(1.01)',
							zIndex: '-1'
						}}
					/>
					
					{/* Remove colored overlay gradients for max visibility */}
					{/* <div 
						className="absolute top-0 left-0 w-full h-full"
						style={{
							background: 'linear-gradient(45deg, rgba(255,69,0,0.15), rgba(255,140,0,0.15))',
							mixBlendMode: 'color',
							zIndex: '-1'
						}}
					/> */}

					{/* Remove dark overlay for text readability */}
					{/* <div 
						className="absolute top-0 left-0 w-full h-full"
						style={{
							background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)',
							zIndex: '-1'
						}}
					/> */}

					<div className='relative z-10 pt-30 pb-10 lg:pt-30 xl:pt-[170px]'>
						<div className='mx-auto w-full max-w-[740px] px-4 text-center sm:px-8 xl:px-0'>
							<div
								style={{
									background: 'rgba(0,0,0,0.5)',
									borderRadius: '16px',
									padding: '2rem',
									border: '1px solid rgba(255, 255, 255, 0.03)',
									boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
								}}
							>
								<h1 className='mb-5 font-satoshi text-[20px] font-bold -tracking-[1.6px] lg:text-[28px] xl:text-[32px] xl:leading-[1.12]'>
									<div 
										className="text-[#FFD700] font-bold text-[1.4em] mb-3"
										style={{
											textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
											lineHeight: '1.5',
										}}
									>
										{menuDataJson.hero.heading.start}
									</div>
									
									<div className="text-white italic font-normal text-[1.1em] mb-6" style={{lineHeight: '1.5'}}>
										{menuDataJson.hero.heading.highlighter}
									</div>

									<div className="text-shadow-lg">
										<span className="relative text-white">
											{menuDataJson.hero.heading.end}
										</span>
									</div>
								</h1>

								<p 
									className='mx-auto mt-8 mb-7.5 w-full max-w-[580px] text-xl -tracking-[0.2px] text-white/90' 
									style={{ lineHeight: '1.6' }}
									dangerouslySetInnerHTML={{ 
										__html: menuDataJson.hero.description
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Target Audience Section - No Background */}
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

				{/* Rest of the sections */}
				<div className='mx-auto w-full max-w-[740px] px-4 text-center sm:px-8 xl:px-0'>
					<h2 className='font-satoshi text-[24.5px] font-bold -tracking-[1.6px] text-black dark:text-white lg:text-[33.6px] xl:text-[40.6px] xl:leading-[1.12]'>
						Say Hello! to your AI-powered Viral Music Launchpad and Create Now
					</h2>
				</div>

				<div className='mx-auto mb-2'>
					<AIMusicGenerator />
				</div>

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
			</div>

			{/* <!-- Hero Bg Shapes --> */}
			<div className='hidden sm:block'>
				<div className='absolute left-0 top-0 -z-1'>
					<Image
						src='/images/hero/hero-shape-01.svg'
						alt='shape'
						width={340}
						height={480}
					/>
				</div>
				<div className='absolute right-0 top-0 -z-1'>
					<Image
						src='/images/hero/hero-shape-02.svg'
						alt='shape'
						width={425}
						height={682}
					/>
				</div>
			</div>
		</>
	);
};

export default Hero;
