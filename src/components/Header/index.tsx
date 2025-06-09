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
                            : "text-gray-900 dark:text-white hover:text-primary"
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
                      className="rounded-full border-2 border-primary dark:border-white bg-white dark:bg-transparent px-5 py-2 text-sm font-medium text-primary dark:text-white transition-colors hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary"
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
