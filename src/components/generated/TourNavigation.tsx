import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react';

interface TourNavigationProps {
  currentIndex: number;
  totalStops: number;
  onNext: () => void;
  onPrevious: () => void;
  onRestartTour: () => void;
  isLastStop: boolean;
}

export function TourNavigation({
  currentIndex,
  totalStops,
  onNext,
  onPrevious,
  onRestartTour,
  isLastStop
}: TourNavigationProps) {
  return (
    <nav className="bg-white border-t border-[#D2E5F1] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <button 
            onClick={onPrevious} 
            disabled={currentIndex === 0} 
            className={`group flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              currentIndex === 0 
                ? 'text-[#404040]/30 cursor-not-allowed' 
                : 'text-[#404040] hover:text-white hover:bg-[#2A6F4D] border-2 border-[#2A6F4D]'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Previous Stop</span>
          </button>

          {/* Center Content */}
          <div className="flex-1 text-center mx-8">
            {isLastStop ? (
              <div className="space-y-3">
                <p className="text-lg font-semibold text-[#2A6F4D]">🎉 Tour Complete!</p>
                <p className="text-[#404040]/70">Thank you for exploring Stoneham's history</p>
              </div>
            ) : (
              <div className="text-[#404040]/70">
                Use the buttons below to navigate through the tour
              </div>
            )}
          </div>

          {/* Next/Restart Button */}
          <button 
            onClick={isLastStop ? onRestartTour : onNext} 
            className="group flex items-center px-6 py-3 rounded-full font-semibold bg-[#2A6F4D] hover:bg-[#007B9E] text-white transition-all duration-300 transform hover:scale-105"
          >
            <span>
              {isLastStop ? 'Start Over' : 'Next Stop'}
            </span>
            {isLastStop ? (
              <Home className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Additional Tour Home Button for Last Stop */}
        {isLastStop && (
          <div className="text-center mt-6 pt-6 border-t border-[#D2E5F1]">
            <button 
              onClick={() => (window as any).handleNavigation?.('/')}
              className="group bg-transparent border-2 border-[#007B9E] text-[#007B9E] hover:bg-[#007B9E] hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              <Home className="w-5 h-5 mr-2" />
              <span>Return to Explore Stoneham</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}