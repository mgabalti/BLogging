'use client';

import Link from 'next/link';
import { Search, User } from 'lucide-react';
import ThemeDropdown from '@/components/ThemeDropdown';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50  dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-2xl font-pacifico text-primary dark:text-white cursor-pointer hover:text-primary/80 transition-colors">The Chronicle</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <a
                href="#politics"
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
              >
                Politics
              </a>
              <a
                href="#sports"
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
              >
                Sports
              </a>
              <a
                href="#entertainment"
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
              >
                Entertainment
              </a>
              <a
                href="#dailylife"
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
              >
                Daily Life
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-primary cursor-pointer" />
            <ThemeDropdown variant="icon" size="small" />
            <Link href="/login">
              <User className="w-6 h-6 text-gray-600  dark:text-gray-400 hover:text-primary cursor-pointer transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;