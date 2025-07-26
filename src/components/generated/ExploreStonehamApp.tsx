import React from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { MainContentArea } from './MainContentArea';
import { Footer } from './Footer';
export const ExploreStonehamApp: React.FC = () => {
  return <div className="min-h-screen bg-[#F7F7F7] text-[#404040]">
      <Header />
      <main>
        <HeroSection />
        <MainContentArea />
      </main>
      <Footer />
    </div>;
};