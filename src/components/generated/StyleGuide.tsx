import React from 'react';
import { ArrowLeft, Palette, Type, Layout, MousePointer, Eye, Smartphone, Accessibility } from 'lucide-react';

export const StyleGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#404040]">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-[#D2E5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <a href="/" onClick={(e) => {
                e.preventDefault();
                (window as any).handleNavigation?.('/');
              }} className="flex items-center space-x-2 text-[#2A6F4D] hover:text-[#007B9E] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Site</span>
            </a>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2A6F4D] mb-4">
            Explore Stoneham Style Guide
          </h1>
          <p className="text-lg text-[#404040] max-w-3xl">
            A comprehensive design system for the Explore Stoneham website, ensuring consistency, accessibility, and community-focused design.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2A6F4D] mb-6 flex items-center">
            <Palette className="w-8 h-8 mr-3" />
            Brand Overview
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-[#007B9E] mb-4">Brand Essence</h3>
            <p className="text-[#404040] mb-6">
              Explore Stoneham is a civic-minded, welcoming, and informative platform designed to celebrate local culture, 
              events, and history while connecting residents with services, recreation, and civic involvement.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="text-lg font-semibold text-[#2A6F4D] mb-3">Brand Personality</h4>
                <ul className="space-y-2 text-[#404040]">
                  <li>• Approachable and local-first</li>
                  <li>• Trustworthy and family-friendly</li>
                  <li>• Historic with modern touches</li>
                  <li>• Community-focused and active</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#2A6F4D] mb-3">Brand Values</h4>
                <ul className="space-y-2 text-[#404040]">
                  <li>• Community engagement</li>
                  <li>• Accessibility and transparency</li>
                  <li>• Authenticity and pride in place</li>
                  <li>• Small-town charm with modern utility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2A6F4D] mb-6 flex items-center">
            <Palette className="w-8 h-8 mr-3" />
            Color Palette
          </h2>
          
          {/* Primary Colors */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-xl font-semibold text-[#007B9E] mb-6">Primary Colors</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-full h-24 rounded-lg bg-[#2A6F4D] mb-3 flex items-center justify-center">
                  <span className="text-white font-semibold">Stoneham Green</span>
                </div>
                <p className="font-mono text-sm text-[#404040]">#2A6F4D</p>
                <p className="text-sm text-[#404040] mt-2">Nature, trust, civic pride</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-lg bg-[#007B9E] mb-3 flex items-center justify-center">
                  <span className="text-white font-semibold">Lakeside Blue</span>
                </div>
                <p className="font-mono text-sm text-[#404040]">#007B9E</p>
                <p className="text-sm text-[#404040] mt-2">Calm, connection, clarity</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-lg bg-[#F4A300] mb-3 flex items-center justify-center">
                  <span className="text-white font-semibold">Beacon Gold</span>
                </div>
                <p className="font-mono text-sm text-[#404040]">#F4A300</p>
                <p className="text-sm text-[#404040] mt-2">Energy, optimism, action</p>
              </div>
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-xl font-semibold text-[#007B9E] mb-6">Secondary Colors</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-full h-24 rounded-lg bg-[#D95D39] mb-3 flex items-center justify-center">
                  <span className="text-white font-semibold">Autumn Brick</span>
                </div>
                <p className="font-mono text-sm text-[#404040]">#D95D39</p>
                <p className="text-sm text-[#404040] mt-2">Warmth, nostalgia, grounding</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-lg bg-[#93C47D] mb-3 flex items-center justify-center">
                  <span className="text-white font-semibold">Community Sage</span>
                </div>
                <p className="font-mono text-sm text-[#404040]">#93C47D</p>
                <p className="text-sm text-[#404040] mt-2">Balance, inclusivity</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-lg bg-[#D2E5F1] mb-3 flex items-center justify-center">
                  <span className="text-[#404040] font-semibold">Sky Tint</span>
                </div>
                <p className="font-mono text-sm text-[#404040]">#D2E5F1</p>
                <p className="text-sm text-[#404040] mt-2">Lightness, openness</p>
              </div>
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-[#007B9E] mb-6">Neutral Colors</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-full h-24 rounded-lg bg-[#F7F7F7] mb-3 flex items-center justify-center border border-[#D2E5F1]">
                  <span className="text-[#404040] font-semibold">Birch White</span>
                </div>
                <p className="font-mono text-sm text-[#404040]">#F7F7F7</p>
                <p className="text-sm text-[#404040] mt-2">Simplicity, clarity</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 rounded-lg bg-[#404040] mb-3 flex items-center justify-center">
                  <span className="text-white font-semibold">Granite Gray</span>
                </div>
                <p className="font-mono text-sm text-[#404040]">#404040</p>
                <p className="text-sm text-[#404040] mt-2">Authority, balance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2A6F4D] mb-6 flex items-center">
            <Type className="w-8 h-8 mr-3" />
            Typography
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-[#007B9E] mb-6">Font Stack</h3>
            <p className="text-[#404040] mb-6">
              Inter, Arial, Helvetica, sans-serif
            </p>
            
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-[#2A6F4D]">Heading 1 - 4xl (2.25rem)</h1>
                <p className="text-sm text-[#404040] mt-1">Used for main page titles and hero sections</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#2A6F4D]">Heading 2 - 3xl (1.875rem)</h2>
                <p className="text-sm text-[#404040] mt-1">Used for section headers</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#007B9E]">Heading 3 - 2xl (1.5rem)</h3>
                <p className="text-sm text-[#404040] mt-1">Used for subsection headers</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#007B9E]">Heading 4 - xl (1.25rem)</h4>
                <p className="text-sm text-[#404040] mt-1">Used for card titles and emphasis</p>
              </div>
              <div>
                <p className="text-base text-[#404040]">Body text - base (1rem) - This is the standard body text used throughout the site for readability and accessibility.</p>
              </div>
              <div>
                <p className="text-sm text-[#404040]">Small text - sm (0.875rem) - Used for captions, metadata, and secondary information.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2A6F4D] mb-6 flex items-center">
            <Layout className="w-8 h-8 mr-3" />
            Components
          </h2>
          
          {/* Buttons */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-xl font-semibold text-[#007B9E] mb-6">Buttons</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#2A6F4D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1f5a3f] transition-colors">
                  Primary Button
                </button>
                <button className="bg-[#007B9E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005a7a] transition-colors">
                  Secondary Button
                </button>
                <button className="bg-[#F4A300] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d89400] transition-colors">
                  CTA Button
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="border-2 border-[#2A6F4D] text-[#2A6F4D] px-6 py-3 rounded-lg font-semibold hover:bg-[#2A6F4D] hover:text-white transition-colors">
                  Outline Button
                </button>
                <button className="text-[#2A6F4D] px-6 py-3 rounded-lg font-semibold hover:bg-[#D2E5F1] transition-colors">
                  Text Button
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-[#007B9E] mb-6">Cards</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#D2E5F1] rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-[#2A6F4D] mb-2">Event Card</h4>
                <p className="text-[#404040] mb-4">This is an example event card with a clean, modern design that follows our brand guidelines.</p>
                <button className="bg-[#F4A300] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d89400] transition-colors">
                  Learn More
                </button>
              </div>
              <div className="bg-[#D2E5F1] border border-[#007B9E] rounded-lg p-6">
                <h4 className="text-lg font-semibold text-[#007B9E] mb-2">Info Card</h4>
                <p className="text-[#404040] mb-4">This card uses our secondary colors to provide visual hierarchy and interest.</p>
                <button className="bg-[#007B9E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#005a7a] transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive States */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2A6F4D] mb-6 flex items-center">
            <MousePointer className="w-8 h-8 mr-3" />
            Interactive States
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#007B9E] mb-4">Hover States</h3>
                <div className="space-y-4">
                  <button className="bg-[#2A6F4D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1f5a3f] transition-colors">
                    Hover me
                  </button>
                  <a href="#" className="text-[#2A6F4D] hover:text-[#007B9E] font-medium transition-colors block">
                    Hover link
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#007B9E] mb-4">Focus States</h3>
                <div className="space-y-4">
                  <button className="bg-[#007B9E] text-white px-6 py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#F4A300] focus:ring-offset-2 transition-colors">
                    Focus me
                  </button>
                  <input 
                    type="text" 
                    placeholder="Focus input"
                    className="w-full px-4 py-2 border border-[#D2E5F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B9E] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Design */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2A6F4D] mb-6 flex items-center">
            <Smartphone className="w-8 h-8 mr-3" />
            Responsive Design
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-[#007B9E] mb-6">Breakpoints</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#2A6F4D] mb-3">Mobile First</h4>
                <ul className="space-y-2 text-[#404040]">
                  <li>• <strong>Mobile:</strong> 320px - 768px</li>
                  <li>• <strong>Tablet:</strong> 768px - 1024px</li>
                  <li>• <strong>Desktop:</strong> 1024px+</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#2A6F4D] mb-3">Touch Targets</h4>
                <ul className="space-y-2 text-[#404040]">
                  <li>• Minimum 44px height</li>
                  <li>• Adequate spacing between elements</li>
                  <li>• Clear visual feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2A6F4D] mb-6 flex items-center">
            <Accessibility className="w-8 h-8 mr-3" />
            Accessibility
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#007B9E] mb-4">Color Contrast</h3>
                <ul className="space-y-2 text-[#404040]">
                  <li>• All text meets WCAG AA standards</li>
                  <li>• High contrast ratios for readability</li>
                  <li>• Color is not the only indicator</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#007B9E] mb-4">Focus Indicators</h3>
                <ul className="space-y-2 text-[#404040]">
                  <li>• Clear focus rings on interactive elements</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Screen reader compatibility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2A6F4D] mb-6 flex items-center">
            <Eye className="w-8 h-8 mr-3" />
            Usage Guidelines
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#007B9E] mb-3">Color Usage</h3>
                <ul className="space-y-2 text-[#404040]">
                  <li>• Use Stoneham Green for primary actions and branding</li>
                  <li>• Use Lakeside Blue for secondary actions and links</li>
                  <li>• Use Beacon Gold sparingly for CTAs and highlights</li>
                  <li>• Use neutral colors for text and backgrounds</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#007B9E] mb-3">Typography</h3>
                <ul className="space-y-2 text-[#404040]">
                  <li>• Maintain consistent hierarchy with defined type scale</li>
                  <li>• Use appropriate font weights for emphasis</li>
                  <li>• Ensure adequate line height for readability</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#007B9E] mb-3">Spacing</h3>
                <ul className="space-y-2 text-[#404040]">
                  <li>• Use consistent spacing scale (4px base unit)</li>
                  <li>• Maintain visual breathing room</li>
                  <li>• Group related elements together</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}; 