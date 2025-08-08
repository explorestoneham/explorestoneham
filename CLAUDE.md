# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MagicPath is a React-based component library and application system for the "Explore Stoneham" community website. The project generates multiple applications from shared components and maintains a comprehensive design system for Stoneham, Massachusetts civic content.

## Architecture

The project uses a modern React + TypeScript + Vite stack with:

- **React 18.3.1** with TypeScript for type safety
- **Vite 6.2.0** for build tooling and development server
- **Tailwind CSS 4.0.9** with custom design tokens for styling
- **Component generation system** for creating reusable UI elements
- **Multi-application routing** supporting different page types
- **Calendar service integration** for event management
- **Three.js integration** for 3D elements (via @react-three/fiber)

### Key Directories

- `src/components/generated/` - Auto-generated components (main app components)
- `src/components/events/` - Event-specific functionality with calendar integration
- `src/components/ui/` - Reusable UI components
- `src/services/calendar/` - Calendar service with Google Calendar, iCal, and RSS support
- `src/services/search/` - Event search functionality
- `src/styles/` - Design token definitions
- `api/` - Vercel serverless functions (CORS proxy for calendar feeds)
- `HistoricWalkingTour/` - Separate sub-application for historic tour

## Development Commands

```bash
# Development
npm run dev           # Start development server on localhost:5173
yarn dev              # Alternative with yarn

# Build and Deploy
npm run build         # TypeScript compilation + Vite build
npm run preview       # Preview production build locally

# Code Quality
npm run lint          # ESLint with TypeScript rules
npm run format        # Prettier code formatting
npm run format:check  # Check formatting without changes

# Testing
# No test framework currently configured
```

## Key Features

### Multi-Application System
The main App.tsx serves different applications based on routing:
- `/` - Main Explore Stoneham application
- `/style-guide` - Component style guide and design system
- `/historic-walking-tour` - Historical walking tour with 3D elements
- `/events` - Calendar events with filtering and search

### Calendar Integration
Comprehensive calendar service supporting:
- Google Calendar API integration
- iCalendar (.ics) feed parsing
- RSS feed processing for events
- Automatic event deduplication and tagging
- CORS proxy via Vercel API routes (`/api/proxy.ts`)

### Design System
- Custom Tailwind configuration with Stoneham brand colors
- Design tokens in `src/styles/design-tokens.css`
- Comprehensive style guide with seasonal variations
- Component classes for buttons, cards, typography

### Navigation Handling
Custom navigation system using `window.history` API:
- Client-side routing without React Router
- Browser back/forward support
- Global navigation handler attached to window object

## Build Configuration

### Vite Configuration
- Path alias: `@/` maps to `./src/`
- React plugin with fast refresh
- Tailwind CSS integration via @tailwindcss/vite

### TypeScript Configuration
- Strict type checking enabled
- Path mapping for `@/*` imports
- Separate configs for app and Node.js code

### Deployment
- Vercel deployment configured
- Build output: `dist/` directory
- Framework detection: Vite
- API routes deployed as serverless functions

## Component Development

### Generated Components
Components in `src/components/generated/` are auto-generated and should be treated carefully. These include:
- `ExploreStonehamApp.tsx` - Main application shell
- `Header.tsx`, `Footer.tsx` - Layout components
- `HeroSection.tsx`, `MainContentArea.tsx` - Content sections
- Tour-related components for historic walking tour

### Custom Components
- Use the established design system and Tailwind classes
- Follow the component patterns in existing UI components
- Implement responsive design with mobile-first approach

### Styling Guidelines
- Use design tokens from `tailwind.config.js`
- Follow the brand color palette (Stoneham Green, Lakeside Blue, Beacon Gold)
- Implement proper focus states and accessibility features
- Use semantic HTML and ARIA labels where appropriate

## Calendar Service Usage

The calendar service is designed for easy integration:

```typescript
import { useCalendarEvents } from '@/hooks/useCalendarEvents';

// In a component
const { events, loading, error } = useCalendarEvents({
  googleApiKey: 'your-api-key'
});
```

Refer to `src/services/calendar/README.md` for comprehensive documentation.

## Development Notes

- ESLint configured with React hooks and TypeScript rules
- Prettier for code formatting with specific configuration
- No test framework currently set up
- @typescript-eslint/no-unused-vars rule disabled to allow development flexibility
- 3D components use @react-three/fiber and @react-three/drei
- Some components include drag-and-drop functionality via @dnd-kit

## API Integration

### CORS Proxy
The `/api/proxy.ts` endpoint handles CORS issues for calendar feeds:
- Validates allowed domains (stoneham-ma.gov, calendar.google.com, googleapis.com)
- 10-second timeout for external requests
- Proper error handling and response formatting

### Environment Considerations
- Google API key required for calendar functionality
- Production deployment uses Vercel's serverless functions
- CORS headers configured for cross-origin requests

## Design System Integration

The project includes a comprehensive design system:
- Consistent color palette with semantic naming
- Typography scale with proper line heights
- Component library with standardized interactions
- Accessibility features built into components
- Seasonal variations for different times of year

Refer to `STYLE_GUIDE.md` and `COMPONENT_LIBRARY.md` for detailed design documentation.