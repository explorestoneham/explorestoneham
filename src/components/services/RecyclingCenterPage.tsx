"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, DollarSign, FileText, Phone, MapPin, AlertTriangle, 
  CheckCircle, Calendar, Recycle, Truck, Leaf, Info, 
  ChevronDown, ChevronUp, Star, Download, ExternalLink, Home, ChevronRight 
} from 'lucide-react';
import { Header } from '../generated/Header';
import { Footer } from '../generated/Footer';

interface FAQItem {
  question: string;
  answer: string;
  id: string;
}

interface PermitItem {
  name: string;
  price: string;
  items: string[];
}

export function RecyclingCenterPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('hours');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'Do I need a sticker to use the recycling center?',
      answer: 'Yes, all vehicles must display a valid Stoneham recycling sticker on the driver\'s side. Your first sticker per household is free, and additional stickers cost $30.'
    },
    {
      id: '2',
      question: 'What happens if I arrive after closing time?',
      answer: 'The recycling center closes promptly at the posted times. Late arrivals will not be admitted for safety and operational reasons.'
    },
    {
      id: '3',
      question: 'Can I bring commercial vehicles or large trucks?',
      answer: 'No, commercial vehicles and dump trucks are not allowed. Only passenger cars, pickup trucks, and small utility trailers are permitted.'
    },
    {
      id: '4',
      question: 'What if the weather is bad?',
      answer: 'All operations are weather permitting. During severe weather conditions, the center may close for safety reasons. Hours are subject to change without notice.'
    }
  ];

  const whiteGoodsPermits: PermitItem = {
    name: 'White Goods Permits',
    price: '$20 each',
    items: [
      'Refrigerator & Freezer',
      'Air Conditioner & Dehumidifier', 
      'Television & Monitor',
      'Water Bubbler & Water Heater',
      'Word Processor & Tower/Hard Drive',
      'Printer/Copier/Scanner',
      'Lap Top (keyboard in regular trash)'
    ]
  };

  const metalPermits: PermitItem = {
    name: 'Miscellaneous Metal Permits',
    price: '$10 each',
    items: [
      'Washing Machine & Dryer',
      'Gas Grill (no propane tanks)',
      'Microwave & Dishwasher',
      'Scrap Metal & Stove',
      'Helium Tank (2lbs or less)',
      'VCR/DVD & Cell Phones',
      'Lawnmower (oil & gas drained, no riding mowers)'
    ]
  };

  const noChargeItems = [
    'Fluorescent Lights & Ballasts',
    'Nickel-Cadmium Batteries', 
    'Button Batteries',
    'Yard Waste (grass, leaves, branches)',
    'Brush (separated, max 4ft length, 8" diameter)'
  ];

  const rules = [
    'Open to Stoneham residents only that pay trash fee to Town',
    'Valid sticker from DPW required on driver\'s side of vehicle',
    'No commercial vehicles, dump trucks, or landscapers allowed',
    'Vehicles larger than standard pickup truck not allowed',
    'No trash allowed - yard waste only',
    'Special permits required for televisions, metal, hard plastics',
    'No hazardous materials - contact DPW for disposal dates'
  ];

  const holidays = [
    'Patriots Day (April 21)',
    'Memorial Day (May 26)', 
    'Labor Day (September 1)',
    'Columbus Day/Indigenous Peoples Day (October 13)'
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#404040]">
      <Header />
      
      {/* Header Section */}
      <section className="relative recycling-center-hero text-white overflow-hidden" style={{
        background: 'linear-gradient(135deg, #2A6F4D 0%, #007B9E 50%, #2A6F4D 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-white/80 mb-6">
              <button
                onClick={() => (window as any).handleNavigation?.('/')} // eslint-disable-line @typescript-eslint/no-explicit-any
                className="flex items-center space-x-1 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Community Hub</span>
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm">Municipal Services</span>
            </div>

            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-[#F4A300] rounded-full flex items-center justify-center">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold">Stevens Street Recycling Center</h1>
                  <p className="text-xl text-[#D2E5F1] mt-2">Yard Waste & Recycling Services</p>
                </div>
              </div>


            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'hours', label: 'Hours', icon: Clock },
            { id: 'stickers', label: 'Stickers', icon: FileText },
            { id: 'permits', label: 'Permits & Fees', icon: DollarSign },
            { id: 'rules', label: 'Rules', icon: AlertTriangle },
            { id: 'contact', label: 'Contact', icon: Phone }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#007B9E] text-white shadow-lg border-none'
                  : 'bg-white text-[#404040] border border-[#D2E5F1] hover:bg-[#D2E5F1]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Hours Tab */}
          {activeTab === 'hours' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-6 h-6 text-[#007B9E]" />
                  <div>
                    <h3 className="text-2xl font-bold text-[#2A6F4D]">Operating Hours 2025</h3>
                    <p className="text-sm text-[#404040]/70">(Valid until November 29, 2025)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#93C47D]/10 rounded-lg p-4">
                    <h4 className="font-semibold text-[#2A6F4D] mb-2">Saturday</h4>
                    <p className="text-[#404040]">8:00 AM - 1:00 PM</p>
                    <p className="text-sm text-[#404040]/70">Yard Waste & White Goods/Metal</p>
                  </div>
                  <div className="bg-[#007B9E]/10 rounded-lg p-4">
                    <h4 className="font-semibold text-[#2A6F4D] mb-2">Monday</h4>
                    <p className="text-[#404040]">8:00 AM - 12:00 Noon</p>
                    <p className="text-sm text-[#404040]/70">Yard Waste & White Goods/Metal</p>
                  </div>
                  <div className="bg-[#F4A300]/10 rounded-lg p-4">
                    <h4 className="font-semibold text-[#2A6F4D] mb-2">Wednesday</h4>
                    <p className="text-[#404040]">3:30 PM - 6:00 PM</p>
                    <p className="text-sm text-[#404040]/70">Yard Waste Only</p>
                    <p className="text-xs text-[#D95D39] mt-1">November hours: 3:30 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-[#D2E5F1]">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-[#D95D39]" />
                    <h4 className="text-lg font-semibold text-[#2A6F4D]">Important Notes</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-[#404040]/80">
                    <li>• Season runs April 2 - November 29, 2025</li>
                    <li>• All operations weather permitting</li>
                    <li>• Center closes promptly at posted times</li>
                    <li>• Hours subject to change without notice</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-[#D2E5F1]">
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="w-5 h-5 text-[#F4A300]" />
                    <h4 className="text-lg font-semibold text-[#2A6F4D]">Holiday Closures</h4>
                  </div>
                  <div className="space-y-2 text-sm text-[#404040]/80">
                    {holidays.map((holiday, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#D95D39] rounded-full"></div>
                        <span>{holiday}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stickers Tab */}
          {activeTab === 'stickers' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="w-6 h-6 text-[#F4A300]" />
                  <h3 className="text-2xl font-bold text-[#2A6F4D]">Sticker Requirements</h3>
                </div>
                <div className="space-y-6">
                  <div className="bg-[#93C47D]/10 rounded-lg p-6">
                    <h4 className="font-semibold text-[#2A6F4D] mb-3">Pricing</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>1st Sticker (per household)</span>
                        <span className="font-semibold text-[#2A6F4D]">FREE</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>2nd Sticker</span>
                        <span className="font-semibold text-[#D95D39]">$30.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#2A6F4D] mb-3">Vehicle Requirements</h4>
                    <ul className="space-y-2 text-sm text-[#404040]/80">
                      <li>• Valid Stoneham residency required</li>
                      <li>• Must pay trash fee to Town of Stoneham</li>
                      <li>• Sticker must be on driver's side of vehicle</li>
                      <li>• Passenger cars, pickup trucks, small utility trailers only</li>
                      <li>• Driver's license & vehicle registration required</li>
                      <li>• Stickers are NOT interchangeable between vehicles</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                <div className="flex items-center space-x-3 mb-6">
                  <Info className="w-6 h-6 text-[#007B9E]" />
                  <h3 className="text-2xl font-bold text-[#2A6F4D]">How to Get Your Sticker</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#007B9E] rounded-full flex items-center justify-center text-white font-semibold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-[#404040] mb-1">Visit DPW Office</h4>
                      <p className="text-sm text-[#404040]/70">16 Pine Street, Stoneham</p>
                      <p className="text-sm text-[#404040]/70">Hours: 7:30 AM - 3:00 PM, Mon-Fri</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#007B9E] rounded-full flex items-center justify-center text-white font-semibold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-[#404040] mb-1">Bring Required Documents</h4>
                      <p className="text-sm text-[#404040]/70">Driver's license and vehicle registration</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#007B9E] rounded-full flex items-center justify-center text-white font-semibold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-[#404040] mb-1">Complete Application</h4>
                      <p className="text-sm text-[#404040]/70">Fill out recycling sticker application</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#F4A300] rounded-full flex items-center justify-center text-white font-semibold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-[#404040] mb-1">Receive Your Sticker</h4>
                      <p className="text-sm text-[#404040]/70">Apply to driver's side windshield</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#D95D39]/10 rounded-lg p-4 mt-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-[#D95D39]" />
                    <h4 className="font-semibold text-[#D95D39]">Important Notice</h4>
                  </div>
                  <p className="text-sm text-[#404040]/80">
                    If vehicle is sold, totaled, or windshield replaced, return current sticker to DPW. 
                    New sticker for same fiscal year will be issued or $30 will be charged.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Permits Tab */}
          {activeTab === 'permits' && (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* White Goods Permits */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#2A6F4D]">{whiteGoodsPermits.name}</h3>
                    <span className="bg-[#D95D39] text-white px-4 py-2 rounded-full font-semibold">
                      {whiteGoodsPermits.price}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {whiteGoodsPermits.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-[#93C47D]" />
                        <span className="text-[#404040]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metal Permits */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#2A6F4D]">{metalPermits.name}</h3>
                    <span className="bg-[#007B9E] text-white px-4 py-2 rounded-full font-semibold">
                      {metalPermits.price}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {metalPermits.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-[#93C47D]" />
                        <span className="text-[#404040]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* No Charge Items */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-[#93C47D]" />
                  <h3 className="text-2xl font-bold text-[#2A6F4D]">No Charge Items</h3>
                  <span className="bg-[#93C47D] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Recycling Sticker Required
                  </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {noChargeItems.map((item, index) => (
                    <div key={index} className="bg-[#93C47D]/10 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-[#93C47D] rounded-full"></div>
                        <span className="text-[#404040] font-medium">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#F4A300]/10 rounded-lg p-4 mt-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-[#F4A300]" />
                    <h4 className="font-semibold text-[#2A6F4D]">Yard Waste Guidelines</h4>
                  </div>
                  <p className="text-sm text-[#404040]/80">
                    Brush must be separated from leaves/grass clippings. Maximum 4 feet in length, 
                    maximum 8" diameter. Sand, stone, construction material, or fencing is NOT allowed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rules Tab */}
          {activeTab === 'rules' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-[#D95D39]" />
                  <h3 className="text-2xl font-bold text-[#2A6F4D]">General Rules & Guidelines</h3>
                </div>
                <div className="grid md:grid-cols-1 gap-6">
                  {rules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#007B9E] rounded-full flex items-center justify-center text-white font-semibold text-sm mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-[#404040]">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                  <div className="flex items-center space-x-3 mb-6">
                    <Truck className="w-6 h-6 text-[#F4A300]" />
                    <h3 className="text-xl font-bold text-[#2A6F4D]">Vehicle Restrictions</h3>
                  </div>
                  <ul className="space-y-3 text-[#404040]">
                    <li>• No commercial vehicles or dump trucks</li>
                    <li>• No landscapers, florists, or property management companies</li>
                    <li>• Vehicles larger than standard pickup truck not allowed</li>
                    <li>• Passenger cars, pickup trucks, small utility trailers only</li>
                    <li>• Driver must remain with vehicle at all times</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                  <div className="flex items-center space-x-3 mb-6">
                    <AlertTriangle className="w-6 h-6 text-[#D95D39]" />
                    <h3 className="text-xl font-bold text-[#2A6F4D]">Prohibited Items</h3>
                  </div>
                  <ul className="space-y-3 text-[#404040]">
                    <li>• Hazardous waste materials</li>
                    <li>• Automotive parts or oil tanks</li>
                    <li>• Riding mowers</li>
                    <li>• Propane tanks with grills</li>
                    <li>• Any type of household trash</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#D95D39]/10 rounded-lg p-6 border border-[#D95D39]/20">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#D95D39]" />
                  <h3 className="text-lg font-bold text-[#D95D39]">Violation Policy</h3>
                </div>
                <p className="text-[#404040]">
                  <strong>FAILURE TO FOLLOW THESE RULES WILL BE GROUNDS FOR RECYCLING CENTER 
                  STICKER TO BE REVOKED.</strong> Violation of any policies will result in 
                  revocation of recycling permit for ONE YEAR.
                </p>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                <div className="flex items-center space-x-3 mb-6">
                  <Phone className="w-6 h-6 text-[#007B9E]" />
                  <h3 className="text-2xl font-bold text-[#2A6F4D]">Contact Information</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-[#2A6F4D] mb-3">Department of Public Works</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-[#404040]/60" />
                        <span className="text-[#404040]">16 Pine Street, Stoneham, MA</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-[#404040]/60" />
                        <a href="tel:781-438-0760" className="text-[#007B9E] hover:underline">
                          (781) 438-0760
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-[#404040]/60" />
                        <span className="text-[#404040]">Fax: (781) 438-8183</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#007B9E]/10 rounded-lg p-4">
                    <h4 className="font-semibold text-[#2A6F4D] mb-2">Office Hours</h4>
                    <p className="text-[#404040] text-sm">Monday - Friday: 7:30 AM - 3:00 PM</p>
                    <p className="text-[#404040]/70 text-xs mt-1">
                      Recycling stickers & permits available during office hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-[#D2E5F1]">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="w-6 h-6 text-[#F4A300]" />
                  <h3 className="text-2xl font-bold text-[#2A6F4D]">Recycling Center Location</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#93C47D]/10 rounded-lg p-4">
                    <h4 className="font-semibold text-[#2A6F4D] mb-2">Address</h4>
                    <p className="text-[#404040]">Stevens Street, Stoneham, MA</p>
                    <p className="text-sm text-[#404040]/70 mt-1">
                      Look for posted signs when approaching the facility
                    </p>
                  </div>
                  
                  <div className="bg-[#F4A300]/10 rounded-lg p-4">
                    <h4 className="font-semibold text-[#2A6F4D] mb-2">Hazardous Waste</h4>
                    <p className="text-sm text-[#404040]/70">
                      Contact DPW for information on hazardous waste collection dates 
                      (held 2 times per year)
                    </p>
                  </div>

                  <div className="bg-[#007B9E]/10 rounded-lg p-4">
                    <h4 className="font-semibold text-[#2A6F4D] mb-2">Special Permits</h4>
                    <p className="text-sm text-[#404040]/70">
                      White goods permits ($20) and metal permits ($10) can be purchased 
                      at the DPW office during regular business hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2A6F4D] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-[#404040]/70 max-w-2xl mx-auto">
              Find answers to common questions about using the recycling center
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map(faq => (
              <div key={faq.id} className="bg-white rounded-xl shadow-lg border border-[#D2E5F1] overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-[#F7F7F7] transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-[#2A6F4D] pr-4">{faq.question}</h3>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-[#404040]/60 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#404040]/60 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-[#404040]/80 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}