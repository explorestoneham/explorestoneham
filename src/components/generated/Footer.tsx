import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, ExternalLink, Heart, Clock, Calendar } from 'lucide-react';
export const Footer: React.FC = () => {
  const quickLinks = [{
    label: 'Events Calendar',
    href: '#events',
    mpid: "89707bf8-fd1a-490b-936d-0346ce60e065"
  }, {
    label: 'Local Attractions',
    href: '#attractions',
    mpid: "d953d3e1-b142-4738-b377-6a142c338b1c"
  }, {
    label: 'Community Services',
    href: '#services',
    mpid: "08670ac5-e40a-4a51-8b53-fa9296337e08"
  }, {
    label: 'Submit an Item',
    href: '#submit',
    mpid: "63d232c0-aa17-408d-8ac6-b95ae499107e"
  }, {
    label: 'About Stoneham',
    href: '#about',
    mpid: "b8ed0d2d-4b98-460f-9b9a-cf0049c5fe1f"
  }] as any[];
  const contactInfo = [{
    icon: MapPin,
    label: 'Address',
    value: '35 Central Street, Stoneham, MA 02180',
    link: 'https://maps.google.com/?q=35+Central+Street+Stoneham+MA',
    mpid: "0a5ce3c6-d02e-4cbe-b49e-29bdeb76a517"
  }, {
    icon: Phone,
    label: 'Phone',
    value: '(781) 279-2600',
    link: 'tel:+17812792600',
    mpid: "bf47c7dd-1f34-4ac1-9bcb-14ec3972a290"
  }, {
    icon: Mail,
    label: 'Email',
    value: 'info@stoneham-ma.gov',
    link: 'mailto:info@stoneham-ma.gov',
    mpid: "57672ef2-9418-479e-91ec-1c07366ae759"
  }] as any[];
  const socialLinks = [{
    icon: Facebook,
    label: 'Facebook',
    href: '#',
    color: 'hover:text-[#1877F2]',
    mpid: "1fd8ef12-5c3f-42d3-b790-e3a0df95dd6b"
  }, {
    icon: Twitter,
    label: 'Twitter',
    href: '#',
    color: 'hover:text-[#1DA1F2]',
    mpid: "46ec6763-0f56-4237-9767-8ab5a2154915"
  }, {
    icon: Instagram,
    label: 'Instagram',
    href: '#',
    color: 'hover:text-[#E4405F]',
    mpid: "ec7ef0d7-a35b-4c26-abd1-54eb755d8643"
  }] as any[];
  const officeHours = [{
    day: 'Monday - Thursday',
    hours: '8:00 AM - 4:30 PM',
    mpid: "516bfd4d-1f38-4342-9f3d-b5435b9aa861"
  }, {
    day: 'Friday',
    hours: '8:00 AM - 12:30 PM',
    mpid: "134ad765-a6d8-4017-a56b-34ee89c1f8af"
  }, {
    day: 'Saturday - Sunday',
    hours: 'Closed',
    mpid: "6859a313-9c22-4752-8c4e-5b6f3b468518"
  }] as any[];
  return <footer className="bg-[#2A6F4D] text-white" data-magicpath-id="0" data-magicpath-path="Footer.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-magicpath-id="1" data-magicpath-path="Footer.tsx">
        <div className="grid lg:grid-cols-4 gap-12" data-magicpath-id="2" data-magicpath-path="Footer.tsx">
          {/* Brand & Description */}
          <div className="lg:col-span-1 space-y-6" data-magicpath-id="3" data-magicpath-path="Footer.tsx">
            <div className="flex items-center space-x-3" data-magicpath-id="4" data-magicpath-path="Footer.tsx">
              <div className="w-12 h-12 bg-[#F4A300] rounded-full flex items-center justify-center" data-magicpath-id="5" data-magicpath-path="Footer.tsx">
                <MapPin className="w-7 h-7 text-white" data-magicpath-id="6" data-magicpath-path="Footer.tsx" />
              </div>
              <div data-magicpath-id="7" data-magicpath-path="Footer.tsx">
                <h3 className="text-2xl font-bold text-white" data-magicpath-id="8" data-magicpath-path="Footer.tsx">Explore Stoneham</h3>
                <p className="text-[#93C47D] text-sm" data-magicpath-id="9" data-magicpath-path="Footer.tsx">Your Community Connection</p>
              </div>
            </div>
            
            <p className="text-[#D2E5F1] leading-relaxed" data-magicpath-id="10" data-magicpath-path="Footer.tsx">
              Connecting our community through shared experiences, local discoveries, and neighborly spirit. 
              Discover what makes Stoneham special.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4" data-magicpath-id="11" data-magicpath-path="Footer.tsx">
              {socialLinks.map(social => <motion.a key={social.label} href={social.href} whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }} className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-colors duration-300 ${social.color}`} aria-label={social.label} data-magicpath-uuid={(social as any)["mpid"] ?? "unsafe"} data-magicpath-id="12" data-magicpath-path="Footer.tsx">
                  <social.icon className="w-5 h-5" data-magicpath-uuid={(social as any)["mpid"] ?? "unsafe"} data-magicpath-id="13" data-magicpath-path="Footer.tsx" />
                </motion.a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6" data-magicpath-id="14" data-magicpath-path="Footer.tsx">
            <h4 className="text-xl font-bold text-white" data-magicpath-id="15" data-magicpath-path="Footer.tsx">Quick Links</h4>
            <nav className="space-y-3" data-magicpath-id="16" data-magicpath-path="Footer.tsx">
              {quickLinks.map(link => <a key={link.label} href={link.href} className="block text-[#D2E5F1] hover:text-[#F4A300] transition-colors duration-200 flex items-center group">
                  <span data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:string" data-magicpath-id="17" data-magicpath-path="Footer.tsx">{link.label}</span>
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-id="18" data-magicpath-path="Footer.tsx" />
                </a>)}
            </nav>

            {/* Newsletter Signup */}
            <div className="pt-4 border-t border-white/20" data-magicpath-id="19" data-magicpath-path="Footer.tsx">
              <h5 className="text-lg font-semibold text-white mb-3" data-magicpath-id="20" data-magicpath-path="Footer.tsx">Stay Updated</h5>
              <div className="flex" data-magicpath-id="21" data-magicpath-path="Footer.tsx">
                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F4A300] focus:border-transparent" data-magicpath-id="22" data-magicpath-path="Footer.tsx" />
                <button className="px-6 py-2 bg-[#F4A300] hover:bg-[#D95D39] text-white font-semibold rounded-r-lg transition-colors duration-300" data-magicpath-id="23" data-magicpath-path="Footer.tsx">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6" data-magicpath-id="24" data-magicpath-path="Footer.tsx">
            <h4 className="text-xl font-bold text-white" data-magicpath-id="25" data-magicpath-path="Footer.tsx">Contact Us</h4>
            <div className="space-y-4" data-magicpath-id="26" data-magicpath-path="Footer.tsx">
              {contactInfo.map(contact => <div key={contact.label} className="flex items-start space-x-3" data-magicpath-uuid={(contact as any)["mpid"] ?? "unsafe"} data-magicpath-id="27" data-magicpath-path="Footer.tsx">
                  <div className="w-8 h-8 bg-[#007B9E] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" data-magicpath-uuid={(contact as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="Footer.tsx">
                    <contact.icon className="w-4 h-4 text-white" data-magicpath-uuid={(contact as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="Footer.tsx" />
                  </div>
                  <div data-magicpath-uuid={(contact as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="Footer.tsx">
                    <div className="text-sm font-medium text-[#93C47D] mb-1" data-magicpath-uuid={(contact as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:string" data-magicpath-id="31" data-magicpath-path="Footer.tsx">{contact.label}</div>
                    <a href={contact.link} className="text-[#D2E5F1] hover:text-[#F4A300] transition-colors duration-200">
                      {contact.value}
                    </a>
                  </div>
                </div>)}
            </div>

            {/* Emergency Contact */}
            <div className="bg-[#D95D39]/20 rounded-lg p-4 border border-[#D95D39]/30" data-magicpath-id="32" data-magicpath-path="Footer.tsx">
              <div className="flex items-center space-x-2 mb-2" data-magicpath-id="33" data-magicpath-path="Footer.tsx">
                <Phone className="w-4 h-4 text-[#D95D39]" data-magicpath-id="34" data-magicpath-path="Footer.tsx" />
                <span className="text-sm font-semibold text-[#D95D39]" data-magicpath-id="35" data-magicpath-path="Footer.tsx">Emergency</span>
              </div>
              <p className="text-white text-sm" data-magicpath-id="36" data-magicpath-path="Footer.tsx">
                For emergencies, dial <strong data-magicpath-id="37" data-magicpath-path="Footer.tsx">911</strong>
              </p>
              <p className="text-[#D2E5F1] text-xs mt-1" data-magicpath-id="38" data-magicpath-path="Footer.tsx">
                Non-emergency: (781) 438-1215
              </p>
            </div>
          </div>

          {/* Office Hours & Additional Info */}
          <div className="space-y-6" data-magicpath-id="39" data-magicpath-path="Footer.tsx">
            <h4 className="text-xl font-bold text-white" data-magicpath-id="40" data-magicpath-path="Footer.tsx">Office Hours</h4>
            <div className="space-y-3" data-magicpath-id="41" data-magicpath-path="Footer.tsx">
              {officeHours.map(schedule => <div key={schedule.day} className="flex items-center space-x-3" data-magicpath-uuid={(schedule as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="Footer.tsx">
                  <Clock className="w-4 h-4 text-[#93C47D] flex-shrink-0" data-magicpath-uuid={(schedule as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="Footer.tsx" />
                  <div data-magicpath-uuid={(schedule as any)["mpid"] ?? "unsafe"} data-magicpath-id="44" data-magicpath-path="Footer.tsx">
                    <div className="text-sm font-medium text-white" data-magicpath-uuid={(schedule as any)["mpid"] ?? "unsafe"} data-magicpath-field="day:string" data-magicpath-id="45" data-magicpath-path="Footer.tsx">{schedule.day}</div>
                    <div className="text-xs text-[#D2E5F1]" data-magicpath-uuid={(schedule as any)["mpid"] ?? "unsafe"} data-magicpath-field="hours:string" data-magicpath-id="46" data-magicpath-path="Footer.tsx">{schedule.hours}</div>
                  </div>
                </div>)}
            </div>

            {/* Upcoming Events Preview */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10" data-magicpath-id="47" data-magicpath-path="Footer.tsx">
              <div className="flex items-center space-x-2 mb-3" data-magicpath-id="48" data-magicpath-path="Footer.tsx">
                <Calendar className="w-4 h-4 text-[#F4A300]" data-magicpath-id="49" data-magicpath-path="Footer.tsx" />
                <span className="text-sm font-semibold text-white" data-magicpath-id="50" data-magicpath-path="Footer.tsx">Next Event</span>
              </div>
              <div data-magicpath-id="51" data-magicpath-path="Footer.tsx">
                <h5 className="text-sm font-medium text-white mb-1" data-magicpath-id="52" data-magicpath-path="Footer.tsx">Summer Concert Series</h5>
                <p className="text-xs text-[#D2E5F1]" data-magicpath-id="53" data-magicpath-path="Footer.tsx">July 15, 2024 • 7:00 PM</p>
                <p className="text-xs text-[#93C47D] mt-1" data-magicpath-id="54" data-magicpath-path="Footer.tsx">Town Common</p>
              </div>
            </div>

            {/* Weather Widget Placeholder */}
            <div className="bg-gradient-to-br from-[#007B9E]/20 to-[#93C47D]/20 rounded-lg p-4 border border-white/10" data-magicpath-id="55" data-magicpath-path="Footer.tsx">
              <div className="text-center" data-magicpath-id="56" data-magicpath-path="Footer.tsx">
                <div className="text-2xl font-bold text-white mb-1" data-magicpath-id="57" data-magicpath-path="Footer.tsx">72°F</div>
                <div className="text-xs text-[#D2E5F1]" data-magicpath-id="58" data-magicpath-path="Footer.tsx">Partly Cloudy</div>
                <div className="text-xs text-[#93C47D] mt-1" data-magicpath-id="59" data-magicpath-path="Footer.tsx">Stoneham, MA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8" data-magicpath-id="60" data-magicpath-path="Footer.tsx">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0" data-magicpath-id="61" data-magicpath-path="Footer.tsx">
            <div className="flex items-center space-x-2 text-sm text-[#D2E5F1]" data-magicpath-id="62" data-magicpath-path="Footer.tsx">
              <span data-magicpath-id="63" data-magicpath-path="Footer.tsx">© 2024 Town of Stoneham. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm" data-magicpath-id="64" data-magicpath-path="Footer.tsx">
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

            <div className="flex items-center space-x-2 text-sm text-[#D2E5F1]" data-magicpath-id="65" data-magicpath-path="Footer.tsx">
              <span data-magicpath-id="66" data-magicpath-path="Footer.tsx">Made with</span>
              <Heart className="w-4 h-4 text-[#D95D39] fill-current" data-magicpath-id="67" data-magicpath-path="Footer.tsx" />
              <span data-magicpath-id="68" data-magicpath-path="Footer.tsx">for our community</span>
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
    }} className="fixed bottom-8 right-8 w-12 h-12 bg-[#F4A300] hover:bg-[#D95D39] text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 z-50" aria-label="Back to top" data-magicpath-id="69" data-magicpath-path="Footer.tsx">
        <motion.div animate={{
        y: [0, -2, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }} data-magicpath-id="70" data-magicpath-path="Footer.tsx">
          ↑
        </motion.div>
      </motion.button>
    </footer>;
};