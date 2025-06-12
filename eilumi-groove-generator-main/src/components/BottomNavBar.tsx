
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Music, Library, Upload, User } from 'lucide-react';

const BottomNavBar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/create-music', icon: Music, label: 'Create' },
    { path: '/library', icon: Library, label: 'Library' },
    { path: '/record-upload', icon: Upload, label: 'Upload' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg rounded-t-xl z-50">
      <nav className="flex justify-between px-2">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`flex flex-col items-center py-3 px-4 ${
              isActive(item.path)
                ? 'text-eilumi-orange'
                : 'text-eilumi-dark-gray'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavBar;
