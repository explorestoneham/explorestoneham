import React, { useState } from 'react';
import { Search, Menu, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [{
    label: 'Events',
    href: '#events',
    isExternal: false
  }, {
    label: 'Things to Do',
    href: '#attractions',
    isExternal: false
  }, {
    label: 'Dining & Shopping',
    href: '/dining',
    isExternal: true
  }, {
    label: 'Community',
    href: '#services',
    isExternal: false
  }, {
    label: 'About Stoneham',
    href: '#about',
    isExternal: false
  }] as any[];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to events page with search query
      const url = `/events?search=${encodeURIComponent(searchQuery.trim())}`;
      (window as any).handleNavigation?.(url);
      setSearchQuery(''); // Clear the search after navigating
    }
  };

  const handleNavigationClick = (item: any, e: React.MouseEvent) => {
    if (item.isExternal) {
      // External navigation (to different pages)
      e.preventDefault();
      (window as any).handleNavigation?.(item.href);
    } else {
      // Internal scroll navigation
      e.preventDefault();
      const sectionId = item.href.replace('#', '');
      
      // Check if we're currently on the home page
      const isHomePage = window.location.pathname === '/' || window.location.pathname.startsWith('/?');
      
      if (isHomePage) {
        // We're on home page, scroll to section directly
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth'
        });
      } else {
        // We're on a different page, navigate to home first then scroll to section
        (window as any).handleNavigation?.('/');
        // Small delay to allow page to load before scrolling
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  };

  return <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/" onClick={(e) => {
                e.preventDefault();
                (window as any).handleNavigation?.('/');
              }} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="/StonehamCAN.png" 
                alt="Stoneham CAN Logo" 
                className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
              />
              <h1 className="text-xl lg:text-2xl font-bold">
                <span className="text-[#2A6F4D]">EXPLORE</span> <span className="text-[#007B9E]">STONEHAM</span>
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map(item => <a key={item.label} href={item.href} onClick={(e) => handleNavigationClick(item, e)} className="text-[#404040] hover:text-[#2A6F4D] font-medium transition-colors duration-200 relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2A6F4D] transition-all duration-200 group-hover:w-full"></span>
              </a>)}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center">
            <div className="relative">
              <input type="text" placeholder="Search events, attractions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-64 pl-10 pr-4 py-2 border border-[#D2E5F1] rounded-full focus:outline-none focus:ring-2 focus:ring-[#007B9E] focus:border-transparent" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#404040]" />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md text-[#404040] hover:text-[#2A6F4D] hover:bg-[#D2E5F1] transition-colors duration-200" aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input type="text" placeholder="Search events, attractions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-[#D2E5F1] rounded-full focus:outline-none focus:ring-2 focus:ring-[#007B9E] focus:border-transparent" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#404040]" />
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.2
      }} className="lg:hidden bg-white border-t border-[#D2E5F1]">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map(item => <a key={item.label} href={item.href} onClick={(e) => {
                  handleNavigationClick(item, e);
                  setIsMenuOpen(false);
                }} className="block px-4 py-3 text-[#404040] hover:text-[#2A6F4D] hover:bg-[#D2E5F1] rounded-lg font-medium transition-colors duration-200">
                  {item.label}
                </a>)}
            </nav>
          </motion.div>}
      </AnimatePresence>
    </header>;
};