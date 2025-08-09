# Explore Stoneham - Developer Guide

**Technical documentation for developers working on the Explore Stoneham project**

## Table of Contents
1. [Technical Architecture](#technical-architecture)
2. [Development Setup](#development-setup)
3. [Project Structure](#project-structure)
4. [Component System](#component-system)
5. [API Integration](#api-integration)
6. [Deployment](#deployment)
7. [Maintenance](#maintenance)

---

## Technical Architecture

### Technology Stack
- **Frontend**: React 18.3.1 + TypeScript 5.7.3
- **Build Tool**: Vite 6.2.0 with hot module replacement
- **Styling**: Tailwind CSS 4.0.9 with custom design tokens
- **Routing**: Custom navigation system using History API
- **Animation**: Framer Motion for smooth transitions
- **3D Graphics**: React Three Fiber for historic tour
- **Calendar Integration**: Custom calendar service with multiple providers
- **Deployment**: Vercel with automatic deployments
- **Version Control**: Git with GitHub

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "typescript": "^5.7.3",
  "vite": "^6.2.0",
  "@tailwindcss/vite": "^4.0.9",
  "framer-motion": "^11.16.1",
  "@react-three/fiber": "^8.17.10",
  "lucide-react": "^0.469.0",
  "ical.js": "^2.1.0"
}
```

### Browser Support
- Modern browsers (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- Mobile browsers (iOS Safari 14+, Chrome Mobile 88+)
- ES2020+ features used throughout

---

## Development Setup

### Prerequisites
- Node.js 18+ (recommended: 20.x LTS)
- npm or yarn package manager
- Git for version control
- VS Code (recommended) with TypeScript extension

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/your-org/explore-stoneham.git
cd explore-stoneham/MagicPath

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables
Create `.env` file in project root:
```env
# Required for Google Calendar integration
VITE_GOOGLE_MAPS_API_KEY=your_google_api_key_here

# Optional: Enable development features
VITE_DEV_MODE=true
```

### Development Commands
```bash
# Development
npm run dev              # Start dev server at localhost:5173
yarn dev                 # Alternative with yarn

# Build & Test
npm run build            # TypeScript compilation + Vite build
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # ESLint with TypeScript rules
npm run format           # Prettier code formatting  
npm run format:check     # Check formatting without changes

# Type Checking
npm run type-check       # TypeScript compilation check
```

---

## Project Structure

```
src/
├── components/
│   ├── generated/          # Auto-generated main components
│   │   ├── ExploreStonehamApp.tsx    # Main app shell
│   │   ├── Header.tsx               # Site header/navigation
│   │   ├── Footer.tsx               # Site footer
│   │   ├── MainContentArea.tsx      # Home page content
│   │   └── StyleGuide.tsx           # Design system showcase
│   ├── events/            # Event system components
│   │   ├── EventsPage.tsx           # Full events page
│   │   ├── EventCard.tsx            # Individual event display
│   │   └── EventFilters.tsx         # Event filtering UI
│   ├── attractions/       # Attraction system components  
│   │   ├── AttractionsPage.tsx      # Full attractions page
│   │   └── AttractionFilters.tsx    # Attraction filtering UI
│   ├── dining/           # Dining/shopping components
│   ├── services/         # Community services components
│   └── ui/              # Reusable UI components
├── services/            
│   ├── calendar/         # Calendar integration service
│   │   ├── CalendarService.ts       # Main service class
│   │   ├── providers/               # Calendar provider implementations
│   │   └── types/                   # TypeScript interfaces
│   ├── google/          # Google APIs integration
│   └── search/          # Search functionality
├── hooks/               # Custom React hooks
├── styles/              # Design tokens and global styles
├── utils/               # Utility functions
└── App.tsx              # Root application component
```

### Key Files

#### `/src/components/generated/MainContentArea.tsx`
**Lines 89-167**: Attractions data array
**Lines 168-198**: Community services data array
- Contains all attraction and service information
- Modify these arrays to update content
- Each item has specific TypeScript interfaces

#### `/src/App.tsx`
**Lines 18-44**: Initial page detection based on URL
**Lines 54-78**: Browser back/forward navigation handling  
**Lines 91-117**: Manual navigation handling
- Central routing logic for single-page application
- Add new routes in all three locations

#### `/src/services/calendar/CalendarService.ts`
- Manages event data from multiple calendar sources
- Handles caching, deduplication, and error recovery
- Extensible provider system for adding new calendar sources

---

## Component System

### Generated Components
Components in `src/components/generated/` are the main application components:

#### MainContentArea.tsx
- **Purpose**: Home page content with events, attractions, services
- **Key Features**: 
  - Real-time event loading from calendar service
  - Search functionality with URL parameter support
  - Responsive grid layouts for different content types
- **Data Sources**: 
  - Events from CalendarService
  - Static attractions array (lines 89-167)  
  - Static services array (lines 168-198)

#### Navigation System
Custom navigation using browser History API:
```typescript
// In App.tsx - add new routes here
const handleNavigation = (href: string) => {
  window.scrollTo(0, 0);
  
  if (href.startsWith('/your-new-page')) {
    setCurrentPage('your-new-page');
    window.history.pushState({}, '', href);
  }
  // ... other routes
};
```

#### Header.tsx
- **Purpose**: Site navigation and branding
- **Features**: Responsive mobile menu, active page detection
- **Usage**: Automatically included on all pages

### Page Components

#### EventsPage.tsx
- **Purpose**: Full event calendar with search and filtering
- **Features**:
  - Real-time search across event titles, descriptions, locations
  - Category-based filtering with visual icons
  - Date range filtering (week, month, all)
  - URL parameter preservation for shareable searches
- **Dependencies**: CalendarService, EventFilters component

#### AttractionsPage.tsx  
- **Purpose**: Complete attraction directory
- **Features**:
  - Search across names, descriptions, addresses, categories
  - Category filtering with visual icons
  - Sorting by rating, name, or category
  - Click-through to external websites
- **Data Source**: Duplicated from MainContentArea (consider refactoring)

### UI Components
Reusable components in `src/components/ui/`:
- Follow Tailwind CSS conventions
- Use TypeScript interfaces for props
- Implement proper accessibility features

---

## API Integration

### Calendar Service Architecture

The calendar system supports multiple providers:

#### Supported Providers
1. **Google Calendar API**: Direct API integration
2. **iCalendar (.ics)**: Parse standard calendar files  
3. **RSS Feeds**: Parse RSS/XML event feeds
4. **Municipal APIs**: Custom town calendar integration

#### Service Configuration
```typescript
// In src/services/calendar/config.ts
export const DEFAULT_CALENDAR_CONFIG = {
  sources: [
    {
      type: 'ical',
      url: 'https://stoneham-ma.gov/calendar.ics',
      name: 'Town Calendar'
    },
    {
      type: 'google',
      calendarId: 'your-calendar-id',
      name: 'Community Events'  
    }
  ],
  cacheTimeout: 15 * 60 * 1000, // 15 minutes
  maxEvents: 1000
};
```

#### CORS Proxy
Vercel API route `/api/proxy.ts` handles CORS issues:
```typescript
// Allowed domains for calendar feeds
const ALLOWED_DOMAINS = [
  'stoneham-ma.gov',
  'calendar.google.com', 
  'googleapis.com'
];
```

### Google APIs Integration

#### Maps API (Optional)
Used in dining page for location services:
```typescript
const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
```

#### Calendar API
Direct integration for Google Calendar sources:
```typescript
// In calendar service provider
const response = await fetch(
  `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`
);
```

---

## Deployment

### Vercel Configuration

#### Project Settings
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 20.x

#### Environment Variables in Vercel
```bash
# Production environment variables
VITE_GOOGLE_MAPS_API_KEY=your_production_api_key

# Optional: Analytics tracking
VITE_GA_TRACKING_ID=your_google_analytics_id
```

#### Domain Configuration
- **Primary Domain**: explorestoneham.com
- **SSL**: Automatically provisioned by Vercel
- **CDN**: Global edge network for fast loading

### Automatic Deployment
- **Trigger**: Push to `main` branch
- **Build Time**: ~2-3 minutes
- **Rollback**: Available via Vercel dashboard
- **Preview**: All pull requests get preview URLs

### Build Process
```bash
# Local build (matches production)
npm run build

# Build outputs
dist/
├── index.html           # Main HTML file
├── assets/             # JS, CSS bundles with hashing
│   ├── index-[hash].js
│   └── index-[hash].css  
└── api/                # Vercel serverless functions
```

---

## Maintenance

### Regular Tasks

#### Weekly
- **Monitor Events**: Check that calendar integration is working
- **Review Analytics**: Check for search terms, popular pages
- **Update Dependencies**: `npm audit` and security updates

#### Monthly  
- **Performance Review**: Check Lighthouse scores, loading times
- **Content Audit**: Review attraction information for accuracy
- **Backup Check**: Ensure GitHub backups are current

#### Quarterly
- **Dependency Updates**: Major version upgrades
- **Security Review**: Update API keys, review access permissions
- **Documentation Update**: Keep guides current with code changes

### Monitoring

#### Error Tracking
Monitor browser console for errors:
- Event loading failures
- Navigation issues
- API timeout errors

#### Performance Metrics
Track key metrics:
- **Page Load Time**: Target <3 seconds
- **First Contentful Paint**: Target <1.5 seconds  
- **Lighthouse Score**: Target >90

#### User Experience
Monitor for:
- Mobile usability issues
- Search functionality problems
- External link failures

### Troubleshooting

#### Common Issues

**Events Not Loading**
```typescript
// Check calendar service in browser console
console.log('Calendar service status:', calendarService.status);

// Debug calendar sources
const events = await calendarService.consolidateEvents();
console.log('Loaded events:', events);
```

**Build Failures**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check

# Check for syntax errors  
npm run lint
```

**Performance Issues**
```typescript
// Check bundle size
npm run build
ls -la dist/assets/

// Analyze bundle
npm install -g webpack-bundle-analyzer
npx vite-bundle-analyzer dist
```

#### Debugging Tools
- **React Developer Tools**: Component inspection
- **Vite Dev Tools**: Build process debugging
- **Network Tab**: API call monitoring
- **Lighthouse**: Performance analysis

### Code Standards

#### TypeScript
- **Strict Mode**: Enabled in tsconfig.json
- **Interface Definitions**: Required for all props
- **Type Imports**: Use `import type` for type-only imports
- **Error Handling**: Proper try/catch blocks

#### React Patterns  
- **Functional Components**: Use hooks instead of classes
- **Custom Hooks**: Extract reusable logic
- **Prop Drilling**: Avoid excessive prop passing
- **State Management**: Local state preferred, context for global state

#### Styling
- **Tailwind Classes**: Use utility classes
- **Design Tokens**: Follow established color palette
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper ARIA labels, focus management

---

## Adding New Features

### New Pages
1. Create component in appropriate directory
2. Add route handling in `App.tsx` (3 locations)
3. Add navigation links in `Header.tsx`
4. Update TypeScript types if needed

### New Calendar Sources
1. Create provider in `src/services/calendar/providers/`
2. Implement `CalendarProvider` interface
3. Add to configuration in `config.ts`
4. Test with sample data

### New Content Types
1. Define TypeScript interface
2. Create data array (similar to attractions)
3. Build display component
4. Add search/filter functionality
5. Create dedicated page if needed

---

*This guide covers the technical aspects of the Explore Stoneham project. For content management, see the User Guide. For deployment procedures, see the Operations Guide.*

**Last Updated**: [Date]  
**Version**: 1.0  
**Next Review**: [Date + 6 months]