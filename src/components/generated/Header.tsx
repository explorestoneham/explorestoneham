import React, { useState } from 'react';
import { Search, Menu, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigationItems = [{
    label: 'Events',
    href: '#events',
    mpid: "a4292b2d-6cf0-45bf-b6b5-6c1cac1c6d86"
  }, {
    label: 'Attractions',
    href: '#attractions',
    mpid: "101744d2-9418-4831-92d6-3902f6995122"
  }, {
    label: 'Services',
    href: '#services',
    mpid: "2854c2a8-d13d-4ca0-be1d-0e5d1b36462b"
  }, {
    label: 'Community Groups',
    href: '#groups',
    mpid: "9c1fdb9d-f4fb-498e-92fa-d22f94b7a710"
  }, {
    label: 'About',
    href: '#about',
    mpid: "2c957120-5b18-4cb3-8a52-e2fa03a85f04"
  }] as any[];
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
  };
  return <header className="bg-white shadow-lg sticky top-0 z-50" data-magicpath-id="0" data-magicpath-path="Header.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-magicpath-id="1" data-magicpath-path="Header.tsx">
        <div className="flex items-center justify-between h-16 lg:h-20" data-magicpath-id="2" data-magicpath-path="Header.tsx">
          {/* Logo */}
          <div className="flex items-center space-x-3" data-magicpath-id="3" data-magicpath-path="Header.tsx">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#2A6F4D] rounded-full flex items-center justify-center" data-magicpath-id="4" data-magicpath-path="Header.tsx">
              <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-white" data-magicpath-id="5" data-magicpath-path="Header.tsx" />
            </div>
            <div data-magicpath-id="6" data-magicpath-path="Header.tsx">
              <h1 className="text-xl lg:text-2xl font-bold text-[#2A6F4D]" data-magicpath-id="7" data-magicpath-path="Header.tsx">
                Explore Stoneham
              </h1>
              <p className="text-xs lg:text-sm text-[#404040] hidden sm:block" data-magicpath-id="8" data-magicpath-path="Header.tsx">
                Your Community Connection
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" data-magicpath-id="9" data-magicpath-path="Header.tsx">
            {navigationItems.map(item => <a key={item.label} href={item.href} className="text-[#404040] hover:text-[#2A6F4D] font-medium transition-colors duration-200 relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2A6F4D] transition-all duration-200 group-hover:w-full" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="10" data-magicpath-path="Header.tsx"></span>
              </a>)}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center" data-magicpath-id="11" data-magicpath-path="Header.tsx">
            <div className="relative" data-magicpath-id="12" data-magicpath-path="Header.tsx">
              <input type="text" placeholder="Search events, attractions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-64 pl-10 pr-4 py-2 border border-[#D2E5F1] rounded-full focus:outline-none focus:ring-2 focus:ring-[#007B9E] focus:border-transparent" data-magicpath-id="13" data-magicpath-path="Header.tsx" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#404040]" data-magicpath-id="14" data-magicpath-path="Header.tsx" />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md text-[#404040] hover:text-[#2A6F4D] hover:bg-[#D2E5F1] transition-colors duration-200" aria-label="Toggle menu" data-magicpath-id="15" data-magicpath-path="Header.tsx">
            {isMenuOpen ? <X className="w-6 h-6" data-magicpath-id="16" data-magicpath-path="Header.tsx" /> : <Menu className="w-6 h-6" data-magicpath-id="17" data-magicpath-path="Header.tsx" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4" data-magicpath-id="18" data-magicpath-path="Header.tsx">
          <form onSubmit={handleSearch} className="relative" data-magicpath-id="19" data-magicpath-path="Header.tsx">
            <input type="text" placeholder="Search events, attractions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-[#D2E5F1] rounded-full focus:outline-none focus:ring-2 focus:ring-[#007B9E] focus:border-transparent" data-magicpath-id="20" data-magicpath-path="Header.tsx" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#404040]" data-magicpath-id="21" data-magicpath-path="Header.tsx" />
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence data-magicpath-id="22" data-magicpath-path="Header.tsx">
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
      }} className="lg:hidden bg-white border-t border-[#D2E5F1]" data-magicpath-id="23" data-magicpath-path="Header.tsx">
            <nav className="px-4 py-4 space-y-2" data-magicpath-id="24" data-magicpath-path="Header.tsx">
              {navigationItems.map(item => <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[#404040] hover:text-[#2A6F4D] hover:bg-[#D2E5F1] rounded-lg font-medium transition-colors duration-200">
                  {item.label}
                </a>)}
            </nav>
          </motion.div>}
      </AnimatePresence>
    </header>;
};