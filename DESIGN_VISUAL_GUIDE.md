# Design System - Visual & Reference Guide

## 🎨 Color Palette Reference

### Primary Colors - Teal/Cyan (Use for Main Interactions)
```
#f0f9fc (50)    ███ Lightest - Subtle backgrounds
#e0f2fe (100)   ███ Light - Hover backgrounds
#bae6fd (200)   ███ Light-medium - Secondary backgrounds
#7dd3fc (300)   ███ Medium - Tertiary elements
#38bdf8 (400)   ███ Medium-dark - Accents
#0ea5e9 (500)   ███ Default interaction color
#0284c7 (600)   ███ PRIMARY BUTTON DEFAULT
#0369a1 (700)   ███ Primary button hover
#075985 (800)   ███ Primary button active
#0c3d66 (900)   ███ Dark - Strong emphasis
```

**Usage**: Main CTAs, primary buttons, focus rings, selected states, primary links

### Secondary Colors - Purple (Use for Accents)
```
#faf5ff (50)    ███ Lightest background
#f3e8ff (100)   ███ Light background
#e9d5ff (200)   ███ Light-medium background
#d8b4fe (300)   ███ Medium background
#c084fc (400)   ███ Medium-dark
#a855f7 (500)   ███ Default accent
#9333ea (600)   ███ SECONDARY ACCENT
#7e22ce (700)   ███ Darker accent
#6b21a8 (800)   ███ Dark accent
#581c87 (900)   ███ Darkest accent
```

**Usage**: Badges, highlights, secondary actions, decorative elements

### Accent Colors - Blue (Use for Information)
```
#eff6ff (50)    ███ Lightest - Info background
#dbeafe (100)   ███ Light - Info section bg
#bfdbfe (200)   ███ Light-medium
#93c5fd (300)   ███ Medium
#60a5fa (400)   ███ Medium-dark
#3b82f6 (500)   ███ Default info blue
#2563eb (600)   ███ Info dark
#1d4ed8 (700)   ███ Info darker
#1e40af (800)   ███ Info darkest
#1e3a8a (900)   ███ Very dark
```

**Usage**: Information alerts, info badges, tertiary links, notification icons

### Neutral Colors - Grays (Use for Structural Elements)
```
#fafafa (50)    ███ Almost white - Lightest bg
#f5f5f5 (100)   ███ Very light - Secondary bg
#f0f0f0 (150)   ███ Light - Tertiary bg
#e5e5e5 (200)   ███ Light gray - Borders
#d4d4d4 (300)   ███ Medium-light - Secondary border
#a3a3a3 (400)   ███ Medium gray
#737373 (500)   ███ Medium-dark - Tertiary text
#525252 (600)   ███ Dark gray - Secondary text
#404040 (700)   ███ Darker gray
#262626 (800)   ███ Very dark gray
#171717 (900)   ███ Almost black - PRIMARY TEXT
```

**Usage**: Backgrounds, borders, text colors, disabled states

### Status Colors (Semantic Use)
```
Success:  #16a34a  ███ Green - Confirmations, success messages
Warning:  #ca8a04  ███ Amber - Warnings, cautions
Danger:   #dc2626  ███ Red - Errors, destructive actions
Info:     #0284c7  ███ Blue - Information, notices
```

---

## 🔤 Typography Specimen

### Heading Hierarchy

```
H1 - 3rem (48px) | 700 weight | -1.2px spacing
    Welcome to Your Portfolio
    
    Usage: Main page title, hero section

H2 - 2.25rem (36px) | 700 weight | -1px spacing
    Major Section Title
    
    Usage: Section headings, main content sections

H3 - 1.875rem (30px) | 600 weight | -0.8px spacing
    Subsection Title
    
    Usage: Subsection headings, card titles in large sections

H4 - 1.5rem (24px) | 600 weight | -0.5px spacing
    Card Title or Minor Heading
    
    Usage: Card titles, form section titles

H5 - 1.25rem (20px) | 600 weight | -0.3px spacing
    Form Label or List Title
    
    Usage: Form labels, list titles, emphasis labels

H6 - 1rem (16px) | 600 weight | 0.5px spacing | UPPERCASE
    CAPTION OR UPPERCASE LABEL
    
    Usage: Captions, labels, uppercase text
```

### Body Typography

```
Standard Paragraph
1rem (16px) | 400 weight | 1.6 line-height

This is how standard body text appears. Designed for readability
with appropriate spacing and letter-spacing. Perfect for content
sections, descriptions, and explanatory text throughout your site.

Subtitle Text
1.25rem (20px) | 500 weight | 1.6 line-height | Secondary color

Larger, emphasizes topics that aren't quite headings. Use under
headings or for callout text that needs attention.

Small Text / Secondary Text
0.875rem (14px) | Regular weight | Secondary color

Smaller text for descriptions, metadata, or less emphasized content.

Caption / Helper Text
0.75rem (12px) | 600 weight | Tertiary color | UPPERCASE

Helper text, timestamps, or very small emphasized information.
```

---

## 🔘 Button Style Examples

### Primary Button (Main CTAs)
```
Normal:     Background #0284c7 | White text | 12px 24px padding
Hover:      Background #0369a1 | All in 200ms transition
Active:     Background #075985 | Pressed state
Disabled:   Opacity 50% | Cursor not-allowed
Focus:      2px solid #0ea5e9 outline | 2px offset
```

**HTML/JSX:**
```jsx
<button className="btn btn-primary">Save Changes</button>
<button className="btn btn-primary btn-sm">Small Button</button>
<button className="btn btn-primary btn-lg">Large Button</button>
```

### Secondary Button (Alternative Actions)
```
Normal:     Background #f5f5f5 | Gray text | Border #e5e5e5
Hover:      Background #e5e5e5
Active:     Background #d4d4d4
```

**HTML/JSX:**
```jsx
<button className="btn btn-secondary">Cancel</button>
```

### Tertiary Button (Ghost Style - Low Emphasis)
```
Normal:     Background transparent | Teal text (#0284c7)
Hover:      Background #f0f9fc (lightest teal)
Active:     Background #e0f2fe (light teal)
```

**HTML/JSX:**
```jsx
<button className="btn btn-tertiary">Learn More</button>
```

---

## 🎯 Card Examples

### Standard Card
```
┌─────────────────────────────────┐
│ White background                │
│ 1px border #e5e5e5             │
│ 16px border-radius             │
│ 32px padding (all sides)        │
│ Subtle shadow on base           │
│ Enhanced shadow on hover        │
└─────────────────────────────────┘
```

### Card with Header
```
┌─────────────────────────────────┐
│ Card Title                      │  ← Heading
├─────────────────────────────────│  ← Border line
│ Your card content goes here     │
│ With multiple paragraphs        │
│ And organized information       │
└─────────────────────────────────┘
```

### Elevated Card
```
┌─────────────────────────────────┐
│ Starts with visible shadow      │
│ Even more prominent shadow hover│
│ Great for featured content      │
└─────────────────────────────────┘
```

---

## 📊 Button Size Options

```
Small (.btn-sm)          Medium (.btn)            Large (.btn-lg)
┌──────────────┐        ┌─────────────────┐      ┌──────────────────┐
│Small Button │        │  Medium Button  │      │   Large Button   │
└──────────────┘        └─────────────────┘      └──────────────────┘
6px 12px                12px 24px                12px 32px
0.875rem text           1rem text                1.125rem text
```

---

## 📏 Spacing Scale

```
Spacing Hierarchy (CSS Variables):

--spacing-xs   →  4px  ▂
--spacing-sm   →  8px  ▄
--spacing-md   → 16px  ▆  ← Standard gap/padding
--spacing-lg   → 24px  █  ← Card padding
--spacing-xl   → 32px  █ █  ← Between sections
--spacing-2xl  → 40px  █ █ ▄
--spacing-3xl  → 48px  █ █ █
--spacing-4xl  → 56px  █ █ █ ▄
--spacing-5xl  → 64px  █ █ █ █
--spacing-6xl  → 80px  █ █ █ █ ▄ ← Hero section padding

Use cases:
- xs: Tight spacing between related items
- sm: Small gaps in components
- md: Standard component padding
- lg: Card padding, medium sections
- xl: Section spacing
- 6xl: Hero sections, large spacing between sections
```

---

## 🎨 Color Usage Guide

### Don't Mix Colors Arbitrarily
❌ Don't use all three primary colors equally
```
DON'T:  Button (teal) + Badge (purple) + Icon (blue) = Chaotic
```

✅ Do use hierarchy
```
DO: Teal primary for buttons → Purple for accents → Blue for info only
```

### Text Color Guidelines
```
PRIMARY TEXT:      #171717 (neutral-900) - Main paragraphs
SECONDARY TEXT:    #525252 (neutral-600) - Meta, descriptions  
TERTIARY TEXT:     #737373 (neutral-500) - Disabled, hints
INVERSE TEXT:      #ffffff (white) - On dark backgrounds
```

### Background Guidelines
```
PRIMARY BG:        #ffffff (white) - Main content
SECONDARY BG:      #fafafa (neutral-50) - Cards, sections
TERTIARY BG:       #f5f5f5 (neutral-100) - Tables, lists
HOVER BG:          #f0f0f0 (neutral-150) - Interactive hover
```

---

## 🎯 Responsive Breakpoints

```
MOBILE (<768px)           TABLET (768-1023px)      DESKTOP (1024px+)
─────────────────         ─────────────────        ─────────────────

Single Column Layout      2-Column Layout          3-4 Column Layout
16px side padding         24px side padding        32px side padding
Text scaling down         Text scaling down        Full text size

H1: 1.875rem              H1: 2.25rem             H1: 3rem
H2: 1.5rem                H2: 1.875rem            H2: 2.25rem
H3: 1.25rem               H3: 1.5rem              H3: 1.875rem

.grid-cols-4 → 1 column   .grid-cols-4 → 2 cols   .grid-cols-4 → 4 cols
Section: 2rem pad         Section: 3.5rem pad     Section: 5rem pad
```

---

## ✨ Shadow System

```
None           ─ .shadow-none
Extra Small    ▣ .shadow-xs    0 1px 2px rgba(0,0,0,0.04)
Small          ▢ .shadow-sm    0 1px 2px rgba(0,0,0,0.05)
Base           ▢▢ .shadow-base  0 1px 3px rgba(0,0,0,0.1)
Medium         ▢▢▢ .shadow-md   0 4px 6px rgba(0,0,0,0.1)
Large          ▢▢▢▢ .shadow-lg  0 10px 15px rgba(0,0,0,0.1)
Extra Large    ▢▢▢▢▢ .shadow-xl 0 20px 25px rgba(0,0,0,0.1)
Extra Extra    ▢▢▢▢▢▢ .shadow-2xl 0 25px 50px rgba(0,0,0,0.25)
```

**Usage:**
- Disabled/flat components: shadow-none
- Resting cards: shadow-sm or shadow-base
- Hovered cards: shadow-md or shadow-lg
- Floating modals: shadow-xl or shadow-2xl

---

## 🎭 Interactive States

### Button States
```
NORMAL      Default appearance ready to interact
HOVER       20% darker background, cursor pointer
ACTIVE      30% darker background, pressed appearance
DISABLED    50% opacity, cursor not-allowed, can't interact
FOCUS       2px colored outline, 2px offset (keyboard nav)
```

### Form States
```
NORMAL      Standard appearance, ready for input
FOCUS       Colored border + shadow ring effect
VALID       Green border + success color
INVALID     Red border + error color
DISABLED    Grayed out, can't interact
FILLED      Normal appearance but shows data
```

### Link States
```
NORMAL      Text colored teal (#0284c7)
HOVER       Darker teal (#0369a1) + underline
FOCUS       Outline ring for keyboard navigation
VISITED    Keep same color (don't use different visited color)
```

---

## 📱 Common Layout Widths

```
Mobile Container:    100% width - 32px (16px left + right)
Tablet Container:    100% width - 48px (24px left + right)  
Desktop Container:   90rem (1440px) max - 64px sides (32px each)
                     Centers with margin auto

Content Width:
- Narrow (text):     28-32rem (max 600px)
- Standard (mixed):  40-56rem (max 900px)
- Wide (layout):     80-90rem (max 1440px)
- Full:              100% (edge to edge)
```

---

## 🔗 CSS Variable Reference

```
COLORS:
var(--color-primary-600)     #0284c7
var(--color-secondary-600)   #9333ea
var(--color-accent-600)      #2563eb

NEUTRAL:
var(--fg-primary)            #171717 (main text)
var(--fg-secondary)          #525252 (secondary text)
var(--fg-tertiary)           #737373 (tertiary text)
var(--bg-primary)            #ffffff (main background)
var(--bg-secondary)          #fafafa (card background)
var(--border-primary)        #e5e5e5 (main border)

SPACING:
var(--spacing-md)            1rem (16px)
var(--spacing-lg)            1.5rem (24px)
var(--spacing-xl)            2rem (32px)
var(--spacing-6xl)           5rem (80px)

SHADOWS:
var(--shadow-sm)             0 1px 2px rgba(0,0,0,0.05)
var(--shadow-lg)             0 10px 15px rgba(0,0,0,0.1)

FONTS:
var(--font-family-base)      System font stack
var(--font-family-display)   Modern UI fonts
var(--font-family-mono)      Monospace font
```

---

## 🎯 Component Decision Tree

```
Need a button?
├─ Main action → .btn-primary
├─ Alternative → .btn-secondary
└─ Tertiary → .btn-tertiary

Need to show content section?
├─ With header → .card with .card-header
├─ Subtle → .card
├─ Prominent → .card-elevated
└─ Minimal → .card-flat

Need multiple items?
├─ Auto responsive → .grid
├─ Fixed 3 columns → .grid-cols-3
├─ Fixed 4 columns → .grid-cols-4
└─ Custom → inline style

Need to highlight something?
├─ Status → .badge (variant)
├─ Message → .alert (variant)
└─ Text emphasis → .text-primary or color class

Need form input?
├─ Text input → input.form-control
├─ Large text → textarea.form-control
└─ With label → .form-group with .form-label + .form-control
```

---

## ⚙️ Transitions & Animations

```
All interactive elements use: 200ms ease-in-out transition

Standard animations:
.fade-in          → Opacity fade-in
.slide-in-down    → Slide down from top
.slide-in-up      → Slide up from bottom
.slide-in-left    → Slide in from left
.slide-in-right   → Slide in from right

Respects user preference: @media (prefers-reduced-motion: reduce)
Animations disable for users who prefer reduced motion
```

---

**This design system is complete and production-ready! 🎉**

Use the classes and color values above to build your portfolio with consistency
and professional polish. All components are optimized for accessibility and
responsive design.

For code examples, see: `DESIGN_EXAMPLES.md`
For detailed documentation, see: `DESIGN_SYSTEM.md`
