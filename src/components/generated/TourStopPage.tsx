import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, ExternalLink, ChevronDown, Expand } from 'lucide-react';
import { TourStop } from './HistoricalWalkingTourApp';
import { TourNavigation } from './TourNavigation';
import { ImageModal } from '../ui/ImageModal';

interface TourStopPageProps {
  stop: TourStop;
  currentIndex: number;
  totalStops: number;
  onNext: () => void;
  onPrevious: () => void;
  onViewSubPage: (subPageId: string) => void;
  onRestartTour: () => void;
  isLastStop: boolean;
}

export function TourStopPage({
  stop,
  currentIndex,
  totalStops,
  onNext,
  onPrevious,
  onViewSubPage,
  onRestartTour,
  isLastStop
}: TourStopPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white border-b border-[#D2E5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={onRestartTour} 
              className="flex items-center text-[#404040]/70 hover:text-[#2A6F4D] transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline font-medium">Tour Home</span>
            </button>
            
            <div className="text-center">
              <div className="text-sm text-[#007B9E] font-semibold mb-1">
                Stop {currentIndex + 1} of {totalStops}
              </div>
              <div className="flex space-x-1">
                {Array.from({
                  length: totalStops
                }, (_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === currentIndex ? 'bg-[#007B9E]' : 'bg-[#D2E5F1]'
                    }`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="w-20" />
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-[#D2E5F1] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#2A6F4D] to-[#007B9E] h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / totalStops) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              duration: 0.6
            }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-[#2A6F4D] mb-8 text-center">
              {stop.title}
            </h1>

            {stop.imageUrl && (
              <figure className="mb-8 relative group">
                <div 
                  className="relative cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => setIsModalOpen(true)}
                >
                  <img 
                    src={stop.imageUrl} 
                    alt={`Historic view of ${stop.title}`} 
                    className="w-full h-64 md:h-96 object-cover shadow-lg border border-[#D2E5F1] transition-transform duration-300 group-hover:scale-105" 
                  />
                  
                  {/* Overlay with expand icon */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
                      <Expand className="w-6 h-6 text-[#2A6F4D]" />
                    </div>
                  </div>
                </div>
                
                <figcaption className="text-sm text-[#404040]/70 mt-2 text-center">
                  Click to view full size
                </figcaption>
              </figure>
            )}

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-[#404040] leading-relaxed">
                {stop.content}
              </p>
            </div>

            {/* Sub-pages */}
            {stop.subPages && stop.subPages.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-[#2A6F4D] mb-6">
                  Explore More
                </h2>
                <div className="grid gap-4">
                  {stop.subPages.map(subPage => (
                    <motion.button 
                      key={subPage.id} 
                      onClick={() => onViewSubPage(subPage.id)} 
                      whileHover={{ y: -2 }}
                      className="group bg-white rounded-xl shadow-md p-6 border border-[#D2E5F1] hover:shadow-lg hover:border-[#2A6F4D] transition-all duration-300 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#404040] group-hover:text-[#2A6F4D] transition-colors mb-2">
                            {subPage.title}
                          </h3>
                          <p className="text-[#404040]/70">
                            Discover more about this fascinating topic
                          </p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-[#404040]/50 group-hover:text-[#2A6F4D] group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Navigation */}
      <TourNavigation 
        currentIndex={currentIndex} 
        totalStops={totalStops} 
        onNext={onNext} 
        onPrevious={onPrevious} 
        onRestartTour={onRestartTour} 
        isLastStop={isLastStop} 
      />

      {/* Image Modal */}
      {stop.imageUrl && (
        <ImageModal
          isOpen={isModalOpen}
          imageSrc={stop.imageUrl}
          imageAlt={`Historic view of ${stop.title}`}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}