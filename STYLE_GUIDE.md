# Explore Stoneham Style Guide

## 🎯 Brand Overview

**Explore Stoneham** is a civic-minded, welcoming, and informative platform designed to:
- Celebrate the local culture, events, and history of Stoneham, MA
- Connect current residents with services, recreation, and civic involvement
- Promote community pride and involvement

**Brand Personality:** Approachable, local-first, trustworthy, active, family-friendly, a little historic and a little modern.

**Brand Values:** Community engagement, accessibility, authenticity, transparency, and pride in place.

---

## 🎨 Color Palette

### Primary Colors

| Color | Name | HEX | Usage |
|-------|------|-----|-------|
| ![#2A6F4D](https://via.placeholder.com/15/2A6F4D/000000?text=+) | Stoneham Green | `#2A6F4D` | Primary brand color, headers, navigation, CTAs |
| ![#007B9E](https://via.placeholder.com/15/007B9E/000000?text=+) | Lakeside Blue | `#007B9E` | Secondary actions, links, interactive elements |
| ![#F4A300](https://via.placeholder.com/15/F4A300/000000?text=+) | Beacon Gold | `#F4A300` | Call-to-action buttons, highlights, alerts |

### Secondary Colors

| Color | Name | HEX | Usage |
|-------|------|-----|-------|
| ![#D95D39](https://via.placeholder.com/15/D95D39/000000?text=+) | Autumn Brick | `#D95D39` | Accent elements, seasonal content, warm highlights |
| ![#93C47D](https://via.placeholder.com/15/93C47D/000000?text=+) | Community Sage | `#93C47D` | Success states, nature-related content, soft accents |
| ![#D2E5F1](https://via.placeholder.com/15/D2E5F1/000000?text=+) | Sky Tint | `#D2E5F1` | Backgrounds, cards, subtle highlights |

### Neutral Colors

| Color | Name | HEX | Usage |
|-------|------|-----|-------|
| ![#F7F7F7](https://via.placeholder.com/15/F7F7F7/000000?text=+) | Birch White | `#F7F7F7` | Page backgrounds, card backgrounds |
| ![#404040](https://via.placeholder.com/15/404040/000000?text=+) | Granite Gray | `#404040` | Body text, secondary text, borders |

---

## 📝 Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale

| Element | Size | Weight | Color | Usage |
|---------|------|--------|-------|-------|
| H1 | 2.5rem (40px) | 700 | `#2A6F4D` | Main page titles |
| H2 | 2rem (32px) | 600 | `#2A6F4D` | Section headers |
| H3 | 1.5rem (24px) | 600 | `#007B9E` | Subsection headers |
| H4 | 1.25rem (20px) | 600 | `#404040` | Card titles |
| Body | 1rem (16px) | 400 | `#404040` | Main content |
| Small | 0.875rem (14px) | 400 | `#404040` | Captions, metadata |
| Button | 1rem (16px) | 600 | - | Button text |

### Line Heights
- Headers: 1.2
- Body text: 1.6
- Buttons: 1.4

---

## 🧩 Component Guidelines

### Buttons

#### Primary Button
```css
background-color: #F4A300;
color: #404040;
border: none;
border-radius: 8px;
padding: 12px 24px;
font-weight: 600;
font-size: 16px;
```

#### Secondary Button
```css
background-color: transparent;
color: #007B9E;
border: 2px solid #007B9E;
border-radius: 8px;
padding: 10px 22px;
font-weight: 600;
font-size: 16px;
```

#### Ghost Button
```css
background-color: transparent;
color: #404040;
border: 1px solid #404040;
border-radius: 8px;
padding: 10px 22px;
font-weight: 400;
font-size: 16px;
```

### Cards

#### Standard Card
```css
background-color: #F7F7F7;
border: 1px solid #D2E5F1;
border-radius: 12px;
padding: 24px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
```

#### Featured Card
```css
background-color: #D2E5F1;
border: 2px solid #007B9E;
border-radius: 12px;
padding: 24px;
box-shadow: 0 4px 12px rgba(0, 123, 158, 0.15);
```

### Navigation

#### Header Navigation
```css
background-color: #F7F7F7;
border-bottom: 2px solid #2A6F4D;
color: #404040;
```

#### Active Navigation Item
```css
color: #2A6F4D;
border-bottom: 2px solid #2A6F4D;
font-weight: 600;
```

---

## 📱 Layout & Spacing

### Grid System
- **Container Max Width:** 1200px
- **Gutter:** 24px
- **Breakpoints:**
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+

### Spacing Scale
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

### Section Padding
- **Mobile:** 24px top/bottom, 16px left/right
- **Tablet:** 32px top/bottom, 24px left/right
- **Desktop:** 48px top/bottom, 32px left/right

---

## 🎯 Interactive States

### Hover States
- **Primary Button:** `#E59400` (darker gold)
- **Secondary Button:** `#006B8A` (darker blue)
- **Links:** `#2A6F4D` (Stoneham Green)
- **Cards:** Subtle shadow increase

### Focus States
```css
outline: 2px solid #F4A300;
outline-offset: 2px;
```

### Active States
- **Buttons:** Slightly darker than hover
- **Navigation:** `#2A6F4D` with underline

---

## 📊 Data Visualization

### Charts & Graphs
- **Primary:** `#2A6F4D` (Stoneham Green)
- **Secondary:** `#007B9E` (Lakeside Blue)
- **Accent:** `#F4A300` (Beacon Gold)
- **Success:** `#93C47D` (Community Sage)
- **Warning:** `#D95D39` (Autumn Brick)

### Progress Indicators
- **Background:** `#D2E5F1` (Sky Tint)
- **Progress:** `#2A6F4D` (Stoneham Green)
- **Success:** `#93C47D` (Community Sage)

---

## 🖼️ Imagery Guidelines

### Photography Style
- **Natural lighting** with warm undertones
- **Community-focused** scenes
- **Local landmarks** and nature
- **Authentic, candid** moments
- **High contrast** for readability

### Image Specifications
- **Hero Images:** 1920x1080px (16:9 ratio)
- **Card Images:** 400x300px (4:3 ratio)
- **Thumbnail Images:** 200x200px (1:1 ratio)
- **Format:** WebP with JPEG fallback

### Icon Style
- **Line-based** icons with 2px stroke
- **Rounded corners** for friendliness
- **Consistent weight** across set
- **Color:** `#404040` for neutral, brand colors for emphasis

---

## 📱 Responsive Design

### Mobile-First Approach
1. **Mobile** (320px - 767px)
   - Single column layout
   - Stacked navigation
   - Larger touch targets (44px minimum)
   - Simplified content hierarchy

2. **Tablet** (768px - 1023px)
   - Two-column layouts where appropriate
   - Horizontal navigation
   - Medium-sized touch targets

3. **Desktop** (1024px+)
   - Multi-column layouts
   - Hover states
   - Detailed interactions

### Touch Targets
- **Minimum size:** 44px × 44px
- **Spacing between:** 8px minimum
- **Button padding:** 12px minimum

---

## ♿ Accessibility

### Color Contrast
- **Text on background:** 4.5:1 minimum ratio
- **Large text:** 3:1 minimum ratio
- **Interactive elements:** 3:1 minimum ratio

### Focus Indicators
- **Visible focus** on all interactive elements
- **High contrast** focus rings
- **Keyboard navigation** support

### Screen Reader Support
- **Semantic HTML** structure
- **Alt text** for all images
- **ARIA labels** where needed
- **Skip navigation** links

---

## 🎨 Seasonal Variations

### Fall (September - November)
- **Primary accent:** `#D95D39` (Autumn Brick)
- **Backgrounds:** Warmer tones
- **Imagery:** Fall foliage, harvest themes

### Winter (December - February)
- **Primary accent:** `#007B9E` (Lakeside Blue)
- **Backgrounds:** Cooler tones
- **Imagery:** Snow, winter activities

### Spring (March - May)
- **Primary accent:** `#93C47D` (Community Sage)
- **Backgrounds:** Fresh, light tones
- **Imagery:** Blooming trees, spring activities

### Summer (June - August)
- **Primary accent:** `#F4A300` (Beacon Gold)
- **Backgrounds:** Bright, energetic tones
- **Imagery:** Outdoor activities, community events

---

## 📋 Content Guidelines

### Voice & Tone
- **Friendly and welcoming** but professional
- **Local-first** perspective
- **Clear and concise** communication
- **Inclusive** language
- **Action-oriented** calls to action

### Writing Style
- **Headlines:** Clear, benefit-focused
- **Body copy:** Conversational, informative
- **CTAs:** Action-oriented with clear value
- **Metadata:** Descriptive and keyword-rich

### Content Hierarchy
1. **Primary message** (what's most important)
2. **Supporting details** (context and benefits)
3. **Call to action** (what to do next)
4. **Additional resources** (related content)

---

## 🔧 Technical Implementation

### CSS Custom Properties
```css
:root {
  /* Primary Colors */
  --stoneham-green: #2A6F4D;
  --lakeside-blue: #007B9E;
  --beacon-gold: #F4A300;
  
  /* Secondary Colors */
  --autumn-brick: #D95D39;
  --community-sage: #93C47D;
  --sky-tint: #D2E5F1;
  
  /* Neutral Colors */
  --birch-white: #F7F7F7;
  --granite-gray: #404040;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
```

### Tailwind CSS Classes
```css
/* Primary Colors */
.bg-stoneham-green { background-color: #2A6F4D; }
.text-stoneham-green { color: #2A6F4D; }
.border-stoneham-green { border-color: #2A6F4D; }

.bg-lakeside-blue { background-color: #007B9E; }
.text-lakeside-blue { color: #007B9E; }
.border-lakeside-blue { border-color: #007B9E; }

.bg-beacon-gold { background-color: #F4A300; }
.text-beacon-gold { color: #F4A300; }
.border-beacon-gold { border-color: #F4A300; }
```

---

## 📚 Resources

### Design Files
- **Figma/Sketch:** [Link to design system]
- **Icon Library:** [Link to icon set]
- **Photo Library:** [Link to approved images]

### Development Resources
- **Component Library:** [Link to Storybook]
- **Code Repository:** [Link to GitHub]
- **Documentation:** [Link to docs]

### Brand Assets
- **Logo Files:** [Link to logo assets]
- **Color Palette:** [Link to color files]
- **Typography:** [Link to font files]

---

*This style guide should be updated regularly to reflect any changes to the brand or design system. Last updated: [Date]* 