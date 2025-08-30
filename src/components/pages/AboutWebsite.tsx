import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Eye, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Header } from '../generated/Header';
import { Footer } from '../generated/Footer';

export const AboutWebsite: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#2A6F4D] mb-4">
              About Our Website
            </h1>
            <p className="text-xl text-[#666666] max-w-2xl mx-auto">
              Learn about who we are, how this website works, and our commitment to our community
            </p>
          </div>

          <div className="space-y-12">
            {/* About Stoneham CAN */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-[#D95D39] mr-4" />
                <h2 className="text-3xl font-bold text-[#2A6F4D]">About Stoneham CAN</h2>
              </div>
              <div className="space-y-4 text-[#404040] leading-relaxed">
                <p>
                  Explore Stoneham is a community initiative created and maintained by <strong>Stoneham CAN</strong>, 
                  an independent non-profit organization dedicated to connecting our community through shared 
                  experiences, local discoveries, and neighborly spirit.
                </p>
                <p>
                  We are <strong>not part of the town government</strong> - we're your neighbors who are passionate 
                  about making it easier for everyone to discover what makes Stoneham special. Our mission is to 
                  strengthen community bonds by helping residents and visitors find local events, attractions, 
                  services, and opportunities to get involved.
                </p>
                <div className="bg-[#D2E5F1]/30 rounded-lg p-4 mt-6">
                  <p className="text-sm">
                    Learn more about Stoneham CAN at{' '}
                    <a 
                      href="https://www.stonehamcan.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#007B9E] hover:text-[#2A6F4D] font-medium underline inline-flex items-center"
                    >
                      stonehamcan.org
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Website Purpose */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-[#007B9E] mr-4" />
                <h2 className="text-3xl font-bold text-[#2A6F4D]">Our Website's Purpose</h2>
              </div>
              <div className="space-y-4 text-[#404040] leading-relaxed">
                <p>
                  This website serves as a central hub for discovering everything Stoneham has to offer. We bring 
                  together information about:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Community events and activities</li>
                  <li>Local attractions and recreational opportunities</li>
                  <li>Community services and resources</li>
                  <li>Local businesses and dining options</li>
                  <li>Ways to get involved in our community</li>
                </ul>
                <p>
                  Our goal is to make it easier for residents to stay connected and for visitors to discover 
                  the charm and character that make Stoneham a wonderful place to live and visit.
                </p>
              </div>
            </section>

            {/* Data & Privacy */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-[#2A6F4D] mr-4" />
                <h2 className="text-3xl font-bold text-[#2A6F4D]">Your Privacy & Our Data Use</h2>
              </div>
              <div className="space-y-4 text-[#404040] leading-relaxed">
                <p>
                  We believe in transparency about how our website works and what information we use:
                </p>
                
                <div className="bg-[#93C47D]/20 rounded-lg p-4">
                  <h3 className="font-semibold text-[#2A6F4D] mb-2">What We Don't Collect</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>We don't require you to create accounts or log in</li>
                    <li>We don't use tracking cookies or analytics</li>
                    <li>We don't store your personal information</li>
                    <li>We don't sell or share any visitor data</li>
                  </ul>
                </div>

                <div className="bg-[#D2E5F1]/30 rounded-lg p-4">
                  <h3 className="font-semibold text-[#007B9E] mb-2">External Services We Use</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Google Maps:</strong> To show business locations and provide directions</li>
                    <li><strong>Google Forms:</strong> When you submit events or feedback through our forms</li>
                    <li><strong>Calendar Feeds:</strong> To display community events from various sources</li>
                  </ul>
                  <p className="text-xs mt-2 text-[#666666]">
                    These services have their own privacy policies which govern any data they collect.
                  </p>
                </div>
              </div>
            </section>

            {/* Accessibility */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-[#F4A300] mr-4" />
                <h2 className="text-3xl font-bold text-[#2A6F4D]">Website Accessibility</h2>
              </div>
              <div className="space-y-4 text-[#404040] leading-relaxed">
                <p>
                  We're committed to making our website accessible to everyone in our community. We strive to follow 
                  web accessibility guidelines and continuously improve the user experience for all visitors.
                </p>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#2A6F4D]">Our Accessibility Features Include:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Clear, readable fonts and color contrast</li>
                    <li>Keyboard navigation support</li>
                    <li>Descriptive alt text for images</li>
                    <li>Responsive design for all device types</li>
                    <li>Logical page structure and headings</li>
                  </ul>
                </div>

                <div className="bg-[#F4A300]/20 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Need Help?</strong> If you encounter any accessibility barriers on our website, 
                    please let us know so we can address them. Contact us using the information below.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-6">
                <Phone className="w-8 h-8 text-[#D95D39] mr-4" />
                <h2 className="text-3xl font-bold text-[#2A6F4D]">Questions or Feedback?</h2>
              </div>
              <div className="space-y-4 text-[#404040] leading-relaxed">
                <p>
                  We'd love to hear from you! Whether you have questions about our website, suggestions for 
                  improvement, or want to get involved with Stoneham CAN, we're here to help.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-[#007B9E] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#2A6F4D]">Email Us</h3>
                      <a 
                        href="mailto:explorestoneham@stonehamcan.org"
                        className="text-[#007B9E] hover:text-[#2A6F4D] underline"
                      >
                        explorestoneham@stonehamcan.org
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <ExternalLink className="w-5 h-5 text-[#007B9E] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#2A6F4D]">Visit Stoneham CAN</h3>
                      <a 
                        href="https://www.stonehamcan.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#007B9E] hover:text-[#2A6F4D] underline"
                      >
                        www.stonehamcan.org
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Community Message */}
            <section className="bg-gradient-to-r from-[#2A6F4D] to-[#007B9E] rounded-xl shadow-md p-8 text-white text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-[#F4A300]" />
              <h2 className="text-2xl font-bold mb-4">Built with Love for Our Community</h2>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                This website exists because we believe in the power of community connection. Thank you for being 
                part of what makes Stoneham special, and thank you for exploring all our town has to offer!
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};