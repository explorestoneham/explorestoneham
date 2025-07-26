import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
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
  return <section className="relative bg-gradient-to-br from-[#2A6F4D] via-[#007B9E] to-[#2A6F4D] text-white overflow-hidden" data-magicpath-id="0" data-magicpath-path="HeroSection.tsx">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" data-magicpath-id="1" data-magicpath-path="HeroSection.tsx">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" data-magicpath-id="2" data-magicpath-path="HeroSection.tsx"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" data-magicpath-id="3" data-magicpath-path="HeroSection.tsx">
        <div className="grid lg:grid-cols-2 gap-12 items-center" data-magicpath-id="4" data-magicpath-path="HeroSection.tsx">
          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-8" data-magicpath-id="5" data-magicpath-path="HeroSection.tsx">
            <div className="space-y-4" data-magicpath-id="6" data-magicpath-path="HeroSection.tsx">
              <motion.h1 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="text-4xl lg:text-6xl font-bold leading-tight" data-magicpath-id="7" data-magicpath-path="HeroSection.tsx">
                Discover the Heart of{' '}
                <span className="text-[#F4A300]" data-magicpath-id="8" data-magicpath-path="HeroSection.tsx">Stoneham</span>
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
            }} className="text-xl lg:text-2xl text-[#D2E5F1] leading-relaxed" data-magicpath-id="9" data-magicpath-path="HeroSection.tsx">
                Your gateway to local events, attractions, services, and community connections in beautiful Stoneham, Massachusetts.
              </motion.p>
            </div>

            {/* Quick Stats */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }} className="grid grid-cols-3 gap-6 py-6" data-magicpath-id="10" data-magicpath-path="HeroSection.tsx">
              <div className="text-center" data-magicpath-id="11" data-magicpath-path="HeroSection.tsx">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 mx-auto" data-magicpath-id="12" data-magicpath-path="HeroSection.tsx">
                  <Calendar className="w-6 h-6" data-magicpath-id="13" data-magicpath-path="HeroSection.tsx" />
                </div>
                <div className="text-2xl font-bold text-[#F4A300]" data-magicpath-id="14" data-magicpath-path="HeroSection.tsx">50+</div>
                <div className="text-sm text-[#D2E5F1]" data-magicpath-id="15" data-magicpath-path="HeroSection.tsx">Monthly Events</div>
              </div>
              <div className="text-center" data-magicpath-id="16" data-magicpath-path="HeroSection.tsx">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 mx-auto" data-magicpath-id="17" data-magicpath-path="HeroSection.tsx">
                  <MapPin className="w-6 h-6" data-magicpath-id="18" data-magicpath-path="HeroSection.tsx" />
                </div>
                <div className="text-2xl font-bold text-[#F4A300]" data-magicpath-id="19" data-magicpath-path="HeroSection.tsx">25+</div>
                <div className="text-sm text-[#D2E5F1]" data-magicpath-id="20" data-magicpath-path="HeroSection.tsx">Local Attractions</div>
              </div>
              <div className="text-center" data-magicpath-id="21" data-magicpath-path="HeroSection.tsx">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 mx-auto" data-magicpath-id="22" data-magicpath-path="HeroSection.tsx">
                  <Users className="w-6 h-6" data-magicpath-id="23" data-magicpath-path="HeroSection.tsx" />
                </div>
                <div className="text-2xl font-bold text-[#F4A300]" data-magicpath-id="24" data-magicpath-path="HeroSection.tsx">100+</div>
                <div className="text-sm text-[#D2E5F1]" data-magicpath-id="25" data-magicpath-path="HeroSection.tsx">Community Groups</div>
              </div>
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
          }} className="flex flex-col sm:flex-row gap-4" data-magicpath-id="26" data-magicpath-path="HeroSection.tsx">
              <button onClick={handleExploreEvents} className="group bg-[#F4A300] hover:bg-[#D95D39] text-[#404040] font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" data-magicpath-id="27" data-magicpath-path="HeroSection.tsx">
                <span data-magicpath-id="28" data-magicpath-path="HeroSection.tsx">Explore Events</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" data-magicpath-id="29" data-magicpath-path="HeroSection.tsx" />
              </button>
              
              <button onClick={handleSubmitItem} className="group bg-transparent border-2 border-white hover:bg-white hover:text-[#2A6F4D] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" data-magicpath-id="30" data-magicpath-path="HeroSection.tsx">
                <span data-magicpath-id="31" data-magicpath-path="HeroSection.tsx">Submit an Item</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" data-magicpath-id="32" data-magicpath-path="HeroSection.tsx" />
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="relative" data-magicpath-id="33" data-magicpath-path="HeroSection.tsx">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20" data-magicpath-id="34" data-magicpath-path="HeroSection.tsx">
              {/* Placeholder for Stoneham landmark image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#93C47D] to-[#D2E5F1] rounded-2xl flex items-center justify-center" data-magicpath-id="35" data-magicpath-path="HeroSection.tsx">
                <div className="text-center space-y-4" data-magicpath-id="36" data-magicpath-path="HeroSection.tsx">
                  <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto" data-magicpath-id="37" data-magicpath-path="HeroSection.tsx">
                    <MapPin className="w-10 h-10 text-white" data-magicpath-id="38" data-magicpath-path="HeroSection.tsx" />
                  </div>
                  <div className="text-white/90" data-magicpath-id="39" data-magicpath-path="HeroSection.tsx">
                    <h3 className="text-xl font-semibold" data-magicpath-id="40" data-magicpath-path="HeroSection.tsx">Stoneham Town Common</h3>
                    <p className="text-sm" data-magicpath-id="41" data-magicpath-path="HeroSection.tsx">Historic heart of our community</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 1.2
            }} className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl" data-magicpath-id="42" data-magicpath-path="HeroSection.tsx">
                <div className="flex items-center space-x-3" data-magicpath-id="43" data-magicpath-path="HeroSection.tsx">
                  <div className="w-10 h-10 bg-[#007B9E] rounded-full flex items-center justify-center" data-magicpath-id="44" data-magicpath-path="HeroSection.tsx">
                    <Calendar className="w-5 h-5 text-white" data-magicpath-id="45" data-magicpath-path="HeroSection.tsx" />
                  </div>
                  <div data-magicpath-id="46" data-magicpath-path="HeroSection.tsx">
                    <div className="text-sm font-semibold text-[#404040]" data-magicpath-id="47" data-magicpath-path="HeroSection.tsx">Next Event</div>
                    <div className="text-xs text-[#404040]/70" data-magicpath-id="48" data-magicpath-path="HeroSection.tsx">Summer Concert Series</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 1.4
            }} className="absolute -top-4 -right-4 bg-[#F4A300] rounded-xl p-4 shadow-xl" data-magicpath-id="49" data-magicpath-path="HeroSection.tsx">
                <div className="flex items-center space-x-3" data-magicpath-id="50" data-magicpath-path="HeroSection.tsx">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center" data-magicpath-id="51" data-magicpath-path="HeroSection.tsx">
                    <Users className="w-5 h-5 text-[#F4A300]" data-magicpath-id="52" data-magicpath-path="HeroSection.tsx" />
                  </div>
                  <div data-magicpath-id="53" data-magicpath-path="HeroSection.tsx">
                    <div className="text-sm font-semibold text-white" data-magicpath-id="54" data-magicpath-path="HeroSection.tsx">Join Us</div>
                    <div className="text-xs text-white/80" data-magicpath-id="55" data-magicpath-path="HeroSection.tsx">Community Groups</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0" data-magicpath-id="56" data-magicpath-path="HeroSection.tsx">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 lg:h-20 fill-[#F7F7F7]" data-magicpath-id="57" data-magicpath-path="HeroSection.tsx">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" data-magicpath-id="58" data-magicpath-path="HeroSection.tsx" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" data-magicpath-id="59" data-magicpath-path="HeroSection.tsx" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" data-magicpath-id="60" data-magicpath-path="HeroSection.tsx" />
        </svg>
      </div>
    </section>;
};