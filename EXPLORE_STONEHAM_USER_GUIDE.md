# Explore Stoneham - User Guide

**A comprehensive guide for community members managing the Explore Stoneham website**

## Table of Contents
1. [Project Overview](#project-overview)
2. [Quick Start for Common Tasks](#quick-start)
3. [Managing Content](#managing-content)
4. [Website Features](#website-features)
5. [Getting Help](#getting-help)
6. [Emergency Procedures](#emergency-procedures)

---

## Project Overview

Explore Stoneham is a modern, interactive website showcasing our community's attractions, events, dining options, and services. The site automatically updates with events from official town calendars and provides an easy way for residents to discover what's happening in Stoneham.

### Key Features
- **Automatic Event Updates**: Pulls events from town calendar feeds
- **Local Attractions Directory**: Showcases 9+ local attractions with ratings and links
- **Interactive Search**: Visitors can search events and attractions
- **Mobile-Friendly**: Works perfectly on phones, tablets, and computers
- **Fast Loading**: Modern technology ensures quick page loads

### Who Can Make Changes
- **Stoneham CAN Team Members**: Can update content and make design changes
- **Town Calendar Managers**: Events update automatically from official calendars
- **Community Members**: Can submit event information through established channels

---

## Quick Start

### Most Common Tasks

#### ✅ Adding a New Local Attraction
**Time Required: 5 minutes**
1. Open the project in your code editor
2. Navigate to `src/components/generated/MainContentArea.tsx`
3. Find the `attractions` array (around line 89)
4. Copy an existing attraction entry and modify:
   ```typescript
   {
     id: '10',
     name: 'New Attraction Name',
     category: 'Recreation', // Options: Family, Nature, Historic, Recreation, Arts
     rating: 4.5,
     image: 'placeholder', 
     description: 'Brief description of the attraction',
     address: 'Full address in Stoneham, MA',
     url: 'https://website.com' // Optional - removes if no website
   }
   ```
5. Save the file - changes go live automatically!

#### ✅ Updating Attraction Information
**Time Required: 2 minutes**
1. Find the attraction in the `attractions` array
2. Update the name, description, rating, or website URL
3. Save the file

#### ✅ Adding a New Community Service
**Time Required: 5 minutes**
1. Navigate to `src/components/generated/MainContentArea.tsx`
2. Find the `services` array (around line 168)
3. Add a new service entry:
   ```typescript
   {
     id: '5',
     name: 'Service Name',
     category: 'Community', // Options: Education, Recreation, Community, Municipal Services
     contact: '(781) 555-0123',
     email: 'contact@stoneham-ma.gov',
     description: 'Brief description of the service'
   }
   ```

### Making Changes Go Live
**The website updates automatically when you save changes!** No additional steps needed.

---

## Managing Content

### Events System
Events are automatically pulled from these sources:
- **Official Town Calendar**: Events from stoneham-ma.gov calendar
- **Google Calendar Integration**: Additional community calendars can be added
- **Manual Event Entry**: Can be added through the calendar service

#### Event Categories
The system automatically categorizes events using keywords:
- 🎵 **Music**: Concerts, performances, music events
- 🏛️ **Government**: Town meetings, public hearings, official events  
- 🏫 **Education**: School events, workshops, classes
- 👨‍👩‍👧‍👦 **Community**: Social events, festivals, community gatherings
- 🎨 **Arts**: Art shows, theater, cultural events
- ⚽ **Sports**: Athletic events, games, recreational sports
- 🎉 **Entertainment**: Fun events, celebrations, entertainment

### Attractions Management
Located in: `MainContentArea.tsx` lines 89-167

#### Current Attractions (9 total):
1. **Stone Zoo** - Family attraction with website link
2. **Spot Pond** - Nature/recreation area
3. **Town Common** - Historic town center
4. **Middlesex Fells Reservation** - Nature preserve
5. **Stoneham Unicorn Golf Course** - Recreation with website
6. **Stoneham Oaks Golf Course** - Recreation with website  
7. **Spot Pond Boathouse** - Recreation with website
8. **Hall Memorial Pool** - Recreation with website
9. **Greater Boston Stage Company** - Arts with website

#### Attraction Categories:
- **Family** 👨‍👩‍👧‍👦: Zoo, family-friendly venues
- **Nature** 🌲: Outdoor spaces, ponds, hiking areas
- **Historic** 🏛️: Historical sites and landmarks
- **Recreation** ⛳: Sports facilities, pools, golf courses
- **Arts** 🎭: Theater, cultural venues

### Community Services Management
Located in: `MainContentArea.tsx` lines 168-198

Services include contact information and can link to dedicated pages on the site.

---

## Website Features

### For Visitors
- **Event Search**: Search events by name, description, or date
- **Event Filtering**: Filter by category (Music, Community, Arts, etc.)
- **Attraction Browsing**: View all attractions with ratings and descriptions
- **Direct Links**: Click attractions to visit official websites
- **Mobile Responsive**: Works on all devices

### For Administrators
- **Automatic Updates**: Events sync from official calendars
- **Real-time Changes**: Content updates appear immediately
- **Search Analytics**: Track what visitors are searching for
- **Mobile Management**: Make updates from any device

### Navigation Structure
- **Homepage** (`/`): Overview with featured events, attractions, and services
- **Events Page** (`/events`): Full event calendar with search and filtering
- **Attractions Page** (`/attractions`): Complete attraction directory
- **Historic Walking Tour** (`/historic-walking-tour`): Interactive tour experience
- **Dining & Shopping** (`/dining`): Local business directory

---

## Getting Help

### For Non-Developers

#### Common Issues & Solutions

**❓ "I made a change but don't see it on the website"**
- Wait 2-3 minutes for automatic deployment
- Refresh your browser page (Ctrl+F5 or Cmd+Shift+R)
- Check the Vercel dashboard for deployment status

**❓ "I accidentally broke something"**
- Don't panic! All changes can be undone
- Contact a team member immediately
- We can revert to the previous version in under 5 minutes

**❓ "Events aren't showing up"**
- Events come from the town calendar automatically
- Check that events are properly added to the source calendar
- Contact the calendar administrator

**❓ "An attraction link is broken"**
- Find the attraction in `MainContentArea.tsx`
- Update the `url` field with the correct website
- Remove the `url` field entirely if no website exists

#### Emergency Contacts
- **Primary Technical Contact**: [Name] - [Email] - [Phone]
- **Backup Technical Contact**: [Name] - [Email] - [Phone]
- **Stoneham CAN Lead**: [Name] - [Email] - [Phone]

### Escalation Process
1. **Minor Issues**: Try the solutions above
2. **Content Problems**: Contact technical team member
3. **Site Down/Major Issues**: Contact primary technical contact immediately
4. **Emergency**: Use rollback procedure (see Emergency Procedures)

---

## Emergency Procedures

### If the Website Goes Down
1. **Don't make additional changes** - this can make it worse
2. **Contact technical team immediately**
3. **Document what changes were made** recently
4. **Access Vercel dashboard** to check deployment status

### Quick Rollback Procedure
If something goes wrong and you need to revert changes:

1. **Via Vercel Dashboard**:
   - Log into Vercel account
   - Find "explore-stoneham" project
   - Click "Deployments" tab
   - Find the last working deployment
   - Click "Promote to Production"

2. **Via GitHub**:
   - Contact technical team member
   - They can revert the commit and redeploy

### Prevention Tips
- **Test changes locally** when possible
- **Make one change at a time**
- **Save copies** of content before editing
- **Ask for help** if uncertain about a change

---

## Content Guidelines

### Writing Style
- **Clear and Friendly**: Write like you're talking to a neighbor
- **Concise**: Keep descriptions brief but informative
- **Accurate**: Double-check addresses, phone numbers, and websites
- **Consistent**: Use the same format for similar items

### Event Descriptions
- Include key details: date, time, location, cost
- Mention if registration is required
- Add contact information when relevant
- Use active, engaging language

### Attraction Descriptions
- Highlight what makes each attraction special
- Include practical information (parking, accessibility)
- Mention any costs or restrictions
- Keep descriptions under 100 words

### Image Guidelines
- Use high-quality photos when available
- Ensure proper permissions for any images
- Consider accessibility (alt text descriptions)
- Optimize for fast loading

---

## Advanced Features

### Search Functionality
The website includes powerful search features:
- **Event Search**: Searches titles, descriptions, locations, and dates
- **Attraction Search**: Searches names, descriptions, addresses, and categories
- **URL Parameters**: Search terms can be shared via links

### Calendar Integration
Events are automatically imported from:
- Municipal calendar feeds
- Google Calendar APIs  
- iCalendar (.ics) files
- RSS feeds

### Mobile Features
- Touch-friendly navigation
- Optimized text sizes
- Fast loading on cellular connections
- Offline capability for basic browsing

---

*This guide was created for the Explore Stoneham community project. For technical questions, contact the development team. For content questions, contact Stoneham CAN.*

**Last Updated**: [Date]  
**Version**: 1.0  
**Next Review**: [Date + 3 months]