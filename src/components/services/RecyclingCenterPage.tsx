import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Phone, MapPin, AlertTriangle, DollarSign, 
  Calendar, Truck, Recycle, Info, CheckCircle, XCircle,
  ChevronDown, ChevronRight, Home
} from 'lucide-react';
import { Header } from '../generated/Header';
import { Footer } from '../generated/Footer';

interface FeeItem {
  name: string;
  price: number;
  items: string[];
}

interface HoursSchedule {
  day: string;
  hours: string;
  services: string;
  note?: string;
}

export function RecyclingCenterPage() {
  const [activeTab, setActiveTab] = useState<'rules' | 'fees' | 'hours' | 'contact'>('rules');
  const [expandedFeeSection, setExpandedFeeSection] = useState<string | null>(null);

  const whiteGoodsItems: FeeItem = {
    name: 'White Goods',
    price: 20,
    items: [
      'Refrigerator',
      'Air Conditioner', 
      'Freezer',
      'Dehumidifier',
      'Television',
      'Water Bubbler',
      'Word Processor',
      'Tower/Hard Drive',
      'Printer/Copier/Scanner',
      'Monitor/Lap Top'
    ]
  };

  const metalItems: FeeItem = {
    name: 'Miscellaneous Metal',
    price: 10,
    items: [
      'Washing machine',
      'Gas Grill (no propane tanks)',
      'Dryer',
      'Microwave',
      'Water Heater',
      'Dishwasher',
      'Scrap metal',
      'Stove',
      'Helium Tank (2lbs or less)',
      'VCR/DVD',
      'Cell Phones',
      'Lawnmower (oil & gas drained out) – No riding mowers'
    ]
  };

  const noChargeItems: string[] = [
    'Fluorescent Lights / Ballasts',
    'Nickel-Cadmium Batteries',
    'Button Batteries'
  ];

  const schedule2025: HoursSchedule[] = [
    {
      day: 'Saturday',
      hours: '8:00 AM - 1:00 PM',
      services: 'Yard Waste & White Goods / Metal'
    },
    {
      day: 'Monday',
      hours: '8:00 AM - 12:00 PM',
      services: 'Yard Waste & White Goods / Metal',
      note: 'Closed: Patriots Day (April 21), Memorial Day (May 26), Labor Day (September 1), Columbus Day/Indigenous Peoples Day (October 13)'
    },
    {
      day: 'Wednesday',
      hours: '3:30 PM - 6:00 PM',
      services: 'Yard Waste Only'
    },
    {
      day: 'November 2025',
      hours: '3:30 PM - 5:00 PM',
      services: 'Wednesday Yard Waste Only'
    }
  ];

  const generalRules: Array<{ rule: string; important?: boolean }> = [
    { rule: 'Open to Stoneham residents only that pay a trash fee to the Town of Stoneham. Must have a valid sticker from the Department of Public Works', important: true },
    { rule: 'Current sticker must be on vehicle (driver\'s side)', important: true },
    { rule: 'Recycle Center is only open during posted hours - all hours subject to change without notice' },
    { rule: 'No Commercial Vehicles - No dump trucks allowed', important: true },
    { rule: 'Vehicles larger than a standard size pickup truck are not allowed', important: true },
    { rule: 'No landscapers, florists or property management companies' },
    { rule: 'No Trash is allowed', important: true },
    { rule: 'A special permit (some fees apply) from the Department of Public Works is required for drop off of televisions, metal, hard plastics, etc.' },
    { rule: 'No hazardous waste materials - Contact the DPW for proper disposal and dates of hazardous waste drop offs (2 times per year).' },
    { rule: 'Yard waste consists of grass clippings, plants, flowers, leaves, branches, twigs and brush. Sand, stone, construction material or fencing is not allowed.' }
  ];

  const TabButton: React.FC<{ 
    id: 'rules' | 'fees' | 'hours' | 'contact';
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }> = ({ id, icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? 'bg-stoneham-green text-white shadow-md'
          : 'bg-white text-granite-gray border border-sky-tint hover:bg-sky-tint hover:text-lakeside-blue'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const FeeCard: React.FC<{ feeItem: FeeItem }> = ({ feeItem }) => {
    const isExpanded = expandedFeeSection === feeItem.name;
    
    return (
      <motion.div
        className="bg-white rounded-xl shadow-md border border-sky-tint overflow-hidden"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-autumn-brick/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-autumn-brick" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-granite-gray">{feeItem.name}</h3>
                <p className="text-2xl font-bold text-autumn-brick">${feeItem.price}.00 each</p>
              </div>
            </div>
            <button
              onClick={() => setExpandedFeeSection(isExpanded ? null : feeItem.name)}
              className="p-2 rounded-lg hover:bg-sky-tint transition-colors"
            >
              <ChevronDown className={`w-5 h-5 text-granite-gray transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-sky-tint">
                  <p className="text-sm font-medium text-granite-gray mb-3">Items included:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {feeItem.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-community-sage flex-shrink-0" />
                        <span className="text-sm text-granite-gray">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-birch-white">
      <Header />
      
      {/* Hero Section */}
      <div className="text-white bg-gradient-to-br from-[#2A6F4D] via-[#007B9E] to-[#2A6F4D]">
        <div className="container py-12">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-2 text-white/80 mb-4">
              <button
                onClick={() => (window as any).handleNavigation?.('/')}
                className="flex items-center space-x-1 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Community Hub</span>
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm">Municipal Services</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Stevens Street Recycling Center
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Yard waste disposal and recycling services for Stoneham residents
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-[#F4A300]" />
                  <div>
                    <p className="font-semibold">Operating Season</p>
                    <p className="text-sm text-white/80">April 2 - November 29, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-[#F4A300]" />
                  <div>
                    <p className="font-semibold">Contact DPW</p>
                    <p className="text-sm text-white/80">(781) 438-0760</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-[#F4A300]" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-sm text-white/80">Stevens Street, Stoneham</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Alert */}
      <div className="container py-6">
        <div className="bg-autumn-brick/10 border border-autumn-brick/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-autumn-brick flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-autumn-brick mb-1">Important Requirements</h3>
              <p className="text-granite-gray text-sm">
                <strong>Recycling sticker required for each vehicle.</strong> Stickers are NOT interchangeable. 
                Violation of any policies will result in revocation of recycling permit for one year.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container pb-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <TabButton
            id="rules"
            icon={<Recycle className="w-5 h-5" />}
            label="General Rules"
            isActive={activeTab === 'rules'}
            onClick={() => setActiveTab('rules')}
          />
          <TabButton
            id="fees"
            icon={<DollarSign className="w-5 h-5" />}
            label="Permits & Fees"
            isActive={activeTab === 'fees'}
            onClick={() => setActiveTab('fees')}
          />
          <TabButton
            id="hours"
            icon={<Calendar className="w-5 h-5" />}
            label="Hours & Schedule"
            isActive={activeTab === 'hours'}
            onClick={() => setActiveTab('hours')}
          />
          <TabButton
            id="contact"
            icon={<Phone className="w-5 h-5" />}
            label="Contact & Location"
            isActive={activeTab === 'contact'}
            onClick={() => setActiveTab('contact')}
          />
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'rules' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-granite-gray mb-6">General Rules</h2>
                  <div className="space-y-4">
                    {generalRules.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-3 p-4 rounded-lg ${
                          item.important ? 'bg-autumn-brick/5 border border-autumn-brick/20' : 'bg-gray-50'
                        }`}
                      >
                        {item.important ? (
                          <AlertTriangle className="w-5 h-5 text-autumn-brick flex-shrink-0 mt-0.5" />
                        ) : (
                          <Info className="w-5 h-5 text-lakeside-blue flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className={`text-sm ${item.important ? 'font-semibold text-granite-gray' : 'text-granite-gray'}`}>
                            {index + 1}. {item.rule}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-community-sage/10 border border-community-sage/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-community-sage flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-granite-gray mb-1">Yard Waste Guidelines</p>
                        <p className="text-sm text-granite-gray">
                          Brush must be separated from leaves/grass clippings. Maximum 4 feet in length, maximum 8" diameter.
                          <strong> Yard waste is not trash.</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fees' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FeeCard feeItem={whiteGoodsItems} />
                  <FeeCard feeItem={metalItems} />
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-community-sage/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-community-sage" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-granite-gray">No Charge Items</h3>
                      <p className="text-community-sage font-semibold">FREE with recycling sticker</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {noChargeItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-community-sage/5 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-community-sage flex-shrink-0" />
                        <span className="text-sm text-granite-gray">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-granite-gray mb-4">Recycling Sticker Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-granite-gray mb-2">Sticker Fees</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">1st Sticker (per household)</span>
                          <span className="font-semibold text-community-sage">FREE</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">2nd Sticker</span>
                          <span className="font-semibold text-autumn-brick">$30.00</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-granite-gray mb-2">Requirements</h4>
                      <div className="space-y-2 text-sm text-granite-gray">
                        <p>• Driver's license & vehicle registration required</p>
                        <p>• Passenger cars, pickup trucks, small utility trailers only</p>
                        <p>• If vehicle is sold/totaled/windshield replaced, return current sticker</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-granite-gray mb-4">Important Restrictions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-autumn-brick" />
                        <span className="text-sm text-granite-gray">No automotive parts allowed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-autumn-brick" />
                        <span className="text-sm text-granite-gray">No oil tanks</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-autumn-brick" />
                        <span className="text-sm text-granite-gray">No riding mowers</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-autumn-brick" />
                        <span className="text-sm text-granite-gray">No propane tanks with grills</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-autumn-brick" />
                        <span className="text-sm text-granite-gray">Lawnmowers must have oil & gas drained</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-autumn-brick" />
                        <span className="text-sm text-granite-gray">Put keyboard in regular trash (not with monitor/laptop)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hours' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-granite-gray mb-6">
                    2025 Operating Schedule
                  </h2>
                  <p className="text-lakeside-blue font-semibold mb-6">
                    Season: April 2 through November 29, 2025 (Weather Permitting)
                  </p>
                  
                  <div className="space-y-4">
                    {schedule2025.map((day, index) => (
                      <div key={index} className="border border-sky-tint rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Calendar className="w-5 h-5 text-lakeside-blue" />
                              <h3 className="font-bold text-granite-gray">{day.day}</h3>
                              <span className="px-3 py-1 bg-stoneham-green text-white text-xs rounded-full">
                                {day.hours}
                              </span>
                            </div>
                            <p className="text-granite-gray text-sm ml-8">{day.services}</p>
                          </div>
                        </div>
                        {day.note && (
                          <div className="mt-3 p-3 bg-autumn-brick/10 border border-autumn-brick/20 rounded-lg ml-8">
                            <p className="text-xs text-granite-gray">
                              <strong>Note:</strong> {day.note}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-beacon-gold/10 border border-beacon-gold/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-beacon-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-granite-gray mb-1">Hours Subject to Change</p>
                        <p className="text-sm text-granite-gray">
                          All operating hours are weather permitting and subject to change without notice.
                          November 2025 Wednesday hours are reduced (3:30 PM - 5:00 PM).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-granite-gray mb-6">
                    Department of Public Works
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-granite-gray mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-lakeside-blue" />
                          <div>
                            <p className="font-medium text-granite-gray">Phone</p>
                            <a href="tel:781-438-0760" className="text-lakeside-blue hover:underline">
                              (781) 438-0760
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-lakeside-blue" />
                          <div>
                            <p className="font-medium text-granite-gray">Fax</p>
                            <p className="text-granite-gray">(781) 438-8183</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-lakeside-blue" />
                          <div>
                            <p className="font-medium text-granite-gray">Office Address</p>
                            <p className="text-granite-gray">16 Pine Street<br />Stoneham, MA</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-lakeside-blue" />
                          <div>
                            <p className="font-medium text-granite-gray">Office Hours</p>
                            <p className="text-granite-gray">7:30 AM - 3:00 PM<br />Monday - Friday</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-granite-gray mb-4">Services Available</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-community-sage flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-granite-gray">Recycling Stickers & Permits</p>
                            <p className="text-sm text-granite-gray">Pick up at DPW office during business hours</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-community-sage flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-granite-gray">White Goods Permits</p>
                            <p className="text-sm text-granite-gray">$20.00 each - recycling sticker required</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-community-sage flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-granite-gray">Metal Permits</p>
                            <p className="text-sm text-granite-gray">$10.00 each - recycling sticker required</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-community-sage flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-granite-gray">Hazardous Waste Info</p>
                            <p className="text-sm text-granite-gray">Information on special collection dates (2x per year)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="font-semibold text-granite-gray mb-4">Recycling Center Location</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-lakeside-blue" />
                    <p className="text-granite-gray">Stevens Street, Stoneham, MA</p>
                  </div>
                  <p className="text-sm text-granite-gray mb-4">
                    The recycling center is located on Stevens Street. Look for posted signs when approaching the facility.
                  </p>
                  <div className="bg-sky-tint p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-lakeside-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-granite-gray">Vehicle Requirements</p>
                        <p className="text-sm text-granite-gray">
                          Only passenger cars, pickup trucks, and small utility trailers are allowed. 
                          No commercial vehicles or vehicles larger than standard pickup trucks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <Footer />
    </div>
  );
}