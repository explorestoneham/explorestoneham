# Admin Dashboard for Explore Stoneham

## Executive Summary

This document outlines a comprehensive plan to build a GitHub-integrated admin dashboard for the Explore Stoneham website. The dashboard will enable non-developers to manage all hard-coded data arrays through a user-friendly web interface, with changes automatically committed to GitHub and deployed to the live site.

## Current Data Inventory

After analyzing the codebase, the following hard-coded data arrays have been identified for admin management:

### 1. Attractions Data
**Location**: `src/components/generated/MainContentArea.tsx` (lines 90-168) & `src/components/attractions/AttractionsPage.tsx`
**Structure**:
```typescript
interface Attraction {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  description: string;
  address: string;
  url?: string;
}
```
**Current Count**: 9 attractions (Stone Zoo, Spot Pond, golf courses, theaters, etc.)

### 2. Community Services & Groups
**Location**: `src/components/generated/MainContentArea.tsx` (lines 169-200)
**Structure**:
```typescript
interface Service {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  description: string;
  href?: string;
  clickable?: boolean;
  website?: string;
}
```
**Current Count**: 4 services (Library, Recreation Department, Senior Center, Recycling Center)

### 3. Calendar Sources Configuration
**Location**: `src/services/calendar/config.ts` (lines 5-46)
**Structure**:
```typescript
interface CalendarSource {
  id: string;
  name: string;
  type: 'manual' | 'icalendar' | 'rss';
  url: string;
  tag: string;
  defaultImageUrl: string;
  color: string;
  enabled: boolean;
}
```
**Current Count**: 4 sources (Manual events, Google Calendar, RSS feeds)

### 4. Event Categories
**Location**: `src/services/calendar/config.ts` (lines 55-122)
**Structure**:
```typescript
interface EventCategory {
  label: string;
  description: string;
  icon: string;
  priority: number;
}
```
**Current Count**: 11 categories (town, library, community, arts, etc.)

### 5. Historical Walking Tour Data
**Location**: `src/components/generated/HistoricalWalkingTourApp.tsx` (lines 24-87)
**Structure**:
```typescript
interface TourStop {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  subPages?: SubPage[];
}
```
**Current Count**: 7 tour stops with rich historical content and sub-pages

### 6. Navigation Structure
**Location**: `src/components/generated/Header.tsx` & `Footer.tsx`
**Structure**:
```typescript
interface NavigationItem {
  label: string;
  href: string;
  isExternal: boolean;
}
```
**Current Count**: 5 header items, 5 footer quick links

### 7. Mock Business Data (Dining & Shopping)
**Location**: `src/hooks/useGooglePlaces.ts` (lines 145-232)
**Structure**:
```typescript
interface Business {
  id: string;
  name: string;
  category: string;
  type: 'restaurant' | 'shop';
  rating: number;
  reviewCount: number;
  priceLevel: number;
  address: string;
  phone?: string;
  website?: string;
  hours: { [key: string]: string };
  description: string;
  features: string[];
  coordinates: { lat: number; lng: number };
  openNow?: boolean;
}
```
**Current Count**: 3 mock businesses (restaurants and shops)

## Implementation Plan

### Phase 1: Core Infrastructure (4-6 weeks)

#### 1.1 Data Abstraction Layer
- Extract all hard-coded arrays into JSON files in `src/data/` directory
- Create TypeScript interfaces in `src/types/admin.ts`
- Build data service layer (`src/services/DataService.ts`) to read from JSON files
- Update all components to use the data service instead of hard-coded arrays
- Ensure backward compatibility during transition

#### 1.2 Admin Application Structure
- Add `/admin` route to main `App.tsx`
- Create admin layout component with navigation sidebar
- Implement authentication (GitHub OAuth or password protection)
- Set up admin-specific styling and components

#### 1.3 GitHub Integration Foundation
- Create Vercel API endpoints in `/api/github/` for:
  - Reading repository files
  - Creating commits and pull requests
  - Managing branches
- Set up environment variables for GitHub token
- Implement secure authentication for GitHub operations

### Phase 2: Admin Interface Development (6-8 weeks)

#### 2.1 Dashboard Overview
- Summary cards showing count of each data type
- Recent changes log with commit history
- Quick action buttons for common tasks
- System status indicators (GitHub connection, deployment status)

#### 2.2 Data Management Interfaces

**Attractions Manager**
- Grid/list view of all attractions
- Add/edit forms with image upload capability
- Category management with predefined options
- Rating slider and address validation
- Bulk operations (import/export, delete multiple)

**Services Manager**
- Contact information forms with validation
- Website URL validation and testing
- Category assignment and filtering
- Email format validation

**Events Manager**
- Manual event creation with rich text editor
- Calendar source management (add/edit RSS feeds, iCal URLs)
- Event category assignment
- Date/time pickers with timezone support

**Tour Manager**
- Rich text editor for tour stop content
- Image upload and management for historical photos
- Sub-page creation and organization
- Tour stop ordering with drag-and-drop

**Business Manager**
- Restaurant/shop data entry forms
- Operating hours management interface
- Feature tags with predefined options
- Coordinate picker or address-to-coordinates conversion

**Navigation Manager**
- Drag-and-drop menu ordering
- Internal/external link management
- Menu item visibility controls

#### 2.3 Form Components & UI Elements
- Rich text editor with image embedding
- Multi-file image upload with preview
- Dynamic dropdown components
- Form validation with error messaging
- Auto-save functionality
- Mobile-responsive design

### Phase 3: GitHub Integration & Workflow (3-4 weeks)

#### 3.1 Automated Commit System
- Generate descriptive commit messages based on changes
- Create feature branches for major updates
- Pull request creation for review workflow
- Automatic deployment triggers via GitHub Actions

#### 3.2 Version Control Features
- Git history viewer for each data file
- Rollback functionality with confirmation dialogs
- Change preview before committing
- Conflict resolution interface
- Branch management for multiple administrators

#### 3.3 Data Validation & Integrity
- Schema validation before commits
- Duplicate detection and prevention
- Required field enforcement
- Data format consistency checks

### Phase 4: Advanced Features (4-5 weeks)

#### 4.1 Content Management Tools
- CSV/JSON import/export functionality
- Data cleanup and normalization tools
- Backup and restore capabilities
- Migration tools for data structure changes

#### 4.2 User Experience Enhancements
- Real-time preview of changes
- Undo/redo functionality with history
- Collaborative editing with conflict resolution
- Mobile admin interface
- Keyboard shortcuts for power users

#### 4.3 Analytics & Monitoring
- Admin action logging and audit trail
- Content engagement metrics
- API usage monitoring
- Error tracking and alerting
- Performance metrics for admin operations

## Technical Architecture

### Frontend Components
- **Framework**: React with TypeScript
- **Routing**: React Router for admin sections
- **Forms**: React Hook Form with validation
- **Rich Text**: Draft.js or similar WYSIWYG editor
- **UI Library**: Extend current Tailwind CSS setup
- **File Upload**: Drag-and-drop with progress indicators

### Backend Services
- **API Layer**: Vercel serverless functions
- **GitHub Integration**: Octokit.js for GitHub API
- **Authentication**: NextAuth.js or custom JWT implementation
- **File Processing**: Image optimization and validation
- **Data Validation**: Zod schemas for type safety

### Data Storage Strategy
- **Primary Storage**: JSON files in Git repository
- **Caching**: In-memory caching for frequently accessed data
- **Backup**: Automated backups to external storage
- **Version Control**: Full Git history for all changes

### Security Considerations
- **Authentication**: Secure admin access with role-based permissions
- **API Security**: Rate limiting and input validation
- **GitHub Access**: Scoped tokens with minimal permissions
- **Data Validation**: Server-side validation for all inputs
- **Audit Trail**: Complete logging of all admin actions

## Development Timeline

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1 | 4-6 weeks | Data abstraction, admin routing, GitHub integration |
| Phase 2 | 6-8 weeks | Complete admin interface for all data types |
| Phase 3 | 3-4 weeks | GitHub workflow automation and version control |
| Phase 4 | 4-5 weeks | Advanced features and analytics |
| **Total** | **17-23 weeks** | **Fully functional admin dashboard** |

## Benefits & Value Proposition

### For Content Managers
- **No Technical Barrier**: Simple web interface for all content updates
- **Real-time Changes**: Immediate deployment of approved changes
- **Version Control**: Full history and rollback capabilities
- **Collaboration**: Multiple administrators with conflict resolution

### For Developers
- **Reduced Maintenance**: No more manual content updates
- **Type Safety**: Maintained through generated TypeScript interfaces
- **Code Quality**: Separation of content from code
- **Scalability**: Easy to add new content types

### For the Organization
- **Content Freshness**: Easy updates encourage regular content maintenance
- **Reduced Costs**: Less developer time needed for content changes
- **Audit Compliance**: Complete change history and attribution
- **Disaster Recovery**: Built-in backup and restore capabilities

## Resource Requirements

### Development Team
- **1 Senior Full-stack Developer** (React, Node.js, GitHub API)
- **1 UI/UX Designer** (Admin interface design)
- **1 DevOps Engineer** (Deployment automation, security)

### Infrastructure
- **Current Vercel Hosting**: Sufficient for admin functions
- **GitHub API**: Standard rate limits should be adequate
- **Storage**: Minimal additional storage needs
- **CDN**: For admin interface assets

### Ongoing Maintenance
- **Monthly**: Security updates and dependency management
- **Quarterly**: Feature updates and user feedback incorporation
- **Annually**: Major version updates and performance optimization

## Risk Mitigation

### Technical Risks
- **GitHub API Limits**: Implement caching and rate limiting
- **Data Corruption**: Multiple validation layers and atomic commits
- **Authentication Issues**: Fallback authentication methods
- **Performance**: Lazy loading and optimized queries

### Operational Risks
- **User Training**: Comprehensive documentation and tutorials
- **Change Management**: Staged rollouts and rollback procedures
- **Data Loss**: Multiple backup strategies and recovery procedures

## Future Enhancements

### Potential Extensions
- **Multi-site Management**: Manage multiple community websites
- **Content Scheduling**: Schedule content updates for specific times
- **Workflow Approval**: Multi-step approval process for sensitive content
- **API Integration**: Connect to external data sources
- **Mobile App**: Native mobile app for content management
- **AI Assistance**: Content suggestions and optimization

### Integration Opportunities
- **Google Analytics**: Content performance tracking
- **Social Media**: Auto-posting of new events and content
- **Email Marketing**: Newsletter generation from events data
- **CMS Migration**: Future migration to headless CMS if needed

## Conclusion

The admin dashboard represents a significant upgrade to the content management capabilities of the Explore Stoneham website. By maintaining the current static architecture while adding dynamic content management, the solution provides the best of both worlds: performance and maintainability for developers, ease of use for content managers.

The phased approach allows for incremental delivery of value, with each phase building upon the previous one. The GitHub integration ensures that all changes are version controlled and auditable, while the user-friendly interface removes technical barriers for content updates.

This investment in administrative tooling will pay dividends in reduced maintenance costs, improved content freshness, and enhanced community engagement through more dynamic and up-to-date information.