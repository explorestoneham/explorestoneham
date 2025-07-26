import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Utensils, Building } from 'lucide-react';
export const HeroSection: React.FC = () => {
  const handleSubmitItem = () => {
    // Navigate to submit form - would be implemented with routing
    console.log('Navigate to submit form');
  };
  const handleExploreEvents = () => {
    // Scroll to events section
    document.getElementById('events')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative bg-gradient-to-br from-[#2A6F4D] via-[#007B9E] to-[#2A6F4D] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-8">
            <div className="space-y-4">
              <motion.h1 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="text-4xl lg:text-6xl font-bold leading-tight text-center">
                Discover What's Happening in{' '}
                <span className="text-[#F4A300]">Stoneham</span>
              </motion.h1>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} className="text-xl lg:text-2xl text-[#D2E5F1] leading-relaxed text-center">
                From community events to local dining, discover everything that makes Stoneham a vibrant place to live, work, and explore.
              </motion.p>
            </div>

            {/* Quick Access Categories */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }} className="grid grid-cols-2 lg:grid-cols-5 gap-4 py-6">
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#F4A300] rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">Events</div>
                <div className="text-xs text-[#D2E5F1]">Gatherings & Activities</div>
              </button>
              
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#007B9E] rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">Things to Do</div>
                <div className="text-xs text-[#D2E5F1]">Attractions & Parks</div>
              </button>
              
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#D95D39] rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">Dining & Shopping</div>
                <div className="text-xs text-[#D2E5F1]">Food & Retail</div>
              </button>
              
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#93C47D] rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">Community</div>
                <div className="text-xs text-[#D2E5F1]">Groups & Resources</div>
              </button>
              
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 text-center col-span-2 lg:col-span-1">
                <div className="flex items-center justify-center w-12 h-12 bg-[#2A6F4D] rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">About</div>
                <div className="text-xs text-[#D2E5F1]">History & Info</div>
              </button>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.8
          }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleExploreEvents} className="group bg-[#F4A300] hover:bg-[#D95D39] text-[#404040] font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Explore Events</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button onClick={handleSubmitItem} className="group bg-transparent border-2 border-white hover:bg-white hover:text-[#2A6F4D] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Submit an Item</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 lg:h-20 fill-[#F7F7F7]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
    </section>;
};