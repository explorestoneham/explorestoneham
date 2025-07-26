# Explore Stoneham Design System - Quick Reference

## 🎨 Color Palette

| Color | Name | HEX | Usage |
|-------|------|-----|-------|
| ![#2A6F4D](https://via.placeholder.com/15/2A6F4D/000000?text=+) | Stoneham Green | `#2A6F4D` | Primary brand, headers, navigation |
| ![#007B9E](https://via.placeholder.com/15/007B9E/000000?text=+) | Lakeside Blue | `#007B9E` | Secondary actions, links |
| ![#F4A300](https://via.placeholder.com/15/F4A300/000000?text=+) | Beacon Gold | `#F4A300` | Call-to-action buttons |
| ![#D95D39](https://via.placeholder.com/15/D95D39/000000?text=+) | Autumn Brick | `#D95D39` | Warm accents, seasonal |
| ![#93C47D](https://via.placeholder.com/15/93C47D/000000?text=+) | Community Sage | `#93C47D` | Success states |
| ![#D2E5F1](https://via.placeholder.com/15/D2E5F1/000000?text=+) | Sky Tint | `#D2E5F1` | Backgrounds, cards |
| ![#F7F7F7](https://via.placeholder.com/15/F7F7F7/000000?text=+) | Birch White | `#F7F7F7` | Page backgrounds |
| ![#404040](https://via.placeholder.com/15/404040/000000?text=+) | Granite Gray | `#404040` | Body text, borders |

## 📝 Typography Scale

| Element | Class | Size | Weight | Color |
|---------|-------|------|--------|-------|
| H1 | `.heading-1` | 2.5rem | 700 | Stoneham Green |
| H2 | `.heading-2` | 2rem | 600 | Stoneham Green |
| H3 | `.heading-3` | 1.5rem | 600 | Lakeside Blue |
| H4 | `.heading-4` | 1.25rem | 600 | Granite Gray |
| Body | `.body-text` | 1rem | 400 | Granite Gray |
| Small | `.small-text` | 0.875rem | 400 | Granite Gray |

## 🔘 Button Components

```html
<!-- Primary Button -->
<button class="btn-primary">Get Started</button>

<!-- Secondary Button -->
<button class="btn-secondary">Learn More</button>

<!-- Ghost Button -->
<button class="btn-ghost">Cancel</button>
```

## 🃏 Card Components

```html
<!-- Standard Card -->
<div class="card">
  <h3 class="heading-4">Title</h3>
  <p class="body-text">Content</p>
</div>

<!-- Featured Card -->
<div class="card-featured">
  <h3 class="heading-4">Featured</h3>
  <p class="body-text">Content</p>
</div>
```

## 📱 Layout Components

```html
<!-- Container -->
<div class="container">
  <h1 class="heading-1">Content</h1>
</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Grid items -->
</div>
```

## 🎯 Interactive States

```html
<!-- Hover effects -->
<button class="btn-primary hover:scale-105">Hover</button>

<!-- Focus states -->
<button class="btn-primary focus-ring">Focus</button>

<!-- Active states -->
<button class="btn-primary active:scale-95">Active</button>
```

## 📊 Data Visualization

```html
<!-- Progress bar -->
<div class="w-full bg-sky-tint rounded-full h-4">
  <div class="bg-stoneham-green h-4 rounded-full" style="width: 75%"></div>
</div>

<!-- Status indicators -->
<div class="inline-flex items-center px-3 py-1 rounded-full bg-community-sage text-white text-sm">
  Success
</div>
```

## 🖼️ Image Guidelines

```html
<!-- Responsive image -->
<img src="image.jpg" alt="Description" class="w-full h-64 md:h-96 object-cover rounded-lg">

<!-- Image with caption -->
<figure class="card">
  <img src="image.jpg" alt="Description" class="w-full h-48 object-cover rounded-lg mb-4">
  <figcaption class="small-text text-center">Caption</figcaption>
</figure>
```

## ♿ Accessibility

```html
<!-- Proper heading hierarchy -->
<h1 class="heading-1">Main Title</h1>
<h2 class="heading-2">Section</h2>
<h3 class="heading-3">Subsection</h3>

<!-- Alt text for images -->
<img src="image.jpg" alt="Detailed description" class="w-full">

<!-- ARIA labels -->
<button class="btn-primary" aria-label="Submit form">Submit</button>
```

## 📱 Responsive Breakpoints

| Breakpoint | Class | Width |
|------------|-------|-------|
| Mobile | Default | 320px - 767px |
| Tablet | `md:` | 768px - 1023px |
| Desktop | `lg:` | 1024px+ |

## 🎨 Seasonal Themes

### Fall (September - November)
- Primary accent: `#D95D39` (Autumn Brick)
- Backgrounds: Warmer tones
- Imagery: Fall foliage

### Winter (December - February)
- Primary accent: `#007B9E` (Lakeside Blue)
- Backgrounds: Cooler tones
- Imagery: Snow, winter activities

### Spring (March - May)
- Primary accent: `#93C47D` (Community Sage)
- Backgrounds: Fresh, light tones
- Imagery: Blooming trees

### Summer (June - August)
- Primary accent: `#F4A300` (Beacon Gold)
- Backgrounds: Bright, energetic tones
- Imagery: Outdoor activities

## 🔧 CSS Custom Properties

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

## 📋 Tailwind Classes

### Background Colors
```css
.bg-stoneham-green
.bg-lakeside-blue
.bg-beacon-gold
.bg-autumn-brick
.bg-community-sage
.bg-sky-tint
.bg-birch-white
.bg-granite-gray
```

### Text Colors
```css
.text-stoneham-green
.text-lakeside-blue
.text-beacon-gold
.text-autumn-brick
.text-community-sage
.text-sky-tint
.text-birch-white
.text-granite-gray
```

### Border Colors
```css
.border-stoneham-green
.border-lakeside-blue
.border-beacon-gold
.border-autumn-brick
.border-community-sage
.border-sky-tint
.border-birch-white
.border-granite-gray
```

## 🎯 Best Practices

### Do's ✅
- Use semantic HTML elements
- Maintain proper heading hierarchy
- Include alt text for images
- Test with screen readers
- Ensure sufficient color contrast
- Use consistent spacing
- Follow the brand color palette

### Don'ts ❌
- Don't use colors outside the brand palette
- Don't skip heading levels
- Don't rely solely on color for information
- Don't use small touch targets on mobile
- Don't ignore focus states
- Don't use generic placeholder text

## 📚 Resources

- **Style Guide:** `STYLE_GUIDE.md`
- **Component Library:** `COMPONENT_LIBRARY.md`
- **Design Tokens:** `src/styles/design-tokens.css`
- **Tailwind Config:** `tailwind.config.js`

---

*This quick reference should be updated as the design system evolves.* 