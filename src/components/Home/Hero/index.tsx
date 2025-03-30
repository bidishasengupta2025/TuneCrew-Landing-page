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
			<section className='relative z-1 overflow-hidden pb-17.5 pt-30 lg:pb-20 lg:pt-30 xl:pb-25 xl:pt-[170px]'>
				<div className='mx-auto w-full max-w-[740px] px-4 text-center sm:px-8 xl:px-0'>
					<h1 className='mb-5 font-satoshi text-heading-4 font-bold -tracking-[1.6px] text-black dark:text-white lg:text-heading-2 xl:text-[58px] xl:leading-[1.12] flex flex-col gap-2'>
						<div>
							{menuDataJson.hero.heading.start}
						</div>
						
						<div>
							<span className='text-primary'>
								{menuDataJson.hero.heading.highlighter}
							</span>
						</div>

						<div>
							<span className="relative">
								{menuDataJson.hero.heading.end}
								<span className='absolute bottom-0.5 left-0 h-2 w-full pl-1 pr-2'>
									<svg
										className='fill-current'
										width='106%'
										height='100%'
										viewBox='0 0 100 7'
										preserveAspectRatio='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M100 2.49998C100 1.50001 100 2.5 100 1.50001C64.2857 -0.240394 17.4603 3.99028 0 6.05927L0 2.05807C17.4603 0.641568 64.2857 0 100 2.49998Z'
										/>
									</svg>
								</span>
							</span>
						</div>
					</h1>

					<p className='mx-auto mb-7.5 w-full max-w-[580px] text-lg -tracking-[0.2px] dark:text-gray-5'>
						{menuDataJson.hero.description}
					</p>
				</div>

				{/* AI Music Generator */}
				<div className='mx-auto mt-12 mb-20'>
					<AIMusicGenerator />
				</div>

				{/* <!-- Hero brands --> */}
				<div className='mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0'>
					<h2 className='text-center font-satoshi text-lg font-medium text-black dark:text-white'>
						{menuDataJson.hero.brand.description}
					</h2>

					<div className='mt-9 flex flex-wrap items-center justify-center gap-7.5 xl:gap-16'>
						{/* <!-- brand item --> */}
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
			</section>

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
