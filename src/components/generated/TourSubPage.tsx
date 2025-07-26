import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { SubPage } from './HistoricalWalkingTourApp';

interface TourSubPageProps {
  subPage: SubPage;
  parentStopTitle: string;
  onBackToStop: () => void;
}

export function TourSubPage({
  subPage,
  parentStopTitle,
  onBackToStop
}: TourSubPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#D2E5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBackToStop} 
              className="group flex items-center text-[#404040]/70 hover:text-[#2A6F4D] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to {parentStopTitle}</span>
            </button>
            
            <div className="text-center">
              <div className="text-sm text-[#007B9E] font-semibold">
                Historical Detail
              </div>
            </div>
            
            <div className="w-32" />
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
              {subPage.title}
            </h1>

            {subPage.imageUrl && (
              <figure className="mb-8">
                <img 
                  src={subPage.imageUrl} 
                  alt={`Historical image related to ${subPage.title}`} 
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg border border-[#D2E5F1]" 
                />
              </figure>
            )}

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-[#404040] leading-relaxed">
                {subPage.content}
              </p>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-[#93C47D]/20 to-[#D2E5F1]/20 rounded-2xl p-8">
              <p className="text-lg text-[#404040]/80 mb-6">
                Ready to continue your historical journey?
              </p>
              <button 
                onClick={onBackToStop} 
                className="group bg-[#2A6F4D] hover:bg-[#007B9E] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Continue Tour</span>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}