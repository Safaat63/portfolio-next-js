# Design System Guide

Professional, Clean & Modern Design System with Cool Accents (Teal, Purple, Blue)

## 📋 Table of Contents

1. [Color Palette](#color-palette)
2. [Typography System](#typography-system)
3. [Button Styles](#button-styles)
4. [Spacing & Layout](#spacing--layout)
5. [Forms](#forms)
6. [Components](#components)
7. [Responsive Proportions](#responsive-proportions)

---

## 🎨 Color Palette

### Primary Color (Teal/Cyan)
Main accent color for interactive elements and primary actions.

```css
/* CSS Variables and Tailwind Colors */
--color-primary-50: #f0f9fc     /* Lightest teal background */
--color-primary-100: #e0f2fe    /* Light teal background */
--color-primary-200: #bae6fd    /* Medium-light teal */
--color-primary-300: #7dd3fc    /* Medium teal */
--color-primary-400: #38bdf8    /* Vibrant teal */
--color-primary-500: #0ea5e9    /* Primary teal (interactive) */
--color-primary-600: #0284c7    /* Primary teal dark (default buttons) */
--color-primary-700: #0369a1    /* Primary teal darker (hover state) */
--color-primary-800: #075985    /* Primary teal darkest (active state) */
--color-primary-900: #0c3d66    /* Deepest teal */
```

**Usage:** Primary buttons, links, active states, focus rings, primary icons

### Secondary Color (Purple)
Accent color for secondary actions and highlights.

```css
--color-secondary-50: #faf5ff    /* Lightest purple background */
--color-secondary-100: #f3e8ff   /* Light purple background */
--color-secondary-200: #e9d5ff   /* Medium-light purple */
--color-secondary-300: #d8b4fe   /* Medium purple */
--color-secondary-400: #c084fc   /* Vibrant purple */
--color-secondary-500: #a855f7   /* Secondary purple (interactive) */
--color-secondary-600: #9333ea   /* Secondary purple dark */
--color-secondary-700: #7e22ce   /* Secondary purple darker */
--color-secondary-800: #6b21a8   /* Secondary purple darkest */
--color-secondary-900: #581c87   /* Deepest purple */
```

**Usage:** Secondary actions, accent text, special highlights, badges

### Accent Color (Blue)
Tertiary accent for information and tertiary interactions.

```css
--color-accent-50: #eff6ff      /* Lightest blue background */
--color-accent-100: #dbeafe     /* Light blue background */
--color-accent-200: #bfdbfe     /* Medium-light blue */
--color-accent-300: #93c5fd     /* Medium blue */
--color-accent-400: #60a5fa     /* Vibrant blue */
--color-accent-500: #3b82f6     /* Accent blue (interactive) */
--color-accent-600: #2563eb     /* Accent blue dark */
--color-accent-700: #1d4ed8     /* Accent blue darker */
--color-accent-800: #1e40af     /* Accent blue darkest */
--color-accent-900: #1e3a8a     /* Deepest blue */
```

**Usage:** Informational elements, alerts, tertiary links, supplementary UI

### Neutral Colors (Grays)
Foundational colors for backgrounds, borders, and text.

```css
--color-neutral-50: #fafafa     /* Almost white background */
--color-neutral-100: #f5f5f5    /* Very light gray background */
--color-neutral-150: #f0f0f0    /* Light gray background */
--color-neutral-200: #e5e5e5    /* Light gray (borders) */
--color-neutral-300: #d4d4d4    /* Medium-light gray */
--color-neutral-400: #a3a3a3    /* Medium gray */
--color-neutral-500: #737373    /* Medium-dark gray */
--color-neutral-600: #525252    /* Dark gray (secondary text) */
--color-neutral-700: #404040    /* Darker gray */
--color-neutral-800: #262626    /* Very dark gray */
--color-neutral-900: #171717    /* Almost black */
```

### White & Black
```css
--color-white: #ffffff          /* Pure white */
--color-black: #000000          /* Pure black */
```

### Semantic Colors
```css
/* Success - Green */
--color-success: #16a34a
--color-success-light: #dcfce7

/* Warning - Amber */
--color-warning: #ca8a04
--color-warning-light: #fef3c7

/* Danger - Red */
--color-danger: #dc2626
--color-danger-light: #fee2e2

/* Info - Blue */
--color-info: #0284c7
--color-info-light: #e0f2fe
```

### Semantic Variables
```css
--bg-primary: #ffffff           /* Main background */
--bg-secondary: #fafafa         /* Secondary background (cards) */
--bg-tertiary: #f5f5f5          /* Tertiary background (tables) */
--bg-quaternary: #f0f0f0        /* Quaternary background (hover states) */

--fg-primary: #171717           /* Primary text color */
--fg-secondary: #525252         /* Secondary text color */
--fg-tertiary: #737373          /* Tertiary text color (disabled, hints) */
--fg-inverse: #ffffff           /* Inverse text (on dark backgrounds) */

--border-primary: #e5e5e5       /* Primary border color */
--border-secondary: #d4d4d4     /* Secondary border color */
--border-light: #f5f5f5         /* Light border color */
```

---

## 🔤 Typography System

### Font Families

```css
/* Base Font Family - System Stack (Production Ready) */
--font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
                    'Droid Sans', 'Helvetica Neue', sans-serif;

/* Display Font Family - Modern Interface Fonts */
--font-family-display: 'Inter', 'Segoe UI', 'Roboto', sans-serif;

/* Monospace Font Family - Code */
--font-family-mono: 'Menlo', 'Monaco', 'Courier New', monospace;
```

### Heading Hierarchy

| Level | Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|--------|-------------|----------------|----------|
| h1    | 3rem (48px) | 700 Bold | 1.1 | -1.2px | Page title, main heading |
| h2    | 2.25rem (36px) | 700 Bold | 1.2 | -1px | Section title |
| h3    | 1.875rem (30px) | 600 Semibold | 1.3 | -0.8px | Subsection title |
| h4    | 1.5rem (24px) | 600 Semibold | 1.4 | -0.5px | Card title, minor heading |
| h5    | 1.25rem (20px) | 600 Semibold | 1.4 | -0.3px | Form label, list title |
| h6    | 1rem (16px) | 600 Semibold | 1.5 | 0.5px | Caption, uppercase label |

### Body Typography

```css
/* Paragraph Text */
font-size: 1rem (16px)
font-weight: 400 Regular
line-height: 1.6
letter-spacing: -0.3px
color: --fg-primary

/* Subtitle Text */
font-size: 1.25rem (20px)
font-weight: 500 Medium
line-height: 1.6
color: --fg-secondary

/* Small Text */
font-size: 0.875rem (14px)
line-height: 1.25rem
color: --fg-secondary

/* Caption/Helper Text */
font-size: 0.75rem (12px)
font-weight: 600 Semibold
letter-spacing: 0.5px
text-transform: uppercase
color: --fg-tertiary
```

### CSS Classes

```css
/* Heading Classes */
.h1, h1 { /* 3rem, 700 weight, -1.2px spacing */ }
.h2, h2 { /* 2.25rem, 700 weight, -1px spacing */ }
.h3, h3 { /* 1.875rem, 600 weight, -0.8px spacing */ }
.h4, h4 { /* 1.5rem, 600 weight, -0.5px spacing */ }
.h5, h5 { /* 1.25rem, 600 weight, -0.3px spacing */ }
.h6, h6 { /* 1rem, 600 weight, 0.5px spacing */ }

/* Text Utilities */
.subtitle { /* 1.25rem, 500 weight */ }
.secondary { /* 0.875rem, secondary color */ }
.tertiary { /* 0.75rem, tertiary color */ }
.caption { /* 0.75rem, uppercase, semibold */ }
```

---

## 🔘 Button Styles

### Button Types

#### Primary Button
```html
<!-- HTML -->
<button class="btn-primary">Primary Action</button>
<a href="#" class="btn-primary">Primary Link</a>
```

```css
/* Styling */
background-color: #0284c7 (primary-600)
color: #ffffff (white)
padding: 0.5rem 1.5rem (12px 24px)
border-radius: 1rem (16px)
font-weight: 500
border: none

/* Hover State */
background-color: #0369a1 (primary-700)
cursor: pointer
transition: all 200ms ease-in-out

/* Active State */
background-color: #075985 (primary-800)

/* Focus State */
outline: 2px solid #0ea5e9 (primary-500)
outline-offset: 2px

/* Disabled State */
opacity: 0.5
cursor: not-allowed
```

**Usage:** Main CTA, form submission, primary navigation

---

#### Secondary Button
```html
<button class="btn-secondary">Secondary Action</button>
```

```css
/* Styling */
background-color: #f5f5f5 (neutral-100)
color: #171717 (neutral-900)
border: 1px solid #e5e5e5 (border-primary)
padding: 0.5rem 1.5rem
border-radius: 1rem
font-weight: 500

/* Hover State */
background-color: #e5e5e5 (neutral-200)

/* Active State */
background-color: #d4d4d4 (neutral-300)
```

**Usage:** Secondary actions, cancel buttons, alternate options

---

#### Tertiary Button (Ghost)
```html
<button class="btn-tertiary">Tertiary Action</button>
```

```css
/* Styling */
background-color: transparent
color: #0284c7 (primary-600)
border: none
padding: 0.5rem 1.5rem
font-weight: 500

/* Hover State */
background-color: #f0f9fc (primary-50)

/* Active State */
background-color: #e0f2fe (primary-100)
```

**Usage:** Less prominent actions, links styled as buttons

---

### Button Sizes

```css
/* Small */
.btn-sm {
  padding: 0.375rem 0.75rem (6px 12px)
  font-size: 0.875rem
  border-radius: 0.375rem
}

/* Medium (Default) */
.btn {
  padding: 0.5rem 1.5rem (12px 24px)
  font-size: 1rem
  border-radius: 1rem
}

/* Large */
.btn-lg {
  padding: 0.75rem 2rem (12px 32px)
  font-size: 1.125rem
  border-radius: 0.75rem
}
```

---

## 📏 Spacing & Layout

### Spacing Scale

```css
--spacing-xs: 0.25rem (4px)      /* Extra small gaps */
--spacing-sm: 0.5rem (8px)       /* Small gaps, internal padding */
--spacing-md: 1rem (16px)        /* Medium gaps, standard padding */
--spacing-lg: 1.5rem (24px)      /* Large gaps, card padding */
--spacing-xl: 2rem (32px)        /* Extra large gaps, section padding */
--spacing-2xl: 2.5rem (40px)     /* XXL gaps */
--spacing-3xl: 3rem (48px)       /* XXXL gaps */
--spacing-4xl: 3.5rem (56px)     /* XXXXL gaps */
--spacing-5xl: 4rem (64px)       /* XXXXXL gaps */
--spacing-6xl: 5rem (80px)       /* XXXXXXL gaps, section spacing */
```

### Section Spacing

```css
/* Standard Section */
.section {
  padding-top: 5rem (80px)       /* desktop */
  padding-bottom: 5rem (80px)
}

/* Small Section */
.section-sm {
  padding-top: 3.5rem (56px)
  padding-bottom: 3.5rem
}

/* Large Section */
.section-lg {
  padding-top: 6rem (96px)
  padding-bottom: 6rem
}

/* Mobile Adaptation */
@media (max-width: 768px) {
  .section {
    padding-top: 3.5rem (56px)
    padding-bottom: 3.5rem
  }
}
```

### Container Sizing

```css
/* Desktop (1024px and above) */
.container {
  max-width: 90rem (1440px)       /* Content width */
  padding: 0 2rem (32px sides)
  margin: 0 auto
}

/* Tablet (768px to 1023px) */
@media (768px to 1023px) {
  .container {
    max-width: 100%
    padding: 0 1.5rem (24px sides)
  }
}

/* Mobile (below 768px) */
@media (max-width: 767px) {
  .container {
    max-width: 100%
    padding: 0 1rem (16px sides)
  }
}
```

### Grid System

```css
/* Auto-fit grid (responsive columns) */
.grid {
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
  gap: 2rem (32px)
}

/* 2-Column Grid */
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr)
}

/* 3-Column Grid */
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr)
}

/* 4-Column Grid */
.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr)
}

/* Mobile Adaptation */
@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr
  }
}
```

---

## 📋 Forms

### Form Groups

```html
<div class="form-group">
  <label for="email" class="form-label required">Email Address</label>
  <input type="email" id="email" class="form-control" placeholder="you@example.com">
  <div class="form-help">We'll never share your email.</div>
</div>
```

```css
/* Form Group Container */
.form-group {
  margin-bottom: 2rem (32px)
}

/* Form Label */
.form-label {
  font-size: 0.875rem
  font-weight: 600
  margin-bottom: 0.5rem
  color: #171717 (fg-primary)
}

.form-label.required::after {
  content: ' *'
  color: #dc2626 (danger)
}

/* Form Control Input */
.form-control {
  width: 100%
  padding: 0.625rem 1rem (10px 16px)
  border-radius: 0.5rem
  border: 1px solid #d4d4d4 (border-secondary)
  background-color: #ffffff (bg-primary)
  font-size: 1rem
  color: #171717 (fg-primary)
  transition: all 200ms ease-in-out

  /* Focus State */
  &:focus {
    outline: none
    border-color: #0ea5e9 (primary-500)
    box-shadow: 0 0 0 2px #e0f2fe (primary-200)
  }

  /* Placeholder */
  &::placeholder {
    color: #737373 (fg-tertiary)
  }

  /* Disabled State */
  &:disabled {
    background-color: #fafafa (bg-secondary)
    opacity: 0.7
    cursor: not-allowed
  }

  /* Error State */
  &.error {
    border-color: #dc2626 (danger)
    &:focus {
      box-shadow: 0 0 0 2px #fee2e2 (danger-light)
    }
  }

  /* Success State */
  &.success {
    border-color: #16a34a (success)
    &:focus {
      box-shadow: 0 0 0 2px #dcfce7 (success-light)
    }
  }
}

/* Form Textarea */
textarea.form-control {
  resize: vertical
  min-height: 120px
}

/* Form Helper Text */
.form-help {
  font-size: 0.75rem
  color: #737373 (fg-tertiary)
  margin-top: 0.25rem
}

/* Form Error Text */
.form-error {
  font-size: 0.875rem
  color: #dc2626 (danger)
  margin-top: 0.25rem
}
```

---

## 🎯 Components

### Card

```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <p>Card content goes here...</p>
</div>
```

```css
/* Card Base */
.card {
  background-color: #ffffff (bg-primary)
  border: 1px solid #e5e5e5 (border-primary)
  border-radius: 1rem
  padding: 2rem (32px)
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
  transition: all 200ms ease-in-out

  /* Hover State */
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
  }
}

/* Card Elevated */
.card-elevated {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
  }
}

/* Card Flat */
.card-flat {
  background-color: #fafafa (bg-secondary)
  border: none
  box-shadow: none
}

/* Card Header */
.card-header {
  padding-bottom: 1rem
  margin-bottom: 1rem
  border-bottom: 1px solid #e5e5e5 (border-primary)
}
```

### Badges

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-info">Info</span>
```

```css
/* Badge Base */
.badge {
  display: inline-flex
  align-items: center
  padding: 0.25rem 0.75rem (4px 12px)
  border-radius: 9999px
  font-size: 0.75rem
  font-weight: 600
  background-color: #e0f2fe (primary-100)
  color: #0369a1 (primary-700)
}

/* Badge Variants */
.badge-primary { /* teal */ }
.badge-secondary { /* purple */ }
.badge-accent { /* blue */ }
.badge-success { /* green */ }
.badge-warning { /* amber */ }
.badge-danger { /* red */ }
.badge-info { /* blue */ }
.badge-neutral { /* gray */ }
```

### Alerts

```html
<div class="alert alert-success">Success message!</div>
<div class="alert alert-warning">Warning message!</div>
<div class="alert alert-danger">Error message!</div>
<div class="alert alert-info">Info message!</div>
```

```css
/* Alert Base */
.alert {
  padding: 1rem
  border-radius: 0.75rem
  border: 1px solid
  display: flex
  gap: 0.75rem
  align-items: flex-start
}

/* Success Alert */
.alert-success {
  background-color: #dcfce7 (success-light)
  border-color: #bbf7d0
  color: #166534
}

/* Warning Alert */
.alert-warning {
  background-color: #fef3c7 (warning-light)
  border-color: #fde68a
  color: #92400e
}

/* Danger Alert */
.alert-danger {
  background-color: #fee2e2 (danger-light)
  border-color: #fecaca
  color: #991b1b
}

/* Info Alert */
.alert-info {
  background-color: #eff6ff (info-light)
  border-color: #bfdbfe
  color: #1e40af
}
```

---

## 📱 Responsive Proportions

### Breakpoints

```css
/* Mobile: 0px - 767px */
/* Tablet: 768px - 1023px */
/* Desktop: 1024px and above */
```

### Section Heights

```css
/* Hero Section */
desktop:  min-height: 600px
tablet:   min-height: 500px
mobile:   min-height: 400px

/* Standard Section */
desktop:  min-height: auto, padding: 5rem
tablet:   min-height: auto, padding: 3.5rem
mobile:   min-height: auto, padding: 2rem

/* Card Heights */
desktop:  height: auto (min 200px)
tablet:   height: auto (min 180px)
mobile:   height: auto (min 150px)
```

### Text Scaling

```css
/* Desktop (1024px+) */
h1: 3rem (48px)
h2: 2.25rem (36px)
h3: 1.875rem (30px)
body: 1rem (16px)

/* Tablet (768px-1023px) */
h1: 2.25rem (36px)
h2: 1.875rem (30px)
h3: 1.5rem (24px)
body: 1rem (16px)

/* Mobile (<768px) */
h1: 1.875rem (30px)
h2: 1.5rem (24px)
h3: 1.25rem (20px)
body: 1rem (16px)
```

### Grid Columns

```css
/* Desktop */
.grid-cols-4: 4 columns

/* Tablet */
.grid-cols-4: 2 columns
.grid-cols-3: 2 columns
.grid-cols-2: 2 columns

/* Mobile */
.grid-cols-4: 1 column
.grid-cols-3: 1 column
.grid-cols-2: 1 column
```

### Padding/Margin

```css
/* Desktop Container */
padding-left: 2rem (32px)
padding-right: 2rem (32px)
max-width: 90rem (1440px)

/* Tablet Container */
padding-left: 1.5rem (24px)
padding-right: 1.5rem (24px)
max-width: 100%

/* Mobile Container */
padding-left: 1rem (16px)
padding-right: 1rem (16px)
max-width: 100%
```

---

## 🔄 Accessibility & Interactions

### Focus States
```css
All interactive elements:
outline: 2px solid primary-500
outline-offset: 2px

Keyboard navigation: Tab, Shift+Tab
Focus visible: all buttons, links, form inputs
```

### Transitions & Animations
```css
Transition Duration: 200ms ease-in-out (standard)
Animation Duration: 300ms ease-out
Reduced Motion: Respected via @media (prefers-reduced-motion: reduce)
```

### Text Selection
```css
Color Defaults:
background: primary-600
color: white
text-decoration: none
```

---

## 📚 Implementation Examples

### Button Group
```html
<div style="display: flex; gap: 1rem;">
  <button class="btn-primary">Save</button>
  <button class="btn-secondary">Cancel</button>
  <button class="btn-tertiary">Learn More</button>
</div>
```

### Form Card
```html
<div class="card">
  <div class="card-header">
    <h3>Sign Up</h3>
  </div>
  <form>
    <div class="form-group">
      <label for="name" class="form-label required">Full Name</label>
      <input type="text" id="name" class="form-control" placeholder="John Doe">
    </div>
    <div class="form-group">
      <label for="email" class="form-label required">Email</label>
      <input type="email" id="email" class="form-control" placeholder="john@example.com">
    </div>
    <button type="submit" class="btn-primary" style="width: 100%;">Sign Up</button>
  </form>
</div>
```

### Hero Section
```html
<section class="section-lg" style="background: linear-gradient(to right, #0284c7 0%, #0369a1 100%);">
  <div class="container" style="text-align: center;">
    <h1 style="color: white;">Welcome</h1>
    <p style="color: rgba(255,255,255,0.9); font-size: 1.25rem;">
      Professional, clean, and modern design
    </p>
    <button class="btn-primary" style="margin-top: 2rem;">Get Started</button>
  </div>
</section>
```

### Grid Layout
```html
<section class="section">
  <div class="container">
    <div class="grid grid-cols-3">
      <div class="card">
        <h4>Feature 1</h4>
        <p>Description of feature 1...</p>
      </div>
      <div class="card">
        <h4>Feature 2</h4>
        <p>Description of feature 2...</p>
      </div>
      <div class="card">
        <h4>Feature 3</h4>
        <p>Description of feature 3...</p>
      </div>
    </div>
  </div>
</section>
```

---

## 🎨 Color Usage Guidelines

### Do's ✅
- Use primary color (teal) for main CTAs and navigation
- Use secondary color (purple) for accents and highlights
- Maintain sufficient contrast (WCAG AA standard minimum)
- Use status colors (success, warning, danger) consistently
- Follow the color hierarchy for visual hierarchy

### Don'ts ❌
- Don't mix all three primary, secondary, and accent equally
- Don't use pure black (#000) or pure white only—use neutral grays
- Don't create focus states without high contrast
- Don't override brand colors arbitrarily
- Don't use color alone to convey meaning (use icons/text too)

---

## 📖 Quick Reference

| Element | CSS Class | Primary Color | Size |
|---------|-----------|-------------|------|
| Main Button | `.btn-primary` | #0284c7 | 12px 24px |
| Secondary Button | `.btn-secondary` | #f5f5f5 | 12px 24px |
| Card | `.card` | #ffffff | 2rem padding |
| Badge | `.badge` | #e0f2fe | 4px 12px |
| Input | `.form-control` | #ffffff | 10px 16px |
| Form Label | `.form-label` | #171717 | 0.875rem |
| Heading 1 | `h1` | #171717 | 3rem |
| Heading 2 | `h2` | #171717 | 2.25rem |
| Primary Link | `a` | #0284c7 | 1rem |

---

**Last Updated:** $(DATE)
**Version:** 1.0.0
**Status:** Production Ready ✅
