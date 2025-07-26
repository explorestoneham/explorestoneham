# Explore Stoneham Component Library

This document provides examples and usage guidelines for the Explore Stoneham design system components.

## 🎨 Color Usage

### Primary Colors
```html
<!-- Stoneham Green - Primary brand color -->
<div class="bg-stoneham-green text-white p-4">Primary Brand Color</div>

<!-- Lakeside Blue - Secondary actions -->
<div class="bg-lakeside-blue text-white p-4">Secondary Color</div>

<!-- Beacon Gold - Call to action -->
<div class="bg-beacon-gold text-granite-gray p-4">Call to Action</div>
```

### Secondary Colors
```html
<!-- Autumn Brick - Warm accents -->
<div class="bg-autumn-brick text-white p-4">Warm Accent</div>

<!-- Community Sage - Success states -->
<div class="bg-community-sage text-white p-4">Success State</div>

<!-- Sky Tint - Backgrounds -->
<div class="bg-sky-tint text-granite-gray p-4">Background Color</div>
```

### Neutral Colors
```html
<!-- Birch White - Page backgrounds -->
<div class="bg-birch-white text-granite-gray p-4">Page Background</div>

<!-- Granite Gray - Text and borders -->
<div class="bg-granite-gray text-white p-4">Text Color</div>
```

## 🔘 Buttons

### Primary Button
```html
<button class="btn-primary">
  Get Started
</button>
```

### Secondary Button
```html
<button class="btn-secondary">
  Learn More
</button>
```

### Ghost Button
```html
<button class="btn-ghost">
  Cancel
</button>
```

### Button Sizes
```html
<!-- Small -->
<button class="btn-primary text-sm px-3 py-2">
  Small Button
</button>

<!-- Large -->
<button class="btn-primary text-lg px-8 py-4">
  Large Button
</button>
```

## 🃏 Cards

### Standard Card
```html
<div class="card">
  <h3 class="heading-4 mb-2">Card Title</h3>
  <p class="body-text">Card content goes here with some descriptive text.</p>
  <button class="btn-primary mt-4">Action</button>
</div>
```

### Featured Card
```html
<div class="card-featured">
  <h3 class="heading-4 mb-2">Featured Content</h3>
  <p class="body-text">This is a featured card with special styling.</p>
  <button class="btn-secondary mt-4">Learn More</button>
</div>
```

### Card with Image
```html
<div class="card">
  <img src="image.jpg" alt="Description" class="w-full h-48 object-cover rounded-lg mb-4">
  <h3 class="heading-4 mb-2">Card with Image</h3>
  <p class="body-text">Card content with an image above.</p>
</div>
```

## 📝 Typography

### Headings
```html
<h1 class="heading-1">Main Page Title</h1>
<h2 class="heading-2">Section Header</h2>
<h3 class="heading-3">Subsection Header</h3>
<h4 class="heading-4">Card Title</h4>
```

### Body Text
```html
<p class="body-text">
  This is the main body text with proper line height and color.
</p>

<p class="small-text">
  This is smaller text for captions and metadata.
</p>
```

### Text Colors
```html
<p class="text-stoneham-green">Green text</p>
<p class="text-lakeside-blue">Blue text</p>
<p class="text-beacon-gold">Gold text</p>
<p class="text-granite-gray">Gray text</p>
```

## 🧭 Navigation

### Header Navigation
```html
<nav class="bg-birch-white border-b-2 border-stoneham-green">
  <div class="container mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="text-stoneham-green font-bold text-xl">
        Explore Stoneham
      </div>
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-granite-gray hover:text-stoneham-green transition-colors">
          Home
        </a>
        <a href="#" class="text-stoneham-green border-b-2 border-stoneham-green font-semibold">
          Events
        </a>
        <a href="#" class="text-granite-gray hover:text-stoneham-green transition-colors">
          Services
        </a>
        <a href="#" class="text-granite-gray hover:text-stoneham-green transition-colors">
          About
        </a>
      </div>
    </div>
  </div>
</nav>
```

### Mobile Navigation
```html
<nav class="bg-birch-white border-b-2 border-stoneham-green md:hidden">
  <div class="container mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="text-stoneham-green font-bold text-xl">
        Explore Stoneham
      </div>
      <button class="text-granite-gray">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>
</nav>
```

## 📱 Layout Components

### Container
```html
<div class="container">
  <h1 class="heading-1">Page Content</h1>
  <p class="body-text">Content goes here...</p>
</div>
```

### Grid Layout
```html
<div class="container">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="card">
      <h3 class="heading-4">Card 1</h3>
      <p class="body-text">Content...</p>
    </div>
    <div class="card">
      <h3 class="heading-4">Card 2</h3>
      <p class="body-text">Content...</p>
    </div>
    <div class="card">
      <h3 class="heading-4">Card 3</h3>
      <p class="body-text">Content...</p>
    </div>
  </div>
</div>
```

### Hero Section
```html
<section class="bg-sky-tint py-16">
  <div class="container">
    <div class="text-center">
      <h1 class="heading-1 mb-4">Welcome to Stoneham</h1>
      <p class="body-text text-xl mb-8 max-w-2xl mx-auto">
        Discover the charm and community spirit of Stoneham, Massachusetts.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="btn-primary">Explore Events</button>
        <button class="btn-secondary">Learn More</button>
      </div>
    </div>
  </div>
</section>
```

## 🎯 Interactive States

### Hover Effects
```html
<!-- Cards with hover effects -->
<div class="card hover:shadow-lg transition-shadow duration-200">
  <h3 class="heading-4">Hover Card</h3>
  <p class="body-text">This card has a hover effect.</p>
</div>

<!-- Buttons with hover effects -->
<button class="btn-primary hover:scale-105 transition-transform duration-200">
  Hover Button
</button>
```

### Focus States
```html
<button class="btn-primary focus-ring">
  Focus Button
</button>

<input type="text" class="border border-granite-gray rounded-md px-4 py-2 focus-ring" placeholder="Focus input">
```

## 📊 Data Visualization

### Progress Bar
```html
<div class="w-full bg-sky-tint rounded-full h-4">
  <div class="bg-stoneham-green h-4 rounded-full" style="width: 75%"></div>
</div>
```

### Status Indicators
```html
<!-- Success -->
<div class="inline-flex items-center px-3 py-1 rounded-full bg-community-sage text-white text-sm">
  <span class="w-2 h-2 bg-white rounded-full mr-2"></span>
  Success
</div>

<!-- Warning -->
<div class="inline-flex items-center px-3 py-1 rounded-full bg-autumn-brick text-white text-sm">
  <span class="w-2 h-2 bg-white rounded-full mr-2"></span>
  Warning
</div>
```

## 🖼️ Image Guidelines

### Responsive Images
```html
<img src="hero-image.jpg" alt="Stoneham Town Center" 
     class="w-full h-64 md:h-96 object-cover rounded-lg">
```

### Image with Caption
```html
<figure class="card">
  <img src="event-image.jpg" alt="Community Event" 
       class="w-full h-48 object-cover rounded-lg mb-4">
  <figcaption class="small-text text-center">
    Annual Stoneham Community Festival
  </figcaption>
</figure>
```

## 📱 Responsive Design

### Mobile-First Approach
```html
<!-- Responsive text sizes -->
<h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-stoneham-green">
  Responsive Heading
</h1>

<!-- Responsive spacing -->
<div class="p-4 md:p-8 lg:p-12">
  <p class="body-text">Content with responsive padding</p>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  <!-- Grid items -->
</div>
```

## ♿ Accessibility

### Screen Reader Support
```html
<!-- Proper heading hierarchy -->
<h1 class="heading-1">Main Title</h1>
<h2 class="heading-2">Section Title</h2>
<h3 class="heading-3">Subsection Title</h3>

<!-- Alt text for images -->
<img src="image.jpg" alt="Detailed description of the image" class="w-full">

<!-- ARIA labels -->
<button class="btn-primary" aria-label="Submit form">
  Submit
</button>
```

### Focus Management
```html
<!-- Skip navigation link -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-beacon-gold text-granite-gray px-4 py-2 rounded">
  Skip to main content
</a>

<!-- Focus indicators -->
<button class="btn-primary focus-ring">
  Accessible Button
</button>
```

## 🎨 Seasonal Variations

### Fall Theme
```html
<div class="bg-autumn-brick bg-opacity-10 p-6 rounded-lg">
  <h3 class="heading-3 text-autumn-brick">Fall Events</h3>
  <p class="body-text">Autumn-themed content with warm colors.</p>
</div>
```

### Winter Theme
```html
<div class="bg-sky-tint p-6 rounded-lg">
  <h3 class="heading-3 text-lakeside-blue">Winter Activities</h3>
  <p class="body-text">Winter-themed content with cool colors.</p>
</div>
```

## 📋 Best Practices

### Do's
- ✅ Use semantic HTML elements
- ✅ Maintain proper heading hierarchy
- ✅ Include alt text for images
- ✅ Test with screen readers
- ✅ Ensure sufficient color contrast
- ✅ Use consistent spacing
- ✅ Follow the brand color palette

### Don'ts
- ❌ Don't use colors outside the brand palette
- ❌ Don't skip heading levels
- ❌ Don't rely solely on color for information
- ❌ Don't use small touch targets on mobile
- ❌ Don't ignore focus states
- ❌ Don't use generic placeholder text

## 🔧 Customization

### Extending Components
```css
/* Custom button variant */
.btn-custom {
  @apply btn-primary;
  background: linear-gradient(135deg, var(--beacon-gold), var(--autumn-brick));
}

/* Custom card variant */
.card-highlight {
  @apply card;
  border-left: 4px solid var(--stoneham-green);
}
```

### Theme Overrides
```css
/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1a1a1a;
    --foreground: #ffffff;
  }
}
```

---

*This component library should be updated as new components are added or existing ones are modified.* 