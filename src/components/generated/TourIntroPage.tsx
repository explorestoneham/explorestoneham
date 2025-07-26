import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';

interface TourIntroPageProps {
  onStartTour: () => void;
}

export function TourIntroPage({
  onStartTour
}: TourIntroPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2A6F4D] via-[#007B9E] to-[#2A6F4D] text-white overflow-hidden py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{
              opacity: 0,
              y: 30
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }} 
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Historic Walking Tour
              <span className="block text-2xl lg:text-3xl text-[#F4A300] font-normal mt-2">
                Discover Stoneham's Rich Heritage
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-[#D2E5F1] leading-relaxed max-w-3xl mx-auto mb-8">
              Stoneham was first settled about 1645 as a quiet farming community known as Charlestown End. 
              In 1725, it was incorporated as a separate town. After the Medford-Andover Turnpike was built in 1806, 
              residents relocated near the turnpike and a new town center emerged.
            </p>

            <button 
              onClick={onStartTour} 
              className="group bg-[#F4A300] hover:bg-[#D95D39] text-[#404040] font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Tour Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              duration: 0.8,
              delay: 0.2,
              ease: 'easeOut'
            }} 
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-[#D2E5F1] hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#2A6F4D]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MapPin className="w-8 h-8 text-[#2A6F4D]" />
              </div>
              <h3 className="text-2xl font-bold text-[#404040] mb-4">7 Historic Stops</h3>
              <p className="text-[#404040]/70 leading-relaxed">
                Visit key locations from Stoneham's shoe-making era and colonial past
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-[#D2E5F1] hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#007B9E]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-8 h-8 text-[#007B9E]" />
              </div>
              <h3 className="text-2xl font-bold text-[#404040] mb-4">1 Mile Walk</h3>
              <p className="text-[#404040]/70 leading-relaxed">
                One mile tour of highlights from shoe town to colonial remnants
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-[#D2E5F1] hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#F4A300]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-[#F4A300]" />
              </div>
              <h3 className="text-2xl font-bold text-[#404040] mb-4">Underground Railroad</h3>
              <p className="text-[#404040]/70 leading-relaxed">
                See where escaped slaves were housed before the Civil War
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 bg-gradient-to-r from-[#93C47D]/20 to-[#D2E5F1]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-[#404040]/80">
            The tour starts in Stoneham Square • See where the transcontinental auto race car was built • Underground Railroad stop location
          </p>
        </div>
      </section>
    </div>
  );
}