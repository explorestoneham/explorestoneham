import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, ExternalLink, Heart, Clock, Calendar } from 'lucide-react';
export const Footer: React.FC = () => {
  const quickLinks = [{
    label: 'Events Calendar',
    href: '#events'
  }, {
    label: 'Local Attractions',
    href: '#attractions'
  }, {
    label: 'Community Services',
    href: '#services'
  }, {
    label: 'Submit an Item',
    href: '#submit'
  }, {
    label: 'About Stoneham',
    href: '#about'
  }] as any[];
  const contactInfo = [{
    icon: MapPin,
    label: 'Address',
    value: '35 Central Street, Stoneham, MA 02180',
    link: 'https://maps.google.com/?q=35+Central+Street+Stoneham+MA'
  }, {
    icon: Phone,
    label: 'Phone',
    value: '(781) 279-2600',
    link: 'tel:+17812792600'
  }, {
    icon: Mail,
    label: 'Email',
    value: 'info@stoneham-ma.gov',
    link: 'mailto:info@stoneham-ma.gov'
  }] as any[];
  const socialLinks = [{
    icon: Facebook,
    label: 'Facebook',
    href: '#',
    color: 'hover:text-[#1877F2]'
  }, {
    icon: Twitter,
    label: 'Twitter',
    href: '#',
    color: 'hover:text-[#1DA1F2]'
  }, {
    icon: Instagram,
    label: 'Instagram',
    href: '#',
    color: 'hover:text-[#E4405F]'
  }] as any[];
  const officeHours = [{
    day: 'Monday - Thursday',
    hours: '8:00 AM - 4:30 PM'
  }, {
    day: 'Friday',
    hours: '8:00 AM - 12:30 PM'
  }, {
    day: 'Saturday - Sunday',
    hours: 'Closed'
  }] as any[];
  return <footer className="bg-[#2A6F4D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#F4A300] rounded-full flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Explore Stoneham</h3>
                <p className="text-[#93C47D] text-sm">Your Community Connection</p>
              </div>
            </div>
            
            <p className="text-[#D2E5F1] leading-relaxed">
              Connecting our community through shared experiences, local discoveries, and neighborly spirit. 
              Discover what makes Stoneham special.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(social => <motion.a key={social.label} href={social.href} whileHover={{
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
              {quickLinks.map(link => <a key={link.label} href={link.href} className="block text-[#D2E5F1] hover:text-[#F4A300] transition-colors duration-200 flex items-center group">
                  <span>{link.label}</span>
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>)}
            </nav>

            {/* Newsletter Signup */}
            <div className="pt-4 border-t border-white/20">
              <h5 className="text-lg font-semibold text-white mb-3">Stay Updated</h5>
              <div className="flex">
                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F4A300] focus:border-transparent" />
                <button className="px-6 py-2 bg-[#F4A300] hover:bg-[#D95D39] text-white font-semibold rounded-r-lg transition-colors duration-300">
                  Subscribe
                </button>
              </div>
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

          {/* Office Hours & Additional Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Office Hours</h4>
            <div className="space-y-3">
              {officeHours.map(schedule => <div key={schedule.day} className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#93C47D] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">{schedule.day}</div>
                    <div className="text-xs text-[#D2E5F1]">{schedule.hours}</div>
                  </div>
                </div>)}
            </div>

            {/* Upcoming Events Preview */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-4 h-4 text-[#F4A300]" />
                <span className="text-sm font-semibold text-white">Next Event</span>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-1">Summer Concert Series</h5>
                <p className="text-xs text-[#D2E5F1]">July 15, 2024 • 7:00 PM</p>
                <p className="text-xs text-[#93C47D] mt-1">Town Common</p>
              </div>
            </div>

            {/* Weather Widget Placeholder */}
            <div className="bg-gradient-to-br from-[#007B9E]/20 to-[#93C47D]/20 rounded-lg p-4 border border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">72°F</div>
                <div className="text-xs text-[#D2E5F1]">Partly Cloudy</div>
                <div className="text-xs text-[#93C47D] mt-1">Stoneham, MA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-[#D2E5F1]">
              <span>© 2024 Town of Stoneham. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-[#D2E5F1] hover:text-[#F4A300] transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-[#D2E5F1] hover:text-[#F4A300] transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-[#D2E5F1] hover:text-[#F4A300] transition-colors duration-200">
                Accessibility
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