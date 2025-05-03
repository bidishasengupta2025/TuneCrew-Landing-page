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

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed left-0 top-0 z-50 w-full bg-transparent transition-all duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4" style={{position: 'relative', zIndex: 2}}>
        <div className="relative flex items-center justify-between py-5">
          {/* Logo */}
          <div style={{position: 'relative', display: 'inline-block'}}>
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', zIndex: 1}} />
            <Link href="/" className="block" style={{position: 'relative', zIndex: 2}}>
              <Image
                src={typedMenuData.header.logo}
                alt="Logo"
                width={100}
                height={50}
                className="w-full"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={navbarToggleHandler}
            className="block xl:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className={`absolute block h-0.5 w-full bg-black transition-all duration-300 ${navbarOpen ? 'top-2.5 rotate-45' : 'top-0'}`}></span>
              <span className={`absolute top-2.5 block h-0.5 w-full bg-black transition-all duration-300 ${navbarOpen ? 'opacity-0' : ''}`}></span>
              <span className={`absolute block h-0.5 w-full bg-black transition-all duration-300 ${navbarOpen ? 'top-2.5 -rotate-45' : 'top-5'}`}></span>
            </span>
          </button>

          {/* Navigation Menu */}
          <nav className={`absolute left-0 top-full w-full xl:static xl:w-auto xl:opacity-100 ${
            navbarOpen ? 'block' : 'hidden xl:block'
          }`}>
            <div className="container mx-auto">
              <div className="flex flex-col items-center gap-8 bg-transparent p-4 xl:flex-row xl:bg-transparent xl:p-0">
                <ThemeSwitcher />
                
                <ul className="flex flex-col items-center gap-4 xl:flex-row">
                  {menuData?.map((item: Menu, key) => (
                    <li key={key}>
                      <Link
                        href={item?.path || '#'}
                        className={`block rounded-full px-5 py-2 transition-colors ${
                          item?.title === "Features"
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "text-gray-900 hover:text-primary"
                        }`}
                      >
                        {item?.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {typedMenuData.header.cta.map((ctaItem, index) => (
                    <Link
                      key={index}
                      href={ctaItem.path}
                      className="rounded-full border-2 border-primary bg-white px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
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
