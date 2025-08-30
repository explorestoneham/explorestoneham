import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, ExternalLink, Heart, Calendar } from 'lucide-react';
export const Footer: React.FC = () => {
  const quickLinks = [{
    label: 'Events Calendar',
    href: '/events'
  }, {
    label: 'Local Attractions',
    href: '#attractions'
  }, {
    label: 'Community Services',
    href: '#services'
  }, {
    label: 'Submit an Item',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSemZls9PUt9Q1R0S9hWB6-PU2SU7nIzqGp71xUCUR64zfr_zQ/viewform?usp=preview'
  }, {
    label: 'About Stoneham',
    href: '#about'
  }] as any[];
  const contactInfo = [{
    icon: Mail,
    label: 'Email',
    value: 'explorestoneham@stonehamcan.org',
    link: 'mailto:explorestoneham@stonehamcan.org'
  }] as any[];
  const socialLinks = [{
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/StonehamCAN/',
    color: 'hover:text-[#1877F2]'
  }, {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/stoneham_can/',
    color: 'hover:text-[#E4405F]'
  }] as any[];
  return <footer className="bg-[#2A6F4D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/StonehamCAN.png" 
                alt="Stoneham CAN Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">Explore Stoneham</h3>
                <p className="text-[#93C47D] text-sm">Your Community Connection</p>
              </div>
            </div>
            
            <p className="text-[#D2E5F1] leading-relaxed">
              A community initiative by <a href="https://www.stonehamcan.org/" target="_blank" rel="noopener noreferrer" className="text-[#F4A300] hover:text-[#D95D39] transition-colors duration-200">Stoneham CAN</a>. 
              Connecting our community through shared experiences, local discoveries, and neighborly spirit.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(social => <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }} className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-colors duration-300 ${social.color}`} aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </motion.a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map(link => <a key={link.label} href={link.href} onClick={(e) => {
                  if (link.href.startsWith('/')) {
                    e.preventDefault();
                    (window as any).handleNavigation?.(link.href);
                  } else if (link.href.startsWith('http')) {
                    e.preventDefault();
                    window.open(link.href, '_blank');
                  }
                }} className="block text-[#D2E5F1] hover:text-[#F4A300] transition-colors duration-200 flex items-center group">
                  <span>{link.label}</span>
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>)}
            </nav>

            {/* Newsletter Signup */}
            <div className="pt-4 border-t border-white/20">
              <h5 className="text-lg font-semibold text-white mb-3">Stay Updated</h5>
              <p className="text-[#D2E5F1] text-sm mb-4">Subscribe to our community newsletters:</p>
              
              <div className="space-y-3 mb-4">
                <label className="flex items-start space-x-3 text-[#D2E5F1] text-sm cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-[#F4A300] bg-white/10 border-white/20 rounded focus:ring-[#F4A300] focus:ring-2" />
                  <div>
                    <span className="font-medium text-white">Stoneham CAN Newsletter</span>
                    <p className="text-xs text-[#D2E5F1]/80">Community updates and events</p>
                  </div>
                </label>
                
                <label className="flex items-start space-x-3 text-[#D2E5F1] text-sm cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-[#F4A300] bg-white/10 border-white/20 rounded focus:ring-[#F4A300] focus:ring-2" />
                  <div>
                    <span className="font-medium text-white">Stoneham Reads Newsletter</span>
                    <p className="text-xs text-[#D2E5F1]/80">Library news and reading recommendations</p>
                  </div>
                </label>
              </div>
              
              <button 
                onClick={() => window.open('https://www.stonehamcan.org/be-connected', '_blank')}
                className="w-full px-4 py-3 bg-[#F4A300] hover:bg-[#D95D39] text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Subscribe to Newsletters</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              
              <p className="text-xs text-[#D2E5F1]/60 mt-2">
                You'll be taken to Stoneham CAN's subscription page
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Contact Us</h4>
            <div className="space-y-4">
              {contactInfo.map(contact => <div key={contact.label} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#007B9E] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <contact.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#93C47D] mb-1">{contact.label}</div>
                    <a href={contact.link} className="text-[#D2E5F1] hover:text-[#F4A300] transition-colors duration-200">
                      {contact.value}
                    </a>
                  </div>
                </div>)}
            </div>

            {/* Emergency Contact */}
            <div className="bg-[#D95D39]/20 rounded-lg p-4 border border-[#D95D39]/30">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-4 h-4 text-[#D95D39]" />
                <span className="text-sm font-semibold text-[#D95D39]">Emergency</span>
              </div>
              <p className="text-white text-sm">
                For emergencies, dial <strong>911</strong>
              </p>
              <p className="text-[#D2E5F1] text-xs mt-1">
                Non-emergency: (781) 438-1215
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-[#D2E5F1]">
              <span>© 2025 Stoneham CAN. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a 
                href="/about-website" 
                onClick={(e) => {
                  e.preventDefault();
                  (window as any).handleNavigation?.('/about-website');
                }}
                className="text-[#D2E5F1] hover:text-[#F4A300] transition-colors duration-200"
              >
                About Our Website
              </a>
            </div>

            <div className="flex items-center space-x-2 text-sm text-[#D2E5F1]">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[#D95D39] fill-current" />
              <span>for our community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button onClick={() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })} whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} className="fixed bottom-8 right-8 w-12 h-12 bg-[#F4A300] hover:bg-[#D95D39] text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 z-50" aria-label="Back to top">
        <motion.div animate={{
        y: [0, -2, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }}>
          ↑
        </motion.div>
      </motion.button>
    </footer>;
};