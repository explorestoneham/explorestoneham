# Explore Stoneham - Content Management Guide

**Detailed guide for updating content, managing events, and maintaining accurate information**

## Table of Contents
1. [Content Overview](#content-overview)
2. [Updating Attractions](#updating-attractions)
3. [Managing Events](#managing-events)
4. [Community Services](#community-services)
5. [Content Guidelines](#content-guidelines)
6. [Quality Assurance](#quality-assurance)

---

## Content Overview

### What Content Can Be Updated
✅ **Easy to Update** (5 minutes or less):
- Attraction names, descriptions, ratings, websites
- Community service contact information
- Service descriptions and categories

✅ **Moderate Updates** (10-15 minutes):
- Adding new attractions or services
- Updating existing content with new information
- Changing categories or organization

⚠️ **Advanced Updates** (requires developer):
- Adding new content types
- Changing website structure
- Modifying search/filter functionality

❌ **Automatic Updates** (no action needed):
- Events from town calendar feeds
- Calendar integration
- Event categorization and tagging

---

## Updating Attractions

### Current Attractions List
**File Location**: `src/components/generated/MainContentArea.tsx` (lines 89-167)

#### All 9 Current Attractions:

1. **Stone Zoo** (Family) - 4.5★
   - `149 Pond St, Stoneham, MA`
   - Website: https://www.zoonewengland.org/stone-zoo/

2. **Spot Pond** (Nature) - 4.8★
   - `Woodland Rd, Stoneham, MA`

3. **Town Common** (Historic) - 4.3★
   - `Main St, Stoneham, MA`

4. **Middlesex Fells Reservation** (Nature) - 4.7★
   - `Stoneham, MA`

5. **Stoneham Unicorn Golf Course** (Recreation) - 4.2★
   - Website: https://www.unicorngc.com

6. **Stoneham Oaks Golf Course** (Recreation) - 4.4★
   - Website: https://www.stonehamoaks.com

7. **Spot Pond Boathouse** (Recreation) - 4.5★
   - Website: https://boatinginboston.com/boathouses/spot-pond/

8. **Hall Memorial Pool** (Recreation) - 4.3★
   - Website: https://bgcstoneham.org/hall-memorial-pool/

9. **Greater Boston Stage Company** (Arts) - 4.6★
   - Website: https://www.greaterbostonstage.org/

### How to Update Attraction Information

#### Step 1: Open the File
Navigate to: `src/components/generated/MainContentArea.tsx`

#### Step 2: Find the Attractions Array
Look for this section around line 89:
```typescript
const attractions: Attraction[] = [{
```

#### Step 3: Update Information
Each attraction follows this format:
```typescript
{
  id: '1',                    // Keep existing ID
  name: 'Stone Zoo',          // UPDATE: Attraction name
  category: 'Family',         // UPDATE: Family, Nature, Historic, Recreation, Arts
  rating: 4.5,               // UPDATE: Rating out of 5.0
  image: 'zoo',              // KEEP: Used for internal reference
  description: 'Home to over 100 species of animals',  // UPDATE: Brief description
  address: '149 Pond St, Stoneham, MA',               // UPDATE: Full address
  url: 'https://www.zoonewengland.org/stone-zoo/'     // OPTIONAL: Website URL
}
```

#### Step 4: Common Updates

**Updating a Website URL**:
```typescript
// Find the attraction and update the url field
url: 'https://www.newwebsite.com'

// To remove a website URL:
// Delete the entire url line
```

**Updating Description**:
```typescript
// Keep descriptions under 100 words, focus on key features
description: 'Beautiful reservoir perfect for walking and fishing with scenic trails'
```

**Updating Rating**:
```typescript
// Use ratings from 3.5 to 5.0, increments of 0.1
rating: 4.3
```

**Changing Category**:
```typescript
// Available categories:
category: 'Family'      // Zoo, family-friendly venues
category: 'Nature'      // Outdoor spaces, ponds, hiking
category: 'Historic'    // Historical sites and landmarks  
category: 'Recreation'  // Sports facilities, pools, golf
category: 'Arts'        // Theater, cultural venues
```

### Adding New Attractions

#### Step 1: Choose the Next Available ID
Look at the last attraction in the array and use the next number:
```typescript
// If last attraction has id: '9', use id: '10'
id: '10'
```

#### Step 2: Add New Entry
Add a comma after the last attraction, then add:
```typescript
}, {  // Don't forget this comma and opening brace
  id: '10',
  name: 'New Attraction Name',
  category: 'Recreation',
  rating: 4.5,
  image: 'placeholder',
  description: 'Brief description of what makes this attraction special',
  address: 'Full Street Address, Stoneham, MA',
  url: 'https://website.com'  // Optional - remove if no website
}]   // Don't forget the closing brace and bracket
```

#### Step 3: Verify Syntax
Make sure you have:
- Comma after previous attraction
- All required fields filled in
- Proper quotes around strings
- No extra commas at the end

### Removing Attractions

#### Option 1: Complete Removal
Delete the entire attraction object including commas.

#### Option 2: Mark as Inactive (Recommended)
Add a comment and keep for reference:
```typescript
// INACTIVE: Attraction closed as of [date]
// {
//   id: '5',
//   name: 'Closed Attraction',
//   ...
// },
```

---

## Managing Events

### How Events Work
**Events are automatically imported** from these sources:
- Official Stoneham town calendar
- Google Calendar feeds (if configured)
- iCalendar (.ics) files
- RSS feeds

### Event Categories
Events are automatically categorized by keywords in their titles/descriptions:

- 🎵 **Music**: concert, music, band, performance, singing
- 🏛️ **Government**: meeting, town hall, board, committee, municipal
- 🏫 **Education**: school, workshop, class, learning, training
- 👨‍👩‍👧‍👦 **Community**: community, social, festival, celebration, family
- 🎨 **Arts**: art, theater, gallery, cultural, exhibition
- ⚽ **Sports**: game, sports, athletic, tournament, league
- 🎉 **Entertainment**: fun, entertainment, show, party, event

### What You CAN Control

#### Event Sources
**To add a new calendar source**, contact the technical team with:
- Calendar name and purpose
- URL of the calendar feed (.ics format preferred)
- Contact person responsible for that calendar

#### Event Display
Events automatically show:
- Title, date, time, location
- Description (first 200 characters)
- Category tags
- Link to original event (when available)

### What You CANNOT Control
- Individual event editing (events come from source calendars)
- Event approval/rejection (managed at calendar source)
- Historical events (only upcoming events show)
- Event ordering (sorted by date automatically)

### Troubleshooting Events

#### Events Not Showing
1. **Check source calendar** - Are events properly added there?
2. **Wait for sync** - Updates can take up to 15 minutes
3. **Clear browser cache** - Force refresh with Ctrl+F5
4. **Contact technical team** if issues persist

#### Wrong Event Information
1. **Update at source** - Fix information in the original calendar
2. **Wait for sync** - Changes will appear within 15 minutes
3. **Cannot edit directly** - All edits must happen at calendar source

#### Duplicate Events
- System automatically removes most duplicates
- Contact technical team if duplicates persist

---

## Community Services

### Current Services List
**File Location**: `src/components/generated/MainContentArea.tsx` (lines 168-198)

#### All 4 Current Services:

1. **Stoneham Public Library** (Education)
   - Phone: (781) 438-1324
   - Email: info@stonehamlibrary.org

2. **Recreation Department** (Recreation)  
   - Phone: (781) 279-2600
   - Email: recreation@stoneham-ma.gov

3. **Senior Center** (Community)
   - Phone: (781) 438-1324
   - Email: seniors@stoneham-ma.gov

4. **Stevens Street Recycling Center** (Municipal Services)
   - Phone: (781) 438-0760
   - Email: dpw@stoneham-ma.gov
   - Has dedicated page: `/recycling-center`

### Updating Service Information

#### Step 1: Locate Services Array
In `MainContentArea.tsx`, find this section around line 168:
```typescript
const services: Service[] = [{
```

#### Step 2: Update Service Data
Each service follows this format:
```typescript
{
  id: '1',                              // Keep existing ID  
  name: 'Stoneham Public Library',      // UPDATE: Official service name
  category: 'Education',                // UPDATE: Category (see list below)
  contact: '(781) 438-1324',           // UPDATE: Primary phone number
  email: 'info@stonehamlibrary.org',   // UPDATE: Contact email
  description: 'Community library with extensive resources and programs',  // UPDATE: Brief description
  href: '/library',                     // OPTIONAL: Link to dedicated page
  clickable: true                       // OPTIONAL: Makes service clickable
}
```

#### Step 3: Service Categories
Available categories:
- **Education**: Library, schools, learning programs
- **Recreation**: Sports, activities, programs  
- **Community**: Social services, senior center
- **Municipal Services**: Government services, utilities

#### Step 4: Adding Clickable Services
To make a service link to a dedicated page:
```typescript
{
  // ... other fields
  href: '/service-page-url',
  clickable: true
}
```

### Adding New Services

#### Follow This Template:
```typescript
{
  id: '5',                              // Next available number
  name: 'New Service Name',
  category: 'Community',                // Choose appropriate category
  contact: '(781) 555-0123',           // 10-digit phone with area code
  email: 'contact@stoneham-ma.gov',     // Official email address
  description: 'Brief description of service and what they provide'
}
```

### Service Information Best Practices

#### Phone Numbers
- Use format: `(781) 555-0123`
- Always include area code
- Use main contact number, not extensions

#### Email Addresses
- Use official organizational email
- Avoid personal email addresses
- Prefer generic addresses (info@, contact@)

#### Descriptions
- Keep under 150 characters
- Focus on what service they provide
- Use active, helpful language

---

## Content Guidelines

### Writing Style

#### Voice and Tone
- **Friendly and Welcoming**: Write like a helpful neighbor
- **Clear and Direct**: Avoid jargon or complex terms
- **Community-Focused**: Emphasize local connections
- **Accurate and Trustworthy**: Double-check all facts

#### Writing Standards

**Attraction Descriptions**:
```
✅ Good: "Beautiful reservoir perfect for walking and fishing with scenic trails"
❌ Avoid: "Spot Pond is a body of water that exists in Stoneham where people go"
```

**Service Descriptions**:
```
✅ Good: "Youth and adult programs, sports leagues, and activities"  
❌ Avoid: "The department that handles recreational stuff"
```

### Information Accuracy

#### Required Information
- **Addresses**: Full street address with "Stoneham, MA"
- **Phone Numbers**: Current and verified
- **Websites**: Test all links before adding
- **Ratings**: Based on actual reviews/feedback

#### Information to Verify Monthly
- [ ] All phone numbers work
- [ ] All website URLs load correctly
- [ ] Contact emails are still valid
- [ ] Service descriptions are current
- [ ] Attraction information is accurate

### Consistency Standards

#### Address Format
```
✅ Correct: "149 Pond St, Stoneham, MA"
✅ Correct: "Main St, Stoneham, MA" (for general areas)
❌ Incorrect: "149 Pond Street, Stoneham, Massachusetts"
```

#### Phone Format
```
✅ Correct: "(781) 438-1324"
❌ Incorrect: "781-438-1324"
❌ Incorrect: "781.438.1324"
```

#### Website URLs
```
✅ Correct: "https://www.zoonewengland.org/stone-zoo/"
❌ Incorrect: "www.zoonewengland.org" (missing https://)
```

---

## Quality Assurance

### Before Making Changes

#### Pre-Update Checklist
- [ ] **Backup**: Note what you're changing in case you need to revert
- [ ] **Verify Information**: Confirm all details are accurate and current
- [ ] **Test URLs**: Check that all website links work
- [ ] **Check Spelling**: Review all text for typos
- [ ] **Follow Format**: Match the existing style and structure

#### Testing After Changes

#### Local Testing (If Possible)
```bash
# Start development server
npm run dev

# Check your changes at localhost:5173
# Test on both desktop and mobile views
```

#### Post-Deploy Verification
After changes go live (2-3 minutes after saving):
- [ ] Visit explorestoneham.com
- [ ] Check that changes appear correctly
- [ ] Test any new links or phone numbers
- [ ] Verify mobile display looks good
- [ ] Test search functionality with new content

### Content Review Process

#### Self-Review Checklist
- [ ] All information is accurate
- [ ] Spelling and grammar are correct
- [ ] Links work and open correctly
- [ ] Phone numbers are properly formatted
- [ ] Addresses are complete and correct
- [ ] Descriptions are helpful and concise

#### Team Review (For Major Changes)
For significant updates:
1. Document what you're changing and why
2. Have another team member review
3. Test together before making live
4. Plan rollback if something goes wrong

### Common Mistakes to Avoid

#### Technical Errors
```typescript
❌ Missing comma: Will break the entire site
{
  name: 'Attraction 1'
  category: 'Nature'  // Missing comma here!
}

✅ Proper syntax:
{
  name: 'Attraction 1',
  category: 'Nature'
}
```

#### Content Errors
- **Broken URLs**: Always test links before adding
- **Outdated Information**: Verify hours, contact info, etc.
- **Inconsistent Formatting**: Follow established patterns
- **Too Much Information**: Keep descriptions concise

#### Process Errors
- Making multiple unrelated changes at once
- Not testing changes before going live
- Forgetting to document what was changed
- Making changes without backup plan

---

## Maintenance Schedule

### Weekly Tasks
- [ ] Check that events are loading properly
- [ ] Verify no broken links in attractions
- [ ] Review any user feedback about content

### Monthly Tasks  
- [ ] Call all service phone numbers to verify they work
- [ ] Test all attraction website URLs
- [ ] Review attraction ratings and update if needed
- [ ] Check for new attractions or services to add

### Quarterly Tasks
- [ ] Full content audit of all information
- [ ] Update any changed contact information
- [ ] Review and refresh attraction descriptions
- [ ] Check for services that may have closed or changed

### Annual Tasks
- [ ] Complete review of all content
- [ ] Update any significantly changed information
- [ ] Plan content improvements based on user feedback
- [ ] Archive any closed attractions or services

---

## Getting Help

### For Content Questions
- **What to include**: Ask team members familiar with Stoneham
- **Accuracy verification**: Contact services directly
- **Writing help**: Review existing content for style examples

### For Technical Issues
- **Syntax errors**: Contact developer team member
- **Site not updating**: Check with technical lead
- **Advanced features**: Developer consultation needed

### Resources
- **Style examples**: Look at existing attractions/services
- **Technical patterns**: Follow existing code structure
- **Community feedback**: Monitor social media and direct feedback

---

*This guide covers all aspects of content management for the Explore Stoneham website. Follow these procedures to ensure accurate, helpful, and up-to-date information for community members.*

**Last Updated**: [Date]  
**Version**: 1.0  
**Next Review**: [Date + 3 months]