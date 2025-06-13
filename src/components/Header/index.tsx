"use client";
import menuDataJson from "@/data.json";
import { Menu } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "./ThemeSwitcher";
import { menuData } from "./menuData";
import { onScroll } from "@/libs/scrollActive";
import { usePathname } from "next/navigation";

// Add these type definitions at the top of the file after the imports
type HeaderMenuItem = {
  title: string;
  path: string;
};

type HeaderData = {
  logo: string;
  logoLight: string;
  menu: HeaderMenuItem[];
  cta: HeaderMenuItem[];
};

// Type assertion for menuDataJson to use HeaderData
const typedMenuData = menuDataJson as { header: HeaderData };

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathUrl = usePathname();

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Add smooth scroll function
  const scrollToPreview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const musicGeneratorSection = document.getElementById('music-generator');
    if (musicGeneratorSection) {
      musicGeneratorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setNavbarOpen(false); // Close mobile menu if open
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed left-0 top-0 z-50 w-full bg-white dark:bg-black transition-all duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4" style={{position: 'relative', zIndex: 2}}>
        <div className="relative flex items-center justify-between py-5">
          {/* Logo */}
          <div style={{position: 'relative', display: 'inline-block'}} className="ml-[-24px]">
            <Link href="/" className="block" style={{position: 'relative', zIndex: 2}}>
              <Image
                src="/images/logo/logo-light.svg"
                alt="Logo"
                width={428}
                height={80}
                className="w-[428px] h-[80px] dark:hidden"
              />
              <Image
                src="/images/logo/logo.svg"
                alt="Logo"
                width={428}
                height={80}
                className="hidden w-[428px] h-[80px] dark:block"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={navbarToggleHandler}
            className="block xl:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className={`absolute block h-0.5 w-full bg-black dark:bg-white transition-all duration-300 ${navbarOpen ? 'top-2.5 rotate-45' : 'top-0'}`}></span>
              <span className={`absolute top-2.5 block h-0.5 w-full bg-black dark:bg-white transition-all duration-300 ${navbarOpen ? 'opacity-0' : ''}`}></span>
              <span className={`absolute block h-0.5 w-full bg-black dark:bg-white transition-all duration-300 ${navbarOpen ? 'top-2.5 -rotate-45' : 'top-5'}`}></span>
            </span>
          </button>

          {/* Navigation Menu */}
          <nav className={`absolute left-0 top-full w-full xl:static xl:w-auto xl:opacity-100 ${
            navbarOpen ? 'block' : 'hidden xl:block'
          }`} 
            style={{
              background: navbarOpen ? '#fff' : 'transparent',
              borderRadius: navbarOpen ? '0 0 18px 18px' : '0',
              boxShadow: navbarOpen ? '0 8px 32px rgba(0,0,0,0.10)' : 'none',
              zIndex: 10,
              transition: 'all 0.3s',
            }}
          >
            <div className="container mx-auto xl:px-0 px-0">
              <div className="flex flex-col items-center gap-8 bg-transparent p-4 xl:flex-row xl:bg-transparent xl:p-0">
                <ThemeSwitcher />
                
                <ul className="flex flex-col items-center gap-4 xl:flex-row xl:gap-4">
                  {menuData?.map((item: Menu, key) => (
                    <li key={key} className="w-full xl:w-auto">
                      <Link
                        href={item?.path || '#'}
                        className={`block w-full text-center rounded-full px-6 py-3 text-base font-semibold transition-colors xl:w-auto xl:text-left xl:rounded-full xl:px-5 xl:py-2 ${
                          item?.title === "Features"
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "text-gray-900 dark:text-white hover:text-primary bg-orange-50 xl:bg-transparent"
                        } ${navbarOpen ? 'shadow-md border border-orange-200' : ''}`}
                        style={{margin: navbarOpen ? '6px 0' : undefined}}
                      >
                        {item?.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col xl:flex-row items-center gap-4 w-full xl:w-auto">
                  {typedMenuData.header.cta.map((ctaItem, index) => (
                    <Link
                      key={index}
                      href={ctaItem.title === "Create Now" ? "#music-generator" : ctaItem.path}
                      onClick={ctaItem.title === "Create Now" ? scrollToPreview : undefined}
                      className="w-full xl:w-auto rounded-full border-2 border-primary dark:border-white bg-white dark:bg-transparent px-6 py-3 xl:px-5 xl:py-2 text-base font-medium text-primary dark:text-white transition-colors hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary shadow-md xl:shadow-none mb-2 xl:mb-0"
                      style={{margin: navbarOpen ? '6px 0' : undefined}}
                    >
                      {ctaItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
